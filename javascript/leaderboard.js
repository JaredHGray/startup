window.addEventListener('DOMContentLoaded', (event) => {
    playerName();
    getRank();
    loadScores();
});

function loadScores() {
    let scores = [];
    const scoresText = localStorage.getItem('scores');
    if (scoresText) {
      scores = JSON.parse(scoresText);
    }
  
    const tableBodyEl = document.querySelector('#scores');
  
    if (scores.length) {
      for (const [i, score] of scores.entries()) {
        const positionTdEl = document.createElement('td');
        const nameTdEl = document.createElement('td');
        const scoreTdEl = document.createElement('td');
        const timeTdEl = document.createElement('td');
  
        positionTdEl.textContent = i + 1;
        nameTdEl.textContent = score.name;
        scoreTdEl.textContent = score.score;
        timeTdEl.textContent = score.time
  
        const rowEl = document.createElement('tr');
        rowEl.appendChild(positionTdEl);
        rowEl.appendChild(nameTdEl);
        rowEl.appendChild(scoreTdEl);
        rowEl.appendChild(timeTdEl);
  
        tableBodyEl.appendChild(rowEl);
      }
    } else {
      tableBodyEl.innerHTML = '<tr><td colSpan=4>Be the first to score</td></tr>';
    }
  }

  function playerName() {
    const player = JSON.parse(localStorage.getItem("userInfo")).name;
    document.getElementById('currentUser').innerHTML = player;
}

function getRank(){
    const player = JSON.parse(localStorage.getItem("userInfo")).name;
    let scores = [];
    const scoresText = localStorage.getItem('scores');
    if (scoresText) {
        scores = JSON.parse(scoresText);
    }
    let result = 0;
    if(scores.length){
        for (const [i, score] of scores.entries()){
            if(score.name === player){
                result = i + 1;
                break;
            }
        }
    }
    document.getElementById('userRank').innerHTML = result;
}