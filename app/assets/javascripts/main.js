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
  var tempScores = new Array();
  $.getJSON("/high_scores.json", function(scores){
    $.each(scores, function(index, highscore){
      console.log(highscore.score);
      console.log(highscore.name);
      tempScores.push([value.score, value.name]);
      $('div#highScores').html("");
      tempScores.sort(function(a,b){ return b[0] - a[0]; });
      for( var i=0; i<scores.length; i++) {
        $('div#highScores').append("<p>" + tempScores[i][0] + " " + tempScores[i][1] + "</p>");
      }
    };
  };
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
    
    sendScore();
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

function sendScore(){
  var name = prompt("Success!  Enter your name to submit your score!", "Name");
  $.ajax("/high_scores.json", {
    type: "POST",
    data:{ high_score : {
      score: guessesLeft,
      name: name
      }
    },
    error: function(errorData { console.log(errorData)}
  });
  
  console.log({
    score: guessesLeft,
    name: name
  });
}
