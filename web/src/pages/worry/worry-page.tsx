import Button from '@components/button/button';
import Modal from '@components/modal/modal';
import { useState } from 'react';

import StepCategory from './components/step-category';
import StepDescription from './components/step-description';

type FunnelStep = 'CATEGORY' | 'DESCRIPTION';

const WorryFunnelPage = () => {
  const [step, setStep] = useState<FunnelStep>('CATEGORY');
  const [category, setCategory] = useState<string | null>(null);
  const [description, setDescription] = useState('');
  const [showExitModal, setShowExitModal] = useState(false);

  const maxLength = 400;
  const minLength = 40;

  const length = description.length;

  const canNext =
    step === 'CATEGORY'
      ? category !== null
      : length >= minLength && length <= maxLength;

  const handleNext = () => {
    if (!canNext) return;

    if (step === 'CATEGORY') {
      setStep('DESCRIPTION');
      return;
    }

    // TODO: 마지막 스텝 완료 API 호출 등
  };

  const handleExitConfirm = () => {
    setShowExitModal(false);
    // TODO: 나가기 로직 (예: 메인으로 이동)
  };

  const handleExitCancel = () => {
    setShowExitModal(false);
  };

  return (
    <div className="from-gray-5 to-blue-5 flex h-svh flex-col justify-between bg-gradient-to-b px-[2.4rem] pt-[2.4rem] pb-[3.2rem]">
      {/* 상단 컨텐츠: 스텝에 따라 갈아끼우기 */}
      <main className="flex-1">
        {step === 'CATEGORY' && (
          <StepCategory
            name="Name님" // TODO: 실제 유저 이름 바인딩
            selectedCategory={category}
            onSelectCategory={setCategory}
            onRequestExit={() => setShowExitModal(true)}
          />
        )}

        {step === 'DESCRIPTION' && (
          <StepDescription
            name="Name님"
            category={category}
            value={description}
            onChange={setDescription}
            minLength={minLength}
            maxLength={maxLength}
          />
        )}
      </main>

      <div className="mt-[2.4rem]">
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
