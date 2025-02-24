// config.js
var API_CONFIG = {
  BASE_URL: 'https://api.assistechpublicacoes.com.br',
  STAGING_URL: 'https://api-staging.assistechpublicacoes.com.br',
  APP_URL: 'https://app.assistechpublicacoes.com.br',
  API_VERSION: 'v1'
};

function getApiUrl(staging = false) {
  const baseUrl = staging ? API_CONFIG.STAGING_URL : API_CONFIG.BASE_URL;
  return `${baseUrl}/${API_CONFIG.API_VERSION}/public`;
}

function getAppUrl() {
  return API_CONFIG.APP_URL;
}

// Attach to global window object
window.CONFIG = {
  getApiUrl,
  getAppUrl
};