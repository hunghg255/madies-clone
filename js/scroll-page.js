const triggerResize = () => {
    if (document.createEvent){
        let resizeEvent = window.document.createEvent('UIEvents');
        resizeEvent.initUIEvent('resize', true, false, window, 0);
        window.dispatchEvent(resizeEvent);
    } else {
        window.dispatchEvent(new Event('resize'));
    }
}

(() => {
    let i = 0;
    const t = setInterval(() => {
        if (i < 6) {
            triggerResize();
            i = i + 1;
        } else {
            clearInterval(t);
        }
    }, 1000);

    let lastTime = 0, id = null;
    let vendors = ['ms', 'moz', 'webkit', 'o'];
    for (let x = 0; x < vendors.length && !window.requestAnimationFrame; ++x) {
        window.requestAnimationFrame = window[vendors[x]+'RequestAnimationFrame'];
        window.cancelAnimationFrame = window[vendors[x]+'CancelAnimationFrame'] || window[vendors[x]+'CancelRequestAnimationFrame'];
    }

    if (!window.requestAnimationFrame) {
        window.requestAnimationFrame = function(callback) {
            let currTime = new Date().getTime();
            let timeToCall = Math.max(0, 16 - (currTime - lastTime));
            id = window.setTimeout(function() { callback(currTime + timeToCall); },
                timeToCall);
            lastTime = currTime + timeToCall;
            return id;
        };
    }

    if (!window.cancelAnimationFrame) {
        window.cancelAnimationFrame = function(id) {
            clearTimeout(id);
        };
    }
})();

document.addEventListener("DOMContentLoaded", function() {
    let scrollTop = 0, tweened = 0, speed = 0.09;
    const jsScroll = document.querySelector('.js-scroll');
    const fakeHeightScroll = document.createElement('DIV');

    jsScroll.style.position = 'fixed';
    jsScroll.style.top = '0';
    jsScroll.style.left = '0';
    jsScroll.style.transform = 'matrix3d(1,0,0,0,0,1,0,0,0,0,1,0,0,0,0,1)';

    fakeHeightScroll.style.height = jsScroll.clientHeight + 'px';
    document.body.appendChild(fakeHeightScroll);
    
    const update = () => {
        window.requestAnimationFrame(update);
        if (Math.abs(scrollTop - tweened) > 0) {
            const left =  Math.floor(tweened += speed * (scrollTop - tweened));
            jsScroll.style.transform = `matrix3d(1,0,0,0, 0,1,0,0, 0,0,1,0, 0,${(left * -1)},0,1)`;
            fakeHeightScroll.style.height = jsScroll.clientHeight + 'px';
        } 
    }
    update();

    const handleScroll = () => {
        scrollTop = window.scrollY;
    };

    const handleResize = () => {
        fakeHeightScroll.style.height = jsScroll.clientHeight + 'px';
    };

    window.addEventListener('scroll',  handleScroll, false);
    window.addEventListener('resize', handleResize, false);

}, false);