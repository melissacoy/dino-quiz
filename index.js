'use strict';
let questionNum = 0;
let score = 0;


function startQuiz () {
    $('.start-quiz').on('click', '.start-button', function(event) {
        $('.start-quiz').remove();
        $('.questionAnswerForm').css('display', 'block');
        $('.questionNum').text(1);
    })
}

function generateQuestion () {
    if (questionNum < STORE.length) {
        return `
        <form class="question-form">
         <fieldset>
         <legend><h2 class="question-banner">${STORE[questionNum].question}</h2></legend>
            <div class="radioChoices">
            <label class="answerOption">
            <input id="answerChoice" type="radio" name="answerChoice" class="options" value="${STORE[questionNum].answers[0]}" required checked>
            ${STORE[questionNum].answers[0]}
            </label><br>
            <label class="answerOption">
            <input id="answerChoice" type="radio" name="answerChoice" class="options" value="${STORE[questionNum].answers[1]}" required>
            ${STORE[questionNum].answers[1]}
            </label><br>
            <label class="answerOption">
            <input id="answerChoice" type="radio" name="answerChoice" class="options" value="${STORE[questionNum].answers[2]}" required>
            ${STORE[questionNum].answers[2]}
            </label><br>
            <label class="answerOption">
            <input id ="answerChoice" type="radio" name="answerChoice" class="options" value="${STORE[questionNum].answers[3]}" required>
            ${STORE[questionNum].answers[3]}
            </label>
            </div>
            <button type="button" class="submitQuestion">SUBMIT</button>
        </fieldset>
      </form>
    </div>
        `
    }
    else {
        renderResults();
        restartQuiz()
        $('.questionNum').text(10);
    }
}



function renderQuestion () {
    $('.questionAnswerForm').html(generateQuestion());
  }
 

function updateQuestionNum () {
    questionNum ++;
    $('.questionNum').text(questionNum + 1)
}

function changeScore () {
    score ++;
}



function selectAnswer () {
    $('form').on('click', '.submitQuestion', function(event) {
      event.preventDefault();
      let selected = $('input:checked');
      let answer = selected.val();
      let correctAnswer = `${STORE[questionNum].correctAnswer}`;
      if (answer === correctAnswer) {
       answerCorrect();
      }
      else {
        answerWrong();
      }
    });
  }



  function answerCorrect () {
    userAnswerCorrect();
    updateScore();
  }

  function answerWrong() {
    userAnswerWrong();
  }

function userAnswerCorrect () {
      let correctAnswer = `${STORE[questionNum].correctAnswer}`;
      $('.questionAnswerForm').html(`
      <div class="correctFeedback">
       </div>
       <header class="correct">You Got it Right!</header>
       <button type="button" class="nextButton">NEXT</button>
       </div>`);
  }
  


  function userAnswerWrong () {
      let correctAnswer = `${STORE[questionNum].correctAnswer}`;
      $('.questionAnswerForm').html(`
      <div class="wrongFeedback">
    
        <p>Not quite...</p>
        <p>The correct answer is: <br> <span>"${correctAnswer}"</span></p>
        <button type="button" class="nextButton">NEXT</button>
        </div>`);
  }


  function updateScore () {
      changeScore ();
      $('.score').text(score);
      }



function renderResults () {
$('.questionAnswerForm').html(`
  <p>YOUR FINAL SCORE:
  <br>
  ${score} OUT OF 10</p>
  <button type="button" class="restartButton">Restart</button>
 </div>
`
);
}

function renderNextQuestion () {
    $('main').on('click', '.nextButton', function(event) {
      updateQuestionNum();
      renderQuestion();
      selectAnswer();
    });
  }
  
  function restartQuiz () {
    $('main').on('click', '.restartButton', function (event) {
      location.reload();

    });
  }

  

  function createQuiz () {
    startQuiz();
    renderQuestion();
    selectAnswer();
    renderNextQuestion();
  }
 
  
  $(createQuiz);
  