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

export const IS_NOT_PRODUCTION_ENV = process.env.NODE_ENV !== 'production';

/*
  Regex Explanations
  ^[1-9]\d{0,5}\s+: Street number (1-6 digits, no leading zero)
  [A-Za-z0-9\s,.#-]+: Street name (letters, numbers, spaces, commas, periods, #, hyphens)
  (?:,\s*|\s+): Separator (comma with optional spaces or spaces)
  [A-Za-z\s]+: City name (letters and spaces)
  (?:,\s*|\s+): Separator (comma with optional spaces or spaces)
  \d{5}: ZIP code (5 digits)
  (?:(?:,\s*|\s+)(?:FL|Florida))?: Optional state (FL or Florida)
  (?:(?:,\s*|\s+)(?:USA|United States))?: Optional country (USA or United States)
  $/i: End of string, case-insensitive
*/
export const ADDRESS_REGEX: RegExp =
  /^[1-9]\d{0,5}\s+[A-Za-z0-9\s,.#-]+(?:,\s*|\s+)[A-Za-z\s]+(?:,\s*|\s+)\d{5}(?:(?:,\s*|\s+)(?:FL|Florida))?(?:(?:,\s*|\s+)(?:USA|United States))?$/i;

export const SOUTH_FLORIDA_CITIES = [
  'miami',
  'fort lauderdale',
  'hialeah',
  'hollywood',
  'pembroke pines',
  'coral springs',
  'pompano beach',
  'miramar',
  'miami beach',
  'north miami',
  'dania beach',
  'deerfield beach',
  'plantation',
  'sunrise',
  'davie',
  'coconut creek',
  'margate',
  'tamarac',
  'lauderhill',
  'weston',
  'homestead',
  'coral gables',
  'north miami beach',
  'miami gardens',
  'aventura',
  'doral',
  'kendall',
  'westchester',
].map(city => city.toLowerCase());

export const SOUTH_FLORIDA_ZIP_RANGES = [
  { min: 33000, max: 33399 }, // Miami-Dade, Broward
];
