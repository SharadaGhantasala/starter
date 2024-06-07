'use strict';

///////////////////////////////////////
// Modal window

const modal = document.querySelector('.modal');
const overlay = document.querySelector('.overlay');
const btnCloseModal = document.querySelector('.btn--close-modal');
const btnsOpenModal = document.querySelectorAll('.btn--show-modal');

const openModal = function (e) {
  e.preventDefault();//added this to prevent scroll from going back to default when opening a modal
  modal.classList.remove('hidden');
  overlay.classList.remove('hidden');
};

const closeModal = function () {
  modal.classList.add('hidden');
  overlay.classList.add('hidden');
};

btnsOpenModal.forEach(btn => btn.addEventListener("click", openModal));
//replaced a for loop


btnCloseModal.addEventListener('click', closeModal);
overlay.addEventListener('click', closeModal);

document.addEventListener('keydown', function (e) {
  if (e.key === 'Escape' && !modal.classList.contains('hidden')) {
    closeModal();
  }
});


console.log(document.documentElement);
//selecting elements
const heading = document.querySelector(".header");
console.log(heading);
//creating elements
const message = document.createElement('div');
message.textContent = "We use Cookies for better functionality.";
message.innerHTML = "We use Cookies for better functionality.<button class='btn btn--close-cookie'>Got it!</button>";
heading.prepend(message);

//deleting elements
const closeCookieBtn = document.querySelector(".btn--close-cookie");
closeCookieBtn.addEventListener("click", function () {
  closeCookieBtn.classList.add("hidden");
  message.classList.add("hidden");
});

//styles

//scrolling
const btnScrollTo = document.querySelector(".btn--scroll-to");
const section1 = document.querySelector("#section--1");
btnScrollTo.addEventListener("click", function () {
  section1.scrollIntoView({ behavior: "smooth" });
});


const alerting = function () {
  alert("you scrolled over the text");
}

const h1 = document.querySelector("h1");
h1.addEventListener("mouseenter", alerting);
setTimeout(() => {
  h1.removeEventListener("mouseenter", alerting);
}, 3000);

console.log(h1.querySelectorAll(".highlight"));
//tabs
const tabs = document.querySelectorAll(".operations__tab");
const tabsContainer = document.querySelectorAll(".operations__tab-container");
const tabsContent = document.querySelectorAll(".operations__content")

tabsContainer.forEach(container => {
  container.addEventListener("click", function (e) {
    const clicked = e.target.closest(".operations__tab");
    console.log(clicked);
    //guard clause-ignoring when we click space
    if (!clicked) return;
    //removes active class from all tabs
    tabs.forEach(tab => tab.classList.remove("operations__tab--active"));
    //then adds active class for only relevant tabs
    clicked.classList.add("operations__tab--active");

    //activating content area
    console.log(clicked.dataset.tab);
    tabsContent.forEach(tabc => tabc.classList.remove(("operations__content--active")));
    document.querySelector(".operations__content--" + clicked.dataset.tab).classList.add("operations__content--active");
  });
});

//menu fade
const nav = document.querySelector(".nav");



const handleHover = function (e) {
  if (e.target.classList.contains("nav__link")) {//checks if if the event target has the class "nav__link" 
    const link = e.target;
    const siblings = link.closest(".nav").querySelectorAll(".nav__link");
    //Using link.closest(".nav") to find the closest ancestor element with the class "nav". This ancestor element represents the navigation container.
    //uses querySelectorAll(".nav__link") to select all elements with the class "nav__link" within the navigation container. These elements represent the sibling navigation links.
    const logo = link.closest(".nav").querySelector('img');
    //uses querySelector('img') to select the logo image within the same navigation container. This assumes that the logo image is an <img> element present within the navigation container.
    siblings.forEach(el => {
      if (el !== link) el.style.opacity = this;
    });
    logo.style.opacity = this;
  }
}//iterates over each sibling navigation link and adjusts opacity based on the value of this
//passing an arg into a handler-bind() to create new functions with a predetermined value for this. It binds the handleHover function to a specific value of this
nav.addEventListener("mouseover", handleHover.bind(.5));
nav.addEventListener("mouseout", handleHover.bind(1));

//console.log(tabs);
//console.log(tabsContainer);
//console.log(tabsContent);
//console.log(document.documentElement);



//nav links is common element of all those links
document.querySelector(".nav__links").addEventListener("click", function (e) {
  e.preventDefault();
  console.log(e.target);
  //matching strategy
  if (e.target.classList.contains("nav__link")) {
    console.log("LINK");
    const id = e.target.getAttribute("href");
    document.querySelector(id).scrollIntoView({
      behavior: "smooth"
    });
  }
})



//observer.observe(section1);
const navHeight = nav.getBoundingClientRect().height;
//calculates the height of the navigation bar. This height is needed to define the root margin for the Intersection Observer.
const stickyNav = function (entries) {
  const [entry] = entries;
  console.log(entry);//extracts the first entry from the entries array
  if (!entry.isIntersecting) nav.classList.add("sticky");//checks if the observed entry (entry) is not intersecting with the root element  and If it's not intersecting, it adds the "sticky" class to the navigation (nav.classList.add("sticky")
  else nav.classList.remove("sticky");//When a sticky element reaches a defined point (usually the top of its container or the viewport), it becomes fixed at that point and remains there as the user scrolls down the page.
}

// It takes two arguments: the callback function (stickyNav) to execute when the observed element intersects with the root element, and an options object that configures the observer's behavior.
const headerObserver = new IntersectionObserver(stickyNav, {
  root: null,//browser viewport is used as the root element for intersection calculations
  threshold: 0,//he callback will be called as soon as the target element begins to intersect with the root.
  rootMargin: '-' + navHeight + 'px',//
});

headerObserver.observe(heading);//starts observing the target element(heading) with the Intersection Observer.When the observed element intersects with the root element based on the specified options, the stickyNav function will be called.


//reveal sections
const allSections = document.querySelectorAll(".section");
//This function literally reveals the section
const revealSection = function (entries, observer) {
  const [entry] = entries;
  if (!entry.isIntersecting) return;
  entry.target.classList.remove("section--hidden");// if the observed entry(the targer element being observed) is intersecting with the root element, then the funciton returns early. else, it reveals the section
  observer.unobserve(entry.target);
}

//intersection observer objects have a callback function and object properties
//the root property defines what element is used as the viewport, where null is the browser viewport
//threshold is btwn 0 to 1 and represents the proportion of the target element that needs to be visible for the intersection to be detected-> when the intersection is detected, the observers callback is invoked
//observe(elem) method initiates observing the target element 
//unobserve(elem) stops the observing
//disconnect- stops observing all target elements

//the sectionObserver calls on the revealSection function when the browser window intersects with the target element, which will be an individual section
const sectionObserver = new IntersectionObserver(revealSection, {
  root: null,
  threshold: .15
})
allSections.forEach(function (section) {
  sectionObserver.observe(section);
  section.classList.add("section--hidden");
})
//applies a sectionObserver object to observe each section and reveal as needed
//also adds hidden class to every element beforehand as a default

/////////////////////////////////////////////
//Lazyloading images

const imgTargets = document.querySelectorAll('img[data-src]');
//selects all <img> elements that have a data-src attribute. these are usually low rez versions of the acc images
const loadImg = function (entries, observer) {
  const [entry] = entries;
  //console.log(entry);
  if (!entry.isIntersecting) return;//if they don't intersect, don't do anything
  entry.target.src = entry.target.dataset.src;//else sets the src attribute of the image to the value of its data-src attribute. This loads the actual high-resolution image, replacing the placeholder or low-resolution image.

  entry.target.addEventListener('load', function () {
    entry.target.classList.remove("lazy-img");
  }); //when load event is triggered the lazy-img class is removed so img is fully loaded and not lazy-loaded 


  observer.unobserve(entry.target);//improves performance by not observing images that have already been loaded
};
const imgObserver = new IntersectionObserver(loadImg, {
  root: null,
  threshold: 0

});//creating a intersectionObserver object to observe each image

imgTargets.forEach(img => imgObserver.observe(img));
//attaches the imgObserver object to each imgTarget

/////////////////////////
//slide
const slides = document.querySelectorAll(".slide");
console.log(slides);
const slider = document.querySelector(".slider");
const btnLeft = document.querySelector(".slider__btn--left");
const btnRight = document.querySelector(".slider__btn--right");



let curSlide = 0;//keeps track of the current slide index
const maxSlide = slides.length;

//slider.style.transform = "scale(.4) translateX(-800px)";
slider.style.overflow = 'visible';

//function to actually physically shift the slide
//translate the slide in relation to current slide

/*const lastSlide = function (slide) {
  slides.forEach((s, i) => {
    if (i === slide) {
      s.style.transform = "translateX(0%)"; // Center the current slide
    } else if (i > slide) {
      s.style.transform = "translateX(" + 100 * Math.abs(i - slide) + "%)"; // Move the previous slides to the left
    } else {
      s.style.transform = "translateX(-" + 100 * Math.abs(i - slide) + "%)"; // Move the next slides to the right
    }
  });
}*/

const changingSlideTo = function (slide) {
  slides.forEach((s, i) => {
    if (i === slide) {
      s.style.transform = "translateX(0%)"; // Center the current slide
    } else if (i < slide) {
      s.style.transform = "translateX(-" + 150 * Math.abs(i - curSlide) + "%)"; // Move the previous slides to the left
    } else {
      s.style.transform = "translateX(" + 150 * Math.abs(i - curSlide) + "%)"; // Move the next slides to the right
    }
  });
}
//function that decides on what slide to go to
const goToSlide = function () {

  if (curSlide === maxSlide - 1) {//if u reached the maxSlide, goes back to first slide
    curSlide = -1;
  }
  curSlide++;//increments the current slide number every time button clicked
  if (curSlide === 0) {
    btnLeft.classList.add("hidden");
  } else {
    btnLeft.classList.remove("hidden");
  }
  changingSlideTo(curSlide);
}

const prevSlide = function () {

  if (curSlide === 0) return;
  curSlide--;
  if (curSlide === 0) {
    btnLeft.classList.add("hidden");
  } else {
    btnLeft.classList.remove("hidden");
  }
  changingSlideTo(curSlide);
};


//sets up initial set-up of slides
slides.forEach((s, i) => {
  if (i === 0) {
    s.style.transform = "translateX(0%)"; // Center the current slide
  } else if (i > 0) {
    s.style.transform = "translateX(" + 150 * Math.abs(i - curSlide) + "%)"; // Move the previous slides to the left
  } else {
    s.style.transform = "translateX(-" + 150 * Math.abs(i - curSlide) + "%)"; // Move the next slides to the right
  }
});






//This iterates over each slide element (s) and adjusts its transform property to move it horizontally. The amount of horizontal movement depends on the difference between the index of the slide (i) and the current slide index (curSlide). It's calculated as a percentage of the slide width.
btnLeft.classList.add("hidden");
btnRight.addEventListener("click", goToSlide);
btnLeft.addEventListener("click", prevSlide);



