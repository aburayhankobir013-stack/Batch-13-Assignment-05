// All DOM Element selection
const form = document.getElementById("form");
const username = document.getElementById("username");
const password = document.getElementById("password");

// Useable data
const storedUsername = "admin";
const storedPassword = "admin123";
let collectedUsername;
let collectedPassowrd;


// Add event listener on form submit
form.addEventListener(
  "submit",
  function (event) {
    event.preventDefault();
    if(isUsernameValid(username.value)){
      const collectedUsername=username.value.replace(/\s/g,"");
      if(isPasswordValid(password.value)){
        const collectedPassowrd=password.value.replace(/\s/g,"");
        if(isUsernameMatch(storedUsername,collectedUsername)){
          if(isPasswordMatch(storedPassword,collectedPassowrd)){
            window.location.href="./pages/main.html";
          }else{
            alert("Invalid password!");
          }
        }else{
          alert("Invalid username!");
        }
      }else{
        alert("You must entered a valid password!");
      }
    }else{
      alert("You must entered a valid username!");
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
