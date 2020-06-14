
const EXCHANGE_RATE_URL = 'https://api.exchangeratesapi.io/latest?base=';
const FLAG_SIZE = '20';

let getExchangeRate = rate => {
    //debugger
    return value => {
        return value * rate;
    }
}

let currencyImg = (currencyName='CNY') => {
    let imgEle = document.createElement('img');
    imgEle.setAttribute('height',FLAG_SIZE);
    imgEle.setAttribute('width', FLAG_SIZE);
    imgEle.setAttribute('src', getCountrySVGIconURL(currencyName));
    return imgEle;
}

const port = '8080';
const host = 'http://localhost';
const subFolder = 'img/currencyflags';
const url = `${host}:${port}/${subFolder}/`;

function getCountrySVGIconURL(currencyName) {
    return url + currencyName + '.svg';
}


function createTableFromData(data) {
    let exchangeRateTable = document.querySelector('#exchangeRateTable');
    let rates = data.rates;
    let storedRates = {};
    let i = 0;
    let row;
    for (let key in rates) {
        if (i % 5==0) {
            row = document.createElement('div');
            row.classList.add('row');
            exchangeRateTable.appendChild(row);
        } 
        let col = document.createElement('div');
        col.classList.add('col');
        let rateDecimal = rates[key];
        let twoDecimalPlaces = rateDecimal.toFixed(2);
        col.appendChild(currencyImg(key));
        let spanText = document.createElement('span');
        spanText.innerHTML = `${key} ${twoDecimalPlaces}`;
        storedRates[key] = parseFloat(twoDecimalPlaces);
        col.appendChild(spanText);
        row.appendChild(col);
        i = i + 1;
    }
    return storedRates;
}

function updateTableFromData (data, base) {
    let rates = data.rates;
    let exchangeRateTable = document.querySelector('#exchangeRateTable');
    const amountEle = document.getElementById("amount");
    
    for (let row in exchangeRateTable.children) {
        let colsArr = exchangeRateTable.children[row];
        //debugger
        for (let col in colsArr.children) {
            //debugger
            let index = parseInt(col);
            if (isNaN(index)) {break;}
            let column = colsArr.children[col];
            let arr = column.textContent.split(' '); 
            // ['CNY', 0.18]
            let currencyName = arr[0];
            let rate = rates[currencyName];
            let exchangeRate;
            if (rate) {
                exchangeRate = getExchangeRate(rate)
            } else {
                throw `No rate exist for name ${currencyName}`;
            }

            let updatedValue = exchangeRate(amountEle.value);
            let span = column.children[1];
            span.textContent = `${currencyName} ${updatedValue.toFixed(2)}`;
        }
    }
    return rates;
}

class ExchangeRate {

    // 
    constructor (baseCurrencyStr='CNY') {

        this.rates = {};

        console.log(`created ExchangeRate component`);
        // this.property - public
        // _property - private
        let _opened = false;
        this.url = EXCHANGE_RATE_URL + baseCurrencyStr;

        let updateAllCurrency = base => {

            let exchangeRateTable = document.querySelector('#exchangeRateTable');
            //debugger
            for (let row in exchangeRateTable.children) {
                let colsArr = exchangeRateTable.children[row];
                //debugger
                for (let col in colsArr.children) {
                    //debugger
                    let index = parseInt(col);
                    if (isNaN(index)) {break;}
                    let column = colsArr.children[col];
                    let arr = column.textContent.split(' '); 
                    // ['CNY', 0.18]
                    let currencyName = arr[0];
                    let rate = this.rates[currencyName];
                    let exchangeRate;
                    if (rate) {
                        exchangeRate = getExchangeRate(rate)
                    } else {
                        throw `No rate exist for name ${currencyName}`;
                    }

                    let updatedValue = exchangeRate(base);
                    let span = column.children[1];
                    span.textContent = `${currencyName} ${updatedValue.toFixed(2)}`;
                }
            }
        }

        let handlerForCurrencyAmtOnChange = () => {
            const amountEle = document.getElementById("amount");
            let total = new String();
            amountEle.addEventListener("keyup", e => {
                let enteredValue = amountEle.value;
                if (e.key == 'Backspace') {
                    total = enteredValue;
                } else if (e.keyCode == 37 || e.keyCode == 39) {}
                else if (Number.isInteger(parseInt(e.key))) {
                    total = enteredValue;
                } else {
                    e.preventDefault();
                    e.stopPropagation();
                }
                updateAllCurrency(total);
             }, false);
        }

        
        let handlerForDropDownSelection = () => {
           const listEle = document.getElementById("currencyList");
           const btnEle = document.getElementById("currencyBtn");
           listEle.addEventListener("click", e => {
                console.log('e', e);
                console.log(e.target.innerText);
                    btnEle.innerText = e.target.innerText;
                    // clear textfield.
                    // fetch new data with 'USD', 
                    //debugger
                    // 1) setBaseCurrency('UDS') 
                    this.setBaseCurrency(btnEle.innerText);
                    // 2) fetchData()
                    this.fetchData();
                    
            }, false);
        }

        let handlerForOutsideDialogClick = () => {
            document.addEventListener('click', function (e) {
                if (e.target.className === 'modal fade'){
                     let exchangeRateBtn = document.querySelector('#exchangeRateBtn');
                     gsap.to(exchangeRateBtn, {
                        duration: 1.0, 
                        rotation: 0
                    });
                    _opened = false;
                }
              }, false);
        }

        let createEventHandlerForExchangeRatesBtn = () => {
            let exchangeRateBtn = document.querySelector('#exchangeRateBtn');
            let closeRateBtn = document.querySelector('#closeExchangeRateModal');

            closeRateBtn.addEventListener('click', function() {
                gsap.to(exchangeRateBtn, {
                    duration: 1.0, 
                    rotation: 0
                });
                _opened = false;
            });

            exchangeRateBtn.addEventListener('click', function() {
                gsap.to(exchangeRateBtn, {
                    duration: 1.0, 
                    rotation: 90
                });
                _opened = true;
                
            });
        }

        this.init = () => {
            let currencyBtnEle = document.getElementById("currencyBtn");
            currencyBtnEle.innerText = 'CNY';
            createEventHandlerForExchangeRatesBtn();
            handlerForOutsideDialogClick();
            handlerForDropDownSelection();
            handlerForCurrencyAmtOnChange();
        }

        

    } // constructor

    // prototype functions

    

    //getExchangeRate = rate => value => value * rate;

    fetchData = () => {
        console.log(`fetch exchange data from ${this.url}`);

        let aPromise = fetch(this.url, {
            "method": "GET",
        });           
        
        aPromise.then(response => response.json())
        .then(data => {
            console.log('data received', data);
            
            const { USD, JPY, HKD, CNY } = data.rates;
            let USDtoRMB = getExchangeRate(USD);
            let result = USDtoRMB(80000);
            //debugger
            let exchangeRateTable = document.querySelector('#exchangeRateTable');
            if (exchangeRateTable.children.length > 0) {
                console.log('update the table');
                this.rates = updateTableFromData(data);
            } else {
                console.log('create the data');
                this.rates = createTableFromData(data);
            }
            
        });
    }

    setBaseCurrency = (currencyName = 'CNY') => {
        this.url = EXCHANGE_RATE_URL + currencyName;
        console.log(`url is now ${this.url}`);
    }

}


let r = new ExchangeRate('CNY');
r.init();
r.fetchData();
export default r;