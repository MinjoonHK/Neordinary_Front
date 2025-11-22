import Button from '@components/button/button';
import { cn } from '@libs/cn';
import StepCategory from '@pages/worry/components/step-category';
import StepDescription from '@pages/worry/components/step-description';
import StepResult from '@pages/worry/components/step-result';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

import { ROUTES } from '@/shared/routes/routes-config';

export const PROFANITY_LIST = ['나쁜말1', '나쁜말2'];

type FunnelStep = 'CATEGORY' | 'DESCRIPTION' | 'LOADING' | 'RESULT';

type AiResult = {
  title: string;
  message: string;
  challengeTitle: string;
  challengeBody: string;
};

// TODO: 실제 AI API로 교체
const requestAiResult = async (params: {
  category: string | null;
  description: string;
}): Promise<AiResult> => {
  const { description } = params;

  await new Promise((resolve) => setTimeout(resolve, 2000));

  return {
    title: '[Name]님을 위한\n위로와 극복 챌린지예요',
    message: description,
    challengeTitle: '와작와작 과자먹기',
    challengeBody:
      '나만을 위한 작은 보상 타임이에요.\n오늘 하루 수고한 나에게 과자를 선물해 보세요.',
  };
};

const WorryFunnelPage = () => {
  const [step, setStep] = useState<FunnelStep>('CATEGORY');
  const [category, setCategory] = useState<string | null>(null);
  const [description, setDescription] = useState('');
  const [aiResult, setAiResult] = useState<AiResult | null>(null);
  const navigate = useNavigate();

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
        const result = await requestAiResult({ category, description });
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

  const isLoading = step === 'LOADING';

  return (
    <div
      className={cn(
        'flex-col-between h-svh px-[2.4rem] pt-[2.4rem] pb-[3.2rem]',
        'bg-worry-funnel',
        isLoading && 'animate-worry-gradient',
      )}
    >
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
        <div className="text-gray-90 flex h-full flex-col justify-center">
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
    </div>
  );
};

export default WorryFunnelPage;
