type StepDescriptionProps = {
  name: string;
  category: string | null;
  value: string;
  onChange: (next: string) => void;
  minLength: number;
  maxLength: number;
};

const StepDescription = ({
  name,
  category,
  value,
  onChange,
  minLength,
  maxLength,
}: StepDescriptionProps) => {
  const length = value.length;
  const isTooShort = length > 0 && length < minLength;
  const isTooLong = length > maxLength;
  const isValid = length >= minLength && length <= maxLength;

  const counterColor =
    isTooShort || isTooLong
      ? 'text-red-50'
      : isValid
        ? 'text-green-50'
        : 'text-gray-40';

  const helperText =
    length === 0
      ? ''
      : isTooShort
        ? `최소 ${minLength}자 이상 입력해주세요`
        : isTooLong
          ? `${maxLength}자 이내로 작성해주세요`
          : '좋아요, 충분히 자세하게 작성해주셨어요';

  return (
    <section className="flex flex-col gap-[1.6rem]">
      <div className="flex flex-col gap-[0.4rem]">
        <h1 className="h2">어떤 고민을 가지고 있는지 알려주세요!</h1>
        <p className="b3 text-gray-70">
          {name}님의 고민을 잘 이해할 수 있도록
          <br />
          이름 등 개인을 특정할 정보는 제외해주세요
        </p>
        {category && (
          <p className="b3 text-blue-60 mt-[0.4rem]">[{category}] 카테고리</p>
        )}
      </div>

      <div className="flex flex-col gap-[0.8rem]">
        <textarea
          value={value}
          onChange={(e) => onChange(e.target.value)}
          maxLength={maxLength}
          className="border-gray-20 text-b3 text-gray-90 h-[24rem] w-full resize-none rounded-[16px] border bg-white p-[1.6rem] outline-none"
          placeholder="고민을 입력해주세요."
        />

        <div className="flex items-center justify-between">
          <p className={`b3 ${counterColor}`}>{helperText}</p>
          <p className={`b3 ${counterColor}`}>
            {length}/{maxLength}
          </p>
        </div>
      </div>
    </section>
  );
};

export default StepDescription;
