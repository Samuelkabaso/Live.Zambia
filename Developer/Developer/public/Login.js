document.addEventListener("DOMContentLoaded", () => {
  const form = document.querySelector(".form");
  const usernameInput = form.querySelector("input[type='text']");
  const passwordInput = form.querySelector("input[type='password']");

  // Simulated user database (for demo purposes only)
  const users = [
    { username: "admin", password: "admin123" },
    { username: "johndoe", password: "password" }
  ];

  form.addEventListener("submit", (e) => {
    e.preventDefault();

    const enteredUsername = usernameInput.value.trim();
    const enteredPassword = passwordInput.value;

    const userFound = users.find(
      user =>
        user.username === enteredUsername &&
        user.password === enteredPassword
    );

    if (userFound) {
      alert("Login successful! Redirecting to dashboard...");
      // Simulate redirect (replace with actual dashboard path)
      window.location.href = "dashboard.html";
    } else {
      alert("Invalid username or password. Please try again.");
    }
  });
});
