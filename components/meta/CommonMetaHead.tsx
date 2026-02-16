import { SITE_DESCRIPTION, SITE_NAME } from '@/lib/constants/meta';
import Head from 'expo-router/head';

export function CommonMetaHead({ title, description }: { title?: string; description?: string }) {
  return (
    <Head>
      <title>{title ? `${title} | ${SITE_NAME}` : SITE_NAME}</title>
      <meta name="description" content={description ? description : SITE_DESCRIPTION} />
    </Head>
  );
}
