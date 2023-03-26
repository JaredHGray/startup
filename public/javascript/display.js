window.addEventListener('DOMContentLoaded', (event) => {
    playerName();
    getScore();
})

function playerName() {
    const player = localStorage.getItem("userName");
    document.getElementById('currentUser').innerHTML = player;
}

function getScore(){
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
                result = score.score;
                break;
            }
        }
    }
    document.getElementById('highScore').innerHTML = result;
}

function logout() {
    fetch(`/api/auth/logout`, {
      method: 'delete',
    }).then(() => (window.location.href = '/'));
  }