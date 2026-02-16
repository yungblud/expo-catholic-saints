import { PROD_WEB_URL, SITE_NAME } from '@/lib/constants/meta';
import { Saint } from '@/lib/types/saints';
import Head from 'expo-router/head';
import { useMemo } from 'react';
import { Platform } from 'react-native';

export function SaintDetailMetaHead({ saint }: { saint: Saint }) {
  const keywords = useMemo(() => {
    return [saint.nameKo, saint.nameEn, saint.nameLatin, '카톨릭 성인', '카톨릭 세례명'].join(', ');
  }, [saint]);
  const title = useMemo(() => {
    return saint.nameKo + ' | ' + SITE_NAME;
  }, [saint]);

  if (Platform.OS !== 'web') return null;

  return (
    <Head>
      <title>{title}</title>
      <meta name="description" content={saint.biography} />
      <meta name="keywords" content={keywords} />
      <meta name="og:title" content={title} />
      <meta name="og:description" content={saint.biography} />
      <meta name="og:url" content={`${PROD_WEB_URL}/saint/${saint.id}`} />
      <meta name="og:site_name" content={SITE_NAME} />
      <meta name="og:type" content="website" />
    </Head>
  );
}
