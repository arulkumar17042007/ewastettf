const model = localStorage.getItem("selectedModel");

if (!model) {
  window.location.href = "model.html";
}

document.getElementById("modelTitle").innerText =
  "Condition Check - " + model;

let latitude = null;
let longitude = null;

function getLocation() {
  navigator.geolocation.getCurrentPosition(function(pos) {
    latitude = pos.coords.latitude;
    longitude = pos.coords.longitude;
    document.getElementById("locationText").innerText =
      latitude + ", " + longitude;
  });
}

const basePrices = {
  "iPhone": 25000,
  "Samsung": 22000,
  "OnePlus": 20000,
  "Xiaomi": 15000,
  "Realme": 12000,
  "Vivo": 13000,
  "Oppo": 13000,
  "Pixel": 24000,
  "Generic": 8000
};

function detectBrand(modelName) {
  if (modelName.includes("iPhone")) return "iPhone";
  if (modelName.includes("Samsung")) return "Samsung";
  if (modelName.includes("OnePlus")) return "OnePlus";
  if (modelName.includes("Xiaomi") || modelName.includes("Redmi")) return "Xiaomi";
  if (modelName.includes("Realme")) return "Realme";
  if (modelName.includes("Vivo")) return "Vivo";
  if (modelName.includes("Oppo")) return "Oppo";
  if (modelName.includes("Pixel")) return "Pixel";
  return "Generic";
}

const brand = detectBrand(model);
const questionsContainer = document.getElementById("questions");

let questions = [];

// Common questions
questions.push(
  "Is the screen free from cracks?",
  "Is the touch working properly?",
  "Is the battery health good?",
  "Are all buttons working?",
  "Is the speaker clear?",
  "Is the microphone working?",
  "Is WiFi & Bluetooth working?",
  "Is charging port working?",
  "Is camera working properly?",
  "Is phone free from water damage?"
);

// Brand specific questions
if (brand === "iPhone") {
  questions.push(
    "Is Face ID working?",
    "Is iCloud unlocked?",
    "Battery health above 85%?"
  );
}

if (brand === "Samsung") {
  questions.push(
    "Is AMOLED screen free from burn?",
    "Is Knox not triggered?"
  );
}

if (brand === "OnePlus") {
  questions.push(
    "Is fast charging working?",
    "No green line issue?"
  );
}

if (brand === "Xiaomi") {
  questions.push(
    "Is MI account removed?",
    "No motherboard issue?"
  );
}

questions.forEach((q, index) => {
  questionsContainer.innerHTML += `
    <div>
      <p>${q}</p>
      <label><input type="radio" name="q${index}" value="Yes" checked> Yes</label>
      <label><input type="radio" name="q${index}" value="No"> No</label>
    </div>
  `;
});

function getAnswer(i) {
  return document.querySelector(`input[name="q${i}"]:checked`).value;
}

async function submitData() {

  const { data: userData } = await supabaseClient.auth.getUser();
  if (!userData.user) {
    alert("Login required");
    return;
  }

  let score = 100;

  questions.forEach((_, i) => {
    if (getAnswer(i) === "No") score -= 7;
  });

  const basePrice = basePrices[brand] || 10000;
  const resale = Math.max(1000, basePrice * (score / 100));

  const file = document.getElementById("image").files[0];

  let imageUrl = "";

  if (file) {
    const fileName = Date.now() + "_" + file.name;

    await supabaseClient.storage
      .from("product-images")
      .upload(fileName, file);

    const { data } = supabaseClient.storage
      .from("product-images")
      .getPublicUrl(fileName);

    imageUrl = data.publicUrl;
  }

  await supabaseClient.from("products").insert([{
    user_id: userData.user.id,
    model: model,
    brand: brand,
    condition_score: score,
    resale_value: resale,
    image_url: imageUrl,
    latitude: latitude,
    longitude: longitude
  }]);

  alert("Estimated Resale Value: ₹" + Math.round(resale));
}
