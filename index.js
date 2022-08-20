//Header-styling
$('header').addClass('bigHeading');

function nextSequence() {
  return Math.floor(Math.random() * 4);
}
var color = ['red', 'blue', 'green', 'yellow'];

$('.btn').each(function(index, ele) {
  $(this).addClass(color[index]);
  $('.'+color[index]).css('background-color', color[index]);
})

//match-starter
var begins = false;
//match-starter

var gamePattern = [];
var level = 0;
$(document).keypress(() => {
    if(!begins) {
      let now = nextSequence();
      $('.' + color[now]).fadeOut(100).fadeIn(100).fadeOut(100).fadeIn(100);
      gamePattern.push(color[now]);
      level++;
      $('header').text("level "+level);
      begins = true;
    }
});

//mobile-friendly
var mobile = false;
$('.top-btn').click(() => {
    if(!begins) {
      mobile = true;
      let now = nextSequence();
      $('.' + color[now]).fadeOut(100).fadeIn(100).fadeOut(100).fadeIn(100);
      gamePattern.push(color[now]);
      level++;
      $('.top-btn').text("level "+level);
      begins = true;
    }
});
//mobile-friendly


function animation(currentColor) {
    $("."+currentColor).addClass('pressed');

    setTimeout(() => {
        $("."+currentColor).removeClass('pressed')
    },100);
}

function wrong() {

  $('body').css("background-color", "#D22779");

  setTimeout(() => {
      $('body').css("background-color", "#0E185F");
  },200);
}

var userClickedPattern = [];
var ind = 0;
$('.btn').click(function() {
  let now = this.className.split(/\s+/)[1];
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
        if(mobile) {
          $('.top-btn').text("level "+level);
        }
        else {
          $('header').text("level "+level);
        }
      }, 400);
    }
  }
  else {
    new Audio("sounds/wrong.mp3").play();
    wrong();
    begins = false;
    ind = 0;
    level = 0;
    gamePattern = [];
    if(mobile) {
      $('.top-btn').css('background-color', 'white');
      $('.top-btn').text("GAME OVER");
      $('.top-btn').css('color', '#F900BF');
      setTimeout(()=>{
        $('.top-btn').css('background-color', '#F900BF');
        $('.top-btn').text("RESTART");
        $('.top-btn').css('color', 'black');
      }, 900);
    }
    else {
      $('header').text("Game Over, Press Any Key to Restart");
    }
  }
})
