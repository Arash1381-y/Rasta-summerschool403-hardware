// @ts-check
import {themes as prismThemes} from 'prism-react-renderer';

/** @type {import('@docusaurus/types').Config} */
const config = {
  title: 'زیر پوست کامپیوتر',
  tagline: 'کارگاه تعاملی سخت‌افزار رستا',
  favicon: 'img/favicon.ico',
  url: 'https://arash1381-y.github.io',
  baseUrl: '/Rasta-summerschool403-hardware/',
  organizationName: 'Arash1381-y',
  projectName: 'Rasta-summerschool403-hardware',
  trailingSlash: false,
  onBrokenLinks: 'throw',

  future: {v4: true},

  i18n: {
    defaultLocale: 'fa',
    locales: ['fa'],
    localeConfigs: {fa: {direction: 'rtl'}},
  },

  presets: [
    [
      'classic',
      /** @type {import('@docusaurus/preset-classic').Options} */
      ({
        docs: false,
        blog: false,
        theme: {customCss: './src/css/custom.css'},
      }),
    ],
  ],

  themeConfig:
    /** @type {import('@docusaurus/preset-classic').ThemeConfig} */
    ({
      image: 'img/docusaurus-social-card.jpg',
      colorMode: {
        defaultMode: 'light',
        disableSwitch: true,
        respectPrefersColorScheme: false,
      },
      navbar: {
        title: 'زیر پوست کامپیوتر',
        logo: {alt: 'نشان رستا', src: 'img/logo.svg'},
        items: [
          {to: '/', label: 'کارگاه', position: 'left'},
          {
            href: 'https://github.com/Arash1381-y/Rasta-summerschool403-hardware',
            label: 'GitHub',
            position: 'right',
          },
        ],
      },
      prism: {theme: prismThemes.github, darkTheme: prismThemes.dracula},
    }),
};

export default config;
