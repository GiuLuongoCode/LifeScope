export default (cssClass) => {
    const element = document.createElement("div");
    if (cssClass) element.classList = cssClass
    return element;
};