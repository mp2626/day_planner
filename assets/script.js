const currentDay = $('#currentDay');
const saveButton = $(".saveBtn");
const save = $('#save');
const currentDate = moment().format('ddd Do MMM, YYYY')

let currentTime = ""
noteArray = [];

// Gets data from storage and renders on planner
function renderNotes() {
    noteArray = JSON.parse(localStorage.getItem("dayNotes"))
    $(noteArray).each(function () {
        $("#" + this.id).find("textarea").text(this.note)
    });
}


function timeUpdate() {
    (setInterval(function () {
        currentTime = moment().format('HH');
        updatePlanner()
    }, 1000))
}


// Save Data
// Need to add check if id exists enhancement
function saveData(event) {
    let divId = ($(event.target).parent().attr('id'));
    let note = ($(event.target).siblings('textarea').val())

    // checking that box contains string
    if ($(event.target).siblings('textarea').val()) {
        for (var i = 0; i < noteArray.length; i++) {
            if (noteArray[i].id == divId) {
                noteArray[i].note = note
                console.log(noteArray[i].note)
                localStorage.setItem('dayNotes', JSON.stringify(noteArray));
                save.text("Saved to Local Storage");
                setTimeout(function () {
                    save.text("");
                }, 2000);
            } else {
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

renderNotes()

// timing()

// console.log($("#09").children("div").text())