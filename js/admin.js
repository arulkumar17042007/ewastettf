// js/admin.js

async function loadProducts() {
  const { data } = await supabase.from("products").select("*");

  const container = document.getElementById("products");
  container.innerHTML = "";

  data.forEach(item => {
    container.innerHTML += `
      <div class="card">
        <img src="${item.image_url}" width="150">
        <h3>${item.model}</h3>
        <p>Score: ${item.condition_score}</p>
        <p>Resale: ₹${item.resale_value}</p>
        <hr>
      </div>
    `;
  });
}

loadProducts();
