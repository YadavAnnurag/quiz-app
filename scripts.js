let score = 0;
const quizData = [
  {
    question: "What is the capital of France?",
    options: ["Paris", "London", "Berlin", "Madrid"],
    answer: "Paris"
  },
  {
    question: "Which planet is known as the Red Planet?",
    options: ["Earth", "Mars", "Jupiter", "Venus"],
    answer: "Mars"
  },
  {
    question: "Who wrote the play 'Romeo and Juliet'?",
    options: ["William Shakespeare", "Charles Dickens", "Jane Austen", "Mark Twain"],
    answer: "William Shakespeare"
  },
  {
    question: "What is the largest ocean on Earth?",
    options: ["Atlantic Ocean", "Indian Ocean", "Arctic Ocean", "Pacific Ocean"],
    answer: "Pacific Ocean"
  },
  {
    question: "How many continents are there on Earth?",
    options: ["5", "6", "7", "8"],
    answer: "7"
  },
  {
    question: "Which country is famous for the pyramids?",
    options: ["Egypt", "Mexico", "Greece", "India"],
    answer: "Egypt"
  },
  {
    question: "What is the chemical symbol for water?",
    options: ["H2O", "O2", "CO2", "NaCl"],
    answer: "H2O"
  },
  {
    question: "Which animal is known as the 'King of the Jungle'?",
    options: ["Lion", "Tiger", "Elephant", "Giraffe"],
    answer: "Lion"
  },
  {
    question: "Which is the fastest land animal?",
    options: ["Cheetah", "Lion", "Horse", "Leopard"],
    answer: "Cheetah"
  },
  {
    question: "Who painted the Mona Lisa?",
    options: ["Leonardo da Vinci", "Michelangelo", "Pablo Picasso", "Vincent van Gogh"],
    answer: "Leonardo da Vinci"
  },
  {
    question: "What is the tallest mountain in the world?",
    options: ["Mount Everest", "K2", "Kangchenjunga", "Lhotse"],
    answer: "Mount Everest"
  },
  {
    question: "Which gas do plants absorb from the atmosphere?",
    options: ["Oxygen", "Carbon Dioxide", "Nitrogen", "Hydrogen"],
    answer: "Carbon Dioxide"
  },
  {
    question: "Which is the largest mammal on Earth?",
    options: ["Elephant", "Blue Whale", "Giraffe", "Hippopotamus"],
    answer: "Blue Whale"
  },
  {
    question: "Who discovered gravity when an apple fell on his head?",
    options: ["Albert Einstein", "Isaac Newton", "Galileo Galilei", "Nikola Tesla"],
    answer: "Isaac Newton"
  },
  {
    question: "Which is the smallest country in the world by area?",
    options: ["Monaco", "Vatican City", "Maldives", "Liechtenstein"],
    answer: "Vatican City"
  }
];




let currentQuestionIndex = 0;
let timer;
let timeLimit = 10;



function startTimer(){
  let timeLeft = timeLimit;
  document.getElementById("timer").textContent = `Time left :${timeLeft}`;
  timer = setInterval(() => {
    timeLeft--;
    document.getElementById("timer").textContent = `Time left :${timeLeft < 10 ? "0" + timeLeft : timeLeft}`;
    if (timeLeft <= 0){
      clearInterval(timer);
      currentQuestionIndex++;
      if (currentQuestionIndex < quizData.length){
        loadQuestion(currentQuestionIndex);
      }else{
        showResult();
      }
    }
  },1000);

}

function startQuiz() {
  document.getElementById("progress-container").style.display = "block";
  document.getElementById("progress-bar").style.width = "0%";
  score = 0;
  currentQuestionIndex = 0;
  loadQuestion(currentQuestionIndex);
}


function loadQuestion(index){
clearInterval(timer);
let currentQuestion = quizData[index];
document.getElementById("questionarea").textContent = currentQuestion.question;
document.getElementById("btn1").textContent = currentQuestion.options[0];
document.getElementById("btn2").textContent = currentQuestion.options[1];
document.getElementById("btn3").textContent = currentQuestion.options[2];
document.getElementById("btn4").textContent = currentQuestion.options[3];

answerButtons.forEach(button => {
  button.disabled = false;
  button.classList.remove("correct", "wrong");
  button.style.backgroundColor = "";
  button.style.color = "";
});

const quizCount = document.getElementById("quiz-count");
if (quizCount) quizCount.textContent = `Question ${index + 1} of ${quizData.length}`;

const progressBar = document.getElementById("progress-bar");
const progresspercentage = ((index + 1) / quizData.length) * 100;
progressBar.style.width = `${progresspercentage}%`;

startTimer();
}

const startButton = document.getElementById("start-btn");

const quizScreen = document.getElementById("quiz-screen");

const homeScreen = document.getElementById("home-screen");

startButton.addEventListener("click",function(){
  homeScreen.style.display = "none";
  quizScreen.style.display ="block";
  startQuiz();
  

});


const answerButtons = document.querySelectorAll("#answer-button button");
answerButtons.forEach(button => {
  button.addEventListener("click", function() {
    clearInterval(timer);
    let selectedAnswer = this.textContent;
    let correctAnswer = quizData[currentQuestionIndex].answer;

    answerButtons.forEach(btn => btn.disabled = true);

    answerButtons.forEach(btn => {
      if (btn.textContent === correctAnswer) {
        btn.classList.add("correct");
      } else if (btn.textContent === selectedAnswer) {
        btn.classList.add("wrong");
      }
    });

    if (selectedAnswer === correctAnswer) score++;

    setTimeout(() => {
      currentQuestionIndex++;
      if (currentQuestionIndex < quizData.length) {
        loadQuestion(currentQuestionIndex); 
      } else {
        showResult();
      }
    }, 1500);
  });
});

    





window.onload = function() {
  let bestScore = localStorage.getItem("bestScore") || 0;
  document.getElementById("best-score-home").textContent = `Best Score: ${bestScore}`;
  document.getElementById("high-scr").textContent = `Best Score: ${bestScore}`;
};
function showResult(){
  document.getElementById("quiz-screen").style.display = 'none';
  document.getElementById("result-screen").style.display = 'block';
  document.getElementById("progress-container").style.display = "none";
  document.getElementById("result").textContent = `You scored ${score} out of ${quizData.length}`;
  let bestScore = localStorage.getItem("bestScore") || 0;
  if (score > bestScore){
    localStorage.setItem("bestScore",score);
    bestScore = score;
  }
  document.getElementById("high-scr").textContent = `Best Score: ${bestScore}`;
  document.getElementById("best-score-home").textContent =`Best Score: ${bestScore}`;
}
  document.getElementById("play-again").addEventListener("click",function(){
    clearInterval(timer);
  score = 0;
  currentQuestionIndex = 0;
  document.getElementById("result-screen").style.display = 'none';
  document.getElementById("quiz-screen").style.display = 'block';
  const progresscontainer = document.getElementById("progress-container");
  const progressBar = document.getElementById("progress-bar");
  progresscontainer.style.display = "block";
  progressBar.style.width = "0%";
  setTimeout(() => {
    
  
  loadQuestion(currentQuestionIndex);
  }, 50);
});


