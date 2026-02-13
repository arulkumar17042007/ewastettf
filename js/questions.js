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
let userLocation = "Not detected";

function loadQuestion() {

  // If finished all questions
  if (currentIndex >= questions.length) {
    document.getElementById("questionBox").style.display = "none";
    document.querySelector(".navButtons").style.display = "none";
    document.getElementById("finalStep").style.display = "block";
    return;
  }

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
  answers[currentIndex] =
    parseInt(document.getElementById("answer").value);

  currentIndex++;
  loadQuestion();
}

function prevQuestion() {
  if (currentIndex > 0) {
    currentIndex--;
    loadQuestion();
  }
}

// LOCATION
function getLocation() {

  if (!navigator.geolocation) {
    document.getElementById("locationText").innerText =
      "Geolocation not supported";
    return;
  }

  document.getElementById("locationText").innerText =
    "Detecting location...";

  navigator.geolocation.getCurrentPosition(
    function (position) {

      userLocation =
        "Latitude: " + position.coords.latitude +
        " | Longitude: " + position.coords.longitude;

      document.getElementById("locationText").innerText =
        userLocation;
    },
    function () {
      document.getElementById("locationText").innerText =
        "Location permission denied";
    }
  );
}

// SUBMIT
async function submitAnswers() {

  const basePrice = 10000;
  const deduction = answers.reduce((a, b) => a + (b || 0), 0);
  const finalPrice = basePrice + deduction;

  const files = document.getElementById("deviceImages").files;
  let imageUrls = [];

  for (let file of files) {
    const fileName = Date.now() + "-" + file.name;

    const { error } = await supabaseClient.storage
      .from("device-images")
      .upload(fileName, file);

    if (!error) {
      const { data } = supabaseClient.storage
        .from("device-images")
        .getPublicUrl(fileName);

      imageUrls.push(data.publicUrl);
    }
  }

  const model = localStorage.getItem("selectedModel");

  await supabaseClient.from("submissions").insert([
    {
      model: model,
      answers: answers,
      price: finalPrice,
      location: userLocation,
      images: imageUrls
    }
  ]);

  document.getElementById("priceResult").innerText =
    "Estimated Resale Value: ₹" + finalPrice;
}

loadQuestion();
