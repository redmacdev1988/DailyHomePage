
let BREAKING_NEWS_URL = 'http://newsapi.org/v2/top-headlines?';
let EVERYTHING_NEWS_URL = 'http://newsapi.org/v2/everything?';

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
                ease:GS_EASE_TYPE // bounce, back
            });
            _opened = false;
        }
    });
}



class News {
    constructor(keyword='Apple', apiKey) {   


    }

    // Prototype function //
    init = () => {
        createEventHandlerForNewsBtn('#newsBtn');
    }
}


let niuz = new News();
niuz.init();

export default niuz;