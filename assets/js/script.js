var currentDay = moment().format("[Today is] dddd [the] Do [of] MMMM, YYYY");
$("#currentDay").text(currentDay);
var checkDay = setInterval(function() {
    if ((moment().format("[Today is] dddd [the] Do [of] MMMM, YYYY")) !== currentDay) {
        currentDay = moment().format("[Today is] dddd [the] Do [of] MMMM, YYYY");
        $("#currentDay").text(currentDay);
    }
},  1000 * 60 * 10);