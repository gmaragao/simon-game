let userClickedPattern = new Array();
let gamePattern = new Array();
let buttonColors = ["red", "blue", "green", "yellow"];
let randomColor;
let level = 0;
let start = false;
let done = false;
let errou = false;

function blinkLoop(i) {
  setTimeout(function() {
    const buttonColor = gamePattern[i];
    $(`#${buttonColor}`)
      .fadeOut(300)
      .fadeIn(300);
    let som = randomColor;
    playAudio(som);
    i++;
    if (i < gamePattern.length) {
      blinkLoop();
    }
  }, 5000);
}

function nextSequence(level) {
  for (let i = 0; i < level + 1; i++) {
    let randomNumber = Math.random() * 4;
    randomNumber = Math.trunc(randomNumber);
    $("h1").html(`Level ${level}`);
    randomColor = randomChosenColor(randomNumber, buttonColors);
    gamePattern.push(randomColor);
  }
  let i = 0;
  blinkLoop(i);

  return gamePattern;
}

function randomChosenColor(number, color) {
  switch (number) {
    case 1:
      return color[number];
    case 2:
      return color[number];
    case 3:
      return color[number];
    default:
      break;
  }
}

function playAudio(audio) {
  let audioB = new Audio();
  let audioR = new Audio();
  let audioY = new Audio();
  let audioG = new Audio();
  let audioW = new Audio();

  audioB.src = "sounds/blue.mp3";
  audioG.src = "sounds/green.mp3";
  audioR.src = "sounds/red.mp3";
  audioY.src = "sounds/yellow.mp3";
  audioW.src = "sounds/wrong.mp3";

  switch (audio) {
    case "yellow":
      audioY.play();
      break;
    case "blue":
      audioB.play();
      break;
    case "green":
      audioG.play();
      break;
    case "red":
      audioR.play();
      break;
    default:
      break;
  }
}

function checkAnswer(currentLevel, gamePattern) {
  if (currentLevel.pop() === gamePattern.shift()) {
    console.log("comparou");
    console.log("certo");
    return false;
  } else {
    console.log("errou");

    return true;
  }
}

function animatePress(currentColor) {
  $(`#${currentColor}`).addClass("pressed");
  setTimeout(function() {
    $(`#${currentColor}`).removeClass("pressed");
  }, 100);
}

$(document).on("keypress", function() {
  let game = nextSequence(level);
  playGame(game);
});

function playGame() {
  handleLevel(gamePattern);
}

function handleLevel(gamePattern) {
  $(".btn").click(function() {
    let userChosenColor = $(this).attr("id");
    userClickedPattern.push(userChosenColor);
    console.log(userClickedPattern);
    playAudio(userChosenColor);
    animatePress(userChosenColor);
    errou = checkAnswer(userClickedPattern, gamePattern);
    console.log(gamePattern.length);
    if (gamePattern.length == 0) {
      console.log("acabou");
      console.log(level);
      level++;
      console.log(level);
      nextSequence(level);
    }
    if (errou) {
      alert("FIM DE JOGO!");
    }
  });
}

// handlingStart(start);

//todas as vezes que o usuario clicar = compara
//comparar até o ultimo da ordem ou caso haja erro
