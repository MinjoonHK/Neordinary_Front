import Button from '@components/button/button';

const Main = () => {
  return (
    <div className="text-gray-90 flex-col-center px-[2.4rem] pt-[5rem]">
      <div className="mt-[3.2rem] flex w-full flex-col gap-[1.6rem]">
        <Button title="고민 상담하기" className="bg-blue-80 text-white" />

        <Button title="다음" className="bg-[#B7D589] text-white" />

        <Button title="다음" className="bg-gray-10 text-gray-50" disabled />

        <Button title="공유하기" className="w-full bg-[#0846A5] text-white" />
      </div>
    </div>
  );
};

export default Main;
