$(document).ready(function () {
    //////////////////////////////////////////////////////////Data/////////////////////////////////////////////////////////////////////
    var time;
    var minutes;
    var seconds;
    var questions = [];
    var timer;
    var uiTime;
    var currentQ = 0;
    var myScore;
    var myRank;
    var highScores = JSON.parse(localStorage.getItem("hsArr"));
    var highScoreNames = JSON.parse(localStorage.getItem("hsnArr"));
    var askedQuestions = [];
    //if local storage data doesn't exist, make up some names and scores.
    if (!highScores) {
        highScoreNames = ["Anne", "Jerry", "Mary", "Tom", "Jo", "Mike", "Jake", "Zack", "Matt", "Steve"];
        highScores = [70, 65, 60, 55, 50, 45, 40, 35, 30, 25];
    }

    ////////////////////////////////////////////////Question Bank////////////////////////////////////////////////
    questions[0] = {
        qText: "What is a variable?",
        qAnswers: ["A function whose outcome is unpredictable.", "A named memory location whose value can change throughout execution.",
            "A named memory location whose value cannot change.", "An error or bug that shows up for various reasons."],
        qRightAnswer: 1 // the index number of the correct answer
    }
    questions[1] = {
        qText: "True or false: In a strongly typed language, a Boolean variable can store a string.",
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
    questions[5] = {
        qText: "Which type of loop will execute at least once even if the condition is initially false?",
        qAnswers: ["do-while", "while", "for"],
        qRightAnswer: 0 // the index number of the correct answer
    }
    questions[6] = {
        qText: "Which of these is not one of the three primary languages used in web development?",
        qAnswers: ["javaScript", "HTML", "CSS", "Fortran"],
        qRightAnswer: 3 // the index number of the correct answer
    }
    questions[7] = {
        qText: "What is the correct syntax for creating a new HTML element using jQuery?",
        qAnswers: ["$<\"(p)>\"", "$(<div>)", "$(\"<section>\")", "$(\"a\")"],
        qRightAnswer: 2 // the index number of the correct answer
    }
    questions[8] = {
        qText: "How do you select an element by ID in CSS?",
        qAnswers: ["#elementID {", ".elementID {", "id=element {", "elementID {"],
        qRightAnswer: 0 // the index number of the correct answer
    }
    questions[9] = {
        qText: "True or False: an object an contain a function as one of its properties:",
        qAnswers: ["True", "False"],
        qRightAnswer: 0 // the index number of the correct answer
    }
    /////////////////////////////////////////////////////initialize game/////////////////////////////////////////////////////////////////

    function initializeGame() {
        //empty starting text and buttons
        $("#headerAndQText").empty();
        $("#introAndFormText").empty();
        $("#buttonsDiv").empty();
        myScore = 0; //reset the score
        myRank = 10; //reset your rank
        time = 75; //time in seconds
        currentQ = 0;
        askedQuestions = [];
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
        timer = setInterval(updateTime, 1000);
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
        if (time <= 10) $("#timer").css("color", "red");
        if (time === 0) {
            clearInterval(timer); //if time has run out, stop counting down
            $("#headerAndQText").empty();
            $("#introAndFormText").empty();
            $("#buttonsDiv").empty();
            $("#headerAndQText").text("Sorry, the timer has run out.");
            $("#introAndFormText").text("Please try again.");
            var tryAgain = $("<a>");
            $(tryAgain).addClass("btn btn-primary");
            $(tryAgain).attr("href", "index.html");
            $(tryAgain).attr("role", "button");
            $(tryAgain).text("Try Again");
            $("#buttonsDiv").append(tryAgain);
            var hsButton = $("<a>");
            $(hsButton).addClass("btn btn-primary");
            $(hsButton).attr("href", "highScores.html");
            $(hsButton).attr("role", "button");
            $(hsButton).css("margin-left", "5px");
            $(hsButton).text("View High Scores");
            $("#buttonsDiv").append(hsButton);
        }
    }
    ////////////////////////////////////////////////////function to load questions///////////////////////////////////////////////////////////
    function loadQuestion() {
        var newQuestion = $("<h3>");
        var randQ;
        do {
            randQ = Math.floor(Math.random() * questions.length);
        } while (askedQuestions.includes(randQ))
        askedQuestions[currentQ] = randQ;

        newQuestion.text(questions[randQ].qText);
        $("#headerAndQText").append(newQuestion);
        for (let i = 0; i < questions[randQ].qAnswers.length; i++) {
            const answer = $("<button>");
            var lineBreak = $("<br>");

            answer.attr("type", "button");
            answer.attr("class", "btn btn-primary");
            answer.css("margin", "10px");
            answer.attr("data-type", "ansBtn");
            answer.text(questions[randQ].qAnswers[i]);
            if (i === questions[randQ].qRightAnswer) {
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
    ////////////////////////////////////////////////////Load Name Input Form/////////////////////////////////////////////////////////////////////////
    var loadInputForm = function () {
        //empty the current text
        $("#headerAndQText").empty();
        $("#buttonsDiv").empty();

        //add a new message in the header
        var newMessage = $("<h3>");
        $(newMessage).text("Congratulations, you scored " + myScore + " points!");
        $("#headerAndQText").append(newMessage);

        //create a form
        var newForm = $("<form>");
        $("#introAndFormText").append(newForm);

        //create a div within the form
        var newFormDiv = $("<div>");
        $(newFormDiv).addClass("form-group");
        $(newForm).append(newFormDiv);

        //create a label within the div
        var newFormLabel = $("<label>");
        $(newFormLabel).attr("for", "nameInput");
        $(newFormLabel).text("Please enter your name.")
        $(newFormDiv).append(newFormLabel);

        //create a form in within the div
        var newFormInput = $("<input>");
        $(newFormInput).addClass("form-control");
        $(newFormInput).attr("type", "text");
        $(newFormInput).attr("placeholder", "your name");
        $(newFormInput).attr("id", "nameInputBox");
        $(newFormDiv).append(newFormInput);

        //create the submit button
        //<button type="submit" class="btn btn-primary">Submit</button>
        var newFormButton = $("<button>");
        $(newFormButton).addClass("btn btn-primary");
        $(newFormButton).attr("type", "submit");
        $(newFormButton).text("Submit");
        $(newFormButton).attr("id", "nameSubmitBtn");
        $(newFormButton).css("margin-top", "15px");
        $(newFormDiv).append(newFormButton);

    }
    // Check to see if the user score a high score
    function checkHighScores(score) {
        for (let i = 0; i < highScores.length; i++) { //start at the beginning of the high scores array
            if (score > highScores[i]) { //evaluate the user's score against each of the high scores, if it is higher
                myRank = i;
                highScores.splice(i, 0, score); //splice the user's score into the high scores
                highScoreNames.splice(i, 0, "Placeholder"); // splice a placeholder tag 
                highScores.pop();
                highScoreNames.pop();
                return;
            }
        }
    }
    ////////////////////////////////////////////////////On Click Function Calls//////////////////////////////////////////////////////////////////////
    $("#startBtn").on("click", function () {

        initializeGame();
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
                evalText.text("Incorrect. Time - 10.");
                evalText.css("color", "red");
                time -= 10;
                if (time < 0) time = 0;
                //immediately update UI timer display
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
                if (time <= 10) $("#timer").css("color", "red"); //if there are 10 seconds or less remaining, the timer text color will be red
                //when the time runs out, stop the timer, clear the currently display, and display a message.
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
            if (currentQ < 5 && time > 0) {
                //immediately clear the current question
                $("#headerAndQText").empty();
                $("#buttonsDiv").empty();
                loadQuestion();
            }
            else if (time > 0) {
                myScore = time;
                clearInterval(timer);
                checkHighScores(myScore); //check the user's score and assign them a rank
                if (myRank <= 9) { //if the rank is within the top 10, load the name input page
                    var delayTimer = setTimeout(loadInputForm, 500);
                    console.log(highScores);
                    console.log(highScoreNames);
                }
                else { //if it is not a top score...
                    $("#headerAndQText").empty(); //empty all current text
                    $("#buttonsDiv").empty();
                    $("#headerAndQText").text("You scored " + myScore + " points."); //inform the user of their score
                    $("#introAndFormText").text("Sorry, that is not a high score.");
                    var tryAgain = $("<a>"); // create try again and high score buttons that direct the user to the quiz and high score pages
                    $(tryAgain).addClass("btn btn-primary");
                    $(tryAgain).attr("href", "index.html");
                    $(tryAgain).attr("role", "button");
                    $(tryAgain).text("Try Again");
                    $("#buttonsDiv").append(tryAgain);

                    var hsButton = $("<a>");
                    $(hsButton).addClass("btn btn-primary");
                    $(hsButton).attr("href", "highScores.html");
                    $(hsButton).attr("role", "button");
                    $(hsButton).css("margin-left", "5px");
                    $(hsButton).text("View High Scores");
                    $("#buttonsDiv").append(hsButton);
                }
            }
            else {
                //if time has run out, stop counting down
                clearInterval(timer); //clear the timer
                $("#headerAndQText").empty(); //clear all current text
                $("#introAndFormText").empty();
                $("#buttonsDiv").empty();
                $("#headerAndQText").text("Sorry, the timer has run out."); //inform the user that time has run out
                $("#introAndFormText").text("Please try again.");
                var tryAgain = $("<a>"); //create two buttons that direct the user to the quiz and high scores pages respectively
                $(tryAgain).addClass("btn btn-primary");
                $(tryAgain).attr("href", "index.html");
                $(tryAgain).attr("role", "button");
                $(tryAgain).text("Try Again");
                $("#buttonsDiv").append(tryAgain);
                var hsButton = $("<a>");
                $(hsButton).addClass("btn btn-primary");
                $(hsButton).attr("href", "highScores.html");
                $(hsButton).attr("role", "button");
                $(hsButton).css("margin-left", "5px");
                $(hsButton).text("View High Scores");
                $("#buttonsDiv").append(hsButton);
            }

        }
    })

    //This handles the name submission button when the user earns a high score.
    $("#introAndFormText").on("click", function (event) {
        event.preventDefault(); //prevents the page from refreshing
        var element = event.target; //get the target of the click
        if ($(element).attr("id") === "nameSubmitBtn") { //if the target is the name submit button
            if ($("#nameInputBox").val()) { //if the user has any entered characters
                highScoreNames[myRank] = $("#nameInputBox").val(); //replace the "Placeholder" string created earlier with the user input
                localStorage.setItem("hsArr", JSON.stringify(highScores)); //convert the highScores array to a string and save it to storage
                localStorage.setItem("hsnArr", JSON.stringify(highScoreNames)); //convert the highScoreNames array to a string and save it to storage
                location.href = "highScores.html"; //redirect the user to the high scores page
            }
        }
    })
})