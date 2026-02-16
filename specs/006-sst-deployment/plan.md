# Plan: Expo Web SST 배포 인프라

## Tech Stack

- SST v3 (`sst` npm package)
- AWS: S3, CloudFront, Route 53, ACM, IAM
- GitHub Actions (OIDC 인증)
- Expo SDK 52+ (static export)

## Architecture

```
GitHub Actions (CI/CD)
  ├── expo export --platform web → dist/
  └── sst deploy --stage <stage>
        ├── S3 Bucket (정적 파일 저장)
        ├── CloudFront Distribution (글로벌 CDN)
        │     ├── Viewer Request Function (URL 리라이트)
        │     └── Error Page → /index.html (SPA fallback)
        └── Route 53 (커스텀 도메인 DNS)
```

## Project Structure Changes

```
sst.config.ts                          # SST 인프라 정의 (신규)
.github/workflows/deploy-web.yml       # CI/CD 워크플로우 (신규)
docs/expo-web-deployment.md            # 배포 가이드 문서 (신규)
.env.example                           # 환경변수 템플릿 (신규)
package.json                           # 스크립트 추가 + sst devDep
.gitignore                             # .sst/ 추가
tsconfig.json                          # sst.config.ts exclude
.eslintrc.js                           # sst.config.ts ignorePatterns
```

## Domain Strategy

| Stage      | Domain              | www Redirect                  | Removal              |
| ---------- | ------------------- | ----------------------------- | -------------------- |
| staging    | `staging.${DOMAIN}` | 없음                          | `remove`             |
| production | `${DOMAIN}`         | `www.${DOMAIN}` → `${DOMAIN}` | `retain` + `protect` |

## Cache Strategy

| 파일 패턴   | Cache-Control                                 | 이유                |
| ----------- | --------------------------------------------- | ------------------- |
| `**` (기본) | `max-age=31536000,public,immutable`           | 해시된 JS/CSS 번들  |
| `**/*.html` | `max-age=0,no-cache,no-store,must-revalidate` | 항상 최신 번들 참조 |

## Routing Strategy

| 경로              | 파일                  | 동작                                 |
| ----------------- | --------------------- | ------------------------------------ |
| `/`               | `index.html`          | 직접 서빙                            |
| `/search`         | `search.html`         | CloudFront `.html` 자동 추가         |
| `/privacy-policy` | `privacy-policy.html` | CloudFront `.html` 자동 추가         |
| `/saint/123`      | 없음                  | errorPage → index.html → Expo Router |

## CI/CD Strategy

- **Staging**: main push → 자동 배포
- **Production**: workflow_dispatch → 수동 배포
- **인증**: GitHub OIDC → AWS IAM Role (access key 없음)
- **Concurrency**: 스테이지별 동시 배포 방지

## AWS Prerequisites (1회 수동)

1. Route 53 도메인 등록/이전
2. GitHub OIDC Identity Provider 생성
3. IAM Role 생성 (OIDC trust + AdministratorAccess)
4. GitHub Environments 설정 (AWS_ROLE_ARN secret, DOMAIN variable)
