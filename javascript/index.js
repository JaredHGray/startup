// JS for the coutdown screen 
let current_count = 3;
const countjob = setInterval("countDown()", 1000);

window.addEventListener('DOMContentLoaded', (event) => {
   console.log('DOM fully loaded and parsed');
   element = document.querySelector('.revealGame');
   element.style.visibility = 'hidden'; //on load of screen hide normal HTML
   document.body.style.backgroundImage = 'none';

   setTimeout (() => {
    document.getElementById("container",).innerHTML = `<h2>READY?</h2>`;
   }, 500)

   countjob;
   DisplayQuestion(0);

   timer = true; //initates the counter
   setTimeout (() => {
    stopWatch();
}, 3000)
});

function countDown() {
    console.log('in the countdown');
    document.getElementById("container",).innerHTML = `<h2> ${current_count}</h2>`;
    if (current_count > 0) {
    current_count--;
    } else {
    clearInterval(countjob);
    document.getElementById("container",).innerHTML = `<h2> </h2>`;
    element = document.querySelector('.revealGame');
    element.style.visibility = 'visible'; //reveal HTML
    document.body.style.backgroundImage = "url(../css/space.webp)";
    }
}
//end of countdown code

//testing fetch
const url = "https://the-trivia-api.com/api/questions?limit=1&region=US";

let trivia = [];

async function getTrivia(){
    let response = await fetch(url);
    let data = await response.json();
    return data;
}

function correctOrder(array) {
    for(let i = array.length-1; i >= 0; i--){
        const shuffle = Math.floor(Math.random() * (i+1));
        [array[i], array[shuffle]] = [array[shuffle], array[i]]
    }
}
//end of fetch test


let shuffledQuestions = [] //empty array to shuffle questions

let questionNumber = 1; //holds current question number
let playerScore = 0; //holds player score
let wrongAnswer = 0; //holds #wrong answers by player
let indexNumber = 0; //used in displaying next question

async function DisplayQuestion(index) {
    resetOptionBackground();
    const random = await getTrivia();
    shuffledQuestions = random[0];

    let answers = [...shuffledQuestions.incorrectAnswers, shuffledQuestions.correctAnswer]
    correctOrder(answers);

    document.getElementById('questionNumber').innerHTML = questionNumber;
    document.getElementById('displayQuestion').innerHTML = shuffledQuestions.question;
    for(let i = 0; i < 4; i++){
        let index = i + 1;
        document.getElementById(`option${index}Label`).innerHTML = answers[i];
        document.getElementById(`option${index}`).value = answers[i];
    }
}

function checkAnswer(){
    const currentQuestion = shuffledQuestions; //get current question
    const currentQuestionAnswer = currentQuestion.correctAnswer; //get correct answer
    const options = document.getElementsByName('option'); //get contents of all the possible answers
    let correctAnswer = null; 

    options.forEach((option) => {
        if(option.value == currentQuestionAnswer){
            correctAnswer = option.labels[0].id; 
        } //sets correctAnswer = to the correct radio input button
    })

    options.forEach((option) => { //checking if the checked button is same as answer
        if(option.checked === true && option.value === currentQuestionAnswer){
            playerScore++; //increase player score
            indexNumber++; //increase index for next question
            document.getElementById(correctAnswer).style.backgroundColor = '#12ff0a';

            setTimeout(() => { //delay until next question loads
                questionNumber++;
            }, 1000)
        }

        else if(option.checked && option.value !== currentQuestionAnswer){
            const wrongLabel = option.labels[0].id;
            document.getElementById(wrongLabel).style.backgroundColor = '#fe3d02';
            wrongAnswer++; //index incorrect attempts
            indexNumber++; //increase index for next question

            setTimeout(() => { //delay until next question loads
                questionNumber++;
                //change value of displayed characters 
                wrongAttempts();
            }, 1000)
        }
    })
}

function nextQuestion(){
    checkAnswer(); //check if previous question was correct
    uncheckButtons();

    setTimeout (() => {
        if(wrongAnswer <= 2 && indexNumber <= 99){
            DisplayQuestion(indexNumber);
        }
        else{
            endTimer();
            storeScore();
            endGameScreen();
        }
        resetOptionBackground();
    }, 2000)

    function uncheckButtons(){ //reset all the button
        const options = document.getElementsByName('option');
        for(let i = 0; i < options.length; i++){
            options[i].checked = false;
        }
    }

    function endGameScreen(){ //resets everything and sends to end screen
        questionNumber = 1;
        playerScore = 0;
        wrongAnswer = 0;
        indexNumber = 0;
        shuffledQuestions = [];
        window.location.href = "endScreen.html"; 
    }
}

function resetOptionBackground() {
    const options = document.getElementsByName("option");
    options.forEach((option) => {
        document.getElementById(option.labels[0].id).style.backgroundColor = "";
    })
}

function wrongAttempts(){
    if(wrongAnswer === 1){
        document.querySelector('#incorrect1').innerHTML = `close`;
    }
    if(wrongAnswer === 2){
        document.querySelector('#incorrect2').innerHTML = `close`;
    }
    if(wrongAnswer === 3){
        document.querySelector('#incorrect3').innerHTML = `close`;
    }
}

function storeScore(){
    let userName = JSON.parse(localStorage.getItem('userInfo')).name;
    const newScore = {name: userName, score: playerScore, incorrect: wrongAnswer, time: timeKeeper}
    localStorage.setItem("userResults", JSON.stringify(newScore));
}

//stopWatch Function
let count = 0;
let minute = 0;
let second = 0;
let timer = false;
let timeKeeper;

function stopWatch(){
    if(timer){
        count++; 
        if (count == 100) {
            second++;
            count = 0;
        }
        if (second == 60) {
            minute++;
            second = 0;
        }
    }

    let secString = second < 10 ? "0" + second : second;
    let minString = minute < 10 ? "0" + minute : minute;

    let time = `${minString} : ${secString}`;
    timeKeeper = minString + ":" + secString;

    document.getElementById('timeDisplay').innerHTML = time;

    setTimeout (() => {
        stopWatch();
    }, 10)
}

function endTimer(){
    timer = false;
    localStorage.setItem("userTime", JSON.stringify(timeKeeper));
    count = 0;
    second = 0;
    minute = 0; 
}
//end of stopWatch code
