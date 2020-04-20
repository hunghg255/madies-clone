document.addEventListener('DOMContentLoaded', function() {
    const allElementAnimate = document.querySelectorAll('[data-animate]');
   
    let styleAnimate = '';
    allElementAnimate.forEach(e => {
        styleAnimate += `
            .${e.className.split(' ').join('.')} {animation-name: ${e.dataset.animateName};
                animation-duration: ${e.dataset.animateDuration};
                animation-delay: ${e.dataset.animateDelay};
                -webkit-animation-timing-function: ${e.dataset.animateTf};
                -moz-animation-timing-function: ${e.dataset.animateTf};
                -o-animation-timing-function: ${e.dataset.animateTf};
                animation-timing-function: ${e.dataset.animateTf};
                -webkit-animation-fill-mode: both;
                -moz-animation-fill-mode: both;
                -o-animation-fill-mode: both;
                animation-fill-mode: both;
            }
        `
    });

    const style = document.createElement('style');
    style.innerHTML = styleAnimate;
    document.head.appendChild(style);
}, false);