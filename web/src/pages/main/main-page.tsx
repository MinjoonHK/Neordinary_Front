import starsIcon from '@icons/stars.svg';
import { useQuery } from '@tanstack/react-query';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

import { axiosClient } from '@/shared/apis/axios-client';
import Button from '@/shared/components/button/button';
import { cn } from '@/shared/libs/cn';
import { ChallengeListType } from '@/shared/types/challenge-list-type';

const ENUM_TO_LABEL: Record<string, string> = {
  STUDY: '학업',
  JOB: '직장',
  FAMILY: '가족',
  CAREER: '진로',
  HEALTH: '건강',
  RELATION: '관계',
  FINANCE: '경제',
  ETC: '기타',
};

const getCategoryLabel = (code?: string | null) => {
  if (!code) return '전체';
  return ENUM_TO_LABEL[code] ?? '기타';
};

const formatDate = (iso?: string | null) => {
  if (!iso) return '';
  const base = iso.slice(0, 10);
  return base.split('-').join('.');
};

const Main = () => {
  const [activeCategory, setActiveCategory] = useState<number | null>(null);
  const navigate = useNavigate();

  // 순서/라벨 변경된 카테고리
  const categories = [
    { id: 1, title: '전체', enumValue: null as string | null },
    { id: 2, title: '학업', enumValue: 'STUDY' },
    { id: 3, title: '직장', enumValue: 'JOB' },
    { id: 4, title: '가족', enumValue: 'FAMILY' },
    { id: 5, title: '진로', enumValue: 'CAREER' },
    { id: 6, title: '건강', enumValue: 'HEALTH' },
    { id: 7, title: '관계', enumValue: 'RELATION' },
    { id: 8, title: '경제', enumValue: 'FINANCE' },
    { id: 9, title: '기타', enumValue: 'ETC' },
  ];

  const selectedCategoryEnum =
    categories.find((c) => c.id === activeCategory)?.enumValue ?? null;

  const { data: challengesInfo } = useQuery({
    queryKey: ['challengesInfo', selectedCategoryEnum],
    queryFn: () =>
      axiosClient
        .get<ChallengeListType>('/challenges', {
          params: selectedCategoryEnum
            ? { category: selectedCategoryEnum }
            : {},
        })
        .then((res) => res.data),
  });

  const nickname = challengesInfo?.data?.nickname ?? '닉네임';
  const cardItems = challengesInfo?.data?.challenges ?? [];

  const goToCardDetail = (item: {
    id: number | string;
    title: string;
    category: string;
    imageUrl: string | null;
    createdAt: string | null;
  }) => {
    navigate(`/card/${item.id}`, {
      state: {
        id: item.id,
        title: item.title,
        category: item.category,
        imageUrl: item.imageUrl,
        createdAt: item.createdAt,
      },
    });
  };

  console.log(challengesInfo?.data);

  return (
    <div className="flex min-h-svh flex-col">
      <div className="h-[30rem] w-full bg-[linear-gradient(180deg,#001536_0%,#00317E_100%)]">
        <div className="flex justify-between px-[2.4rem] py-[1.3rem] pb-[3.4rem]">
          <div>
            <div className="text-blue-60 font-juache text-[3rem]">소소로</div>
          </div>
        </div>

        <div className="flex flex-col pb-[3.2rem]">
          <div className="pl-[2.4rem] text-[2.4rem] text-white">
            {`${nickname}님,`}
          </div>
          <div className="pl-[2.4rem] text-[2.4rem] text-white">
            가볍게 털고 가요.
          </div>
        </div>

        <div className="px-[2.4rem] pb-[2.4rem]">
          <Button
            title="무해한 위로/챌린지 받기"
            className="bg-blue-80 text-[2.0rem] text-white"
            onClick={() => navigate('/worry')}
          />
        </div>
      </div>

      <div className="mt-[2.4rem] flex flex-1 flex-col bg-[#FAFAFA]">
        <div className="scrollbar-hide flex gap-[0.8rem] overflow-x-auto pb-[1.6rem] pl-[2.4rem] text-[1.6rem]">
          {categories.map((category) => (
            <Button
              key={category.id}
              onClick={() => setActiveCategory(category.id)}
              title={category.title}
              className={cn(
                'rounded-[6px] px-[1.6rem] py-[0.8rem] whitespace-nowrap',
                activeCategory === category.id
                  ? 'bg-blue-60 text-white'
                  : 'border-gray-10 border bg-white text-gray-50',
              )}
            />
          ))}
        </div>

        {cardItems.length === 0 ? (
          <div className="flex-col-center flex-1 gap-[1.6rem]">
            <img src={starsIcon} className="w-[9.6rem]" />
            <p className="b1 text-center text-gray-50">텅 비었어요</p>
          </div>
        ) : (
          <div className="grid grid-cols-2 gap-[1.2rem] px-[2.4rem] pb-[2.4rem]">
            {cardItems.map((item) => (
              <div
                key={item.id}
                onClick={() =>
                  goToCardDetail({
                    id: item.id,
                    title: item.title,
                    category: item.category,
                    imageUrl: item.imageUrl,
                    createdAt: item.createdAt,
                  })
                }
                className="border-gray-10 h-[24rem] w-[19rem] cursor-pointer rounded-[1.6rem] border-[1px] bg-white p-[1.6rem] text-[1.6rem]"
              >
                <div className="flex-col-between h-full">
                  <div className="text-blue-60 w-full text-left">
                    #{getCategoryLabel(item.category)}
                  </div>

                  <div className="text-gray-60 text-[2.0rem]">{item.title}</div>

                  <div className="flex-row-end w-full text-right">
                    <div className="text-gray-40 text-[1.2rem]">
                      {formatDate(item.createdAt)}
                    </div>
                  </div>
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
