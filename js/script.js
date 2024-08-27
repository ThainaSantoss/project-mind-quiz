// Inicial Data
let currentQuestion = 0; // controls the index of the current issue
let correctAnswers = 0; // stores the number of correct answers the user has given so far.

//Events
document.querySelector(".scoreArea button").addEventListener("click", resetEvent);  
document.querySelector(".start-button").addEventListener("click", eventStart); 
document.querySelector('.btn-solution').addEventListener('click', showSolution);
document.addEventListener('keydown', function(event) {
 if (event.key === 'Enter') { // key event for "enter" button
  document.querySelector('.start-button').click();
 }
})

//functions
function eventStart() { // displays the home screen and hides questions
  document.querySelector(".start").style.display = "none";
  document.querySelector(".questionArea").style.display = "block";


  showQuestion();
}
// mostrar a questão
function showQuestion() {
  if (questions[currentQuestion]) {
    let q = questions[currentQuestion];

    let pct = Math.floor((currentQuestion / questions.length) * 100); // 2 / 4 = 0,5 * 100 = 50

    document.querySelector(".progress--bar").style.width = `${pct}%`; // percent progress

    document.querySelector(".scoreArea").style.display = "none";
    document.querySelector(".questionArea").style.display = "block";

    document.querySelector(".question").innerHTML = q.question;

    // the user clicks on an answer option
    let optionsHtml = ""; 
    for (let i in q.options) {
      optionsHtml += `<div data-op="${i}" class="option"><span>${
        parseInt(i) + 1
      }</span>${q.options[i]}</div>`;
    }

    document.querySelector(".options").innerHTML = optionsHtml;

    // click effect
    document.querySelectorAll(".options .option").forEach((item) => {
      item.addEventListener("click", optionClickEvent);
    });
  } else {
    finishQuiz();
  }
}

function optionClickEvent(e) {
  let clickedOtion = parseInt(e.target.getAttribute("data-op"));

  if (questions[currentQuestion].answer === clickedOtion) {
    correctAnswers++;
  }

  currentQuestion++;
  showQuestion();
}

function finishQuiz() {
  let points = Math.floor((correctAnswers / questions.length) * 100); // 7 / 10 = 0,7 * 100 = 70%
// feedback message based on the score.
  if (points < 30) {
    document.querySelector(".scoreText1").innerHTML = "Tá ruim em?!";
    document.querySelector(".scorePct").style.color = "#FF0000";
  } else if (points >= 30 && points < 70) {
    document.querySelector(".scoreText1").innerHTML = "Muito bom!!!";
    document.querySelector(".scorePct").style.color = "#FFFF00";
  } else if (points >= 70) {
    document.querySelector(".scoreText1").innerHTML = "Parabéns!";
    document.querySelector(".scorePct").style.color = "#0D630D";
  }

  document.querySelector(".scorePct").innerHTML = `Acertou ${points}%`;
  document.querySelector(
    ".scoreText2"
  ).innerHTML = `Você respondeu ${questions.length} questões e acertou ${correctAnswers}.`;

  document.querySelector(".scoreArea").style.display = "block";
  document.querySelector(".questionArea").style.display = "none";
  document.querySelector(".progress--bar").style.width = "100%";
}

// reset the quiz
function resetEvent() {
  correctAnswers = 0;
  currentQuestion = 0;

  document.querySelector('.solutionArea').style.display = 'none';



showQuestion()

}
// For each question, create an HTML block with the question, the correct answer and the explanation
  function showSolution() {
    let solutionHtml = '';

    questions.forEach((question, index) =>{
      solutionHtml +=  `
      <div class="solution">
      <h3>Questão ${index + 1}: ${question.question}</h3>
      <p><strong>Resposta correta:</strong> ${question.options[question.answer]}</p>
      <p><strong>Explicação:</strong> ${question.explanation || "Explicação não disponível"}</p>
      </div>
      `;
    })
  
    document.querySelector('.solutionArea').innerHTML = solutionHtml;
    document.querySelector('.solutionArea').style.display = 'block';
    document.querySelector('.questionArea').style.display = 'none';
    document.querySelector('.scoreArea').style.display = 'block';
  }