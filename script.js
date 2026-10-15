//Global variavles:

const buttons = document.querySelectorAll("button");
const inputDisplay = document.querySelector(".input-display");

let value = null;
let num1 = "";
let num2 = "";
let operator = "";
let display = "";
const OPERATORS = ["+", "-", "*", "/"];
let shouldResetDisplay = false;

// Functions to be activated by event

function renderDisplay() {
  const displayOperator =
    operator === "/" ? "÷" : operator === "*" ? "×" : operator;
  inputDisplay.textContent = num1 + displayOperator + num2;
}

function handleAC() {
  resetDisplayAndValues();
  renderDisplay();
  return;
}

function handleC() {
  if (num2) {
    num2 = num2.slice(0, -1);
  } else if (operator) {
    operator = "";
  } else if (num1) {
    num1 = num1.slice(0, -1);
  }
  renderDisplay();
}

function handleDecimal() {
  if (operator) {
    if (!num2.includes(".")) {
      num2 += num2 === "" ? "0." : ".";
    }
  } else {
    if (!num1.includes(".")) {
      num1 += num1 === "" ? "0." : ".";
    }
  }
  renderDisplay();
}

function convertToPercentage() {
  if (operator) {
    if (num2 === "") return;
    num2 = (Number(num2) / 100).toString();
  } else {
    if (num1 === "" || num1 === "ERR") return;
    num1 = (Number(num1) / 100).toString();
  }
  renderDisplay();
}

function handleEquals() {
  if (num1 === "" || num2 === "" || operator === "") {
    return;
  }
  const result = operate(operator, Number(num1), Number(num2));
  if (!Number.isFinite(result)) {
    num1 = "ERR";
  } else if (Number.isInteger(result)) {
    num1 = result.toString();
  } else {
    num1 = Number(result.toFixed(7)).toString();
  }
  num2 = "";
  operator = "";
  shouldResetDisplay = true;
  renderDisplay();
}

function handleOperator() {
  if (num1 === "" || num1 === "ERR") {
    return;
  }
  if (operator !== "" && num2 !== "") {
    const result = operate(operator, Number(num1), Number(num2));
    if (!Number.isFinite(result)) {
      num1 = "ERR";
      num2 = "";
      operator = "";
      shouldResetDisplay = true;
      renderDisplay();
      return;
    }
    num1 = Number.isInteger(result)
      ? result.toString()
      : Number(result.toFixed(7)).toString();
    num2 = "";
  }
  operator = value;
  shouldResetDisplay = false;
  renderDisplay();
}

function handleNumber() {
  let current = operator ? num2 : num1;
  current = current === "0" ? value : current + value;
  if (operator) num2 = current;
  else num1 = current;
  renderDisplay();
}

function resetDisplayAndValues() {
  display = "";
  num1 = "";
  num2 = "";
  operator = "";
}

// Simple calculation functions

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
  } else {
    return divide(num1, num2);
  }
}

// Event handler for all buttons
// This will direct to correct function based off of which buttons are pressed

for (let button of buttons) {
  button.addEventListener("click", (e) => {
    value = e.target.value || e.target.textContent;

    if (shouldResetDisplay && (value === "." || /^\d$/.test(value))) {
      resetDisplayAndValues();
      shouldResetDisplay = false;
    }

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
    } else if (value === "%") {
      convertToPercentage();
    } else {
      handleNumber();
    }
  });
}
