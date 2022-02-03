const banknoteTypes = {
  100: 100,
  50: 50,
  20: 20,
  10: 10,
};

const LIMIT_WITHDRAW = 400;
const TAX = 0.2;

let pinCode = "";
let balance = 0;
let isBalanceValid = false;
let isPinCodeValid = false;

const withdrawsHistory = [];

function isNumeric(n) {
  return !isNaN(parseFloat(n)) && isFinite(n);
}

do {
  pinCode = prompt("Enter pin code");
  if (isNumeric(pinCode) && pinCode.length === 4) isPinCodeValid = true;
} while (!isPinCodeValid);

do {
  balance = prompt("Enter account balance");
  if (isNumeric(balance) && balance > 0) isBalanceValid = true;
} while (!isBalanceValid);

console.log("pin " + pinCode);
console.log(balance);

const balanceDiv = document.querySelector("#balance");
balanceDiv.textContent = `Balance: ${balance}`;

const form = document.querySelector("form");
form.addEventListener("submit", async (e) => {
  e.preventDefault();
  const ammount = form.elements.ammount.value;
  const userPin = form.elements.pin.value;
  console.log(ammount);
  console.log(userPin);

  if (userPin === pinCode) {
    if (ammount <= LIMIT_WITHDRAW) {
      if (balance - ammount >= 0) {
        balance = balance - ammount - TAX;
        const date = new Date().toUTCString();
        const receipt = {
          date,
          ammount,
          balance,
        };
        const receiptDiv = document.querySelector("#receipt");
        receiptDiv.innerHTML = `
        Withdraw ammount: ${ammount} <br />
        Balance left: ${balance} <br />
        Tax: ${TAX} <br />
        Date: ${date}`;
        balanceDiv.textContent = `Balance: ${balance}`;
        withdrawsHistory.push(receipt);
        console.log(withdrawsHistory);
      } else {
        alert("Not enough money in balance");
      }
    } else {
      alert("Cannot withdraw more than 400");
    }
  } else {
    alert("Wrong Pin!");
  }
});

const historyButton = document.querySelector("#btn-history");
historyButton.addEventListener("click", async (e) => {
  const historyDiv = document.querySelector("#history");
  let dataToDisplay = "<br /> Receipts <hr />";
  withdrawsHistory.forEach((r) => {
    dataToDisplay =
      dataToDisplay +
      `
      Withdraw ammount: ${r.ammount} <br />
      Balance left: ${r.balance} <br />
      Tax: ${TAX} <br />
      Date: ${r.date} <hr /> <br />`;
  });
  historyDiv.innerHTML = dataToDisplay;
});
