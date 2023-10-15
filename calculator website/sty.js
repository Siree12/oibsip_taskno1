let string = "";
let buttons = document.querySelectorAll('.button');
let pi = Math.PI;
let E = Math.E;

const calculator = document.getElementById('calculator');
const history = document.getElementById('history');
const historyButton = document.getElementById('historyButton');
const historyList = document.getElementById('historyList');
const clearHistoryButton = document.getElementById('clearHistoryButton');

function performCalculation(expression) {
    const calculatorHistory = JSON.parse(localStorage.getItem('calculatorHistory')) || [];
    calculatorHistory.push(`${expression}`);
    localStorage.setItem('calculatorHistory', JSON.stringify(calculatorHistory));
}

function showCalculatorView() {
    calculator.style.display = 'block';
    history.style.display = 'none';
}

function showHistoryView() {
    calculator.style.display = 'none';
    history.style.display = 'block';
    displayHistory();
}

function displayHistory() {
    const calculatorHistory = JSON.parse(localStorage.getItem('calculatorHistory')) || [];
    historyList.innerHTML = '';
    calculatorHistory.forEach(entry => {
        const listItem = document.createElement('li');
        listItem.textContent = entry;
        const deleteButton = document.createElement('button');
        deleteButton.textContent = 'Delete';
        deleteButton.addEventListener('click', () => deleteEntry(entry));

        listItem.appendChild(deleteButton);
        historyList.appendChild(listItem);

        var style = document.createElement('style');
        style = 'text/css';
        style.innerHTML = '.removeBttnClass  { position: absolute; top:91%;'
            + 'left: 22.7%transform: translate(-50%, -50%);-ms-transform: translate(-50%, -50%);'
            + 'background-color: white;cursor: pointer;border-radius: 5px;color: black;'
            + 'text-align: center;border-color: lightgray;height: 50px ! important;'
            + 'width: 53px;border-radius: 4px;padding: 10x 17px;border-width: thin}';
        document.head.appendChild(style);
        deleteButton.className = "removeBttnClass";
    });
}

function deleteEntry(entry) {
    const calculatorHistory = JSON.parse(localStorage.getItem('calculatorHistory')) || [];
    const newCalculatorHistory = calculatorHistory.filter(item => item !== entry);
    localStorage.setItem('calculatorHistory', JSON.stringify(newCalculatorHistory));
    displayHistory();
}

function clearHistory() {
    localStorage.setItem('calculatorHistory', JSON.stringify([]));
    displayHistory();
}
historyButton.addEventListener('click', () => {
    showHistoryView();
});

clearHistoryButton.addEventListener('click', () => {
    clearHistory();
});


const backButton = document.createElement('button');
backButton.textContent = 'Back to Calculator';
backButton.addEventListener('click', () => {
    showCalculatorView();
});
history.appendChild(backButton);
function initializeApp() {
    showCalculatorView();
}
function fact(num) {
    if (num < 0) {
        return -1;
    }
    else if (num == 0) {
        return 1;
    }
    else {
        let result = 1;
        for (var i = num; i > 1; i--) {
            result *= i;
        };
        return result;
    }
};
Array.from(buttons).forEach((button) => {
    button.addEventListener('click', (e) => {
        if (e.target.innerHTML == '=') {
            Ans = eval(string);
            document.querySelector('input').value = Ans;
            // let st = Ans.toString();
            // data.push(string + ' = ' + st);
            // updateDisplay();
            initializeApp();
            performCalculation(string + " = " + Ans);
            // appendToHistory('This is the second entry.');
            // localStorage.clear();
            // historyParagraph.innerHTML = '';

            string = Ans;
        }
        else if (e.target.innerHTML == 'C') {
            string = ""
            document.querySelector('input').value = string;
        }
        else if (e.target.innerHTML == '!') {
            string = eval(string);
            Ans = fact(string);
            document.querySelector('input').value = Ans;
            string = Ans;
        }
        else if (e.target.innerHTML == 'In') {
            string = eval(string);
            Ans = Math.log(string);
            document.querySelector('input').value = Ans;
            string = Ans;
        }
        else if (e.target.innerHTML == 'log') {
            string = eval(string);
            Ans = Math.log10(string);
            document.querySelector('input').value = Ans;
            string = Ans;
        }
        else if (e.target.innerHTML == 'sqrt') {
            string = eval(string);
            Ans = string ** (1 / 2);
            document.querySelector('input').value = Ans;
            string = Ans;
        }
        else {
            if (e.target.innerHTML == 'BS') {
                string = string.replace(string.charAt(string.length - 1), "");
                document.querySelector('input').value = string;
            }
            else {
                if (e.target.innerHTML == 'sin' || e.target.innerHTML == 'cos' || e.target.innerHTML == 'tan' || e.target.innerHTML == 'cosec' || e.target.innerHTML == 'sec' || e.target.innerHTML == 'cot') {
                    string = eval(string);
                    string = string * Math.PI / 180
                    if (e.target.innerHTML == 'sin') {
                        Ans = Math.sin(string);
                    }
                    else if (e.target.innerHTML == 'cos') {
                        Ans = Math.cos(string);
                    }
                    else if (e.target.innerHTML == 'tan') {
                        Ans = Math.tan(string);
                    }
                    else if (e.target.innerHTML == 'cosec') {
                        Ans = 1 / Math.sin(string);
                    }
                    else if (e.target.innerHTML == 'sec') {
                        Ans = 1 / Math.cos(string);
                    }
                    else if (e.target.innerHTML == 'cot') {
                        Ans = 1 / Math.tan(string);
                    }
                    document.querySelector('input').value = Ans;
                    string = Ans;
                }

                //console.log(e.target)
                else {
                    string = string + e.target.innerHTML;
                    document.querySelector('input').value = string;
                }

            }

        }

    })
})