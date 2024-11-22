document.addEventListener("DOMContentLoaded", async function () {
    const urlParams = new URLSearchParams(window.location.search);
    const postTitle = urlParams.get("title");

    try {
        const response = await fetch("https://api-staging.assistechpublicacoes.com.br/v1/public/news");
        if (!response.ok) throw new Error("Erro ao buscar dados da API");

        const postData = await response.json();

        // Procura o post com o título correspondente ao parâmetro "title"
        const post = postData.data.find(item => item.title.toLowerCase().replace(/[\s\W-]+/g, '-').replace(/^-+|-+$/g, '') === postTitle);

        if (post) {
            document.querySelector(".post-title").textContent = post.title;

            // Converte e renderiza a data no formato dd/mm/aaaa
            const postDate = new Date(post.date).toLocaleDateString("pt-BR");
            document.querySelector(".post-date").textContent = postDate;

            document.querySelector(".post-author").textContent = post.author;

            const mainImage = document.querySelector(".main-image");
            if (mainImage && post.image_url) {
                mainImage.src = post.image_url;
                mainImage.alt = post.image_label || "Imagem principal";
            }

            const paragraphsContainer = document.querySelector(".post-paragraphs");
            paragraphsContainer.innerHTML = "";

            // Adiciona o conteúdo formatado com quebra de linha
            const pElement = document.createElement("p");
            pElement.classList.add("mb-4");
            // Substitui \n por <br> para renderizar quebras de linha corretamente
            pElement.innerHTML = post.content.replace(/\n/g, "<br>");
            paragraphsContainer.appendChild(pElement);
        } else {
            console.error("Post não encontrado");
        }
    } catch (error) {
        console.error("Erro ao carregar os dados:", error);
    }
});
