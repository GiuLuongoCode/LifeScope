export default (text = "LifeScope") => {
    const element = document.createElement("h1");
  
    element.innerHTML = text;
  
    return element;
};