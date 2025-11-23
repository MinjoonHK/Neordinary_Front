type ChallengePostitProps = {
  title: string;
  body: string;
};

const ChallengePostit = ({ title, body }: ChallengePostitProps) => {
  return (
    <div className="relative mx-auto w-full max-w-[35rem] pb-[3.5rem]">
      <div className="pointer-events-none absolute inset-0 overflow-hidden rounded-[16px]">
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
            transform: 'rotate(-1.09deg) scaleX(1.03)',
            transformOrigin: 'top left',
          }}
        />
      </div>

      <div className="pointer-events-none absolute -top-[1rem] left-1/2 z-20 -translate-x-1/2">
        <div
          className="h-[3rem] w-[7rem] rounded-[6px]"
          style={{
            background: 'rgba(236,229,210,0.6)',
            transform: 'rotate(-1deg)',
            transformOrigin: 'center',
          }}
        />
      </div>

      <div className="relative z-10 flex w-full flex-col items-center rounded-[16px] px-[2.4rem] pt-[4.2rem] pb-[2.4rem]">
        <p className="font-gangwon text-gray-70 text-[2.4rem] font-medium">
          {/* {ai} */}
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
