console.log("Web Calculator");

var value_1 = 0;
var value_2 = 0;

const calculator = {
    displayNumber: '0',
    operator: null,
    firstNumber: null,
    waitingForSecondNumber: false
 };
  
 function updateDisplay() {
    document.querySelector("#displayNumber").innerText = calculator.displayNumber;
 }
  
 function clearCalculator() {
    calculator.displayNumber = '0';
    calculator.operator = null;
    calculator.firstNumber = null;
    calculator.waitingForSecondNumber = false;
 }
  
 function inputDigit(digit) {
    if (calculator.waitingForSecondNumber && calculator.firstNumber === calculator.displayNumber) {
        calculator.displayNumber = digit;
    } else {
        if (calculator.displayNumber === '0') {
            calculator.displayNumber = digit;
        } else {
            calculator.displayNumber += digit;
        }
    }
 }
  
 function inverseNumber() {
    if (calculator.displayNumber === '0') {
        return;
    }
    calculator.displayNumber = calculator.displayNumber * -1;
 }
  
 function handleOperator(operator) {
    if (!calculator.waitingForSecondNumber) {
        calculator.operator = operator;
        calculator.waitingForSecondNumber = true;
        calculator.firstNumber = calculator.displayNumber;
    } else {
        alert('Operator sudah ditetapkan')
    }
 }
  
 function performCalculation() {
    if (calculator.firstNumber == null || calculator.operator == null) {
        alert("Anda belum menetapkan operator");
        return;
    }
  
    let result = 0;
    if (calculator.operator === "+") {
        
        if(value_1 != 0 && value_2 != 0){
            result = parseFloat((value_1)/100) + parseFloat((value_2)/100);
        } else {
            result = parseFloat(calculator.firstNumber) + parseFloat(calculator.displayNumber);
        }

    } 
    if (calculator.operator === "*") {
        if(value_1 != 0 && value_2 != 0){
            result = parseFloat((value_1)/100) * parseFloat((value_2)/100);
        } else {
            result = parseFloat(calculator.firstNumber) * parseFloat(calculator.displayNumber);
        }
    }
    if (calculator.operator === "/") {
        if(value_1 != 0 && value_2 != 0){
            result = parseFloat((value_1)/100) / parseFloat((value_2)/100);
        } else {
            result = parseFloat(calculator.firstNumber) / parseFloat(calculator.displayNumber);
        }
    }
    if (calculator.operator === "-") {
        if(value_1 != 0 && value_2 != 0){
            result = parseFloat((value_1)/100) - parseFloat((value_2)/100);
        } else {
            result = parseFloat(calculator.firstNumber) - parseFloat(calculator.displayNumber);
        }
    }
  
    // objek yang akan dikirimkan sebagai argumen fungsi putHistory()
    const history = {
        firstNumber: calculator.firstNumber,
        secondNumber: calculator.displayNumber,
        operator: calculator.operator,
        result: result.toFixed(2)
    }
    putHistory(history);
    calculator.displayNumber = result;
    renderHistory();
 }
  
 const buttons = document.querySelectorAll(".button");
 for (let button of buttons) {
    button.addEventListener('click', function(event) {
  
        // mendapatkan objek elemen yang diklik
        const target = event.target;
  
        if (target.classList.contains('clear')) {
            clearCalculator();
            updateDisplay();
            return;
        }
  
        if (target.classList.contains('negative')) {
            inverseNumber();
            updateDisplay();
            return;
        }
  
        if (target.classList.contains('equals')) {
            performCalculation();
            updateDisplay();
            return;
        }
  
        if (target.classList.contains('operator')) {
            handleOperator(target.innerText)
            updateDisplay();
            return;
        }

        if (target.classList.contains('percent')) {
            if(value_1 == 0){
                value_1 = document.getElementsByTagName('h1')[0].innerText;
            } else {
                value_2 = document.getElementsByTagName('h1')[0].innerText;
            }
        }
         
        inputDigit(target.innerText);
        updateDisplay()
        
    });
 }
 
