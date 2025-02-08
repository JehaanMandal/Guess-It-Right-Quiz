document.addEventListener("DOMContentLoaded", () => {
    const questionPlace = document.getElementById("questions");
    const optionPlace = document.getElementById("option");
    const prevBtn = document.getElementById("prev-btn");
    const nextBtn = document.getElementById("next-btn");
    const startBtn = document.getElementById("start-btn");
    const steps = document.getElementById("steps");
    const total = document.getElementById("total"); 
    const answerContainer = document.getElementById("answers-container")

    const questions = [
        {
            question: `Who is considered the "Father of the Nation" in India?`,
            options: ["Jawaharlal Nehru", "Mahatma Gandhi", "B.R. Ambedkar", "Sardar Vallabhbhai Patel"],
            answer: "Mahatma Gandhi",
        },
        {
            question: `What is the capital city of India?`,
            options: ["Mumbai", "Chennai", "Delhi", "Kolkata"],
            answer: "Delhi",
        },
        {
            question: `Who is known as the "Iron Man of India"?`,
            options: ["Sardar Vallabhbhai Patel", "Mahatma Gandhi", "Jawaharlal Nehru", "B.R. Ambedkar"],
            answer: "Sardar Vallabhbhai Patel",
         },
            {
                question: `Who wrote the national anthem of India?`,
                options: ["Rabindranath Tagore", "Bankim Chandra Chatterjee", "Sarojini Naidu", "Subramania Bharati"],
                answer: "Rabindranath Tagore",
            },
            {
                question: `Which is the largest state in India by area?`,
                options: ["Madhya Pradesh", "Maharashtra", "Rajasthan", "Uttar Pradesh"],
                answer: "Rajasthan",
            },
            {
                question: `What is the national animal of India?`,
                options: ["Lion", "Elephant", "Bengal Tiger", "Leopard"],
                answer: "Bengal Tiger",
            },
            {
                question: `Which river is considered the holiest river in India?`,
                options: ["Yamuna", "Godavari", "Ganga", "Brahmaputra"],
                answer: "Ganga",
            },
            {
                question: `Who was the first President of independent India?`,
                options: ["Dr. Rajendra Prasad", "Sardar Patel", "Dr. B.R. Ambedkar", "Jawaharlal Nehru"],
                answer: "Dr. Rajendra Prasad",
            },
            {
                question: `Which festival is known as the "Festival of Lights"?`,
                options: ["Holi", "Eid", "Diwali", "Christmas"],
                answer: "Diwali",
            },
            {
                question: `Which monument is known as the "Symbol of Love" in India?`,
                options: ["Qutub Minar", "Taj Mahal", "India Gate", "Charminar"],
                answer: "Taj Mahal",
            },
            {
                question: `Who was the first Prime Minister of India?`,
                options: ["Indira Gandhi", "Mahatma Gandhi", "Jawaharlal Nehru", "Sardar Patel"],
                answer: "Jawaharlal Nehru",
            },
            {
                question: `Which state is known as the "Spice Garden of India"?`,
                options: ["Kerala", "Tamil Nadu", "Karnataka", "Andhra Pradesh"],
                answer: "Kerala",
            },
            {
                question: `Which Indian freedom fighter is known as "Netaji"?`,
                options: ["Bhagat Singh", "Subhas Chandra Bose", "Chandra Shekhar Azad", "Lala Lajpat Rai"],
                answer: "Subhas Chandra Bose",
            },
            {
                question: `Which is the national bird of India?`,
                options: ["Sparrow", "Peacock", "Kingfisher", "Parrot"],
                answer: "Peacock",
            },
            {
                question: `What is the currency of India?`,
                options: ["Rupee", "Dollar", "Yen", "Euro"],
                answer: "Rupee",
            },
    
        
    ];
    let initialValue = 0;
    let score = 0;
    let userAnswers = new Array(questions.length).fill(null); 

    prevBtn.classList.add("hidden");
    nextBtn.classList.add("hidden");
    answerContainer.classList.add("hidden");

    startBtn.addEventListener("click", (e) => {
        e.preventDefault();
        initialValue = 0;
        score = 0;
        userAnswers.fill(null); 
        startBtn.classList.add("hidden");
        prevBtn.classList.add("hidden");
        nextBtn.classList.remove("hidden");
        questionPlace.classList.remove("hidden");
        optionPlace.classList.remove("hidden");
        answerContainer.classList.add("hidden");
        if (steps) steps.classList.remove("hidden");
        if (total) total.classList.remove("hidden"); 
        answerContainer.innerHTML = "";
        optionPlace.innerHTML = "";
        showQuestion()
    });

    function showQuestion() {
        questionPlace.textContent = questions[initialValue].question;
        optionPlace.innerHTML = "";

        questions[initialValue].options.forEach((option) => {
            const checked = userAnswers[initialValue] === option ? "checked" : "";
            optionPlace.innerHTML += `
                <li>
                    <input type="radio" name="quiz" value="${option}" ${checked}> ${option}
                </li>
            `;
        });

        if (total) total.textContent = initialValue + 1;
        prevBtn.classList.toggle("hidden", initialValue === 0);
        nextBtn.textContent = initialValue === questions.length - 1 ? "Finish" : "Next";
    }

    function calculateScore() {
        score = 0;
        questions.forEach((q, i) => {
            if (userAnswers[i] === q.answer) {
                score++;
            }
        });
        startBtn.classList.remove("hidden"); 
        startBtn.textContent = "Restart Quiz";
    }


    nextBtn.addEventListener("click", function (e) {
        e.preventDefault();
        const selectedOption = document.querySelector('input[name="quiz"]:checked');
        if (selectedOption) {
            userAnswers[initialValue] = selectedOption.value;
        }

        if (initialValue < questions.length - 1) {
            initialValue++;
            showQuestion();
        } else {
            questionPlace.classList.add("hidden");
            optionPlace.classList.add("hidden");
            prevBtn.classList.add("hidden");
            nextBtn.classList.add("hidden");
            showFinalResults();
        }
    });

    prevBtn.addEventListener("click", function (e) {
        e.preventDefault()
        if (initialValue > 0) {
            initialValue--;
            showQuestion();
        }
    });
    
    function showFinalResults() {
        calculateScore();

        if (total) total.classList.add("hidden"); 
        if (steps) steps.classList.add("hidden"); 
        answerContainer.innerHTML = `<h2>Your Score: ${score}/${questions.length}</h2><ul>`;

        questions.forEach((q, i) => {
            let userAnswer = userAnswers[i] || "No Answer";
            let correct = userAnswer === q.answer ? "✅" : "❌";
            answerContainer.innerHTML += `
                <li>${q.question} <br>
                <strong>Your Answer:</strong> ${userAnswer} ${correct} <br>
                <strong>Correct Answer:</strong> ${q.answer}
                </li><hr>
            `;
        });

        answerContainer.innerHTML += `</ul>`;
        answerContainer.classList.remove("hidden");
        prevBtn.classList.add("hidden")
    }
});

  