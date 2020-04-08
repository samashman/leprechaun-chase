var Elves = ['top-right', 'bottom-right', 'top-left', 'bottom-left'];
var gamePattern = [];
var userClickedPattern = [];
var level = 0;
var started = false;
var goldRequirement = 10;

$(document).on('keydown', function() {
  if (!started) {
    nextSequence();
    started = true;
  }
});
$()

$('.btn').on('click', function() {
  let userChosenElf = $(this).attr('id');
  userClickedPattern.push(userChosenElf);
  animatePress(userChosenElf);
  checkAnswer(userClickedPattern.length - 1);
});


function nextSequence() {
  userClickedPattern = [];
  level++;
  $('h1').text("Level " + level);

  if (level === goldRequirement) {
    findGold();
  }

  let randomNumber = Math.floor(Math.random() * 4);
  let randomChosenElf = Elves[randomNumber];

  if (level === goldRequirement) {
    setTimeout(function() {
      $("#" + randomChosenElf).fadeIn(100).fadeOut(100).fadeIn(100);
      playSound(randomChosenElf);
    }, 3000);
  } else {
    $("#" + randomChosenElf).fadeIn(100).fadeOut(100).fadeIn(100);
    playSound(randomChosenElf);
  }
  gamePattern.push(randomChosenElf);
}

function findGold() {
  $('body').addClass('found-gold');
  $('h1').prepend("<img src=\"img/gold.png\" class=\"gold\" alt=\"gold\">");
  $('h1').append("<img src=\"img/gold.png\" class=\"gold\" alt=\"gold\">");
  for (let i = 0; i < 50; i++) {
    $(".gold").fadeIn(200).fadeOut(200).fadeIn(200);
  }
  $('.instructions').text('You got the gold! Keep going!');
  playSound('foundGold');
}

function playSound(name) {
  let audio = new Audio("sounds/" + name + ".mp3");
  audio.play();
}

function checkAnswer(answerIndex) {
  if (userClickedPattern[answerIndex] === gamePattern[answerIndex]) {
    playSound('correct');
    if (answerIndex === gamePattern.length - 1) {
      setTimeout(function() {
        nextSequence();
      }, 1000);
    }
  } else {
    playSound("wrong");

    $('body').addClass('game-over');

    setTimeout(function() {
      $('body').removeClass('game-over');
    }, 200);
    $('body').removeClass('found-gold');
    $('h1').text("Too bad, so sad! Press any key to restart");
    $('.gold').remove();
    startOver();
  }
}

function animatePress(currentElf) {
  $("#" + currentElf).addClass("pressed");
  setTimeout(function() {
    $("#" + currentElf).removeClass("pressed")
  }, 100);
}

function startOver() {
  gamePattern = [];
  userClickedPattern = [];
  level = 0;
  started = false;
}
