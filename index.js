//Header-styling
$('header').addClass('bigHeading');

function nextSequence() {
  return Math.floor(Math.random() * 4);
}
var color = ['red', 'blue', 'green', 'yellow'];

$('button').each(function(index, ele) {
  $(this).addClass(color[index]);
  // $('.'+color[index]).css('background-color', color[index]);
})

var gamePattern = [];
var level = 0;
$(document).keypress(() => {
    let now = nextSequence();
    $('.' + color[now]).fadeOut(100).fadeIn(100).fadeOut(100).fadeIn(100);
    gamePattern.push(color[now]);
    level++;
    $('header').text("level "+level);
});

function animation(currentColor) {
    $("."+currentColor).addClass('pressed');

    setTimeout(() => {
        $("."+currentColor).removeClass('pressed')
    },90);
}

function wrong() {

  $('body').css("background-color", "#D22779");

  setTimeout(() => {
      $('body').css("background-color", "#0E185F");
  },200);
}

var userClickedPattern = [];
var ind = 0;
$('button').click(function() {
  let now = this.className;
  userClickedPattern.push(now);
  animation(now);

  if(gamePattern[ind] == userClickedPattern.pop()) {
    new Audio("sounds/" + now  + ".mp3").play();
    ind++;
    if(ind == level) {
      ind = 0;
      let now = nextSequence();
      setTimeout(() => {
        $('.' + color[now]).fadeOut(100).fadeIn(100).fadeOut(100).fadeIn(100);
        gamePattern.push(color[now]);
        level++;
        $('header').text("level "+level);
      }, 600);
    }
  }
  else {
    new Audio("sounds/wrong.mp3").play();
    wrong();
    ind = 0;
    level = 0;
    gamePattern = [];
    $('header').text("Game Over, Press Any Key to Restart");
  }
})
