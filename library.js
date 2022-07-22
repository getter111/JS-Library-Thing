let myLibrary = []

function Book(Title, Author, Pages, Read){
    this.Title = Title
    this.Author = Author
    this.Pages = Pages
    this.Read = Read
}

function addBookToLibrary(title, author, pages, read){
    let book = new Book(title, author, pages, read);
    myLibrary.push(book);
    displayBooks();
}

function displayBooks(){
    const cardContainer = document.querySelector(".card-container");
    const removeCards = document.querySelectorAll(".card");

    for(let i = 0; i < removeCards.length; i++){
        removeCards[i].remove();
    }

    let counter = 0;
    myLibrary.forEach(book => {
        const newDiv = document.createElement("div")
        const actionsContainer = document.createElement("div")
        const deleteBtn = document.createElement("button")
        const readBtn = document.createElement("button")

        newDiv.className = "card";
        actionsContainer.className = "actions-container"
        deleteBtn.setAttribute('id','btn-delete');
        deleteBtn.textContent = "Delete"
        readBtn.setAttribute('id','btn-read');
        readBtn.textContent = "Read"
        deleteBtn.dataset.index = counter
        deleteBtn.addEventListener("click", removeBook)
        readBtn.dataset.index = counter
        readBtn.addEventListener("click", toggleReadStatus)

        function toggleReadStatus(){
            let readStatus = readBtn.dataset.index
            const tempBook = new Book()

            if(myLibrary[readStatus].Read === "Yes"){
                tempBook.Read = "No"
                myLibrary[readStatus].Read = tempBook.Read
            }
            else if(myLibrary[readStatus].Read === "No"){
                tempBook.Read = "Yes"
                myLibrary[readStatus].Read = tempBook.Read
            }
            displayBooks();
        }
        
        function removeBook(){
            let bookRemove = deleteBtn.dataset.index;
            console.log(bookRemove)
            myLibrary.splice(bookRemove , 1);
            newDiv.remove();
            displayBooks();
        }

        actionsContainer.append(deleteBtn)
        actionsContainer.append(readBtn)
        cardContainer.append(newDiv)
        for(const key in book){
            const paragraph = document.createElement("p");
            paragraph.textContent = (`${key}: ${book[key]}`);
            newDiv.append(paragraph)
        }
        newDiv.append(actionsContainer)
        counter++
    })
}

function addNewBook(){
    if (form.style.display === "none"){
        form.style.display = "block"
    }
    else{
        form.style.display = "none";
    }
}

function clearForm(){
    document.querySelector("#form-pop-up").reset();
}

// main script
const form = document.querySelector("#form-pop-up");
const newBookButton = document.querySelector("#new-book");
const submitButton = document.querySelector("#submit-button");
// const checkButton = document.querySelector("#read");
const resetButton = document.querySelector("#reset-button")

resetButton.addEventListener("click", clearForm)

// checkButton.addEventListener("change",() =>{
//     if(checkButton.checked){
//         console.log("u chekc")  
//     }
//     else{
//         console.log("u uncheck")
//     }
// })

newBookButton.addEventListener("click", addNewBook)

submitButton.addEventListener("click", () => {
    const bookTitle = form.elements['title'].value
    const authorName = form.elements['author'].value
    const numOfPages = form.elements['numOfPages'].value
    const read = form.elements['read'].value

    if(bookTitle === "" || authorName === "" || numOfPages === "" || read === ""){
        return;
    }

    addBookToLibrary(bookTitle,authorName,numOfPages,read)

    document.getElementById("form-pop-up").reset() 
    //to prevent refreshing of page make button or form return false on submit/click
    form.style.display = "none"
})

form.style.display = "none";
