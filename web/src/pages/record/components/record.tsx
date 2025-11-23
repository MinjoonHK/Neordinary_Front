import { axiosClient } from '@/shared/apis/axios-client';
import { useQuery } from '@tanstack/react-query';
import { useEffect, useRef } from 'react';

type RecordProps = {
  value?: string;
};

const Record = ({ value = '' }: RecordProps) => {
  const textareaRef = useRef<HTMLTextAreaElement | null>(null);

  const safeValue = value ?? '';

  const autoResize = () => {
    const el = textareaRef.current;
    if (!el) return;
    el.style.height = 'auto';
    el.style.height = `${el.scrollHeight}px`;
  };

  const { data: challengeCardDetailData } = useQuery({
    queryKey: ['challengeCardDetailData', value],
    queryFn: () =>
      axiosClient.get('/challenges/21/issue').then((res) => res.data),
    select: (data) => data.data,
  });

  const userSharedDate = challengeCardDetailData?.createdAt?.split('T')[0];

  useEffect(() => {
    autoResize();
  }, [safeValue]);

  return (
    <section className="w-full flex-col gap-[1.6rem]">
      <p className="b2 text-gray-90 gap-[0.8rem]">
        {challengeCardDetailData?.nickName}님이
        <br />
        {userSharedDate}에 알려주신 고민이에요
      </p>

      <div className="flex-col gap-[0.8rem]">
        <div className="border-blue-20 rounded-[16px] border bg-white p-[2rem] shadow-[0_0_16px_rgba(51,124,233,0.10)]">
          <textarea
            ref={textareaRef}
            value={challengeCardDetailData?.issueContent}
            readOnly
            className="b3 text-gray-90 h-auto min-h-[24rem] w-full resize-none overflow-hidden border-none bg-transparent p-0 outline-none"
          />
        </div>
      </div>
    </section>
  );
};

export default Record;
