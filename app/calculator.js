
document.addEventListener("DOMContentLoaded", function() {
  test();
});

function test() {
  var string = document.getElementById("output");
  string.textContent = "Hello world";
}


document.addEventListener("DOMContentLoaded", function() {
  information();
});

function information() {
  var string2 = document.getElementById("output2");

  var divElement = document.createElement("form");
  divElement.id = "firstForm";

  var formElement = document.createElement("fieldset");
  formElement.action = "";

  var fieldsetElement = document.createElement("fieldset");
  var labelElement = document.createElement("label");
  labelElement.htmlFir = "goal";
  labelElement.textContent = "Fitness Objective";

  fieldsetElement.appendChild(labelElement);
  formElement.appendChild(fieldsetElement);
  divElement.appendChild(formElement);
  string2.appendChild(divElement);

}













/* 

// Get user input JS
function information() {
  console.log("hello world")
  return;
}

information();

*/
/*
// HTML input and textarea
<input type="text" id="nameInput">
<button onclick="handleButtonClick()">Submit</button>
</input>
// JS
function handleButtonClick() {
  let userInput = document.getElementById("nameInput").value;
  console.log("User input:", userInput);
}
*/


/*
// HTML Form
<form id="userForm">
  <input type="text" name="name" id="nameInput"></input>
  <input type="submit" value="Submit"></input>
</form>
// JS
document.getElementById("userForm").addEventListener("submit", function(event) {
  event.preventDefault(); // Prevent form submission (optional)
  let userInput = document.getElementById("nameInput").value;
  console.log("User input:", userInput);
});
*/


