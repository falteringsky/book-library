const spanClose = document.getElementsByClassName("close")[0];
const modal = document.getElementById("addBookModal");
const addBtn = document.getElementById("addBtn");
const overlay = document.getElementById("overlay");
const bookForm = document.querySelector(".addBookForm");
const titleBook = document.getElementById("titlebook");
const authorBook = document.getElementById("author");
const pagesBook = document.getElementById("pages");

//VALIDATION FOR INPUT FIELDS START
const titleBookError = document.querySelector("#titlebook + span.error");
const authorError = document.querySelector("#author + span.error");
const pagesError = document.querySelector("#pages + span.error");

titleBook.addEventListener("input", (event) => {
  // Each time the user types something, we check if the
  // form fields are valid.

  if (titleBook.validity.valid) {
    // In case there is an error message visible, if the field
    // is valid, we remove the error message.
    titleBookError.textContent = ""; // Reset the content of the message
    titleBookError.className = "error"; // Reset the visual state of the message
  } else {
    // If there is still an error, show the correct error
    showErrorTitle();
  }
});

function showErrorTitle() {
  if (titleBook.validity.valueMissing) {
    // If the field is empty,
    // display the following error message.
    titleBookError.textContent = "You need to enter a book title.";
  } else if (titleBook.validity.tooShort) {
    // If the data is too short,
    // display the following error message.
    titleBookError.textContent = `Book title should be at least ${titleBook.minLength} characters; you entered ${titleBook.value.length}.`;
  }

  // Set the styling appropriately
  titleBookError.className = "error active";
}

authorBook.addEventListener("input", (event) => {
  // Each time the user types something, we check if the
  // form fields are valid.

  if (authorBook.validity.valid) {
    // In case there is an error message visible, if the field
    // is valid, we remove the error message.
    authorError.textContent = ""; // Reset the content of the message
    authorError.className = "error"; // Reset the visual state of the message
  } else {
    // If there is still an error, show the correct error
    showErrorAuthor();
  }
});

function showErrorAuthor() {
  if (authorBook.validity.valueMissing) {
    // If the field is empty,
    // display the following error message.
    authorError.textContent = "You need to enter an author.";
  } else if (authorBook.validity.tooShort) {
    // If the data is too short,
    // display the following error message.
    authorError.textContent = `Author should be at least ${authorBook.minLength} characters; you entered ${authorBook.value.length}.`;
  }

  // Set the styling appropriately
  authorError.className = "error active";
}

pagesBook.addEventListener("input", (event) => {
  // Each time the user types something, we check if the
  // form fields are valid.

  if (pagesBook.validity.valid) {
    // In case there is an error message visible, if the field
    // is valid, we remove the error message.
    pagesError.textContent = ""; // Reset the content of the message
    pagesError.className = "error"; // Reset the visual state of the message
  } else {
    // If there is still an error, show the correct error
    showErrorPages();
  }
});

function showErrorPages() {
  if (pagesBook.validity.valueMissing) {
    // If the field is empty,
    // display the following error message.
    pagesError.textContent = "You need to enter number of pages.";
  }

  // Set the styling appropriately
  pagesError.className = "error active";
}
//VALIDATION FOR INPUT FIELDS START

/* Main div holding all books*/
const books = document.getElementById("card-grid");

// Open the modal
const openBookModal = () => {
  bookForm.reset();
  modal.classList.add("active");
  overlay.classList.add("active");
  document.querySelector(".form-title").textContent = "Add New Book";
  document.querySelector("#submitBtn").textContent = "Submit";
};

// Close book modal
const closeBookModal = () => {
  modal.classList.remove("active");
  overlay.classList.remove("active");
};

//When the user clicks on add book, open the modal
addBtn.onclick = openBookModal;

// When the user clicks on <span> (x), close the modal
spanClose.onclick = closeBookModal;

// When the user clicks anywhere outside of the modal, close it
overlay.onclick = closeBookModal;

//this value received through arguments is passed in object and generate random number to set as id
function Book(title, author, pages, read) {
  this.title = title;
  this.author = author;
  this.pages = pages;
  this.read = read;
  this.id = Math.floor(Math.random() * 1000000);
}

//push arguments received of book into new object and save books into local
function addBookToLibrary(title, author, pages, read) {
  myLibrary.push(new Book(title, author, pages, read));
  saveAndRenderBooks();
}

//pressing button on form will...
bookForm.addEventListener("submit", (e) => {
  // if the email field is valid, we let the form submit
  if (!titleBook.validity.valid) {
    // If it isn't, we display an appropriate error message
    showErrorTitle();
    // Then we prevent the form from being sent by canceling the event
    e.preventDefault();
  }

  if (!authorBook.validity.valid) {
    // If it isn't, we display an appropriate error message
    showErrorAuthor();
    // Then we prevent the form from being sent by canceling the event
    e.preventDefault();
  }

  if (!pagesBook.validity.valid) {
    // If it isn't, we display an appropriate error message
    showErrorPages();
    // Then we prevent the form from being sent by canceling the event
    e.preventDefault();
  }

  e.preventDefault();

  // returns object
  const data = new FormData(e.target);
  let newBook = {};

  //grab name and value pair off object newBook
  for (let [name, value] of data) {
    if (name === "readBook") {
      newBook["readBook"] = true;
    } else {
      newBook[name] = value || "";
    }
  }

  //if there is no readBook, mark readBook in object as false
  if (!newBook["readBook"]) {
    newBook["readBook"] = false;
  }

  //if title edit, then pass new inputs into edited book info and save
  if (document.querySelector(".form-title").textContent == "Edit Book") {
    let id = e.target.id;
    //gives us an array with a matching id and grab first object
    let editBook = myLibrary.filter((book) => book.id == id)[0];
    editBook.title = newBook["titlebook"];
    editBook.author = newBook["author"];
    editBook.pages = newBook["pages"];
    editBook.read = newBook["readBook"];
    saveAndRenderBooks();
  } else {
    addBookToLibrary(
      newBook["titlebook"],
      newBook["author"],
      newBook["pages"],
      newBook["readBook"]
    );
  }

  bookForm.reset();
  modal.classList.remove("active");
  overlay.classList.remove("active");
});

//array of books
let myLibrary = [];

// local storage => saves value in key pairs
function addLocalStorage() {
  myLibrary = JSON.parse(localStorage.getItem("library")) || [];
  saveAndRenderBooks();
}

//helper function to create html elements with text content and classes
function createBookElement(el, content, className) {
  const element = document.createElement(el);
  element.textContent = content;
  element.setAttribute("class", className);
  return element;
}

//helper function to create an input checkbox with an event listener for if a book is read
function createReadElement(bookItem, book) {
  let read = document.createElement("div");
  read.setAttribute("class", "book-read");
  read.appendChild(createBookElement("h1", "Read?", "book-read-title"));
  let input = document.createElement("input");
  input.setAttribute("class", "checkBox");
  input.type = "checkbox";
  input.addEventListener("click", (e) => {
    if (e.target.checked) {
      bookItem.setAttribute("class", "card book read-checked");
      book.read = true;
      saveAndRenderBooks();
    } else {
      bookItem.setAttribute("class", "card book read-unchecked");
      book.read = false;
      saveAndRenderBooks();
    }
  });

  if (book.read) {
    input.checked = true;
    bookItem.setAttribute("class", "card book read-checked");
  }
  read.appendChild(input);
  return read;
}

//get values of input in edit form
function fillOutEditForm(book) {
  modal.classList.add("active");
  overlay.classList.add("active");
  document.querySelector(".form-title").textContent = "Edit Book";
  document.querySelector("#submitBtn").textContent = "Edit";

  document.querySelector(".addBookForm").setAttribute("id", book.id);
  document.querySelector("#titlebook").value = book.title || "";
  document.querySelector("#author").value = book.author || "";
  document.querySelector("#pages").value = book.pages || "";
  document.querySelector("#readBook").checked = book.read;
}

//create the edit button with event listener
function createEditIcons(book) {
  const editIcon = document.createElement("img");
  editIcon.src = "./images/grease-pencil.svg";
  editIcon.setAttribute("class", "edit-icon");
  editIcon.addEventListener("click", () => {
    fillOutEditForm(book);
  });
  return editIcon;
}

//create dummy icons, they dont do anything
function createIcons() {
  const div = createBookElement("div", "", "icons");
  const icon1 = document.createElement("img");
  icon1.src = "./images/grease-pencil.svg";

  div.appendChild(icon1);
  return div;
}

//delete book
function deleteBook(index) {
  myLibrary.splice(index, 1);
  saveAndRenderBooks();
}

//function to create all of the book content in the book DOM
function createBookItem(book, index) {
  const bookItem = document.createElement("div");
  bookItem.setAttribute("id", index);
  bookItem.setAttribute("key", index);
  bookItem.setAttribute("class", "card book");
  const editDeleteIcon = document.createElement("div");
  editDeleteIcon.setAttribute("class", "edit-delete-icon");
  bookItem.appendChild(editDeleteIcon);
  editDeleteIcon.appendChild(createEditIcons(book));
  editDeleteIcon.appendChild(createBookElement("button", "X", "delete"));
  bookItem.appendChild(
    createBookElement("h1", `Title: ${book.title}`, "book-title")
  );
  bookItem.appendChild(
    createBookElement("h1", `Author: ${book.author}`, "book-author")
  );
  bookItem.appendChild(
    createBookElement("h1", `Pages: ${book.pages}`, "book-pages")
  );
  bookItem.appendChild(createReadElement(bookItem, book));
  bookItem.appendChild(createIcons());

  bookItem.querySelector(".delete").addEventListener("click", () => {
    deleteBook(index);
  });

  books.insertAdjacentElement("afterbegin", bookItem);
}

//function to render all the books
function renderBooks() {
  books.textContent = "";
  myLibrary.map((book, index) => {
    createBookItem(book, index);
  });
}

//save books to local storage
function saveAndRenderBooks() {
  localStorage.setItem("library", JSON.stringify(myLibrary));
  renderBooks();
}

//render books on page loading
addLocalStorage();
