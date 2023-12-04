// Component che gestisce la search Area. Si occupa di gestire il textField e il button per la ricerca della città.

import container from './container';
import searchText from './searchText';
import button from './button';


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
    });

    searchArea.addEventListener("click", () => {
        if (searchField.value != null){
            console.log("L'utente ha cercato questo ", searchField.value)
        }
    });

    return searchArea;
};