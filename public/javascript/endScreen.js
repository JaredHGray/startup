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
    else if(playerWrong < 3 && playerScore < 50){
        remarks = "Oof. Maybe you need to study up...";
    }
    else if(playerWrong < 3 && (playerScore > 5 && playerScore < 80)){
        remarks = "Not bad! But you can do better.";
    }
    else if(playerWrong < 3 && (playerScore >= 80)){
        remarks = "Great job! Keep it up!";
    }
    else if(playerWrong <= 0 && (playerScore == 100)){
        remarks = "Amazing! A perfect score! You know your facts!";
    }

    const playerGrade = (playerScore / 10) * 100;

    document.getElementById('comments').innerHTML = remarks;
    document.getElementById('correctAnswer').innerHTML = playerScore;
    document.getElementById('incorrectAnswer').innerHTML = playerWrong;
    document.getElementById('totalTime').innerHTML = playerTime;
    document.getElementById('grade').innerHTML = playerGrade;
}

async function saveScore() {
    const userName = JSON.parse(localStorage.getItem('userResults')).name;
    const score = JSON.parse(localStorage.getItem('userResults')).score;
    const time = JSON.parse(localStorage.getItem('userResults')).time;

    let minutes = time.substring(0,2);
    let seconds = time.substring(5,3);
    minutes = +minutes;
    seconds = +seconds;

    const newScore = { name: userName, score: score, time: time, minutes: minutes, seconds: seconds };    

    try{
      const response = await fetch('/api/score', {
        method: 'POST',
        headers: { 'content-type': 'application/json' },
        body: JSON.stringify(newScore),
      });

      //store what the fetch gave us
      const scores = await response.json();
      localStorage.setItem('scores', JSON.stringify(scores));
    }
    catch{
      //if error, store scores locally 
      updateScoresLocal(newScore);
    }

  }

  function updateScoresLocal(newScore) {

    let scores = [];
        const scoresText = localStorage.getItem('scores');
        if (scoresText) {
          scores = JSON.parse(scoresText);
        }
    let minutes = newScore.time.substring(0,2);
    let seconds = newScore.time.substring(5,3);
    console.log("current min:" + minutes);
    console.log("current sec:" + seconds);

    let found = false;
    for (const [i, prevScore] of scores.entries()) {
        let compare = timeComparison(newScore, prevScore, minutes, seconds);
      if (compare) {
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
    
    localStorage.setItem('scores', JSON.stringify(scores));
  }

  function timeComparison(newScore, prevScore, minute, second){

    let prevMin = prevScore.time.substring(0,2);
    let prevSec = prevScore.time.substring(5,3);

    if(newScore.score > prevScore.score){
        return true;
    }
    else if(newScore.score == prevScore.score){
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

function logout() {
  fetch(`/api/auth/logout`, {
    method: 'delete',
  }).then(() => (window.location.href = '/'));
}