import store from '../../redux/store';
import { newsAdded } from '../../redux/actions';

let BREAKING_NEWS_URL = 'http://newsapi.org/v2/top-headlines?';
let EVERYTHING_NEWS_URL = 'http://newsapi.org/v2/everything?';
let API_KEY = '4ab0f7f8033c472f83b7fda094dcfeef'; 
let REQUEST_PARAMETER_COUNTRY = 'cn';
var URL = `${BREAKING_NEWS_URL}country=${REQUEST_PARAMETER_COUNTRY}&apiKey=${API_KEY}`;
let _opened = false;


// private by closure from export default
let fetchData = done => {
    let aPromise = fetch(URL, {
        "method": "GET",
    });           
    aPromise.then(response => response.json())
    .then(data => {
        done(data);
    });
}


let createEventHandlerForNewsBtn = btnID => {

    let newsBtn = document.querySelector(btnID);
    let newsFeed = document.querySelector('#NewsFeed');
    let ulEle = document.querySelector('#NewsFeed .panel-body ul.list-group');

    newsBtn.addEventListener('click', () => {

        if (_opened) { // just close it
            gsap.to(ulEle, { // config obj
                duration: 1.0,
                opacity: 0.0,
                ease:'back', // bounce, back,
                onComplete: () => {
                    // remove previously loaded in news data
                    while (ulEle.firstChild) {
                        ulEle.removeChild(ulEle.lastChild);
                    }
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
        } else { // open it!
            gsap.to(newsBtn, {
                duration: 1.0, 
                rotation: 90
            });
            gsap.to([newsFeed], { // config obj
                duration: 1.0,
                y: -960.0,
                ease:'expo' // bounce, back
            });
            _opened = true;
            fetchData( data => {
                store.dispatch(
                    newsAdded(data)
                )
            });
        }
    });
}

let insertNewsIntoDOM = article => {
    let ulEle = document.querySelector('#NewsFeed .panel-body ul.list-group');
    let outerHrefEle = document.createElement('div');

    outerHrefEle.classList.add('list-group-item', 'list-group-item-action', 'flex-column', 'align-items-start');
    ulEle.appendChild(outerHrefEle);

    let divEle = document.createElement('div');
    divEle.classList.add('d-flex', 'w-100', 'justify-content-between');
    outerHrefEle.appendChild(divEle);

    let aEle = document.createElement('a');
    aEle.classList.add('mb-1');
    aEle.target = '_blank';
    aEle.href = article.url;
    aEle.innerHTML = article.title;
    divEle.appendChild(aEle);

    let smallEle = document.createElement('small');
    smallEle.innerHTML = article.publishedAt;
    divEle.appendChild(smallEle);

    let pEle = document.createElement('p');
    pEle.innerHTML = article.description;
    outerHrefEle.appendChild(pEle);

    let small2Ele = document.createElement('small');
    small2Ele.innerHTML = article.author ? article.author: 'no author provided';
    outerHrefEle.appendChild(small2Ele);

}
class News {
    constructor(keyword='Apple', apiKey) {   
        this.render = payload => {
            const { articles } = payload;
           
            // remove all indicators
            let ulEle = document.querySelector('#NewsFeed .panel-body ul.list-group');
            while (ulEle.firstChild) {
                ulEle.removeChild(ulEle.lastChild);
            }
            articles.map(article => {
                insertNewsIntoDOM(article);
            });

           gsap.to(ulEle, { // config obj
                duration: 1.0,
                opacity: 1.0,
                ease:'slow' // bounce, back
            });
        }
    }

    // Prototype function //
    init = () => {
        createEventHandlerForNewsBtn('#newsBtn');
    }
}


let niuz = new News();

export default niuz;