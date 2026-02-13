const basePrices = {
  "iPhone 13": 25000,
  "iPhone 12": 18000,
  "Samsung S22": 22000,
  "OnePlus 12": 35000
};

let latitude = null;
let longitude = null;

const qContainer = document.getElementById("questions");

for (let i = 1; i <= 11; i++) {
  qContainer.innerHTML += `
    <div>
      <p>Question ${i}</p>
      <label><input type="radio" name="q${i}" value="Yes" checked> Yes</label>
      <label><input type="radio" name="q${i}" value="No"> No</label>
    </div>
  `;
}

function getLocation() {
  navigator.geolocation.getCurrentPosition(function(pos) {
    latitude = pos.coords.latitude;
    longitude = pos.coords.longitude;
    document.getElementById("locationText").innerText =
      latitude + ", " + longitude;
  });
}

function getAnswer(i) {
  return document.querySelector(`input[name="q${i}"]:checked`).value;
}

async function submitData() {

  const { data: userData } = await supabase.auth.getUser();
  if (!userData.user) {
    alert("Login required");
    return;
  }

  const model = localStorage.getItem("model");

  let score = 100;
  for (let i = 1; i <= 11; i++) {
    if (getAnswer(i) === "No") score -= 10;
  }

  const resale = Math.max(1000, basePrices[model] * (score / 100));

  const file = document.getElementById("image").files[0];
  const fileName = Date.now() + "_" + file.name;

  await supabase.storage
    .from("product-images")
    .upload(fileName, file);

  const { data } = supabase.storage
    .from("product-images")
    .getPublicUrl(fileName);

  await supabase.from("products").insert([{
    user_id: userData.user.id,
    model,
    condition_score: score,
    resale_value: resale,
    image_url: data.publicUrl,
    latitude,
    longitude
  }]);

  alert("Estimated Value: ₹" + resale);
}
