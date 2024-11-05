$(document).ready(() => {
    $(".autocomplete-results").hide();
  });
  
  async function handleSearch(event, formType) {
    const searchTerm = event.target.value.trim().toLowerCase();
    let endpoint = "";
  
    if (searchTerm === "") {
      clearAutocompleteResults(formType);
      return;
    }
  
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
      console.log("Dados recebidos da API:", data);

  
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
        const filteredResults = data.data.filter((item) =>
          (item.name || item.label).toLowerCase().includes(searchTerm)
        );
  
        const resultsToShow = filteredResults.slice(0, 10);
  
        resultsToShow.forEach((item) => {
          const name = item.name || item.label;
          const slug = item.slug;
  
          const listItem = $("<li>").text(name);
  
          listItem.on("click", () => {
            inputField.val(name);
            resultList.parent().hide();
  
            const url = `https://app.assistechpublicacoes.com.br/diario-oficial/${slug}`;
            window.location.href = url;
          });
  
          resultList.append(listItem);
        });
  
        if (resultsToShow.length > 0) {
          resultList.parent().show();
        } else {
          resultList.parent().hide();
        }
      } else {
        resultList.parent().hide();
      }
    }
  }
  
  
  function executeSearch(formType) {
    const input = $(`#search-input-${formType}`)[0];
    handleSearch({ target: input }, formType);
  }
  