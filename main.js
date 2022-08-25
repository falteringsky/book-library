const spanClose = document.getElementsByClassName('close')[0];
const modal = document.getElementById('addBookModal');
const addBtn = document.getElementById('addBtn');
const overlay = document.getElementById('overlay');
const bookForm = document.getElementById('addBookForm');


let myLibrary = [];

function book(title, author, pages, read) {
  this.title = title;
  this.author = author;
  this.pages = pages;
  this.read = read;
}

function addBookToLibrary {

}


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


