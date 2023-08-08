const btnCalc = document.querySelector(".btn_calc");
const resultLoseWeight = document.getElementById("cal_lose_weight");
const resultGainWeight = document.getElementById("cal_gain_weight");
const resultMaintenance = document.getElementById("cal_maintenance");
const gender = document.getElementsByName("gender");
const resultCalList = document.querySelector(".result_cal_list");
let activity = 0;

function identifyGender() {
  let isMale;
  if (gender[0].checked === true) {
    isMale = true;
  } else {
    isMale = false;
  }
  return isMale;
}

btnCalc.addEventListener("click", calcAmountCal);

function getActivity() {
  const radioItems = document.getElementsByName("radio_item");

  if (radioItems[0].checked === true) {
    activity = 1.2;
  } else if (radioItems[1].checked) {
    activity = 1.375;
  } else if (radioItems[2].checked) {
    activity = 1.55;
  } else if (radioItems[3].checked) {
    activity = 1.725;
  } else {
    activity = 1.9;
  }
  return activity;
}

let calLose;
function calcAmountCal(event) {
  event.preventDefault();
  calcCalMaintenance();
  calcCalGain();
  calcCalLose();
}

document.addEventListener("DOMContentLoaded", function () {
  const ageInput = document.getElementById("age");
  const weightInput = document.getElementById("weight");
  const heightInput = document.getElementById("height");
  ageInput.addEventListener("input", () => removeLettersFromInput(ageInput));
  weightInput.addEventListener("input", () =>
    removeLettersFromInput(weightInput)
  );
  heightInput.addEventListener("input", () =>
    removeLettersFromInput(heightInput)
  );
});

function removeLettersFromInput(numericInput) {
  const inputValue = numericInput.value;
  const numericValue = inputValue.replace(/\D/g, "");
  if (inputValue !== numericValue) {
    numericInput.value = numericValue;
  }
}

function calcCalMaintenance() {
  const age = document.getElementById("age").value;
  const height = document.getElementById("height").value;
  const weight = document.getElementById("weight").value;
  activity = getActivity();
  const isMale = identifyGender();
  let amountCalMaintenance;

  if (isMale === true) {
    amountCalMaintenance = Math.floor(
      (10 * weight + 6.25 * height - 5 * age + 5) * activity
    );
  } else {
    amountCalMaintenance = Math.floor(
      (10 * weight + 6.25 * height - 5 * age - 161) * activity
    );
  }

  resultMaintenance.innerHTML = amountCalMaintenance;

  return amountCalMaintenance;
}

function calcCalLose() {
  let amountCalMaintenance = calcCalMaintenance();
  const amountCalLose = Math.floor(
    amountCalMaintenance - amountCalMaintenance * 0.15
  );

  resultLoseWeight.innerHTML = amountCalLose;

  return amountCalLose;
}

function calcCalGain() {
  let amountCalMaintenance = calcCalMaintenance();
  const amountCalGain = Math.floor(
    amountCalMaintenance + amountCalMaintenance * 0.15
  );

  resultGainWeight.innerHTML = amountCalGain;

  return amountCalGain;
}

// age = 20
// height = 155
// weight = 50

// 1. men500 + 968.75 - 100  + 5 * 1,2 = 1 648.5 = 1 401,225
// 1. women500 + 968.75 - 100  -161 * 1,2 = 1 449.3 = 1 231,905
// 2. 500 + 968.75 - 100 * 1,375 = 1 882.031
// 3. 500 + 968.75 - 100 * 1,55 = 2 121,562
// 4. 500 + 968.75 - 100 * 1,725 = 2 361,093
// 5. 500 + 968.75 - 100 * 1,9 = 2 600,625

const btnSearch = document.querySelector(".btn_search");
btnSearch.addEventListener("click", () => search());
const calListResultProd = document.querySelector(".result_list_cal_prod");
const appId = "5852526f";
const appKey = "ecf68117ecc106173d897792ae1d16b8";
const bruttoInput = document.getElementById("brutto");
const prodInput = document.getElementById("prod_name");
const fats = document.querySelector(".fats");
const prodNameWrap = document.querySelector(".prod_name");
const btnAdd = document.querySelector(".btn_add");
const image = document.querySelector(".img");

let prodName;
let brutto;
let isBruttoDefault;

function getCal(food) {
  let amountCal = food.nutrients.ENERC_KCAL;
  amountCal = calcAmountBaseOnBrutto(amountCal, brutto);
  return amountCal;
}

function isBruttoInputValid() {
  bruttoInput.value = bruttoInput.value.trim();
  const reg = /\d+$/;
  if (bruttoInput.value === "") {
    createError("input_brutto", "Input brutto can't be empty");
    highlightError(bruttoInput);
    return false;
  } else if (!reg.test(bruttoInput.value)) {
    createError("input_brutto", "Input brutto can be filled only with numbers");
    highlightError(bruttoInput);
    return false;
  } else {
    removeStyleOfError(bruttoInput);
    return true;
  }
}

function highlightError(input) {
  input.classList.add("style_for_error");
}
function removeStyleOfError(input) {
  input.classList.remove("style_for_error");
}

function isProdInputValid() {
  prodInput.value = prodInput.value.trim();
  const reg = /^[a-zA-Z]+$/;
  if (prodInput.value === "") {
    createError("input_prod_name", "Input name of product can't be empty");
    highlightError(prodInput);
    return false;
  } else if (!reg.test(prodInput.value)) {
    createError(
      "input_prod_name",
      "Input name of product can be filled only with letters"
    );
    highlightError(prodInput);
    return false;
  } else {
    removeStyleOfError(prodInput);
    return true;
  }
}

function getBrutto() {
  return (brutto = bruttoInput.value);
}

function calcAmountBaseOnBrutto(amount, brutto) {
  isBruttoDefaultTrue();
  if (isBruttoDefault === false) {
    amount = (amount / 100) * brutto;
  }
  return amount.toFixed(2);
}

function isBruttoDefaultTrue() {
  isBruttoDefault = true;
  if (Number(brutto) === 100) {
    isBruttoDefault = true;
  } else {
    isBruttoDefault = false;
  }
  return isBruttoDefault;
}

function getFats(food) {
  let fatsValue = food.nutrients.FAT;
  fatsValue = calcAmountBaseOnBrutto(fatsValue, brutto);
  return fatsValue;
}

function getImg(food) {
  imgSrc = food.image;
  return imgSrc;
}

function getProteins(food) {
  let proteinsValue = food.nutrients.PROCNT;
  proteinsValue = calcAmountBaseOnBrutto(proteinsValue, brutto);
  return proteinsValue;
}

function getCarbohydrates(food) {
  let carbohydratesValue = food.nutrients.CHOCDF;
  carbohydratesValue = calcAmountBaseOnBrutto(carbohydratesValue, brutto);
  return carbohydratesValue;
}

function displayCal(amountCal) {
  const calResult = document.querySelector(".cal");
  return (calResult.textContent = amountCal);
}

function displayFats(fatsValue) {
  return (fats.textContent = fatsValue);
}
function displayProteins(proteinsValue) {
  const proteins = document.querySelector(".proteins");
  return (proteins.textContent = proteinsValue);
}
function displayCarbohydrates(carbohydratesValue) {
  const carbohydrates = document.querySelector(".carbohydrates");
  return (carbohydrates.textContent = carbohydratesValue);
}

let currentFood;

btnAdd.addEventListener("click", () => {
  addProd(prodName, currentFood); // Передаем productName и food в функцию addProduct
});

function getRequest() {
  prodName = getProd();
  const url = getUrl();
  isBruttoInputValid();
  isProdInputValid();
  const error = document.querySelector(".err");
  if (error !== null) {
    return;
  } else {
    wrappCalcProdResult.classList.add("active");
  }

  fetch(url)
    .then((response) => response.json())
    .then((data) => {
      // Обработка ответа API
      const hints = data.hints;

      // Проверяем, есть ли результаты поиска
      if (hints && hints.length > 0) {
        const firstResult = hints[0];
        const food = firstResult.food;
        currentFood = food;
        image.src = getImg(food);
        console.log(food.image);
        // Выводим калорийность и другую информацию о продукте

        prodNameWrap.textContent = prodName;
        displayCal(getCal(food));
        displayFats(getFats(food));
        displayProteins(getProteins(food));
        displayCarbohydrates(getCarbohydrates(food));
      } else {
        createError("error_not_found", "Can't find product");
      }
    })

    .catch((error) => {
      console.error("Ошибка при выполнении запроса:", error);
    });
}

function createButtonDelete() {
  const btnDelete = document.createElement("button");
  btnDelete.textContent = "Delete";
  btnDelete.classList.add("btn_delete");
  return btnDelete;
}

function getProd() {
  const prodName = document.getElementById("prod_name").value;
  return prodName;
}

function getUrl() {
  const url = `https://api.edamam.com/api/food-database/v2/parser?app_id=${appId}&app_key=${appKey}&ingr=${encodeURIComponent(
    prodName
  )}`;
  return url;
}
const wrappCalcProdResult = document.querySelector(".wrapper_calc_prod_result");

function search() {
  event.preventDefault();
  btnAdd.classList.add("active");
  checkErrors();
  brutto = getBrutto();
  prodName = getProd();

  getRequest();
}

let calArray = [];
let fatsArray = [];
let proteinsArray = [];
let carbohydratesArray = [];

function getSumCal(cal) {
  calArray.push(+cal);
  updateTotalAmountCal();
}

function getSumFats(fats) {
  fatsArray.push(fats);
  updateTotalAmountFats();
}

function getSumProteins(proteins) {
  proteinsArray.push(proteins);
  updateTotalAmountProteins();
}

function getSumCarbohydrates(carbohydrates) {
  carbohydratesArray.push(carbohydrates);
  updateTotalAmountCarbohydrates();
}

const totalCal = document.querySelector(".total_cal");
const totalFats = document.querySelector(".total_fats");
const totalProteins = document.querySelector(".total_proteins");
const totalCarbohydrates = document.querySelector(".total_carbohydrates");
const totalAddedCal = document.querySelector(".total_added_cal");

function displayTotal() {
  totalAddedCal.classList.add("active");
}

function addFats(food) {
  const fats = document.createElement("span");
  const fatsValue = getFats(food);
  fats.textContent = fatsValue;
  return fats;
}

function addProteins(food) {
  const proteins = document.createElement("span");
  const proteinsValue = getProteins(food);
  proteins.textContent = proteinsValue;
  return proteins;
}

function addCarbohydrates(food) {
  const carbohydrates = document.createElement("span");
  const carbohydratesValue = getCarbohydrates(food);
  carbohydrates.textContent = carbohydratesValue;
  return carbohydrates;
}

function addProd(prodName, food) {
  const listHead = document.querySelector(".list_head");
  listHead.classList.add("active");
  const prodItemWrap = document.createElement("li");
  const prodItem = document.createElement("span");

  const img = document.createElement("img");
  img.classList.add("img");
  img.src = getImg(food);
  prodItemWrap.insertAdjacentElement("afterbegin", img);

  const prodNameWrapp = document.createElement("span");
  prodNameWrapp.textContent = prodName;
  prodItemWrap.insertAdjacentElement("beforeend", prodNameWrapp);

  const amountCal = getCal(food);
  prodItem.textContent = amountCal;
  calListResultProd.insertAdjacentElement("afterbegin", prodItemWrap);
  prodItemWrap.insertAdjacentElement("beforeend", prodItem);

  const fats = addFats(food);

  prodItemWrap.insertAdjacentElement("beforeend", fats);

  const proteins = addProteins(food);
  prodItemWrap.insertAdjacentElement("beforeend", proteins);

  const carbohydrates = addCarbohydrates(food);

  prodItemWrap.insertAdjacentElement("beforeend", carbohydrates);

  displayTotal();
  getSumCal(amountCal);
  getSumFats(+fats.textContent);
  getSumProteins(+proteins.textContent);
  getSumCarbohydrates(+carbohydrates.textContent);

  const btnDelete = createButtonDelete();
  prodItemWrap.appendChild(btnDelete);
  btnDelete.addEventListener("click", deleteItem);
  return prodItem;
}

function deleteItem(event) {
  btnDelete = event.target;
  btnDelete.parentElement.remove();
  calArray.pop();
  updateTotalAmountCal();
  fatsArray.pop();
  updateTotalAmountFats();
  proteinsArray.pop();
  updateTotalAmountProteins();
  carbohydratesArray.pop();
  updateTotalAmountCarbohydrates();
}

function updateTotalAmountCal() {
  const totalAmount = calArray.reduce((acc, current) => acc + current, 0);
  totalCal.textContent = totalAmount;
  return totalAmount;
}

function updateTotalAmountFats() {
  const totalAmountFats = fatsArray.reduce((acc, current) => acc + current, 0);
  totalFats.textContent = totalAmountFats.toFixed(2);
}

function updateTotalAmountProteins() {
  const totalAmountProteins = proteinsArray.reduce(
    (acc, current) => acc + current,
    0
  );
  totalProteins.textContent = totalAmountProteins.toFixed(2);
}

function updateTotalAmountCarbohydrates() {
  const totalAmountCarbohydrates = carbohydratesArray.reduce(
    (acc, current) => acc + current,
    0
  );
  console.log(totalAmountCarbohydrates);
  totalCarbohydrates.textContent = totalAmountCarbohydrates.toFixed(2);
}

const btnCalcLoseWeight = document.querySelector(".btn_calc_lose_weight");
const calcRestResult = document.querySelector(".calc_rest_result");
const btnCalcMaintence = document.querySelector(".btn_calc_maintence_weight");
const btnCalcGain = document.querySelector(".btn_calc_gain_weight");

btnCalcLoseWeight.addEventListener("click", () => {
  calcRestCal(calcCalLose());
});

// btnCalcMaintence.addEventListener("click", () => {
//   calcRestCal(calcCalMaintenance());
// });

// btnCalcGain.addEventListener("click", () => {
//   calcRestCal(calcCalGain());
// });

function calcRestCal(amountCal) {
  calcRestResult.classList.add("active");

  let quentityCal = updateTotalAmountCal();
  const leftCal = amountCal - quentityCal;
  console.log(leftCal);
  if (leftCal >= 0) {
    calcRestResult.textContent = `Amount of remaining calories is ${leftCal} calories`;
  } else if (leftCal < 0) {
    calcRestResult.textContent = "You don't have any calories left";
  }
}

const form = document.querySelector(".form_calc");

function createError(className, text) {
  let p = document.createElement("p");
  p.classList.add("err");
  p.innerHTML = text;
  form.insertAdjacentElement("beforeend", p);
  p.classList.add(`${className}`);
  return p;
}

function checkErrors() {
  let errors = document.getElementsByClassName("err");
  errors = Array.from(errors);
  for (err of errors) {
    if (err !== null) {
      err.remove();
    }
  }
}
