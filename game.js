var gamePattern = [];
var userClickedPattern = [];
var buttonColours = ["red", "blue", "green", "yellow"];
var level = 0;
var started = false;
var score = 0;

// Button Click Handler
$(".btn").click(handler);

// Start Button Click
$("#start-btn").click(function () {
  if (!started) {
    started = true;
    score = 0;
    updateScore();
    $("h1").text("Level " + level);
    $("#start-btn").addClass("hidden");
    $("#reset-btn").removeClass("hidden");
    $("#score-container").removeClass("hidden");
    nextSequence();
  }
});

// Reset Button Click
$("#reset-btn").click(function () {
  startOver();
  $("h1").text("Game Over, Press Start to Play Again!");
  $("#reset-btn").addClass("hidden");
  $("#start-btn").removeClass("hidden");
});

// Check Answer
function checkAnswer(currentLevel) {
  if (userClickedPattern[currentLevel] === gamePattern[currentLevel]) {
    if (userClickedPattern.length === gamePattern.length) {
      score++;
      updateScore();
      setTimeout(function () {
        nextSequence();
      }, 1000);
    }
  } else {
    playSound("wrong");
    $("body").addClass("game-over");
    setTimeout(function () {
      $("body").removeClass("game-over");
      $("h1").text("Game Over, Press Restart Game to Try Again!");
    }, 200);
    startOver();
  }
}

// Next Sequence
function nextSequence() {
  userClickedPattern = [];
  level++;
  $("h1").text("Level " + level);
  var randomNumber = Math.floor(Math.random() * 4);
  var randomChosenColour = buttonColours[randomNumber];
  gamePattern.push(randomChosenColour);
  $("#" + randomChosenColour).fadeIn(100).fadeOut(100).fadeIn(100);
  playSound(randomChosenColour);
}

// Button Click Handler
function handler() {
  var userChosenChoice = $(this).attr("id");
  userClickedPattern.push(userChosenChoice);
  playSound(userChosenChoice);
  animatePress(userChosenChoice);
  checkAnswer(userClickedPattern.length - 1);
}

// Update Score
function updateScore() {
  $("#score").text("Score: " + score);
}

// Start Over
function startOver() {
  level = 0;
  gamePattern = [];
  started = false;
}

// Play Sound
function playSound(name) {
  var audio = new Audio("sounds/" + name + ".mp3");
  audio.play();
}

// Animate Button Press
function animatePress(currentColour) {
  $("#" + currentColour).addClass("pressed");
  setTimeout(function () {
    $("#" + currentColour).removeClass("pressed");
  }, 100);
}
