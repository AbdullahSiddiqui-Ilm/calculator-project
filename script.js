let num1 = "";
let num2 = "";
let operator = "";
let shouldResetDisplay = false;

// refactored state and functions ------------------------------

const calc = {
  display: "0",
  firstValue: null,
  secondValue: null,
  operator: null,
  waitingForNewValue: false,
  shouldResetDisplay: false,
  decimal: false,
};

const OPERATORS = ["+", "-", "*", "/"];

function handleAC() {}
function handleC() {}
function handleDecimal() {}
function handleEquals() {}
function handleOperator() {}
function handleNumber() {}

//refactored state and functions ------------------------------

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

function operate(op, num1, num2) {
  if (op === "+") {
    return add(num1, num2);
  } else if (op === "-") {
    return subtract(num1, num2);
  } else if (op === "*") {
    return multiply(num1, num2);
  } else if (op === "/") {
    return divide(num1, num2);
  } else {
    return 0;
  }
}

const buttons = document.querySelectorAll("button");
const inputDisplay = document.querySelector(".input-display");

for (let button of buttons) {
  button.addEventListener("click", (e) => {
    value = e.target.textContent;

    if (value === "AC") {
      handleAC();
    } else if (value === "C") {
      handleC();
    } else if (value === ".") {
      handleDecimal();
    } else if (value === "=") {
      handleEquals();
    } else if (OPERATORS.includes(value)) {
      handleOperator();
    } else {
      handleNumber();
    }

    if (e.target.textContent === "AC") {
      inputDisplay.textContent = "";
      num1 = "";
      num2 = "";
      operator = "";
      return;
    }
    if (e.target.textContent === "=") {
      let result = operate(operator, Number(num1), Number(num2));
      inputDisplay.textContent = result;
      num1 = result.toString();
      num2 = "";
      operator = "";
      shouldResetDisplay = true;
      return;
    }
    if ("+-*/".includes(e.target.textContent) && num1 && num2) {
      num1 = operate(operator, Number(num1), Number(num2));
      num1 = num1.toString();
      inputDisplay.textContent = num1;
      num2 = "";
      operator = e.target.textContent;
      return;
    }
    if ("+-*/".includes(e.target.textContent)) {
      operator = e.target.textContent;
    } else if (operator === "") {
      num1 = num1 + e.target.textContent;
      inputDisplay.textContent = num1;
    } else if (operator && !num2) {
      num2 = num2 + e.target.textContent;
      inputDisplay.textContent = num2;
    }
  });
}
