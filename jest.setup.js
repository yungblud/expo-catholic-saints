/* eslint-disable no-undef */
// Jest setup file
import '@testing-library/react-native/extend-expect';

// Mock expo-router
jest.mock('expo-router', () => ({
  useRouter: () => ({
    push: jest.fn(),
    replace: jest.fn(),
    back: jest.fn(),
  }),
  useLocalSearchParams: () => ({}),
  useSegments: () => [],
  Stack: {
    Screen: () => null,
  },
}));

// Mock @expo/vector-icons
jest.mock('@expo/vector-icons', () => ({
  Ionicons: 'Ionicons',
}));

// Mock expo-sqlite
jest.mock('expo-sqlite', () => ({
  openDatabaseSync: jest.fn(() => ({})),
}));

// Mock tinybase expo-sqlite persister
jest.mock('tinybase/persisters/persister-expo-sqlite', () => ({
  createExpoSqlitePersister: jest.fn(() => ({
    load: jest.fn(async () => {}),
    save: jest.fn(async () => {}),
  })),
}));

// Mock tinybase browser persister
jest.mock('tinybase/persisters/persister-browser', () => ({
  createLocalPersister: jest.fn(() => ({
    load: jest.fn(async () => {}),
    save: jest.fn(async () => {}),
  })),
}));
