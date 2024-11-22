$(document).ready(function () {
  $('form.subscribe-wthree').on('submit', function (e) {
    e.preventDefault();

    var name = $('input[name="nome"]').val();
    var email = $('input[name="email"]').val();
    var whatsapp = $('input[name="telefone"]').val();
    var company = $('#entidade').val();
    var message = $('textarea[name="mensagem"]').val();

    if (name && email && whatsapp && company && message) {
      grecaptcha.ready(function () {
        grecaptcha
          .execute('6Ld0l34qAAAAAEyi_gd5JRt8d_XEZIW0GIMF8hIC', { action: 'contact' })
          .then(function (token) {
            $.ajax({
              url: 'https://api-staging.assistechpublicacoes.com.br/v1/public/contacts',
              type: 'POST',
              contentType: 'application/json',
              data: JSON.stringify({
                name: name,
                email: email,
                whatsapp: whatsapp,
                company: company,
                message: message,
                _recaptcha: token
              }),
              success: function (response) {
                alert('Mensagem enviada com sucesso!');
                $('form.subscribe-wthree')[0].reset(); 
              },
              error: function (xhr, status, error) {
                alert('Ocorreu um erro ao enviar a mensagem. Tente novamente mais tarde.');
                console.error('Erro:', error);
              }
            });
          })
          .catch(function (error) {
            alert('Erro ao validar o reCAPTCHA. Por favor, tente novamente.');
            console.error('Erro do reCAPTCHA:', error);
          });
      });
    } else {
      alert('Por favor, preencha todos os campos obrigatórios.');
    }
  });
});
