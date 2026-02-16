# Expo Web 배포 가이드

## 배포 옵션 비교

| 옵션             | 타입                       | 장점                                      | 단점                          | 비용                  |
| ---------------- | -------------------------- | ----------------------------------------- | ----------------------------- | --------------------- |
| **SST v3**       | S3 + CloudFront + Route 53 | AWS 네이티브, IaC, 세밀한 제어, 서울 리전 | AWS 계정 필요, 초기 설정 복잡 | 프리티어 내 무료 수준 |
| EAS Hosting      | Expo 관리형                | Expo 생태계 통합, 간단한 설정             | 베타, 커스텀 도메인 제한적    | 무료~유료             |
| Cloudflare Pages | Edge CDN                   | 무료 SSL, 빠른 배포, 글로벌 엣지          | AWS 생태계 외부               | 무료~유료             |
| Vercel           | Edge CDN                   | Next.js 친화적, 자동 프리뷰               | React Native Web 최적화 부족  | 무료~유료             |
| Netlify          | Edge CDN                   | 간단한 CI/CD, 폼/함수 내장                | 빌드 시간 제한                | 무료~유료             |

**선택: SST v3** - AWS 네이티브 IaC로 S3 + CloudFront 정적 배포, Route 53 커스텀 도메인, GitHub Actions CI/CD 통합.

## 아키텍처

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

## 라우팅 전략

Expo Router의 정적 export는 각 라우트별 HTML 파일을 생성한다. CloudFront의 내장 viewer-request 함수가 URL을 처리한다:

| 요청 경로         | 서빙 파일             | 동작                                                          |
| ----------------- | --------------------- | ------------------------------------------------------------- |
| `/`               | `index.html`          | 직접 서빙                                                     |
| `/search`         | `search.html`         | CloudFront가 `.html` 자동 추가                                |
| `/privacy-policy` | `privacy-policy.html` | CloudFront가 `.html` 자동 추가                                |
| `/saint/123`      | 없음 → `index.html`   | S3 404 → `errorPage` fallback → Expo Router 클라이언트 라우팅 |

## 캐시 전략

| 파일 패턴   | Cache-Control                                 | 이유                             |
| ----------- | --------------------------------------------- | -------------------------------- |
| `**` (기본) | `max-age=31536000,public,immutable`           | JS/CSS 번들은 해시된 파일명 사용 |
| `**/*.html` | `max-age=0,no-cache,no-store,must-revalidate` | HTML은 항상 최신 번들 참조 필요  |

배포 시 CloudFront invalidation (`/*`)으로 엣지 캐시를 즉시 갱신한다.

## 스테이지 구성

| 설정             | staging             | production                    |
| ---------------- | ------------------- | ----------------------------- |
| 도메인           | `staging.${DOMAIN}` | `${DOMAIN}`                   |
| www 리다이렉트   | 없음                | `www.${DOMAIN}` → `${DOMAIN}` |
| 리소스 삭제 정책 | `remove`            | `retain`                      |
| 삭제 보호        | 없음                | `protect: true`               |
| 배포 트리거      | main push 자동      | workflow_dispatch 수동        |

## AWS 사전 설정 (1회)

### 1. Route 53 도메인 설정

- AWS Route 53에 도메인 등록 또는 이전
- Hosted Zone ID 확인 (SST가 DNS 레코드 자동 생성)

### 2. GitHub OIDC Identity Provider

```bash
# AWS Console → IAM → Identity providers → Add provider
# Provider URL: https://token.actions.githubusercontent.com
# Audience: sts.amazonaws.com
```

### 3. IAM Role 생성

Trust policy:

```json
{
  "Version": "2012-10-17",
  "Statement": [
    {
      "Effect": "Allow",
      "Principal": {
        "Federated": "arn:aws:iam::<ACCOUNT_ID>:oidc-provider/token.actions.githubusercontent.com"
      },
      "Action": "sts:AssumeRoleWithWebIdentity",
      "Condition": {
        "StringEquals": {
          "token.actions.githubusercontent.com:aud": "sts.amazonaws.com"
        },
        "StringLike": {
          "token.actions.githubusercontent.com:sub": "repo:<OWNER>/<REPO>:*"
        }
      }
    }
  ]
}
```

Permission policy: `AdministratorAccess` (SST가 CloudFormation, S3, CloudFront, Route 53, ACM 등 다수 서비스 사용)

### 4. GitHub Repository 설정

- Settings → Environments → `staging`, `production` 생성
- 각 Environment에 Secret 추가: `AWS_ROLE_ARN` (위에서 생성한 IAM Role ARN)
- 각 Environment에 Variable 추가: `DOMAIN` (예: `example.com`)
- production Environment에 required reviewers 추가 권장

## 로컬 테스트

```bash
# Expo 웹 빌드 확인
npx expo export -p web

# SST 로컬 테스트 배포 (도메인 없이 CloudFront URL로 확인)
npx sst deploy --stage dev

# 배포 제거
npx sst remove --stage dev
```

## 관련 파일

- `sst.config.ts` - SST 인프라 정의
- `.github/workflows/deploy-web.yml` - CI/CD 워크플로우
- `.env.example` - 환경변수 템플릿
