const spanClose = document.getElementsByClassName('close')[0];
const modal = document.getElementById('addBookModal');
const addBtn = document.getElementById('addBtn');
const overlay = document.getElementById('overlay');
const bookForm = document.getElementById('addBookForm');
const titleBook = document.getElementById('titlebook');
const authorBook = document.getElementById('author');
const pagesBook = document.getElementById('pages');
/* Main div holding all books*/
const books = document.getElementById('card-grid');

  class Book {
  constructor(title, author, pages, read) {
    this.title = title;
    this.author = author;
    this.pages = pages;
    this.read = read;
  }
}

function addBookToLibrary(title, author, pages, read) {
  myLibrary.push(new Book(title, author, pages, read));
  saveAndRenderBooks();
}

bookForm.addEventListener('submit', (e) => {
  e.preventDefault()

  // returns object
  const data = new FormData(e.target);
  let newBook = {}

  //grab name and value pair off object newBook
  for(let [name, value] of data) {
    if (name === 'readBook') {
      newBook['readBook'] = true
    }
    else {
      newBook[name] = value || ''
    }
  }

  //if we dont have newbook read, then mark as false
  if (!newBook['readBook']) {
    newBook['readBook'] = false
  }

  if (document.querySelector('.form-title').textContent === 'Edit Book') {
    let id = e.target.id;
    let editBook = myLibrary.filter(book => book.id === id)[0]
    editBook.title = newBook['titlebook']
    editBook.author = newBook['author']
    editBook.pages = newBook['pages']
    editBook.read = newBook['readBook']
    saveAndRenderBooks()
  }
  
  else {
  addBookToLibrary(
    newBook['titlebook'],
    newBook['author'],
    newBook['pages'],
    newBook['readBook']
  )}

  bookForm.reset();
  modal.style.display = 'none';
  overlay.style.display = 'none';
})

//array of books
let myLibrary = [];

// local storage => saves value in key pairs
function addLocalStorage() {
  myLibrary = JSON.parse(localStorage.getItem('library')) || [];
  saveAndRenderBooks();
}

//helper function to create html elements with text content and classes
function createBookElement(el, content, className) {
  const element = document.createElement(el);
  element.textContent = content;
  element.setAttribute('class', className);
  return element;
};

//helper function to create an input checkbox with an event listener for if a book is read
function createReadELement(bookItem, book) {
  let read = document.createElement('div');
  read.setAttribute('class', 'book-read');
  read.appendChild(createBookElement('h1', 'Read?', 'book-read-title'));
  let input = document.createElement('input');
  input.type = 'checkbox';
  input.addEventListener('click', (e) => {
    if(e.target.checked) {
      bookItem.setAttribute('class', 'card-book read-checked');
      book.read = true;
      saveAndRenderBooks();
    }
    else {
      bookItem.setAttribute('class', 'card-book read-unchecked');
      book.read = false;
      saveAndRenderBooks();
    }
  });

  if(book.read) {
    input.checked = true;
    bookItem.setAttribute('class', 'card-book read-checked');
  }
  read.appendChild(input);
  return read;
}

function fillOUtEditForm(book) {
  modal.classList.add('active');
  overlay.classList.add('active');
  document.querySelector('.form-title').textContent = 'Edit Book';
  document.querySelector('#submitBtn').textContent = 'Edit';

  document.querySelector('#addBookForm').setAttribute('id', book.id);
  document.querySelector('#titlebook').value = book.title || '';
  document.querySelector('#author').value = book.author || '';
  document.querySelector('#pages').value = book.pages || '';
  document.querySelector('#readBook').checked = book.read;
}

//create the edit button with event listener
function createEditIcons(book) {
  const editIcon = document.createElement('img');
  editIcon.src = './images/grease-pencil.svg';
  editIcon.setAttribute('class', 'edit-icon');
  editIcon.addEventListener('click', (e) => {
    fillOUtEditForm()
  })
  return editIcon;
}

//create dummy icons, they dont do anything
function createIcons() {
  const div = createBookElement('div', null, 'icons');
  const icon1 = document.createElement('img');
  icon1.src = './images/grease-pencil.svg';

  div.appendChild(icon1);
  return div;
}

function deleteBook(index) {
  myLibrary.splice(index, 1);
  saveAndRenderBooks();
}

//function to create all of the book content in the book DOM 
function createBookItem(book, index) {
  const bookItem = document.createElement('div');
  bookItem.setAttribute('id', index);
  bookItem.setAttribute('key', index);
  bookItem.setAttribute('class', 'card book');
  bookItem.appendChild(createBookElement('h1', `Title: ${book.title}`, 'book-title'));
  bookItem.appendChild(createBookElement('h1', `Author: ${book.author}`, 'book-author'));
  bookItem.appendChild(createBookElement('h1', `Pages: ${book.pages}`, 'book-pages'));
  bookItem.appendChild(createReadELement(bookItem, book));
  bookItem.appendChild(createBookElement('button', 'X', 'delete'));
  bookItem.appendChild(createIcons());
  bookItem.appendChild(createEditIcons(book));

  bookItem.querySelector('.delete').addEventListener('click', () => {
    deleteBook(index);
  })

  books.insertAdjacentElement('afterbegin', bookItem);
};

//function to render all the books
function renderBooks() {
  books.textContent = '';
  myLibrary.map((book, index) => {
    createBookItem(book, index);
  });
};

function saveAndRenderBooks() {
  localStorage.setItem('library', JSON.stringify(myLibrary));
  renderBooks();
}

//render books on page loading
addLocalStorage();




// When the user clicks on the button, open the modal
const openBookModal = () => {
    bookForm.reset();
    modal.classList.add('active');
    overlay.classList.add('active');
    document.querySelector('.form-title').textContent = 'Add New Book';
    document.querySelector('#submitBtn').textContent = 'Submit';
  }
  
const closeBookModal = () => {
    modal.classList.remove('active');
    overlay.classList.remove('active');
    // errorMsg.classList.remove('active')
    // errorMsg.textContent = ''
  }

addBtn.onclick = openBookModal;


// When the user clicks on <span> (x), close the modal
spanClose.onclick = closeBookModal;
  
// When the user clicks anywhere outside of the modal, close it
overlay.onclick = closeBookModal


