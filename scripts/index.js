let arrowDown = document.querySelector('.arrow-down');

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


window.onload = function () {
    let color = 'linear-gradient(to ' + 'bottom' + ', ' + randomColor()[0] + ', ' + randomColor()[1] + ')';
    let section1 = document.getElementById('section1');
    section1.style.background = color;
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
            }, 500);
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
        let rgb;
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
        let color;
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
        while (colorPicked === rgbCopiedColor) {
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

document.querySelector('.navbar').addEventListener('click', function (e) {
    myFullpage.moveTo(e.target.dataset.sectionId);
});

arrowDown.addEventListener('click', function () {
    myFullpage.moveSectionDown();
});

const random = (min, max) => min + Math.floor(Math.random() * (max - min + 1));
let crossBarGlitchTexts = document.querySelectorAll(".cross-bar-glitch");
crossBarGlitchTexts.forEach(text => {
    let content = text.textContent;
    text.textContent = "";
    // Glitch Text
    let slice = text.dataset.slice;
    let glitchText = document.createElement("div");
    glitchText.className = "glitch";
    glitchText.style.setProperty("--slice-count", slice);
    for (let i = 0; i <= Number(slice); i++) {
        let span = document.createElement("span");
        span.textContent = content;
        span.style.setProperty("--i", `${i + 1}`);
        if (i !== Number(slice)) {
            span.style.animationDelay = `${600 + random(100, 300)}ms`;
        }
        glitchText.append(span);
    }
    text.appendChild(glitchText);
});


const startAnimation = (entries, observer) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            setTimeout(function () {
                entry.target.style.visibility = "visible";
                entry.target.classList.add("fadeInUp");
            }, 200);
        }
    });
};
const observer = new IntersectionObserver(startAnimation);
const options = {root: null, rootMargin: '0px', threshold: 1};

const elements = document.querySelectorAll('.section-container');
elements.forEach(el => {
    observer.observe(el, options);
});
