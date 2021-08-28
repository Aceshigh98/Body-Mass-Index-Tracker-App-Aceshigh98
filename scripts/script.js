/*
  Name: Brannon Cotherman
  Date: 08/13/21
  Assignment: Create a BMI tracker.
*/

//Checks and sees if local storage is available and will get the value of the passsword.
function getPassword() {
  if (typeof Storage == "undefined") {
    alert("Browser does not support HTML5 local storage. Try upgrading.");
  } else if (localStorage.getItem("account") != null) {
    return JSON.parse(localStorage.getItem("account")).password;
  }
}


//Checks and sees if local storage is available and will return the value of the security question.
function getSecQuestion() {
  if (typeof Storage == "undefined") {
    alert("Browser does not support HTML5 local storage. Try upgrading.");
  } else if (localStorage.getItem("account") != null) {
    return JSON.parse(localStorage.getItem("account")).secQuestion;
  }
}


//Checks and sees if local storage is available and will return the value of the security answer.
function getSecAnswer() {
  if (typeof Storage == "undefined") {
    alert("Browser does not support HTML5 local storage. Try upgrading.");
  } else if (localStorage.getItem("account") != null) {
    return JSON.parse(localStorage.getItem("account")).secAnswer;
  }
}

//Clears the contents of all pages.
function clearContents() {
  $("#new-password").val('');
  $("#confirm-password").val('');
  $("#security-question").val('');
  $("#security-answer").val('');
  $("#sec-new-password").val('');
  $("#sec-confirm-password").val('');
  $("#sec-answer").val('');
  $("#passcode").val('');
}

//Calculate BMI
function calculateBMI(i) {
  var getWeight = parseInt(JSON.parse(localStorage.getItem("records"))[i].weight);
  var getFeet = parseInt(JSON.parse(localStorage.getItem("user")).heightFeet);
  var getInches = parseInt(JSON.parse(localStorage.getItem("user")).heightInches);
  return bmiFormula(getWeight, getFeet, getInches);
}

function bmiFormula(weight, feet, inches) {
  let KG = weight * 0.454;
  let metersSQ = (((feet * 12) + inches) * .0254);
  return (KG / (metersSQ ^ 2));
}

//Clears Records from local storage.

function clearRecords() {
  localStorage.removeItem("records");
}


















//This Section of code is to create a password and a security phrase and answer.
//Submitting user account security details.
function submitAccountForm() {
  saveAccount();
  return true;
}
//Saving the account security details.
function saveAccount() {

  if (checkAccountForm()) {
    var account = {
      "password": $("#confirm-password").val(),
      "secQuestion": $("#security-question").val(),
      "secAnswer": $("#security-answer").val()
    };
    try {
      localStorage.clear();
      localStorage.setItem("account", JSON.stringify(account));
    } catch (e) {
      if (window.navigator.vendor === "Google Inc.") {
        if (e == DOMException.QUOTA_EXCEEDED_ERR) {
          alert("Error: Local Storage Exceeded");
        } else if (e == QUOTA_EXCEEDED_ERR) {
          alert("Error: Loading from local storage.")
        }
      }
    }
  } else {
    alert("Please complete the form properly.");
  }
}
//Checking to make sure the form is properly filled out, and that the password is correct.
function checkAccountForm() {
  if (($("#new-password").val() != "") && $("#confirm-password").val() != "" && $("#security-question").val() != "" && $("#security-answer").val() != "") {
    if ($("#new-password").val() == $("#confirm-password").val()) {
      return true;
    } else {
      alert("Passwords do not match.");
      return false;
    }
  } else {
    return false;
  }
}













//This segment of code is for the forgot password page.
//
function forgotPassword() {
  if (checkForgotPasswordForm()) {
    //localStorage.setItem("account"., JSON.stringify($("#sec-new-password").val()));
    console.log("account" + localStorage.getItem("account"));
    let account = JSON.parse(localStorage.getItem("account"));
    account.password = ($("#sec-new-password").val());
    localStorage.setItem("account", JSON.stringify(account));

    clearContents();
  }

}

//Checks and sees if form is filled out properly.
function checkForgotPasswordForm() {
  console.log(getSecAnswer());
  console.log($("#sec-answer").val());
  if (($("#sec-new-password").val() != "") && $("#sec-confirm-password").val() != "" && $("#sec-answer").val() != "") {
    if ($("#sec-new-password").val() == $("#sec-confirm-password").val() && getSecAnswer() == $("#sec-answer").val()) {
      return true;
    } else {
      alert("Passwords do not match or security answer is incorrect.");
      return false;
    }
  } else {
    alert("Please fill out form properly")
    return false;
  }
}
//Updates Security Question Label based on what you entered when you created an account.
function securityQuestionLabel() {
  const secQuest = getSecQuestion();
  console.log(secQuest);
  $("#sec-question-label").text(secQuest);
}















//This segment of code is for the login page.
//

function checkLogin() {
  console.log($("#passcode").val());
  console.log(getPassword());
  if (localStorage.getItem("account") == null) {
    window.location.replace("#page-password");
  }
  else if ($("#passcode").val() == getPassword() && localStorage.getItem("disclaimer") == null) {
    window.location.replace("#disclaimer-page");
    clearContents();
  } else if ($("#passcode").val() == getPassword() && localStorage.getItem("user") == null) {
    window.location.replace("#page-user-info");
  } else if ($("#passcode").val() == getPassword()) {
    window.location.replace("#page-menu");
  }
}

//Adds values to password from user-input.
function addValueToPassword(key) {
  const passVal = $("#passcode").val();
  console.log(key);
  if (key == "bksp") {
    $("#passcode").val(passVal.substring(0, passVal.length - 1));
  } else {
    $("#passcode").val(passVal.concat(key));
  }
  console.log(passVal);
}














//This segment of code is for the user Information page.
function setUser() {
  if (checkUserInfoForm()) {
    var user = {
      "firstName": $("#first-name").val(),
      "lastName": $("#last-name").val(),
      "dateOfBirth": $("#date-of-birth").val(),
      "heightFeet": $("#feet").val(),
      "heightInches": $("#inches").val()
    }

    try {
      localStorage.setItem("user", JSON.stringify(user));
      window.location.replace("#page-menu");
    } catch (e) {
      if (window.navigator.vendor === "Google Inc.") {
        if (e == DOMException.QUOTA_EXCEEDED_ERR) {
          alert("Error: Local Storage Exceeded");
        } else if (e == QUOTA_EXCEEDED_ERR) {
          alert("Error: Loading from local storage.")
        }
      }
    }
  }
}

//Checks and sees if form is filled out properly.
function checkUserInfoForm() {
  console.log(getSecAnswer());
  console.log($("#sec-answer").val());
  if (($("#first-name").val() != "") && $("#last-name").val() != "" && $("#date-of-birth").val() != "" && $("#feet").val() != "" && $("#inches").val() != "") {
    return true;
  } else {
    alert("Please fill out form properly")
    return false;
  }
}

//Checks if user information has been entered.
function checkIfNull() {
  if (localStorage.getItem("user") == null) {
    alert("Please enter user information to continue to menu.")
  } else {
    window.location.replace("#page-menu");
  }
}












//This segment of code is for the Record page.
function setRecord() {
  const userData = {
    "date": $("#date").val(),
    "weight": $("#weight").val()
  }
  try {
    let records = JSON.parse(localStorage.getItem("records"));
    if (records == null) {
      records = [];
    }
    records.push(userData)
    localStorage.setItem("records", JSON.stringify(records));
  } catch (e) {
    if (window.navigator.vendor === "Google Inc.") {
      if (e == DOMException.QUOTA_EXCEEDED_ERR) {
        alert("Error: Local Storage Exceeded");
      } else if (e == QUOTA_EXCEEDED_ERR) {
        alert("Error: Loading from local storage.")
      }
    }
  }
}










//This segment of code is for the Records table page.
function createRecordTable() {
  document.getElementById("table-results").innerHTML = "";



  let detailsTable = document.getElementById("table-info");
  let recordTable = document.getElementById("table-results");
  var recordsLength = JSON.parse(localStorage.getItem("records")).length;
  recordsDate = JSON.parse(localStorage.getItem("records"))[0].date;


  let detailRow = detailsTable.insertRow(0);
  let detailCell1 = detailRow.insertCell(0);
  let detailCell2 = detailRow.insertCell(1);
  let detailCell3 = detailRow.insertCell(2);
  let detailCell4 = detailRow.insertCell(3);
  let detailCell5 = detailRow.insertCell(4);

  detailCell1.innerHTML = JSON.parse(localStorage.getItem("user")).firstName;
  detailCell2.innerHTML = JSON.parse(localStorage.getItem("user")).lastName;
  detailCell3.innerHTML = JSON.parse(localStorage.getItem("user")).dateOfBirth;
  detailCell4.innerHTML = JSON.parse(localStorage.getItem("user")).heightFeet;
  detailCell5.innerHTML = JSON.parse(localStorage.getItem("user")).heightInches;

  for (let i = 0; i <= recordsLength; i++) {
    var recordRow = recordTable.insertRow(0);
    var recordCell1 = recordRow.insertCell(0);
    var recordCell2 = recordRow.insertCell(1);
    var recordsDate = JSON.parse(localStorage.getItem("records"))[i].date;
    var recordsBMI = calculateBMI(i);

    recordCell1.innerHTML = recordsDate;
    recordCell2.innerHTML = recordsBMI;
  }
}

//Clears table so it will update when you enter the records page again.
function clearTable() {
  let table1 = document.getElementById("table-info");
  let table2 = document.getElementById("table-results");
  table1.deleteRow(0);
  table2.deleteRow(0);

}














// This segment of code is for the disclaimer page.
function acceptDisclaimer() {
  var disclaimer = {
    "disclaimer": "true"
  }
  getDisclaimerValue();
  try {
    localStorage.setItem("disclaimer", JSON.stringify(disclaimer));
  } catch (e) {
    if (window.navigator.vendor === "Google Inc.") {
      if (e == DOMException.QUOTA_EXCEEDED_ERR) {
        alert("Error: Local Storage Exceeded");
      } else if (e == QUOTA_EXCEEDED_ERR) {
        alert("Error: Loading from local storage.")
      }
    }
  }
}

//gets value on whether the user accepted the disclaimer or not.
function getDisclaimerValue() {
  if (localStorage.getItem("disclaimer") == null) {
    window.location.replace("#disclaimer-page");
    if (localStorage.getItem("user") == null) {
      $("#login-enter").attr("href", "#page-user-info").blur();
      window.location.replace("#page-user-info");
    } else {
      $("#login-enter").attr("href", "#page-user-info").blur();
      window.location.replace("#page-menu");
    }
  } else if (localStorage.getItem("disclaimer") != null) {
    if (localStorage.getItem("user") == null) {
      $("#login-enter").attr("href", "#page-user-info").blur();
    } else {
      $("#login-enter").attr("href", "#page-menu").blur();
    }
  } else {
    $("#login-enter").attr("href", "#").blur();
    alert("Incorrect Password, try again.");
  }
}












//Code for Graphing page

function drawGraph1() {

  var xValues = [];
  var yValues = [];

  if (JSON.parse(localStorage.getItem("records")) == null) {
    xValues = [];
    yValues = [];
  } else {
    const bmiEntries = JSON.parse(localStorage.getItem("records"));
    bmiEntries.forEach(bmiEntry => {

      xValues.push(bmiEntry.date);
      yValues.push(calculateBMIForGraph(bmiEntry.weight));
    });
  }

  new Chart("graphCanvas", {
    type: "line",
    data: {
      labels: xValues,
      datasets: [{
        fill: false,
        lineTension: 0,
        backgroundColor: "rgba(0,0,255,1.0)",
        borderColor: "rgba(0,0,255,0.1)",
        data: yValues
      }]
    },
    options: {
      legend: { display: false },
      scales: {
        yAxes: [{ ticks: { min: 0, max: 50 } }],
      }
    }
  });
}


function drawGraph2() {

  var xValues = [];
  var yValues = [];

  if (JSON.parse(localStorage.getItem("records")) == null) {
    xValues = [];
    yValues = [];
  } else {
    const bmiEntries = JSON.parse(localStorage.getItem("records"));
    bmiEntries.forEach(bmiEntry => {

      xValues.push(bmiEntry.date);
      yValues.push(calculateBMIForGraph(bmiEntry.weight));
    });
  }

  new Chart("graphCanvas2", {
    type: "line",
    data: {
      labels: xValues,
      datasets: [{
        fill: false,
        lineTension: 0,
        backgroundColor: "rgba(0,0,255,1.0)",
        borderColor: "rgba(0,0,255,0.1)",
        data: yValues
      }]
    },
    options: {
      legend: { display: false },
      scales: {
        yAxes: [{ ticks: { min: 0, max: 50 } }],
      }
    }
  });
}







//Function that calculates the BMI for the graph.
function calculateBMIForGraph(weight) {

  var feet = parseInt(JSON.parse(localStorage.getItem("user")).heightFeet);
  var inches = parseInt(JSON.parse(localStorage.getItem("user")).heightInches);

  let KG = weight * 0.454;
  let metersSQ = (((feet * 12) + inches) * .0254);
  return (KG / (metersSQ ^ 2));
}