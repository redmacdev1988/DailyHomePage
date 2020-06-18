import store from '../../redux/store';
import { newsAdded } from '../../redux/actions';

const BREAKING_NEWS_URL = 'http://newsapi.org/v2/top-headlines?';
const EVERYTHING_NEWS_URL = 'http://newsapi.org/v2/everything?';
const API_KEY = '4ab0f7f8033c472f83b7fda094dcfeef'; 
let _reqCountryParameter = 'us';
let _opened = false;

// private by closure from export default //

let fetchData = done => {
    var URL = `${BREAKING_NEWS_URL}country=${_reqCountryParameter}&apiKey=${API_KEY}`;
    console.log('---> url is now: ', URL);
    let aPromise = fetch(URL, {
        "method": "GET",
    });           
    aPromise.then(response => response.json())
    .then(data => {
        done(data);
    });
}

let removeChildrenOfElement = ele => {
    while (ele.firstChild) {
        ele.removeChild(ele.lastChild);
    }
}

let GS_animateVerticalTo = (ele, y, duration, ease) => {
    gsap.to(ele, { 
        duration: duration,
        y,
        ease
    });
}

let GS_animateRotateTo = (ele, rotation, duration) => {
    gsap.to(ele, {
        duration,
        rotation
    });
}

let GS_animateOpacityTo = (ele, opacity, duration, ease, onComplete) => {
    gsap.to(ele, { 
        duration,
        opacity,
        ease, 
        onComplete
    });
}

let createEventHandlerForNewsBtn = btnID => {

    let newsBtn = document.querySelector(btnID);
    let newsFeed = document.querySelector('#NewsFeed');
    let ulEle = document.querySelector('#NewsFeed .panel-body ul.list-group');

    newsBtn.addEventListener('click', () => {
        if (_opened) { //  close it
            GS_animateOpacityTo(ulEle, 0.0, 1.0, 'back', () => {
                //removeChildrenOfElement(ulEle);
                GS_animateRotateTo(newsBtn, 0, 1.0);
                GS_animateVerticalTo(newsFeed, 960.0, 0.5, 'bound');
                _opened = false;
            });
        } else { // open it!
            GS_animateRotateTo(newsBtn, 90, 1.0);
            GS_animateVerticalTo(newsFeed, -960.0, 0.5, 'expo');
            _opened = true;
            fetchData(data => {
                store.dispatch(
                    newsAdded(data)
                )
            });
        }
    });
}
//urlToImage
let insertNewsIntoDOM = article => {
    let ulEle = document.querySelector('#NewsFeed .panel-body ul.list-group');
    let outerEle = document.createElement('div');

    outerEle.classList.add('list-group-item', 'list-group-item-action', 'flex-column', 'align-items-start');
    ulEle.appendChild(outerEle);


    let articleContentDiv = document.createElement('div');
    articleContentDiv.classList.add("articleContent");
    outerEle.appendChild(articleContentDiv);

    if (article.urlToImage) {
        //debugger
        let imgEle = document.createElement('img');
        imgEle.setAttribute('src', article.urlToImage);
        imgEle.classList.add('articleImg');
        imgEle.style.width = '28%';
        outerEle.appendChild(imgEle);
        articleContentDiv.style.width = '70%';
    } else {
        //no image
        articleContentDiv.style.width = '100%';
    }
    
    let divEle = document.createElement('div');
    articleContentDiv.appendChild(divEle);
    divEle.classList.add('d-flex', 'w-100', 'justify-content-between');
    
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
    articleContentDiv.appendChild(pEle);
    pEle.innerHTML = article.description;

    let small2Ele = document.createElement('small');
    articleContentDiv.appendChild(small2Ele);
    small2Ele.innerHTML = article.author ? article.author: 'no author provided';
}
class News {

    constructor(keyword='Apple', apiKey) {   

        let dropDownItems = document.querySelectorAll('#newsCountrySelection .dropdown-item');
        for (let i = 0; i < dropDownItems.length; i++) {
            let ulEle = document.querySelector('#NewsFeed .panel-body ul.list-group');
            dropDownItems[i].addEventListener("click", evt => {
                dropDownItems.forEach(item => {item.classList.remove('active');});
                evt.target.classList.add('active');
                _reqCountryParameter = (evt.target.innerText.trim() == 'China') ? 'cn' : 'us';
                GS_animateOpacityTo(ulEle, 0.0, 0.5, 'slow', () => {
                    // refresh data
                    fetchData(data => {
                        store.dispatch(
                            newsAdded(data)
                        )
                    });
                });
            });
        }
        
        this.render = payload => {
            const { articles } = payload;
            let ulEle = document.querySelector('#NewsFeed .panel-body ul.list-group');
            removeChildrenOfElement(ulEle);
            articles.map(article => {insertNewsIntoDOM(article);});
            GS_animateOpacityTo(ulEle, 1.0, 0.5, 'slow');
        }
    }

    // Prototype function //
    init = () => {
        createEventHandlerForNewsBtn('#newsBtn');
    }
}


let niuz = new News();
export default niuz;