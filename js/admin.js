async function loadProducts() {

  const { data } = await supabase
    .from("products")
    .select("*");

  const container = document.getElementById("products");

  data.forEach(p => {
    container.innerHTML += `
      <div class="product">
        <p><b>Model:</b> ${p.model}</p>
        <p><b>Resale:</b> ₹${p.resale_value}</p>
        <p><b>Score:</b> ${p.condition_score}</p>
        <p><b>Location:</b> ${p.latitude}, ${p.longitude}</p>
        <img src="${p.image_url}" width="150">
        <hr>
      </div>
    `;
  });
}

loadProducts();
