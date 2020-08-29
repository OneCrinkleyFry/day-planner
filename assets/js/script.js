//pulls the persistent list from local storage or creates an empty array, if no local storage exists.
var hourTasks = JSON.parse(localStorage.getItem("daily-tasks")) || ["", "", "", "", "", "", "", "", ""];

//finds the current day using moment.js
var currentDay = moment().format("[Today is] dddd [the] Do [of] MMMM, YYYY");

//displays the current day in the element with the shared id
$("#currentDay").text(currentDay);


//checks time to fix it in the event that another day has come.
// also makes sure the tasks loaded are all updated every 10 minutes
var checkTime = setInterval(function() {
    //if today is different than the previously set day
    if ((moment().format("[Today is] dddd [the] Do [of] MMMM, YYYY")) !== currentDay) {
        // change to the new day
        currentDay = moment().format("[Today is] dddd [the] Do [of] MMMM, YYYY");
        //display the new day
        $("#currentDay").text(currentDay);
    }
    loadTasks();
},  1000  * 60 * 10);


//if the save button is clicked then save the content of the text area sibling.
$(".saveBtn").on("click", function () {
    //find the parents child with the class description's value and store it in content
    var content = $(this).closest(".time-block").children(".description").val();
    //find the value of the parents id attribute and store it in index.
    var index = $(this).closest(".time-block").attr("id");
    
    //set the value of hourTasks at the cooresponding index equal to content;
    hourTasks[index] = content;
    //save the array into local storage.
    localStorage.setItem("daily-tasks", JSON.stringify(hourTasks));
});

// if the textarea is no longer focused on, save.
$(".description").on("blur", function() {
    //sets content to the value of the textarea
    var content = $(this).val();
    //sets index to the value of the parent's id attribute
    var index = $(this).closest(".time-block").attr("id");
    
    //set the value of hourTasks at the cooresponding index equal to content;
    hourTasks[index] = content;
    //save the array into local storage.
    localStorage.setItem("daily-tasks", JSON.stringify(hourTasks));
});

//displays the current saved persistent data to it's cooresponding hour slot.
var loadTasks = function() {
    //for all the items in hourTasks
    for (let i = 0; i < hourTasks.length; i++) {
        //set the value of slot time to the child element with the id of the index(i).
        var slotTime = $(".container").children("#" + i).children(".description");
        
        //sets the value of the element to the cooresponding index
        slotTime.val(hourTasks[i]);
    }
    //runs the check time function.
    checkTime();
};

//checks the current time agains the timeblocks cooresponding time.
var checkTime = function() {
    //sets current hour to the military time format using moment.js
    var currentHour = moment().format("H");
    
    //for each element with the description class
    $(".description").each(function() {
        //gets the element with the cooresponding time.
        var hourBlockTime = $(this).attr("data-id");
        
        //if the current hour is greater than the hour blocks time
        if (currentHour > hourBlockTime) {
            //remove the classes present and the future classes, and adds the past class to the element.
            $(this).removeClass("present future").addClass("past");
            
        //if the current hour is eaqual to the hour blocks time
        } else if (currentHour === hourBlockTime) {
            //remove the classes past and the future classes, and adds the present class to the element.
            $(this).removeClass("past future").addClass("present");
            
        //if the current hour is less than the hour blocks time
        } else if (currentHour < hourBlockTime) {
            //remove the classes present and the past classes, and adds the future class to the element.
            $(this).removeClass("past present").addClass("future");
        }
    })
}

//loads the tasks initially.
loadTasks();
