# Spec: Expo Web SST 배포 인프라

## Overview

Expo web 앱을 SST v3 기반으로 AWS에 정적 배포하는 인프라를 구축한다. S3 + CloudFront + Route 53 아키텍처를 사용하며, GitHub Actions CI/CD로 staging/production 배포를 자동화한다.

## User Stories

### US1: 배포 인프라 셋업 (P1)

**As a** 개발자
**I want** SST v3로 Expo web 정적 사이트를 AWS에 배포할 수 있는 인프라를
**So that** S3 + CloudFront를 통해 글로벌 CDN으로 웹 앱을 서빙할 수 있다

**Acceptance Criteria:**

- SST v3가 devDependency로 설치됨
- `sst.config.ts`가 StaticSite 컴포넌트를 올바르게 구성함
- `npx expo export -p web` 빌드 결과물을 `dist/` 에서 서빙함
- `errorPage: "/index.html"`로 SPA fallback 동작
- 캐시 정책: 정적 에셋은 immutable, HTML은 no-cache
- staging/production 스테이지별 도메인 및 삭제 정책 분기

### US2: CI/CD 파이프라인 (P1)

**As a** 개발자
**I want** GitHub Actions로 staging/production 자동 배포 파이프라인을
**So that** main push 시 staging 자동 배포, 수동 dispatch로 production 배포가 가능하다

**Acceptance Criteria:**

- main push → staging 자동 배포
- workflow_dispatch → staging 또는 production 선택 배포
- GitHub OIDC → AWS IAM Role 인증 (access key 불필요)
- 스테이지별 concurrency 제어
- GitHub Environments (`staging`, `production`) 활용

### US3: 개발자 경험 (P2)

**As a** 개발자
**I want** 로컬에서 쉽게 배포/제거할 수 있는 npm 스크립트와 문서를
**So that** 배포 프로세스를 빠르게 실행하고 참조할 수 있다

**Acceptance Criteria:**

- `deploy:staging`, `deploy:production` 스크립트로 원커맨드 배포
- `sst:dev`, `sst:remove:staging`, `sst:remove:production` 유틸리티 스크립트
- `.env.example`에 필요한 환경변수 문서화
- `.gitignore`에 `.sst/` 추가
- `docs/expo-web-deployment.md`에 아키텍처, 라우팅, 캐시, AWS 설정 가이드
