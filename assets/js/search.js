import { getApiUrl, getAppUrl } from './config.js';

export async function handleSearch(event, formType) {
  console.log('handleSearch called with event:', event, 'and formType:', formType);
  
  const searchTerm = event.target.value.trim().toLowerCase();
  let endpoint = "";

  if (searchTerm === "") {
    console.log('Search term is empty, clearing autocomplete results');
    clearAutocompleteResults(formType);
    return;
  }

  const apiBaseUrl = getApiUrl();
  console.log('API base URL:', apiBaseUrl);

  if (formType === "city_council") {
    endpoint = `${apiBaseUrl}/tenants?government_body=city_council&search=${searchTerm}`;
  } else if (formType === "municipality") {
    const cityName = searchTerm.replace("prefeitura municipal de ", "").trim();
    endpoint = `${apiBaseUrl}/locations/BA,SP/cities?label=${cityName}`;
  } else if (formType === "other_entities") {
    endpoint = `${apiBaseUrl}/tenants?government_body=house_of_representatives,federal_senate,state_government_palace,legislative_assembly,ministries,court,state_department,municipal_department,company,other&search=${searchTerm}`;
  }

  console.log('Fetching data from endpoint:', endpoint);

  try {
    const response = await fetch(endpoint);
    const data = await response.json();

    // Add console log for each endpoint data
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
        if (searchTerm.startsWith("prefeitura municipal de ")) {
          const cityName = searchTerm.split("prefeitura municipal de ")[1].trim();
          return itemName.includes(cityName);
        } else {
          return itemName.includes(searchTerm);
        }
      });

      const resultsToShow = filteredResults;

      resultsToShow.forEach((item) => {
        let name = item.name || item.label;
        const slug = item.slug;
        const cityCode = item.code; // Assuming the city code is available here

        // Add "Prefeitura Municipal de" prefix for municipality results
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