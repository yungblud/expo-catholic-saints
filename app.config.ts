import { ConfigContext, ExpoConfig } from 'expo/config';
import pkg from './package.json';

export default ({ config }: ConfigContext): ExpoConfig => {
  const plugins: ExpoConfig['plugins'] = [
    'expo-router',
    'expo-font',
    'expo-updates',
    'expo-sqlite',
    [
      'expo-build-properties',
      {
        android: {
          kotlinVersion: '1.9.25',
        },
      },
    ],
    'expo-web-browser',
  ];

  return {
    ...config,
    plugins,
    version: pkg.version,
    runtimeVersion: {
      policy: 'appVersion',
    },
  } as ExpoConfig;
};
