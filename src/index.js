import container from './components/container';
import title from './components/title';
import '../asset/css/style.css';
import searchArea from './components/searchArea';

const titleH1 = title();
const mainContainer = container("mainBox");
const containerBig = container("search-container");
const containerStats = container("stats-container");
containerStats.id = "stats-container";
const searchResult = container("resultBox");
searchResult.id = "search-result";
const listSearchSuggest = document.createElement("ul");
listSearchSuggest.id = "list-search";
const search = searchArea();
containerBig.appendChild(search);
searchResult.appendChild(listSearchSuggest);
containerBig.appendChild(searchResult);
containerBig.appendChild(containerStats);
mainContainer.appendChild(titleH1);
mainContainer.appendChild(containerBig);
document.body.appendChild(mainContainer);