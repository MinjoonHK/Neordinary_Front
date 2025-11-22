import { cn } from '@libs/cn';
import type { ChangeEvent, FocusEvent, InputHTMLAttributes } from 'react';

type NicknameStatus = 'default' | 'error' | 'success';

type NicknameInputProps = Omit<
  InputHTMLAttributes<HTMLInputElement>,
  'value' | 'onChange' | 'onBlur'
> & {
  value: string;
  status: NicknameStatus;
  helperText?: string;
  onChange: (e: ChangeEvent<HTMLInputElement>) => void;
  onBlur?: (e: FocusEvent<HTMLInputElement>) => void;
};

const NicknameInput = ({
  value,
  status,
  helperText,
  onChange,
  onBlur,
  ...rest
}: NicknameInputProps) => {
  const inputBase =
    'mt-[1.6rem] h-[5.2rem] w-full rounded-[14px] border px-[1.6rem] ' +
    'bg-gray-5 text-gray-90 placeholder:text-gray-40 ' +
    'focus:outline-none';

  const borderClass =
    status === 'error'
      ? 'border-red-50'
      : status === 'success'
        ? 'border-blue-40'
        : 'border-gray-20';

  const helperColor =
    status === 'error'
      ? 'text-red-50'
      : status === 'success'
        ? 'text-green-50'
        : 'text-gray-40';

  return (
    <div className="flex flex-col">
      <h1 className="h1">어떤 닉네임으로 불러드릴까요?</h1>
      <p className="b3 text-blue-60 mt-[0.4rem]">
        2-7자의 한글, 영문, 숫자만 사용할 수 있어요
      </p>

      <input
        value={value}
        onChange={onChange}
        onBlur={onBlur}
        className={cn(inputBase, borderClass)}
        placeholder="닉네임을 입력해주세요"
        {...rest}
      />

      {helperText && status !== 'default' && (
        <p className={cn('b3 mt-[0.8rem]', helperColor)}>{helperText}</p>
      )}
    </div>
  );
};

export default NicknameInput;
