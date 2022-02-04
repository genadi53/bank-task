const banknoteTypes = [100, 50, 20, 10];

const LIMIT_WITHDRAW = 400;
const TAX = 0.2;

let pinCode = "";
let balance = 0;
let isBalanceValid = false;
let isPinCodeValid = false;

const withdrawsHistory = [];

// Helper function to validate if the input of the user is number
const isNumber = (n) => {
  return !isNaN(parseFloat(n)) && isFinite(n);
};

// loops until the user enters valid pin and account balance
do {
  pinCode = prompt("Enter pin code");
  if (isNumber(pinCode) && pinCode.length === 4) isPinCodeValid = true;
} while (!isPinCodeValid);

do {
  balance = prompt("Enter account balance");
  if (isNumber(balance) && balance > 0) isBalanceValid = true;
} while (!isBalanceValid);

// Displays the current balance on the Dom
const balanceDiv = document.querySelector("#balance");
balanceDiv.textContent = `Balance: ${balance}`;

// Selects the form and add an event listener for on submitting
const form = document.querySelector("form");
form.addEventListener("submit", async (e) => {
  e.preventDefault();
  const ammount = form.elements.ammount.value;
  const userPin = form.elements.pin.value;

  // Check if the submitted pin is equal to the one entered before
  if (userPin === pinCode) {
    // Check if the ammount is less than the limit
    if (ammount <= LIMIT_WITHDRAW) {
      // Check if the account balance is greater than the ammount to be withdrawn
      if (balance - ammount >= 0) {
        balance = balance - ammount - TAX;

        // Create data for the receipt
        const date = new Date().toUTCString();
        const change = calculateChange(ammount);
        const receipt = {
          date,
          ammount,
          change,
          balance,
        };
        const receiptDiv = document.querySelector("#receipt");

        let str = "Change is: ";
        // Iterate over keys(banknote type) and get how many there are of each of them
        Object.keys(change).forEach((key) => {
          str += `${change[key]}x${key} `;
        });
        str += "<br />";

        let message =
          `
        Withdraw ammount: ${ammount} <br />
        Balance left: ${balance} <br />` +
          str +
          `Tax: ${TAX} <br />
        Date: ${date}`;

        // Display and save the receipt and change the dispayed balance
        receiptDiv.innerHTML = message;
        receiptDiv.classList.remove("hidden");
        balanceDiv.textContent = `Balance: ${balance}`;
        withdrawsHistory.push(receipt);
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

// Add an event listener on the button and on click display the withdraws history
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
  historyDiv.classList.remove("hidden");
});

// Function to calculate the number and value of returned banknotes
const calculateChange = (number) => {
  // clause for the number to devide without reminder is added because our
  // banknotes' typer can only make numbers devidable by 10
  if (number <= 0 || number % 10 !== 0) return;
  const banknotes = [];

  // iterate over the types of banknotes and check if we cak take out
  // from the number and if we can we do, otherwise we check next type
  for (let i = 0; i <= banknoteTypes.length - 1; i++) {
    while (number >= banknoteTypes[i]) {
      number = number - banknoteTypes[i];
      banknotes.push(banknoteTypes[i]);
    }
  }

  // get number of banknotes of each type that we used
  // and save it in object that is returned
  const result = {};
  banknotes.forEach((x) => {
    result[x] = (result[x] || 0) + 1;
  });
  return result;
};
