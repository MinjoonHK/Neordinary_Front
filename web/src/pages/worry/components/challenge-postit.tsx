type ChallengePostitProps = {
  title: string;
  body: string;
};

const ChallengePostit = ({ title, body }: ChallengePostitProps) => {
  return (
    // 👉 여기부터가 포스트잇 전체
    <div className="relative mx-auto h-[26rem] w-full max-w-[26rem] overflow-hidden rounded-[16px]">
      {/* 포스트잇 종이(벡터) */}
      <div
        className="absolute rounded-[16px]"
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

      <div className="absolute top-[0.6rem] left-1/2 z-10 -translate-x-1/2">
        <div
          className="absolute top-0 left-1/2 h-[3.8rem] w-[7.0rem] -translate-x-1/2 rounded-[6px]"
          style={{
            transform: 'rotate(-1deg)',
            transformOrigin: 'top left',
            background: 'rgba(236,229,210,0.6)',
          }}
        />
      </div>

      <div className="relative z-10 flex h-full flex-col items-center px-[2.4rem] pt-[4.2rem] pb-[2.4rem]">
        <p className="b3 font-gangwon text-gray-70">챌린지</p>
        <p className="font-gangwon mt-[0.8rem] text-[2.4rem] leading-[3.0rem] text-gray-900">
          {title}
        </p>
        <p className="b3 font-gangwon mt-[1.6rem] text-center whitespace-pre-line text-gray-900">
          {body}
        </p>
      </div>
    </div>
  );
};

export default ChallengePostit;
