window.addEventListener('DOMContentLoaded', (event) => {
    loadScores();
    playerName();
    getRank();
});

async function loadScores() {
    let scores = [];

    try {
      // Get the latest high scores from the service
      const response = await fetch('/api/scores');
      scores = await response.json();

      // Save the scores in case we go offline in the future
      localStorage.setItem('scores', JSON.stringify(scores));

    } catch {
      // If there was an error then just use the last saved scores
      const scoresText = localStorage.getItem('scores');
      if (scoresText) {
        scores = JSON.parse(scoresText);
      }
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
    } 
  }

  function playerName() {
    const player = localStorage.getItem("userName");
    document.getElementById('currentUser').innerHTML = player;
}

function getRank(){
    const player = localStorage.getItem("userName");
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