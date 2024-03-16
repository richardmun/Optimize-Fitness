document.addEventListener("DOMContentLoaded", function() {
    calorieIntake();
    reset()
});

/* Function:
    Communicates with HTML file through Event Listener.
    Acknowldges all input sections through ID and stores in separate variables.
    Data entered into input and after submit is then stored in userData object.

*/
function calorieIntake() {
    var form = document.getElementById("caloriesForm")
    form.addEventListener("submit", function(event) {
        event.preventDefault();

        // Declare variables with elements from html form
        // Variables are taking input of user after submit has been clicked
        var weightObjective = document.getElementById("weightObjective").value;
        var age = document.getElementById("ageInput").value;
        var male = document.getElementById("maleRadio").checked;
        var female = document.getElementById("femaleRadio").checked;
        var heightFeet = document.getElementById("heightFt").value;
        var heightInches = document.getElementById("heightInches").value;
        var weightPounds = document.getElementById("weightLbs").value;
        var activityLevel = document.querySelector('select[name="activityLevel"]').value;

        // Validate input before submitting the form
        if (!inputValidation(weightObjective, age, male, female, heightFeet, heightInches, weightPounds, activityLevel)) {
            return; // Stop further processing if validation fails
        }
        
        // Data of user input will be stored in userData object
        var userData = {
            weightObjective: weightObjective,
            age: age,
            gender: male ? "male" : "female",
            heightFeet: heightFeet,
            heightInches: heightInches,
            weightPounds: weightPounds,
            activityLevel: activityLevel
        };
        


        // Calling function: to convert user data from imperial to metric system
        var heightCm = inchesToCm(heightFeet, heightInches);
        var weightKg = poundsToKg(weightPounds);

        // Calling function: to calculate BMR
        var calculatedBMR = calculateBMR(age, male, weightKg, heightCm);

        // Calling function: to recalculate BMR if activityLevel has been specified
        var calculatedTDEE = calculateTDEE(calculatedBMR, activityLevel);
        var calculatedTDEEObjective = objective(weightObjective, calculatedTDEE)
    
        // Calling function: that will display caloric intake
        var caloriesNeeded = document.getElementById("caloriesNeeded")
        var caloriesDisplay = document.getElementById("caloriesDisplay");
        caloriesNeeded.textContent = "Daily calories needed: ";
            /*for(var i = 0; i < this.textContent.length; i++) {
                console.log(textContent[[i]]);
            } */
        caloriesDisplay.textContent = Math.round(calculatedTDEEObjective) + " calories";


        // Connection with CSS to make text of result appear with a transition.
        caloriesNeeded.classList = ("show");
        caloriesDisplay.classList = ("show");

        sendDataToServer(userData);

    });
};


// function: converts pounds to kilograms
function poundsToKg(weightPounds) {
    var weightKg = 0.453592 * weightPounds;
    return weightKg;

}

// function: converts height from feet/inches to centimeters
function inchesToCm(heightFeet, heightInches) {
    var heightInchesTotal = 12 * heightFeet + parseInt(heightInches);
    var heightCm = 2.54 * heightInchesTotal;
    return heightCm;
}

// function: calculates BMR based on male or female radio selection
function calculateBMR(age, male, weightKg, heightCm) {
    var BMR;
    if (male) { // Male
        BMR = 88.362 + (13.397 * weightKg) + (4.799 * heightCm) - (5.677 * age)
    }
    else { // Female
        BMR = 447.593 + (9.247 * weightKg) + (3.098 * heightCm) - (4.330 * age)
    }

    return BMR
}

// Function: recalculates BMR based on activityLevel selection
function calculateTDEE(BMR, activityLevel) {
    var activityFactor;

    switch (activityLevel) {
        case "sedentary":
            activityFactor = 1.2;
            break;
        case "light":
            activityFactor = 1.375;
            break;
        case "moderate":
            activityFactor = 1.55;
            break;
        case "active":
            activityFactor = 1.725;
            break;
        case "veryActive":
            activityFactor = 1.9;
            break;
        default:
            activityFactor = 1.2;
            break;
        
    }
    return BMR * activityFactor;
}

// Function: recalculates calcories based on objective of user
function objective(weightObjective, calculatedTDEE) {
    var calculatedTDEEObjective

    if (weightObjective === "maintain") {
        calculatedTDEEObjective = calculatedTDEE
    } else if (weightObjective === "weightLoss") {
        calculatedTDEEObjective = calculatedTDEE - 500;
    } else if (weightObjective === "weightGain") {
        calculatedTDEEObjective = calculatedTDEE + 500;
    }
    return calculatedTDEEObjective;
}

/* Function
    Create variable that communicates with HTML for resetButton
    When user selects reset, the following objects will be loaded and will be replaced by empty strings.
*/
function reset() {
    var resetButton = document.getElementById("resetButton")
    resetButton.addEventListener("click", reset);
    var caloriesNeeded = document.getElementById("caloriesNeeded")
    var caloriesDisplay = document.getElementById("caloriesDisplay")
    caloriesNeeded.innerHTML = ""
    caloriesDisplay.innerHTML = ""

    return resetButton
}

function sendDataToServer(userData) {
    fetch("http://localhost:3000/api/saveUserData", { // sent POST request to server
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify(userData), // convert userData object to JSON
    })
        .then((response) => response.json())
        .then((data) => {
            console.log("Server response:", data);
        })
        .catch((error) => {
            console.error("Error sending data to server:", error);
        });
}

/* Function
    Input validator for input sections to ensure that user is not able to leave section blank.
    Input vali
*/
function inputValidation(weightObjective, age, male, female, heightFeet, heightInches, weightPounds, activitylevel) {
    var inputValues = [weightObjective, age, male, female, heightFeet, heightInches, weightPounds, activitylevel];
    for (var i; i <= inputValues; i++) {
        if(inputValues === "") {
            alert("Fill all input sections")
        }
    }

    if (heightInches < 1 || heightInches > 11) {
        alert("Enter a number between 1 and 12.")
        return false;
    }
    return true;
}


