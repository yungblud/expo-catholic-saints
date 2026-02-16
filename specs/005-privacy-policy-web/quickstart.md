# Quickstart: 005-privacy-policy-web

## Prerequisites

- Node.js 18+
- 프로젝트 의존성 설치 완료 (`npm install`)

## 개발 서버 실행 (Web)

```bash
npm run web
```

브라우저에서 `http://localhost:8081/privacy-policy`로 접속하여 개인정보 처리방침 페이지를 확인한다.

## 테스트

```bash
# 전체 테스트
npm test

# 해당 기능 테스트만 실행
npx jest app/__tests__/privacy-policy.test.tsx --no-coverage
```

## 웹 정적 빌드

```bash
npx expo export --platform web
```

빌드 결과물은 `dist/` 디렉토리에 생성된다. `/privacy-policy` 경로로 개인정보 처리방침 페이지에 접근할 수 있다.

## 파일 구조

| 파일                                    | 설명                              |
| --------------------------------------- | --------------------------------- |
| `app/privacy-policy.tsx`                | 개인정보 처리방침 페이지 컴포넌트 |
| `app/_layout.tsx`                       | 루트 레이아웃 (Stack.Screen 등록) |
| `app/__tests__/privacy-policy.test.tsx` | 페이지 렌더링 테스트              |

## 주요 확인 사항

- 페이지에 앱 이름("Cursed By Jesus") 표시 여부
- PIPA 필수 항목 8개 섹션 포함 여부
- 연락처 이메일 정확성
- 시행일자 명시
- 모바일/데스크톱 반응형 레이아웃
