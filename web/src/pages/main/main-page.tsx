import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

import mainMenu from '@/assets/main-menu.svg';
import Button from '@/shared/components/button/button';
import { cn } from '@/shared/libs/cn';

const Main = () => {
  const [activeCategory, setActiveCategory] = useState<number | null>(null);
  const navigate = useNavigate();

  const categories = [
    { id: 1, title: '모든 고민' },
    { id: 2, title: '학업' },
    { id: 3, title: '관계' },
    { id: 4, title: '직장' },
    { id: 5, title: '진로' },
    { id: 6, title: '건강' },
    { id: 7, title: '경제' },
    { id: 8, title: '기타' },
  ];

  const cardItems = [
    { id: 1, title: '학업' },
    { id: 2, title: '학업' },
    { id: 3, title: '학업' },
    { id: 4, title: '학업' },
  ];

  return (
    <div className="flex h-[100vh] flex-col">
      {/* 상단 영역 */}
      <div className="h-[29.4rem] w-full bg-[linear-gradient(180deg,#001536_0%,#00317E_100%)]">
        <div className="mb-[3.4rem] flex justify-between px-[2.4rem] py-[1.3rem]">
          <div>
            <div className="h2 text-blue-60">서비스 명</div>
          </div>
          <img src={mainMenu} alt="Image not found" />
        </div>

        <div className="mb-[3.2rem] flex flex-col">
          <div className="pl-[2.4rem] text-[2.4rem] text-white">
            {'{닉네임님},'}
          </div>
          <div className="pl-[2.4rem] text-[2.4rem] text-white">
            가볍게 털고 가요. 무해한걸로요!
          </div>
        </div>

        <div className="mb-[2.4rem] px-[2.4rem]">
          <Button
            title="무해한 위로/챌린지 받기"
            className="bg-blue-80 text-[2.0rem] text-white"
            onClick={() => navigate('/worry')}
          />
        </div>
      </div>

      {/* 카드 영역 */}
      <div className="mt-[2.4rem] flex h-full flex-col bg-[#FAFAFA]">
        {/* 카테고리 스크롤 영역 */}
        <div className="scrollbar-hide mb-[1.6rem] flex flex-row gap-[0.8rem] overflow-x-auto pl-[2.4rem] text-[1.6rem]">
          {categories.map((category) => (
            <Button
              key={category.id}
              onClick={() => setActiveCategory(category.id)}
              title={category.title}
              className={cn(
                'border-gray-10 rounded-[0.6rem] border-[1px] px-[1.6rem] py-[0.8rem] whitespace-nowrap',
                activeCategory === category.id
                  ? 'bg-blue-20 text-white'
                  : 'text-gray-40 bg-white',
              )}
            />
          ))}
        </div>

        {/* 카드 리스트 / 비었을 때 */}
        {cardItems.length === 0 ? (
          <div className="flex h-full flex-col items-center justify-center">
            <div className="text-center text-[2.5rem]">
              텅~ 비었어요
              <br />
              <br />
              무해하게 털어놓고 가요!
            </div>
          </div>
        ) : (
          <div className="grid grid-cols-2 gap-[1.2rem] px-[2.4rem]">
            {cardItems.map((item) => (
              <div
                key={item.id}
                className="border-gray-10 h-[24rem] w-[19rem] rounded-[1.6rem] border-[1px] bg-white p-[1.6rem] text-[1.6rem]"
              >
                <div className="text-blue-60">
                  <div>#{item.title}</div>
                </div>

                <div className="text-gray-60 flex flex-col justify-center px-[3rem] py-[4rem] text-[2.4rem]">
                  <div>와작 와작</div>
                  <div>과자 먹기</div>
                </div>

                <div className="flex flex-row justify-end">
                  <div className="text-gray-40">2025.10.15</div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default Main;
