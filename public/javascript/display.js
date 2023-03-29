window.addEventListener('DOMContentLoaded', (event) => {
    playerName();
    getScore();
    configureWebSocket();
})

function playerName() {
    const player = localStorage.getItem("userName");
    document.getElementById('currentUser').innerHTML = player;
}

async function getScore(){
    const player = localStorage.getItem("userName");
    
    let scores = [];
    const response = await fetch('/api/scores');
    scores = await response.json();
    
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

// Event messages
const GameEndEvent = 'gameEnd';
const GameStartEvent = 'gameStart';
let socket;

async function configureWebSocket() {
    const protocol = window.location.protocol === 'http:' ? 'ws' : 'wss';
    socket = new WebSocket(`${protocol}://${window.location.host}/ws`);
    socket.onopen = (event) => {
      console.log("socket is open");
      displayMsg('system', 'game', 'connected');
    };
    socket.onclose = (event) => {
      displayMsg('system', 'game', 'disconnected');
      console.log("socket is closed");
    };
    socket.onmessage = async (event) => {
      const msg = JSON.parse(await event.data.text());
      if (msg.type === GameEndEvent) {
        displayMsg('player', msg.from, `scored ${msg.value.score}`);
      } else if (msg.type === GameStartEvent) {
        displayMsg('player', msg.from, `started a new game`);
      }
    };
}

function displayMsg(cls, from, msg) {
    const chatText = document.querySelector('#player-messages');
    chatText.innerHTML =
        `<div class="event"><span id="${cls}-event">${from}</span> ${msg}</div>` + chatText.innerHTML;
    }