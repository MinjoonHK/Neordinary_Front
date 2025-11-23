import Button from '@components/button/button';
import { useRef, useState } from 'react';
import { useLocation, useNavigate, useParams } from 'react-router-dom';
import { useQuery } from '@tanstack/react-query';

import SmallButton from '@/shared/components/button/small-button';
import { ROUTES } from '@/shared/routes/routes-config';
import { axiosClient } from '@/shared/apis/axios-client';

const ENUM_TO_LABEL: Record<string, string> = {
  STUDY: '학업',
  JOB: '직장',
  FAMILY: '가족',
  CAREER: '진로',
  HEALTH: '건강',
  RELATION: '관계',
  FINANCE: '경제',
  ETC: '기타',
};

type ChallengeCategory = keyof typeof ENUM_TO_LABEL;

type ChallengeDetail = {
  id: number;
  category: ChallengeCategory;
  imageUrl: string | null;
  challengeTitle: string;
};

type ChallengeDetailResponse = {
  status: number;
  success: boolean;
  data: ChallengeDetail;
};

type CardLocationState = {
  id: number | string;
  title: string;
  category: string;
  imageUrl: string | null;
  createdAt?: string | null;
};

type PresignData = {
  presignedUrl: string;
  fileUrl: string; // https로 시작하는 전체 URL 그대로
};

type PresignResponse = {
  status: number;
  success: boolean;
  data: PresignData;
};

const getCategoryLabel = (code?: ChallengeCategory | string | null) => {
  if (!code) return '';
  return ENUM_TO_LABEL[code as ChallengeCategory] ?? '';
};

const CardDetail = () => {
  const [previewUrl, setPreviewUrl] = useState<string | null>(null);
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [isUploading, setIsUploading] = useState(false);
  const [uploadedFileUrl, setUploadedFileUrl] = useState<string | null>(null);

  const fileInputRef = useRef<HTMLInputElement | null>(null);
  const navigate = useNavigate();

  const location = useLocation();
  const state = (location.state as CardLocationState | null) ?? null;

  const { matchId } = useParams<{ matchId: string }>();
  console.log('params matchId =>', matchId, 'state =>', state);

  const effectiveId =
    matchId ?? (state?.id != null ? String(state.id) : undefined);

  const {
    data: challengeRes,
    isLoading,
    isError,
  } = useQuery({
    queryKey: ['challengeDetail', effectiveId],
    enabled: !!effectiveId,
    queryFn: async () => {
      const res = await axiosClient.get<ChallengeDetailResponse>(
        `/challenges/${effectiveId}`,
      );
      return res.data;
    },
  });

  const challenge = challengeRes?.data;

  const displayTitle = state?.title ?? challenge?.challengeTitle ?? '';

  const displayCategory =
    (state?.category as ChallengeCategory | undefined) ??
    challenge?.category ??
    null;

  const displayImageUrl =
    previewUrl ?? challenge?.imageUrl ?? state?.imageUrl ?? null;

  const handleFileChange: React.ChangeEventHandler<HTMLInputElement> = (
    event,
  ) => {
    const file = event.target.files?.[0];
    if (!file) return;

    const objectUrl = URL.createObjectURL(file);

    setSelectedFile(file);
    setPreviewUrl((prev) => {
      if (prev) URL.revokeObjectURL(prev);
      return objectUrl;
    });
    setUploadedFileUrl(null);
  };

  // presignedUrl 요청 + S3 PUT 업로드
  const uploadImageToS3 = async (file: File) => {
    // 이 API는 Body 필요 없음 (문서 기준)
    const presignRes = await axiosClient.post<PresignResponse>('/s3/presign');
    const { presignedUrl, fileUrl } = presignRes.data.data;

    console.log('presignedUrl:', presignedUrl);
    console.log('fileUrl:', fileUrl);

    await fetch(presignedUrl, {
      method: 'PUT',
      headers: {
        'Content-Type': file.type || 'application/octet-stream',
      },
      body: file,
    });

    // 여기서 fileUrl 전체(https~)를 그대로 저장/사용
    return fileUrl;
  };

  const handleSelectImageClick = async () => {
    // 아직 파일 안 골랐으면 파일 선택
    if (!selectedFile) {
      fileInputRef.current?.click();
      return;
    }

    // 이미 업로드까지 끝났으면 추가 요청 안 보냄
    if (uploadedFileUrl) {
      console.log('이미 업로드된 이미지 URL:', uploadedFileUrl);
      return;
    }

    try {
      setIsUploading(true);
      const fileUrl = await uploadImageToS3(selectedFile);
      setUploadedFileUrl(fileUrl);
      console.log('이미지 업로드 완료, fileUrl:', fileUrl);

      // TODO: 필요하면 여기서 fileUrl을 들고 다른 API(챌린지 이미지 저장 등)에 넘겨주기
    } catch (error) {
      console.error('이미지 업로드 실패:', error);
    } finally {
      setIsUploading(false);
    }
  };

  const handleGoRecord = () => {
    navigate(ROUTES.RECORD, {
      state: {
        challengeId: challenge?.id ?? state?.id,
        challengeTitle: displayTitle,
      },
    });
  };

  const buttonLabel = (() => {
    if (!selectedFile) return '챌린지 인증하기';
    if (isUploading) return '저장 중...';
    if (uploadedFileUrl) return '이미지를 저장했어요';
    return '이미지 저장하기';
  })();

  if (isLoading && !state) {
    return (
      <div className="bg-gray-5 flex min-h-dvh flex-col px-[2.4rem] pt-[2rem] pb-[3rem]">
        <div className="bg-gray-20 h-[3.6rem] w-full animate-pulse rounded-[8px]" />
        <div className="bg-gray-20 mt-[1.6rem] h-[56rem] w-full animate-pulse rounded-[16px]" />
      </div>
    );
  }

  if ((isError || (!challenge && !state)) && !displayTitle) {
    return (
      <div className="bg-gray-5 flex min-h-dvh flex-col items-center justify-center px-[2.4rem]">
        <p className="b1 text-gray-60">
          챌린지 정보를 불러오지 못했어요. 잠시 후 다시 시도해주세요.
        </p>
        <div className="mt-[1.6rem]">
          <Button
            title="뒤로가기"
            className="bg-blue-80 text-white"
            onClick={() => navigate(-1)}
          />
        </div>
      </div>
    );
  }

  return (
    <div className="bg-gray-5 flex min-h-dvh flex-col px-[2.4rem] pt-[2rem] pb-[3rem]">
      <input
        ref={fileInputRef}
        type="file"
        accept="image/*"
        className="hidden"
        onChange={handleFileChange}
      />

      <div className="flex justify-end pb-[1.2rem]">
        <SmallButton onClick={handleGoRecord} title="고민 보러가기" />
      </div>

      <section className="relative h-[56rem] overflow-hidden rounded-[16px] shadow-[0_0_16px_rgba(51,124,233,0.10)]">
        {displayImageUrl ? (
          <img
            src={displayImageUrl}
            alt="챌린지 이미지"
            className="h-full w-full object-cover"
          />
        ) : (
          <div className="h-full w-full bg-[linear-gradient(180deg,_rgba(255,255,255,0)_0%,_rgba(72,72,72,0.43)_62%,_rgba(32,32,32,0.53)_80%,_rgba(0,0,0,0.6)_100%)]" />
        )}

        <div className="pointer-events-none absolute inset-0 flex flex-col justify-between px-[2.4rem] py-[2.4rem]">
          <p className="h3 text-blue-60">
            #{getCategoryLabel(displayCategory)}
          </p>
          <p className="h1 whitespace-pre-line text-white">{displayTitle}</p>
        </div>
      </section>

      <div className="pt-[2.4rem] pb-[6rem]">
        <Button
          title={buttonLabel}
          className="bg-blue-80 text-white"
          onClick={handleSelectImageClick}
          disabled={isUploading}
        />
      </div>
    </div>
  );
};

export default CardDetail;
