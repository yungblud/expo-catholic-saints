import * as Haptics from 'expo-haptics';

/**
 * withHapticPress - 공통 Haptic + onPress 핸들러
 *
 * @param callback 실행할 onPress 콜백 함수
 * @param type Haptic 타입 (기본값: 'impactLight')
 */
export function withHapticPress<Args extends unknown[]>(
  callback: (...args: Args) => void | Promise<void>,
  type: Haptics.ImpactFeedbackStyle = Haptics.ImpactFeedbackStyle.Light
) {
  return (...args: Args) => {
    Haptics.impactAsync(type);
    callback?.(...args);
  };
}
