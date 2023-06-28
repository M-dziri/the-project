var buttonColours = ["red", "blue", "green", "yellow"];

var   gamePattern = [];

var userClickedPattern= [];
var level = 0;
var start=false;

$(document).keypress(function(event){
  if((event.key==="a")&&(!start)){
    nextSequence();
    start = true;

  }

})

$(".btn").click(function(event){
  var userChosenColour = event.target.id;
  userClickedPattern.push(userChosenColour);
  console.log(userClickedPattern);
  
  playSound(userChosenColour);
  animatePress(userChosenColour);
  
  checkAnswer(userClickedPattern.length-1);

})

function nextSequence() {
  userClickedPattern=[];
  level=level+1;
  $("#level-title").text("level "+level);
  var randomNumber = Math.floor(Math.random() * 4);
  var randomChosenColour = buttonColours[randomNumber];
  gamePattern.push(randomChosenColour);

  $("#" + randomChosenColour).fadeIn(100).fadeOut(100).fadeIn(100);
  playSound(randomChosenColour);
}


  function playSound(name) {
    var audio = new Audio("sounds/" + name + ".mp3");
    audio.play();
  }

  function animatePress(currentColour){
    $("#"+currentColour).addClass("pressed");
    setTimeout(function () {
    $("#" + currentColour).removeClass("pressed");
    }, 100);
    
  }

  function checkAnswer(currentLevel){
    if(userClickedPattern[currentLevel]===gamePattern[currentLevel]){
      console.log("succes");
      
      if (userClickedPattern.length-1===gamePattern.length-1) {
        setTimeout(function(){
          nextSequence();
        },1000);
      }
    }
    else{
      playSound('wrong');
      $("body").addClass("game-over");
      setTimeout(function () {
      $("body").removeClass("game-over");
      }, 200);
      $("#level-title").text("Game Over, Press Any Key to Restart");
      $(document).keypress(function(){
        level=0;
        gamePattern=[];
        setTimeout(function(){
          nextSequence();
        },400)
        
      })
    }

  }


