import { HeaderProps } from './components/elements/header';
import { MenuProps } from './utils/types';

export const menuData: Promise<MenuProps> = new Promise(resolve => {
  resolve({
    logo: {
      url: '/icon/fixup.svg',
      alternativeText: 'Fixup Roofing & Construction Logo',
    },
    links: [
      { label: 'About', url: '/about-us' },
      {
        label: 'Locations',
        url: '/locations',
        group: [
          {
            title: 'Miami-Date County',
            sub: [
              { label: 'Miami', url: '#' },
              { label: 'Miami Beach', url: '#' },
              { label: 'Miami Gardens', url: '#' },
              { label: 'Coral Gables', url: '#' },
              { label: 'Hialeah', url: '#' },
              { label: 'Kendall', url: '#' },
              { label: 'Westchester', url: '#' },
            ],
          },
          {
            title: 'Broward County',
            sub: [
              { label: 'Fort Lauradel', url: '#' },
              { label: 'Hollywood', url: '#' },
              { label: 'Miramar', url: '#' },
              { label: 'Pembroke Pines', url: '#' },
              { label: 'Pompano Beach', url: '#' },
            ],
          },
        ],
      },
      {
        label: 'Services',
        url: '/services',
        list: [
          { label: 'Air Conditioning', url: '/services/air-conditioning' },
          {
            label: 'Commercial Roofing',
            url: '/services/commercial-roofing',
          },
          {
            label: 'Residential Roofing',
            url: '/services/residential-roofing',
          },
          { label: 'Solar Panels', url: '/services/solar-panels' },
          { label: 'Windows and Doors', url: '/services/windows-and-doors' },
        ],
      },
      { label: 'Projects', url: '/projects' },
      { label: 'Blog', url: '/blog' },
      { label: 'Financing', url: '/financing' },
    ],
    cta: { label: 'free estimates', url: '/estimates' },
  });
});

export const headerData: Promise<HeaderProps> = new Promise(resolve => {
  resolve({
    contacts: [
      {
        type: 'phone',
        label: '(786) 235-2435',
        url: '7862352435',
      },
      {
        type: 'email',
        label: 'cs@fixuproofing.com',
        url: 'cs@fixuproofing.com',
      },
      {
        type: 'address',
        label: '6917 NW 77th Ave, Miami, FL 33166',
        url: 'https://www.google.com/maps/place/Fix+Up+Roofing+and+Construction+LLC/@25.8366019,-80.3213593,15z/data=!4m6!3m5!1s0x8143193a6d65e119:0xea7b42391f5b4101!8m2!3d25.8366019!4d-80.3213593!16s%2Fg%2F11pds269z0?entry=tts&g_ep=EgoyMDI0MTAxMy4wIPu8ASoASAFQAw%3D%3D',
      },
    ],
    socials: [
      { type: 'phone', label: 'Call us', url: '7862352435' },
      { type: 'email', label: 'Email us', url: 'cs@fixuproofing.com' },
      {
        type: 'facebook',
        label: 'Find us in Facebook',
        url: 'https://www.facebook.com/FixUpRoofingAndConstruction/',
      },
      {
        type: 'yelp',
        label: 'Yelp reviews',
        url: 'https://www.yelp.com/biz/fix-up-roofing-and-construction-miami-2',
      },
    ],
  });
});
