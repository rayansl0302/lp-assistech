import { getApiUrl, getAppUrl } from './config.js';

// Função para inicializar o input da prefeitura
function initializeMunicipalityInput() {
  const input = $("#search-input-municipality");
  
  // Define o valor inicial e placeholder
  input.val("Prefeitura Municipal de ");
  input.attr("placeholder", "Prefeitura Municipal de [Digite a cidade]");
  
  // Previne que o usuário apague o prefixo
  input.on('keydown', function(e) {
    const prefixLength = "Prefeitura Municipal de ".length;
    const cursorPosition = this.selectionStart;
    
    // Impede backspace e delete no prefixo
    if ((e.keyCode === 8 || e.keyCode === 46) && cursorPosition <= prefixLength) {
      e.preventDefault();
    }
  });

  // Mantém o prefixo se o usuário tentar apagá-lo
  input.on('input', function() {
    if (!this.value.toLowerCase().startsWith("prefeitura municipal de ")) {
      this.value = "Prefeitura Municipal de " + this.value.replace("Prefeitura Municipal de ", "");
    }
    this.setSelectionRange(this.value.length, this.value.length);
  });
}

// Executa a inicialização quando o documento estiver pronto
$(document).ready(function() {
  initializeMunicipalityInput();
});

export async function handleSearch(event, formType) {
  console.log('handleSearch called with event:', event, 'and formType:', formType);
  
  let searchTerm = event.target.value.trim().toLowerCase();
  let endpoint = "";

  if (searchTerm === "prefeitura municipal de " || searchTerm === "") {
    console.log('Search term is empty or only prefix, clearing autocomplete results');
    clearAutocompleteResults(formType);
    return;
  }

  const apiBaseUrl = getApiUrl();
  console.log('API base URL:', apiBaseUrl);

  if (formType === "city_council") {
    endpoint = `${apiBaseUrl}/tenants?government_body=city_council&search=${searchTerm}`;
  } else if (formType === "municipality") {
    const cityName = searchTerm.replace("prefeitura municipal de ", "").trim();
    endpoint = `${apiBaseUrl}/locations/BA,SP,MG/cities?label=${cityName}`;
  } else if (formType === "other_entities") {
    endpoint = `${apiBaseUrl}/tenants?government_body=house_of_representatives,federal_senate,state_government_palace,legislative_assembly,ministries,court,state_department,municipal_department,company,other&search=${searchTerm}`;
  }

  console.log('Fetching data from endpoint:', endpoint);

  try {
    const response = await fetch(endpoint);
    const data = await response.json();

    if (formType === "city_council") {
      console.log("Dados recebidos da API para city_council:", data);
    } else if (formType === "municipality") {
      console.log("Dados recebidos da API para municipality:", data);
    } else if (formType === "other_entities") {
      console.log("Dados recebidos da API para other_entities:", data);
    }

    displayAutocompleteResults(data, formType, searchTerm);
  } catch (error) {
    console.error("Erro ao buscar dados:", error);
  }
}

function clearAutocompleteResults(formType) {
  console.log('Clearing autocomplete results for formType:', formType);
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
  console.log('Displaying autocomplete results for formType:', formType, 'and searchTerm:', searchTerm);
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
      const filteredResults = data.data.filter((item) => {
        const itemName = (item.name || item.label).toLowerCase();
        const cityName = formType === "municipality" ? 
          searchTerm.replace("prefeitura municipal de ", "").trim() : 
          searchTerm;
        return itemName.includes(cityName);
      });

      const resultsToShow = filteredResults;

      resultsToShow.forEach((item) => {
        let name = item.name || item.label;
        const slug = item.slug;
        const cityCode = item.code;

        if (formType === "municipality") {
          name = `Prefeitura Municipal de ${name}`;
        }

        const listItem = $("<li>").text(name);

        listItem.on("click", async () => {
          console.log('List item clicked, updating input field value and hiding result list');
          inputField.val(name);
          resultList.parent().hide();
          
          const appUrl = getAppUrl();
          console.log('App URL:', appUrl);

          if (formType === "municipality" && cityCode) {
            const cityHallEndpoint = `${getApiUrl()}/tenants?government_body=city_hall&city_code=${cityCode}`;
            console.log('Fetching data from city hall endpoint:', cityHallEndpoint);
            const cityHallResponse = await fetch(cityHallEndpoint);
            const cityHallData = await cityHallResponse.json();
            console.log("Dados recebidos da API para city_hall:", cityHallData);
            
            if (cityHallData.data && cityHallData.data.length > 0) {
              const slug = cityHallData.data[0].slug;
              const url = `${appUrl}/diario-oficial/${slug}`;
              console.log('Redirecting to URL:', url);
              window.location.href = url;
            } else {
              alert("Prefeitura não encontrada");
            }
          } else if (slug) {
            const url = `${appUrl}/diario-oficial/${slug}`;
            console.log('Redirecting to URL:', url);
            window.location.href = url;
          } else {
            alert("Prefeitura não encontrada");
          }
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

export function executeSearch(formType) {
  console.log('Executing search for formType:', formType);
  const input = $(`#search-input-${formType}`)[0];
  handleSearch({ target: input }, formType);
}