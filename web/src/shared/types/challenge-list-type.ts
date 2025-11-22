import { BaseResponse } from '@/shared/types/base-response-type';

export interface ChallengeType {
  nickname: string;
  challenges: {
    id: number;
    title: string;
    imageUrl: string;
    category: string;
    createdAt: string;
  }[];
}

export type ChallengeListType = BaseResponse<ChallengeType>;
