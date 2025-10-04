// Login form functionality
const loginForm = document.getElementById("loginForm");

loginForm.addEventListener("submit", function (e) {
  e.preventDefault();

  const email = document.getElementById("email").value.trim();
  const password = document.getElementById("password").value.trim();

  if (email && password) {
    // Save user name (use email before @ as "name")
    const username = email.split("@")[0];
    localStorage.setItem("loggedInUser", username);

    alert("Login successful!");
    window.location.href = "index.html"; // redirect to home page
  } else {
    alert("Please enter both email and password.");
  }
});

// Toggle password visibility
function togglePassword() {
  const passwordInput = document.getElementById("password");
  const eyeOpen = document.getElementById("eye-open");
  const eyeClosed = document.getElementById("eye-closed");
  const toggleButton = document.querySelector('button[onclick="togglePassword()"]');

  if (passwordInput.type === "password") {
    passwordInput.type = "text";
    eyeOpen.classList.add("hidden");
    eyeClosed.classList.remove("hidden");
    if (toggleButton) {
      toggleButton.setAttribute("aria-label", "Hide password");
      toggleButton.setAttribute("aria-pressed", "true");
    }
  } else {
    passwordInput.type = "password";
    eyeOpen.classList.remove("hidden");
    eyeClosed.classList.add("hidden");
    if (toggleButton) {
      toggleButton.setAttribute("aria-label", "Show password");
      toggleButton.setAttribute("aria-pressed", "false");
    }
  }
}
window.togglePassword = togglePassword;
