let displayValue = [];
let state = "start";
let firstOperand = "";
let operation = "";
let secondOperand = "";
const calculator = document.querySelector("#calculator");
const screen = document.querySelector("#screen");
calculator.addEventListener("click", (e) => {
  if (e.target.classList.contains("btn_digits")) {
    if (state === "start") {
      updateScreen(e.target.textContent);
    }
    if (state === "operationChosen") {
      displayValue = [];
      state = "secondOperandStarted";
      updateScreen(e.target.textContent);
      return;
    }

    if (state === "secondOperandStarted") {
      updateScreen(e.target.textContent);
    }
  }
  if (e.target.classList.contains("btn_operation")) {
    if (state === "start") {
      firstOperand = screen.textContent;
      switch (e.target.textContent) {
        case "+":
          operation = add;
          break;
        case "-":
          operation = sub;
          break;
        case "*":
          operation = mult;
          break;
        case "/":
          operation = div;
          break;
      }
      state = "operationChosen";
    }
    if (state === "secondOperandStarted") {
      secondOperand = screen.textContent;
      let result =
        "" +
        operate(
          Number.parseFloat(firstOperand),
          Number.parseFloat(secondOperand),
          operation
        );
      screen.textContent = result;
      firstOperand = Number.parseFloat(screen.textContent);
      secondOperand = "";
      displayValue = [];
      switch (e.target.textContent) {
        case "+":
          operation = add;
          break;
        case "-":
          operation = sub;
          break;
        case "*":
          operation = mult;
          break;
        case "/":
          operation = div;
          break;
      }
      state = "operationChosen";
    }
  }
  if (e.target.textContent === "=") {
    if (state === "secondOperandStarted") {
      secondOperand = screen.textContent;
      let result =
        "" +
        operate(
          Number.parseFloat(firstOperand),
          Number.parseFloat(secondOperand),
          operation
        );
      screen.textContent = result;
      displayValue = [];
      state = "start";
      firstOperand = "";
      operation = "";
      secondOperand = "";
    }
  }
});

function updateDisplayValue(symbol) {
  if (displayValue.length <= 9) {
    if (symbol == "." && displayValue.indexOf(symbol) != -1) {
      return;
    }
    displayValue.push(symbol);
  }
}

function updateScreen(symbol) {
  updateDisplayValue(symbol);
  screen.textContent = displayValue.join("");
}

// math functions

function add(x, y) {
  return x + y;
}

function sub(x, y) {
  return x - y;
}

function mult(x, y) {
  return x * y;
}

function div(x, y) {
  return x / y;
}

function percent(x, y) {
  return (x / 100) * y;
}

function operate(x, y, func) {
  return func(x, y);
}
