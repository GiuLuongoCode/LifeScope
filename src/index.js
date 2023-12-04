import container from './component/container';
import path from './component/path';
import title from './component/title';
import '../asset/css/style.css';
import searchArea from './component/searchArea';

const titleH1 = title();
// const input = searchText("input");
// const inputContainer = container("InputContainer");
const mainContainer = container("mainBox");
const search = searchArea();
// inputContainer.appendChild(input);
// inputContainer.appendChild(btn);
// inputContainer.appendChild(searchIcon);
mainContainer.appendChild(titleH1);
mainContainer.appendChild(search);
document.body.appendChild(mainContainer);