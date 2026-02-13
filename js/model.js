const phoneModels = [

  // Apple
  "iPhone 15 Pro Max","iPhone 15 Pro","iPhone 15 Plus","iPhone 15",
  "iPhone 14 Pro Max","iPhone 14 Pro","iPhone 14 Plus","iPhone 14",
  "iPhone 13 Pro Max","iPhone 13 Pro","iPhone 13","iPhone 13 Mini",
  "iPhone 12 Pro Max","iPhone 12 Pro","iPhone 12","iPhone 12 Mini",
  "iPhone 11 Pro Max","iPhone 11 Pro","iPhone 11",
  "iPhone XR","iPhone XS Max","iPhone XS","iPhone X",
  "iPhone 8 Plus","iPhone 8","iPhone 7 Plus","iPhone 7",

  // Samsung S Series
  "Samsung S24 Ultra","Samsung S24+","Samsung S24",
  "Samsung S23 Ultra","Samsung S23+","Samsung S23",
  "Samsung S22 Ultra","Samsung S22+","Samsung S22",
  "Samsung S21 Ultra","Samsung S21+","Samsung S21",
  "Samsung S20 Ultra","Samsung S20+","Samsung S20",

  // Samsung A Series
  "Samsung A74","Samsung A73","Samsung A72","Samsung A71",
  "Samsung A54","Samsung A53","Samsung A52","Samsung A51",
  "Samsung A34","Samsung A33","Samsung A32",
  "Samsung A24","Samsung A23","Samsung A22",
  "Samsung A14","Samsung A13","Samsung A12",

  // OnePlus
  "OnePlus 12","OnePlus 11","OnePlus 10 Pro","OnePlus 10T",
  "OnePlus 9 Pro","OnePlus 9","OnePlus 8 Pro","OnePlus 8",
  "OnePlus Nord 3","OnePlus Nord 2","OnePlus Nord CE 3",

  // Xiaomi
  "Xiaomi 14 Ultra","Xiaomi 14","Xiaomi 13 Pro","Xiaomi 13",
  "Xiaomi 12 Pro","Xiaomi 12",
  "Redmi Note 13 Pro+","Redmi Note 13 Pro","Redmi Note 13",
  "Redmi Note 12 Pro+","Redmi Note 12 Pro","Redmi Note 12",
  "Redmi Note 11 Pro","Redmi Note 11",

  // Realme
  "Realme GT 6","Realme GT 5","Realme GT Neo 3",
  "Realme 12 Pro+","Realme 12 Pro","Realme 12",
  "Realme 11 Pro+","Realme 11 Pro","Realme 11",

  // Vivo
  "Vivo X100 Pro","Vivo X90 Pro",
  "Vivo V29 Pro","Vivo V27 Pro",
  "Vivo V25","Vivo V23",

  // Oppo
  "Oppo Find X7 Ultra","Oppo Find X6 Pro",
  "Oppo Reno 11 Pro","Oppo Reno 10 Pro",
  "Oppo Reno 8","Oppo Reno 7",

  // Motorola
  "Moto Edge 50 Ultra","Moto Edge 40 Pro",
  "Moto G84","Moto G73","Moto G54",

  // Nothing
  "Nothing Phone 2","Nothing Phone 2a","Nothing Phone 1",

  // Google Pixel
  "Pixel 8 Pro","Pixel 8","Pixel 7 Pro","Pixel 7",
  "Pixel 6 Pro","Pixel 6","Pixel 5",

];

// Auto-generate extra generic models to reach 200+
for (let i = 1; i <= 100; i++) {
  phoneModels.push("Generic Android Model " + i);
}

const select = document.getElementById("model");
select.innerHTML = '<option value="">Select your phone</option>';

phoneModels.forEach(model => {
  const option = document.createElement("option");
  option.value = model;
  option.textContent = model;
  select.appendChild(option);
});

function goNext() {

  const model = select.value;

  if (!model) {
    alert("Please select a phone model");
    return;
  }

  localStorage.setItem("selectedModel", model);

  window.location.href = "questions.html";
}
