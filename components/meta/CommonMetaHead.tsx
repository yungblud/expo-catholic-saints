import { SITE_DESCRIPTION, SITE_NAME } from '@/lib/constants/meta';
import Head from 'expo-router/head';
import { Platform } from 'react-native';

export function CommonMetaHead({ title, description }: { title?: string; description?: string }) {
  if (Platform.OS !== 'web') return null;

  return (
    <Head>
      <title>{title ? `${title} | ${SITE_NAME}` : SITE_NAME}</title>
      <meta name="description" content={description ? description : SITE_DESCRIPTION} />
    </Head>
  );
}
