$(document).ready(function () {
    $('form.subscribe-wthree').on('submit', function (e) {
      e.preventDefault();
  
      // Captura os valores dos campos do formulário
      var name = $('input[name="nome"]').val();
      var email = $('input[name="email"]').val();
      var whatsapp = $('input[name="telefone"]').val();
      var company = $('#entidade').val();
      var message = $('textarea[name="mensagem"]').val(); // Corrigido o nome do campo
  
      if (name && email && whatsapp && company && message) {
        $.ajax({
          url: 'https://api-staging.assistechpublicacoes.com.br/v1/public/contacts',
          type: 'POST',
          contentType: 'application/json',
          data: JSON.stringify({
            name: name,
            email: email,
            whatsapp: whatsapp,
            company: company,
            message: message
          }),
          success: function (response) {
            alert('Mensagem enviada com sucesso!');
            $('form.subscribe-wthree')[0].reset(); // Reseta o formulário após envio bem-sucedido
          },
          error: function (xhr, status, error) {
            alert('Ocorreu um erro ao enviar a mensagem. Tente novamente mais tarde.');
            console.error('Erro:', error); // Exibe o erro no console para fins de depuração
          }
        });
      } else {
        alert('Por favor, preencha todos os campos obrigatórios.');
      }
    });
  });
  