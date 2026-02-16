/// <reference path="./.sst/platform/config.d.ts" />

export default $config({
  app(input) {
    return {
      name: 'cursed-by-jesus',
      home: 'aws',
      providers: {
        aws: {
          region: 'ap-northeast-2',
        },
      },
      removal: input.stage === 'production' ? 'retain' : 'remove',
      protect: input.stage === 'production',
    };
  },
  async run() {
    const domain = process.env.DOMAIN;

    const domainConfig =
      domain && $app.stage === 'production'
        ? {
            name: domain,
            redirects: [`www.${domain}`],
          }
        : domain && $app.stage === 'staging'
          ? {
              name: `staging.${domain}`,
            }
          : undefined;

    const site = new sst.aws.StaticSite('WebApp', {
      path: '.',
      build: {
        command: 'npx expo export --platform web && node scripts/fix-static-html.mjs',
        output: 'dist',
      },
      indexPage: 'index.html',
      domain: domainConfig,
      assets: {
        fileOptions: [
          {
            files: '**',
            cacheControl: 'max-age=31536000,public,immutable',
          },
          {
            files: '**/*.html',
            cacheControl: 'max-age=0,no-cache,no-store,must-revalidate',
          },
        ],
      },
      invalidation: {
        paths: 'all',
        wait: false,
      },
      dev: {
        command: 'npx expo start --web',
        url: 'http://localhost:8081',
      },
    });

    return {
      url: site.url,
    };
  },
});
