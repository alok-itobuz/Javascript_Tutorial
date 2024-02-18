'use strict';

///////////////////////////////////////
// Modal window

const modal = document.querySelector('.modal');
const overlay = document.querySelector('.overlay');
const btnCloseModal = document.querySelector('.btn--close-modal');
const btnsOpenModal = document.querySelectorAll('.btn--show-modal');
const btnScrollTo = document.querySelector('.btn--scroll-to');
const section1 = document.querySelector('#section--1');
const nav = document.querySelector('.nav');
const tabs = document.querySelectorAll('.operations__tab');
const tabsContainer = document.querySelector('.operations__tab-container');
const tabsContent = document.querySelectorAll('.operations__content');

const openModal = function () {
  modal.classList.remove('hidden');
  overlay.classList.remove('hidden');
};

const closeModal = function () {
  modal.classList.add('hidden');
  overlay.classList.add('hidden');
};

for (let i = 0; i < btnsOpenModal.length; i++)
  btnsOpenModal[i].addEventListener('click', openModal);

btnCloseModal.addEventListener('click', closeModal);
overlay.addEventListener('click', closeModal);

document.addEventListener('keydown', function (e) {
  if (e.key === 'Escape' && !modal.classList.contains('hidden')) {
    closeModal();
  }
});

btnScrollTo.addEventListener('click', function (e) {
  // window.scrollTo(
  //   window.scrollX + section1.getBoundingClientRect().left,
  //   window.scrollY + section1.getBoundingClientRect().top
  // );

  // old school method
  // window.scrollTo({
  //   left: window.scrollX + section1.getBoundingClientRect().left,
  //   top: window.scrollY + section1.getBoundingClientRect().top,
  //   behavior: 'smooth',
  // });

  section1.scrollIntoView({ behavior: 'smooth' });
});

/////////////////////////////
/////////////////////////////
/////////////////////////////

/**
 * Capturing and Bubbling:
 * When a click happens in an element, the event is generated at the root of the element then traverse downword then reach the target element. It means the event traverse through all the parent elements of the target element.
 */

// const randomInt = (min, max) =>
//   Math.floor(Math.random() * (max - min + 1) + min);

// const randomColor = () =>
//   `rgb(${randomInt(0, 255)}, ${randomInt(0, 255)}, ${randomInt(0, 255)})`;

/**
 * Here i wrote event for nav first, then for nav_links then for nav_link. We might think that the event should be first applied on nav, then nav_links then nav_link. BUT NOO. This is because the bubbling event. First the child element is targeted, then bubbles up, if it's any of it's parent elements have also save event listener, then they will execute the call back function after the child element.
 *
 * However we can manually change the sequence like if we want to execute in capturing sequence (i.e. from root to target element) or bubbling sequence (i.e. from target element to root) by giving the third parameter in the addEventListener that is
 * true: capturing
 * false: bubbling (default)
 */
// document.querySelector('.nav').addEventListener(
//   'click',
//   function (e) {
//     this.style.backgroundColor = randomColor();
//     console.log(e.target, e.currentTarget);
//   },
//   true
// );
// document.querySelector('.nav__links').addEventListener('click', function (e) {
//   this.style.backgroundColor = randomColor();
//   console.log(e.target, e.currentTarget);

//   /**
//    * It'll stop bubbling from itself. All the parent element that are attached with the same event listener will not execute the function.
//    * If we click out of the current element then it's parent element will execute the callback function.
//    */
//   e.stopPropagation();
// });
// document.querySelector('.nav__link').addEventListener('click', function (e) {
//   this.style.backgroundColor = randomColor();
//   console.log(e.target, e.currentTarget);
// });

/////////////////////////////
/////////////////////////////
/////////////////////////////

// Using event delegation for smooth scrolling for all the navlinks
// document.querySelectorAll('.nav__link').forEach(function (el) {
//   el.addEventListener('click', function (e) {
//     e.preventDefault();
//     const id = this.getAttribute('href');

//     document.querySelector(id).scrollIntoView({ behavior: 'smooth' });
//   });
// });
document.querySelector('.nav__links').addEventListener('click', function (e) {
  e.preventDefault();

  // matching strategy
  if (e.target.classList.contains('nav__link')) {
    const id = e.target.getAttribute('href');
    document.querySelector(id).scrollIntoView({ behavior: 'smooth' });
  }
});

// //////////////////////////
// //////////////////////////
// /////////// DOM TRAVERSING ///////////////

// // going downwards
// const h1 = document.querySelector('h1');
// console.log(h1.querySelectorAll('.highlight'));
// console.log(h1.childNodes); // Nodelist
// console.log(h1.children); // HTMLCollection (dynamic)
// console.log(h1.firstElementChild);

// // going upwards
// console.log(h1.parentNode);
// console.log(h1.parentElement);
// // nor direct parent
// console.log(h1.closest('.header')); // just like querySelector
// console.log(h1.closest('h1')); // will select itself

// //siblings
// console.log(h1.previousSibling);

// //////////////////////////
// //////////////////////////
// //////////////////////////
let prevContent = tabsContainer.nextElementSibling;
let prevTab = tabsContainer.firstElementChild;
tabsContainer.addEventListener('click', function (e) {
  const clicked = e.target.closest('button');

  // guard clause
  if (!clicked) return;

  if (clicked && clicked !== prevTab) {
    clicked.classList.add('operations__tab--active');
    prevTab.classList.remove('operations__tab--active');

    prevContent.classList.remove('operations__content--active');
    const currentContent = document.querySelector(
      `.operations__content--${clicked.dataset.tab}`
    );
    currentContent.classList.add('operations__content--active');

    prevTab = e.target;
    prevContent = currentContent;
  }
});

const handleHover = function (e, opacity) {
  if (e.target.classList.contains('nav__link')) {
    const link = e.target;
    const siblings = link.closest('.nav').querySelectorAll('.nav__link');
    const logo = link.closest('.nav').querySelector('img');
    siblings.forEach(s => s !== link && (s.style.opacity = opacity));
    logo.style.opacity = opacity;
  }
};

// new fade animation on nav
nav.addEventListener('mouseover', e => handleHover(e, 0.5));
nav.addEventListener('mouseout', e => handleHover(e, 1));

// stick the navbar when section 2 reached after scrolling

//// Inefficient method
// const initialCords = section1.getBoundingClientRect();
// window.addEventListener('scroll', function () {
//   // when section1 top reaches the exact y = 0 of window
//   if (window.scrollY >= initialCords.top) nav.classList.add('sticky');
//   else nav.classList.remove('sticky');

//   // // when section1 top reaches at the nav height position from top
//   // const navHeight = nav.getBoundingClientRect().height;
//   // if (section1.getBoundingClientRect().top <= navHeight) {
//   //   nav.classList.add('sticky');
//   // } else nav.classList.remove('sticky');
// });

////////////////// Using intersection observer ////////////////////////
// ///////////////////////////////////////////////////////////////////////
// ///////////////////////////////////////////////////////////////////////
// const obsCallback = function (entries, observer) {
//   if (!entries[0].isIntersecting) {
//     nav.classList.add('sticky');
//   } else nav.classList.remove('sticky');
// };

// /**
//  * IMPORTANT:
//  * root is the scrollable element, when we give null then it takes the viewport as the scrollable element.
//  *
//  * threshold: it can be array of multiple intersection percentage value also.
//  *
//  * let we have given {threshold: 0.1}, it means when the scrollable window intersect 10% of the total height of target element
//  * (NOTE: provided the height of the scrollable window should be atleast the threshold % of the target element height otherwise the full height of scrollable element can see less than the threshold % of the targeted element height, so it'll take no intersection)
//  * the callback function will be called. the callback function will be called when 10% of the target element is visible in the scrollable element and when it's getting less than 10% visible (after 10% visible) it means during appearing of 10% and during disappering of that.
//  * during appearing: isIntersection will be true
//  * during disappearing: isIntersection will be false
//  */
// const obsOptions = {
//   root: null,
//   threshold: 0,
// };

// const observer = new IntersectionObserver(obsCallback, obsOptions);
// console.log('hello', observer);
// observer.observe(document.querySelector('.header'));

// ///////////////////////////////////////////////////////////////////////
// ///////////////////////////////////////////////////////////////////////
// ///////////////////////////////////////////////////////////////////////
const header = document.querySelector('.header');

const stickyNav = function (entries, observer) {
  const [entry] = entries;
  if (!entry.isIntersecting) {
    nav.classList.add('sticky');
  } else nav.classList.remove('sticky');
};

const headerObserver = new IntersectionObserver(stickyNav, {
  root: null,
  threshold: 0,
  rootMargin: `-${nav.getBoundingClientRect().height}px`,
});
headerObserver.observe(header);

////////////////////////////////////////
// Reveal sections
const allSections = document.querySelectorAll('.section');

const revealSection = function (entries, observer) {
  const [entry] = entries;
  const target = entry.target;

  if (!entry.isIntersecting) return;

  target.classList.remove('section--hidden');
  observer.unobserve(target);
};
const sectionObserver = new IntersectionObserver(revealSection, {
  threshold: 0.15,
});

allSections.forEach(function (section) {
  sectionObserver.observe(section);
  section.classList.add('section--hidden');
});

/////////////////////LAZY LOADING IMAGES/////////////////////////
/////////////////////////////////////////////////////////////////
/////////////////////////////////////////////////////////////////
const imgTargets = document.querySelectorAll('img[data-src]');

const loadImg = function (entries, observer) {
  const [entry] = entries;
  if (!entry.isIntersecting) return;

  entry.target.src = entry.target.dataset.src;
  // // If we do this, then the low resolution image will be displayed before loading the high resolution image (in slow network speed it can be visible)
  // entry.target.classList.remove('lazy-img');
  entry.target.addEventListener('load', function () {
    entry.target.classList.remove('lazy-img');
  });
  observer.unobserve(entry.target);
};

const imgObserver = new IntersectionObserver(loadImg, {
  root: null,
  threshold: 0,
  rootMargin: '200px', // to load the image before it's in the viewport after scrolling
});

imgTargets.forEach(img => imgObserver.observe(img));

//////////////////////////////  SLIDER  ////////////////////////////
////////////////////////////////////////////////////////////////////
////////////////////////////////////////////////////////////////////

/* 
//////////////////////// My Method ////////////////////////////
const slides = document.querySelectorAll('.slide');
const [sliderBtnLeft, sliderBtnRight] =
  document.querySelectorAll('.slider__btn');
const dots = document.querySelector('.dots');

for (let i = 0; i < slides.length; i++) {
  dots.insertAdjacentHTML(
    'beforeend',
    `<div class="dots__dot" data-dotnum=${i}></div>`
  );
}

let prevDot = dots.firstChild;
prevDot.classList.add('dots__dot--active');
const allDots = [...dots.children];

slides.forEach(
  (slide, i) => (slide.style.transform = `translateX(${100 * i}%)`)
);

function getTranslatePercentage(elem) {
  return Number(elem.style.transform.toString().split('X')[1].slice(1, -2));
}
function slideTransform(direction) {
  const flag = direction === 'left' ? 1 : -1;
  const breakPoint = direction === 'left' ? 0 : -1;

  if (!getTranslatePercentage([...slides].at(breakPoint))) return;

  slides.forEach((slide, i) => {
    const prevTransform = getTranslatePercentage(slide);

    slide.style.transform = `translateX(${prevTransform + flag * 100}%)`;

    if (!(prevTransform + flag * 100)) {
      allDots[i].classList.add('dots__dot--active');
      prevDot.classList.remove('dots__dot--active');
      prevDot = allDots[i];
    }
  });
}

sliderBtnLeft.addEventListener('click', () => slideTransform('left'));
sliderBtnRight.addEventListener('click', () => slideTransform('right'));

dots.addEventListener('click', function (e) {
  if (!e.target.classList.contains('dots__dot')) return;

  prevDot.classList.remove('dots__dot--active');
  e.target.classList.add('dots__dot--active');
  prevDot = e.target;

  const dotNum = e.target.dataset.dotnum;

  const currSlideTransform = getTranslatePercentage(slides[dotNum]);

  const threshold = -1 * currSlideTransform;

  slides.forEach((slide, i) => {
    slide.style.transform = `translateX(${
      getTranslatePercentage(slide) + threshold
    }%)`;
  });
});
*/

//////////////////////// Udemy Method //////////////////

const slider = function () {
  const slides = document.querySelectorAll('.slide');
  const [btnLeft, btnRight] = document.querySelectorAll('.slider__btn');
  const dotContainer = document.querySelector('.dots');

  let currSlide = 0;
  const maxSlide = slides.length;

  for (let i = 0; i < maxSlide; i++) {
    dotContainer.insertAdjacentHTML(
      'beforeend',
      `<div class="dots__dot" data-slide=${i}></div>`
    );
  }

  const allDots = document.querySelectorAll('.dots__dot');

  const removeActiveFromDots = function (currSlide) {
    allDots[currSlide].classList.remove('dots__dot--active');
  };

  const goToSlide = function (currSlide) {
    allDots[currSlide].classList.add('dots__dot--active');
    slides.forEach(
      (slide, i) =>
        (slide.style.transform = `translateX(${100 * (i - currSlide)}%)`)
    );
  };
  goToSlide(currSlide);

  const nextSlide = function () {
    removeActiveFromDots(currSlide);
    if (currSlide === maxSlide - 1) currSlide = 0;
    else currSlide++;

    goToSlide(currSlide);
  };
  const prevSlide = function () {
    removeActiveFromDots(currSlide);
    if (currSlide === 0) currSlide = maxSlide - 1;
    else currSlide--;

    goToSlide(currSlide);
  };

  // 100 * (i - currSlide)
  btnRight.addEventListener('click', nextSlide);
  btnLeft.addEventListener('click', prevSlide);

  window.addEventListener('keydown', function (e) {
    const key = e.key.toLowerCase();
    key === 'arrowleft' && prevSlide();
    key === 'arrowright' && nextSlide();
  });

  dotContainer.addEventListener('click', function (e) {
    if (!e.target.classList.contains('dots__dot')) return;

    removeActiveFromDots(currSlide);
    const { slide } = e.target.dataset;
    currSlide = slide;
    goToSlide(currSlide);
  });
};
slider();

//////////////////////nLifecycle DOM Events ////////////////////////
////////////////////////////////////////////////////////////////////
////////////////////////////////////////////////////////////////////
window.addEventListener('beforeunload', function (e) {
  e.preventDefault();
  console.log(e);
  e.returnValue = '';
});
