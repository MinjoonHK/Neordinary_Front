import Button from '@components/button/button';
import { useRef, useState } from 'react';
import { useNavigate } from 'react-router-dom';

import SmallButton from '@/shared/components/button/small-button';
import { ROUTES } from '@/shared/routes/routes-config';

const CardDetail = () => {
  const [previewUrl, setPreviewUrl] = useState<string | null>(null);
  const fileInputRef = useRef<HTMLInputElement | null>(null);
  const navigate = useNavigate();

  const handleSelectImageClick = () => {
    if (!previewUrl) {
      fileInputRef.current?.click();
      return;
    }

    // TODO: 이미지 저장하기 로직 (API 호출 등)
  };

  const handleFileChange: React.ChangeEventHandler<HTMLInputElement> = (
    event,
  ) => {
    const file = event.target.files?.[0];
    if (!file) return;

    const objectUrl = URL.createObjectURL(file);

    setPreviewUrl((prev) => {
      if (prev) URL.revokeObjectURL(prev);
      return objectUrl;
    });
  };

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
        <SmallButton
          onClick={() =>
            navigate(ROUTES.RECORD, {
              state: {
                value: 'd',
              },
            })
          }
          title="고민 보러가기"
        />
      </div>

      <section className="relative h-[56rem] overflow-hidden rounded-[16px] shadow-[0_0_16px_rgba(51,124,233,0.10)]">
        {previewUrl ? (
          <img
            src={previewUrl}
            alt="선택한 챌린지 이미지"
            className="h-full w-full object-cover"
          />
        ) : (
          <div className="bg-gray-40 h-full w-full" />
        )}
        <div className="pointer-events-none absolute inset-0 flex flex-col justify-between px-[2.4rem] py-[2.4rem]">
          <p className="h3 text-blue-60">#카테고리</p>
          <p className="h1 text-white">
            와작와작
            <br />
            과자 먹기
          </p>
        </div>
      </section>

      <div className="pt-[2.4rem] pb-[6rem]">
        <Button
          title={previewUrl ? '이미지 저장하기' : '챌린지 인증하기'}
          className="bg-blue-80 text-white"
          onClick={handleSelectImageClick}
        />
      </div>
    </div>
  );
};

export default CardDetail;
