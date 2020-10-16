const calculator = document.querySelector("#calculator");
const screen = document.querySelector("#screen");
const digitButtons = document.querySelectorAll(".btn_digits");
const operations = document.querySelectorAll(".btn_operation");
const back = document.querySelector("#btn_back");
const enter = document.querySelector("#btn_enter");
const clear = document.querySelector("#btn_C");
const signchange = document.querySelector("#btn_signchange");

screen.textContent = "0";
let arrOfSteps = [];

digitButtons.forEach((button) =>
  button.addEventListener("click", () => {
    if (arrOfSteps.length === 0) {
      arrOfSteps.push(button.textContent);
      screen.textContent = arrOfSteps[0];
    } else if (arrOfSteps.length === 1) {
      if (arrOfSteps[0] && arrOfSteps[0].includes(".") && button.textContent === ".") {
        return;
      }
      arrOfSteps[0] += button.textContent;
      screen.textContent = arrOfSteps[0];
    } else if (arrOfSteps.length === 2) {
      arrOfSteps.push(button.textContent);
      screen.textContent = arrOfSteps[2];
    } else if (arrOfSteps.length === 3) {
      if (arrOfSteps[2] && arrOfSteps[2].includes(".") && button.textContent === ".") {
        return;
      }
      arrOfSteps[2] += button.textContent;
      screen.textContent = arrOfSteps[2];
    }
    console.log(arrOfSteps);
  })
);

operations.forEach((button) =>
  button.addEventListener("click", () => {
    if (arrOfSteps.length === 0) {
      arrOfSteps.push("0", chooseOperation(button));
    } else if (arrOfSteps.length === 1) {
      arrOfSteps.push(chooseOperation(button));
    } else if (arrOfSteps.length === 2) {
      arrOfSteps[1] = chooseOperation(button);
    } else if (arrOfSteps.length === 3) {
      let result = operate(arrOfSteps[0], arrOfSteps[2], arrOfSteps[1]);
      arrOfSteps = [];
      arrOfSteps[0] = result;
      arrOfSteps[1] = chooseOperation(button);
      screen.textContent = arrOfSteps[0];
    }
    console.log(arrOfSteps);
  })
);

enter.addEventListener("click", () => {
  if (arrOfSteps.length === 3) {
    let result = operate(arrOfSteps[0], arrOfSteps[2], arrOfSteps[1]);
    arrOfSteps = [];
    arrOfSteps[0] = result;
    screen.textContent = arrOfSteps[0];
  }
  console.log(arrOfSteps);
});

clear.addEventListener("click", () => {
  arrOfSteps = [];
  screen.textContent = "0";
  console.log(arrOfSteps);
});

signchange.addEventListener("click", () => {
  if (arrOfSteps.length === 1 || arrOfSteps.length === 2) {
    if (arrOfSteps[0][0] === "-") {
      arrOfSteps[0] = arrOfSteps[0].slice(1);
      screen.textContent = arrOfSteps[0];
      console.log(arrOfSteps[0]);
    } else {
      arrOfSteps[0] = "-" + arrOfSteps[0];
      screen.textContent = arrOfSteps[0];
    }
  } else if (arrOfSteps.length === 3) {
    if (arrOfSteps[2][0] === "-") {
      arrOfSteps[2] = arrOfSteps[0].slice(1);
      screen.textContent = arrOfSteps[2];
      console.log(arrOfSteps[2]);
    } else {
      arrOfSteps[2] = "-" + arrOfSteps[2];
      screen.textContent = arrOfSteps[2];
    }
  }
});

function chooseOperation(button) {
  switch (button.textContent) {
    case "+":
      return add;
    case "-":
      return sub;
    case "*":
      return mult;
    case "/":
      return div;
  }
}

// // math functions

function add(x, y) {
  return Number.parseFloat(x) + Number.parseFloat(y);
}

function sub(x, y) {
  return Number.parseFloat(x) - Number.parseFloat(y);
}

function mult(x, y) {
  return Number.parseFloat(x) * Number.parseFloat(y);
}

function div(x, y) {
  return Number.parseFloat(x) / Number.parseFloat(y);
}

function operate(x, y, func) {
  return func(x, y);
}
