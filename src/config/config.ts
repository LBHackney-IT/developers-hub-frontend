const config = {
  authAllowedGroups: process.env.AUTH_ALLOWED_GROUPS?.split(',') || [
    'TEST_GROUP',
  ],
  authDomain: process.env.AUTH_DOMAIN || '//auth.hackney.gov.uk/auth',
  cookieDomain: process.env.COOKIE_DOMAIN || 'hackney.gov.uk',
  authToken: process.env.AUTH_TOKEN_NAME || 'hackneyToken',
  configurationApiUrl: process.env.CONFIGURATION_API_URL || '/api',
};

export default config;
