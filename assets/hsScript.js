var highScores = JSON.parse(localStorage.getItem("hsArr"));
var highScoreNames = JSON.parse(localStorage.getItem("hsnArr"));
//if local storage data doesn't exist, make up some names and scores.
if (!highScores) {
    highScoreNames = ["Anne", "Jerry", "Mary", "Tom", "Jo", "Mike", "Jake", "Zack", "Matt", "Steve"];
    highScores = [70, 65, 60, 55, 50, 45, 40, 35, 30, 25];
}
for (let i = 0; i < 10; i++) {
    var newRow = $("<div>");
    $(newRow).addClass("row");
    $(".container").append(newRow);

    var newCol1 = $("<div>");
    $(newCol1).addClass("col-md-4");
    $(newRow).append(newCol1);

    var newCol2 = $("<div>");
    $(newCol2).addClass("col-md-2");
    $(newRow).append(newCol2);

    var newCol3 = $("<div>");
    $(newCol3).addClass("col-md-2");
    $(newRow).append(newCol3);

    var newCol4 = $("<div>");
    $(newCol4).addClass("col-md-4");
    $(newRow).append(newCol4);

    var newP1 = $("<p>");
    $(newP1).text(highScoreNames[i]);
    $(newCol2).append(newP1);

    var newP2 = $("<p>");
    $(newP2).text(highScores[i]);
    $(newCol3).append(newP2);
}