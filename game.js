var gamePattern = [];

var userClickedPattern = [];

var buttonColours = ["red", "blue", "green", "yellow"];

var started = false;
var level = 0;

$(".btn").click(function(){
  var userChosenColour = $(this).attr("id");
  userClickedPattern.push(userChosenColour);
  console.log(userClickedPattern);
  playSound(userChosenColour);
  animatePress(userChosenColour);

  checkAnswer(userClickedPattern.length - 1);
});

// change keypress function to QQ-button
$(".QQbtn").click(function(){
  if (!started) {
    animatePress("QQbtn");
    $("#level-title").text("Level "+level);
    nextSequence();
    started = true;
  }
})

// $(document).keypress(function() {
//   if (!started) {
//     $("#level-title").text("Level "+level);
//     nextSequence();
//     started = true;
//   }
// });

function checkAnswer(currentLevel) {
  if (userClickedPattern[currentLevel] == gamePattern[currentLevel]) {
    console.log("success");
  }
  else {
    console.log("wrong");
    gameOver();
    startOver();
  }

  if (currentLevel+1 == level) {
    setTimeout(function(){
      nextSequence();
      userClickedPattern = [];
    }, 1000);
  }
}

function nextSequence() {
  level += 1;
  $("#level-title").text("Level "+level);

  var randomNumber = Math.floor(Math.random() * 4);
  var randomChosenColour = buttonColours[randomNumber];
  gamePattern.push(randomChosenColour);

  $("#"+randomChosenColour).fadeOut(100).fadeIn(100);

  playSound(randomChosenColour);
}

function gameOver() {
  playSound("wrong");
  $("body").addClass("game-over");
  setTimeout(function(){
    $("body").removeClass("game-over");
  }, 200);
  $("#level-title").text("Game Over, Press QQ to Restart");
}

function startOver() {
  level = 0;
  gamePattern = [];
  userClickedPattern = [];
  started = false;
}

function playSound(name) {
  var audio = new Audio("sounds/"+name+".mp3");
  audio.play();
}

function animatePress(currentColour) {
  $("#"+currentColour).addClass("pressed");
  setTimeout(function(){
    $("#"+currentColour).removeClass("pressed");
  }, 100);
}
