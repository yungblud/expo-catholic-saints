import { PatronageCategory } from '@/lib/types/saints';

export interface PatronageCategoryInfo {
  id: PatronageCategory;
  nameKo: string;
  nameEn: string;
  description: string;
}

export const PATRONAGE_CATEGORY_INFO: Record<PatronageCategory, PatronageCategoryInfo> = {
  occupation: {
    id: 'occupation',
    nameKo: '직업',
    nameEn: 'Occupation',
    description: '특정 직업군의 수호성인',
  },
  location: {
    id: 'location',
    nameKo: '지역/국가',
    nameEn: 'Location',
    description: '특정 지역이나 국가의 수호성인',
  },
  situation: {
    id: 'situation',
    nameKo: '상황',
    nameEn: 'Situation',
    description: '특정 상황에 처한 사람들의 수호성인',
  },
  illness: {
    id: 'illness',
    nameKo: '질병',
    nameEn: 'Illness',
    description: '특정 질병으로 고통받는 이들의 수호성인',
  },
  cause: {
    id: 'cause',
    nameKo: '대의',
    nameEn: 'Cause',
    description: '특정 가치나 대의의 수호성인',
  },
  other: {
    id: 'other',
    nameKo: '기타',
    nameEn: 'Other',
    description: '기타 수호 분야',
  },
};

export const PATRONAGE_CATEGORIES_LIST = Object.values(PATRONAGE_CATEGORY_INFO);
