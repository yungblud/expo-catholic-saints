# Tasks: Expo Web SST 배포 인프라

**Input**: Design documents from `/specs/006-sst-deployment/`
**Prerequisites**: plan.md (required), spec.md (required for user stories)

**Tests**: Tests are not included — not requested in the feature specification.

**Organization**: Tasks are grouped by user story to enable independent implementation and testing of each story.

## Format: `[ID] [P?] [Story] Description`

- **[P]**: Can run in parallel (different files, no dependencies)
- **[Story]**: Which user story this task belongs to (e.g., US1, US2, US3)
- Include exact file paths in descriptions

---

## Phase 1: Setup (Shared Infrastructure)

**Purpose**: SST 설치 및 프로젝트 기본 설정

- [x] T001 Install SST v3 as devDependency via `pnpm add -D sst`
- [x] T002 [P] Add `.sst/` to `.gitignore`
- [x] T003 [P] Add `sst.config.ts` to exclude list in `tsconfig.json`
- [x] T004 [P] Add `sst.config.ts` to ignorePatterns in `.eslintrc.js`

---

## Phase 2: Foundational (Blocking Prerequisites)

**Purpose**: 없음 — 이 피처는 외부 인프라 의존성만 있고, 코드 수준 blocking prerequisite 없음

**Note**: AWS 사전 설정(Route 53, OIDC, IAM Role, GitHub Environments)은 수동 1회 작업으로 tasks.md 범위 밖

**Checkpoint**: Setup 완료 — user story 구현 시작 가능

---

## Phase 3: User Story 1 - 배포 인프라 셋업 (Priority: P1) 🎯 MVP

**Goal**: SST v3 StaticSite로 Expo web 정적 사이트를 AWS에 배포하는 인프라 정의

**Independent Test**: `SPECIFY_FEATURE=006-sst-deployment npx sst deploy --stage dev` 실행 후 CloudFront URL에서 `/`, `/search`, `/privacy-policy`, `/saint/1` 라우트 정상 동작 확인

### Implementation for User Story 1

- [x] T005 [US1] Create SST config with StaticSite component in `sst.config.ts`
  - `sst.aws.StaticSite` 컴포넌트 사용
  - `path: "."`, `build.command: "npx expo export --platform web"`, `build.output: "dist"`
  - `indexPage: "index.html"`, `errorPage: "/index.html"` (SPA fallback)
  - `region: "ap-northeast-2"` (서울)
- [x] T006 [US1] Configure domain strategy in `sst.config.ts`
  - staging: `staging.${DOMAIN}` (DOMAIN 환경변수)
  - production: `${DOMAIN}` + `www.${DOMAIN}` 리다이렉트
  - 도메인 미설정 시 CloudFront URL fallback
- [x] T007 [US1] Configure cache policy in `sst.config.ts`
  - `**` → `max-age=31536000,public,immutable`
  - `**/*.html` → `max-age=0,no-cache,no-store,must-revalidate`
  - `invalidation: { paths: "all", wait: false }`
- [x] T008 [US1] Configure stage-specific removal and protection in `sst.config.ts`
  - production: `removal: "retain"`, `protect: true`
  - staging/dev: `removal: "remove"`, `protect: false`
- [x] T009 [US1] Configure dev mode in `sst.config.ts`
  - `dev.command: "npx expo start --web"`
  - `dev.url: "http://localhost:8081"`

**Checkpoint**: `sst.config.ts` 완성 — `npx sst deploy --stage dev`로 CloudFront URL 배포 가능

---

## Phase 4: User Story 2 - CI/CD 파이프라인 (Priority: P1)

**Goal**: GitHub Actions로 staging/production 자동 배포 파이프라인 구성

**Independent Test**: GitHub에 push 후 Actions 탭에서 워크플로우 실행 확인, staging 배포 성공 및 CloudFront/커스텀 도메인 접근 확인

### Implementation for User Story 2

- [x] T010 [US2] Create GitHub Actions workflow file at `.github/workflows/deploy-web.yml`
  - Trigger: `push` (main) + `workflow_dispatch` (staging/production 선택)
  - `permissions: id-token: write, contents: read`
- [x] T011 [US2] Configure OIDC authentication in `.github/workflows/deploy-web.yml`
  - `aws-actions/configure-aws-credentials@v4`
  - `role-to-assume: ${{ secrets.AWS_ROLE_ARN }}`
  - `aws-region: ap-northeast-2`
- [x] T012 [US2] Configure build and deploy steps in `.github/workflows/deploy-web.yml`
  - pnpm setup + Node.js 20 + `pnpm install --frozen-lockfile`
  - `npx sst deploy --stage <stage>` (SST가 expo export 자동 실행)
  - `DOMAIN: ${{ vars.DOMAIN }}` 환경변수 전달
- [x] T013 [US2] Configure concurrency and environments in `.github/workflows/deploy-web.yml`
  - `concurrency.group: deploy-web-<stage>`
  - `cancel-in-progress: false`
  - `environment`: staging (push) / 선택값 (dispatch)

**Checkpoint**: GitHub Actions 워크플로우 완성 — main push 시 staging 자동 배포, dispatch로 production 배포

---

## Phase 5: User Story 3 - 개발자 경험 (Priority: P2)

**Goal**: 로컬 배포 스크립트, 환경변수 문서, 배포 가이드 제공

**Independent Test**: `pnpm deploy:staging` 실행 가능, `.env.example` 참조하여 로컬 설정 가능, `docs/expo-web-deployment.md`로 AWS 사전 설정 진행 가능

### Implementation for User Story 3

- [x] T014 [P] [US3] Add deploy and SST scripts to `package.json`
  - `deploy:staging`: `npx expo export -p web && npx sst deploy --stage staging`
  - `deploy:production`: `npx expo export -p web && npx sst deploy --stage production`
  - `sst:dev`: `npx sst dev`
  - `sst:remove:staging`: `npx sst remove --stage staging`
  - `sst:remove:production`: `npx sst remove --stage production`
- [x] T015 [P] [US3] Create `.env.example` with `DOMAIN=example.com`
- [x] T016 [US3] Create deployment guide at `docs/expo-web-deployment.md`
  - 배포 옵션 비교 (SST, EAS Hosting, Cloudflare Pages, Vercel, Netlify)
  - SST 아키텍처 설명 (S3 + CloudFront + Route 53)
  - 라우팅 전략, 캐시 전략
  - 스테이지 구성 (staging vs production)
  - AWS 사전 설정 가이드 (Route 53, OIDC, IAM Role, GitHub Environments)
  - 로컬 테스트 명령어

**Checkpoint**: 개발자가 문서와 스크립트만으로 전체 배포 프로세스를 실행할 수 있음

---

## Phase 6: Polish & Cross-Cutting Concerns

**Purpose**: 최종 검증 및 정리

- [x] T017 Verify Expo web build succeeds with `npx expo export -p web`
- [x] T018 Validate GitHub Actions workflow syntax (push 후 Actions 탭 확인 또는 `act` 도구)
- [x] T019 Update `CLAUDE.md` with SST deployment context

---

## Dependencies & Execution Order

### Phase Dependencies

- **Setup (Phase 1)**: No dependencies - can start immediately
- **Foundational (Phase 2)**: N/A - no blocking prerequisites
- **US1 (Phase 3)**: Depends on Setup (T001-T004) completion
- **US2 (Phase 4)**: Can run in parallel with US1 (different files)
- **US3 (Phase 5)**: Can run in parallel with US1/US2 (different files)
- **Polish (Phase 6)**: Depends on all user stories complete

### User Story Dependencies

- **US1 (P1)**: `sst.config.ts` — no dependency on other stories
- **US2 (P1)**: `.github/workflows/deploy-web.yml` — no dependency on other stories (references `sst deploy` but doesn't modify `sst.config.ts`)
- **US3 (P2)**: `package.json`, `.env.example`, `docs/` — no dependency on other stories

### Within Each User Story

- T005 → T006 → T007 → T008 → T009 (same file, sequential)
- T010 → T011 → T012 → T013 (same file, sequential)
- T014, T015, T016 can run in parallel (different files)

### Parallel Opportunities

- T002, T003, T004 can run in parallel (different files)
- US1, US2, US3 can all start after Setup phase (different files)
- T014, T015 can run in parallel within US3 (different files)

---

## Parallel Example: Setup Phase

```bash
# Launch all setup config tasks together:
Task: "Add .sst/ to .gitignore"
Task: "Add sst.config.ts to exclude list in tsconfig.json"
Task: "Add sst.config.ts to ignorePatterns in .eslintrc.js"
```

## Parallel Example: All User Stories

```bash
# After Setup, all stories can start in parallel (different files):
Task: US1 — "Create SST config in sst.config.ts"
Task: US2 — "Create GitHub Actions workflow in .github/workflows/deploy-web.yml"
Task: US3 — "Add scripts to package.json" + "Create .env.example" + "Create docs/"
```

---

## Implementation Strategy

### MVP First (User Story 1 Only)

1. Complete Phase 1: Setup (T001-T004)
2. Complete Phase 3: User Story 1 (T005-T009) — `sst.config.ts` 완성
3. **STOP and VALIDATE**: `npx sst deploy --stage dev`로 CloudFront URL 배포 확인
4. 각 라우트 테스트: `/`, `/search`, `/privacy-policy`, `/saint/1`

### Incremental Delivery

1. Setup → Foundation ready
2. Add US1 → `sst.config.ts` 완성 → 로컬 배포 가능 (MVP!)
3. Add US2 → CI/CD 자동화 → GitHub push로 배포
4. Add US3 → DX 완성 → 문서 + 스크립트
5. Polish → 최종 검증

---

## Notes

- [P] tasks = different files, no dependencies
- [Story] label maps task to specific user story for traceability
- AWS 사전 설정(Route 53, OIDC, IAM, GitHub Environments)은 수동 작업 — tasks.md 범위 밖
- US1의 T005-T009는 모두 `sst.config.ts` 한 파일이므로 논리적으로 분리했지만 실질적으로 한 번에 작성 가능
- US2의 T010-T013도 마찬가지로 `.github/workflows/deploy-web.yml` 한 파일
