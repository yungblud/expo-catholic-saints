/* eslint-disable @typescript-eslint/no-require-imports, import/order, import/first */
import React from 'react';
import { render } from '@testing-library/react-native';

const mockStatusBar = jest.fn();
jest.mock('expo-status-bar', () => ({
  StatusBar: (props: Record<string, unknown>) => {
    mockStatusBar(props);
    return null;
  },
}));

jest.mock('expo-splash-screen', () => ({
  preventAutoHideAsync: jest.fn(),
  hideAsync: jest.fn(),
}));

jest.mock('expo-router', () => {
  const MockStack = ({ children }: { children: React.ReactNode }) => <>{children}</>;
  MockStack.displayName = 'MockStack';
  MockStack.Screen = () => null;
  return { Stack: MockStack };
});

jest.mock('@/lib/store/saints', () => ({
  initializeSaintsStore: jest.fn(),
}));

jest.mock('@/global.css', () => ({}));

const RN = require('react-native');

import RootLayout from '../_layout';

describe('RootLayout - StatusBar Color Scheme', () => {
  beforeEach(() => {
    jest.clearAllMocks();
    jest.restoreAllMocks();
  });

  it('renders StatusBar with style="dark" (dark text) when colorScheme is "light"', () => {
    jest.spyOn(RN, 'useColorScheme').mockReturnValue('light');
    render(<RootLayout />);
    expect(mockStatusBar).toHaveBeenCalledWith(expect.objectContaining({ style: 'dark' }));
  });

  it('renders StatusBar with style="light" (light text) when colorScheme is "dark"', () => {
    jest.spyOn(RN, 'useColorScheme').mockReturnValue('dark');
    render(<RootLayout />);
    expect(mockStatusBar).toHaveBeenCalledWith(expect.objectContaining({ style: 'light' }));
  });

  it('renders StatusBar with style="dark" when colorScheme is null (fallback to light mode)', () => {
    jest.spyOn(RN, 'useColorScheme').mockReturnValue(null);
    render(<RootLayout />);
    expect(mockStatusBar).toHaveBeenCalledWith(expect.objectContaining({ style: 'dark' }));
  });

  it('updates StatusBar style when colorScheme changes from light to dark', () => {
    const spy = jest.spyOn(RN, 'useColorScheme').mockReturnValue('light');
    const { rerender } = render(<RootLayout />);
    expect(mockStatusBar).toHaveBeenCalledWith(expect.objectContaining({ style: 'dark' }));

    mockStatusBar.mockClear();
    spy.mockReturnValue('dark');
    rerender(<RootLayout />);
    expect(mockStatusBar).toHaveBeenCalledWith(expect.objectContaining({ style: 'light' }));
  });
});
