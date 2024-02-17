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
