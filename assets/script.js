const currentDay = $('#currentDay');
const saveButton = $(".saveBtn");
const save = $('#save');
const currentDate = moment().format('ddd Do MMM, YYYY');

let currentTime = "";
noteArray = [];

// adds current time to header
currentDay.text(currentDate);

// Gets data from storage and renders on planner
function renderNotes() {
    noteArray = JSON.parse(localStorage.getItem("dayNotes")) || [];
    $(noteArray).each(function () {
        $("#" + this.id).find("textarea").text(this.note)
    });
}

// timer function that feeds the updatePlaner to adjust planner colors
function timeUpdate() {
    (setInterval(function () {
        currentTime = moment().format('HH');
        updatePlanner()
    }, 1000))
}

// checks to see if object exists is so replaces that object note, 
// if the object does not exist, creates new object for note.
function saveData(event) {
    let divId = ($(event.target).parent().attr('id'));
    let newNote = ($(event.target).siblings('textarea').val())

    // checking that box contains string
    if ($(event.target).siblings('textarea').val()) {

        let existingNote = noteArray.find(function (note) {
            return note.id === divId;
        });
        if (existingNote) {
            existingNote.note = newNote;
        } else {
            noteArray.push({
                id: divId,
                note: newNote,
            })
        }
        localStorage.setItem('dayNotes', JSON.stringify(noteArray));
        save.text("Saved to Local Storage");
        setTimeout(function () {
            save.text("");
        }, 2000)
    }
}

// timing function to set colours base on time, moment, current time and if statements
function updatePlanner() {
    divIds = $(".time-block")

    divIds.each(function () {
        if ($(this).attr("id") < currentTime) {
            $(this).children("div").css('background-color', '#CDCDCD')
        } else if ($(this).attr("id") == currentTime) {
            $(this).children("div").css('background-color', 'lightskyblue')
        } else {
            $(this).children("div").css('background-color', '#bbeebb')
        }

    });
}

// events
saveButton.on("click", saveData)

// calls functions on page load
timeUpdate()

renderNotes()
