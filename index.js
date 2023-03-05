// JS for the coutdown screen 
let current_count = 5;
const countjob = setInterval("countDown()", 1000);

window.addEventListener('DOMContentLoaded', (event) => {
   console.log('DOM fully loaded and parsed');
   element = document.querySelector('.revealGame');
   element.style.visibility = 'hidden'; //on load of screen hide normal HTML
   document.body.style.backgroundImage = 'none';
   countjob;
   DisplayQuestion(0);
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
    document.body.style.backgroundImage = "url(space.webp)";
    }
}
//end of countdown code

//object to store questions 
const questions = [
    {
    question: "How many hearts does an Octopus have?",
    optionA: "One",
    optionB: "Two",
    optionC: "Three",
    optionD: "Four",
    correctOption: "optionC"
    },
    {
        question: "The longest river in the United Kingdom is ?",
        optionA: "River Severn",
        optionB: "River Mersey",
        optionC: "River Trent",
        optionD: "River Tweed",
        correctOption: "optionA"
    }
]

let shuffledQuestions = [] //empty array to shuffle questions

function questionOrder() { //shuffles the questions and stores them in the shuffledQuestions array
    while(shuffledQuestions.length <= 1){
        const random = questions[Math.floor(Math.random() * questions.length)];
        if (!shuffledQuestions.includes(random)) {
            shuffledQuestions.push(random)
        }
    }
}

let questionNumber = 1; //holds current question number
let playerScore = 0; //holds player score
let wrongAnswer = 0; //holds #wrong answers by player
let indexNumber = 0; //used in displaying next question

function DisplayQuestion(index) {
    resetOptionBackground();
    questionOrder();
    const currentQuestion = shuffledQuestions[index];
    document.getElementById('questionNumber').innerHTML = questionNumber;
    document.getElementById('displayQuestion').innerHTML = currentQuestion.question;
    document.getElementById('option1Label').innerHTML = currentQuestion.optionA;
    document.getElementById('option2Label').innerHTML = currentQuestion.optionB;
    document.getElementById('option3Label').innerHTML = currentQuestion.optionC;
    document.getElementById('option4Label').innerHTML = currentQuestion.optionD;
}

function checkAnswer(){
    const currentQuestion = shuffledQuestions[indexNumber]; //get current question
    const currentQuestionAnswer = currentQuestion.correctOption; //get correct answer
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
            const wrongLabel = option.label[0].id;
            document.getElementById(wrongLabel).style.backgroundColor = '#fe3d02';
            wrongAnswer++; //index incorrect attempts
            indexNumber++; //increase index for next question

            setTimeout(() => { //delay until next question loads
                questionNumber++;
            }, 1000)
        }
    })
}

function nextQuestion(){
    checkAnswer(); //check if previous question was correct
    uncheckButtons();

    setTimeout (() => {
        if(indexNumber <= 1){
            DisplayQuestion(indexNumber);
        }
        else{
            endGameScreen();
        }
        resetOptionBackground();
    }, 1000)

    function uncheckButtons(){ //reset all the button
        const options = document.getElementsByName('option');
        for(let i = 0; i < options.length; i++){
            options[i].checked = false;
        }
    }

    function endGameScreen(){
        window.location.href = "endScreen.html"; 
    }
}

function resetOptionBackground() {
    const options = document.getElementsByName("option");
    options.forEach((option) => {
        document.getElementById(option.labels[0].id).style.backgroundColor = "";
    })
}