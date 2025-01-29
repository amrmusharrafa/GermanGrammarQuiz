const quizQuestions = [
    {
        question: "Welches ist der richtige Artikel im Akkusativ? „Ich sehe ___ Hund.“",
        choices: ["der", "den", "die", "das"],
        correctAnswer: "den",
        difficulty: "easy"
    },
    {
        question: "Welches Pronomen ist im Dativ richtig? „Ich gebe ___ (du) das Buch.“",
        choices: ["dir", "dich", "du", "dein"],
        correctAnswer: "dir",
        difficulty: "medium"
    },
    {
        question: "Welcher Fall ist in diesem Satz korrekt? „Das Geschenk gehört ___ (meine Mutter).“",
        choices: ["Nominativ", "Akkusativ", "Dativ", "Genitiv"],
        correctAnswer: "Genitiv",
        difficulty: "hard"
    },
    {
        question: "Was ist der richtige Artikel im Nominativ? „___ Tisch ist groß.“",
        choices: ["Der", "Die", "Das", "Den"],
        correctAnswer: "Der",
        difficulty: "easy"
    },
    {
        question: "Welches Verb erfordert den Akkusativ?",
        choices: ["helfen", "glauben", "fragen", "gehören"],
        correctAnswer: "fragen",
        difficulty: "medium"
    },
    {
        question: "Wählen Sie das richtige Reflexivpronomen im Dativ: „Ich kaufe ___ (ich) ein neues Auto.“",
        choices: ["mir", "mich", "du", "dir"],
        correctAnswer: "mir",
        difficulty: "medium"
    },
    {
        question: "Welcher Satz ist im Genitiv korrekt?",
        choices: [
            "Ich fahre mit dem Auto meines Freundes.",
            "Ich fahre mit das Auto von meinem Freund.",
            "Ich fahre mit einem Auto von meinem Freund.",
            "Ich fahre mit Auto meines Freundes."
        ],
        correctAnswer: "Ich fahre mit dem Auto meines Freundes.",
        difficulty: "hard"
    },
    {
        question: "Welches Verb erfordert den Dativ?",
        choices: ["sehen", "sagen", "antworten", "verstehen"],
        correctAnswer: "antworten",
        difficulty: "medium"
    },
    {
        question: "Welches ist der richtige Artikel im Genitiv? „Die Blätter ___ (der Baum) sind grün.“",
        choices: ["des", "dem", "der", "den"],
        correctAnswer: "des",
        difficulty: "hard"
    },
    {
        question: "Welche Präposition verlangt den Akkusativ?",
        choices: ["mit", "bei", "durch", "seit"],
        correctAnswer: "durch",
        difficulty: "easy"
    },
    {
        question: "Welche Form des Verbs ist im Dativ korrekt? „Er hilft ___ (ich).“",
        choices: ["mich", "mir", "mich zu", "mir zu"],
        correctAnswer: "mir",
        difficulty: "medium"
    },
    {
        question: "Was ist der richtige Artikel im Akkusativ? „Ich sehe ___ (die) Kinder im Park.“",
        choices: ["der", "das", "die", "den"],
        correctAnswer: "die",
        difficulty: "easy"
    },
    {
        question: "Welcher Fall ist im folgenden Satz korrekt? „Das Haus meiner Eltern ist alt.“",
        choices: ["Nominativ", "Akkusativ", "Dativ", "Genitiv"],
        correctAnswer: "Genitiv",
        difficulty: "medium"
    },
    {
        question: "Welches Pronomen ist im Nominativ richtig? „___ (er) ist mein Freund.“",
        choices: ["ihn", "sein", "er", "ihn"],
        correctAnswer: "er",
        difficulty: "easy"
    },
    {
        question: "Welches Verb erfordert den Genitiv?",
        choices: ["gehören", "fragen", "danken", "sprechen"],
        correctAnswer: "gehören",
        difficulty: "hard"
    }
];


const questionContainer = document.getElementById("question-container");
const questionElement = document.getElementById("question");
const choicesElement = document.getElementById("choices");
const submitButton = document.getElementById("submit");
const resultElement = document.getElementById("result");
const progressBarContainer = document.getElementById("progress-bar-container");
const progressBar = document.getElementById("progress-bar");
const timerElement = document.getElementById("timer");
const h1Element = document.querySelector('h1');
const retakeButton = document.getElementById("retake");
const resultModal = document.getElementById("result-modal");
const finalResultElement = document.getElementById("final-result");
const closeModal = document.querySelector(".close");

let currentQuestionIndex = 0;
let score = 0;
let timeLeft = 1350; // 22.5 minutes
let timerInterval;

function shuffleArray(array) {
    for (let i = array.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [array[i], array[j]] = [array[j], array[i]];
    }
}

shuffleArray(quizQuestions);

function updateProgressBar() {
    const progress = (currentQuestionIndex / quizQuestions.length) * 100;
    document.getElementById('progress-bar').style.width = `${progress}%`;
}

function startTimer() {
    clearInterval(timerInterval);
    timerInterval = setInterval(() => {
        timeLeft--;
        document.getElementById('timer').textContent = formatTime(timeLeft);
        if (timeLeft <= 0) {
            clearInterval(timerInterval);
            showResult();
        }
    }, 1000);
}

function formatTime(time) {
    const minutes = Math.floor(time / 60);
    const seconds = time % 60;
    return `${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`;
}

function displayQuestion() {
    const currentQuestion = quizQuestions[currentQuestionIndex];
    questionElement.textContent = currentQuestion.question;
    choicesElement.innerHTML = "";
    currentQuestion.choices.forEach((choice, index) => {
        const li = document.createElement("li");
        li.innerHTML = `<input type="radio" name="choice" value="choice${index + 1}"> <span>${choice}</span>`;
        choicesElement.appendChild(li);
    });

    updateProgressBar();
}

function checkAnswer() {
    const selectedChoice = document.querySelector("input[name='choice']:checked");
    if (!selectedChoice) return;

    const userAnswer = selectedChoice.value;
    const currentQuestion = quizQuestions[currentQuestionIndex];

    if (userAnswer === `choice${currentQuestion.choices.indexOf(currentQuestion.correctAnswer) + 1}`) {
        score++;
        resultElement.textContent = "Correct!";
        resultElement.style.color = "green";
    } else {
        resultElement.textContent = `Incorrect! The correct answer is ${currentQuestion.correctAnswer}`;
        resultElement.style.color = "red";
    }

    currentQuestionIndex++;

    if (currentQuestionIndex < quizQuestions.length) {
        setTimeout(() => {
            displayQuestion();
            resultElement.textContent = "";
        }, 2000);
    } else {
        showResult();
    }
}

function showResult() {
    clearInterval(timerInterval);
    questionContainer.style.display = "none";
    submitButton.style.display = "none";
    h1Element.style.display = "none";
    resultElement.textContent = `You scored ${score} out of ${quizQuestions.length}!`;
    finalResultElement.textContent = resultElement.textContent;
    resultModal.style.display = "block";
}

retakeButton.addEventListener("click", () => {
    currentQuestionIndex = 0;
    score = 0;
    timeLeft = 1350;
    timerElement.textContent = formatTime(timeLeft);

    clearInterval(timerInterval);
    startTimer();

    h1Element.style.display = "block";
    questionContainer.style.display = "block";
    displayQuestion();
    resultElement.textContent = "";
    retakeButton.style.display = "none";
    submitButton.style.display = "block";

    resultModal.style.display = "none";
});

closeModal.addEventListener("click", () => {
    resultModal.style.display = "none";
});

submitButton.addEventListener("click", checkAnswer);

displayQuestion();
startTimer();
