$(document).ready(() => {
    $(".autocomplete-results").hide();
  });
  
  async function handleSearch(event, formType) {
    const searchTerm = event.target.value.trim().toLowerCase();
    let endpoint = "";
  
    // Verificar se o input foi limpo
    if (searchTerm === "") {
      clearAutocompleteResults(formType);
      return;
    }
  
    // Definir o endpoint com base no tipo de formulário
    if (formType === "city_council") {
      endpoint = `https://api-staging.assistechpublicacoes.com.br/v1/public/tenants?government_body=city_council&search=${searchTerm}`;
    } else if (formType === "municipality") {
      endpoint = `https://api-staging.assistechpublicacoes.com.br/v1/public/locations/BA/cities?search=${searchTerm}`;
    } else if (formType === "other_entities") {
      endpoint = `https://api-staging.assistechpublicacoes.com.br/v1/public/tenants?government_body=other&search=${searchTerm}`;
    }
  
    try {
      const response = await fetch(endpoint);
      const data = await response.json();
  
      console.log("Dados recebidos:", data);
      displayAutocompleteResults(data, formType, searchTerm);
    } catch (error) {
      console.error("Erro ao buscar dados:", error);
    }
  }
  
  function clearAutocompleteResults(formType) {
    let resultList = null;
  
    if (formType === "city_council") {
      resultList = $("#autocomplete-results-city-council ul");
    } else if (formType === "municipality") {
      resultList = $("#autocomplete-results-municipality ul");
    } else if (formType === "other_entities") {
      resultList = $("#autocomplete-results-other-entities ul");
    }
  
    if (resultList) {
      resultList.empty().parent().hide();
    }
  }
  
  function displayAutocompleteResults(data, formType, searchTerm) {
    let resultList = null;
    let inputField = null;
  
    if (formType === "city_council") {
      resultList = $("#autocomplete-results-city-council ul");
      inputField = $("#search-input-city-council");
    } else if (formType === "municipality") {
      resultList = $("#autocomplete-results-municipality ul");
      inputField = $("#search-input-municipality");
    } else if (formType === "other_entities") {
      resultList = $("#autocomplete-results-other-entities ul");
      inputField = $("#search-input-other-entities");
    }
  
    if (resultList) {
      resultList.empty();
  
      if (data.data && data.data.length > 0) {
        // Mapear os itens para obter todos os nomes
        const mappedResults = data.data.map((item) => item.name || item.label);
  
        // Filtrar itens que correspondam ao termo digitado
        const filteredResults = mappedResults.filter((name) =>
          name.toLowerCase().includes(searchTerm)
        );
  
        // Limitar a exibição a um número razoável, por exemplo, 10 itens
        const resultsToShow = filteredResults.slice(0, 10);
  
        resultsToShow.forEach((name) => {
          const listItem = $("<li>").text(name);
  
          // Adicionar o evento de clique para preencher o campo de entrada
          listItem.on("click", () => {
            inputField.val(name); // Preenche o campo de entrada com o valor selecionado
            resultList.parent().hide(); // Esconde a lista de resultados
          });
  
          resultList.append(listItem);
          console.log("Exibindo resultado:", name);
        });
  
        // Mostrar a div de resultados apenas se houver correspondências
        if (resultsToShow.length > 0) {
          resultList.parent().show();
          console.log("Resultados exibidos");
        } else {
          resultList.parent().hide();
          console.log("Nenhum resultado encontrado");
        }
      } else {
        resultList.parent().hide();
        console.log("Nenhum resultado encontrado");
      }
    }
  }
  
  function executeSearch(formType) {
    const input = $(`#search-input-${formType}`)[0];
    handleSearch({ target: input }, formType);
  }
  