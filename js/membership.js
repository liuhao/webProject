/**
 * Created by Andrea on 2016-04-24.
 */
var profile = {};
var plans = [];
var arrayString;
var objectString;
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
        firstName.style.background = "";
        lastName.style.background = "";
        nameError.style.display = "none";
        nameError.innerHTML = "";
        profile.username = name;
        document.getElementById("profileUsername").innerHTML = profile.username;
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

        emailInput.style.background = "";
        emailError.innerHTML = "";
        emailError.style.display = "none";
        emailInput.value = emailInput.value.toLowerCase();
        profile.email = emailInput.value;
        document.getElementById("profileEmail").innerHTML = profile.email;
        document.getElementById("profile").style.display = "block";
        document.getElementById("emailSection").style.display = "block";

    }
    catch(msg) {
        emailError.innerHTML = msg;
        emailError.style.display = "block";
        emailInput.style.background = "rgb(255,233,233)";
    }
}
function validatePassword() {
    var passwordError = document.getElementById("passworderror");
    var pw1Input = document.getElementById("password");
    var pw2Input = document.getElementById("rePassword");
    try {
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
        passwordError.style.display = "block";
        passwordError.innerHTML = msg;
        pw1Input.style.background = "rgb(255,233,233)";
        pw2Input.style.background = "rgb(255,233,233)";
    }
}
function registerPlan(event) {
    if (event === undefined) {
        event = window.event;
    }
    var callerElement = event.target || event.srcElement;
    var plansName = callerElement.value;
    if (callerElement.checked) {
        plans.push(plansName);
        var newPlan = document.createElement("li");
        newPlan.innerHTML = plansName;
        document.getElementById("profileplan").appendChild(newPlan);
        document.getElementById("profile").style.display = "block";
        document.getElementById("planSection").style.display = "block";
    } else {
        var listItems = document.querySelectorAll("#profileplan li");
        for (var i = 0; i < listItems.length; i++) {
            if (listItems[i].innerHTML === plansName) {
                plans.splice(i, 1);
                listItems[i].parentNode.removeChild(listItems[i]);
                break;
            }
        }
    }
}

function convertToString() {
    arrayString = plans.toString();
    objectString = JSON.stringify(profile);
}

function calTotalFee() {
    var fee = document.getElementById()
    
}

    function createEventListeners() {
        var Input = document.getElementById("lname");
        var emailInput = document.getElementById("email");
        var pw2Input = document.getElementById("rePassword");
        
        if (Input.addEventListener) {
            Input.addEventListener("change", validateName, false);
            emailInput.addEventListener("change", validateEmail, false);
            pw2Input.addEventListener("change", validatePassword, false);
        } else if (Input.attachEvent) {
            Input.attachEvent("onchange", validateName);
        }

        var button = document.getElementById("submit");
        if (button.addEventListener) {
            button.addEventListener("click", convertToString, false);
        } else if (button.attachEvent) {
            button.attachEvent("onclick", convertToString);
        }

        var planss = document.getElementsByName("plan");
        if (planss[0].addEventListener) {
            for (var i = 0; i < planss.length; i++) {
                planss[i].addEventListener("change", registerPlan, false);
            }
        } else if (planss[0].attachEvent) {
            for (var i = 0; i < planss.length; i++) {
                planss[i].attachEvent("onchange", registerPlan);
            }
        }
    }

    if (window.addEventListener) {
        window.addEventListener("load", createEventListeners, false);
    }
    else if (window.attachEvent) {
        window.attachEvent("onload", createEventListeners);
    }
