## Expo iOS 수동 빌드

### Expo iOS를 xcode로 수동 빌드 시, eas update channel을 설정하는 법

- https://github.com/expo/expo/blob/29708b643afeb6668374bf5cef0f929046d1dd66/apps/bare-expo/macos/BareExpo-macOS/Supporting/Expo.plist
- 위 파일처럼 `ios/YourAppName/Supporting/Expo.plist`에 다음을 추가해주세요

```xml
    <key>EXUpdatesRequestHeaders</key>
    <dict>
      <key>expo-channel-name</key>
      <string>production</string>
    </dict>
```
