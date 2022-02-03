const banknoteTypes = {
  100: 100,
  50: 50,
  20: 20,
  10: 10,
};

const limit_withdraw = 400;
let pinCode = "";
1;
let balance = 0;
let isBalanceValid = false;
let isPinCodeValid = false;

function isNumeric(n) {
  return !isNaN(parseFloat(n)) && isFinite(n);
}

// do {
//   pinCode = prompt("Enter pin code");
//   if (isNumeric(pinCode) && pinCode.length === 4) isPinCodeValid = true;
// } while (!isPinCodeValid);

// do {
//   balance = prompt("Enter account balance");
//   if (isNumeric(balance) && balance > 0) isBalanceValid = true;
// } while (!isBalanceValid);

console.log("pin " + pinCode);
console.log(balance);

const form = document.querySelector("form");
form.addEventListener("submit", async (e) => {
  e.preventDefault();
  const ammount = form.elements.ammount.value;
  const userPin = form.elements.pin.value;
  console.log(ammount);
  console.log(userPin);

  if (userPin === pinCode) console.log("same");
});
