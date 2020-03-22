//////////////////////////////////////////////////////////Data/////////////////////////////////////////////////////////////////////
var time;
var minutes;
var seconds;
var questions = [];
var timer;
var uiTime;
var currentQ = 0;
questions[0] = {
    qText: "What is a variable?",
    qAnswers: ["A function whose outcome is unpredictable.", "A named memory location whose value can change throughout execution.",
        "A named memory location whose value cannot change.", "An error or bug that shows up for various reasons."],
    qRightAnswer: 1 // the index number of the correct answer
}

/////////////////////////////////////////////////////initialize game/////////////////////////////////////////////////////////////////

function initializeGame() {
    time = 75; //time in seconds
    minutes = String(Math.floor(time / 60)); //calculate minutes by dividing seconds by 60 and rounding down
    seconds = (time % 60); //calculate seconds but using modulus to find the remainder
    if (seconds < 10) { //if seconds is less than 10, add an extra zero in front of the number
        seconds = "0" + String(seconds);
    }
    else { //otherwise, just make it a string
        String(seconds);
    }
    uiTime = minutes + ":" + seconds; //concatenate minutes and seconds strings
    $("#timer").text(uiTime); //display the uiTime string to the user
}


///////////////////////////////////////////////function to be called by setInterval to update timer///////////////////////////////
var updateTime = function () {
    time--; //subtract one second from the total time
    minutes = String(Math.floor(time / 60)); //calculate minutes and make it a string
    seconds = (time % 60); //calculate seconds by using %
    if (seconds < 10) { //if seconds is less than 10, add an extra zero to the start of the string
        seconds = "0" + String(seconds);
    }
    else { //otherwise just make it a string
        String(seconds);
    }
    uiTime = minutes + ":" + seconds; //concatenate the minutes and seconds strings
    $("#timer").text(uiTime); //display it to the user
    if (time === 0) clearInterval(timer); //if time has run out, stop counting down
}
////////////////////////////////////////////////////function to load questions///////////////////////////////////////////////////////////
function loadQuestion() {
    var newQuestion = $("<h3>");
    newQuestion.text(questions[currentQ].qText);
    $("#headerAndQText").append(newQuestion);
    for (let i = 0; i < questions[currentQ].qAnswers.length; i++) {
        const answer = $("<button>");
        var lineBreak = $("<br>");

        answer.attr("type", "button")
        answer.attr("class", "btn btn-primary");
        answer.css("margin", "10px");
        answer.text(questions[currentQ].qAnswers[i]);
        if (i === questions[currentQ].qRightAnswer) {
            answer.attr("data-eval", "correct");
        }
        else {
            answer.attr("data-eval", "incorrect");
        }
        $("#buttonsDiv").append(answer);
        $("#buttonsDiv").append(lineBreak);
    }
    currentQ++;
}

////////////////////////////////////////////////////On Click Function Calls//////////////////////////////////////////////////////////////////////
$("#startBtn").on("click", function () {
    $("#headerAndQText").empty();
    $("#introAndFormText").empty();
    $("#buttonsDiv").empty();
    initializeGame();
    timer = setInterval(updateTime, 1000);
    loadQuestion();
})
