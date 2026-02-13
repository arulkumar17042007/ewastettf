const questions = [
  "Is the screen cracked?",
  "Is the battery working properly?",
  "Does the camera work?",
  "Is the speaker working?",
  "Are buttons functioning?",
  "Is charging port working?",
  "Is fingerprint sensor working?",
  "Any water damage?",
  "Is display original?",
  "Overall physical condition?"
];

let currentIndex = 0;
let answers = [];

function loadQuestion() {
  const box = document.getElementById("questionBox");
  box.innerHTML = `
    <p>${questions[currentIndex]}</p>
    <select id="answer">
      <option value="0">Good</option>
      <option value="-500">Minor Issue</option>
      <option value="-1000">Major Issue</option>
    </select>
  `;
}

function nextQuestion() {
  const answerValue = document.getElementById("answer").value;
  answers[currentIndex] = parseInt(answerValue);

  if (currentIndex < questions.length - 1) {
    currentIndex++;
    loadQuestion();
  }
}

function prevQuestion() {
  if (currentIndex > 0) {
    currentIndex--;
    loadQuestion();
  }
}

function submitAnswers() {
  const basePrice = 10000;
  const deduction = answers.reduce((a, b) => a + (b || 0), 0);
  const finalPrice = basePrice + deduction;

  document.getElementById("priceResult").innerText =
    "Estimated Resale Value: ₹" + finalPrice;
}

loadQuestion();
