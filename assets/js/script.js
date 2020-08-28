var hourTasks = JSON.parse(localStorage.getItem("Task")) || [];

var currentDay = moment().format("[Today is] dddd [the] Do [of] MMMM, YYYY");
$("#currentDay").text(currentDay);

var checkTime = setInterval(function() {
    if ((moment().format("[Today is] dddd [the] Do [of] MMMM, YYYY")) !== currentDay) {
        currentDay = moment().format("[Today is] dddd [the] Do [of] MMMM, YYYY");
        $("#currentDay").text(currentDay);
    }
},  1000 * 60 * 10);



$(".saveBtn").on("click", function () {
    var content = $(this).closest(".time-block").children("textarea").val();
    console.log(content);
    var index = $(this).closest(".time-block").attr("data-id");
    console.log(index);
    hourTasks[index] = content;
    
    localStorage.setItem("tasks", JSON.stringify(hourTasks));
});


var loadTasks = function() {
    for (let i = 0; i < hourTasks.length; i++) {
        if (hourTasks[i]) {
           var value = $(`textarea[data-id="${i}"]`).val(hourTasks[i]);
           console.log(value);
        }
    }
}

loadTasks();