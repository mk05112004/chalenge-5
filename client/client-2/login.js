document.getElementById("loginForm").addEventListener("submit", function (e) {
    e.preventDefault();
    const username = document.getElementById("username").value;
    const password = document.getElementById("password").value;

    // You can send a POST request to your server here to handle user login
    // Example: fetch('/api/login', { method: 'POST', body: JSON.stringify({ username, password }) })

    // Display a success message or handle errors as needed
    alert(`User ${username} logged in successfully.`);
});
