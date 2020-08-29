var hourTasks = JSON.parse(localStorage.getItem("tasks")) || ["", "", "", "", "", "", "", "", ""];

var currentDay = moment().format("[Today is] dddd [the] Do [of] MMMM, YYYY");
$("#currentDay").text(currentDay);

var checkTime = setInterval(function() {
    if ((moment().format("[Today is] dddd [the] Do [of] MMMM, YYYY")) !== currentDay) {
        currentDay = moment().format("[Today is] dddd [the] Do [of] MMMM, YYYY");
        $("#currentDay").text(currentDay);
    }
    loadTasks();
},  1000 * 60 * 10);



$(".saveBtn").on("click", function () {
    var content = $(this).closest(".time-block").children("textarea").val();
    var index = $(this).closest(".time-block").attr("id");
    hourTasks[index] = content;
    localStorage.setItem("tasks", JSON.stringify(hourTasks));
});


var loadTasks = function() {
    for (let i = 0; i < hourTasks.length; i++) {
        var slotTime = $(".container").children("#" + i).children(".description");
        slotTime.val(hourTasks[i]);
    }
}

loadTasks();