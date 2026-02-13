let currentIndex = 0;
let answers = [];

const questions = [
  {
    question: "Is the phone powering on?",
    options: [
      { text: "Yes", value: 0 },
      { text: "No", value: -4000 }
    ]
  },
  {
    question: "Screen condition?",
    options: [
      { text: "No scratches", value: 0 },
      { text: "Minor scratches", value: -500 },
      { text: "Cracked", value: -2000 }
    ]
  },
  {
    question: "Battery health?",
    options: [
      { text: "Good", value: 0 },
      { text: "Average", value: -800 },
      { text: "Poor", value: -1500 }
    ]
  },
  {
    question: "Are all buttons working?",
    options: [
      { text: "Yes", value: 0 },
      { text: "No", value: -700 }
    ]
  },
  {
    question: "Any water damage?",
    options: [
      { text: "No", value: 0 },
      { text: "Yes", value: -2500 }
    ]
  }
];

function loadQuestion() {

  const container = document.getElementById("questionContainer");
  container.innerHTML = "";

  // If all questions finished → show location & image step
  if (currentIndex >= questions.length) {
    showFinalStep();
    return;
  }

  const q = questions[currentIndex];

  const title = document.createElement("h3");
  title.innerText = q.question;

  const select = document.createElement("select");
  select.id = "answer";

  q.options.forEach(opt => {
    const option = document.createElement("option");
    option.text = opt.text;
    option.value = opt.value;
    select.appendChild(option);
  });

  // Restore previous answer if exists
  if (answers[currentIndex] !== undefined) {
    select.value = answers[currentIndex];
  }

  const navDiv = document.createElement("div");
  navDiv.style.marginTop = "20px";

  if (currentIndex > 0) {
    const prevBtn = document.createElement("button");
    prevBtn.innerText = "Previous";
    prevBtn.onclick = prevQuestion;
    navDiv.appendChild(prevBtn);
  }

  const nextBtn = document.createElement("button");
  nextBtn.innerText = "Next";
  nextBtn.style.marginLeft = "10px";
  nextBtn.onclick = nextQuestion;
  navDiv.appendChild(nextBtn);

  container.appendChild(title);
  container.appendChild(select);
  container.appendChild(navDiv);
}

function nextQuestion() {

  const answerElement = document.getElementById("answer");
  answers[currentIndex] = parseInt(answerElement.value);

  currentIndex++;
  loadQuestion();
}

function prevQuestion() {
  currentIndex--;
  loadQuestion();
}

function showFinalStep() {

  const container = document.getElementById("questionContainer");
  container.innerHTML = `
    <h3>Share Location</h3>
    <button onclick="getLocation()">Get My Location</button>
    <p id="locationText"></p>

    <h3>Upload Phone Image</h3>
    <input type="file" id="phoneImage" accept="image/*">

    <br><br>
    <button onclick="submitAnswers()">Submit</button>

    <h2 id="priceResult"></h2>
  `;
}

function getLocation() {
  if (navigator.geolocation) {
    navigator.geolocation.getCurrentPosition(position => {
      const lat = position.coords.latitude;
      const lon = position.coords.longitude;
      document.getElementById("locationText").innerText =
        "Latitude: " + lat + " | Longitude: " + lon;
    });
  } else {
    alert("Geolocation not supported");
  }
}

function submitAnswers() {

  const basePrice = 10000;

  const deduction = answers.reduce((total, value) => {
    return total + (value || 0);
  }, 0);

  const finalPrice = basePrice + deduction;

  document.getElementById("priceResult").innerText =
    "Estimated Resale Value: ₹" + finalPrice;

  // Redirect after 4 seconds
  setTimeout(() => {
    answers = [];
    currentIndex = 0;
    window.location.href = "index.html";
  }, 4000);
}

window.onload = loadQuestion;
