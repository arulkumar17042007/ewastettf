const models = [

  // Apple (30+)
  "iPhone 6",
  "iPhone 6 Plus",
  "iPhone 6s",
  "iPhone 6s Plus",
  "iPhone 7",
  "iPhone 7 Plus",
  "iPhone 8",
  "iPhone 8 Plus",
  "iPhone X",
  "iPhone XR",
  "iPhone XS",
  "iPhone XS Max",
  "iPhone 11",
  "iPhone 11 Pro",
  "iPhone 11 Pro Max",
  "iPhone SE (2020)",
  "iPhone 12",
  "iPhone 12 Mini",
  "iPhone 12 Pro",
  "iPhone 12 Pro Max",
  "iPhone 13",
  "iPhone 13 Mini",
  "iPhone 13 Pro",
  "iPhone 13 Pro Max",
  "iPhone 14",
  "iPhone 14 Plus",
  "iPhone 14 Pro",
  "iPhone 14 Pro Max",
  "iPhone 15",
  "iPhone 15 Plus",
  "iPhone 15 Pro",
  "iPhone 15 Pro Max",

  // Samsung Galaxy S Series (25+)
  "Samsung Galaxy S8",
  "Samsung Galaxy S8+",
  "Samsung Galaxy S9",
  "Samsung Galaxy S9+",
  "Samsung Galaxy S10",
  "Samsung Galaxy S10+",
  "Samsung Galaxy S10e",
  "Samsung Galaxy S20",
  "Samsung Galaxy S20+",
  "Samsung Galaxy S20 Ultra",
  "Samsung Galaxy S21",
  "Samsung Galaxy S21+",
  "Samsung Galaxy S21 Ultra",
  "Samsung Galaxy S22",
  "Samsung Galaxy S22+",
  "Samsung Galaxy S22 Ultra",
  "Samsung Galaxy S23",
  "Samsung Galaxy S23+",
  "Samsung Galaxy S23 Ultra",
  "Samsung Galaxy S24",
  "Samsung Galaxy S24+",
  "Samsung Galaxy S24 Ultra",

  // Samsung A Series (20+)
  "Samsung Galaxy A10",
  "Samsung Galaxy A20",
  "Samsung Galaxy A30",
  "Samsung Galaxy A50",
  "Samsung Galaxy A70",
  "Samsung Galaxy A12",
  "Samsung Galaxy A22",
  "Samsung Galaxy A32",
  "Samsung Galaxy A52",
  "Samsung Galaxy A72",
  "Samsung Galaxy A14",
  "Samsung Galaxy A24",
  "Samsung Galaxy A34",
  "Samsung Galaxy A54",

  // OnePlus (15+)
  "OnePlus 5",
  "OnePlus 5T",
  "OnePlus 6",
  "OnePlus 6T",
  "OnePlus 7",
  "OnePlus 7 Pro",
  "OnePlus 8",
  "OnePlus 8 Pro",
  "OnePlus 9",
  "OnePlus 9 Pro",
  "OnePlus 10 Pro",
  "OnePlus 11",
  "OnePlus 12",
  "OnePlus Nord",
  "OnePlus Nord 2",
  "OnePlus Nord CE",
  "OnePlus Nord 3",

  // Xiaomi / Redmi (25+)
  "Redmi Note 7",
  "Redmi Note 8",
  "Redmi Note 9",
  "Redmi Note 10",
  "Redmi Note 11",
  "Redmi Note 12",
  "Redmi Note 13",
  "Redmi 9",
  "Redmi 10",
  "Redmi 12",
  "Xiaomi Mi 10",
  "Xiaomi Mi 11",
  "Xiaomi 11T",
  "Xiaomi 12",
  "Xiaomi 13",

  // Realme (20+)
  "Realme 5",
  "Realme 6",
  "Realme 7",
  "Realme 8",
  "Realme 9",
  "Realme 10",
  "Realme 11",
  "Realme Narzo 20",
  "Realme Narzo 30",
  "Realme Narzo 50",

  // Vivo (15+)
  "Vivo V15",
  "Vivo V17",
  "Vivo V19",
  "Vivo V20",
  "Vivo V21",
  "Vivo V23",
  "Vivo V25",
  "Vivo Y20",
  "Vivo Y21",
  "Vivo Y33",

  // Oppo (15+)
  "Oppo F9",
  "Oppo F11",
  "Oppo F15",
  "Oppo F19",
  "Oppo F21",
  "Oppo Reno 3",
  "Oppo Reno 5",
  "Oppo Reno 6",
  "Oppo Reno 8",
  "Oppo A53",
  "Oppo A54",

  // Google Pixel (10+)
  "Google Pixel 3",
  "Google Pixel 4",
  "Google Pixel 5",
  "Google Pixel 6",
  "Google Pixel 6 Pro",
  "Google Pixel 7",
  "Google Pixel 7 Pro",
  "Google Pixel 8",
  "Google Pixel 8 Pro",

  // Motorola (10+)
  "Moto G5",
  "Moto G6",
  "Moto G7",
  "Moto G8",
  "Moto G9",
  "Moto G10",
  "Moto G20",
  "Moto Edge 20",
  "Moto Edge 30",

  // Nothing
  "Nothing Phone 1",
  "Nothing Phone 2",

  // Asus
  "Asus ROG Phone 3",
  "Asus ROG Phone 5",
  "Asus ROG Phone 6",
  "Asus Zenfone 8",
  "Asus Zenfone 9",

  // Honor
  "Honor 8X",
  "Honor 9X",
  "Honor 20",
  "Honor 50",
  "Honor 90"
];

const select = document.getElementById("phoneModel");

models.forEach(model => {
  const option = document.createElement("option");
  option.value = model;
  option.textContent = model;
  select.appendChild(option);
});

function goNext() {
  const selected = select.value;
  localStorage.setItem("selectedModel", selected);
  window.location.href = "questions.html";
}
