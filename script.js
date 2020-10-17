const calculator = document.querySelector("#calculator");
const screen = document.querySelector("#screen");
const digitButtons = document.querySelectorAll(".btn_digits");
const operations = document.querySelectorAll(".btn_operation");
const back = document.querySelector("#btn_back");
const enter = document.querySelector("#btn_enter");
const clear = document.querySelector("#btn_C");
const signchange = document.querySelector("#btn_signchange");
const body = document.querySelector("body");
let enterWasPressed = false;

screen.textContent = "0";
let arrOfSteps = [];

document.addEventListener("keyup", (event) => {
  if ((+event.key >= 0 && +event.key <= 9) || event.key === ".") {
    handlingDigits(event);
  } else if (
    event.key === "/" ||
    event.key === "*" ||
    event.key === "+" ||
    event.key === "-"
  ) {
    handlingOperations(event);
  } else if (event.key === "Enter") {
    enterHandling();
  } else if (event.key === "Escape") {
    clearHandling();
  } else if (event.key === "Backspace") {
    backHandling();
  } else {
    console.log(event.key);
  }
});

function handlingDigits(event) {
  let source;
  if (event.type === "click") {
    source = event.target.textContent;
  } else if (event.type === "keyup") {
    source = event.key;
  }

  if (arrOfSteps.length === 0) {
    arrOfSteps.push(source);
    screen.textContent = arrOfSteps[0];
  } else if (arrOfSteps.length === 1) {
    if ((arrOfSteps[0] && source === "." && arrOfSteps[0].includes(".")) || arrOfSteps[0].length > 8) {
      return;
    } else if (enterWasPressed) {
      arrOfSteps[0] = source;
      screen.textContent = arrOfSteps[0];
      enterWasPressed = false;
    } else {
      arrOfSteps[0] += source;
      screen.textContent = arrOfSteps[0];
    }
  } else if (arrOfSteps.length === 2) {
    arrOfSteps.push(source);
    screen.textContent = arrOfSteps[2];
  } else if (arrOfSteps.length === 3) {
    if ((arrOfSteps[2] && source === "." && arrOfSteps[2].includes(".")) || arrOfSteps[2].length > 8) {
      return;
    }
    arrOfSteps[2] += source;
    screen.textContent = arrOfSteps[2];
  }
  console.log(arrOfSteps);
}

digitButtons.forEach((button) =>
  button.addEventListener("click", (event) => handlingDigits(event))
);

function handlingOperations(event) {
  let source;
  if (event.type === "click") {
    source = event.target.textContent;
  } else if (event.type === "keyup") {
    source = event.key;
  }
  console.log(source);
  if (arrOfSteps.length === 0) {
    arrOfSteps.push("0", chooseOperation(source));
  } else if (arrOfSteps.length === 1) {
    arrOfSteps.push(chooseOperation(source));
  } else if (arrOfSteps.length === 2) {
    arrOfSteps[1] = chooseOperation(source);
  } else if (arrOfSteps.length === 3) {
    let result = operate(arrOfSteps[0], arrOfSteps[2], arrOfSteps[1]);
    arrOfSteps = [];
    arrOfSteps[0] = result;
    arrOfSteps[1] = chooseOperation(source);
    screen.textContent = arrOfSteps[0];
  }
  console.log(arrOfSteps);
}

operations.forEach((button) =>
  button.addEventListener("click", (event) => {
    handlingOperations(event);
  })
);

enter.addEventListener("click", (event) => {
  enterHandling(event);
});

function enterHandling() {
  if (arrOfSteps.length === 3) {
    let result = operate(arrOfSteps[0], arrOfSteps[2], arrOfSteps[1]);
    arrOfSteps = [];
    arrOfSteps[0] = "" + result;
    screen.textContent = arrOfSteps[0];
    enterWasPressed = true;
  }
  console.log(arrOfSteps);
}

clear.addEventListener("click", () => {
  clearHandling();
});

function clearHandling() {
  arrOfSteps = [];
  screen.textContent = "0";
  console.log(arrOfSteps);
}

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

back.addEventListener("click", () => {
  backHandling();
});

function backHandling() {
  if (arrOfSteps.length === 1) {
    if (screen.textContent.length > 1) {
      screen.textContent = screen.textContent.substring(
        0,
        screen.textContent.length - 1
      );
      arrOfSteps[0] = screen.textContent;
    } else if (screen.textContent.length === 1) {
      screen.textContent = "0";
      arrOfSteps[0] = "0";
    }
  } else if (arrOfSteps.length === 3) {
    if (screen.textContent.length > 1) {
      screen.textContent = screen.textContent.substring(
        0,
        screen.textContent.length - 1
      );
      arrOfSteps[2] = screen.textContent;
    } else if (screen.textContent.length === 1) {
      screen.textContent = "0";
      arrOfSteps[2] = "0";
    }
    console.log(arrOfSteps);
  }
}

function chooseOperation(button) {
  switch (button) {
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

// math functions

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
  let result = Math.round(func(x, y) * 10000000000) / 10000000000;
  if (result === Infinity || result === -Infinity) {
    body.innerHTML = `<img src="./pics/divideByZero.png" alt="You broke it all!!!">`;
    setTimeout(() => {
      document.location.reload();
    }, 5000);
    return;
  }
  return result;
}
