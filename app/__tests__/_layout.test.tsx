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

import RootLayout from '../_layout';

describe('RootLayout - StatusBar', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('renders StatusBar with style="dark"', () => {
    render(<RootLayout />);
    expect(mockStatusBar).toHaveBeenCalledWith(expect.objectContaining({ style: 'dark' }));
  });
});
