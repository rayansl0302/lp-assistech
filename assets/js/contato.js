$(document).ready(function () {
  $("form.subscribe-wthree").on("submit", function (e) {
    e.preventDefault();

    var name = $('input[name="nome"]').val();
    var email = $('input[name="email"]').val();
    var whatsapp = $('input[name="telefone"]').val();
    var company = $("#entidade").val();
    var message = $('textarea[name="mensagem"]').val();
    var recaptchaToken = grecaptcha.getResponse(); // Obtém o token do reCAPTCHA

    // Verifica se o reCAPTCHA foi validado
    if (!recaptchaToken) {
      alert("Por favor, complete o reCAPTCHA.");
      return;
    }

    if (name && email && whatsapp && company && message) {
      $.ajax({
        url: "https://api-staging.assistechpublicacoes.com.br/v1/public/contacts",
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
          grecaptcha.reset(); // Reseta o reCAPTCHA após o envio bem-sucedido
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
