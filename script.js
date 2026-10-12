//Global variavles:

const buttons = document.querySelectorAll("button");
const inputDisplay = document.querySelector(".input-display");

let result = null;
let value = null;
let num1 = "";
let num2 = "";
let operator = "";
let display = "";
const OPERATORS = ["+", "-", "*", "/"];

// Functions to be activated by event

function handleAC() {
  display = "";
  inputDisplay.textContent = display;
  num1 = "";
  num2 = "";
  operator = "";
  return;
}

function handleC() {
  display = "";
  if (num2) {
    num2 = num2.slice(0, -1);
    if ((num2 = "")) {
      display = num1 + operator;
    } else {
      display = num1 + operator + num2;
    }
  } else if (operator) {
    operator = "";
    display = num1;
  } else if (num1) {
    num1 = num1.slice(0, -1);
    display = num1;
  }
  inputDisplay.textContent = display;
}

function handleDecimal() {}

function handleEquals() {
  let result = operate(operator, Number(num1), Number(num2));
  result = result.toString();
  display = result;
  inputDisplay.textContent = display;
  num1 = result;
  num2 = "";
  operator = "";
  shouldResetDisplay = true;
  return;
}

function handleOperator() {
  if (OPERATORS.includes(operator) && num1) {
    num1 = operate(operator, Number(num1), Number(num2));
    num1 = num1.toString();
    inputDisplay.textContent = num1;
    num2 = "";
    operator = value;
    return;
  } else {
    operator = value;
    display = num1 + operator;
    inputDisplay.textContent = display;
  }
}

function handleNumber() {
  if (operator === "") {
    num1 = num1 + value;
    display = num1;
    inputDisplay.textContent = display;
  } else if (operator && !num2) {
    num2 = num2 + value;
    display = num1 + operator + num2;
    inputDisplay.textContent = display;
  }
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
  } else if (op === "/") {
    return divide(num1, num2);
  }
}

for (let button of buttons) {
  button.addEventListener("click", (e) => {
    value = e.target.textContent;
    console.log(display);

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
  });
}
