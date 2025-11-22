import Button from '@components/button/button';

import SmallButton from '@/shared/components/button/small-button';

const CardDetail = () => {
  return (
    <div className="bg-gray-5 flex min-h-dvh flex-col px-[2.4rem] pt-[2rem] pb-[3rem]">
      <div className="flex justify-end pb-[1.2rem]">
        <SmallButton title="고민 보러가기" />
      </div>

      <section className="bg-gray-40 flex h-[56rem] flex-col justify-between rounded-[16px] px-[2.4rem] py-[2.4rem] shadow-[0_0_16px_rgba(51,124,233,0.10)]">
        <p className="h3 text-blue-60">#카테고리</p>
        <p className="h1 text-white">
          와작와작
          <br />
          과자 먹기
        </p>
      </section>

      <div className="pt-[2.4rem] pb-[6rem]">
        <Button title="챌린지 인증하기" className="bg-blue-80 text-white" />
      </div>
    </div>
  );
};

export default CardDetail;
