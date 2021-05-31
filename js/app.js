console.log('Welcome to notes app . This is app.js');
showNotes();


//If user adds  a note , add it to a local storage.
let addBtn = document.getElementById('addBtn');

addBtn.addEventListener("click", function (e) {
    let addTxt = document.getElementById("addTxt");
    let addTitle = document.getElementById("title");
    let notes = localStorage.getItem("notes");
    if (notes == null) {
        notesObj = [];
    }
    else {
        notesObj = JSON.parse(notes);
    }
   
    if (addTitle.value.length != 0 && addTxt.value.length != 0) {
        let myObj = {
            title: addTitle.value,
            text: addTxt.value
        }
        notesObj.push(myObj);
        localStorage.setItem("notes", JSON.stringify(notesObj));
        addTxt.value = "";
        addTitle.value = "";
        showNotes();
        console.log("not empty");
    } else {
        alert("Add Title and Description of your Note");
    } 
})

//Function to show  elements from local Storage
function showNotes() {
    let notes = localStorage.getItem("notes");
    if (notes == null) {
        // console.alert("NO");
        notesObj = [];
    }
    else {
        notesObj = JSON.parse(notes);
    }
    let html = "";
    notesObj.forEach(function (element, index) {
        html += `
        <div class="noteCard my-2 mx-2 card" style="width: 18rem;">
            <div class="card-body">
                <div>
                    <div class="tooltip">
                        <span class="tooltiptext">Mark as imp</span>
                    </div>
                    <h5 class="card-title">${element.title}</h5> 
                </div>
                <p class="card-text">${element.text}</p>
                <button id = "${index}" onclick="deleteNote(this.id)" class="btn btn-primary" style="background-color:rgb(138, 90, 90); border:1px solid rgb(138, 90, 90);">Delete Note</button>
            </div>  
        </div>
        `;
    });
    let notesElm = document.getElementById('notes');
    if (notesObj.length != 0) {
        notesElm.innerHTML = html;
    }
    else {
        notesElm.innerHTML = `Nothing to show ! use"Add a Note" section above to add notes`;
    }
}

//Function to delete a note
function deleteNote(index) {
    let notes = localStorage.getItem("notes");
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
    let inputVal = search.value.toLowerCase();
    let noteCards = document.getElementsByClassName('noteCard');
    Array.from(noteCards).forEach(function (element) {
        let cardTxt = element.getElementsByTagName("p")[0].innerText;
        if (cardTxt.includes(inputVal)) {
            element.style.display = "block";
        }
        else {
            element.style.display = "none";

        }
    })
})

function importantNote(index) {
    console.log('This note is important', index);
}

//Mark a note as important
function markImportant() {    
    console.log("marked as important");
    var text = document.getElementById("noteLable");
    if (checkBox.checked == true){
        text.style.display = "inline-flex";
        text.style.float = "right";
    } else {
        text.style.display = "none";
    }
}

/*
1.Add a Title
2.Mark a note as important
3.Seperate notes by user
4.Sync and host to a server
*/
