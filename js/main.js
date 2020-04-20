document.addEventListener('DOMContentLoaded', function() {
    const itemTitle = document.querySelector('.item__title');
    const headerLoading = document.querySelector('.header__loading');
    const headerTop = document.querySelector('.header__top');

    headerLoading.style.transition = "all 1600ms cubic-bezier(0.64, 0.135, 0.15, 0.86)";

    setTimeout(() => {
        headerLoading.style.transform = `translateY(${itemTitle.offsetTop}px) scale(.7619)`;
    }, 2500);
    setTimeout(() => {
        headerLoading.style.transition = "none";
        headerLoading.style.opacity = `0`;
        headerTop.style.opacity = `1`;
    }, 4020);


    const elementParallax = document.querySelectorAll('[data-parallax]');
    const animateScroll = document.querySelectorAll('[data-animate-scroll]');

    const allElementAnimateScroll = document.querySelectorAll('[data-trigger-scroll]');
    const allElementAnimateDelay = document.querySelectorAll('[data-trigger-scroll-d]');
    const itemMask = document.querySelectorAll('.item__mask');
    const sec2ListImg = document.querySelector('.list__item');
    const section2 = document.querySelector('.section2');
    const parallaxElement = document.querySelectorAll('[data-parallax]');

    // slide
    const btnPrev = document.querySelector('.control__slide.prev');
    const btnNext = document.querySelector('.control__slide.next');

    const slideLeft = document.querySelector('.center__left');
    const slideRight = document.querySelector('.slide__list');
    const slideRightTitle = document.querySelector('.slide__title');

    let time = 0;
    let scrollTop = 0, tweened = 0;
    const update = () => {
        window.requestAnimationFrame(update);

        elementParallax.forEach((e, i) => {
            if (e.getBoundingClientRect().y <= window.innerHeight) {
                if (e.dataset.parallaxStart) return;
                e.setAttribute('data-parallax-start', window.scrollY);
            } else {
                e.removeAttribute('data-parallax-start');
            }
        });
        
        parallaxElement.forEach((e, i) => {
            if (e.getBoundingClientRect().y <= window.innerHeight) {
                if (Math.abs(scrollTop - tweened) > 0) {
                    const left =  Math.floor(tweened += 0.1 * (scrollTop - tweened));
                    e.style.transform = `translate3d(0, -${left * +e.dataset.parallax}px, 0)`;
                }   
            }
        });
        
        allElementAnimateScroll.forEach(e => {
            e.style.display = 'inline-block'
            if (e.parentElement.getBoundingClientRect().y <= window.innerHeight) {
                e.classList.remove(e.dataset.triggerScroll);
            } else {
                e.classList.add(e.dataset.triggerScroll);
            }
        });

        allElementAnimateDelay.forEach(e => {
            if (e.parentElement.getBoundingClientRect().y <= window.innerHeight) {
                e.style.webkitTransitionDelay = e.dataset.triggerScrollD ? e.dataset.triggerScrollD : '0';
            } else {
                e.style.webkitTransitionDelay = '0'
            }
        });
        
        const triggerScroll = section2.querySelectorAll('.transformY');

        if (!triggerScroll.length) {
            time++;
            if (time === 60) {
                itemMask.forEach(e => {
                    const itemShow = e.querySelector('.show');
                    try {
                        itemShow.classList.remove('show');
                        if (itemShow.nextElementSibling) {
                            itemShow.nextElementSibling.classList.add('show');
                        } else {
                            e.firstElementChild.classList.add('show')
                        }
                    } catch (error) {}
                });
                const imgShow = sec2ListImg.querySelector('.img-show');
                try {
                    imgShow.classList.remove('img-show');
                    imgShow.classList.add('img-hidden');
                    setTimeout(() => {
                        imgShow.classList.remove('img-hidden');
                    }, 1100);
                    if (imgShow.nextElementSibling) {
                        imgShow.nextElementSibling.classList.add('img-show');
                    } else {
                        sec2ListImg.firstElementChild.classList.add('img-show');
                    }
                } catch (error) {}
            }
            if (time === 150) time = 0;
        } 
        
        animateScroll.forEach(e => {
            if (e.getBoundingClientRect().y <= window.innerHeight) {
                e.classList.add('animate');
            } else {
                e.classList.remove('animate');
            }
        });
    }
    update();
    window.addEventListener('scroll', () => scrollTop = window.scrollY);

    btnNext.addEventListener('click', function() {
        const slideLeftShow = slideLeft.querySelector('.show');
        const imgShow = slideRight.querySelector('.img-show');
        const titleShow =  slideRightTitle.querySelector('.show');

        slideLeftShow.classList.add('hidden');
        setTimeout(() => {
            slideLeftShow.classList.remove('show');
            slideLeftShow.classList.remove('hidden');
        }, 1200);

        try {
            // left slide
            if (slideLeftShow.nextElementSibling) {
                setTimeout(() => {
                    slideLeftShow.nextElementSibling.classList.add('show');
                }, 500);
            } else {
                setTimeout(() => {
                    slideLeft.firstElementChild.classList.add('show');
                }, 500);
            }

            // right slide
            imgShow.classList.remove('img-show');
            imgShow.classList.add('img-hidden');
            setTimeout(() => {
                imgShow.classList.remove('img-hidden');
            }, 1100);
            if (imgShow.nextElementSibling) {
                imgShow.nextElementSibling.classList.add('img-show');
            } else {
                slideRight.firstElementChild.classList.add('img-show');
            }

            // title
            titleShow.classList.remove('show');
            if (titleShow.nextElementSibling) {
                titleShow.nextElementSibling.classList.add('show');
            } else {
                slideRightTitle.firstElementChild.classList.add('show');
            }
        } catch (error) {}

    }, false);

    btnPrev.addEventListener('click', function() {
        const slideLeftShow = slideLeft.querySelector('.show');
        const imgShow = slideRight.querySelector('.img-show');
        const titleShow =  slideRightTitle.querySelector('.show');
        
        slideLeftShow.classList.add('hidden');
        setTimeout(() => {
            slideLeftShow.classList.remove('show');
            slideLeftShow.classList.remove('hidden');
        }, 1200);

        try {
            if (slideLeftShow.previousElementSibling) {
                setTimeout(() => {
                    slideLeftShow.previousElementSibling.classList.add('show');
                }, 500);
            } else {
                setTimeout(() => {
                    slideLeft.lastElementChild.classList.add('show');
                }, 500);
            }

            // right slide
            imgShow.classList.remove('img-show');
            imgShow.classList.add('img-hidden');
            setTimeout(() => {
                imgShow.classList.remove('img-hidden');
            }, 1200);
            if (imgShow.previousElementSibling) {
                imgShow.previousElementSibling.classList.add('img-show');
            } else {
                slideRight.lastElementChild.classList.add('img-show');
            }
            
            titleShow.classList.remove('show');
            if (titleShow.previousElementSibling) {
                titleShow.previousElementSibling.classList.add('show');
            } else {
                slideRightTitle.lastElementChild.classList.add('show');
            }
        } catch (error) { }
       
    }, false);

    const btnTop = document.querySelector('.btn__bttop');
    btnTop.addEventListener('click', function() {
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        })
    })
}, false);