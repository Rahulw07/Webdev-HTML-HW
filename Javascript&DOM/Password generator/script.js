const inputSlider = document.querySelector("[data-lengthSlider");
const lengthDisplay = document.querySelector("[data-lengthNumber]");
const indicator = document.querySelector("[data-indicator]");
const symbols = '~`!@#$%^&*()_-+={[}]|:;"<,>.?/';
const uppercaseCheck = document.querySelector("#uppercase");
const lowercaseCheck = document.querySelector("#lowercase");
const numbersCheck = document.querySelector("#numbers");
const symbolsCheck = document.querySelector("#symbols");
const passwordDisplay = document.querySelector("[data-passwordDisplay]");
const copyMsg = document.querySelector("[data-copyMsg]");
const allCheckBox = document.querySelectorAll("input[type=checkbox]");
const copyBtn = document.querySelector("[data-copy]");
const generateBtn = document.querySelector(".generateButton");





//initially
let password = "";
let passwordLength = 10;
let checkCount = 0;
handelSlider();
setIndicator("#ccc");

//set password length
function handelSlider()  {
inputSlider.value = passwordLength;
lengthDisplay.innerText = passwordLength;



}
function setIndicator(color){
    indicator.style.backgroundColor = color;
    indicator.style.boxShadow = `0px 0px 12px 1px ${color}`;
}

function getRndInteger(min, max)  {
return Math.floor(Math.random() * (max-min)) + min;
}
function generateRandomNumber() {
  return getRndInteger(0,9);
}

function generateLowerCase() {
    return String.fromCharCode(getRndInteger(97, 123))
}
function generateUpperCase() {
    return String.fromCharCode(getRndInteger(65, 91))
}
function generateSymbol() {
    const randNum = getRndInteger(0, symbols.length);
    return symbols.charAt(randNum);
}

function calStrength() {
    let hasUpper = false;
    let hasLower = false;
    let hasNum = false;
    let hasSym = false;
    if(uppercaseCheck.checked) hasUpper = true;
    if(lowercaseCheck.checked) hasLower = true;
    if(numbersCheck.checked) hasNum = true;
    if(symbolsCheck.checked) hasSym = true;

    if (hasUpper && hasLower && (hasNum || hasSym) && passwordLength >= 8) {
        setIndicator("#0f0");
      } else if (
        (hasLower || hasUpper) &&
        (hasNum || hasSym) &&
        passwordLength >= 6
      ) {
        setIndicator("#ff0");
      } else {
        setIndicator("#f00");
      }
}
async function copyContent() {
  try {
    await navigator.clipboard.writeText(passwordDisplay.value);
    copyMsg.innerText = "copied";

  }
  catch(e) {
    copyMsg.innerText = "Failed";
  }
  //to make the copy wala span visible
  copyMsg.classList.add("active");

  setTimeout( () => {
    copyMsg.classList.remove("active");

  } , 2000);
}

function shufflePassword(array) {
  //Fisher yetes method
  for(let i = array.length-1; i>0; i--){
    //random J, find out using random function
    const j = Math.floor(Math.random() * (i + 1));
    //swap number at i index & j index
    const temp = array[i];
    array[i] = array[j];
    array[j] = temp;
  }
  let str = "";
  array.forEach( (el) =>  (str += el) );
  return str;
}

function handleCheckBoxChange() {
  checkCount = 0;
  allCheckBox.forEach((Checkbox) => {
    if(Checkbox.checked){
      checkCount++;
    }
  });

  //special condition
  if(passwordLength < checkCount) {
    passwordLength = checkCount;
    handelSlider();
  }
}

allCheckBox.forEach((Checkbox) => {
  Checkbox.addEventListener('change', handleCheckBoxChange);
})

inputSlider.addEventListener('input' , (e) => {
  passwordLength = e.target.value;
  handelSlider();
})

copyBtn.addEventListener('click', () => {
  if(passwordDisplay.value){
    copyContent();
  }
})

generateBtn.addEventListener('click', () => {
  if(checkCount == 0){
    return;
  }
  if(passwordLength < checkCount) {
    passwordLength = checkCount;
    handelSlider();
  }

  //journey to find a new password
  console.log("Starting the Journey");
  //remove the old  password
  password = "";

  let funcArr = [];
  if(uppercaseCheck.checked){
    funcArr.push(generateUpperCase);
  }

  if(lowercaseCheck.checked){
    funcArr.push(generateLowerCase);
  }

  if(numbersCheck.checked){
    funcArr.push(generateRandomNumber);
  }

  if(symbolsCheck.checked){
    funcArr.push(generateSymbol);
  }

  //compulsory addtion
  for(let i=0; i<funcArr.length; i++){
    password += funcArr[i]();
  }
  console.log("Compulsory addtion done");

  //remainig addition
  for(let i=0; i<passwordLength-funcArr.length; i++){
    let randIndex = getRndInteger(0, funcArr.length);
    console.log("randIndex" + randIndex);
    password += funcArr[randIndex]();
  }
  console.log("Remainig Addition done");
  //shuffle the password
  password = shufflePassword(Array.from(password));
  console.log("Shuffling done");
  //show in UI
  passwordDisplay.value = password;
  console.log("UI addition done");
  //calculate Strength
  calStrength();
});