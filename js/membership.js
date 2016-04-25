/**
 * Created by Andrea on 2016-04-24.
 */
var error = document.getElementById("showError");
var profile = {};
function validateName() {
    var firstName = document.getElementById("fname");
    var lastName = document.getElementById("lname");
    var name = firstName.value + lastName.value;
    var nameError=document.getElementById("nameError");
    try {
        if (/.{4,}/.test(name) === false) {
            throw "Name must be at least 4 characters long";
        } else if (/\W/.test(name) === true) {
            throw "Name must contain only letters and numbers";
        }
        // remove any username error styling and message
        firstName.style.background = "";
        lastName.style.background = "";
        nameError.style.display = "none";
        nameError.innerHTML = "";
        // copy valid username value to profile object
        profile.username = name;
        // copy profile.username value to profile section
        document.getElementById("profileUsername").innerHTML = profile.username;
        // make profile section and username section visible
        document.getElementById("profile").style.display = "block";
        document.getElementById("usernameSection").style.display = "block";
    }
    catch (msg) {
        nameError.style.display = "block";
        nameError.innerHTML = msg;
        // change input style
        firstName.style.background = "rgb(255,233,233)";
        lastName.style.background = "rgb(255,233,233)";
    }

}
function validateEmail() {
    var emailError = document.getElementById("emailerror");
    var emailInput = document.getElementById("email");
    var emailCheck = /^[_\w\-]+(\.[_\w\-]+)*@[\w\-]+(\.[\w\-]+)*(\.[\D]{2,6})$/;
    try {
        if (emailCheck.test(emailInput.value) === false) {
            throw "Please provide a valid email address";
        }

        // remove any email error styling and message
        emailInput.style.background = "";
        emailError.innerHTML = "";
        emailError.style.display = "none";
        // convert email address to lowercase
        emailInput.value = emailInput.value.toLowerCase();
        profile.email = emailInput.value;
        // copy profile.email value to profile section
        document.getElementById("profileEmail").innerHTML = profile.email;
        // make profile section and email section visible
        document.getElementById("profile").style.display = "block";
        document.getElementById("emailSection").style.display = "block";

    }
    catch(msg) {
        // display error message
        emailError.innerHTML = msg;
        emailError.style.display = "block";
        // change input style
        emailInput.style.background = "rgb(255,233,233)";
    }
}
function validatePassword() {
    var passwordError = document.getElementById("passworderror");
    var pw1Input = document.getElementById("password");
    var pw2Input = document.getElementById("rePassword");
    try {
//      if (pw1Input.value.length < 8) {
        if (/.{8,}/.test(pw1Input.value) === false) {
            throw "Password must be at least 8 characters";
        } else if (pw1Input.value.localeCompare(pw2Input.value) !== 0) {
            throw "Passwords must match";}
            // remove any password error styling and message
            pw1Input.style.background = "";
            pw2Input.style.background = "";
            passwordError.style.display = "none";
            passwordError.innerHTML = "";
        profile.password = pw2Input.value;
    }
    catch (msg) {
        // display error message
        passwordError.style.display = "block";
        passwordError.innerHTML = msg;
        // change input style
        pw1Input.style.background = "rgb(255,233,233)";
        pw2Input.style.background = "rgb(255,233,233)";
    }
}

function validateBirthday() {
    var birthdayError = document.getElementById("birthdayError");
    var birthdayInput = new Date(document.getElementById("datepicker").value);
    try {
      if (isNaN(birthdayInput.getTime())) {
            throw "Date format is MM/DD/YYYY";
        } else if (birthdayInput.getTime() > new Date().getTime()) {
            throw "Birthday must before today";
      }
        // remove any password error styling and message
        birthdayError.style.display = "none";
        birthdayError.innerHTML = "";
        var days=Math.floor((new Date().getTime() - birthdayInput.getTime())/(24*3600*1000));
        var year = Math.floor(days/365);
        var month = Math.floor((days - (year * 365)) / 30);
        var day = days - (year * 365) - (month * 30);
        profile.age = year + " years, " + month + " months, " + day + " days";
        document.getElementById("profileAge").innerHTML = profile.age;
    }
    catch (msg) {
        // display error message
        birthdayError.style.display = "block";
        birthdayError.innerHTML = msg;
    }
}

function convertToString() {
    // convert lodging array to string
    arrayString = lodging.toString();
    // convert profile object to string
    objectString = JSON.stringify(profile);
}

    function createEventListeners() {
        var Input = document.getElementById("lname");
        var emailInput = document.getElementById("email");
        var pw2Input = document.getElementById("rePassword");
        var birthdayInput = document.getElementById("datepicker");
        
        if (Input.addEventListener) {
            Input.addEventListener("change", validateName, false);
            emailInput.addEventListener("change", validateEmail, false);
            pw2Input.addEventListener("change", validatePassword, false);
            birthdayInput.addEventListener("change", validateBirthday, false);
        } else if (Input.attachEvent) {
            Input.attachEvent("onchange", validateName);
            birthdayInput.attachEvent("onchange", validateBirthday);
        }

        var button = document.getElementById("submit");
        if (button.addEventListener) {
            button.addEventListener("click", convertToString, false);
        } else if (button.attachEvent) {
            button.attachEvent("onclick", convertToString);
        }
    }

    if (window.addEventListener) {
        window.addEventListener("load", createEventListeners, false);
    }
    else if (window.attachEvent) {
        window.attachEvent("onload", createEventListeners);
    }
