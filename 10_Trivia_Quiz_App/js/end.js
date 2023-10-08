const userName = document.getElementById("username");
const saveScoreButton = document.getElementById("saveScoreButton");
const mostRecentScore = localStorage.getItem("mostRecentScore");
const finalScore = document.getElementById("finalScore");

const highScores = JSON.parse(localStorage.getItem('highScores')) || [];
const maxHighScores = 5;

finalScore.innerText = mostRecentScore;

userName.addEventListener('keyup', () => {
    saveScoreButton.disabled = !userName.value;
});

function saveHighScore(e) {
    e.preventDefault();

    const score = {
        score: parseInt(mostRecentScore),
        name: userName.value
    };

    highScores.push(score);
    highScores.sort( (a,b) => b.score - a.score);
    highScores.splice(maxHighScores);

    localStorage.setItem('highScores', JSON.stringify(highScores));

    window.location.assign('/');
}