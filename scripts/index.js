function randomColor() {
    let letters = '0123456789ABCDEF';
    let color1 = '#';
    let color2 = '#';
    for (let i = 0; i < 6; i++) {
        color1 += letters[Math.floor(Math.random() * 16)];
        color2 += letters[Math.floor(Math.random() * 16)];
    }
    if (color1 === color2) {
        return randomColor();
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
    onLeave: function (origin, destination, direction) {
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
        if (direction === 'down') { //apply copied color to the top of the next currentSection
            color = 'linear-gradient(to ' + 'bottom' + ', ' + rgbCopiedColor + ', ' + randomColor()[0] + ')';
        } else if (direction === 'up') { //apply copied color to the bottom of the next currentSection
            color = 'linear-gradient(to ' + 'bottom' + ', ' + randomColor()[0] + ', ' + rgbCopiedColor + ')';
        }
        nextSection.style.background = color;
    },
})

document.querySelector('.navbar').addEventListener('click', function (e) {
    myFullpage.moveTo(e.target.dataset.sectionId);
});

document.querySelector('.arrow-down').addEventListener('click', function () {
    myFullpage.moveSectionDown();
});

document.querySelector('.navbar').addEventListener('mouseover', function (e) {
    //get random number, 1 or 2
    let random = Math.floor(Math.random() * 2) + 1;
    console.log(random);
    if (e.target.tagName === 'A') {
        if (random === 1) {
            e.target.style.transform = 'skewY(3deg)';
        } else if (random === 2) {
            e.target.style.transform = 'skewY(-3deg)';
        }
    }
});

document.querySelector('.navbar').addEventListener('mouseout', function (e) {
    if (e.target.tagName === 'A') {
        e.target.style.transform = 'skewY(0deg)';
    }
});
