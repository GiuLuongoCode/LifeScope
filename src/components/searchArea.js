// Component che gestisce la search Area. Si occupa di gestire il textField e il button per la ricerca della città.

import searchText from './searchText';
import button from './button';
import card from './card';
import { fetchData } from '../util/api';
import { autoComplete } from '../util/api';
import form from './form';
const searchField = searchText();
const searchButton = button();

export default() => {
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

    searchArea.addEventListener("keyup", () => {
        const listSearchSuggest = document.getElementById("list-search");
        let searchTerm = searchField.value.trim();
        const testContainer = document.getElementById("card-container");
    autoComplete(searchTerm)
        .then(response => {
            response.data._embedded["city:search-results"].forEach(city => {
                var listItem = document.createElement('li');
                listItem.textContent = city.matching_full_name;
                listItem.addEventListener('click', function() {
                    searchField.value = city.matching_full_name;
                    listSearchSuggest.innerHTML = '';
                    let cityName = this.textContent.split(", ")[0];
                    let cityFetchData = cityName.toLowerCase();
                    if (cityFetchData.includes(" ")) {
                        cityFetchData = cityFetchData.replaceAll(" ", "-");
                    }
                    fetchData(cityFetchData).then(response => response.data.categories.forEach(category => {
                        if ((category.name === "Housing") || (category.name === "Safety" ) || (category.name === "Healthcare")){
                            const cardElement = card(category.name, cityName, category.score_out_of_10);
                            testContainer.appendChild(cardElement);
                        }

                    }));
                });
                listSearchSuggest.appendChild(listItem);
            });
        })
        .catch(error => console.error('Errore nella richiesta:', error));
    })

    searchArea.addEventListener("click", (event) => {
        if (event.target.tagName === "IMG"){
            if (searchField.value != null){
                fetchData(searchField.value);
                searchButton.disabled = true;
            }
        }
    });

    return searchArea;
};