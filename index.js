import { countryList } from "./codes.js";

const BASE_URL =
  "https://cdn.jsdelivr.net/gh/fawazahmed0/currency-api@1/latest/currencies/usd/inr.json";
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
  select.addEventListener("change", (evt)=>{
    updateFlag(evt.target);
  
    });
}
const updateFlag = (Element) => {
  let currCode= element.value;
  let countryCode = countryList[currCode];
  let newSrc = `https://cdn-icons-png.flaticon.com${countryCode}/512/555/555526.png`
  let img =  element.parentElement.querySelector("img");
  img.src = newSrc;

};
 
