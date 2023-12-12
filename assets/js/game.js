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
let answerElement = document.getElementById("btn-box");
let oldScore = parseInt(document.getElementById("correct-score-counter").innerText);
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

function showQuestion() {
  resetState();

  const currentQuestion = shuffledQuestions[questionNumber++];
  questionElement.innerHTML = `${questionNumber}. ${currentQuestion.question}`;

  currentQuestion.answers.forEach(answer => {
    const button = document.createElement("button");
    button.innerHTML = answer.text;
    button.classList.add("btn", "answer-btn");

    if (answer.correct) {
      button.dataset.correct = answer.correct;
    }

    button.addEventListener("click", selectAnswer);
    answerElement.appendChild(button);
  });
}


// Function to check answer, display feedback, and show Next button
function selectAnswer(e) {
  const selectedButton = e.target;
  const isCorrect = selectedButton.dataset.correct === "true";

  applyAnswerStyles(selectedButton, isCorrect);
  disableAllAnswerButtons();
  showNextButton();
}

function applyAnswerStyles(button, isCorrect) {
  button.classList.add(isCorrect ? "correct" : "incorrect");
  isCorrect ? incrementCorrect() : incrementIncorrect();

  Array.from(answerElement.children).forEach(btn => {
    if (btn.dataset.correct === "true") {
      btn.classList.add("correct");
    }
    btn.disabled = true;
  });
}

function disableAllAnswerButtons() {
  Array.from(answerElement.children).forEach(button => {
    button.disabled = true;
  });
}

function showNextButton() {
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
function showScore() {
  resetState();

  const score = oldScore;
  const scoreElement = document.getElementById("score-area");
  const commentElement = document.getElementById("score-comment");

  questionElement.innerHTML = `You scored ${score}/10!`;
  scoreElement.style.display = "none";
  commentElement.style.display = "block";

  if (score === 10) {
    commentElement.innerHTML = "Congratulations! You are a matching Genius!";
  } else if (score >= 7 && score <= 9) {
    commentElement.innerHTML = "Wow! You smashed it! Keep playing!";
  } else if (score >= 1 && score <= 6) {
    commentElement.innerHTML = "Great effort! Keep playing!";
  } else {
    commentElement.innerHTML = "Let's try beating the highscore! Keep going!";
  }

  playAgainButton.style.display = "block";
}


// Function to reset scores back to 0 for play again
function resetScore () {

let correctScore = document.getElementById("correct-score-score");
correctScore.innerText = 0;

let incorrectScore = document.getElementById("incorrect-score-coutner-score");
incorrectScore.innerText = 0;
}

// Functions to increment scores

// Variables for scores
let correctScore = 0;
let incorrectScore = 0;


function incrementCorrect() { 
document.getElementById("correct-score-counter").innerText = ++correctScore;
}

function incrementIncorrect() {
document.getElementById("incorrect-score-counter").innerText = ++incorrectScore;
}

// Event Listeners
if (document.getElementById("next-btn")) {
startGame();

document.getElementById("next-btn").addEventListener("click", nextQuestion);
document.getElementById("play-again-btn").addEventListener("click", resetScore);
document.getElementById("play-again-btn").addEventListener("click", startGame);
}
