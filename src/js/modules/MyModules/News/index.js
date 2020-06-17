
// closure from export default

let BREAKING_NEWS_URL = 'http://newsapi.org/v2/top-headlines?';
let EVERYTHING_NEWS_URL = 'http://newsapi.org/v2/everything?';
let API_KEY = '4ab0f7f8033c472f83b7fda094dcfeef';

let REQUEST_PARAMETER_COUNTRY = 'cn';

var URL = `${BREAKING_NEWS_URL}country=${REQUEST_PARAMETER_COUNTRY}&apiKey=${API_KEY}`;

let _opened = false;

let createEventHandlerForNewsBtn = btnID => {

    let newsBtn = document.querySelector(btnID);
    let newsFeed = document.querySelector('#NewsFeed');
    let GS_EASE_TYPE = 'expo';

    newsBtn.addEventListener('click', function() {
        if (!_opened) {
            gsap.to(newsBtn, {
                duration: 1.0, 
                rotation: 90
            });
            gsap.to([newsFeed], { // config obj
                duration: 1.0,
                y: -960.0,
                ease:GS_EASE_TYPE // bounce, back
            });
            _opened = true;
        } else {
            gsap.to(newsBtn, {
                duration: 1.0, 
                rotation: 0
            });
            gsap.to([newsFeed], { // config obj
                duration: 1.0,
                y: 960.0,
                ease:'bounce' // bounce, back
            });
            _opened = false;
        }
    });
}


// private by closure from export default
let fetchData = () => {
    let aPromise = fetch(URL, {
        "method": "GET",
    });           
    aPromise.then(response => response.json())
    .then(data => {
        console.log('fetched data', data);
    });
}

class News {

    // initial function //
    constructor(keyword='Apple', apiKey) {   
        
        

    }



    // Prototype function //

    
    init = () => {
        fetchData();
        createEventHandlerForNewsBtn('#newsBtn');
    }
}


let niuz = new News();
niuz.init();

export default niuz;