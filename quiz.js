const questions = [
  {
    type: 'single',
    question: "What house at Hogwarts does Harry belong to?",
    options: ["Hufflepuff", "Slytherin", "Gryffindor", "Ravenclaw"],
    answer: "Gryffindor"
  },
  {
    type: 'multi',
    question: "Select all the Horcruxes created by Voldemort:",
    options: [
      "Tom Riddle's Diary",
      "Nagini",
      "Hedwig",
      "Marvolo Gaunt's Ring",
      "Harry Potter"
    ],
    answer: ["Tom Riddle's Diary", "Nagini", "Marvolo Gaunt's Ring", "Harry Potter"]
  },
  {
    type: 'fill',
    question: "Who is the headmaster of Hogwarts when Harry first attends?",
    answer: "Albus Dumbledore"
  },
  {
    type: 'single',
    question: "What position does Harry play on the Gryffindor Quidditch team?",
    options: ["Beater", "Keeper", "Seeker", "Chaser"],
    answer: "Seeker"
  },
  {
    type: 'fill',
    question: "What spell is used to disarm an opponent?",
    answer: "Expelliarmus"
  }
];

let currentQuestion = 0;
let score = 0;

const questionDiv = document.getElementById("question");
const optionsDiv = document.getElementById("options");
const fillInput = document.getElementById("fill-blank");
const nextBtn = document.getElementById("next-btn");
const resultBox = document.getElementById("result-box");

function loadQuestion() {
  const q = questions[currentQuestion];
  questionDiv.textContent = `Q${currentQuestion + 1}. ${q.question}`;
  optionsDiv.innerHTML = "";
  fillInput.style.display = "none";
  fillInput.value = "";
  fillInput.placeholder = "";

  if (q.type === "single") {
    q.options.forEach(opt => {
      const div = document.createElement("div");
      div.className = "option";
      div.innerHTML = `<label><input type="radio" name="option" value="${opt}"/> ${opt}</label>`;
      optionsDiv.appendChild(div);
    });
  } else if (q.type === "multi") {
    q.options.forEach(opt => {
      const div = document.createElement("div");
      div.className = "option";
      div.innerHTML = `<label><input type="checkbox" name="option" value="${opt}"/> ${opt}</label>`;
      optionsDiv.appendChild(div);
    });
  } else if (q.type === "fill") {
    fillInput.style.display = "block";
    fillInput.placeholder = "Type your answer...";
  }
}

function checkAnswer() {
  const q = questions[currentQuestion];

  if (q.type === "single") {
    const selected = document.querySelector('input[name="option"]:checked');
    if (selected && selected.value === q.answer) score++;
  } else if (q.type === "multi") {
    const selected = Array.from(document.querySelectorAll('input[name="option"]:checked')).map(el => el.value);
    const correct = q.answer;
    const isCorrect = selected.length === correct.length &&
                      selected.every(v => correct.includes(v));
    if (isCorrect) score++;
  } else if (q.type === "fill") {
    const userAnswer = fillInput.value.trim().toLowerCase();
    if (userAnswer === q.answer.toLowerCase()) score++;
  }
}

nextBtn.onclick = () => {
  checkAnswer();
  currentQuestion++;
  if (currentQuestion < questions.length) {
    loadQuestion();
  } else {
    document.getElementById("quiz-box").style.display = "none";
    resultBox.style.display = "block";
    resultBox.innerHTML = `
      🧙 You scored <strong>${score} / ${questions.length}</strong><br/>
      ${score === questions.length 
        ? "You're a true Hogwarts wizard! 🧹⚡" 
        : "Study harder, young witch or wizard! 📚🪄"}
    `;
  }
};

window.onload = loadQuestion;
