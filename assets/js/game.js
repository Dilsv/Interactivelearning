const questionBank = [
  {
    question: "Tree",
    answers: [
      {text: "Forest", correct: true},
      {text: "Clock", correct: false},
      {text: "Peanut", correct: false},
      {text: "Bicycle", correct: false}
    ],
  },
  {
    question: "Piano",
    answers: [
      {text: "Cloud", correct: false},
      {text: "Jiraffe", correct: false},
      {text: "Toolbox", correct: false},
      {text: "Music", correct: true}
    ],
  },
  {
    question: "Bicycle",
    answers: [
      {text: "Pizza", correct: false},
      {text: "Ride", correct: true},
      {text: "Hammer", correct: false},
      {text: "Ocean", correct: false}
    ],
  },
  {
    question: "Sunset",
    answers: [
      {text: "Horizon", correct: true},
      {text: "Laptop", correct: false},
      {text: "Giraffe", correct: false},
      {text: "Calculator", correct: false}
    ],
  },
  {
    question: "Telescope",
    answers: [
      {text: "Lemon", correct: false},
      {text: "Pillow", correct: false},
      {text: "Football", correct: false},
      {text: "Stars", correct: true}
    ],
  },
  {
    question: "Adventure",
    answers: [
      {text: "Faucet", correct: false},
      {text: "Jigsaw", correct: true},
      {text: "Giraffe", correct: false},
      {text:"Piano", correct: false}
    ],
  },
  {
    question: "Recipe",
    answers: [
      {text: "Chair", correct: false},
      {text: "Moon", correct: false},
      {text: "Cooking", correct: true},
      {text:"Television", correct: false}
      ],
  },
  {
    question: "Book",
    answers: [
    {text: "Sandal", correct: false},
    {text: "Lemonade", correct: false},
    {text: "Reading", correct: true},
    {text: "Telescope", correct: false}
    ],
  },
  {
    question: "Puzzle",
    answers: [
    {text: "Pieces", correct: true},
    {text: "Giraffe", correct: false},
    {text: "Calendar", correct: false},
    {text: "Castle", correct: false}
    ],
  },
  {
    question: "Ocean",
    answers: [
    {text: "Waves", correct: true},
    {text: "Toolbox", correct: false},
    {text: "Cactus", correct: false},
    {text: "Notebook", correct: false}
    ],
  },
  {
    question: "Camera",
    answers: [
    {text: "Photography", correct: true},
    {text: "Giraffe", correct: false},
    {text: "Ice Cream", correct: false},
    {text: "Sailboat", correct: false}
    ],
  },
  {
    question: "Compass",
    answers: [
    {text: "Direction", correct: true},
    {text: "Toaster", correct: false},
    {text: "Giraffe", correct: false},
    {text: "Backpack", correct: false}
    ],
  },

];

let questionNumber;
let questionElement = document.getElementById("question"); 
let answerElement = document.getElementById("btn-grid");
let oldScore = parseInt(document.getElementById("correct-score").innerText);
let nextButton = document.getElementById("next-btn"); 
let playAgainButton = document.getElementById("play-again-btn");
let shuffledQuestions = questionBank.sort(() => Math.random() - .5);


// Function to start quiz or play again
function startGame() {
questionNumber = 0;
oldScore = 0;
document.getElementById("score-area").style.display = "block";
shuffleQuestionBank();
}

// Function to shuffle questionBank array at the start of each game
function shuffleQuestionBank () {
let shuffledQuestions = questionBank.sort(() => Math.random() - .5);
showQuestion ();
}

// Function to show next question and answers
function showQuestion() {
resetState();

let currentQuestion = shuffledQuestions[questionNumber]; 
questionNumber = questionNumber + 1; // Questions start at number 1 for user

questionElement.innerHTML = questionNumber + ". " + currentQuestion.question;

currentQuestion.answers.forEach(answer => {
  const button = document.createElement("button"); 
  button.innerHTML = answer.text; 
  button.classList.add("btn");
  button.classList.add("answer-btn");
  answerElement.appendChild(button);

  if (answer.correct) { 
    button.dataset.correct = answer.correct;
  }
  button.addEventListener("click", selectAnswer);
});
}

// Function to check answer, display feedback, and show Next button
function selectAnswer(e) { 

const selectedButton = e.target;
const isCorrect = selectedButton.dataset.correct === "true";

if (isCorrect) { // Selected button will turn green or red according to class styling
  selectedButton.classList.add("correct");
  incrementCorrect(); 
} else {
  selectedButton.classList.add("incorrect");
  incrementIncorrect();
}

Array.from(answerElement.children).forEach(button => { // Create an array for the answer buttons so we can loop through them
  if (button.dataset.correct === "true") { 
    button.classList.add("correct"); // Add a class of correct to the correct answer so that it turns green when the incorrect answer is selected
  }
  button.disabled = true; 
});

nextButton.style.display = "block";
}

// Function to remove answer buttons, next button, play again button and score-comment
function resetState() {
nextButton.style.display = "none";
playAgainButton.style.display = "none";
document.getElementById("score-comment").style.display = "none";

while (answerElement.firstChild) {
  answerElement.removeChild(answerElement.firstChild);
}
}

// Function to limit the quiz to 10 questions and then show score
function nextQuestion () {
if (questionNumber < 10) {
showQuestion();
} else {
showScore();
}}

// Function to show score, score-comment and play again button
function showScore () {
resetState();
questionElement.innerHTML = `You scored ${oldScore}/10!`;
document.getElementById("score-area").style.display = "none";
document.getElementById("score-comment").style.display = "block";

if (oldScore === 10) {
  document.getElementById("score-comment").innerHTML = "Congratulations! You are a True Words Genius!";
} else if (oldScore >= 7 && oldScore <= 9) {
  document.getElementById("score-comment").innerHTML = "Wow! You are an expert vocabularian. Keep playing!";
} else if (oldScore >= 1 && oldScore <= 6) {
  document.getElementById("score-comment").innerHTML = "Great effort! Keep playing!";
} else {
  document.getElementById("score-comment").innerHTML = "You can only get better. Keep playing!";
}

playAgainButton.style.display = "block";
}

// Function to reset scores back to 0 for play again
function resetScore () {

let correctScore = document.getElementById("correct-score");
correctScore.innerText = 0;

let incorrectScore = document.getElementById("incorrect-score");
incorrectScore.innerText = 0;
}

// Functions to increment scores
function incrementCorrect() { 
document.getElementById("correct-score").innerText = ++oldScore;
}

function incrementIncorrect() {
let oldScore = parseInt(document.getElementById("incorrect-score").innerText);
document.getElementById("incorrect-score").innerText = ++oldScore;
}

// Event Listeners
if (document.getElementById("next-btn")) {
startGame();

document.getElementById("next-btn").addEventListener("click", nextQuestion);
document.getElementById("play-again-btn").addEventListener("click", resetScore);
document.getElementById("play-again-btn").addEventListener("click", startGame);
}