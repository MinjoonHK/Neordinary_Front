import Button from '@components/button/button';
import Modal from '@components/modal/modal';
import { cn } from '@libs/cn';
import StepCategory from '@pages/worry/components/step-category';
import StepDescription from '@pages/worry/components/step-description';
import StepResult from '@pages/worry/components/step-result';
import { useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';

import { axiosClient } from '@/shared/apis/axios-client';
import { PROFANITY_LIST } from '@/shared/constants/badwords';
import { ROUTES } from '@/shared/routes/routes-config';
import { getHeaderContent } from '@/shared/utils/get-header';

type FunnelStep = 'CATEGORY' | 'DESCRIPTION' | 'LOADING' | 'RESULT';

type AiResult = {
  title: string;
  message: string;
  challengeTitle: string;
  challengeBody: string;
};

const requestAiResult = async (params: {
  category: string | null;
  description: string;
}): Promise<AiResult> => {
  const { description } = params;
  const { data: aiData } = await axiosClient.post('/issues', {
    category: params.category,
    content: params.description,
  });

  return {
    title: '[Name]님을 위한\n위로와 극복 챌린지예요',
    message: description,
    challengeTitle: '와작와작 과자먹기',
    challengeBody:
      '나만을 위한 작은 보상 타임이에요.\n오늘 하루 수고한 나에게 과자를 선물해 보세요.',
  };
};

const MIN_LOADING_DURATION = 2000;

const WorryFunnelPage = () => {
  const [step, setStep] = useState<FunnelStep>('CATEGORY');
  const [category, setCategory] = useState<string | null>(null);
  const [description, setDescription] = useState('');
  const [aiResult, setAiResult] = useState<AiResult | null>(null);
  const [showExitModal, setShowExitModal] = useState(false);

  const navigate = useNavigate();
  const { pathname, search } = useLocation();
  const urlParams = new URLSearchParams(search);

  const maxLength = 400;
  const minLength = 10;

  const length = description.length;
  const containsProfanity = PROFANITY_LIST.some((bad) =>
    description.includes(bad),
  );

  const canNext =
    step === 'CATEGORY'
      ? category !== null
      : length >= minLength && length <= maxLength && !containsProfanity;

  const handleNext = async () => {
    if (!canNext) return;

    if (step === 'CATEGORY') {
      setStep('DESCRIPTION');
      return;
    }

    if (step === 'DESCRIPTION') {
      setStep('LOADING');

      try {
        const [result] = await Promise.all([
          requestAiResult({ category, description }),
          new Promise<void>((resolve) =>
            setTimeout(resolve, MIN_LOADING_DURATION),
          ),
        ]);

        setAiResult(result);
        setStep('RESULT');
      } catch (e) {
        console.error(e);
        setStep('DESCRIPTION');
      }
    }
  };

  const handleGoMain = () => {
    navigate(ROUTES.MAIN);
  };

  const handleBack = () => {
    setShowExitModal(true);
  };

  const handleExitConfirm = () => {
    setShowExitModal(false);
    navigate(ROUTES.MAIN);
  };

  const handleExitCancel = () => {
    setShowExitModal(false);
  };

  const isLoading = step === 'LOADING';

  return (
    <div
      className={cn(
        'flex h-svh flex-col',
        'bg-worry-funnel',
        isLoading && 'animate-worry-gradient',
      )}
    >
      <header className="header-layout">
        {!isLoading && getHeaderContent(pathname, urlParams, handleBack)}
      </header>

      <main className="flex-col-between flex-1 px-[2.4rem] pt-[2.4rem] pb-[3.2rem]">
        {step === 'CATEGORY' && (
          <StepCategory
            name="Name님"
            selectedCategory={category}
            onSelectCategory={setCategory}
          />
        )}

        {step === 'DESCRIPTION' && (
          <StepDescription
            value={description}
            onChange={setDescription}
            minLength={minLength}
            maxLength={maxLength}
          />
        )}

        {step === 'LOADING' && (
          <div className="flex h-full w-full flex-col gap-[2.4rem] pt-[7.4rem]">
            <p className="b1 whitespace-pre-line">
              {'[Name]님을 위한\n위로와 챌린지를 생각중이에요'}
            </p>
          </div>
        )}

        {step === 'RESULT' && aiResult && <StepResult result={aiResult} />}

        {(step === 'CATEGORY' || step === 'DESCRIPTION') && (
          <div className="w-full pt-[1rem]">
            <Button
              title="다음"
              disabled={!canNext}
              className={
                canNext
                  ? 'bg-blue-80 text-white'
                  : 'bg-gray-20 text-gray-40 cursor-default'
              }
              onClick={handleNext}
            />
          </div>
        )}

        {step === 'RESULT' && (
          <div className="w-full pt-[1rem]">
            <Button
              title="메인으로"
              className="bg-blue-80 text-white"
              onClick={handleGoMain}
            />
          </div>
        )}
      </main>

      <Modal
        open={showExitModal}
        title="현재 페이지를 나가시겠어요?"
        description="지금 나가면 작성한 내용은 저장되지 않아요"
        confirmText="나가기"
        cancelText="계속 작성하기"
        onConfirm={handleExitConfirm}
        onCancel={handleExitCancel}
      />
    </div>
  );
};

export default WorryFunnelPage;
