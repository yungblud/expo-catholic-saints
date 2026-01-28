# Research: Catholic Saints Search

**Feature**: 001-saints-search
**Date**: 2026-01-28

## Technology Decisions

### 1. Local State Management: TinyBase

**Decision**: TinyBase를 로컬 상태 관리 및 데이터 저장에 사용

**Rationale**:
- React Native/Expo와 완벽 호환
- JSON 데이터를 테이블 형태로 쿼리 가능
- 반응형 구독으로 UI 자동 업데이트
- AsyncStorage 통합으로 즐겨찾기 영속화 지원
- 번들 크기가 작음 (~15KB gzipped)

**Alternatives Considered**:
- **Zustand**: 더 간단하지만 쿼리/필터링 기능이 제한적
- **Redux Toolkit**: 오버헤드가 큼, 이 규모에 불필요
- **SQLite (expo-sqlite)**: 강력하지만 1,000개 레코드에는 과도함
- **WatermelonDB**: 복잡한 설정, 동기화 기능 불필요

### 2. Saint Data Format: Bundled JSON

**Decision**: 성인 데이터를 JSON 파일로 앱에 번들

**Rationale**:
- 서버 의존성 제거로 100% 오프라인 지원
- 앱 시작 시 즉시 로드 가능
- 간단한 업데이트 (앱 업데이트 시)
- 예상 크기: ~2-3MB (1,000+ 성인, 한글 약력 포함)

**Alternatives Considered**:
- **SQLite DB 파일**: 쿼리 성능 우수하나 설정 복잡
- **External API**: 네트워크 의존성, 서버 비용 발생
- **Firebase/Supabase**: 불필요한 복잡성, 비용

### 3. Routing: Expo Router v3

**Decision**: Expo Router의 파일 기반 라우팅 사용

**Rationale**:
- Expo SDK 52+와 기본 통합
- 파일 시스템 기반 직관적 구조
- Deep linking 자동 지원
- 타입 안전한 네비게이션

**Alternatives Considered**:
- **React Navigation 직접 사용**: 더 많은 설정 필요
- **솔루션 스택 통합**: 불필요한 복잡성

### 4. Styling: NativeWind (Tailwind for RN)

**Decision**: NativeWind로 유틸리티 기반 스타일링

**Rationale**:
- 빠른 UI 개발
- 일관된 디자인 시스템
- 반응형 디자인 유틸리티 내장
- 다크 모드 지원 용이

**Alternatives Considered**:
- **StyleSheet (기본)**: 장황함, 일관성 유지 어려움
- **Styled Components**: 런타임 오버헤드
- **Tamagui**: 학습 곡선, 이 규모에 과도함

### 5. Search Algorithm: Client-side Full-text Search

**Decision**: Fuse.js를 활용한 클라이언트 사이드 퍼지 검색

**Rationale**:
- 1,000개 레코드에 충분한 성능
- 오타 허용 (fuzzy matching)
- 한글/영어/라틴어 동시 검색 지원
- 추가 서버/인덱스 불필요

**Alternatives Considered**:
- **단순 문자열 포함 검색**: 정확도 낮음
- **FlexSearch**: 더 빠르지만 한글 지원 제한적
- **Lunr.js**: 영어 최적화, 한글 성능 미확인

## Data Source Research

### Catholic Saints Data

**Identified Sources**:
1. **Catholic.org Saints Database**: 영문 데이터 풍부
2. **Vatican Martyrologium Romanum**: 공식 전례력 기준
3. **한국 천주교 주교회의**: 한글 성인 이름 표준

**Data Fields Required**:
```typescript
interface Saint {
  id: string;
  nameKo: string;           // 한글 이름 (검색용)
  nameEn: string;           // 영어 이름 (검색용)
  nameLatin?: string;       // 라틴어 이름 (선택)
  feastMonth: number;       // 축일 월 (1-12)
  feastDay: number;         // 축일 일 (1-31)
  patronages: string[];     // 수호 분야 목록
  biography: string;        // 약력 (한글)
  birthYear?: number;       // 출생 연도
  deathYear?: number;       // 사망 연도
  canonizationYear?: number; // 시성 연도
}
```

**Data Preparation Plan**:
1. 공개 데이터 소스에서 영문 데이터 수집
2. 한글 번역 및 한국 천주교 표준 이름 매핑
3. JSON 파일로 정규화 및 검증
4. 앱 번들에 포함

## Performance Considerations

### Search Performance Target: <0.5s

**Approach**:
- TinyBase 인덱싱으로 O(1) ID 조회
- Fuse.js 퍼지 검색 최적화 (threshold, keys 설정)
- 결과 개수 제한 (최대 50개 표시)
- 디바운스 300ms로 연속 입력 최적화

### Cold Start Target: <5s

**Approach**:
- JSON 파일 지연 로딩 (앱 시작 후 백그라운드)
- 첫 화면 (오늘의 성인)은 별도 캐시
- TinyBase 초기화를 스플래시 화면에서 완료

### Memory Footprint

**Estimate**:
- 1,000 성인 × 평균 2KB = ~2MB 데이터
- TinyBase 인덱스 오버헤드: ~500KB
- 총 예상: 3-5MB 런타임 메모리

## Best Practices Applied

### Expo/React Native

- **File-based routing**: Expo Router 표준 패턴
- **Feature-first organization**: 기능별 컴포넌트 그룹화
- **Custom hooks**: 데이터 로직 캡슐화 (useSaint, useSearch, useFavorites)
- **Memo/Callback**: 불필요한 리렌더링 방지

### TinyBase

- **Store initialization**: 앱 시작 시 한 번만
- **Reactive queries**: useTable, useRow 훅 활용
- **Persistence listener**: AsyncStorage 자동 동기화

### Testing

- **Component testing**: React Native Testing Library
- **Hook testing**: @testing-library/react-hooks
- **Integration testing**: 사용자 시나리오 기반
- **Snapshot testing**: UI 회귀 방지 (선택적)
