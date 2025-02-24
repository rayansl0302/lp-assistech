// Configuration object for API endpoints
const API_CONFIG = {
  BASE_URL: 'https://api.assistechpublicacoes.com.br',
  STAGING_URL: 'https://api-staging.assistechpublicacoes.com.br',
  APP_URL: 'https://app.assistechpublicacoes.com.br',
  API_VERSION: 'v1'
};

// Function to get the API URL based on staging flag
function getApiUrl(staging = false) {
  const baseUrl = staging ? API_CONFIG.STAGING_URL : API_CONFIG.BASE_URL;
  return `${baseUrl}/${API_CONFIG.API_VERSION}/public`;
}

// Function to get the app URL
function getAppUrl() {
  return API_CONFIG.APP_URL;
}

// Document ready function to handle form submission
$(document).ready(function () {
  $("form.subscribe-wthree").on("submit", function (e) {
    e.preventDefault();
    
    // Collect form data
    var name = $('input[name="nome"]').val();
    var email = $('input[name="email"]').val();
    var whatsapp = $('input[name="telefone"]').val();
    var company = $("#entidade").val();
    var message = $('textarea[name="mensagem"]').val();
    var recaptchaToken = grecaptcha.getResponse();
    
    // Validate reCAPTCHA
    if (!recaptchaToken) {
      alert("Por favor, complete o reCAPTCHA.");
      return;
    }
    
    // Validate form fields
    if (name && email && whatsapp && company && message) {
      $.ajax({
        url: getApiUrl(true) + "/contacts", // Using staging URL
        type: "POST",
        contentType: "application/json",
        data: JSON.stringify({
          name: name,
          email: email,
          whatsapp: whatsapp,
          company: company,
          message: message,
          _recaptcha: recaptchaToken,
        }),
        success: function (response) {
          alert("Mensagem enviada com sucesso!");
          $("form.subscribe-wthree")[0].reset();
          grecaptcha.reset();
        },
        error: function (xhr, status, error) {
          var errorMessage = 
            xhr.responseJSON?.meta?.message ||
            "Erro ao enviar a mensagem. Tente novamente.";
          alert(errorMessage);
        },
      });
    } else {
      alert("Por favor, preencha todos os campos obrigatórios.");
    }
  });
});