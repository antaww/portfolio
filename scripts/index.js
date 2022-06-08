let myFullpage = new fullpage('#fullpage', {
    autoScrolling: true, keyboardScrolling: true,

})

document.querySelector('.navbar').addEventListener('click', function (e) {
    myFullpage.moveTo(e.target.dataset.sectionId);
});