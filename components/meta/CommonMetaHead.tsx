import { SITE_DESCRIPTION, SITE_NAME } from '@/lib/constants/meta';
import Head from 'expo-router/head';

export function CommonMetaHead() {
  return (
    <Head>
      <title>{SITE_NAME}</title>
      <meta name="description" content={SITE_DESCRIPTION} />
    </Head>
  );
}
