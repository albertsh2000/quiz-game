// start screen
const startContainer = document.querySelector(".start-container")
const startBtn = document.querySelector("#start")

// quiz screen
const quiz = document.querySelector(".quiz-container")
const questionText = document.querySelector("#question-text")
const allAnswers = document.querySelectorAll(".answer")
const submitBtn = document.querySelector(".submit-btn")
const questionNumber = document.querySelector("#question-number")
const displayTimer = document.querySelector("#time")

// get all options from dom
const a_text = document.querySelector("#a-text")
const b_text = document.querySelector("#b-text")
const c_text = document.querySelector("#c-text")
const d_text = document.querySelector("#d-text")

// get modal from dom
const modalContainer = document.querySelector('#modal-container');
const reloadBtn = document.querySelector("#reload")

// initial values
let currentQuiz = 0
let score = 0
let questionCounter = 1
let timerCount = 0

function startQuiz() {
    startBtn.addEventListener("click", () => {
        quiz.classList.add("show")
        startContainer.classList.add("hide")
        loadQuiz()
        countDownTimer()
    })
}

function loadQuiz() {
    deselectAnswer()
    const quizCurrentData = quizData[currentQuiz]
    questionNumber.innerHTML = "Question " + (questionCounter) + " of " + quizData.length
    questionText.innerText = quizCurrentData.question
    a_text.innerText = quizCurrentData.a
    b_text.innerText = quizCurrentData.b
    c_text.innerText = quizCurrentData.c
    d_text.innerText = quizCurrentData.d
}

function deselectAnswer() {
    return allAnswers.forEach((answer) => answer.checked = false)
}

function getSelected() {
    let selectedAnswer
    allAnswers.forEach((answer) => {
        if (answer.checked) {
            selectedAnswer = answer.id
        }
    })
    return selectedAnswer
}

function checkAnswer() {
    const answer = getSelected()
    if (answer === quizData[currentQuiz].correct) {
        score++
    }
    if (answer) {
        currentQuiz++
        questionCounter++
    }
    if (currentQuiz < quizData.length) {
        loadQuiz()
    } else {
        quiz.innerHTML = ` 
    		<h2 class>You Answered ${score}/${quizData.length} questions correctly</h2>
            <div class="submit-container">
    		    <button id="reload" onclick ="location.reload()">Reload</button>
            </div>
    			 `
        quiz.classList.add("result")
    }
}

submitBtn.addEventListener("click", checkAnswer)

function reload() {
    return reloadBtn.addEventListener("click", () => {
        return window.location.reload()
    })
}

reload()

function countDownTimer() {
    let duration = 60 * 7
    let minutes
    let seconds
    setInterval(function() {
        minutes = parseInt(duration / 60, 10);
        seconds = parseInt(duration % 60, 10);
        minutes = minutes < 10 ? "0" + minutes : minutes;
        seconds = seconds < 10 ? "0" + seconds : seconds;
        displayTimer.textContent = minutes + ":" + seconds;

        if (duration-- <= 0) {
            displayTimer.innerText = "00:00";
            modalContainer.classList.add("show")
            submitBtn.classList.add("disable")
        }
    }, 1000);
}

startQuiz()