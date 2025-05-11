export const ImageQueryFragment = {
  fields: ['url', 'alternativeText', 'width', 'height'],
};
export const LinkQueryFragment = {
  fields: ['label', 'url'],
};
export const GOOGLE_MAPS_URL = 'https://www.google.com/maps';
export const OPEN_GRAPH_IMAGE_PATH = '/opengraph-image.jpg';
export const VALID_US_AREA_CODES: string[] = [
  '202',
  '212',
  '231',
  '239',
  '242',
  '332',
  '352',
  '386',
  '409',
  '504',
  '515',
  '718',
  '734',
  '754',
  '813',
  '850',
  '904',
  '908',
  '941',
  '954',
  '970',
];

export const INVALID_US_AREA_CODES = [
  '000',
  '111',
  '222',
  '333',
  '444',
  '555',
  '666',
  '777',
  '888',
  '999',
];

export const DISPOSABLE_EMAIL_DOMAINS: string[] = [
  'hedotu.com',
  'mailinator.com',
  'tempmail.com',
  '10minutemail.com',
  'yopmail.com',
  'guerrillamail.com',
  'sharklasers.com',
  'throwawaymail.com',
  'getnada.com',
  'dispostable.com',
];

export const REDIRECTS_STATIC_QUERY =
  'populate[redirects][fields][0]=source&populate[redirects][fields][1]=destination&populate[redirects][fields][2]=permanent&pagination[pageSize]=100&pagination[page]=1';
