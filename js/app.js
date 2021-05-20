// console.log("hello welcome to notes app")
showNotes();
let addBtn = document.getElementById('addBtn');
addBtn.addEventListener("click", function (e) {
    let addTxt = document.getElementById('addTxt');
    let addTitle = document.getElementById('addTitle');
    let notes = localStorage.getItem('notes');
    if (notes == null) {
        notesObj = [];
    }
    else {
        notesObj = JSON.parse(notes);

    }
    d = new Date();
    let myObj = {
        text: addTxt.value,
        title: addTitle.value,
        date: d.getDate(),
        month: d.getMonth(),
        year: d.getFullYear(),
        hour: d.getHours(),
        minutes: d.getMinutes(),
        totalChar: addTxt.value.length,
    }
    notesObj.push(myObj);
    localStorage.setItem("notes", JSON.stringify(notesObj));
    addTxt.value = "";
    addTitle.value = "";
    // console.log(notesObj);
    showNotes();

})
function showNotes() {
    let notes = localStorage.getItem('notes');
    if (notes == null) {
        notesObj = [];
    }
    else {
        notesObj = JSON.parse(notes);

    }
    let html = "";
    notesObj.forEach(function (element, index) {
        html += `
            <div class="noteCard shadow p-3 mb-5 bg-white rounded card mx-2 my-2" style="width: 18rem;">
                <div class="card-body">
                    <h5 class="card-title text-primary">Note ${index + 1}</h5>
                    <h5 class="card-title">${element.title}</h5>
                    <p class="card-text">${element.text}</p>
                    <button id="${index}" onClick="deleteNote(this.id)" class="btn btn-primary">
                        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-trash-fill" viewBox="0 0 16 16">
                            <path d="M2.5 1a1 1 0 0 0-1 1v1a1 1 0 0 0 1 1H3v9a2 2 0 0 0 2 2h6a2 2 0 0 0 2-2V4h.5a1 1 0 0 0 1-1V2a1 1 0 0 0-1-1H10a1 1 0 0 0-1-1H7a1 1 0 0 0-1 1H2.5zm3 4a.5.5 0 0 1 .5.5v7a.5.5 0 0 1-1 0v-7a.5.5 0 0 1 .5-.5zM8 5a.5.5 0 0 1 .5.5v7a.5.5 0 0 1-1 0v-7A.5.5 0 0 1 8 5zm3 .5v7a.5.5 0 0 1-1 0v-7a.5.5 0 0 1 1 0z"/>
                        </svg>
                    </button>
                </div>
                    <p class="text-secondary">Saved On: ${element.date}/${element.month + 1}/${element.year}  ${element.hour}:${element.minutes}
                    <br>Total Character: ${element.totalChar}</p>
            </div>
        `});
        let notesElm = document.getElementById("notes");
        if (notesObj.length != 0) {
            notesElm.innerHTML = html;
        } else {
            notesElm.innerHTML = "<p>Write a note and click on <b>Save Button</b> to save a note for future use!";
        }   
    };
function deleteNote(index) {
    // console.log(index,' deleted');
    let notes = localStorage.getItem('notes');
    if (notes == null) {
        notesObj = [];
    }
    else {
        notesObj = JSON.parse(notes);

    }
    notesObj.splice(index, 1);
    localStorage.setItem("notes", JSON.stringify(notesObj));
    showNotes();
    }
let search = document.getElementById("searchTxt");
search.addEventListener("input", function () {
    inputVal = search.value.toLowerCase();
    // console.log("searching ",inputVal);
    let noteCards = document.getElementsByClassName('noteCard');
    Array.from(noteCards).forEach(function (element) {
        let cardTxt = element.getElementsByTagName('p')[0].innerText;
        if (cardTxt.includes(inputVal)) {
            element.style.display = "block";
        } else {
            element.style.display = "none";
        }
    })
}) 