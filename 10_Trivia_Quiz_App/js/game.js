const question = document.getElementById("question");
const choices = Array.from(document.getElementsByClassName("choice-text"));
const questionCounterText = document.getElementById("questionCounter");
const scoreText = document.getElementById("score");
const finalScore = document.getElementById("finalScore");
const endTestBtn = document.querySelector(".end-test");

let questions = [];
let availableQuestions = [];
let score = 0;
let questionCounter = 0;
let currentQuestion = {};
let acceptingAnswers = false;

const maxQuestions = 10;
const correctBonus = 10;

const countdownElement = document.getElementById('countdown');
const timerDurationInMinutes = 1;
const timerDurationInSeconds = timerDurationInMinutes * 60;

let timeLeft = timerDurationInSeconds;

function formatTime(seconds) {
    const minutes = Math.floor(seconds / 60);
    const remainingSeconds = seconds % 60;
    return `${minutes}:${remainingSeconds < 10 ? '0' : ''}${remainingSeconds}`;
}

function updateTimer() {
    countdownElement.textContent = formatTime(timeLeft);
    if(timeLeft === 0) {
        endTestDueToTime();
    }
    else {
        timeLeft--;
        setTimeout(updateTimer, 1000);
    }
}

// Function to fetch trivia questions from the API
async function fetchTriviaQuestions() {
    try {
        const response = await fetch("https://opentdb.com/api.php?amount=10&category=9&difficulty=easy&type=multiple");
        const data = await response.json();
        console.log(data);

        if(data.results && data.results.length > 0) {
            questions = data.results.map((questionData, index) => {
                const formattedQuestion = {
                    question: questionData.question,
                    choices: [...questionData.incorrect_answers, questionData.correct_answer],
                    answer: questionData.correct_answer,
                }
                return formattedQuestion;
            })

            startGame();
        }
        else {
            console.error("No trivia questions found in the API response.");
        }
    }
    catch (error) {
        console.error('Error in fetching Trivia Questions', error);
    }
}

// start the Game 
function startGame() {
    score = 0;
    questionCounter = 0;
    availableQuestions = [...questions];
    updateTimer();
    getNewQuestion();
}

// Get a New Question
function getNewQuestion() {
    if(availableQuestions.length === 0 || questionCounter >= maxQuestions) {
        localStorage.setItem('mostRecentScore', score);
        return window.location.assign("../html/end.html");
    }

    questionCounter++;

    questionCounterText.innerText = `${questionCounter} / ${maxQuestions}`;

    const questionIndex = Math.floor(Math.random() * availableQuestions.length);

    currentQuestion = availableQuestions[questionIndex];    
    question.innerHTML = currentQuestion.question;

    choices.forEach((choice, index) => {
        choice.innerHTML = currentQuestion.choices[index];
    })

    availableQuestions.splice(questionIndex, 1);
    acceptingAnswers = true;
}

//Event Listeners for choice selection

choices.forEach((choice) => {
    choice.addEventListener('click', (e) => {
        if(!acceptingAnswers) {
            return;
        }

        acceptingAnswers = false;

        const selectedChoice = e.target;
        const selectedAnswer = selectedChoice.innerText;

        const result = selectedAnswer === currentQuestion.answer ? 'correct' : 'incorrect';

        if(result === 'correct') {
            incrementScore(correctBonus);
        }

        selectedChoice.parentElement.classList.add(result);

        setTimeout(() => {
            selectedChoice.parentElement.classList.remove(result);
            getNewQuestion();
        }, 1000);
    })
})

function incrementScore(num) {
    score += num;
    scoreText.innerText = score;
}

function endTestDueToTime() {
    alert('Time is up');
    window.location.assign('../html/end.html');
    updateMostRecentScore();
}

function updateMostRecentScore() {
    localStorage.setItem("mostRecentScore", score);
    finalScore.innerText = score; 
}

endTestBtn.addEventListener('click', () => {
    updateMostRecentScore();
    window.location.assign("../html/end.html");
})

fetchTriviaQuestions();