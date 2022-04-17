class Book {
    constructor(name, number, gender,type,indate,outdate) {
        this.name = name;
        this.number = number;
        this.type = type;
        this.gender = gender;
        this.indate = indate;
        this.outdate = outdate;
    }
}

class Display {
    add(book) {
        console.log("Adding to UI");
        let tableBody = document.getElementById('tableBody');
        let uiString = `<tr>
                            <td>${book.name}</td>
                            <td>${book.number}</td>
                            <td>${book.gender}</td>
                            <td>${book.type}</td>
                            <td>${book.indate}</td>
                            <td>${book.outdate}</td>
                        </tr>`;
        tableBody.innerHTML += uiString;
    }

    clear() {
        let libraryForm = document.getElementById('libraryForm');
        libraryForm.reset();
    }

    validate(book) {
        if (book.name.length < 2 || book.number.length != 10) {
            return false
        }
        else {
            return true;
        }
    }

    show(type, displayMessage) {
        let message = document.getElementById('message');
        let boldText;
        if(type==='success'){
            boldText = 'Success';
        }
        else{
            boldText = 'Error!';
        }
        message.innerHTML = `<div class="alert alert-${type} alert-dismissible fade show" role="alert">
                                <strong>${boldText}:</strong> ${displayMessage}
                                <button type="button" class="close" data-dismiss="alert" aria-label="Close">
                                <span aria-hidden="true">×</span>
                                </button>
                            </div>`;
        setTimeout(function () {
            message.innerHTML = ''
        }, 5000);
    
    }
}

// Add submit event listener to libraryForm
let libraryForm = document.getElementById('libraryForm');
libraryForm.addEventListener('submit', libraryFormSubmit);

function libraryFormSubmit(e) {
    console.log('YOu have submitted library form');
    let name = document.getElementById('Name').value;
    let number = document.getElementById('number').value;
    let type;
    let gender;
    let male = document.getElementById('male');
    let female = document.getElementById('female');
    let stdsingle = document.getElementById('stdsingle');
    let stddouble = document.getElementById('stddouble');
    let deluxe = document.getElementById('deluxe');
    let suite = document.getElementById('suite');
    let indate = document.getElementById('indate').value;
    let outdate = document.getElementById('outdate').value;
    if (male.checked) {
        gender = male.value;
    }
    else if (female.checked) {
        gender = female.value;
    }

    if (stdsingle.checked) {
        type = stdsingle.value;
    }
    else if (stddouble.checked) {
        type = stddouble.value;
    }
   else  if (deluxe.checked) {
        type = deluxe.value;
    }
    else  if (suite.checked) {
        type = suite.value;
    }

    let book = new Book(name, number, gender,type,indate,outdate);
    console.log(book);

    let display = new Display();

    if (display.validate(book)) {

        display.add(book);
        display.clear();
        display.show('success', 'Your customer has been successfully added')
    }
    else {
        // Show error to the user
        display.show('danger', 'Sorry you cannot add this customer');
    }

    e.preventDefault();
}