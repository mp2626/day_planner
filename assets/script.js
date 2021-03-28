const currentDay = $('#currentDay');
const saveButton = $(".saveBtn");
const save = $('#save');
const currentDate = moment().format('ddd Do MMM, YYYY')

let currentTime = ""
noteArray = [];

// adds current time to header
currentDay.text(currentDate)


// get data from storage

function getData() {

}

function timeUpdate() {
    (setInterval(function () {
        currentTime = moment().format('HH');
        $("#currentTime").text(currentTime);
        updatePlanner()
    }, 1000))
}


// Save Data
// Need to add check if id exists enhancement
function saveData(event) {
    let divId = ($(event.target).parent().attr('id'));
    let note = ($(event.target).siblings('textarea').val())

    if ($(event.target).siblings('textarea').val()) {
        noteArray.push({
            id: divId,
            note: note,
        })
        localStorage.setItem('dayNotes', JSON.stringify(noteArray));
        save.text("Saved to Local Storage");
        setTimeout(function () {
            save.text("");
        }, 2000);
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

timeUpdate()

// timing()

// console.log($("#09").children("div").text())