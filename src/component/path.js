import img from '../../asset/img/apartment.svg';

export default (src = "assets/img/", alt="SVG Image", classList = [""]) => {
    const element = document.createElement("img");
    element.src = img;
    element.setAttribute("alt", alt);
    element.classList.add(classList);
    return element;
};
