import { useEffect, useRef } from 'react';

import { PROFANITY_LIST } from '@/shared/constants/badwords';

type StepDescriptionProps = {
  value: string;
  onChange: (next: string) => void;
  minLength: number;
  maxLength: number;
};

const StepDescription = ({
  value,
  onChange,
  minLength,
  maxLength,
}: StepDescriptionProps) => {
  const length = value.length;
  const textareaRef = useRef<HTMLTextAreaElement | null>(null);

  const containsProfanity = PROFANITY_LIST.some((bad) => value.includes(bad));

  const isTooShort = length > 0 && length < minLength;
  const isFull = length === maxLength;

  let helperText = '';
  let helperColor = 'text-gray-90';

  if (containsProfanity) {
    helperText = '욕설, 비속어는 사용할 수 없어요';
    helperColor = 'text-error';
  }

  let counterColor = 'text-gray-90';

  if (containsProfanity || isTooShort) {
    counterColor = 'text-error';
  } else if (isFull) {
    counterColor = 'text-success';
  }

  const autoResize = () => {
    const el = textareaRef.current;
    if (!el) return;
    el.style.height = 'auto';
    el.style.height = `${el.scrollHeight}px`;
  };

  useEffect(() => {
    autoResize();
  }, [value]);

  const handleChange: React.ChangeEventHandler<HTMLTextAreaElement> = (e) => {
    onChange(e.target.value);
    autoResize();
  };

  return (
    <section className="w-full flex-col gap-[1.6rem]">
      <div className="text-gray-90 flex-col gap-[0.8rem]">
        <h1 className="h3">어떤 고민을 가지고 있는지 알려주세요!</h1>
        <p className="b2">
          소로로가 위로와 함께
          <br />
          이를 극복할 재밌는 챌린지를 제안할게요
        </p>
      </div>

      <div className="flex-col gap-[0.8rem]">
        <textarea
          ref={textareaRef}
          value={value}
          onChange={handleChange}
          maxLength={maxLength}
          className="b3 text-gray-90 border-gray-10 placeholder:text-gray-40 h-auto min-h-[24rem] w-full resize-none overflow-y-hidden rounded-[16px] border bg-white p-[2rem] outline-none"
          placeholder="고민을 입력해주세요."
        />

        <div className="flex-row-between">
          <p className={`b3 ${helperColor}`}>{helperText}</p>
          <p className={`b3 ${counterColor}`}>
            {length}/{maxLength}자
          </p>
        </div>
      </div>
    </section>
  );
};

export default StepDescription;
