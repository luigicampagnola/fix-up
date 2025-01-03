
const configs = {
  development: {
    STRAPI_URL: process.env.STRAPI_URL
  },
  BASE_URL: process.env.NEXT_PUBLIC_STRAPI_URL || "http://localhost:1337"
}

module.exports = configs;

