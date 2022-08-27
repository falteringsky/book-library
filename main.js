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

//array of books
let myLibrary = [];

// local storage => saves value in key pairs
function addLocalStorage() {
  // localStorage.setItem('library', JSON.stringify([
  //   {
  //     title:'book 1',
  //     author: 'john doe',
  //     pages: '1',
  //     read: 'true'
  //   },
  //   {
  //     title:'book 2',
  //     author: 'Kio doe',
  //     pages: '4',
  //     read: 'false'
  //   },
  // ])
  // );
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

//create the edit button with event listener
function createEditIcons(book) {
  const editIcon = document.createElement('img');
  editIcon.src = './images/grease-pencil.svg';
  editIcon.setAttribute('class', 'edit-icon');
  editIcon.addEventListener('click', (e) => {
    console.log(book);
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

//Book class: represents book

 /*class Book {
  constructor(title, author, pages, read) {
  this.title = title;
  this.author = author;
  this.pages = pages;
  this.read = read;
  }
}
*/




// When the user clicks on the button, open the modal
const openBookModal = () => {
    bookForm.reset();
    modal.classList.add('active');
    overlay.classList.add('active');
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




  //UI class: handles UI elements

/* class UI {
  static displayBooks() {
    const storedBooks = [
      {
        title:'book 1',
        author: 'john doe',
        pages: '1',
        read: 'true'
      },
      {
        title:'book 2',
        author: 'Kio doe',
        pages: '4',
        read: 'false'
      }
    ];

    const books = storedBooks;

    books.forEach((book) => UI.addBookToList(book));
  }

  static addBookToList(book) {
    const list = document.getElementById('card-grid');

    
  }
}
function addBookToLibrary {

}
*/