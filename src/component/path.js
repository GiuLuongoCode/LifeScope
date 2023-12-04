import img from '../../asset/img/Search.svg';

export default (src = "assets/img/", alt="SVG Image", classList = ["apartment"]) => {
    const element = document.createElement("img");
    element.src = img;
    element.setAttribute("alt", alt);
    if (classList.length > 0){
        element.classList.add(classList);
    }
    return element;
};
