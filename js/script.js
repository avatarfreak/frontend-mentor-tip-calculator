//Getting element
const inputText = document.querySelector("input.bill__input");
const radBtn = document.querySelectorAll("input[name='tip']");
const customInput = document.querySelector("#tipcustom");
const peopleCount = document.querySelector("input.peopleCount");
const peopleLabel = document.querySelector("label.people-label");

//Display output
const tipAmount = document.querySelector("span.tip");
const totAmount = document.querySelector("span.total");

//Display Error
const errorTxt = document.querySelector("span.danger");

//ResetButton
const resetBtn = document.querySelector(".bill__display-reset");

//Initialize input value
let tip = 0;
let payment = 0;
let numOfPerson = 0;

//helper function
const pipe =
  (...fns) =>
  (param) => {
    return fns.reduce((acc, prev, idx) => prev(acc), param);
  };

const getValue = (elem) => parseFloat(elem);
const percentage = (num) => num * 0.01;
const totalTip = (tip) => (total) => total * percentage(tip);
const totalAmountInclusiveTip = (tip) => (total) => total + percentage(total * tip);
const divideTotalByPerson = (person) => (total) => person === 0 ? 0 : total / person;

//Tip Amount per person
const tipAmountPerPerson = () => {
  tipAmount.textContent = pipe(totalTip(tip), divideTotalByPerson(numOfPerson))(payment).toFixed(2);
};

//Total Amount per person
const totalPerPerson = () => {
  totAmount.textContent = pipe(
    totalAmountInclusiveTip(tip),
    divideTotalByPerson(numOfPerson)
  )(payment).toFixed(2);
};

//Loop all radio buttons
radBtn.forEach((buttons) => {
  buttons.addEventListener("change", (evt) => {
    let value = evt.target.value; //getting value of element
    if (evt.target.checked) {
      customInput.value = ""; //clear custom tip input if radio button is checked
    }
    tip = getValue(value);

    //Display output
    tipAmountPerPerson();
    totalPerPerson();
  });
});

//Custom input
customInput.addEventListener("input", (evt) => {
  let value = evt.target.value;

  //condition insure input is greater than 0
  if (value >= 0) {
    radBtn.forEach((btn) => {
      //disable the radio btn if it custom input tip is greater than zero
      if (btn.checked) {
        btn.checked = false;
      }
    });
    tip = getValue(value);
  }

  //Display output
  tipAmountPerPerson();
  totalPerPerson();
});

peopleCount.addEventListener("input", (evt) => {
  let value = evt.target.value;

  //Toggle the class of the elements  depending on the value.
  if (value <= 0) {
    evt.target.classList.add("active");
    peopleLabel.classList.add("active");
  } else {
    peopleLabel.classList.remove("active");
    evt.target.classList.remove("active");

    numOfPerson = getValue(value);
    payment = getValue(inputText.value || 0);

    //Display output
    tipAmountPerPerson();
    totalPerPerson();
  }
});

const reset = () => {
  tipAmount.textContent = "0.00";
  totAmount.textContent = "0.00";
  inputText.value = "";
  peopleCount.value = "";
  customInput.value = "";
  tip = 0;
  numOfPerson = 0;
  payment = 0;
  peopleLabel.classList.remove("active");
  peopleCount.classList.remove("active");
  radBtn.forEach((btn) => (btn.checked = false));
};

resetBtn.addEventListener("click", reset);
