// local storage
const getLocalStorage = () => JSON.parse(localStorage.getItem("list")) ?? [];

const setLocalStorage = (value) =>
  localStorage.setItem("list", JSON.stringify(value));

const updateLocalStorage = (id, value) => {
  const items = getLocalStorage().reverse();
  items[id].value = value;

  setLocalStorage(items.reverse());
};

const deleteLocalStorage = (index) => {
  const items = getLocalStorage().reverse();
  items.splice(index, 1);
  setLocalStorage(items.reverse());
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
      editModal(e.target.closest("li"));
    });
  });
  deleteButtons.forEach((button) => {
    button.addEventListener("click", (e) => {
      deleteModal(e.target.closest("li"));
    });
  });
};

// Display the edit modal for a specific item
const editModal = (item) => {
  const modal = document.querySelector(".grocery__modal");
  const content = editContent();

  displayModal(modal, "block");
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
  displayModal(modal, "none");
  setBackToDefault();
  loadItems();
  displayAlert("item edited", "success", ".alert");
};

// Set up event listener for close modal button
const setCloseModalButton = (modal) => {
  const closeButton = document.querySelector(".modal__close");

  closeButton.addEventListener("click", () => {
    displayModal(modal, "none");
  });
};

// Display delete modal for an item
const deleteModal = (item) => {
  const modal = document.querySelector(".grocery__modal");
  const content = deleteContent(item);

  modal.insertAdjacentHTML("beforeend", content);
  displayModal(modal, "block");
  setDeletionButtons(item);
};

// Generate HTML content for the delete modal
const deleteContent = (item) => {
  return `<div class="modal modal__delete">
            <p>Are you sure you want to delete :</p>
            <div class="modal__body">
              <p class="item__title">${item.firstChild.innerHTML} ?</p>
              <div class="modal__butons">
                <button type="button" class="modal__button delete__button">delete</button>
                <button type="button" class="modal__button cancel__button">cancel</button>
              </div>
            </div>
          </div>`;
};

// Set up event listeners for buttons in the delete modal
const setDeletionButtons = (item) => {
  const modal = document.querySelector(".modal__delete");
  const deleteButton = modal.querySelector(".delete__button");
  const cancelButton = modal.querySelector(".cancel__button");

  deleteButton.addEventListener("click", () => deleteItem(item));
  //   cancelButton.addEventListener("click", cancelDeletion);
};

// Delete an item from the list
const deleteItem = (item) => {
  const modal = document.querySelector(".grocery__modal");
  const list = document.querySelector(".list");

  list.removeChild(item);
  deleteLocalStorage(item.id);
  displayModal(modal, "none");
  displayAlert("item removed", "danger", ".alert");
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

const displayModal = (modal, prop) => {
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
