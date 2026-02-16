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

<!-- MANUAL ADDITIONS END -->
