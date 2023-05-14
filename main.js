// FORM
const authorInput = document.querySelector('#author')
const titleInput = document.querySelector('#title')
const pagesInput = document.querySelector('#pages')
const readYesInput = document.querySelector('#read-yes')
const readNoInput = document.querySelector('#read-no')
const saveBtn = document.querySelector('#save-book')

// CARDS
const library = document.querySelector('#library')

saveBtn.addEventListener('click',(event)=>{
  event.preventDefault()
  const readInput = document.querySelector('input[name="read"]:checked')
  addBookToLibrary(authorInput.value, titleInput.value, pagesInput.value, readInput.value)
  
  // RESET FORM VALUES
  authorInput.value = ""
  titleInput.value = ""
  pagesInput.value = ""
  readYesInput.checked = false
  readNoInput.checked = false
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