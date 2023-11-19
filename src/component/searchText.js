export default (classList = "input", type="text", name="text", placeHolder="Search city...  ") => {
  const element = document.createElement("input");
  element.setAttribute("type", type);
  element.setAttribute("placeHolder", placeHolder);
  element.setAttribute("name", name);
  element.classList = classList;
  return element;
};