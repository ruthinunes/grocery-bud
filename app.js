const getLocalStorage = () => JSON.parse(localStorage.getItem("list")) ?? [];

// Load items from local storage
const loadItems = () => {
  const items = getLocalStorage().reverse();

  if (items.length > 0) {
    setList(items);
  }
};

// Set up list
const setList = (items) => {
  items.forEach((item, index) => {
    createItem(item, index);
  });
//   setItemsButtons();
};

// Create an individual item
const createItem = (item, index) => {
  const element = document.createElement("li");
  const attr = document.createAttribute("id");

  attr.value = index;
  element.setAttributeNode(attr);
  element.classList.add("list__item");

  displayItem(element, item);
};

// Display item in the list element
const displayItem = (element, item) => {
  const list = document.querySelector(".list");

  element.innerHTML = itemElement(item);
  list.appendChild(element);
};

// Return the item's HTML based on the item's value
const itemElement = (item) => {
  return `<p class="item__title">${item.value}</p>
    <div class="item__buttons">
      <button type="button" class="item__btn-edit">
        <i class="fas fa-edit"></i>
      </button>
      <button type="button" class="item__btn-delete">
        <i class="fas fa-trash"></i>
      </button>
    </div>`;
};

window.addEventListener("DOMContentLoaded", () => {
  loadItems();
  //   setSubmitButton();
  //   setClearButton();
});
