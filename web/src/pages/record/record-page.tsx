import { cn } from '@libs/cn';
import RecordSection from '@pages/record/components/record';
import ChallengePostit from '@pages/worry/components/challenge-postit';
import { useLocation, useNavigate } from 'react-router-dom';

import { getHeaderContent } from '@/shared/utils/get-header';
import { useQuery } from '@tanstack/react-query';
import { axiosClient } from '@/shared/apis/axios-client';

const RecordPage = () => {
  const location = useLocation();
  const state = location.state as { value?: string } | undefined;
  const value = state?.value ?? '';
  const navigate = useNavigate();
  const { pathname, search } = useLocation();
  const urlParams = new URLSearchParams(search);
  const handleBack = () => {
    navigate(-1);
  };

  const { data: challengeCardDetailData } = useQuery({
    queryKey: ['challengeCardDetailData', value],
    queryFn: () =>
      axiosClient.get('/challenges/21/issue').then((res) => res.data),
    select: (data) => data.data,
  });

  return (
    <div className={cn('flex h-svh flex-col', 'bg-worry-funnel')}>
      <header className="header-layout">
        {getHeaderContent(pathname, urlParams, handleBack)}
      </header>

      <main className="flex-col gap-[2.4rem] overflow-y-auto px-[2.4rem] pt-[2.4rem] pb-[3.2rem]">
        <RecordSection value={value} />

        <section className="w-full flex-col gap-[1.6rem]">
          <p className="b2 text-gray-90">
            {challengeCardDetailData?.nickname}님을 위한
            <br />
            위로와 극복 챌린지예요
          </p>

          <div className="flex w-full justify-center pt-[0.8rem]">
            <div className="border-blue-20 flex w-full rounded-[16px] border bg-white px-[2.5rem] py-[2.8rem]">
              <div className="flex w-full flex-col gap-[2.4rem]">
                <p className="b3 text-gray-80 whitespace-pre-line">
                  {challengeCardDetailData?.comfortContent}
                </p>

                <ChallengePostit
                  title={challengeCardDetailData?.challengeTitle}
                  body={challengeCardDetailData?.challengeContent}
                />
              </div>
            </div>
          </div>
        </section>
      </main>
    </div>
  );
};

export default RecordPage;
