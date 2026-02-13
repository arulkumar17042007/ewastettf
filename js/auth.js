const emailInput = document.getElementById("email");
const passwordInput = document.getElementById("password");

async function signup() {
  const { data, error } = await supabase.auth.signUp({
    email: emailInput.value,
    password: passwordInput.value
  });

  if (error) {
    alert(error.message);
  } else {
    alert("Signup successful! Now login.");
  }
}

async function login() {
  const { data, error } = await supabase.auth.signInWithPassword({
    email: emailInput.value,
    password: passwordInput.value
  });

  if (error) {
    alert(error.message);
  } else {
    alert("Login successful!");
    window.location.href = "model.html";
  }
}
