// Configuration object for API endpoints
const API_CONFIG = {
  BASE_URL: 'https://api.assistechpublicacoes.com.br',
  STAGING_URL: 'https://api-staging.assistechpublicacoes.com.br',
  APP_URL: 'https://app.assistechpublicacoes.com.br',
  API_VERSION: 'v1'
};

// Function to get the API URL based on staging flag
export const getApiUrl = (staging = false) => {
  const baseUrl = staging ? API_CONFIG.STAGING_URL : API_CONFIG.BASE_URL;
  return `${baseUrl}/${API_CONFIG.API_VERSION}/public`;
};

// Function to get the app URL
export const getAppUrl = () => API_CONFIG.APP_URL;