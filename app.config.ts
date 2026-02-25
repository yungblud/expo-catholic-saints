import { ConfigContext, ExpoConfig } from 'expo/config';
import pkg from './package.json';

const isEasDevBuild =
  process.env.EAS_BUILD_PROFILE === 'development' ||
  process.env.EAS_BUILD_PROFILE === 'development:device';

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

  if (isEasDevBuild) {
    plugins.push('expo-dev-client');
  }

  return {
    ...config,
    plugins,
    version: pkg.version,
    runtimeVersion: {
      policy: 'appVersion',
    },
  } as ExpoConfig;
};
