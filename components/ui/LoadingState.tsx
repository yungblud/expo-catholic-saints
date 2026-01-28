import React from 'react';
import { View, Text, ActivityIndicator, StyleSheet } from 'react-native';

interface LoadingStateProps {
  message?: string;
  testID?: string;
}

export function LoadingState({ message = '로딩 중...', testID }: LoadingStateProps) {
  return (
    <View style={styles.container} testID={testID}>
      <ActivityIndicator size="large" color="#0ea5e9" />
      <Text style={styles.message}>{message}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 32,
  },
  message: {
    marginTop: 16,
    fontSize: 14,
    color: '#6b7280',
  },
});
