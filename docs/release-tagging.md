# Release Tagging 가이드

## 태그 컨벤션

| 태그 형식              | 의미                                        | 시점                                                       |
| ---------------------- | ------------------------------------------- | ---------------------------------------------------------- |
| `v{version}-iOS`       | iOS 네이티브 바이너리 빌드 (App Store 제출) | `eas build --platform ios --profile production` 완료 후    |
| `v{version}-web`       | Web 정적 배포 (SST/CloudFront)              | `sst deploy --stage production` 완료 후                    |
| `v{version}-iOS-ota.N` | iOS OTA JS 번들 업데이트                    | `eas update --channel production` 완료 후 (N은 1부터 순번) |

## runtimeVersion 정책

`app.config.ts`에서 `runtimeVersion: { policy: 'appVersion' }`으로 설정되어 있어, runtimeVersion은 `package.json`의 `version` 필드와 동일하게 자동 결정됩니다.

```
package.json version: "0.3.0"
  → runtimeVersion: "0.3.0"
  → 이 runtimeVersion을 가진 바이너리에만 OTA 적용
```

**OTA 업데이트(`eas update`)는 동일한 runtimeVersion의 바이너리에만 전달됩니다.** 네이티브 코드 변경이 있으면 version을 올리고 새 바이너리 빌드가 필요합니다.

## 현재 운영 플랫폼

- **iOS** (App Store) — 운영 중
- **Web** (SST/CloudFront) — 운영 중
- **Android** — 추후 운영 예정

iOS만 운영 중이므로 `eas update`는 사실상 iOS 전용입니다. 태그에 `-iOS`를 명시하여 플랫폼을 구분합니다.

## 릴리즈 플로우 예시 (v0.3.0)

```bash
# 1. iOS 바이너리 빌드 → App Store 제출
eas build --platform ios --profile production
git tag v0.3.0-iOS && git push origin v0.3.0-iOS

# 2. Web 배포
sst deploy --stage production   # 또는 GitHub Actions workflow_dispatch
git tag v0.3.0-web && git push origin v0.3.0-web

# 3. JS-only 변경 사항 OTA 배포 (네이티브 변경 없을 때)
eas update --channel production --message "fix: dark mode tab bar"
git tag v0.3.0-iOS-ota.1 && git push origin v0.3.0-iOS-ota.1

# 4. 추가 OTA가 있으면 순번 증가
git tag v0.3.0-iOS-ota.2 && git push origin v0.3.0-iOS-ota.2
```

## Android 출시 이후

`eas update`가 iOS + Android를 동시에 타겟하게 되면, OTA 태그를 플랫폼 구분 없이 변경합니다:

```
v{version}-iOS-ota.N  →  v{version}-ota.N
```
