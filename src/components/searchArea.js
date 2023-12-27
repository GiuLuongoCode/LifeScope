import searchText from "./searchText";
import button from "./button";
import stats from "./stats";
import { fetchData, autoComplete } from "../util/api";
import form from "./form";
import _ from "lodash";

const searchField = searchText();
const searchButton = button();

export default () => {
  const searchAutoComplete = document.createElement("div");
  searchAutoComplete.id = "auto-complete";
  const searchArea = document.createElement("div");
  searchArea.classList.add("InputContainer");
  const p = document.createElement("p");
  p.textContent = "LIFE SCOPE";
  const formInput = form();

  formInput.appendChild(searchField);
  searchArea.appendChild(formInput);
  searchArea.appendChild(searchButton);

  searchArea.addEventListener("input", () => {
    searchButton.disabled = false;
  });

  searchArea.addEventListener("keyup", _.debounce(async () => {
    const listSearchSuggest = document.getElementById("list-search");
    let searchTerm = searchField.value.trim();

    try {
      const response = await autoComplete(searchTerm);
      const cities = _.get(response, 'data._embedded["city:search-results"]', []);
      
      listSearchSuggest.innerHTML = "";
      cities.forEach((city) => {
        const listItem = document.createElement("li");
        listItem.textContent = city.matching_full_name;
        listItem.addEventListener("click", () => handleCityClick(city));
        listSearchSuggest.appendChild(listItem);
      });
    } catch (error) {
      console.error("Error on request: ", error);
    }
  }, 300));

  searchArea.addEventListener("click", (event) => {
    if (event.target.tagName === "IMG" && searchField.value) {
      fetchData(searchField.value);
      searchButton.disabled = true;
    }
  });

  const handleCityClick = (city) => {
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

      const testContainer = document.getElementById("card-container");
      testContainer.appendChild(statistics);
    });
  };

  return searchArea;
};
