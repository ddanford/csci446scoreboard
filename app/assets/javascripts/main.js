var guessesLeft = 10;
var highScores = new Array([9, "HarryJamesPotter"], [3, "ZedCthulhu"], [2, "NearlyDied"]);
var myNumber = Math.floor(Math.random()*100+1);

$(function() {
  updateScore(guessesLeft);
  populateHighScores(highScores);
  $("div.high").hide();
  $("div.low").hide();
});

function populateHighScores(scores) {
  $('div#highScores').html("");
  for (var i = 0; i < scores.length; ++i) {
    $('div#highScores').append("<p>" + scores[i][0] + " " + scores[i][1] + "</p>");
  }
}

function updateScore(score) {
  $('h2#score span#guessesLeft').html(score);
}

function checkGuess() {
  var guess = document.getElementById("guess").value;
  if ( guess < myNumber ) 
  {
    $("div.high").hide();
    $("div.low").show();
    guessesLeft = guessesLeft - 1;
    updateScore(guessesLeft);
  }
  else if ( guess > myNumber ) 
  {
    $("div.low").hide();
    $("div.high").show();
    guessesLeft = guessesLeft - 1;
    updateScore(guessesLeft);
  }
  else 
  {
    $("div.high").hide();
    $("div.low").hide();
    var name = prompt("Success!  Enter your name to submit your score!", "Name");
    highScores.push([guessesLeft, name]);
    populateHighScores(highScores);
    myNumber = Math.floor(Math.random()*100+1);
    guessesLeft = 10;
    updateScore(guessesLeft);
  }
  if(guessesLeft == 0){
    alert("You lose!  Play Again!");
    myNumber = Math.floor(Math.random()*100+1);
    guessesLeft = 10;
    updateScore(guessesLeft);    
  }
}