document.addEventListener("DOMContentLoaded", () => {
    const questionPlace = document.getElementById("questions");
    const optionPlace = document.getElementById("option");
    const prevBtn = document.getElementById("prev-btn");
    const nextBtn = document.getElementById("next-btn");
    const startBtn = document.getElementById("start-btn");
    const answerContainer = document.getElementById("answers-container");

    const questions = [
        {
            question: "What is the purpose of the 'alt' attribute in an 'img' tag?",
            options: [
                "To define the image's alignment",
                "To provide alternative text for screen readers",
                "To specify the image's source",
                "To add a caption to the image",
            ],
            answer: "To provide alternative text for screen readers",
        },
        {
            question: "Which CSS property is used to control the spacing between elements?",
            options: ["margin", "padding", "border-spacing", "space"],
            answer: "margin",
        },
        {
            question: "What is the difference between 'display: none;' and 'visibility: hidden;' in CSS?",
            options: [
                "No difference",
                "display: none; removes the element from the document flow, visibility: hidden; keeps the space",
                "visibility: hidden; removes the element from the document flow, display: none; keeps the space",
                "display: none; is for text, visibility: hidden; is for images",
            ],
            answer: "display: none; removes the element from the document flow, visibility: hidden; keeps the space",
        },
        {
            question: "What is the purpose of the 'defer' attribute in a 'script' tag?",
            options: [
                "To execute the script immediately",
                "To execute the script after the HTML is parsed, in the order they appear",
                "To execute the script after the entire page is loaded",
                "To prevent the script from executing",
            ],
            answer: "To execute the script after the HTML is parsed, in the order they appear",
        },
        {
            question: "What is the purpose of the 'z-index' property in CSS?",
            options: [
                "To control the transparency of an element",
                "To control the stacking order of positioned elements",
                "To control the zoom level of an element",
                "To control the element's position on the z-axis",
            ],
            answer: "To control the stacking order of positioned elements",
        },
        {
            question: "What is the purpose of the 'localStorage' API in JavaScript?",
            options: [
                "To store data on the server",
                "To store data in the browser that persists across sessions",
                "To store temporary data in the browser",
                "To store data in a database",
            ],
            answer: "To store data in the browser that persists across sessions",
        },
        {
            question: "What is the purpose of the 'async' attribute in a 'script' tag?",
            options: [
                "To execute the script immediately",
                "To execute the script after the HTML is parsed, in the order they appear",
                "To execute the script after the entire page is loaded",
                "To execute the script asynchronously as soon as it's available",
            ],
            answer: "To execute the script asynchronously as soon as it's available",
        },
        {
            question: "What is the purpose of the 'Viewport' meta tag?",
            options: [
                "To set the page's background color",
                "To control the page's layout on different devices",
                "To define the page's title",
                "To load external CSS files",
            ],
            answer: "To control the page's layout on different devices",
        },
        {
            question: "What is the purpose of 'CSS Grid'?",
            options: [
                "To create 3D layouts",
                "To create two-dimensional layouts for web pages",
                "To create animations",
                "To style form elements",
            ],
            answer: "To create two-dimensional layouts for web pages",
        },
        {
            question: "What is the difference between 'inline', 'block', and 'inline-block' elements in CSS?",
            options: [
                "No difference",
                "inline: no line break, block: line break, inline-block: combination",
                "block: no line break, inline: line break, inline-block: combination",
                "inline: for text, block: for images, inline-block: for forms",
            ],
            answer: "inline: no line break, block: line break, inline-block: combination",
        },
    ];

    let initialValue = 0;
    let score = 0;
    let userAnswers = new Array(questions.length).fill(null);

    prevBtn.classList.add("hidden");
    nextBtn.classList.add("hidden");
    answerContainer.classList.add("hidden");
    questionPlace.classList.add("hidden");
    optionPlace.classList.add("hidden");

    startBtn.addEventListener("click", () => {
        restartQuiz();
    });

    function restartQuiz() {
        initialValue = 0;
        score = 0;
        userAnswers.fill(null);
        startBtn.classList.add("hidden");
        prevBtn.classList.remove("hidden");
        nextBtn.classList.remove("hidden");
        questionPlace.classList.remove("hidden");
        optionPlace.classList.remove("hidden");
        answerContainer.classList.add("hidden");
        showQuestion();
    }

    function showQuestion() {
        questionPlace.textContent = questions[initialValue].question;
        optionPlace.innerHTML = "";

        questions[initialValue].options.forEach((option) => {
            const checked = userAnswers[initialValue] === option ? "checked" : "";
            optionPlace.innerHTML += `
                <li data-option="${option}">
                    <input type="radio" name="quiz" value="${option}" ${checked}> ${option}
                </li>
            `;
        });

        const listItems = optionPlace.querySelectorAll("li");
        listItems.forEach((listItem) => {
            listItem.addEventListener("click", () => {
                const radio = listItem.querySelector('input[type="radio"]');
                if (radio) {
                    radio.click();
                }
            });
        });

        const radioInputs = optionPlace.querySelectorAll('input[type="radio"]');
        radioInputs.forEach((radio) => {
            radio.addEventListener('change', (event) => {
                userAnswers[initialValue] = event.target.value;
            });
        });
    }

    nextBtn.addEventListener("click", () => {
        if (initialValue < questions.length - 1) {
            initialValue++;
            showQuestion();
        } else {
            showFinalResults();
        }
    });

    prevBtn.addEventListener("click", () => {
        if (initialValue > 0) {
            initialValue--;
            showQuestion();
        }
    });

    function showFinalResults() {
        score = userAnswers.filter((answer, i) => answer === questions[i].answer).length;
        questionPlace.classList.add("hidden");
        optionPlace.classList.add("hidden");
        prevBtn.classList.add("hidden");
        nextBtn.classList.add("hidden");
        answerContainer.classList.remove("hidden");

        let resultsHTML = `<h2>Your Score: ${score}/${questions.length}</h2>`;

        for (let i = 0; i < questions.length; i++) {
            const userAnswer = userAnswers[i];
            const correctAnswer = questions[i].answer;
            const isCorrect = userAnswer === correctAnswer;

            resultsHTML += `
                <p>
                    <strong>Question ${i + 1}:</strong> ${questions[i].question}<br>
                    Your Answer: ${userAnswer || "Not Answered"}<br>
                    Correct Answer: ${correctAnswer}<br>
                    Result: ${isCorrect ? "Correct" : "Wrong"}
                </p>
            `;
        }

        answerContainer.innerHTML = resultsHTML;
        startBtn.classList.remove("hidden");
        startBtn.textContent = "Restart Quiz";
    }
});
