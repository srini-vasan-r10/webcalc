// calc-script.js
const display = document.getElementById('display');
const buttons = document.querySelectorAll('.button-container button');
const memoryButton = document.getElementById('memory');
const memoryDialog = document.getElementById('memory-dialog');
const memoryContent = document.getElementById('memory-content');
const memoryClose = document.getElementById('memory-close');
const memoryList = document.getElementById('memory-list');

let currentInput = '';
let currentOperator = null;
let previousInput = null;
let memory = [];

buttons.forEach(button => {
    button.addEventListener('click', () => {
        const buttonText = button.textContent;
        const buttonId = button.id;

        if (!isNaN(buttonText) || buttonText === '.') {
            currentInput += buttonText;
            display.textContent = currentInput;

        } else if (button.classList.contains('operator')) {
            if (currentInput !== '') {
                previousInput = parseFloat(currentInput);
                currentInput = '';
                currentOperator = button.dataset.operator;
                display.textContent += button.dataset.operator;
            }
        } else if (buttonId === 'clear') {
            currentInput = '';
            previousInput = null;
            currentOperator = null;
            display.textContent = '';
        } else if (buttonId === 'equal') {
            if (currentOperator && previousInput !== null && currentInput !== '') {
                const num1 = previousInput;
                const num2 = parseFloat(currentInput);
                let result;

                switch (currentOperator) {
                    case '+': result = num1 + num2; break;
                    case '-': result = num1 - num2; break;
                    case '*': result = num1 * num2; break;
                    case '/': result = num1 / num2; break;
                    default: return;
                }
                display.textContent = result;
                currentInput = result.toString();
                previousInput = null;
                currentOperator = null;
            }
        } else if (buttonId === 'memory') {
            memoryDialog.style.display = "block";
            updateMemoryList();
        }
    });
});

memoryClose.onclick = function () {
    memoryDialog.style.display = "none";
}

window.onclick = function (event) {
    if (event.target == memoryDialog) {
        memoryDialog.style.display = "none";
    }
}

function updateMemoryList(){
    memoryList.innerHTML = "";//clear previous list
    memory.forEach(item =>{
        const listItem = document.createElement("li");
        listItem.textContent = item;
        memoryList.appendChild(listItem);
    })
    if(currentInput !== ""){
        const saveButton = document.createElement("button");
        saveButton.textContent = "Save Current Value";
        saveButton.addEventListener("click", ()=>{
            memory.push(currentInput)
            updateMemoryList();
        });
        memoryContent.appendChild(saveButton);
    }
}
