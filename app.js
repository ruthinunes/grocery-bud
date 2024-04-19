// local storage
const getLocalStorage = () => JSON.parse(localStorage.getItem("list")) ?? [];

const updateLocalStorage = (id, value) => {
  const items = getLocalStorage().reverse();
  items[id].value = value;

  localStorage.setItem("list", JSON.stringify(items.reverse()));
};
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
  setItemsButtons();
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
  const content = itemContent(item);

  element.innerHTML = content;
  list.appendChild(element);
};

// Generate HTML item content
const itemContent = (item) => {
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

// Set event listeners for edit and delete buttons of each item
const setItemsButtons = () => {
  const editButtons = document.querySelectorAll(".item__btn-edit");
  const deleteButtons = document.querySelectorAll(".item__btn-delete");

  editButtons.forEach((button) => {
    button.addEventListener("click", (e) => {
      displayEditModal(e.target.closest("li"));
    });
  });
  deleteButtons.forEach((button) => {
    button.addEventListener("click", (e) => {
      displayDeleteModal(e.target.closest("li"));
    });
  });
};

// Display the edit modal for a specific item
const displayEditModal = (item) => {
  const modal = document.querySelector(".grocery__modal");
  const content = editContent();

  displayRemoveModal(modal, "block");
  modal.insertAdjacentHTML("beforeend", content);
  modal.querySelector("input").value = item.firstChild.innerHTML;
  modal.querySelector("input").focus();
  setItemEdition(item.id, modal);
};

// Generate HTML content for the edit modal
const editContent = () => {
  return `<div class="modal">
            <div class="modal__header">
              <p class="alert modal__alert"></p>
              <button type="button" class="modal__close">
                <i class="fas fa-times"></i>
              </button>
            </div>
            <div class="modal__body">
              <input
                type="text"
                id="modal-input"
                class="modal__input"
                placeholder="type here"
              />
              <button type="submit" class="modal__button">edit</button>
            </div>
          </div>`;
};

// Set up item edition functionality
const setItemEdition = (id, modal) => {
  const editButton = document.querySelector(".modal__button");
  const input = modal.querySelector("input");

  // Function to handle edit button click
  const handleButtonClick = () => {
    if (input.value == "") {
      displayAlert("Please, insert a value!", "danger", ".modal__alert");
      return;
    }
    displayEditedItem(id, input.value, modal);
    editButton.removeEventListener("click", handleButtonClick); // Remove event listener for edit button
  };

  editButton.addEventListener("click", handleButtonClick); // Add event listener for edit button click
  setCloseModalButton(modal);
};

// Display edited item
const displayEditedItem = (id, value, modal) => {
  updateLocalStorage(id, value);
  displayRemoveModal(modal, "none");
  setBackToDefault();
  loadItems();
  displayAlert("item edited", "success", ".alert");
};

// Set up event listener for close modal button
const setCloseModalButton = (modal) => {
  const closeButton = document.querySelector(".modal__close");

  closeButton.addEventListener("click", () => {
    displayRemoveModal(modal, "none");
  });
};

// reusable functions
const displayAlert = (text, action, element) => {
  const alertElement = document.querySelector(element);

  alertElement.textContent = text;
  alertElement.classList.add("alert-" + action);

  // remove alert
  setTimeout(function () {
    alertElement.textContent = "";
    alertElement.classList.remove("alert-" + action);
  }, 1400);
};

const displayRemoveModal = (modal, prop) => {
  modal.style.display = prop;

  if (prop == "none") {
    modal.innerHTML = "";
  }
};

const setBackToDefault = () => {
  const list = document.querySelector(".list");
  const input = document.querySelector(".form__input");

  input.value = "";
  list.innerHTML = "";
};

window.addEventListener("DOMContentLoaded", () => {
  loadItems();
  //   setSubmitButton();
  //   setClearButton();
});
