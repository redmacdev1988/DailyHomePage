
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

class ExchangeRate {

    constructor(baseCurrencyStr='CNY') {

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
                    let currencyName = arr[0];
                    let rate = this.rates[currencyName];
                    let updatedValue = rate * base;
                    let span = column.children[1];
                    span.textContent = `${currencyName} ${updatedValue.toFixed(2)}`;
                }
            }
        }


        // fix - todo - get text from amount instead of relying on adding characters

        let handlerForCurrencyAmtOnChange = () => {
            const amountEle = document.getElementById("amount");
            let total = new String();

            //const amt = document.getElementById('currencyAmt');

            amountEle.addEventListener("keyup", e => {

                //debugger
                console.log('amount', amountEle.value);
                let enteredValue = amountEle.value;
                console.log('enteredValue',enteredValue);

                if (e.key == 'Backspace') {
                    //total = total.slice(0, -1);
                    //if (total == "") { total = "0"; }
                    total = enteredValue;
                } else if (e.keyCode == 37 || e.keyCode == 39) {
                    console.log('key arrows');
                }
                else if (Number.isInteger(parseInt(e.key))) {
                    //total +=  e.key;
                    total = enteredValue;
                } else {
                    console.log('invalid character');
                    e.preventDefault();
                    e.stopPropagation();
                }
                updateAllCurrency(total);
             }, false);
        }

        
        let handlerForDropDownSelection = () => {
           const listEle = document.getElementById("currencyList");
           const btnEle = document.getElementById("currencyBtn");
           listEle.addEventListener("click", function(e) {
                console.log('e', e);
                console.log(e.target.innerText);
                    btnEle.innerText = e.target.innerText;
                    // clear textfield.
                    // fetch new data with 'USD', 
                    
                    // 1) setBaseCurrency('UDS') 
                    // 2) fetchData()
            }, false);
        }

        let handlerForOutsideDialogClick = () => {
            document.addEventListener('click', function (e) {
                if (e.target.className === 'modal fade'){
                     console.log('clicked outside');
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
                console.log('testing 1 2 ');
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
            let exchangeRateTable = document.querySelector('#exchangeRateTable');
            let rates = data.rates;

            //let row;
            let numOfRates = rates.length;

            // don't change original

            let i = 0;
            let row;
            
            for (let key in rates) {
                if (i%5==0) {
                    row = document.createElement('div');
                    row.classList.add('row');
                    exchangeRateTable.appendChild(row);
                } 
                
                // insert data
                let col = document.createElement('div');
                col.classList.add('col');
                let rateDecimal = rates[key];
                let twoDecimalPlaces = rateDecimal.toFixed(2);
                col.appendChild(currencyImg(key));

                let spanText = document.createElement('span');
                spanText.innerHTML = `${key} ${twoDecimalPlaces}`;
                
                this.rates[key] = parseFloat(twoDecimalPlaces);

                col.appendChild(spanText);
                row.appendChild(col);
                i = i + 1;
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