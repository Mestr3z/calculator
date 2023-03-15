const display = document.getElementById("result");
const clearButton = document.getElementById("clear");
const backspaceButton = document.getElementById("backspace");
const percentageButton = document.getElementById("percentage");
const divideButton = document.getElementById("divide");
const multiplyButton = document.getElementById("multiply");
const subtractButton = document.getElementById("subtract");
const addButton = document.getElementById("add");
const equalsButton = document.getElementById("equals");
const decimalButton = document.getElementById("decimal");
const numberButtons = document.querySelectorAll(".number");

let firstOperand = null;
let secondOperand = null;
let currentOperator = null;
let shouldResetDisplay = false;

function clear() {
  display.value = "";
  firstOperand = null;
  secondOperand = null;
  currentOperator = null;
}

function backspace() {
  display.value = display.value.slice(0, -1);
}

function percentage() {
  const value = parseFloat(display.value) / 100;
  display.value = value.toString();
}

function inputDecimal() {
  if (!display.value.includes(".")) {
    display.value += ".";
  }
}

function inputNumber(number) {
  if (shouldResetDisplay) {
    display.value = "";
    shouldResetDisplay = false;
  }
  display.value += number;
}

function handleOperator(operator) {
  if (firstOperand === null) {
    firstOperand = parseFloat(display.value);
    currentOperator = operator;
    shouldResetDisplay = true;
  } else if (currentOperator) {
    const result = operate(
      currentOperator,
      firstOperand,
      parseFloat(display.value)
    );
    display.value = result.toString();
    firstOperand = result;
    currentOperator = operator;
    shouldResetDisplay = true;
  } else {
    currentOperator = operator;
    shouldResetDisplay = true;
  }
}

function operate(operator, operand1, operand2) {
  switch (operator) {
    case "+":
      return operand1 + operand2;
    case "-":
      return operand1 - operand2;
    case "×":
      return operand1 * operand2;
    case "÷":
      if (operand2 === 0) {
        alert("Cannot divide by zero");
        return null;
      }
      return operand1 / operand2;
    default:
      return null;
  }
}

clearButton.addEventListener("click", clear);

backspaceButton.addEventListener("click", backspace);

percentageButton.addEventListener("click", percentage);

decimalButton.addEventListener("click", inputDecimal);

numberButtons.forEach((button) => {
  button.addEventListener("click", () => {
    inputNumber(button.textContent);
  });
});

divideButton.addEventListener("click", () => {
  handleOperator("÷");
});

multiplyButton.addEventListener("click", () => {
  handleOperator("×");
});

subtractButton.addEventListener("click", () => {
  handleOperator("-");
});

addButton.addEventListener("click", () => {
  handleOperator("+");
});

equalsButton.addEventListener("click", () => {
  if (currentOperator) {
    secondOperand = parseFloat(display.value);
    display.value = operate(
      currentOperator,
      firstOperand,
      secondOperand
    ).toString();
    firstOperand = null;
    secondOperand = null;
    currentOperator = null;
    shouldResetDisplay = true;
  }
});
