import store from '../../redux/store';
import { coronaAdded } from '../../redux/actions';

const CASES_BY_COUNTRY_URL = 'https://coronavirus-monitor.p.rapidapi.com/coronavirus/cases_by_country.php';
const X_RAPIDAPI_HOST = "coronavirus-monitor.p.rapidapi.com";
const X_RAPIDAPI_KEY = "bceb3c6713msh7b978618cfc7a1fp146facjsn41317387a72a";
const FLAGTABLE_CSS_ID = 'flagTable';
const NUM_OF_COUNTRIES_TO_DISPLAY = 30;

// private variables by export scope

let privateProps = new WeakMap(); 
let createCoronaUIFunc = Symbol('createCoronaUI func');
let animateCoronaUIFunc = Symbol('animateCoronaUI func');

const port = '8080';
const host = 'http://localhost';
const subFolder = 'img/countryflags';
const url = `${host}:${port}/${subFolder}/`;

function getCountrySVGIconURL(countryName) {
    return url + countryName + '.svg';
}

class CoronaCases {       
    constructor(casesURL, rapidApiHost, rapidApiKey) {  
        let _prevData;
        let _opened = false;
        let _coronaVirusBckgndWidth = 0;

        this.url = casesURL;
        this._data;
        this.table = document.getElementById(FLAGTABLE_CSS_ID);

        let decreasingFunc = (currentItem, nextItem, property) => {
            let next = nextItem[property].replace(/,/g, '');
            let cur = currentItem[property].replace(/,/g, '')
            let nextInt = parseInt(next);
            let curInt = parseInt(cur);
            return nextInt - curInt;
        }

        privateProps.set(this, {
            host: rapidApiHost,
            key: rapidApiKey,
            flagSize: '20',
            numOfCountriesToDisplay: NUM_OF_COUNTRIES_TO_DISPLAY,
            decreasing: decreasingFunc,
        }); // this is private
        
        let imgFlag = (flagName='China') => {
            let flagSize = privateProps.get(this).flagSize
            let imgEle = document.createElement('img');
            imgEle.setAttribute('height',flagSize);
            imgEle.setAttribute('width', flagSize);
            imgEle.setAttribute('src', getCountrySVGIconURL(flagName));
            return imgEle;
        }

        this[animateCoronaUIFunc] = prevData => {
            let rows = document.querySelectorAll('#flagTable tr');
            for (let i = 0; i < NUM_OF_COUNTRIES_TO_DISPLAY; i++) {
                let prevCountryName = prevData[i].country_name;
                let indexOfCur = -1;
                this._data.map( function(currentCountry, index) {
                    if (currentCountry.country_name == prevCountryName) { indexOfCur = index; }
                });

                prevCountryName = prevCountryName.replace(/\s+/g, '-');
                let hypened = prevCountryName.replace(/\./g,'');
                let countryToMove = document.querySelector('#' + hypened);
                if (!countryToMove) { console.log('Uh oh problem with ' + hypened); }
                let boundRect = countryToMove.getBoundingClientRect();
                let heightOfRow = boundRect.height;
                let indexesToMove = -1*(i - indexOfCur);

                gsap.to(countryToMove, { // config obj
                    duration: 1.0,
                    x: 0,
                    y: heightOfRow * indexesToMove,
                    ease:'power4', // bounce, back
                    onComplete: () => {

                        // make sure data on html is updated
                        let newData = this._data[i];
                        let newCountryName = newData.country_name.replace(/\s+/g, '-');
                        let hypened = newCountryName.replace(/\./g,'');
                        rows[i+1].id = hypened;
    
                        let cells = rows[i+1].getElementsByTagName('td');
                        let deaths = newData.deaths;
                        let cases = newData.cases;
                        let intDeaths = parseFloat(deaths.replace(/,/g, ''));
                        let intCases = parseFloat(cases.replace(/,/g, ''));
                        let deathPercentage = (intDeaths / intCases) * 100;
                        var imgData = document.createElement('td');
                        var aFlag = imgFlag(hypened);
                        imgData.appendChild(aFlag);
                        cells[0].innerHTML = imgData.innerHTML;
                        cells[1].textContent = newData.country_name;
                        cells[2].textContent = newData.cases;
                        cells[3].textContent = newData.deaths;
                        cells[4].textContent = deathPercentage.toFixed(2) + ' %';

                        countryToMove.style.transform = ''; // get rid of the animation style
                        // so that the data can reflect
                    }
                });
            } // loop
        }

        this[createCoronaUIFunc] = () => {
            if (!!this.table) {  // previous table exists, let's clear out its data
                this.table.innerHTML = '';       
            } else { // previous table does not exist, let's create one
                this.table = document.createElement('table');
                this.table.setAttribute('id', FLAGTABLE_CSS_ID);
            }

            this.table.style.opacity = 1.0;

            var header = this.table.createTHead();
            var row = header.insertRow(0);
            var flagHeader = row.insertCell(0);
            flagHeader.innerHTML = '';

            var countryHeader = row.insertCell(1);
            countryHeader.innerHTML = 'Country';

            var casesHeader = row.insertCell(2);
            casesHeader.innerHTML = 'Cases';

            var deathsHeader = row.insertCell(3);
            deathsHeader.innerHTML = 'Deaths';

            var fatalityRateHeader = row.insertCell(4);
            fatalityRateHeader.innerHTML = 'Rate';

            let numOfCountriesToDisplay = privateProps.get(this).numOfCountriesToDisplay;
            for (var i = 0; i < numOfCountriesToDisplay; i++) {
                let countryName = this._data[i].country_name;
                countryName = countryName.replace(/\s+/g, '-');
                let hypened = countryName.replace(/\./g,'');
                
                let deaths = this._data[i].deaths;
                let cases = this._data[i].cases;

                let intDeaths = parseFloat(deaths.replace(/,/g, ''));
                let intCases = parseFloat(cases.replace(/,/g, ''));
                let deathPercentage = (intDeaths / intCases) * 100;

                var tableRow = document.createElement('tr');
                tableRow.setAttribute('id', hypened);

                var imgData = document.createElement('td');
                var aFlag = imgFlag(hypened);
                imgData.appendChild(aFlag);
                tableRow.appendChild(imgData); // row add data

                var countryData = document.createElement("td"); 
                countryData.setAttribute('class', 'country-name' );
                var countrySpanContents = document.createTextNode(hypened);
                countryData.appendChild(countrySpanContents);  // row add data
                tableRow.appendChild(countryData);

                var casesData = document.createElement("td"); 
                casesData.setAttribute('class', 'cases');
                var casesSpanContents = document.createTextNode(cases);
                casesData.appendChild(casesSpanContents); 
                tableRow.appendChild(casesData);

                var deathData = document.createElement("td"); 
                deathData.setAttribute('class', 'death');
                var deathSpanContents = document.createTextNode(deaths);
                deathData.appendChild(deathSpanContents); 
                tableRow.appendChild(deathData);

                var percentageData = document.createElement("td"); 
                percentageData.setAttribute('class', 'percentage');
                var percentageSpanContents = document.createTextNode(deathPercentage.toFixed(2) + ' %');
                percentageData.appendChild(percentageSpanContents); 
                tableRow.appendChild(percentageData);
                this.table.appendChild(tableRow); // finally we add the row full of data
            }
            document.getElementById('CoronaVirusStats').appendChild(this.table);       
            //callback();
        }

        function createEventHandlerForTriggerBtn() {
            let coronaBtn = document.querySelector('#coronaBtn');
            let coronaVirusStatBckgnd = document.querySelector('#CoronaVirusStats');
            let GS_EASE_TYPE = 'power4';
            coronaBtn.addEventListener('click', function() {
                if (!_opened) { // open it 

                    gsap.to([coronaVirusStatBckgnd], { // config obj
                        duration: 1.0,
                        x: _coronaVirusBckgndWidth,
                        ease:GS_EASE_TYPE // bounce, back
                    });
                    gsap.to(coronaBtn, {
                        duration: 1.0, 
                        rotation: 90
                    });
                    _opened = true;
                } else { // close it
                    gsap.to([coronaVirusStatBckgnd], { // config obj
                        duration: 1.0,
                        x: 0,
                        ease: GS_EASE_TYPE // bounce, back
                    });
                    gsap.to(coronaBtn, {
                        duration: 1.0, 
                        rotation: 0
                    });
                    _opened = false;
                }
            });
        }

        function styleTriggerBtn() {
            let coronaBtn = document.querySelector('#coronaBtn');
            coronaBtn.style.display = 'initial';
            coronaBtn.style.right = '0px';
            gsap.to(coronaBtn, {
                duration: 0.5, 
                opacity: 1,
            });
        }

        // todo put in previous data here so that way in render, you can animate between previous and current
        let createEventHandlerForCases = () => {
            document.querySelector('#cases').addEventListener("click", this.updateData.bind(this, false, () => {
                store.dispatch(
                    coronaAdded({ cases: this._data })
                );
            }));
        }

        let createEventHandlerForDeaths = () => {
            document.querySelector('#deaths').addEventListener("click", this.updateData.bind(this, true, () => {
                store.dispatch(
                    coronaAdded({ cases: this._data })
                );
            }));
        }

        let showTotal = () => {
            let deathsEle = document.querySelector('#totalDeaths');
            let casesEle = document.querySelector('#totalCases');

            let a = store.getState();
            let dataArr = a.coronaReducer.state.cases;
            let totalCases = 0;
            let totalDeaths = 0;
            
            dataArr.forEach(element => {
                //debugger;
                var noCommaCases = element.cases.replace(",", ""); 
                let casesInt = parseInt(noCommaCases);
                totalCases += casesInt;

                var noCommaDeaths = element.deaths.replace(",", ""); 
                let deathsInt = parseInt(noCommaDeaths);
                totalDeaths += deathsInt;
            });

            //debugger
            console.log(`${totalCases} ${totalDeaths}`);

            deathsEle.innerHTML = `total deaths: ${totalDeaths}`;
            casesEle.innerHTML = `total cases: ${totalCases}`;

        }

        this.initEvents = () => {
            let table = document.querySelector('#flagTable');
            _coronaVirusBckgndWidth = table.offsetWidth;
            document.querySelector('#CoronaVirusStats').style.left = -1*_coronaVirusBckgndWidth + 'px';
            styleTriggerBtn();
            createEventHandlerForTriggerBtn();
            createEventHandlerForCases();
            createEventHandlerForDeaths();
            showTotal();
        }

        this.init = callback => {
            this.updateData(false, () => {
                callback(this._data);
            }); 
        }

    } // end of constructor

    ///////////// PROTOTYPE functions //////

    fetchData = () => {
        return fetch(this.url, {
            "method": "GET",
            "headers": {
            "x-rapidapi-host": privateProps.get(this).host,
            "x-rapidapi-key": privateProps.get(this).key
            }
        });               
    }

    render = payload => {
        this._data = payload;
        if (this._prevData) {
            this[animateCoronaUIFunc](this._prevData);
        } else {
            this[createCoronaUIFunc](); // don't need anything because we're using this._data for initial Creation of Corona UI table
        }
    }

    updateData = (byDeaths=false, cbFinish) => {     
        this.fetchData()
        .then(response => response.json())
        .then(data => {
            this._prevData = this._data;
            this._data = data.countries_stat;
            if (byDeaths) {
                this._data.sort((a,b) => privateProps.get(this).decreasing(a, b, 'deaths'));
            } else {
                this._data.sort((a,b) => privateProps.get(this).decreasing(a, b, 'cases'));
            }
            cbFinish();
        }).catch(err => { console.log(err);});
    } // updateData          
} // end of class
    
var coronaInstance = new CoronaCases(CASES_BY_COUNTRY_URL, X_RAPIDAPI_HOST, X_RAPIDAPI_KEY);
export default coronaInstance;


