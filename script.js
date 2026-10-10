function add(a, b) {
  return a + b;
}

function subtract(a, b) {
  return a - b;
}

function multiply(a, b) {
  return a * b;
}

function divide(a, b) {
  return a / b;
}

let num1 = "";
let num2 = "";
let operator = "";

function operate(operator, num1, num2) {
  if (operator === "+") {
    return add(num1, num2);
  } else if (operator === "-") {
    return subtract(num1, num2);
  } else if (operator === "*") {
    return multiply(num1, num2);
  } else if (operator === "/") {
    return divide(num1, num2);
  }
}

buttons = document.querySelectorAll("button");
inputDisplay = document.querySelector(".input-display");

for (let button of buttons) {
  button.addEventListener("click", (e) => {
    if (e.target.textContent === "AC") {
      inputDisplay.textContent = "";
      num1 = "";
      num2 = "";
      operator = "";
      return;
    }
    if (e.target.textContent === "=") {
      let result = operate(operator, Number(num1), Number(num2));
      console.log(result);
      inputDisplay.textContent = result;
      return;
    }
    if ("+-*/".includes(e.target.textContent)) {
      operator = e.target.textContent;
    } else if (operator === "") {
      num1 = num1 + e.target.textContent;
      inputDisplay.textContent = num1;
    } else if (operator) {
      num2 = num2 + e.target.textContent;
      inputDisplay.textContent = num2;
    }
  });
}
