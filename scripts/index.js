let arrowDown = document.querySelector('.arrow-down');
let navbar = document.querySelector('.navbar');
let section1 = document.getElementById('section1');
let aboutAge = document.querySelector('.about-age-content');
let navbarA = document.querySelectorAll('.navbar a');

let rgb;
let color;
let timer;

let birthdayDate = new Date('2003-12-06'); //years-months-days
let today = new Date();

const defaultAnimationDelay = 200; //in ms
let duration = 0;

let countOptions = {
    useEasing: true,
    separator: '',
};
let ageCount = new CountUp('MyAge', 0, getAge(), 0, 3, countOptions);


navbar.addEventListener('click', function (e) {
    myFullpage.moveTo(e.target.dataset.sectionId);
});

arrowDown.addEventListener('click', function () {
    myFullpage.moveSectionDown();
});

window.addEventListener('load', function () {
    //ADDING FP-NAV TO THE OBSERVER
    let fpNav = document.getElementById('fp-nav');
    fpNav.dataset.animationName = 'fadeInRight';
    fpNav.dataset.animationDelay = '2200';
    let fpNavObserver = new IntersectionObserver(startAnimation, {root: null, rootMargin: '0px', threshold: 0.5});
    fpNavObserver.observe(fpNav);
});

window.onload = function () {
    //RANDOM BACKGROUND COLOR FOR THE FIRST SECTION
    let firstGradient = randomColor()[0];
    let secondGradient = randomColor()[1];
    while (firstGradient === secondGradient) {
        secondGradient = randomColor()[1];
    }
    color = 'linear-gradient(to ' + 'bottom' + ', ' + firstGradient + ', ' + secondGradient + ')';
    section1.style.background = color;

    //ALIGNMENT OF NAME
    let nameContainer = document.querySelector('.name-container'); //MUST BE DECLARED HERE
    let name1 = document.querySelector('.name1'); //MUST BE DECLARED HERE
    let name2 = document.querySelector('.name2'); //MUST BE DECLARED HERE
    let name1width = name1.offsetWidth; //MUST BE DECLARED HERE
    name2.style.paddingLeft = name1width / 1.18 + 'px';
    nameContainer.style.lineHeight = name1.offsetHeight / 1.5 + 'px';

    //UNDERLINE FIRST NAVBAR ITEM
    let navbarFirstA = document.querySelector('.navbar a');
    let navClean = true;
    setTimeout(function () {
        navbarA.forEach(function (element) {
            if(element.classList.contains('navbar-after')) {
                navClean = false;
            }
        });
        if (navClean) {
            navbarFirstA.classList.add('navbar-after');
        }
    }, parseInt(navbarFirstA.dataset.animationDelay) + 500 || defaultAnimationDelay);
}


let myFullpage = new fullpage('#fullpage', {
    autoScrolling: true,
    keyboardScrolling: true,
    navigation: true,
    navigationPosition: 'right',
    navigationTooltips: ['Home', 'About', 'Skills', 'Projects', 'Contact'],
    navigationTooltipsFontFamily: 'Poppins',
    loopBottom: false,
    loopTop: false,
    dragAndMove: true,
    onLeave: function (origin, destination, direction) {
        if (destination.index === document.querySelectorAll('.section').length - 1) {
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

        //UNDERLINE NAVBAR
        let currentSectionId = destination.index + 1;
        navbarA.forEach(function (item) {
            if (item.dataset.sectionId === currentSectionId.toString()) {
                item.classList.add('navbar-after');
            } else if (item.classList.contains('navbar-after')) {
                item.classList.remove('navbar-after');
            }
        });
        let stars1 = document.querySelector('.stars1');
        let stars2 = document.querySelector('.stars2');
        let stars3 = document.querySelector('.stars3');


        duration = 0;
        if (timer) {
            clearInterval(timer);
        }
        timer = setInterval(function () {
            duration++;
            let yPos = destination.item.offsetTop * 0.8;
            yPos += duration * 0.5;
            stars1.style.transform = `translateY(-${yPos * 0.5}px)`;
            stars2.style.transform = `translateY(-${yPos * 0.3}px)`;
            stars3.style.transform = `translateY(-${yPos * 0.1}px)`;
        }, 1);
    },
    afterLoad: function (origin, destination, direction) {
        clearInterval(timer);
        timer = null;
    }
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

/**
 * If the current month is less than the month of the birthday, or if the current month is the same as the month of the
 * birthday but the current day is less than the day of the birthday, then subtract one from the age
 * @returns The age of the person.
 */
function getAge() {
    let age = today.getFullYear() - birthdayDate.getFullYear();
    let m = today.getMonth() - birthdayDate.getMonth();
    if (m < 0 || (m === 0 && today.getDate() < birthdayDate.getDate())) {
        age--;
    }
    return age.toString();
}

//OBSERVER
const startAnimation = (entries, observer) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) { //if the element is in the viewport
            if (entry.target.querySelector('#MyAge')) { //if entry target has a child with id 'MyAge'
                setTimeout(function () {
                    ageCount.start(); //start the count animation
                }, parseInt(entry.target.dataset.animationDelay) + 600 || defaultAnimationDelay);
            }
            let animationName = entry.target.dataset.animationName
            setTimeout(function () {
                entry.target.style.visibility = "visible";
                entry.target.classList.add(`${animationName}`);
            }, parseInt(entry.target.dataset.animationDelay) || defaultAnimationDelay); //if the animationDelay is not defined, it will be defaultAnimationDelay
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
