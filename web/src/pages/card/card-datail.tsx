import Button from '@components/button/button';

import SmallButton from '@/shared/components/button/small-button';

const CardDetail = () => {
  return (
    <div className="">
      <SmallButton title="고민 보러가기" />
      <Button title="챌린지 인증하기" className="bg-blue-80 text-white" />
    </div>
  );
};

export default CardDetail;
