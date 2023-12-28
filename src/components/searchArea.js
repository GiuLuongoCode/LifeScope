import searchText from "./searchText";
import button from "./button";
import stats from "./stats";
import container from "./container";
import { fetchData, autoComplete } from "../util/api";
import form from "./form";
import _ from "lodash";

const createSearchResultItem = (city, handleCityClick, searchField) => {
  const listItem = document.createElement("li");
  listItem.textContent = city.matching_full_name;
  listItem.addEventListener("click", () => handleCityClick(city, searchField));
  return listItem;
};

const handleSearchFieldInput = (searchButton) => {
  searchButton.disabled = false;
};

const handleSearchFieldKeyPress = async (searchField) => {
  const listSearchSuggest = document.getElementById("list-search");
  let searchTerm = searchField.value.trim();

  try {
    const response = await autoComplete(searchTerm);
    const cities = _.get(response, 'data._embedded["city:search-results"]', []);
    const resultBox = document.getElementById('search-result');
    resultBox.classList.add("active");
    listSearchSuggest.innerHTML = "";

    cities.forEach((city) => {
      const listItem = createSearchResultItem(city, handleCityClick, searchField);
      listSearchSuggest.appendChild(listItem);
    });
  } catch (error) {
    console.error("Error on request: ", error);
  }
};

const handleSearchFieldKeyDown = (event, indexSuggestList, elements) => {
  const { key } = event;
  if (key === "ArrowUp" || key === "ArrowDown") {
    indexSuggestList = (key === "ArrowUp") ?
      ((indexSuggestList - 1) + elements.length) % elements.length :
      (indexSuggestList + 1) % elements.length;

    elements.forEach((element) => element.classList.remove("hover"));
    elements[indexSuggestList].classList.add("hover");
  } else if (key === "Enter") {
    event.preventDefault();
    elements[indexSuggestList].click();
  }
  return indexSuggestList;
};

const handleSearchButtonClick = (searchButton, searchField) => {
  if (searchField.value) {
    fetchData(searchField.value);
    searchButton.disabled = true;
  }
};

const handleCityClick = (city, searchField) => {
  const listSearchSuggest = document.getElementById("list-search");
  searchField.value = city.matching_full_name;
  listSearchSuggest.innerHTML = "";

  const cityName = _.head(city.matching_full_name.split(", "));
  const cityFetchData = cityName.toLowerCase().replace(/\s/g, "-");

  fetchData(cityFetchData).then((response) => {
    const { categories, summary } = response.data;
    const statistics = stats(
      categories.map((category) => category.name),
      categories.map((category) => category.score_out_of_10),
      categories.map((category) => category.color),
      summary
    );

    const resultBox = document.getElementById('search-result');
    resultBox.classList.remove("active");

    const testContainer = document.getElementById("stats-container");
    testContainer.appendChild(statistics);
  });
};

export default () => {
  let indexSuggestList = -1;
  const searchArea = container("InputContainer");
  searchArea.id = "auto-complete";
  
  const p = document.createElement("p");
  p.textContent = "LIFE SCOPE";

  const formInput = form();
  const searchField = searchText();
  const searchButton = button();

  formInput.appendChild(searchField);
  searchArea.appendChild(formInput);
  searchArea.appendChild(searchButton);

  searchArea.addEventListener("input", () => handleSearchFieldInput(searchButton));

  searchArea.addEventListener("keypress", _.debounce(() => handleSearchFieldKeyPress(searchField), 300));

  searchArea.addEventListener("keydown", (event) => {
    const elements = document.querySelectorAll("li");
    indexSuggestList = handleSearchFieldKeyDown(event, indexSuggestList, elements);
  });

  searchArea.addEventListener("click", (event) => {
    if (event.target.tagName === "IMG" && searchField.value) {
      handleSearchButtonClick(searchButton, searchField);
    }
  });

  return searchArea;
};
