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
    }
]

let shuffledQuestions = [] //empty array to shuffle questions

function questionOrder() { //shuffles the questions and stores them in the shuffledQuestions array
    while(shuffledQuestions.length <= 0){
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
    questionOrder();
    const currentQuestion = shuffledQuestions[index];
    document.getElementById('questionNumber').innerHTML = questionNumber;
    document.getElementById('displayQuestion').innerHTML = currentQuestion.question;
    document.getElementById('option1Label').innerHTML = currentQuestion.optionA;
    document.getElementById('option2Label').innerHTML = currentQuestion.optionB;
    document.getElementById('option3Label').innerHTML = currentQuestion.optionC;
    document.getElementById('option4Label').innerHTML = currentQuestion.optionD;
}