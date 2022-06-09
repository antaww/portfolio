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
    autoScrolling: true, keyboardScrolling: true,
    onLeave: function (origin, destination, direction) {
        let sectionIndex = origin.index;
        let section = document.querySelector(`.section:nth-child(${sectionIndex + 1})`);
        let sectionBackground = section.style.background;
        console.log(sectionIndex + 1, sectionBackground);
        let rgb;
        if (direction === 'up') {
            rgb = sectionBackground.split('rgb(')[1].split(')')[0].split(',');
        } else if (direction === 'down') {
            rgb = sectionBackground.split(' rgb(')[1].split(')')[0].split(',');
        }
        rgb = rgb.map(function (item) {
            return item.trim();
        });
        let rgbCopiedColor = 'rgb(' + rgb[0] + ', ' + rgb[1] + ', ' + rgb[2] + ')';
        let nextSection = destination.item;
        let color;
        if (direction === 'down') {
            color = 'linear-gradient(to ' + 'bottom' + ', ' + rgbCopiedColor + ', ' + randomColor()[0] + ')';
        } else if (direction === 'up') {
            color = 'linear-gradient(to ' + 'bottom' + ', ' + randomColor()[0] + ', ' + rgbCopiedColor + ')';
        }
        nextSection.style.background = color;
    },
})

document.querySelector('.navbar').addEventListener('click', function (e) {
    myFullpage.moveTo(e.target.dataset.sectionId);
});

