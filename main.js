// NEW BOOK
const newBtn = document.querySelector('#new-book')


// FORM
const form = document.querySelector('#form')
const titleInput = document.querySelector('#title')
const authorInput = document.querySelector('#author')
const pagesInput = document.querySelector('#pages')
const readYesInput = document.querySelector('#read-yes')
const readNoInput = document.querySelector('#read-no')
const saveBtn = document.querySelector('#save-book')


// CARDS
const cardsSection = document.querySelector('#cards')


newBtn.addEventListener('click', () => {
  form.removeAttribute('hidden')
})


saveBtn.addEventListener('click', (event) => {
  event.preventDefault()
  const readInput = document.querySelector('input[name="read"]:checked')
  addBookToLibrary(titleInput.value, authorInput.value, pagesInput.value, readInput.value)
  
  // RESET FORM VALUES
  titleInput.value = ""
  authorInput.value = ""
  pagesInput.value = ""
  readYesInput.checked = false
  readNoInput.checked = false

  form.setAttribute('hidden', 'true')
})


let myLibrary = [];


function Book(title, author, pages, read) {
  if (!(this instanceof Book)) {
    // console.warn('The "new" keyword must be used to call Book')
    return new Book(title, author, pages, read)
  }

  this.title = title
  this.author = author
  this.pages = pages
  this.read = read
}


function addBookToLibrary(title, author, pages, read) {
  const newBook = new Book(title, author, pages, read)
  myLibrary.push(newBook)

  // CREATE NEW CARD
  const cardDiv = document.createElement('div')
  cardDiv.classList.add('card')

  // ADD P TAGS
  const pTitle = document.createElement('p')
  const pAuthor = document.createElement('p')
  const pPages = document.createElement('p')
  const pRead = document.createElement('p')
  
  // ADD TEXT
  pTitle.textContent = `Title: ${title}`
  pAuthor.textContent = `Author: ${author}`
  pPages.textContent = `Pages: ${pages}`
  pRead.textContent = `Read: ${read}`
  
  // APPEND P TAGS TO CARD
  cardDiv.appendChild(pTitle)
  cardDiv.appendChild(pAuthor)
  cardDiv.appendChild(pPages)
  cardDiv.appendChild(pRead)
  
  // APPEND CARD TO BODY
  cardsSection.appendChild(cardDiv)
}