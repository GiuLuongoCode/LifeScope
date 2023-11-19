export default (cssClass) => {
    const element = document.createElement("div");
    element.classList = cssClass
    return element;
};