document.addEventListener("DOMContentLoaded", async function () {
    const urlParams = new URLSearchParams(window.location.search);
    const postId = parseInt(urlParams.get("id"));

    try {
        const response = await fetch("https://api.npoint.io/53058604c773f1e8accc");
        if (!response.ok) throw new Error("Erro ao buscar dados da API");
        
        const postData = await response.json();
        const post = postData.find(item => item.id === postId);

        if (post) {
            document.querySelector(".post-title").textContent = post.title;
            document.querySelector(".post-date").textContent = post.date;
            document.querySelector(".post-hour").textContent = post.hour;

            const mainImage = document.querySelector(".main-image");
            if (mainImage && post.images[0]) {
                mainImage.src = post.images[0];
                mainImage.alt = "Imagem principal";
            }

            const paragraphsContainer = document.querySelector(".post-paragraphs");
            paragraphsContainer.innerHTML = "";
            post.paragraphs.forEach(paragraph => {
                const pElement = document.createElement("p");
                pElement.classList.add("mb-4");
                pElement.textContent = paragraph;
                paragraphsContainer.appendChild(pElement);
            });
        } else {
            console.error("Post não encontrado");
        }
    } catch (error) {
        console.error("Erro ao carregar os dados:", error);
    }
});
