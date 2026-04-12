// Signup
function signup() {
  let username = document.getElementById("username").value;
  let password = document.getElementById("password").value;

  if (!username || !password) {
    alert("Please fill all fields");
    return;
  }

  let users = JSON.parse(localStorage.getItem("users")) || [];

  let userExists = users.find(u => u.username === username);

  if (userExists) {
    alert("User already exists!");
    return;
  }

  users.push({ username, password });
  localStorage.setItem("users", JSON.stringify(users));

  alert("Signup successful!");
  window.location.href = "login.html";
}

// Login
function login() {
  let username = document.getElementById("login-username").value;
  let password = document.getElementById("login-password").value;

  let users = JSON.parse(localStorage.getItem("users")) || [];

  let validUser = users.find(u => u.username === username && u.password === password);

  if (!validUser) {
    alert("Invalid credentials!");
    return;
  }

  localStorage.setItem("loggedInUser", username);

  alert("Login successful!");
  window.location.href = "index.html";
}

// Logout
function logout() {
  localStorage.removeItem("loggedInUser");
  window.location.href = "login.html";
}