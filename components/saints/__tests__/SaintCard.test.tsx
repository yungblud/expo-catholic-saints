import React from 'react';
import { render, fireEvent } from '@testing-library/react-native';
import { SaintCard } from '@/components/saints/SaintCard';
import { Saint } from '@/lib/types/saints';

const mockSaint: Saint = {
  id: 'francis-assisi',
  nameKo: '아시시의 성 프란치스코',
  nameEn: 'Saint Francis of Assisi',
  nameLatin: 'Franciscus Assisiensis',
  shortName: '프란치스코',
  feastMonth: 10,
  feastDay: 4,
  patronages: ['동물', '환경'],
  patronageCategories: ['cause', 'location'],
  biography: '아시시의 성 프란치스코는 이탈리아의 수도자이자 프란치스코회의 창설자입니다.',
  birthYear: 1182,
  deathYear: 1226,
  canonizationYear: 1228,
  initials: '프',
};

describe('SaintCard', () => {
  it('should render saint name in Korean', () => {
    const { getByText } = render(
      <SaintCard saint={mockSaint} onPress={jest.fn()} />
    );
    expect(getByText('아시시의 성 프란치스코')).toBeTruthy();
  });

  it('should render feast day', () => {
    const { getByText } = render(
      <SaintCard saint={mockSaint} onPress={jest.fn()} />
    );
    expect(getByText('10월 4일')).toBeTruthy();
  });

  it('should render avatar with initials', () => {
    const { getByText } = render(
      <SaintCard saint={mockSaint} onPress={jest.fn()} />
    );
    expect(getByText('프')).toBeTruthy();
  });

  it('should call onPress when pressed', () => {
    const onPress = jest.fn();
    const { getByTestId } = render(
      <SaintCard saint={mockSaint} onPress={onPress} testID="saint-card" />
    );

    fireEvent.press(getByTestId('saint-card'));
    expect(onPress).toHaveBeenCalledWith(mockSaint);
  });

  it('should show favorite icon when isFavorite is true', () => {
    const { getByTestId } = render(
      <SaintCard saint={mockSaint} onPress={jest.fn()} isFavorite={true} />
    );
    expect(getByTestId('favorite-icon')).toBeTruthy();
  });

  it('should call onFavoriteToggle when favorite button is pressed', () => {
    const onFavoriteToggle = jest.fn();
    const { getByTestId } = render(
      <SaintCard
        saint={mockSaint}
        onPress={jest.fn()}
        onFavoriteToggle={onFavoriteToggle}
      />
    );

    fireEvent.press(getByTestId('favorite-button'));
    expect(onFavoriteToggle).toHaveBeenCalledWith(mockSaint.id);
  });
});
