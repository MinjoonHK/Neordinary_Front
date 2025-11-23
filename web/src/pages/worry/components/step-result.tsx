import ChallengePostit from '@pages/worry/components/challenge-postit';

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
    <section className="flex h-full w-full flex-col gap-[2.4rem] pt-[1.6rem]">
      <div className="text-gray-90">
        <p className="b1 whitespace-pre-line">
          {`사용자님을 위한 \n위로와 챌린지에요!`}
        </p>
      </div>

      <div className="border-blue-20 flex w-full rounded-[16px] border bg-white px-[2.5rem] py-[2.8rem]">
        <div className="flex-col gap-[2.4rem]">
          <p className="b3 text-gray-80 whitespace-pre-line">{message}</p>

          <div className="flex items-center justify-center">
            <ChallengePostit title={title} body={challengeBody} />
          </div>
        </div>
      </div>
    </section>
  );
};

export default StepResult;
