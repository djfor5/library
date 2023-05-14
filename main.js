// FORM
const authorInput = document.querySelector('#author')
const titleInput = document.querySelector('#title')
const pagesInput = document.querySelector('#pages')
// const readInput = document.querySelector('input[name="read"]:checked')
const saveBtn = document.querySelector('#save-book')

// CARDS
const library = document.querySelector('#library')

saveBtn.addEventListener('click',(event)=>{
  const readInput = document.querySelector('input[name="read"]:checked')
  console.log(readInput.value)
  // event.preventDefault()
  addBookToLibrary(authorInput.value, titleInput.value, pagesInput.value, readInput.value)
  // authorInput.value = ""
  // titleInput.value = ""
  // pagesInput.value = ""
  // readInput.value = 0
})

let myLibrary = [];

function Book(author, title, pages, read) {
  if (!(this instanceof Book)) {
    // console.warn('The "new" keyword must be used to call Book')
    return new Book(author, title, pages, read)
  }

  this.author = author
  this.title = title
  this.pages = pages
  this.read = read
}

function addBookToLibrary(author, title, pages, read) {
  const newBook = new Book(author, title, pages, read)
  myLibrary.push(newBook)
  library.textContent = myLibrary
  console.log(myLibrary)
}