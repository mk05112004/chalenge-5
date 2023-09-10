document.getElementById("registrationForm").addEventListener("submit", function (e) {
    e.preventDefault();
    const username = document.getElementById("username").value;
    const password = document.getElementById("password").value;

    // You can send a POST request to your server here to handle user registration
    // Example: fetch('/api/register', { method: 'POST', body: JSON.stringify({ username, password }) })
    
    // Display a success message or handle errors as needed
    alert(`User ${username} registered successfully.`);
});
