# spec-kit-expo-app Development Guidelines

Auto-generated from all feature plans. Last updated: 2026-01-28

## Active Technologies

- SST v3, AWS (S3, CloudFront, Route 53), GitHub Actions OIDC (006-sst-deployment)

- TypeScript 5.x + Expo SDK 52+, React Native 0.76 + expo-router ~4.0.0, NativeWind 4.x, react-native-web ~0.19.13 (005-privacy-policy-web)
- N/A (정적 콘텐츠, 데이터 저장 없음) (005-privacy-policy-web)

- TypeScript 5.x + Expo SDK 52+, React Native 0.76, expo-status-bar ~2.0.0, expo-router ~4.0.0, NativeWind 4.x (004-statusbar-color-scheme)
- N/A (시스템 상태 참조만, 영속성 없음) (004-statusbar-color-scheme)

- TypeScript 5.x, Expo SDK 52+ + EAS CLI, expo-dev-client, expo-updates (003-eas-build)
- EAS Cloud (빌드 아티팩트, 자격 증명) (003-eas-build)

- Markdown (documentation), YAML (frontmatter metadata) + None (문서 기반 방법론) (002-skills-dev-methodology)
- File system (`.agents/skills/` directory) (002-skills-dev-methodology)

- TypeScript 5.x + Expo SDK 52+, React Native, Expo Router, TinyBase (local state/persistence) (001-saints-search)

## Project Structure

```text
src/
tests/
```

## Commands

npm test && npm run lint

## Code Style

TypeScript 5.x: Follow standard conventions

## Recent Changes

- 006-sst-deployment: Added SST v3 for Expo web static deployment (S3 + CloudFront + Route 53), GitHub Actions CI/CD with OIDC

- 005-privacy-policy-web: Added TypeScript 5.x + Expo SDK 52+, React Native 0.76 + expo-router ~4.0.0, NativeWind 4.x, react-native-web ~0.19.13

- 004-statusbar-color-scheme: Added TypeScript 5.x + Expo SDK 52+, React Native 0.76, expo-status-bar ~2.0.0, expo-router ~4.0.0, NativeWind 4.x

- 003-eas-build: Added TypeScript 5.x, Expo SDK 52+ + EAS CLI, expo-dev-client, expo-updates

<!-- MANUAL ADDITIONS START -->

## SST Web Deployment

- `sst.config.ts`는 프로젝트 TypeScript/ESLint와 분리됨 (`tsconfig.json` exclude, `.eslintrc.js` ignorePatterns)
- SST 타입 정의 (`.sst/platform/config.d.ts`)는 첫 `sst dev` 또는 `sst deploy` 실행 시 자동 생성
- 스테이지: staging (`staging.${DOMAIN}`), production (`${DOMAIN}` + www 리다이렉트)
- CI/CD: `.github/workflows/deploy-web.yml` — main push → staging, workflow_dispatch → production
- 배포 가이드: `docs/expo-web-deployment.md`

## expo-dev-client Conditional Configuration

- `app.config.ts`가 `app.json`의 plugins를 오버라이드하여 `expo-dev-client`를 조건부 포함
- EAS 빌드 시 자동 설정되는 `EAS_BUILD_PROFILE` 환경변수로 분기
- 로컬 빌드 (`expo run:ios/android`): `expo-dev-client` 플러그인 미포함
- EAS development/development:device 빌드: `expo-dev-client` 플러그인 포함

## Saints Data Bulk Update

- 데이터 파일: `data/saints.json` (version 필드로 버전 관리)
- 스키마 정의: `lib/types/saints.ts` (Zod 런타임 검증)
- 벌크 업데이트 스크립트: `scripts/bulk-update-saints.ts`

### 데이터 원천 및 검증

- **현재 데이터 생성 방식**: Claude (LLM)의 가톨릭 성인 지식 기반으로 생성
- **한국어 이름**: 한국 천주교 주교회의 공식 표기법 기준 (예: Francis → 프란치스코, Augustine → 아우구스티노)
- **축일(feast day)**: 로마 전례력(General Roman Calendar) 기준
- **수호 성인 분야(patronages)**: 가톨릭교회 공식 인정 또는 전통적 공경 기반
- **참고 가능한 공신력 있는 출처**:
  - 한국 천주교 주교회의 (https://cbck.or.kr) — 한국어 성인명, 축일
  - Vatican News (https://www.vaticannews.va) — 공식 시성/시복 정보
  - Catholic Online Saints (https://www.catholic.org/saints) — 영문 성인 정보, 수호 분야
  - Butler's Lives of the Saints — 전기 정보의 표준 참고 문헌
- **데이터 정확성 주의사항**:
  - LLM 생성 데이터는 연도, 라틴어명 등에서 부정확할 수 있으므로 위 출처로 교차 검증 권장
  - 특히 `birthYear`, `deathYear`, `canonizationYear`는 출처에 따라 다를 수 있음
  - `biography`는 핵심 사실 위주로 작성되어 있으나, 세부 사항은 원천 확인 필요

### 벌크 업데이트 방법

1. 새 성인 데이터를 배치 JSON 파일로 작성 (예: `data/saints-batch-N.json`)
   - 형식: `{ "saints": [ { ...saintFields }, ... ] }`
   - 필수 필드: `id`, `nameKo`, `nameEn`, `shortName`, `feastMonth`, `feastDay`, `patronages`, `patronageCategories`, `biography` (50자 이상), `initials` (1자)
   - 선택 필드: `nameLatin`, `birthYear`, `deathYear`, `canonizationYear`
   - `id` 규칙: 소문자 알파벳, 숫자, 하이픈만 사용 (`^[a-z0-9-]+$`)
   - `patronageCategories`: `occupation`, `location`, `situation`, `illness`, `cause`, `other` 중 선택
2. 스크립트 실행: `npx tsx scripts/bulk-update-saints.ts data/saints-batch-N.json`
   - 기존 데이터와 자동 병합 (ID 기준 중복 제거)
   - Zod 스키마로 전체 데이터 검증
   - 버전 자동 증가 및 타임스탬프 갱신
3. 배치 파일은 작업 완료 후 삭제 가능

<!-- MANUAL ADDITIONS END -->
