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

  // Show resale value
  document.getElementById("priceResult").innerText =
    "Estimated Resale Value: ₹" + finalPrice;

  // Wait 3 seconds then go back to first page
  setTimeout(() => {
    localStorage.clear();   // clear selected model
    window.location.href = "index.html";
  }, 3000);
}
