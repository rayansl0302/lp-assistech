// search.js - Versão com debounce

// Configuration import or global access
const getApiUrl = window.CONFIG ? window.CONFIG.getApiUrl : () => {};
const getAppUrl = window.CONFIG ? window.CONFIG.getAppUrl : () => {};

// Variáveis para armazenar os timeouts de debounce
const debounceTimeouts = {
  city_council: null,
  municipality: null,
  other_entities: null
};

// Flag para evitar múltiplas inicializações
let initialized = false;

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

// Função para inicializar todos os componentes
function initialize() {
  // Evitar múltiplas inicializações
  if (initialized) return;
  
  console.log("Inicializando componentes de busca com debounce");
  
  // Inicializar o input da prefeitura
  initializeMunicipalityInput();
  
  // Anexar handlers com debounce para os inputs de busca
  $("#search-input-city-council").on('input', function(event) {
    debouncedSearch(event, 'city_council');
  });
  
  $("#search-input-municipality").on('input', function(event) {
    debouncedSearch(event, 'municipality');
  });
  
  $("#search-input-other-entities").on('input', function(event) {
    debouncedSearch(event, 'other_entities');
  });
  
  initialized = true;
}

// Função de debounce para controlar as chamadas de busca
function debouncedSearch(event, formType) {
  // Cancelar timeout anterior se existir
  if (debounceTimeouts[formType]) {
    clearTimeout(debounceTimeouts[formType]);
  }
  
  // Definir novo timeout
  debounceTimeouts[formType] = setTimeout(() => {
    handleSearch(event, formType);
    debounceTimeouts[formType] = null;
  }, 500); // 500ms de debounce
}

// Main search handler function
async function handleSearch(event, formType) {
  console.log('handleSearch chamado com formType:', formType);
  
  let searchTerm = event.target.value.trim().toLowerCase();
  let endpoint = "";

  if (searchTerm === "prefeitura municipal de " || searchTerm === "") {
    console.log('Termo de busca vazio ou apenas prefixo, limpando resultados');
    clearAutocompleteResults(formType);
    return;
  }

  const apiBaseUrl = getApiUrl();
  console.log('URL base da API:', apiBaseUrl);

  if (formType === "city_council") {
    endpoint = `${apiBaseUrl}/tenants?government_body=city_council&search=${searchTerm}`;
  } else if (formType === "municipality") {
    const cityName = searchTerm.replace("prefeitura municipal de ", "").trim();
    endpoint = `${apiBaseUrl}/locations/BA,SP,MG/cities?label=${cityName}`;
  } else if (formType === "other_entities") {
    endpoint = `${apiBaseUrl}/tenants?government_body=house_of_representatives,federal_senate,state_government_palace,legislative_assembly,ministries,court,state_department,municipal_department,company,other&search=${searchTerm}`;
  }

  console.log('Buscando dados no endpoint:', endpoint);

  try {
    const response = await fetch(endpoint);
    const data = await response.json();

    displayAutocompleteResults(data, formType, searchTerm);
  } catch (error) {
    console.error("Erro ao buscar dados:", error);
  }
}

function clearAutocompleteResults(formType) {
  console.log('Limpando resultados de autocomplete para formType:', formType);
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
  console.log('Exibindo resultados para formType:', formType);
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
          console.log('Item da lista clicado, atualizando campo de entrada e ocultando lista');
          inputField.val(name);
          resultList.parent().hide();
          
          const appUrl = getAppUrl();
          console.log('URL do App:', appUrl);

          if (formType === "municipality" && cityCode) {
            const cityHallEndpoint = `${getApiUrl()}/tenants?government_body=city_hall&city_code=${cityCode}`;
            console.log('Buscando dados do endpoint da prefeitura:', cityHallEndpoint);
            const cityHallResponse = await fetch(cityHallEndpoint);
            const cityHallData = await cityHallResponse.json();
            console.log("Dados recebidos da API para city_hall:", cityHallData);
            
            if (cityHallData.data && cityHallData.data.length > 0) {
              const slug = cityHallData.data[0].slug;
              const url = `${appUrl}/${slug}/home`;
              console.log('Redirecionando para URL:', url);
              window.location.href = url;
            } else {
              alert("Prefeitura não encontrada");
            }
          } else if (slug) {
            const url = `${appUrl}/${slug}/home`;
            console.log('Redirecionando para URL:', url);
            window.location.href = url;
          } else {
            alert("Entidade não encontrada");
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

function executeSearch(formType) {
  console.log('Executando busca para formType:', formType);
  const input = $(`#search-input-${formType}`)[0];
  const event = { target: input };
  
  // Executar a busca imediatamente sem debounce quando o botão de busca é clicado
  handleSearch(event, formType);
}

// Inicializar quando o documento estiver pronto
$(document).ready(function() {
  initialize();
});

// Export for ES modules
export { handleSearch, executeSearch, initialize };

// Expor funções globalmente
window.handleSearch = handleSearch;
window.executeSearch = executeSearch;
window.initializeSearch = initialize;