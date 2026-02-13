// js/main.js

const basePrices = {
  "iPhone 13": 25000,
  "iPhone 12": 18000,
  "Samsung S22": 22000,
  "OnePlus 12": 35000
};

async function submitProduct() {
  const user = await supabase.auth.getUser();
  if (!user.data.user) {
    alert("Please login first");
    return;
  }

  const brand = document.getElementById("brand").value;
  const model = document.getElementById("model").value;
  const file = document.getElementById("image").files[0];

  let score = 100;

  for (let i = 1; i <= 11; i++) {
    const value = document.querySelector(`input[name="q${i}"]:checked`).value;
    if (value === "No") score -= 10;
  }

  const basePrice = basePrices[model] || 10000;
  const resale = Math.floor(basePrice * (score / 100));

  // Upload Image
  const { data } = await supabase.storage
    .from("product-images")
    .upload(Date.now() + file.name, file);

  const imageUrl = supabase.storage
    .from("product-images")
    .getPublicUrl(data.path).data.publicUrl;

  // Insert into products
  const { data: product } = await supabase
    .from("products")
    .insert([{
      user_id: user.data.user.id,
      brand,
      model,
      condition_score: score,
      resale_value: resale,
      image_url: imageUrl
    }])
    .select();

  // Insert answers
  await supabase.from("answers").insert([{
    product_id: product[0].id,
    q1: getAnswer(1),
    q2: getAnswer(2),
    q3: getAnswer(3),
    q4: getAnswer(4),
    q5: getAnswer(5),
    q6: getAnswer(6),
    q7: getAnswer(7),
    q8: getAnswer(8),
    q9: getAnswer(9),
    q10: getAnswer(10),
    q11: getAnswer(11),
  }]);

  alert("Estimated Resale Value: ₹" + resale);
}

function getAnswer(num) {
  return document.querySelector(`input[name="q${num}"]:checked`).value;
}
