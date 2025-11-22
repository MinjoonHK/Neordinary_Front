import ChallengePostit from './challenge-postit';

type StepResultProps = {
  result: {
    title: string;
    message: string;
    challengeTitle: string;
    challengeBody: string;
  };
};

const StepResult = ({ result }: StepResultProps) => {
  const { title, message, challengeTitle, challengeBody } = result;

  return (
    <section className="flex h-full flex-col gap-[2.4rem] pt-[1.6rem]">
      {/* 상단 타이틀 */}
      <div className="text-gray-90">
        <p className="b1 whitespace-pre-line">{title}</p>
      </div>

      {/* 큰 카드 : 위로 텍스트 + 포스트잇 같이 포함 */}
      <div className="border-blue-20 flex-1 rounded-[24px] border bg-white px-[2.4rem] py-[2.8rem]">
        <div className="flex h-full flex-col gap-[2.4rem]">
          {/* 위로 텍스트 */}
          <p className="b3 text-gray-80 whitespace-pre-line">{message}</p>

          <div className="flex flex-1 items-center justify-center">
            <ChallengePostit title={challengeTitle} body={challengeBody} />
          </div>
        </div>
      </div>
    </section>
  );
};

export default StepResult;
