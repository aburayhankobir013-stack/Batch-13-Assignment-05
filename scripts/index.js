// All DOM Element selection
const form = document.getElementById("form");
const username = document.getElementById("username");
const password = document.getElementById("password");

// Useable data
const storedUsername = "admin";
const storedPassword = "admin123";
let collectedUsername;
let collectedPassowrd;

// Add event listener for username field validation
username.addEventListener(
  "blur",
  function () {
    const useableUsername = username.value.replace(/\s/g, "");
    if (isUsernameValid(useableUsername)) {
      collectedUsername = useableUsername;
    } else {
      alert("Enter the valid username!");
    }
  },
  false,
);

// Add event listener for password field validation
password.addEventListener(
  "blur",
  function () {
    const useablePassword = password.value.replace(/\s/g, "");
    if (isPasswordValid(useablePassword)) {
      collectedPassowrd = useablePassword;
    } else {
      alert("You must entered 8 charectered passwrod!");
    }
  },
  false,
);

// Add event listener on form submit
form.addEventListener(
  "submit",
  function (event) {
    event.preventDefault();
    if (username.value.length === 0 && password.value.length === 0) {
      alert("You must entered username and password!");
    } else if (username.value.length === 0) {
      alert("You must entered the username!");
    } else if (password.value.length === 0) {
      alert("You must entered password!");
    } else {
      if (isUsernameMatch(storedUsername, collectedUsername)) {
        if (isPasswordMatch(storedPassword, collectedPassowrd)) {
          // Functionality for navigate the page
          console.log("I am ready to navigate the page!");
        } else {
          alert("Enter the correct password!");
          password.value = "";
        }
      } else {
        alert("Enter the correct username!");
        username.value = "";
      }
    }
  },
  false,
);

// Username field validation
function isUsernameValid(username) {
  if (username.length !== 0) {
    return true;
  } else {
    return false;
  }
}

// Password field validation
function isPasswordValid(password) {
  if (password.length === 8) {
    return true;
  } else {
    return false;
  }
}

// Username validation
function isUsernameMatch(storedUsername, collectedUsername) {
  let flag = true;
  for (let index = 0; index < storedUsername.length; index++) {
    if (storedUsername[index] !== collectedUsername[index]) {
      flag = false;
      break;
    }
  }
  return flag;
}

// Password validation
function isPasswordMatch(storedPassword, collectedPassowrd) {
  let flag = true;
  for (let index = 0; index < storedPassword.length; index++) {
    if (storedPassword[index] !== collectedPassowrd[index]) {
      flag = false;
      break;
    }
  }
  return flag;
}
