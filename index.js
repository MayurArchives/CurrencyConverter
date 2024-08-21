import { countryList } from "./codes.js";

const BASE_URL =
  "https://v6.exchangerate-api.com/v6/af8e8a09d6b95d7e32c2f1e3/pair/";
const MSSG_URL = "https://api.exchangerate.host/convert";

let conv_rate = 80;
let amount = document.querySelector(".amount input");
let userAmount = amount.value;
let form = document.getElementById("form");
let btn = document.querySelector(".btn");
let convHeading = document.querySelector(".conv-ans");

let msgDiv = document.querySelector(".msg");
const dropdowns = document.querySelectorAll(".dropdown select");

for (let select of dropdowns) {
  for (let currCode in countryList) {
    let newOption = document.createElement("option");
    newOption.innerText = currCode;
    newOption.value = currCode;
    if (select.name === "from" && currCode === "USD") {
      newOption.selected = "selected";
    } else if (select.name === "to" && currCode === "INR") {
      newOption.selected = "selected";
    }

    select.append(newOption);
  }
  select.addEventListener("change", (evt) => {
    const fromCurrency = document.querySelector("select[name='from']").value;
    const toCurrency = document.querySelector("select[name='to']").value;
    const amount = 1;
    updateExchangeRate(fromCurrency, toCurrency, amount);
    updateFlag(evt.target);
  });
}

form.addEventListener("submit", (e) => {
  e.preventDefault();
});

amount.addEventListener("change", (e) => {
  let val = e.target.value;
  console.log(val);
  userAmount = val;
});
btn.addEventListener("click", () => {
  console.log(conv_rate, Number(userAmount) * conv_rate);

  convHeading.innerText = `${Number(userAmount)} ${document
    .querySelector("select[name='from']")
    .value.toUpperCase()} =  ${(Number(userAmount) * conv_rate).toFixed(
    3
  )} ${document.querySelector("select[name='to']").value.toUpperCase()}`;
});

const updateFlag = (element) => {
  let currCode = element.value;
  let countryCode = countryList[currCode].toLowerCase();
  let newSrc = `https://flagcdn.com/w320/${countryCode}.png`;
  console.log(countryCode, newSrc);
  let img = element.parentElement.querySelector("img");
  img.src = newSrc;
};

const updateExchangeRate = async (fromCurrency, toCurrency, amount) => {
  if (fromCurrency && toCurrency) {
    try {
      const API_KEY = "O9UI88kVc3duhK9ouPzypuOTHHKgMyj3";
      const response = await fetch(
        `https://api.apilayer.com/exchangerates_data/convert?from=${fromCurrency}&to=${toCurrency}&amount=${amount}`,
        {
          headers: {
            apikey: API_KEY,
          },
        }
      );

      if (!response.ok) {
        throw new Error("Network response was not ok");
      }

      const data = await response.json();

      if (data.success === false) {
        console.error("Error with API request:", data.error);
        msgDiv.innerText = `Error: ${data.error.info}`;
        return;
      }

      const rate = data.result;
      console.log("rate" + rate);

      conv_rate = rate;

      if (rate) {
        msgDiv.innerText = `1 ${fromCurrency} = ${rate} ${toCurrency}`;
      } else {
        msgDiv.innerText = `Exchange rate not available.`;
      }
    } catch (error) {
      console.error("Error fetching exchange rate:", error);
      msgDiv.innerText = `Exchange rate not available.`;
    }
  }
};

updateExchangeRate("USD", "INR", 1);
