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
    console.log(hexToRgb(color1), hexToRgb(color2));
    return [color1, color2];
}

function hexToRgb(hex) {
    let result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
    return result ? {
        r: parseInt(result[1], 16),
        g: parseInt(result[2], 16),
        b: parseInt(result[3], 16)
    } : null;
}

window.onload = function () {
    let color = 'linear-gradient(to ' + 'bottom' + ', ' + randomColor()[0] + ', ' + randomColor()[1] + ')';
    let section1 = document.getElementById('section1');
    section1.style.background = color;
}

let myFullpage = new fullpage('#fullpage', {
    autoScrolling: true, keyboardScrolling: true,
    onLeave: function(origin, destination, direction) {
        //todo: adapter la couleur en fonction de la direct scroll
        let sectionIndex = origin.index;
        console.log(sectionIndex);
        let section = document.querySelector(`.section:nth-child(${sectionIndex + 1})`);
        let sectionBackground = section.style.background;
        console.log(sectionBackground);
        let rgb = sectionBackground.split(' rgb(')[1].split(')')[0].split(',');
        rgb = rgb.map(function (item) {
            return item.trim();
        });
        console.log(rgb);
        let color1 = 'rgb(' + rgb[0] + ', ' + rgb[1] + ', ' + rgb[2] + ')';
        console.log(color1);

        let color = 'linear-gradient(to ' + 'bottom' + ', ' + color1 + ', ' + randomColor()[0] + ')';
        let nextSection = destination.item;
        nextSection.style.background = color;
    },

})

document.querySelector('.navbar').addEventListener('click', function (e) {
    myFullpage.moveTo(e.target.dataset.sectionId);
});

