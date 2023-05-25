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
const updateBtn = document.querySelector('#update-book')


// CARDS
let cardsSection = document.querySelector('#cards')


let myLibrary = [];
let bookId = 0
let thisIdUpdateBook


newBtn.addEventListener('click', () => {
  console.log('%cNew book', 'font-weight: bold; font-style: italic;', 'button clicked.')

  form.removeAttribute('hidden')
  saveBtn.removeAttribute('hidden', 'true')
  updateBtn.setAttribute('hidden', 'true')
})


saveBtn.addEventListener('click', (event) => {
  event.preventDefault()
  console.log('%cSave book', 'font-weight: bold; font-style: italic;', 'button clicked, new book added to myLibrary array.')
  
  // get values from input fields
  const title = titleInput.value
  const author = authorInput.value
  const pages = pagesInput.value
  const readInput = document.querySelector('input[name="read"]:checked')
  
  if (!title || !author || !readInput) {
    return console.warn('Missing inputs')
  }
  const read = readInput.value

  // create new book object and add to myLibrary array
  addBookToLibrary(title, author, pages, read)
  renderBooks(myLibrary)

  resetFormValues()

  form.setAttribute('hidden', 'true')
  saveBtn.setAttribute('hidden', 'true')
  updateBtn.setAttribute('hidden', 'true')
})


updateBtn.addEventListener('click', () => {
  console.log(thisIdUpdateBook)

  myLibrary.find(bookObj => bookObj.bookId === thisIdUpdateBook).title = titleInput.value
  myLibrary.find(bookObj => bookObj.bookId === thisIdUpdateBook).author = authorInput.value
  myLibrary.find(bookObj => bookObj.bookId === thisIdUpdateBook).pages = pagesInput.value
  const readInput = document.querySelector('input[name="read"]:checked')
  
  if (!titleInput.value || !authorInput.value || !readInput) {
    return console.warn('Missing inputs')
  }
  myLibrary.find(bookObj => bookObj.bookId === thisIdUpdateBook).read = readInput.value

  renderBooks(myLibrary)
  
  resetFormValues()
  
  console.log('%cUpdate book', 'font-weight: bold; font-style: italic;', 'button clicked, selected book updated in myLibrary array.')
  console.log(myLibrary)

  form.setAttribute('hidden', 'true')
  saveBtn.setAttribute('hidden', 'true')
  updateBtn.setAttribute('hidden', 'true')
})


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


Book.prototype.toggleRead = function() {
  if (this.read === 'yes') {
    return this.read = 'no'
  } else if (this.read === 'no') {
    return this.read = 'yes'
  }
}


function addBookToLibrary(title, author, pages, read) {
  const newBook = new Book(title, author, pages, read)
  newBook.bookId = bookId
  bookId++
  myLibrary.push(newBook)

  console.log(myLibrary)
}


function renderBooks(booksArr) {
  cardsSection.innerHTML = "" // delete all cards, card content, and corresponding event listeners

  booksArr.forEach((bookObj)=>{
    // create card and info elements
    const divCard = document.createElement('div')
    const pTitle = document.createElement('p')
    const pAuthor = document.createElement('p')
    const pPages = document.createElement('p')
    const pRead = document.createElement('p')
    const btnToggleRead = document.createElement('button')
    const btnEdit = document.createElement('button')
    const btnDelete = document.createElement('button')

    // add attributes and text content to elements
    divCard.classList.add('card')
    pTitle.textContent = `Title: ${bookObj.title}`
    pAuthor.textContent = `Author: ${bookObj.author}`
    pPages.textContent = `Pages: ${bookObj.pages}`
    pRead.textContent = `Read: ${bookObj.read}`
    btnToggleRead.classList.add('toggle-read')
    btnToggleRead.dataset.bookId = bookObj.bookId
    btnToggleRead.textContent = 'Toggle read'
    btnEdit.classList.add('edit')
    btnEdit.dataset.bookId = bookObj.bookId
    btnEdit.textContent = 'Edit book'
    btnDelete.classList.add('delete')
    btnDelete.dataset.bookId = bookObj.bookId
    btnDelete.textContent = 'Delete book'

    // append elements to divCard and divCard to cardsSection
    divCard.appendChild(pTitle)
    divCard.appendChild(pAuthor)
    divCard.appendChild(pPages)
    divCard.appendChild(pRead)
    divCard.appendChild(btnToggleRead)
    divCard.appendChild(btnEdit)
    divCard.appendChild(btnDelete)
    cardsSection.appendChild(divCard)
  })

  addToggleReadBtns()
  addEditBtns()
  addDeleteBtns()
}


function resetFormValues() {
  titleInput.value = ""
  authorInput.value = ""
  pagesInput.value = ""
  readYesInput.checked = false
  readNoInput.checked = false
}


function addDeleteBtns() {
  const deleteBtns = document.querySelectorAll('.delete')
  deleteBtns.forEach((deleteBtn)=>{
    deleteBtn.addEventListener('click', (event)=>{
      console.log('%cDelete book', 'font-weight: bold; font-style: italic;', 'button clicked, selected book deleted from myLibrary array.')
      const thisDeleteBtnId = Number(event.target.dataset.bookId)

      myLibrary = myLibrary.filter(bookObj => bookObj.bookId !== thisDeleteBtnId)
      console.log(myLibrary)

      renderBooks(myLibrary)
    })     
  })
}


function addEditBtns() {
  const editBtns = document.querySelectorAll('.edit')
  editBtns.forEach((editBtn)=>{
    editBtn.addEventListener('click', (event)=>{
      console.log('%cEdit book', 'font-weight: bold; font-style: italic;', 'button clicked.')

      thisIdUpdateBook = Number(event.target.dataset.bookId)
      
      titleInput.value = myLibrary.find(bookObj => bookObj.bookId === thisIdUpdateBook).title
      authorInput.value = myLibrary.find(bookObj => bookObj.bookId === thisIdUpdateBook).author
      pagesInput.value = myLibrary.find(bookObj => bookObj.bookId === thisIdUpdateBook).pages
      const isRead = myLibrary.find(bookObj => bookObj.bookId === thisIdUpdateBook).read
      if (isRead === 'yes') {
        readYesInput.checked = true
      } else if (isRead === 'no') {
        readNoInput.checked = true
      }

      console.log(myLibrary)

      form.removeAttribute('hidden')
      saveBtn.setAttribute('hidden', 'true')
      updateBtn.removeAttribute('hidden')
    })     
  })
}


function addToggleReadBtns() {
  const toggleReadBtns = document.querySelectorAll('.toggle-read')
  toggleReadBtns.forEach((toggleReadBtn)=>{
    toggleReadBtn.addEventListener('click', (event)=>{
      console.log('%cToggle read', 'font-weight: bold; font-style: italic;', 'button clicked, read status toggled on selected book and updated in myLibrary array.')

      const thisIdToggleReadBook = Number(event.target.dataset.bookId)
      
      myLibrary.find(bookObj => bookObj.bookId === thisIdToggleReadBook).toggleRead()
      console.log(myLibrary)
      
      renderBooks(myLibrary)
    })     
  })
}