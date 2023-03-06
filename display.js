

function playerName() {
    const player = (localStorage.getItem("userInfo")).name;
    document.getElementById('currentUser').innerHTML = player;
}