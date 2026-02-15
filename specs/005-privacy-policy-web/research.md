# Research: 005-privacy-policy-web

**Date**: 2026-02-15
**Feature**: 개인정보 처리방침 웹 페이지

## R1: Expo Web 라우팅 방식

**Decision**: Expo Router의 파일 기반 라우팅을 활용하여 `app/privacy-policy.tsx` 경로에 페이지를 추가한다.

**Rationale**:

- 프로젝트는 이미 Expo Router + Metro 번들러 + static output 모드로 웹이 구성되어 있음
- `app.json`에 `"web": { "bundler": "metro", "output": "static" }` 설정이 존재
- `react-native-web`, `react-dom` 의존성이 이미 설치됨
- 파일 기반 라우팅으로 `app/privacy-policy.tsx` → 웹에서 `/privacy-policy` URL로 자동 매핑

**Alternatives considered**:

- 별도 정적 HTML 파일: Expo 프로젝트 구조 밖에 별도 관리 필요, 빌드 파이프라인과 분리됨 → 기각
- Next.js 별도 프로젝트: 단일 정적 페이지를 위해 별도 프로젝트는 과도한 엔지니어링 → 기각

## R2: NativeWind 웹 지원 현황

**Decision**: 기존 NativeWind 4.x 설정을 그대로 활용한다.

**Rationale**:

- `nativewind/preset`이 Tailwind에 설정됨
- `jsxImportSource: 'nativewind'`이 Babel에 설정됨
- `withNativeWind()` 래퍼가 Metro에 설정됨
- `global.css`에 Tailwind 디렉티브 포함
- 반응형 레이아웃 구현에 Tailwind 유틸리티 클래스 사용 가능

**Alternatives considered**: 없음 (이미 완벽히 설정됨)

## R3: 네이티브 앱에서의 라우트 격리

**Decision**: 최상위 라우트 `app/privacy-policy.tsx`로 추가하되, 네이티브 탭/스택 내비게이션에는 포함하지 않는다.

**Rationale**:

- Expo Router에서 `app/` 최상위에 파일을 두면 웹과 네이티브 모두에서 접근 가능
- 그러나 `(tabs)/_layout.tsx`의 탭 바에 포함시키지 않으면 네이티브 앱에서는 직접 내비게이션 경로가 없음
- 웹에서는 URL 직접 접근으로 페이지 로드 가능
- 루트 `_layout.tsx`의 Stack에 Screen을 추가하여 라우트 등록만 하면 됨

**Alternatives considered**:

- `app/(web)/` 그룹 라우트 사용: Expo Router에서 플랫폼별 그룹 라우트는 공식 지원되지 않음 → 기각

## R4: 한국 개인정보보호법(PIPA) 필수 고지 항목

**Decision**: 개인정보보호법 제30조(개인정보 처리방침의 수립 및 공개)에 따른 필수 항목을 포함한다.

**Rationale**: 앱스토어 심사 및 법적 요건 준수를 위해 다음 항목이 필수:

1. 개인정보의 처리 목적
2. 처리하는 개인정보의 항목
3. 개인정보의 처리 및 보유 기간
4. 개인정보의 제3자 제공에 관한 사항
5. 개인정보의 파기 절차 및 방법
6. 정보주체의 권리·의무 및 행사 방법
7. 개인정보 보호책임자 연락처
8. 시행일자

**Note**: 본 앱은 개인정보를 수집하지 않으므로 각 항목에 "해당 없음" 또는 "수집하지 않음"을 명시한다.

## R5: 웹 배포 전략

**Decision**: Expo 정적 웹 빌드(`npx expo export --platform web`)로 생성된 결과물을 배포한다.

**Rationale**:

- `app.json`의 `"output": "static"` 설정으로 정적 HTML/CSS/JS 파일 생성 가능
- 정적 파일은 GitHub Pages, Vercel, Netlify 등 어디든 호스팅 가능
- 배포 플랫폼 선택은 구현 단계에서 결정 (스펙 범위 밖)

**Alternatives considered**: 없음 (기존 설정 활용)
