let questionNumber = 0;
let score = 0;

function generateQuestion () {
  if (questionNumber < STORE.length) {
    return `<span class="question">${questionNumber}</span>
    <h2>${STORE[questionNumber].question}</h2>
    <form>
    <fieldset>
    <label class = "answerOption">
    <input type = "radio" value = "${STORE[questionNumber].answers[0]}" name="answer" required>
    <span>${STORE[questionNumber].answers[0]}
    </span>
    </label>
    <label class="answerOption">
    <input type="radio" value="${STORE[questionNumber].answers[1]}" name="answer" required>
    <span>${STORE[questionNumber].answers[1]}</span>
    </label>
    <label class="answerOption">
    <input type="radio" value="${STORE[questionNumber].answers[2]}" name="answer" required>
    <span>${STORE[questionNumber].answers[2]}</span>
    </label>
    <label class="answerOption">
    <input type="radio" value="${STORE[questionNumber].answers[3]}" name="answer" required>
    <span>${STORE[questionNumber].answers[3]}</span>
    </label>
    <button type="submit" class="submitButton">Submit</button>
    </fieldset>
    </form>
    </div>`;
} else {
  renderResults();
  restartQuiz();
  $('.questionNumber').text(10)
  }
}

function changeQuestionNumber () {
  if (questionNumber < STORE.length) {
      questionNumber++;
      $('.questionNumber').text(questionNumber+1);
  }
}

function changeScore () {
  score++;
}

function startQuiz () {
  $('.quizStart').on('click', '.startButton', function (event){
    $('.quizStart').remove ();
    $('.questionAnswerForm').css('display', 'block');
    $('.questionNumber').text(1);
    renderQuestion();
  });
}

function renderQuestion () {
  $('.questionAnswerForm').html(generateQuestion());
}

function attachUserSubmitListener () {
  $('main').on('submit', function (event) {
    event.preventDefault();
    let selected = $('input:checked');
    let answer = selected.val();
    let correctAnswer = STORE[questionNumber].correctAnswer;
    if (answer === correctAnswer) {
        selected.parent().addClass('correct');
        ifAnswerIsCorrect();
      } else {
        selected.parent().addClass('wrong');
        ifAnswerIsWrong();
      }
  });
}

function ifAnswerIsCorrect () {
  userAnswerFeedbackCorrect();
  updateScore();
}

function ifAnswerIsWrong () {
  userAnswerFeedbackWrong();
}

function userAnswerFeedbackCorrect () {
  $('.questionAnswerForm').html(`<div class="correctFeedback"><div class="icon"><img src="${STORE[questionNumber].icon}" alt="${STORE[questionNumber].alt}"/></div><p><b>You got it right!</b></p><button type=button class="nextButton">Next</button></div>`);
}

function userAnswerFeedbackWrong () {
  let correctAnswer = `${STORE[questionNumber].correctAnswer}`;
  $('.questionAnswerForm').html(`<div class="correctFeedback"><div class="icon"><img src="${STORE[questionNumber].icon}" alt="${STORE[questionNumber].alt}"/></div><p><b>You got it wrong</b><br>the correct answer is <span>"${correctAnswer}"</span></p><button type=button class="nextButton">Next</button></div>`);
}

function updateScore () {
  changeScore();
  $('.score').text(score);
}

function renderResults () {
  if (score >= 8) {
    $('.questionAnswerForm').html(`<div class="correctFeedback"><h3>Excellent job!</h3><img src="https://i.pinimg.com/564x/e0/2a/fa/e02afa1d402046955a71881a53eddcfe.jpg" alt="justin thumbs up"/><p>You got ${score} / 10</p><p>You're a Tennessee Kid!</p><button class="restartButton">Restart Quiz</button></div>`);
  } else if (score < 8 && score >= 5) {
    $('.questionAnswerForm').html(`<div class="correctFeedback"><h3>So close!</h3><img src="https://cdn.inquisitr.com/wp-content/uploads/2014/03/Justin-Timberlake-James-Van-Der-Beek.jpg" alt="justin shrugging"/><p>You got ${score} / 10</p><p>Keep trying!</p><button class="restartButton">Restart Quiz</button></div>`);
  } else {
    $('.questionAnswerForm').html(`<div class="correctFeedback"><h3>You are clearly not ready to be a Tennessee Kid</h3><img src="https://media.giphy.com/media/BIZkwFtu2xDlS/giphy.gif" alt="unhappy justin gif"/><p>You got ${score} / 10</p><p>Keep trying!</p><button class="restartButton">Restart Quiz</button></div>`);
  }
}  


function renderNextQuestion () {
    $('main').on('click', '.nextButton', function (event) {
      changeQuestionNumber();
      renderQuestion();
    });
}
  
function restartQuiz () {
    $('main').on('click', '.restartButton', function (event) {
      location.reload();
    });
}
  
function createQuiz () {
    startQuiz();
    attachUserSubmitListener();
    renderNextQuestion();
}
  
$(createQuiz);