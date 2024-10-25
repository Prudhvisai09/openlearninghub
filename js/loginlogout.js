// loginlogout.js

// ... (existing code)

// Update the function to set up the login/logout link
function updateLoginLogoutLink() {
    fetch('http://localhost:5000/checkAuth', {
        method: 'GET',
        credentials: 'include'
    })
    .then(response => response.json())
    .then(data => {
        const loginLogoutContainer = document.getElementById('loginLogoutContainer');

        if (loginLogoutContainer) {
            if (data.authenticated) {
                // If authenticated, display the "Logout" link and attach the logout function to the click event
                loginLogoutContainer.innerHTML = '<li><a class="nav-link scrollto" id="loginLogoutLink" onclick="logout()">Logout</a></li>';
            } else {
                // If not authenticated, display the "Login" link and attach the login function to the click event
                loginLogoutContainer.innerHTML = '<li><a class="nav-link scrollto" href="login.html">Login</a></li>';
            }
        } else {
            console.error('Element with ID "loginLogoutContainer" not found.');
        }
    })
    .catch(error => {
        console.error('Error during fetch:', error);
    });
}

// Call the function when the document is ready
document.addEventListener('DOMContentLoaded', function () {
    // Call the updateLoginLogoutLink function when the page loads
    updateLoginLogoutLink();
});

// Logout function
function logout() {
    fetch('http://localhost:5000/logout', {
        method: 'POST',
        credentials: 'include'
    })
    .then(response => response.json())
    .then(data => {
        console.log(data.message);
        location.reload();
    })
    .catch(error => {
        console.error('Error during fetch:', error);
    });
}

// Login function
function login() {
    // Perform the login logic, e.g., redirect to the login page
    window.location.href = 'login.html';
}
