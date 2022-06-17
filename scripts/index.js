let arrowDown = document.querySelector('.arrow-down');
let navbar = document.querySelector('.navbar');
let section1 = document.getElementById('section1');

let rgb;
let color;


navbar.addEventListener('click', function (e) {
    myFullpage.moveTo(e.target.dataset.sectionId);
});

arrowDown.addEventListener('click', function () {
    myFullpage.moveSectionDown();
});


window.onload = function () {
    let firstGradient = randomColor()[0];
    let secondGradient = randomColor()[1];
    while (firstGradient === secondGradient) {
        secondGradient = randomColor()[1];
    }
    color = 'linear-gradient(to ' + 'bottom' + ', ' + firstGradient + ', ' + secondGradient + ')';
    section1.style.background = color;
    let nameContainer = document.querySelector('.name-container'); //MUST BE DECLARED HERE
    let name1 = document.querySelector('.name1'); //MUST BE DECLARED HERE
    let name2 = document.querySelector('.name2'); //MUST BE DECLARED HERE
    let name1width = name1.offsetWidth; //MUST BE DECLARED HERE
    name2.style.paddingLeft = name1width / 1.18 + 'px';
    nameContainer.style.lineHeight = name1.offsetHeight / 1.5 + 'px';
}


let myFullpage = new fullpage('#fullpage', {
    autoScrolling: true,
    keyboardScrolling: true,
    navigation: true,
    navigationPosition: 'right',
    navigationTooltips: ['Home', 'About', 'Projects', 'Contact'],
    navigationTooltipsFontFamily: 'Poppins',
    loopBottom: false,
    loopTop: false,
    dragAndMove: true,
    onLeave: function (origin, destination, direction) {
        if (destination.index === 3) {
            arrowDown.classList.add('fadeOutUp');
            setTimeout(function () {
                arrowDown.classList.add('hide');
                arrowDown.classList.remove('fadeOutUp');
            }, 450);
        } else if (arrowDown.classList.contains('hide')) {
            arrowDown.classList.remove('hide');
            arrowDown.classList.add('fadeInDown');
            setTimeout(function () {
                arrowDown.classList.remove('fadeInDown');
            }, 500);
        }
        let currentSectionIndex = origin.index;
        let currentSection = document.querySelector(`.section:nth-child(${currentSectionIndex + 1})`);
        let currentSectionBackground = currentSection.style.background;
        if (direction === 'up') { //copy the top color of current currentSection
            rgb = currentSectionBackground.split('rgb(')[1].split(')')[0].split(',');
        } else if (direction === 'down') { //copy the bottom color of current currentSection
            rgb = currentSectionBackground.split(' rgb(')[1].split(')')[0].split(',');
        }
        rgb = rgb.map(function (item) { //remove spaces
            return item.trim();
        });
        let rgbCopiedColor = 'rgb(' + rgb[0] + ', ' + rgb[1] + ', ' + rgb[2] + ')'; //cast rgb array to string in right format
        let nextSection = destination.item;
        if (destination.index > origin.index + 1) { //if scroll down more than one currentSection
            for (let i = origin.index + 1; i < destination.index; i++) {
                let section = document.querySelector(`.section:nth-child(${i + 1})`);
                section.style.background = rgbCopiedColor;
            }
        } else if (destination.index < origin.index - 1) { //if scroll up more than one currentSection
            for (let i = origin.index - 1; i > destination.index; i--) {
                let section = document.querySelector(`.section:nth-child(${i + 1})`);
                section.style.background = rgbCopiedColor;
            }
        }
        let colorPicked = randomColor()[0];
        while (hexaToRgb(colorPicked) === rgbCopiedColor) {
            colorPicked = randomColor()[0];
        }
        if (direction === 'down') { //apply copied color to the top of the next currentSection
            color = 'linear-gradient(to ' + 'bottom' + ', ' + rgbCopiedColor + ', ' + colorPicked + ')';
        } else if (direction === 'up') { //apply copied color to the bottom of the next currentSection
            color = 'linear-gradient(to ' + 'bottom' + ', ' + colorPicked + ', ' + rgbCopiedColor + ')';
        }
        nextSection.style.background = color;
    },
})

//
// UTILS
//

//FUNCTIONS
/**
 * It returns an array of two random colors from a predefined array of colors
 * @returns An array of two random colors.
 */
function randomColor() {
    let colorsPalette = ['#F7F6CF', '#F4CFDF',
        '#9AC8EB', '#E7CBA9',
        '#EEBAB2', '#E5DB9C', '#b29bc2',
        '#39b2a7', '#98D4BB', '#D5E4C3'];
    let color1 = '';
    let color2 = '';
    while (color1 === color2) {
        color1 = colorsPalette[Math.floor(Math.random() * colorsPalette.length)];
        color2 = colorsPalette[Math.floor(Math.random() * colorsPalette.length)];
    }
    return [color1, color2];
}

/**
 * It takes a hexadecimal color code and returns the corresponding RGB color code
 * @param hex - The hexadecimal color code to convert.
 * @returns the rgb value of the hexadecimal value passed in.
 */
function hexaToRgb(hex) {
    let result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
    result = "rgb(" + parseInt(result[1], 16) + ", " + parseInt(result[2], 16) + ", " + parseInt(result[3], 16) + ")";
    return result
}

//OBSERVER
const startAnimation = (entries, observer) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            let animationName = entry.target.dataset.animationName
            if (!entry.target.classList.contains(`${animationName}`)) {
                let timeoutValue = 200;
                if (entry.target.dataset.animationDelay) {
                    timeoutValue = parseInt(entry.target.dataset.animationDelay);
                }
                setTimeout(function () {
                    entry.target.style.visibility = "visible";
                    entry.target.classList.add(`${animationName}`);
                    console.log(animationName, timeoutValue);
                }, timeoutValue);
            }
        }
    });
};
const observer = new IntersectionObserver(startAnimation);
const options = {root: null, rootMargin: '0px', threshold: 1};

const elements = document.querySelectorAll('.needAnimation');
elements.forEach(el => {
    observer.observe(el, options);
});

//todo: régler le bug de couleur après l'animation
//todo: régler l'animation de l'arrowDown