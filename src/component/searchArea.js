// Component che gestisce la search Area. Si occupa di gestire il textField e il button per la ricerca della città.

import container from './container';
import searchText from './searchText';
import button from './button';
import fetchData from '../util/api';

const searchField = searchText();
const searchButton = button();

export default() => {
    const searchArea = document.createElement("div");
    searchArea.classList.add("InputContainer");
    const p = document.createElement("p");
    p.textContent = "LIFE SCOPE";
    searchArea.appendChild(searchField);
    searchArea.appendChild(searchButton);

    searchArea.addEventListener("input", () => {
        searchButton.disabled = false;
        // searchButton.style.backgroundColor = 
    });

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