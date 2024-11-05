document.addEventListener("DOMContentLoaded", async function () {
  function generateSlug(title) {
      return title.toLowerCase()
                  .replace(/[\s\W-]+/g, '-') // Substitui espaços e caracteres especiais por "-"
                  .replace(/^-+|-+$/g, '');  // Remove traços extras do início/fim
  }

  try {
      const response = await fetch("https://api-staging.assistechpublicacoes.com.br/v1/public/news");
      if (!response.ok) throw new Error("Erro ao buscar dados da API");

      const postData = await response.json();
      const newsContainer = document.getElementById("news-container");

      // Limpa o contêiner de notícias antes de adicionar novos itens
      newsContainer.innerHTML = "";

      postData.data.forEach(post => {
          const card = document.createElement("div");
          card.className = "col-lg-4 col-md-6 item mt-lg-0 mt-5 w3img-grids-info";

          // Gera o slug a partir do título
          const postSlug = generateSlug(post.title);

          // Formata a data em pt-BR
          const postDate = new Date(post.date).toLocaleDateString("pt-BR");

          // Conteúdo HTML do card
          card.innerHTML = `
            <div class="w3img-grids-info-gd position-relative">
              <a href="#services">
                <div class="page">
                  <a href="noticia-detalhe.html?title=${encodeURIComponent(postSlug)}" class="photobox photobox_triangular photobox_scale-rotated">
                    <div class="photobox__previewbox media-placeholder">
                      <img
                        class="img-fluid photobox__preview media-placeholder__media radius-image w-100"
                        src="${post.image_url || 'placeholder.jpg'}"
                        alt="${post.image_label || 'Imagem principal'}"
                      />
                    </div>
                    <div class="photobox__info-wrapper">
                      <div class="photobox__info">
                        <span>${post.category || 'Notícia'}</span>
                      </div>
                    </div>
                  </a>
                </div>
              </a>
              <div class="w3img-grids-info-gd-content mt-4">
                <a href="noticia-detalhe.html?title=${encodeURIComponent(postSlug)}" class="titile-img d-block">
                  <h4 class="mb-2">${post.title}</h4>
                </a>
                <h6 class="title-subhny mb-2">
                  ${postDate} /// ${post.comments || 'Nenhum'} comentário
                </h6>
                <p class="mb-2">${post.content.slice(0, 100)}...</p>
                <a href="noticia-detalhe.html?title=${encodeURIComponent(postSlug)}" class="mt-2 leia-mais">Leia Mais »</a>
              </div>
            </div>
          `;

          // Adiciona o card ao contêiner de notícias
          newsContainer.appendChild(card);
      });
  } catch (error) {
      console.error("Erro ao carregar os dados:", error);
  }
});
