window.addEventListener('DOMContentLoaded', (event) => {
    endGame();
    saveScore();
});

function endGame(){
    let playerScore = JSON.parse(localStorage.getItem('userResults')).score;
    let playerWrong = JSON.parse(localStorage.getItem('userResults')).incorrect;
    let playerTime = JSON.parse(localStorage.getItem('userResults')).time;

    let remarks = null;

    if(playerWrong == 3){
        remarks = "Better luck next time!";
    }
    else if(playerWrong < 3 && playerScore < 5){
        remarks = "Oof. Maybe you need to study up...";
    }
    else if(playerWrong < 3 && (playerScore > 5 && playerScore < 8)){
        remarks = "Not bad! But you can do better.";
    }
    else if(playerWrong < 3 && (playerScore >= 8)){
        remarks = "Great job! Keep it up!";
    }
    else if(playerWrong <= 0 && (playerScore == 10)){
        remarks = "Amazing! You know your facts!";
    }

    const playerGrade = (playerScore / 10) * 100;

    document.getElementById('comments').innerHTML = remarks;
    document.getElementById('correctAnswer').innerHTML = playerScore;
    document.getElementById('incorrectAnswer').innerHTML = playerWrong;
    document.getElementById('totalTime').innerHTML = playerTime;
    document.getElementById('grade').innerHTML = playerGrade;
}

function saveScore() {
    const userName = JSON.parse(localStorage.getItem('userResults')).name;
    let score = JSON.parse(localStorage.getItem('userResults')).score;
    let time = JSON.parse(localStorage.getItem('userResults')).time;
    let scores = [];
    const scoresText = localStorage.getItem('scores');
    if (scoresText) {
      scores = JSON.parse(scoresText);
    }
    scores = updateScores(userName, score, time, scores);

    localStorage.setItem('scores', JSON.stringify(scores));
  }

  function updateScores(userName, score, time, scores) {
    const newScore = { name: userName, score: score, time: time };

    let minutes = time.substring(0,2);
    let seconds = time.substring(5,3);
    console.log("current min:" + minutes);
    console.log("current sec:" + seconds);

    let found = false;
    for (const [i, prevScore] of scores.entries()) {
        let compare = timeComparison(score, prevScore, minutes, seconds);
      if ((score >= prevScore.score) && compare) {
        scores.splice(i, 0, newScore);
        found = true;
        break;
      }
    }

    if (!found) {
      scores.push(newScore);
    }

    if (scores.length > 10) {
      scores.length = 10;
    }

    return scores;
  }

  function timeComparison(score, prevScore, minute, second){

    let prevMin = prevScore.time.substring(0,2);
    let prevSec = prevScore.time.substring(5,3);

    if(score > prevScore.score){
        return true;
    }
    else if(score == prevScore.score){
        if(+minute <= +prevMin){
            if(+second < +prevSec){
                return true;
            }
            else{
                return false;
            }
        }
        else{
            return false;
        }
    }
    else{
        return false;
    }

  }
