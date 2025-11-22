type ChallengePostitProps = {
  title: string;
  body: string;
};

const ChallengePostit = ({ title, body }: ChallengePostitProps) => {
  return (
    <div className="relative mx-auto w-full max-w-[26rem] overflow-hidden rounded-[16px] pb-[2rem]">
      <div
        aria-hidden
        className="absolute"
        style={{
          left: '2.14%',
          right: '4%',
          top: '3.55%',
          bottom: '7%',
          background:
            'linear-gradient(180deg, #D7E6FF 0%, #E1ECFC 22.42%, #E7F0FF 38.68%, #D5E6FF 100%)',
          transform: 'rotate(-1.09deg)',
          transformOrigin: 'top left',
        }}
      />

      <div className="absolute -top-[2rem] left-1/2 z-10 h-[2rem] -translate-x-1/2">
        <div
          className="absolute top-0 left-1/2 h-[3.8rem] w-[7.0rem] -translate-x-1/2 rounded-[6px]"
          style={{
            transform: 'rotate(-1deg)',
            transformOrigin: 'top left',
            background: 'rgba(236,229,210,0.6)',
          }}
        />
      </div>

      <div className="relative z-10 flex w-full flex-col items-center px-[2.4rem] pt-[4.2rem] pb-[2.4rem]">
        <p className="font-gangwon text-gray-70 text-[2.4rem] font-medium">
          챌린지
        </p>
        <p className="font-gangwon pt-[1.6rem] text-[4rem] leading-[48px] font-normal tracking-tight text-gray-900">
          {title}
        </p>
        <p className="font-gangwon pt-[2.7rem] text-center text-[2rem] leading-[120%] font-medium whitespace-pre-line text-gray-900">
          {body}
        </p>
      </div>
    </div>
  );
};

export default ChallengePostit;
