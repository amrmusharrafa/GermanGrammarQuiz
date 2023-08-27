const quizQuestions = [
    {
        question: "What is the capital of France?",
        choices: ["London", "Madrid", "Paris"],
        correctAnswer: "Paris"
    },
    {
        question: "Which planet is known as the Red Planet?",
        choices: ["Mars", "Jupiter", "Venus"],
        correctAnswer: "Mars"
    },

    {
        question: "Fruit or vegetable: tomato ?",
        choices: ["Fruit", "Vegetables"],
        correctAnswer: "Fruit"
    },

    {
        question: "Fruit or vegetable: broccoli ?",
        choices: ["Fruit", "Vegetables"],
        correctAnswer: "Vegetables"
    },

    {
        question: "Fruit or vegetable: olive ?",
        choices: ["Fruit", "Vegetables"],
        correctAnswer: "Fruit"
    }
    
];

const questionContainer = document.getElementById("question-container");
const questionElement = document.getElementById("question");
const choicesElement = document.getElementById("choices");
const submitButton = document.getElementById("submit");
const resultElement = document.getElementById("result");
const h1Element = document.querySelector('h1');


let currentQuestionIndex = 0;
let score = 0;
// Add an event listener for the "Retake Quiz" button
const retakeButton = document.getElementById("retake");


retakeButton.addEventListener("click", () => {

    currentQuestionIndex = 0;
    score = 0;

    h1Element.style.display = "block";
    questionContainer.style.display = "block";
    displayQuestion();
    submitButton.addEventListener("click", checkAnswer);
    resultElement.textContent = "";
    retakeButton.style.display = "none";
    
    submitButton.style.display = "block";
    
});

function displayQuestion() {
    const currentQuestion = quizQuestions[currentQuestionIndex];
    questionElement.textContent = currentQuestion.question;

    // Populate answer choices
    choicesElement.innerHTML = "";
    currentQuestion.choices.forEach((choice, index) => {
        const li = document.createElement("li");
        li.innerHTML = `<input type="radio" name="choice" value="choice${index + 1}"> <span>${choice}</span>`;
        choicesElement.appendChild(li);
    });
}

function checkAnswer() {
    const selectedChoice = document.querySelector("input[name='choice']:checked");
    if (!selectedChoice) return;

    const userAnswer = selectedChoice.value;
    const currentQuestion = quizQuestions[currentQuestionIndex];

    if (userAnswer === `choice${currentQuestion.choices.indexOf(currentQuestion.correctAnswer) + 1}`) {
        score++;
    }

    currentQuestionIndex++;

    if (currentQuestionIndex < quizQuestions.length) {
        displayQuestion();
    } else {
        showResult();
    }
}

function showResult() {
    questionContainer.style.display = "none";
    submitButton.style.display = "none";
    h1Element.style.display = "none";
    resultElement.textContent = `You scored ${score} out of ${quizQuestions.length}!`;
    retakeButton.style.display = "block"; // Display the "Retake Quiz" button
}

displayQuestion();
submitButton.addEventListener("click", checkAnswer);

