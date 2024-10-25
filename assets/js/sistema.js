// String contendo notícias falsas
const noticiasString = `
1|Título da Notícia 1|2024-10-01 09:00|Texto da notícia 1 com detalhes sobre o evento.
2|Título da Notícia 2|2024-10-02 09:00|Texto da notícia 2 que fala sobre um novo desenvolvimento.
3|Título da Notícia 3|2024-10-03 09:00|Texto da notícia 3 trazendo informações sobre o mercado.
4|Título da Notícia 4|2024-10-04 09:00|Texto da notícia 4 discutindo as últimas tendências.
5|Título da Notícia 5|2024-10-05 09:00|Texto da notícia 5 que menciona um evento importante.
6|Título da Notícia 6|2024-10-06 09:00|Texto da notícia 6 com uma análise profunda.
7|Título da Notícia 7|2024-10-07 09:00|Texto da notícia 7 que detalha uma descoberta científica.
8|Título da Notícia 8|2024-10-08 09:00|Texto da notícia 8 explorando novas tecnologias.
9|Título da Notícia 9|2024-10-09 09:00|Texto da notícia 9 que cobre uma conferência recente.
10|Título da Notícia 10|2024-10-10 09:00|Texto da notícia 10 sobre um novo produto no mercado.
11|Título da Notícia 11|2024-10-11 09:00|Texto da notícia 11 destacando uma questão social.
12|Título da Notícia 12|2024-10-12 09:00|Texto da notícia 12 analisando dados do setor.
13|Título da Notícia 13|2024-10-13 09:00|Texto da notícia 13 discutindo políticas públicas.
14|Título da Notícia 14|2024-10-14 09:00|Texto da notícia 14 que relata eventos culturais.
15|Título da Notícia 15|2024-10-15 09:00|Texto da notícia 15 que explora a história de uma cidade.
16|Título da Notícia 16|2024-10-16 09:00|Texto da notícia 16 trazendo novidades do esporte.
17|Título da Notícia 17|2024-10-17 09:00|Texto da notícia 17 discutindo o meio ambiente.
18|Título da Notícia 18|2024-10-18 09:00|Texto da notícia 18 com uma crítica social.
19|Título da Notícia 19|2024-10-19 09:00|Texto da notícia 19 que traz um estudo interessante.
20|Título da Notícia 20|2024-10-20 09:00|Texto da notícia 20 sobre inovação e criatividade.
`;

// Função para transformar a string em um array de objetos
function gerarNoticias() {
  return noticiasString.trim().split('\n').map(linha => {
    const [id, titulo, dataHora, texto] = linha.split('|');
    return {
      id: Number(id),
      titulo: titulo,
      dataHora: dataHora,
      texto: texto,
    };
  });
}

// Gerar as notícias a partir da string
let noticias = gerarNoticias();

const noticiasPorPagina = 10;
let paginaAtual = 1;

function carregarNoticias(pagina) {
  const searchTerm = document
    .getElementById("searchInput")
    .value.toLowerCase();
  const noticiasFiltradas = noticias.filter((noticia) =>
    noticia.titulo.toLowerCase().includes(searchTerm)
  );

  const inicio = (pagina - 1) * noticiasPorPagina;
  const fim = inicio + noticiasPorPagina;
  const noticiasPagina = noticiasFiltradas.slice(inicio, fim);

  const tabela = document.getElementById("noticiasTabela");
  tabela.innerHTML = "";

  noticiasPagina.forEach((noticia) => {
    const linha = document.createElement("tr");
    linha.innerHTML = `
      <td>${noticia.titulo}</td>
      <td>${noticia.dataHora}</td>
      <td>${noticia.texto}</td>
      <td>
        <div class="d-flex"> 
          <button class="btn btn-sm btn-warning me-2 d-flex" onclick="editarNoticia(${noticia.id})">
            <img width="20" src="./assets/images/icons/pencil.svg" alt="Editar">
          </button>
          <button class="btn btn-sm btn-danger d-flex" onclick="removerNoticia(${noticia.id})">
            <img width="20" src="./assets/images/icons/trash.svg" alt="Remover">
          </button>
        </div>
      </td>
    `;
    tabela.appendChild(linha);
  });

  atualizarPaginador(noticiasFiltradas);
}

function atualizarPaginador(noticiasFiltradas) {
  const totalPaginas = Math.ceil(
    noticiasFiltradas.length / noticiasPorPagina
  );
  const paginador = document.getElementById("paginador");
  paginador.innerHTML = "";

  // Botão "Anterior"
  const anterior = document.createElement("li");
  anterior.className = `page-item ${paginaAtual === 1 ? "disabled" : ""}`;
  anterior.innerHTML = `
    <a class="page-link" href="#" aria-label="Anterior">
      <span aria-hidden="true">&laquo;</span>
    </a>`;
  anterior.onclick = (e) => {
    e.preventDefault();
    if (paginaAtual > 1) {
      paginaAtual--;
      carregarNoticias(paginaAtual);
    }
  };
  paginador.appendChild(anterior);

  // Números das páginas
  for (let i = 1; i <= totalPaginas; i++) {
    const li = document.createElement("li");
    li.className = `page-item ${i === paginaAtual ? "active" : ""}`;
    li.innerHTML = `<a class="page-link" href="#">${i}</a>`;
    li.onclick = (e) => {
      e.preventDefault();
      paginaAtual = i;
      carregarNoticias(paginaAtual);
    };
    paginador.appendChild(li);
  }

  // Botão "Próximo"
  const proximo = document.createElement("li");
  proximo.className = `page-item ${
    paginaAtual === totalPaginas ? "disabled" : ""
  }`;
  proximo.innerHTML = `
    <a class="page-link" href="#" aria-label="Próximo">
      <span aria-hidden="true">&raquo;</span>
    </a>`;
  proximo.onclick = (e) => {
    e.preventDefault();
    if (paginaAtual < totalPaginas) {
      paginaAtual++;
      carregarNoticias(paginaAtual);
    }
  };
  paginador.appendChild(proximo);
}

function editarNoticia(id) {
  alert(`Editar notícia ${id}`);
  // Aqui você pode adicionar a lógica para edição.
}

function removerNoticia(id) {
  if (confirm("Tem certeza que deseja remover esta notícia?")) {
    noticias = noticias.filter((noticia) => noticia.id !== id);
    carregarNoticias(paginaAtual);
  }
}

window.onload = () => carregarNoticias(paginaAtual);
