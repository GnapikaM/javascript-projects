var buttonColours = ["red", "green", "yellow", "blue"];
var gamePattern = []; 

var userClickedPattern = [];

var level = 0;

var started = false;

let score = 0;

const correctBonus = 1;

let highestScore = localStorage.getItem('highestScore') || 0;

$(".input").click(function() {
    if(!started) {
        $(".input").text("RESTART");
        nextSequence();
        started = true;
    }
    else {
        restartGame();
        nextSequence();
    }
});

function nextSequence() {
    userClickedPattern = [];

    level++;
    $("#level-title").text("Level " + level);

    var randomNumber = Math.floor(Math.random() * 4);
    var randomChosenColour = buttonColours[randomNumber];

    gamePattern.push(randomChosenColour);

    playSound(randomChosenColour);
    
    $("#" + randomChosenColour).fadeIn(100).fadeOut(100).fadeIn(100);
}

$(".btn").click(function() {
    var userChoosenColour = $(this).attr("id");
    userClickedPattern.push(userChoosenColour);

    playSound(userChoosenColour);
    animatePress(userChoosenColour);

    checkAnswer(userClickedPattern.length - 1);
})

let sequenceTimeout;

function checkAnswer(currentLevel) {
    if(gamePattern[currentLevel] == userClickedPattern[currentLevel]) {
        if(gamePattern.length == userClickedPattern.length) {
            if(userClickedPattern.length == level) {
                score += correctBonus;

                if(score >highestScore) {
                    highestScore = score;
                    localStorage.setItem('highestScore', highestScore);
                }

                $(".score").text("Score: " + score + " | Highest: " + highestScore);

                sequenceTimeout = setTimeout(function() {
                    nextSequence();
                    $(".input").click(function() {
                        score = 0;
                    })
                }, 1000);
            }
        }
    }
    else {
        playSound("wrong");
        clearTimeout(sequenceTimeout);

        $("body").addClass("game-over");
        setTimeout(function() {
            $("body").removeClass("game-over");
        }, 200);

        $("h1").text("Game Over");

        restartGame();
    }
}

function playSound(currentColor) {
    var audio = new Audio("sounds/" + currentColor + ".mp3");
    audio.play();   
}

function animatePress(currentColor) {
    $("#" + currentColor).addClass("pressed");

    setTimeout(function() {
        $("#" + currentColor).removeClass("pressed");
    }, 100);
}

function restartGame() {
    level = 0;
    gamePattern = [];
    started = false;
}
