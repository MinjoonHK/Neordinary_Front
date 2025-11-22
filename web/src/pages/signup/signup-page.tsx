import Button from '@components/button/button';
import Input from '@pages/signup/components/input';
import { useMemo, useState } from 'react';

type NicknameStatus = 'default' | 'error' | 'success';

const Signup = () => {
  const [nickname, setNickname] = useState('');
  const [touched, setTouched] = useState(false);

  const { status, helperText } = useMemo(() => {
    if (!touched || nickname.length === 0) {
      return { status: 'default' as NicknameStatus, helperText: '' };
    }

    const regex = /^[ㄱ-ㅎ가-힣a-zA-Z0-9]{2,7}$/;

    if (!regex.test(nickname)) {
      if (nickname.length < 2) {
        return {
          status: 'error' as NicknameStatus,
          helperText: '최소 2자 이상 입력해주세요',
        };
      }

      return {
        status: 'error' as NicknameStatus,
        helperText: '2-7자의 한글, 영문, 숫자만 사용할 수 있어요',
      };
    }

    return {
      status: 'success' as NicknameStatus,
      helperText: '사용할 수 있는 닉네임이에요',
    };
  }, [nickname, touched]);

  const isValid = status === 'success';

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (!touched) setTouched(true);
    setNickname(e.target.value);
  };

  const handleBlur = () => {
    if (!touched) setTouched(true);
  };

  const handleNext = () => {
    if (!isValid) return;
    // TODO: 다음 퍼널 단계로 이동 로직
  };

  return (
    <div className="bg-gray-5 flex min-h-dvh flex-col px-[2.4rem] pt-[3.2rem] pb-[3.2rem]">
      <section className="flex flex-1 flex-col">
        <Input
          value={nickname}
          status={status}
          helperText={helperText}
          onChange={handleChange}
          onBlur={handleBlur}
        />
      </section>

      <div className="mt-[2.4rem]">
        <Button
          title="다음"
          className={
            isValid
              ? 'bg-blue-80 text-white'
              : 'bg-gray-20 text-gray-40 cursor-default'
          }
          onClick={handleNext}
          disabled={!isValid}
        />
      </div>
    </div>
  );
};

export default Signup;
