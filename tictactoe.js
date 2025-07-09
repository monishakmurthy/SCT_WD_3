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
  }
}

function checkAnswer() {
  const q = questions[currentQuestion];
  let userAnswer;

  if (q.type === "single") {
    const selected = document.querySelector('input[name="option"]:checked');
    if (selected && selected.value === q.answer) score++;
  } else if (q.type === "multi") {
    const selected = Array.from(document.querySelectorAll('input[name="option"]:checked')).map(el => el.value);
    if (selected.length === q.answer.length && selected.every(v => q.answer.includes(v))) score++;
  } else if (q.type === "fill") {
    const user = fillInput.value.trim().toLowerCase();
    if (user === q.answer.toLowerCase()) score++;
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
      ${score === questions.length ? "You're a true Hogwarts wizard! 🧹" : "Study harder, young wizard! 📚"}
    `;
  }
};

window.onload = loadQuestion;
