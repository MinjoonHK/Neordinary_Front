type StepCategoryProps = {
  name: string;
  selectedCategory: string | null;
  onSelectCategory: (category: string) => void;
  onRequestExit: () => void;
};

const CATEGORIES = [
  '학업',
  '직장',
  '가족',
  '진로',
  '건강',
  '관계',
  '경제',
  '기타',
];

const StepCategory = ({
  name,
  selectedCategory,
  onSelectCategory,
  onRequestExit,
}: StepCategoryProps) => {
  return (
    <section className="flex flex-col gap-[2.4rem]">
      <div className="flex flex-col gap-[0.4rem]">
        <h1 className="h2">
          {name}이 가지고 계신 고민의
          <br />
          카테고리를 선택해주세요!
        </h1>
        <p className="b3 text-gray-70">카테고리는 한 가지만 선택할 수 있어요</p>
      </div>

      <div className="grid grid-cols-3 gap-[0.8rem]">
        {CATEGORIES.map((category) => {
          const isActive = selectedCategory === category;

          return (
            <button
              key={category}
              type="button"
              onClick={() => onSelectCategory(category)}
              className={
                'h-[4.8rem] rounded-[16px] border text-center ' +
                (isActive
                  ? 'border-blue-60 bg-blue-5 text-blue-80'
                  : 'border-gray-20 text-gray-90 bg-white')
              }
            >
              <span className="b2">{category}</span>
            </button>
          );
        })}
      </div>

      {/* 헤더 뒤로가기 대신 쓸 수 있는 나가기 버튼이 필요하면 여기서 사용 */}
      {/* <button type="button" onClick={onRequestExit}>나가기</button> */}
    </section>
  );
};

export default StepCategory;
