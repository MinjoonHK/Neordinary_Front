import { useMutation } from '@tanstack/react-query';
import { useEffect } from 'react';

import { axiosClient } from '@/shared/apis/axios-client';
import KakaoBubbleIcon from '@/shared/assets/icons/kakao-bubble-icon.svg';
import KakaoIcon from '@/shared/assets/icons/kakao-icon.svg';
import Button from '@/shared/components/button/button';

const Login = () => {
  const loginMutation = useMutation({
    mutationFn: (params: { code: string }) => {
      return axiosClient.post('/member/kakao/doLogin', { code: params.code });
    },
  });

  const KAKAO_API_KEY = import.meta.env.VITE_KAKAO_API_KEY;
  const REDIRECT_URI = import.meta.env.VITE_REDIRECT_URI;

  const kakaoURL = `https://kauth.kakao.com/oauth/authorize?client_id=${KAKAO_API_KEY}&redirect_uri=${REDIRECT_URI}&response_type=code`;

  useEffect(() => {
    const code = new URLSearchParams(window.location.search).get('code');

    if (code) {
      loginMutation.mutate({ code });
    }
  }, []);

  return (
    <div>
      <div className="font-juache mt-[16.5rem] text-center text-[5rem]">
        소소로
      </div>

      <div className="mt-[20.8rem] p-[2rem]">
        <div className="flex justify-center">
          <img src={KakaoBubbleIcon} alt="Image not found" />
        </div>
        <Button
          // onClick={() => loginMutation.mutate()}
          onClick={() => {
            window.location.href = kakaoURL;
          }}
          startIcon={KakaoIcon}
          title="카카오톡으로 로그인"
          className="bg-[#FFEB3B] py-[1.4rem] text-[1.6rem]"
        />
      </div>
    </div>
  );
};

export default Login;
