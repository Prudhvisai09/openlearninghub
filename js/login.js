// login.js

// Function to send login request to the server
function login() {
  // Get username and password from the form
  const username = document.getElementById('username').value;
  const password = document.getElementById('password').value;

  // Create an object with the login credentials
  const loginData = {
    username: username,
    password: password
  };

  // Send a POST request to the server with the login credentials
  fetch('http://localhost:5000/login', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(loginData)
  })
  .then(response => response.json())
  .then(data => {
    // Check the response from the server
    if (data.error) {
      // Display an error message
      alert('Login failed. Please check your credentials.');
    } else {
      // Login successful, you can redirect or perform other actions
      alert('Login successful');
      // For example, redirect to another page
      window.location.href = 'index.html';
    }
  })
  .catch(error => {
    console.error('Error during login:', error);
    // Display an error message
    alert('Error during login. Please try again.');
  });
}
function register() {
  const usernameInput = document.getElementById('newUsername');
const passwordInput = document.getElementById('newPassword');
const userClassInput = document.getElementById('class');


  // Validate the input fields
  if (!usernameInput || !passwordInput || !userClassInput) {
      console.error('Input elements not found.');
      return;
  }

  const username = usernameInput.value;
  const password = passwordInput.value;
  const userClass = userClassInput.value;

  if (!username || !password || !userClass) {
      alert('Please fill in all the fields.');
      return;
  }

  // Send a registration request to the server
  fetch('http://localhost:3000/register', {
      method: 'POST',
      headers: {
          'Content-Type': 'application/json',
      },
      body: JSON.stringify({
          username: username,
          password: password,
          class: userClass, // Use the renamed variable here
      }),
  })
  .then(response => response.json())
  .then(data => {
    // Check if registration was successful
    if (data.message === 'Registration successful') {
        alert('Registration successful');
        // Redirect to the login page
        window.location.href = 'login.html'; 
    } else {
        alert('Registration failed. Please try again.');
    }

  })
  .catch(error => {
      console.error('Error during registration:', error);
  });
}


function toggleForm() {
  const loginForm = document.getElementById('login-form');
  const registerForm = document.getElementById('register-form');
  const toggleFormText = document.getElementById('toggleFormText');

  if (loginForm && registerForm && toggleFormText) {
      if (loginForm.style.display === 'none') {
          // Switch to the login form
          loginForm.style.display = 'block';
          registerForm.style.display = 'none';
          toggleFormText.innerHTML = "Don't have an account? <a href='#' onclick='toggleForm()'>Register here</a>.";
      } else {
          // Switch to the registration form
          loginForm.style.display = 'none';
          registerForm.style.display = 'block';
          toggleFormText.innerHTML = "Already have an account? <a href='#' onclick='toggleForm()'>Login here</a>.";
      }
  } else {
      console.error('Elements not found.');
  }
}

// Call the function to update the login/logout link when the document is ready

