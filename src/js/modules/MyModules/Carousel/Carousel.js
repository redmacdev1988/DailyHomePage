import CircularQueue from './CircularQueue.js';

let _circularQueue = new CircularQueue('slideshow');
const port = '8080';
const host = 'http://localhost';
const subFolder = 'img';
const url = `${host}:${port}/${subFolder}`;

_circularQueue.insertData( `${url}/tanglang1.jpg`, 'tanglan');
_circularQueue.insertData( `${url}/horses-jeju-island.jpg`, 'horses');
_circularQueue.insertData( `${url}/seoul-fried-chicken.jpg`, 'fried chicken');
_circularQueue.insertData( `${url}/antuoshan1.jpg`, 'antuoshan 1');
_circularQueue.insertData( `${url}/antuoshan2.jpg`, 'antuoshan 2');
_circularQueue.insertData( `${url}/beijing-grounds.jpg`, 'beijing-grounds');

console.log(`Created CircularQueue with Images √`);

let _screenWidth;
let _currentIndex = 0;

function _createSlideWithImage(imageURL, id, startingX) {
    let slide = document.createElement("div");
    slide.id = id;
    slide.style.backgroundImage = `url('${imageURL}')`;
    slide.style.left = startingX + 'px';
    slide.className = 'slide';
    return slide;
}

function _createSlideContent(slideText) {
    let slideContent = document.createElement("div");
    slideContent.className = 'slide-content';
    let spanText = document.createElement('span');
    spanText.innerHTML = slideText || '';
    slideContent.appendChild(spanText);
    return slideContent;
}

function _insertSlideIntoSlider(queue, sliderID, startingX, slideText) {
    let image = queue.getCur();
    let newSlide = _createSlideWithImage(image.data, sliderID, startingX);
    let slideContent = _createSlideContent(slideText);
    newSlide.appendChild(slideContent);
    let main = document.querySelector(this.mainID);
    main.appendChild(newSlide);
    return main;
}

function _addRightArrowEventHandler() {

    let arrowRight = document.querySelector('#arrow-right');

    if (arrowRight) {
        let animating = false;
        arrowRight.addEventListener('click', evt => {
            var slides = document.getElementsByClassName('slide');  
            _currentIndex++;

            if (!animating) {
                gsap.to(slides, { // config obj
                    duration: 1.0,
                    x: -1 * _screenWidth,
                    y: 0,
                    ease:'power4', // bounce, back,
                    clearProps:"transform", // clears out translate 3d,
                    onStart: function() {
                        if (!animating) { 
                            animating = true; 
                            arrowRight.style['pointer-events'] = 'none';
                        } 
                    },
                    onComplete: function() {
                        if (animating) {
                            for (let i = 0; i < slides.length; i++) {
                                let slide = slides[i].style.left;
                                let indexOfPx = slide.indexOf('px');
                                let numeric = slide.substring(0, indexOfPx);
                                let nowX = numeric - _screenWidth;
                                slides[i].style.left = nowX + 'px';
                                if (nowX < 0) {
                                    slides[i].style.left = _screenWidth * (slides.length-1) + 'px';
                                }
                            }
                            animating = false;
                            arrowRight.style['pointer-events'] = '';

                        } 
                    },

                });
            }
        });
    } else { console.log('arrowRight not found'); }
}




class Carousel {
    constructor(mainID) {
        _screenWidth = window.innerWidth;
        this.mainID = mainID;
        _circularQueue.setCur('chang-an'); // initial image

        for (let i = 0; i < _circularQueue.numOfItems; i++ ) {
            let startingX = _screenWidth * i;
            let current =  _circularQueue.getCur();
            _insertSlideIntoSlider.call(
                this, 
                _circularQueue, 
                current.name, 
                startingX,
                ''
            );
            _circularQueue.moveNext(function(from, to){});
        }

        window.onresize = () => { 
            _screenWidth = window.innerWidth;
            var slides = document.getElementsByClassName('slide');  
            let _posInSlide = 0;
            let stepsLeft = slides.length;
            let currentIndex = _currentIndex % slides.length;
            while(stepsLeft > 0) {
                slides[currentIndex].style.left = _posInSlide * _screenWidth + 'px';
                currentIndex = ++currentIndex % slides.length;
                _posInSlide++;
                stepsLeft--;
            }
        }
        _addRightArrowEventHandler.call(this);
    } // construction
}

let ricky = (function() {

    // another closure!
})();

let carouselInstance = new Carousel("#slider");

console.log(`Created Carousel instance √`);
export default carouselInstance;



