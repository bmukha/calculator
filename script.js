let displayValue = [];
const calculator = document.querySelector("#calculator");
const screen = document.querySelector("#screen");
calculator.addEventListener("click", (e) => {
  if (e.target.classList.contains("btn_digits")) {
    // console.log(e.target.textContent);
    updateDisplayValue(e.target.textContent);
    screen.textContent = displayValue.join("");
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
