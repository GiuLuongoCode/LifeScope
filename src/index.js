import container from './component/container';
import searchText from './component/searchText';
import path from './component/path';
import title from './component/title';
import '../asset/css/style.css';

const titleH1 = title();
const input = searchText("input");
const searchIcon = path("asset/img/apartment.svg", "apartment", "apartment");
const inputContainer = container("InputContainer");
const mainContainer = container("mainBox");

inputContainer.appendChild(input);
inputContainer.appendChild(searchIcon);
mainContainer.appendChild(titleH1);
mainContainer.appendChild(inputContainer);
document.body.appendChild(mainContainer);