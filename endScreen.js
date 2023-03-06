window.addEventListener('DOMContentLoaded', (event) => {
    endGame();
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
    else if(playerWrong < 3 && (playerScore > 5 && playerScore <= 10)){
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


