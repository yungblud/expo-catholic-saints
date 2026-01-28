import React from 'react';
import { render, fireEvent } from '@testing-library/react-native';
import { SearchInput } from '@/components/search/SearchInput';

describe('SearchInput', () => {
  it('should render with placeholder', () => {
    const { getByPlaceholderText } = render(
      <SearchInput value="" onChangeText={jest.fn()} placeholder="검색어를 입력하세요" />
    );
    expect(getByPlaceholderText('검색어를 입력하세요')).toBeTruthy();
  });

  it('should display the current value', () => {
    const { getByDisplayValue } = render(
      <SearchInput value="프란치스코" onChangeText={jest.fn()} />
    );
    expect(getByDisplayValue('프란치스코')).toBeTruthy();
  });

  it('should call onChangeText when text changes', () => {
    const onChangeText = jest.fn();
    const { getByTestId } = render(
      <SearchInput value="" onChangeText={onChangeText} testID="search-input" />
    );

    fireEvent.changeText(getByTestId('search-input'), '베드로');
    expect(onChangeText).toHaveBeenCalledWith('베드로');
  });

  it('should show clear button when value is not empty', () => {
    const { getByTestId } = render(
      <SearchInput value="test" onChangeText={jest.fn()} testID="search-input" />
    );
    expect(getByTestId('clear-button')).toBeTruthy();
  });

  it('should clear input when clear button is pressed', () => {
    const onChangeText = jest.fn();
    const { getByTestId } = render(
      <SearchInput value="test" onChangeText={onChangeText} testID="search-input" />
    );

    fireEvent.press(getByTestId('clear-button'));
    expect(onChangeText).toHaveBeenCalledWith('');
  });

  it('should have correct accessibility label', () => {
    const { getByLabelText } = render(<SearchInput value="" onChangeText={jest.fn()} />);
    expect(getByLabelText('검색')).toBeTruthy();
  });
});
