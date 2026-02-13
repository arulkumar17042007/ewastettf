const emailInput = document.getElementById("email");
const passwordInput = document.getElementById("password");

async function signup() {
  const email = emailInput.value.trim();
  const password = passwordInput.value.trim();

  if (!email || !password) {
    alert("Enter email and password");
    return;
  }

  const { error } = await supabase.auth.signUp({
    email: email,
    password: password
  });

  if (error) {
    alert("Signup Error: " + error.message);
  } else {
    alert("Signup successful! Now login.");
  }
}

async function login() {
  const email = emailInput.value.trim();
  const password = passwordInput.value.trim();

  const { data, error } = await supabase.auth.signInWithPassword({
    email: email,
    password: password
  });

  if (error) {
    alert("Login Error: " + error.message);
  } else {
    console.log("User:", data.user);
    window.location.href = "model.html";
  }
}
