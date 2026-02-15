## Expo Dev Client를 조건별로 설정하기

### Problem

현재 프로젝트에는 expo-dev-client가 설치되어 있고, 별다른 설정이 되어있지 않습니다.
따라서 원치않게 XCode로 dev build시, expo dev client용 앱이 설치되게 됩니다.
다음 요구사항을 완성함으로써 이를 방지하고 싶습니다.

- [x] xcode 등의 dev local build에서는 expo-dev-client를 사용하지 않아야 합니다.
- [x] EAS의 development 빌드에서는 expo-dev-client를 사용하여 배포되어야 합니다.
