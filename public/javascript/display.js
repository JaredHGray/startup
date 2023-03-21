window.addEventListener('DOMContentLoaded', (event) => {
    playerName();
    getScore();
})

function playerName() {
    const player = JSON.parse(localStorage.getItem("userInfo")).name;
    document.getElementById('currentUser').innerHTML = player;
}

function getScore(){
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
                result = score.score;
                break;
            }
        }
    }
    document.getElementById('highScore').innerHTML = result;
}