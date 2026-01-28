import React from 'react';
import { render, fireEvent } from '@testing-library/react-native';
import { SaintDetail } from '@/components/saints/SaintDetail';
import { Saint } from '@/lib/types/saints';

const mockSaint: Saint = {
  id: 'francis-assisi',
  nameKo: '아시시의 성 프란치스코',
  nameEn: 'Saint Francis of Assisi',
  nameLatin: 'Franciscus Assisiensis',
  shortName: '프란치스코',
  feastMonth: 10,
  feastDay: 4,
  patronages: ['동물', '환경', '이탈리아'],
  patronageCategories: ['cause', 'location'],
  biography: '아시시의 성 프란치스코(1181/1182-1226)는 이탈리아의 수도자이자 프란치스코회의 창설자입니다. 부유한 상인의 아들로 태어났으나 모든 것을 버리고 가난과 청빈의 삶을 선택했습니다.',
  birthYear: 1182,
  deathYear: 1226,
  canonizationYear: 1228,
  initials: '프',
};

describe('SaintDetail', () => {
  it('should render saint name in Korean', () => {
    const { getByText } = render(
      <SaintDetail saint={mockSaint} isFavorite={false} onFavoriteToggle={jest.fn()} />
    );
    expect(getByText('아시시의 성 프란치스코')).toBeTruthy();
  });

  it('should render saint name in English', () => {
    const { getByText } = render(
      <SaintDetail saint={mockSaint} isFavorite={false} onFavoriteToggle={jest.fn()} />
    );
    expect(getByText('Saint Francis of Assisi')).toBeTruthy();
  });

  it('should render feast day', () => {
    const { getByText } = render(
      <SaintDetail saint={mockSaint} isFavorite={false} onFavoriteToggle={jest.fn()} />
    );
    expect(getByText('10월 4일')).toBeTruthy();
  });

  it('should render biography', () => {
    const { getByText } = render(
      <SaintDetail saint={mockSaint} isFavorite={false} onFavoriteToggle={jest.fn()} />
    );
    expect(getByText(/이탈리아의 수도자/)).toBeTruthy();
  });

  it('should render patronages', () => {
    const { getByText } = render(
      <SaintDetail saint={mockSaint} isFavorite={false} onFavoriteToggle={jest.fn()} />
    );
    expect(getByText('동물')).toBeTruthy();
    expect(getByText('환경')).toBeTruthy();
  });

  it('should render life years', () => {
    const { getByText } = render(
      <SaintDetail saint={mockSaint} isFavorite={false} onFavoriteToggle={jest.fn()} />
    );
    expect(getByText('1182-1226')).toBeTruthy();
  });

  it('should call onFavoriteToggle when favorite button is pressed', () => {
    const onFavoriteToggle = jest.fn();
    const { getByTestId } = render(
      <SaintDetail saint={mockSaint} isFavorite={false} onFavoriteToggle={onFavoriteToggle} />
    );

    fireEvent.press(getByTestId('favorite-toggle'));
    expect(onFavoriteToggle).toHaveBeenCalled();
  });

  it('should show filled heart when isFavorite is true', () => {
    const { getByTestId } = render(
      <SaintDetail saint={mockSaint} isFavorite={true} onFavoriteToggle={jest.fn()} />
    );
    expect(getByTestId('favorite-filled')).toBeTruthy();
  });
});
