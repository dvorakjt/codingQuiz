
//////////////////////////////////////////////////////////Data/////////////////////////////////////////////////////////////////////
var time;
var minutes;
var seconds;
var questions = [];
var timer;
var uiTime;
var currentQ = 0;
/////////////////////////////////////////////////Question Bank////////////////////////////////////////////////
questions[0] = {
    qText: "What is a variable?",
    qAnswers: ["A function whose outcome is unpredictable.", "A named memory location whose value can change throughout execution.",
        "A named memory location whose value cannot change.", "An error or bug that shows up for various reasons."],
    qRightAnswer: 1 // the index number of the correct answer
}
questions[1] = {
    qText: "True or false: a Boolean variable can store an integer.",
    qAnswers: ["True", "False"],
    qRightAnswer: 1 // the index number of the correct answer
}
questions[2] = {
    qText: "In the statement \"for(let i=0; i < 10; i++) {\", which expression represents the initialization?",
    qAnswers: ["for", "i < 10;", "i++", "let i=0;"],
    qRightAnswer: 3 // the index number of the correct answer
}
questions[3] = {
    qText: "In the statement \"for(let i=0; i < 10; i++) {\", which expression represents the iteration?",
    qAnswers: ["for", "i < 10;", "i++", "let i=0;"],
    qRightAnswer: 2 // the index number of the correct answer
}
questions[4] = {
    qText: "In the statement \"for(let i=0; i < 10; i++) {\", which expression represents the condition?",
    qAnswers: ["for", "i < 10;", "i++", "let i=0;"],
    qRightAnswer: 1 // the index number of the correct answer
}
// questions[5] = {
//     qText: "Which type of loop will execute at least once even if the condition is initially false?",
//     qAnswers: ["do-while", "while", "for"],
//     qRightAnswer: 0 // the index number of the correct answer
// }
// questions[6] = {
//     qText: "Which of these is not one of the three primary languages used in web development?",
//     qAnswers: ["javaScript", "Fortran", "CSS", "HTML"],
//     qRightAnswer: 1 // the index number of the correct answer
// }

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

        answer.attr("type", "button");
        answer.attr("class", "btn btn-primary");
        answer.css("margin", "10px");
        answer.attr("data-type", "ansBtn");
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

$("#buttonsDiv").on("click", function (event) {
    var element = event.target;
    if ($(element).attr("data-type") === "ansBtn") {
        var ansEval = $(element).attr("data-eval");
        var evalText = $("<p>");
        if (ansEval === "correct") {
            evalText.text("Correct!");
            evalText.css("color", "green");
        }
        else {
            evalText.text("Incorrect.");
            evalText.css("color", "red");
        }
        //clear the eval div if there is still text there
        $("#evalDiv").empty();
        //append correct or incorrect to the eval div
        $("#evalDiv").append(evalText);
        //clear the text after 750 milliseconds
        var evalTimer = setTimeout(function () {
            $("#evalDiv").empty();
            clearTimeout(evalTimer);
        }, 750);
        //clear the current question
        $("#headerAndQText").empty();
        $("#buttonsDiv").empty();
        if (currentQ < 5) {
            loadQuestion();
        }

    }
    // if (elementID === "correct") alert("you are correct!");
    // else alert("you are wrong");
})