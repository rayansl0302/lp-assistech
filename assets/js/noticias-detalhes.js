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
            document.querySelector(".post-date").textContent = post.date;
            document.querySelector(".post-author").textContent = post.author;

            const mainImage = document.querySelector(".main-image");
            if (mainImage && post.image_url) {
                mainImage.src = post.image_url;
                mainImage.alt = post.image_label || "Imagem principal";
            }

            const paragraphsContainer = document.querySelector(".post-paragraphs");
            paragraphsContainer.innerHTML = "";

            // Adiciona o conteúdo como um único parágrafo
            const pElement = document.createElement("p");
            pElement.classList.add("mb-4");
            pElement.textContent = post.content;
            paragraphsContainer.appendChild(pElement);
        } else {
            console.error("Post não encontrado");
        }
    } catch (error) {
        console.error("Erro ao carregar os dados:", error);
    }
});
