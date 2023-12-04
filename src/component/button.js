import path from "./path";

const img = path();

export default (classList = "button") => {
    const button = document.createElement("button");
    button.appendChild(img);
    button.classList.add(classList);
    button.disabled = true;

    return button;
};