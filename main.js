// Declare variables for storing the operator, previous value, current value, and DOM elements for the previous and current screens
let currentOperator = '';
let previousValue = '';
let currentValue = '';
let previousScreen = document.querySelector(".previous");
let currentScreen = document.querySelector(".current");

// Wait for the DOM to load and then set up event listeners for the buttons
document.addEventListener("DOMContentLoaded",function(){

    // Get references to the clear, equal, and decimal buttons
    let clear = document.querySelector(".clear");
    let equal = document.querySelector(".equal");
    let decimal = document.querySelector(".decimal");

    // Get a list of all the number buttons
    let numbers = document.querySelectorAll(".number");

    // Get a list of all the operator buttons
    let operators  = document.querySelectorAll(".operator");

    // Set up a click event listener for each number button
    numbers.forEach((number) => number.addEventListener("click",function(e){
        // Call the handleNumber function and pass it the clicked button's text content
        handleNumber(e.target.textContent);
        number.blur();
        
        // Update the current screen with the current value
        currentScreen.textContent = currentValue;
    }))

    // Set up a click event listener for each operator button
    operators.forEach((op) => op.addEventListener("click",function(e){
        // Call the handleOperator function and pass it the clicked button's text content
        handleOperator(e.target.textContent);
        op.blur();
        // Update the previous screen with the previous value and the current operator
        previousScreen.textContent = previousValue + " " + currentOperator;

        // Update the current screen with the current value
        currentScreen.textContent = currentValue;
        
    }))

    // Set up a click event listener for the clear button
    clear.addEventListener("click",function(){
        // Reset the current value, previous value, and current operator
        currentValue = "";
        previousValue = "";
        currentOperator = "";

        clear.blur();

        // Clear the previous and current screens
        previousScreen.textContent = currentValue;
        currentScreen.textContent = currentValue;
    })

    // Set up a click event listener for the equal button
    equal.addEventListener("click", function() {
        // If there is a current value and a previous value, perform the calculation
        if (currentValue !== "" && previousValue !== "") {
          calculate();
          equal.blur();
          previousScreen.textContent = "";

          // If the previous value is short enough or is the error message, display it on the current screen
          if (previousValue.length <= 9 || previousValue === "Cannot divide by 0") {
            currentScreen.textContent = previousValue;
          } else {
            // If the previous value is too long, display an ellipsis on the current screen
            currentScreen.textContent = previousValue.slice(0, 9) + "...";
          }
        }
      });

    // Add a click event listener to the decimal button
    decimal.addEventListener("click", function() {
        addDecimal();
        
        decimal.blur();

        currentScreen.textContent = currentValue;
    });
    });

    // add a keydown event listener to the backspace on the keboard
    document.addEventListener("keydown", function(event) {
        // Check if the key pressed is the backspace key
        if (event.code === "Backspace") {
          // Delete the last character in the currentValue string
          currentValue = currentValue.slice(0, -1);
          // Update the display
          currentScreen.textContent = currentValue;
        }
      });


    document.addEventListener("keydown", function(event) {
        // Check if the key pressed is a number
        if (event.key >= "0" && event.key <= "9") {
          handleNumber(event.key);
          currentScreen.textContent = currentValue;
        }
      
        // Check if the key pressed is an operator
        if (event.key === "+" || event.key === "-" || event.key === "*" || event.key === "/") {
          handleOperator(event.key);
          previousScreen.textContent = previousValue + " " + currentOperator;
          currentScreen.textContent = currentValue;
        }
      
        // Check if the key pressed is the equal sign
        if (event.key === "=" || event.key === "Enter") {
          if (currentValue !== "" && previousValue !== "") {
            calculate();
            previousScreen.textContent = "";
            if (previousValue.length <= 9 || previousValue === "Cannot divide by 0") {
              currentScreen.textContent = previousValue;
            } else {
              currentScreen.textContent = previousValue.slice(0, 9) + "...";
            }
          }
        }
      
        // Check if the key pressed is the decimal point
        if (event.key === ".") {
          addDecimal();
          currentScreen.textContent = currentValue;
        }
      });

    // Function to handle a clicked number button
    function handleNumber(num) {
    // If the previous value is the error message, reset it to 0 and clear the error message from the screen
    if (previousValue === "Cannot divide by 0") {
        previousValue = 0;
        previousScreen.textContent = "";
    }
    // Only append the number to the current value if it is less than or equal to 7 characters long
    if (currentValue.length <= 9) {
        currentValue += num;
    }
    }

    function handleOperator(op){
        // If a previous value and operator already exist, perform the operation and update the current operator
        if (previousValue && currentOperator) {
          calculate();
          currentOperator = op;
          previousScreen.textContent = previousValue + " " + currentOperator;
        // Otherwise, store the operator and previous value
        } else {
          currentOperator = op;
          previousValue = currentValue;
          // Display the operator and previous value on the previous screen
          previousScreen.textContent = previousValue + " " + currentOperator;
          currentValue = "";
        }
        // Clear the current screen
        currentScreen.textContent = "";
      }
      
      function calculate() {
        // Convert the previous value and current value to numbers for calculations
        previousValue = Number(previousValue);
        currentValue = Number(currentValue);
      
        // Check if the previous value is the error message for dividing by 0
        if (previousValue === "Cannot divide by 0") {
          // If the previous value is the error message, do not perform the operation
          return;
        // Perform the operation based on the current operator
        } else if (currentOperator === "+") {
          previousValue += currentValue;
        } else if (currentOperator === "-") {
          previousValue -= currentValue;
        } else if (currentOperator === "*") {
          previousValue *= currentValue;
        } else if (currentValue === 0) {
          // Handle division by 0
          previousValue = "Cannot divide by 0";
          currentValue = "";  // Reset the current value to an empty string
        } else {
          previousValue /= currentValue;
        }
      
        // Check if the previous value is the error message for dividing by 0
        if (previousValue === "Cannot divide by 0") {
          // If the previous value is the error message, do not round it
        } else {
          // Round the result to 2 decimal places and convert it to a string
          previousValue = roundNumber(previousValue);
          previousValue = previousValue.toString();
          currentValue = "";  // Reset the current value to an empty string
        }
      }
      
      function addDecimal() {
        // Only add a decimal point if the current value doesn't already include one
        if (!currentValue.includes(".")) {
          currentValue += ".";
        }
      }
      
      function roundNumber(num) {
        // If the number is an integer, return it as is
        if (num % 1 === 0) {
          return num;
          if(currentOperator){
            currentValue = "";
        }
        currentValue += number;
        } else {
          // Otherwise, round it to 2 decimal places and return it
          return parseFloat(num.toFixed(4));
        }
      }
      
      
      
      
