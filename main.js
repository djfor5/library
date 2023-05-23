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
let idUpdateBook

newBtn.addEventListener('click', () => {
  console.log('New book button clicked')

  form.removeAttribute('hidden')
  saveBtn.removeAttribute('hidden', 'true')
  updateBtn.setAttribute('hidden', 'true')
})


saveBtn.addEventListener('click', (event) => {
  event.preventDefault()
  console.log('Save book button clicked')
  
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
  myLibrary.find(bookObj => bookObj.bookId === idUpdateBook).title = titleInput.value
  myLibrary.find(bookObj => bookObj.bookId === idUpdateBook).author = authorInput.value
  myLibrary.find(bookObj => bookObj.bookId === idUpdateBook).pages = pagesInput.value
  const readInput = document.querySelector('input[name="read"]:checked')
  
  if (!titleInput.value || !authorInput.value || !readInput) {
    return console.warn('Missing inputs')
  }
  myLibrary.find(bookObj => bookObj.bookId === idUpdateBook).read = readInput.value

  renderBooks(myLibrary)
  
  resetFormValues()
  
  console.log('Existing book updated in myLibrary array')
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


function addBookToLibrary(title, author, pages, read) {
  const newBook = new Book(title, author, pages, read)
  newBook.bookId = bookId
  bookId++
  myLibrary.push(newBook)

  console.log('New book added to myLibrary array')
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
      console.log('Delete button clicked')
      const thisDeleteBtnId = Number(event.target.dataset.bookId)

      myLibrary = myLibrary.filter(bookObj => bookObj.bookId !== thisDeleteBtnId)

      renderBooks(myLibrary)

      console.log('Book deleted from myLibrary array')
      console.log(myLibrary)
    })     
  })
}


function addEditBtns() {
  const editBtns = document.querySelectorAll('.edit')
  editBtns.forEach((editBtn)=>{
    editBtn.addEventListener('click', (event)=>{
      console.log('Edit button clicked')

      const thisEditBtnId = Number(event.target.dataset.bookId)
      console.log(thisEditBtnId)

      idUpdateBook = thisEditBtnId
      console.log(myLibrary)
      titleInput.value = myLibrary.find(bookObj => bookObj.bookId === idUpdateBook).title
      authorInput.value = myLibrary.find(bookObj => bookObj.bookId === idUpdateBook).author
      pagesInput.value = myLibrary.find(bookObj => bookObj.bookId === idUpdateBook).pages
      const isRead = myLibrary.find(bookObj => bookObj.bookId === idUpdateBook).read
      if (isRead === 'yes') {
        readYesInput.checked = true
      } else if (isRead === 'no') {
        readNoInput.checked = true
      }

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
      console.log('Toggle read button clicked')

      const thisToggleReadBtnId = Number(event.target.dataset.bookId)
      console.log(thisToggleReadBtnId)

      idUpdateBook = thisToggleReadBtnId
      console.log(myLibrary)

      const isRead = myLibrary.find(bookObj => bookObj.bookId === idUpdateBook).read
      if (isRead === 'yes') {
        myLibrary.find(bookObj => bookObj.bookId === idUpdateBook).read = 'no'
      } else if (isRead === 'no') {
        myLibrary.find(bookObj => bookObj.bookId === idUpdateBook).read = 'yes'
      }
      
      renderBooks(myLibrary)
    })     
  })
}