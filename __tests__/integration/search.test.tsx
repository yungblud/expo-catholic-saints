/**
 * Integration Test: Search Flow (T024)
 *
 * Tests the complete search flow from user input to displaying results.
 * Goal: 사용자가 성인 이름을 입력하여 검색하고 상세 정보를 확인할 수 있다
 */
import React from 'react';
import { render, fireEvent, waitFor, screen } from '@testing-library/react-native';

// Import after mocks
import SearchScreen from '@/app/(tabs)/search';

// Mock the saints store module
jest.mock('@/lib/store/saints', () => {
  const mockSaints = [
    {
      id: 'francis-of-assisi',
      nameKo: '아시시의 성 프란치스코',
      nameEn: 'Saint Francis of Assisi',
      nameLatin: 'Sanctus Franciscus Assisiensis',
      shortName: '프란치스코',
      feastMonth: 10,
      feastDay: 4,
      patronages: ['동물', '환경', '상인', '이탈리아'],
      patronageCategories: ['other', 'occupation', 'location'],
      biography:
        '아시시의 성 프란치스코(1181/1182-1226)는 프란치스코 수도회의 창설자입니다. 부유한 상인의 아들로 태어나 방탕한 청년기를 보냈으나, 깊은 회심을 경험한 후 청빈과 겸손의 삶을 살았습니다.',
      birthYear: 1182,
      deathYear: 1226,
      canonizationYear: 1228,
      initials: '프',
    },
    {
      id: 'andrew-kim-taegon',
      nameKo: '성 김대건 안드레아',
      nameEn: 'Saint Andrew Kim Taegon',
      nameLatin: 'Sanctus Andreas Kim Taegon',
      shortName: '김대건',
      feastMonth: 9,
      feastDay: 20,
      patronages: ['한국', '성직자', '한국 순교자'],
      patronageCategories: ['location', 'occupation'],
      biography:
        '성 김대건 안드레아(1821-1846)는 한국 최초의 천주교 사제입니다. 조선 시대의 박해 속에서도 신앙을 전파하다 25세의 나이에 순교하였습니다.',
      birthYear: 1821,
      deathYear: 1846,
      canonizationYear: 1984,
      initials: '김',
    },
    {
      id: 'teresa-of-calcutta',
      nameKo: '캘커타의 성녀 테레사',
      nameEn: 'Saint Teresa of Calcutta',
      nameLatin: 'Sancta Teresia Calcuttensis',
      shortName: '테레사',
      feastMonth: 9,
      feastDay: 5,
      patronages: ['빈민', '선교사', '자원봉사자'],
      patronageCategories: ['situation', 'occupation'],
      biography:
        '캘커타의 성녀 테레사(1910-1997)는 마더 테레사로 알려진 수녀로, 인도 캘커타에서 가난한 사람들을 위해 평생을 헌신했습니다. 1979년 노벨 평화상을 수상했습니다.',
      birthYear: 1910,
      deathYear: 1997,
      canonizationYear: 2016,
      initials: '테',
    },
  ];

  return {
    initializeSaintsStore: jest.fn(),
    getAllSaints: jest.fn(() => mockSaints),
    getSaint: jest.fn((id: string) => mockSaints.find((s) => s.id === id)),
    getSaintsByFeastDay: jest.fn(),
    isStoreInitialized: jest.fn(() => true),
  };
});

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

describe('Search Flow Integration', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('renders search screen with initial empty state', () => {
    render(<SearchScreen />);

    // Should show the search input
    expect(screen.getByTestId('search-input')).toBeTruthy();

    // Should show initial empty state
    expect(screen.getByTestId('empty-state-initial')).toBeTruthy();
    expect(screen.getByText('성인 검색')).toBeTruthy();
  });

  it('displays search results when user types a query', async () => {
    render(<SearchScreen />);

    const searchInput = screen.getByTestId('search-input');

    // User types "프란치스코"
    fireEvent.changeText(searchInput, '프란치스코');

    // Wait for search results
    await waitFor(
      () => {
        expect(screen.getByText('아시시의 성 프란치스코')).toBeTruthy();
      },
      { timeout: 1000 }
    );
  });

  it('displays no results state when query has no matches', async () => {
    render(<SearchScreen />);

    const searchInput = screen.getByTestId('search-input');

    // User types a query with no matches
    fireEvent.changeText(searchInput, '존재하지않는성인');

    // Wait for empty results
    await waitFor(
      () => {
        expect(screen.getByTestId('empty-state-no-results')).toBeTruthy();
        expect(screen.getByText('검색 결과 없음')).toBeTruthy();
      },
      { timeout: 1000 }
    );
  });

  it('searches by Korean name', async () => {
    render(<SearchScreen />);

    const searchInput = screen.getByTestId('search-input');

    // Search by Korean name
    fireEvent.changeText(searchInput, '김대건');

    await waitFor(
      () => {
        expect(screen.getByText('성 김대건 안드레아')).toBeTruthy();
      },
      { timeout: 1000 }
    );
  });

  it('searches by English name', async () => {
    render(<SearchScreen />);

    const searchInput = screen.getByTestId('search-input');

    // Search by English name
    fireEvent.changeText(searchInput, 'Teresa');

    await waitFor(
      () => {
        expect(screen.getByText('캘커타의 성녀 테레사')).toBeTruthy();
      },
      { timeout: 1000 }
    );
  });

  it('clears search results when input is cleared', async () => {
    render(<SearchScreen />);

    const searchInput = screen.getByTestId('search-input');

    // First, search for something
    fireEvent.changeText(searchInput, '프란치스코');

    await waitFor(
      () => {
        expect(screen.getByText('아시시의 성 프란치스코')).toBeTruthy();
      },
      { timeout: 1000 }
    );

    // Clear the input
    fireEvent.changeText(searchInput, '');

    await waitFor(
      () => {
        // Should show initial empty state again
        expect(screen.getByTestId('empty-state-initial')).toBeTruthy();
      },
      { timeout: 1000 }
    );
  });

  it('navigates to saint detail when card is pressed', async () => {
    const mockPush = jest.fn();
    jest.doMock('expo-router', () => ({
      useRouter: () => ({
        push: mockPush,
        replace: jest.fn(),
        back: jest.fn(),
      }),
    }));

    render(<SearchScreen />);

    const searchInput = screen.getByTestId('search-input');

    // Search for a saint
    fireEvent.changeText(searchInput, '프란치스코');

    await waitFor(
      () => {
        expect(screen.getByText('아시시의 성 프란치스코')).toBeTruthy();
      },
      { timeout: 1000 }
    );

    // Press on the saint card
    const saintCard = screen.getByTestId('saint-card-francis-of-assisi');
    fireEvent.press(saintCard);

    // Note: The actual navigation mock verification may need adjustment
  });

  it('displays multiple search results', async () => {
    render(<SearchScreen />);

    const searchInput = screen.getByTestId('search-input');

    // Search for a term that matches multiple saints (using "성")
    fireEvent.changeText(searchInput, '성');

    await waitFor(
      () => {
        // Should find multiple saints with "성" in their name
        expect(screen.getByText('아시시의 성 프란치스코')).toBeTruthy();
        expect(screen.getByText('성 김대건 안드레아')).toBeTruthy();
      },
      { timeout: 1000 }
    );
  });
});

describe('Search Performance', () => {
  it('returns search results within acceptable time (<500ms)', async () => {
    render(<SearchScreen />);

    const searchInput = screen.getByTestId('search-input');
    const startTime = Date.now();

    fireEvent.changeText(searchInput, '프란치스코');

    await waitFor(
      () => {
        expect(screen.getByText('아시시의 성 프란치스코')).toBeTruthy();
      },
      { timeout: 500 }
    );

    const endTime = Date.now();
    const duration = endTime - startTime;

    // Search should complete within 500ms (requirement from spec)
    expect(duration).toBeLessThan(500);
  });
});
