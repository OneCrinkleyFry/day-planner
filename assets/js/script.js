var hourTasks = JSON.parse(localStorage.getItem("Task")) || [];

var currentDay = moment().format("[Today is] dddd [the] Do [of] MMMM, YYYY");
$("#currentDay").text(currentDay);

var checkTime = setInterval(function() {
    if ((moment().format("[Today is] dddd [the] Do [of] MMMM, YYYY")) !== currentDay) {
        currentDay = moment().format("[Today is] dddd [the] Do [of] MMMM, YYYY");
        $("#currentDay").text(currentDay);
    }
},  1000 * 60 * 10);



$(".description").on("blur", function () {
    var content = $(this).val().trim();
    var index = $(this).attr("data-id");
    hourTasks[index] = content;
    
    localStorage.setItem("tasks", JSON.stringify(hourTasks));
});


var loadTasks = function() {
    
}