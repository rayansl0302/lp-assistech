document.addEventListener("DOMContentLoaded", function () {
    const postData = [
        {
            id: 1,
            title: "Seção das Sessões",
            date: "25/10/2024",
            hour: "09:16",
            paragraphs: [
                "Na sessão Plenária do dia 2 de outubro, o Tribunal de Contas da União (TCU) apreciou Questão de Ordem formulada pelo presidente do Tribunal, ministro Bruno Dantas, sobre o tratamento a ser dispensado aos processos de controle externo enviados à Advocacia-Geral da União (AGU) e aos demais órgãos executores no que se refere ao exame da prescrição das pretensões punitivas e de ressarcimento, conforme disposto na Resolução-TCU 344/2022, alterada pela Resolução-TCU 367/2024.",
                "A proposta teve origem nas conclusões de grupo de trabalho constituído pela Comissão de Coordenação Geral do TCU com o objetivo de estudar se caberia reabrir análise da prescrição pelo Tribunal, ou por suas unidades, nos casos de processos de controle externo que já transitaram em julgado e foram encaminhados à AGU e aos demais órgãos executores, que tenham menos de cinco anos do julgamento definitivo e nos quais o TCU não tenha se pronunciado sobre a prescrição, por se referirem a acórdãos anteriores à publicação da Resolução-TCU 344/2022.",
                "O estudo concluiu pela impossibilidade de a referida análise ser feita pelas unidades de controle externo da Secretaria do TCU, sob pena de as conclusões eventualmente adentrarem ou modificarem o mérito de decisões proferidas no âmbito de competências privativas de relatores e colegiados do Tribunal. Nesse contexto, eventual reanálise da decisão de mérito só pode ocorrer no curso do devido processo legal de controle externo, previsto na Lei 8.443/1992 e no Regimento Interno, por meio dos instrumentos processuais disponíveis às partes.",
                "Dessa forma, acolhendo, por unanimidade, a proposta do presidente da Casa, o Plenário decidiu por aprovar a Questão de Ordem com fixação dos seguintes procedimentos:",
                "a) informar aos órgãos executores que o Tribunal de Contas da União, por força do disposto no art. 10 da Resolução-TCU 344/2022, não realiza reanálise da ocorrência ou não da prescrição em processos originadores de Cobrança Executiva já constituída e encaminhada aos órgãos executores, exceto nos casos de solicitação do responsável ou interessado no processo de controle externo junto ao TCU ou de apresentação de recurso de revisão com fundamento no art. 35 da Lei 8.443/1992;"
            ],
            images: ["https://www.assistechpublicacoes.com.br/wp-content/uploads/2024/10/Secao-das-Sessoes-_1__Portal-Externo-240x180px.png"]
        },
        {
            id: 2,
            title: "Contas de mais dez câmaras são consideradas regulares",
            date: "25/10/2024",
            hour: "09:02",
            paragraphs: [
                "Na sessão desta quarta-feira (23/10), os conselheiros da 1ª e 2ª Câmaras do Tribunal de Contas dos Municípios da Bahia, consideraram regulares as prestações de contas de mais dez câmaras de vereadores baianas.",
                "Pela manhã, os conselheiros da 2ª Câmara julgadora, consideraram regulares – ainda que com ressalvas – as contas da Câmara Municipal de Urandi, administrada por Mateus Silveira Oliveira, referentes ao ano de 2022. Já as contas de 2023 da Câmara Municipal de Prado, gestão de Odilei Queiroz Matos, foram julgadas regulares, na íntegra, sem a indicação de ressalvas.",
                "No turno da tarde, os conselheiros da 1ª Câmara julgadora, votaram pela regularidade – na íntegra – das contas de Carinhanha, administrada por João Cordeiro do Nascimento Neto; de Sapeaçu, de responsabilidade de Paulo César de Souza Carvalho; de Santana, de Antônio das Neves; de Coribe, na gestão de Sebastião Pereira da Silva Neto; e de Ituaçu, do vereador Almir Santos Pessoa.",
                "Já as contas da Câmara Municipal de Jaguaripe, de responsabilidade do vereador Adeilton Santos Almeida; de Dom Basílio, de Gelson Caíres da Silva; e de Brumado, de Renato Santos Teixeira, todas referentes ao ano de 2023, foram julgadas regulares com ressalvas.",
                "Fonte: TCM"
            ],
            images: ["https://www.assistechpublicacoes.com.br/wp-content/uploads/2024/10/processed-1d5f953e-05c3-481f-9d67-3a40052b7a2e-1-1024x768.jpeg"]
        },
        {
            id: 3,
            title: "Conselheiros prestam homenagem aos servidores",
            date: "25/10/2024",
            hour: "08:53",
            paragraphs: [
                "Os conselheiros do Tribunal de Contas dos Municípios da Bahia aprovaram na sessão plenária desta quinta-feira (24/10) uma moção de congratulações dirigida especialmente aos servidores do TCM, pela passagem do Dia do Servidor Público, dia 28 de outubro, na próxima segunda-feira. A moção foi apresentada pela conselheira Aline Peixoto que destacou que “nosso tribunal é uma casa de responsabilidade, onde cada colaborador contribui com alma e compromisso para a melhoria da gestão pública e o fortalecimento do controle externo”. A manifestação foi apoiada com entusiasmo pelos demais conselheiros que compõem a Corte.",
                "A conselheira ressaltou o sentimento de gratidão e o reconhecimento de todos os membros do TCM “pelo trabalho dedicado que todos vocês desempenham com competência e espírito de equipe, em prol de uma fiscalização pedagógica do gasto público municipal.” Observou que “o trabalho realizado aqui vai muito além da análise técnica das contas municipais. Ele carrega em si o compromisso com a justiça fiscal, a transparência e o bem-estar social, impactando diretamente a vida das pessoas nos quatro cantos da Bahia”.",
                "Para a conselheira, “cada relatório, parecer e decisão do TCM reflete o esforço coletivo de profissionais que acreditam no valor ético e da responsabilidade pública. Seguimos firmes em nossa missão de fiscalizar e inspirar, pedagogicamente, melhorias constantes na gestão dos recursos públicos, em prol de uma boa governança em todos os 417 municípios sob nossa jurisdição”.",
                "Ao encerrar, em nome do presidente, conselheiro Francisco de Souza Andrade Netto e dos demais conselheiros, Aline Peixoto parabenizou os servidores do TCM pelo comprometimento diário com a seriedade do trabalho, que se reflete no prestígio da corte na sociedade baiana.",
                "Fonte: TCM"
            ],
            images: ["https://www.assistechpublicacoes.com.br/wp-content/uploads/2024/10/sessao24102024-1024x775.jpg"]
        }
    ];

    const urlParams = new URLSearchParams(window.location.search);
    const postId = parseInt(urlParams.get("id"));
    const post = postData.find(item => item.id === postId);

    if (post) {
        document.querySelector(".post-title").textContent = post.title;
        document.querySelector(".post-date").textContent = post.date;
        document.querySelector(".post-hour").textContent = post.hour;
        document.querySelector(".admin").textContent = post.author;

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
});
