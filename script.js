"use strict";

/////////////////////////////////////// Modal window
const header = document.querySelector(".header");
const modal = document.querySelector(".modal");
const overlay = document.querySelector(".overlay");
const btnCloseModal = document.querySelector(".btn--close-modal");
const btnsOpenModal = document.querySelectorAll(".btn--show-modal"); // creast NodeList
const navLinks = document.querySelectorAll(".nav__link");
const btnScrollTo = document.querySelector(".btn--scroll-to");
const section1 = document.querySelector("#section--1");
const section2 = document.querySelector("#section--2");
const section3 = document.querySelector("#section--3");
const nav = document.querySelector(".nav");
////////////////////////////////////////////////////////////////////// functions
const openModal = function (e) {
  // e.preventDefault()
  modal.classList.remove("hidden");
  overlay.classList.remove("hidden");
};

const closeModal = function () {
  modal.classList.add("hidden");
  overlay.classList.add("hidden");
};

////////////////////////////////////////////////////////////////////// Event listner

// for (let i = 0; i < btnsOpenModal.length; i++)
//   btnsOpenModal[i].addEventListener('click', openModal);
btnsOpenModal.forEach((elemnt) => elemnt.addEventListener("click", openModal));

btnCloseModal.addEventListener("click", closeModal);
overlay.addEventListener("click", closeModal);

document.addEventListener("keydown", function (e) {
  if (e.key === "Escape" && !modal.classList.contains("hidden")) closeModal();
});

//************NavBar Section************
document.querySelector(".nav__links").addEventListener("click", (e) => {
  e.preventDefault();

  //matching stratgy
  if (e.target.classList.contains("nav__link")) {
    const id = e.target.getAttribute("href");
    console.log(id);
    document.querySelector(id).scrollIntoView({ behavior: "smooth" });
  }
});
btnScrollTo.addEventListener("click", function (e) {
  const s1coords = section1.getBoundingClientRect(); //create DOM rectangle object (DOMRect) and this relative to the viewport
  // console.log("s1coords", s1coords);
  // console.log("e itself", e.target.getBoundingClientRect()); //the coords of btn itself

  // console.log(
  //   "current scroll coords (x/y)",
  //   window.pageXOffset,
  //   window.pageYOffset
  // );

  //____to see information about diminutions of viewport
  // console.log(
  //   "height/width viewport",
  //   document.documentElement.clientHeight,
  //   document.documentElement.clientWidth
  // );

  //___scrolling_____
  // window.scrollTo(s1coords.left + window.pageXOffset, s1coords.top + window.pageYOffset)

  // window.scrollTo({
  //   left: s1coords.left + window.pageXOffset,
  //   top: s1coords.top + window.pageYOffset,
  //   behavior: 'smooth'
  // })

  //__________________________modern way for scroling
  section1.scrollIntoView({ behavior: "smooth" });
});

// Menu fade animation
const handleHover = function (e) {
  if (e.target.classList.contains("nav__link")) {
    const link = e.target;
    const sibilings = link.closest(".nav").querySelectorAll(".nav__link");
    const logo = link.closest(".nav").querySelector("img");

    sibilings.forEach((el) => {
      if (el !== link) el.style.opacity = this;
    });
    logo.style.opacity = this;
  }
};

// nav.addEventListener('mouseover',function(e){
//   handleHover(e,.5)
// })

// passing 'argumen' into handler
nav.addEventListener("mouseover", handleHover.bind(0.5));
nav.addEventListener("mouseout", handleHover.bind(1));
//acutely here handleHover replaces the function up there which already can have only one real arument whis is the (event)  then we set the (this) as a value and we use it the any argumen will be real argument so we can use multipul arguments by this way

/*
// sticky navigation
// scroll event at window object not at documenant by that event argument is usless 

const m =section1.getBoundingClientRect()
console.log(m.top ,window.scrollY)

window.addEventListener('scroll', function (){

  // console.log(m.top ) //constant not changed while scrolling
  // console.log(window.scrollY)// changed while scrolling
  // console.log(window.pageYOffset === window.scrollY)
  if(window.scrollY > m.top ){
    nav.classList.add('sticky')
  }else(
    nav.classList.remove('sticky')
  )
})
*/

const navHeight = Number.parseFloat(getComputedStyle(nav).height);

const stickyNav = function (entries) {
  const [entry] = entries;
  // console.log(entry)
  if (!entry.isIntersecting) {
    nav.classList.add("sticky");
  } else {
    nav.classList.remove("sticky");
  }
};

const headerObserver = new IntersectionObserver(stickyNav, {
  root: null,
  threshold: 0,
  rootMargin: `-${navHeight}px`,
});
headerObserver.observe(header);
//************FEATURES Section************/// lazy imgs

const allImgs = document.querySelectorAll("img[data-src]");

const lazyimgs = function (entries, observer) {
  const [entry] = entries;

  if (!entry.isIntersecting) return;
  entry.target.setAttribute("src", `${entry.target.dataset.src}`);
  entry.target.addEventListener("load", function () {
    entry.target.classList.remove("lazy-img");
  });
  observer.unobserve(entry.target);
};

const imgObserver = new IntersectionObserver(lazyimgs, {
  root: null,
  threshold: 0,
  rootMargin: "200px",
});
allImgs.forEach((img) => imgObserver.observe(img));
//************OPERATIONS Section************
//tabbed component
const tabs = document.querySelectorAll(".operations__tab");
const tabContainer = document.querySelector(".operations__tab-container");
const Contents = document.querySelectorAll(".operations__tab");

document
  .querySelector(".operations__tab-container")
  .addEventListener("click", (e) => {
    const clicked = e.target.closest(".operations__tab");
    console.log(clicked);

    //guard close
    if (!clicked) return;
    // remove active classes
    [...clicked.parentElement.children].forEach((e) =>
      e.classList.remove("operations__tab--active")
    );

    document.querySelectorAll(".operations__content").forEach((el) => {
      el.classList.remove("operations__content--active");
    });

    // active tab
    clicked.classList.add("operations__tab--active");

    // Active Content Area
    document
      .querySelector(`.operations__content--${clicked.dataset.tab}`)
      .classList.add("operations__content--active");
  });
//************TESTIMONIALS Section************
////////////////////////////////////////////////////// Sliding
const slider = function () {
  const allSlides = document.querySelectorAll(".slide");
  const btnRight = document.querySelector(".slider__btn--right");
  const btnLeft = document.querySelector(".slider__btn--left");
  const dotsCont = document.querySelector(".dots");
  let currSlide = 0;

  const createDots = function () {
    allSlides.forEach((_, i) => {
      dotsCont.insertAdjacentHTML(
        "beforeend",
        `<button class="dots__dot" data-slide="${i}"></button>`
      );
    });
  };

  const activeDot = function (slide) {
    document
      .querySelectorAll(".dots__dot")
      .forEach((dot) => dot.classList.remove("dots__dot--active"));

    document
      .querySelector(`[data-slide="${slide}"]`)
      .classList.add("dots__dot--active");
  };

  const goToSlide = function (slide) {
    allSlides.forEach(
      (e, i) => (e.style.transform = `translateX(${(i - slide) * 100}%)`)
    );
  };

  //Next silde
  const nextSlide = () => {
    currSlide === allSlides.length - 1 ? (currSlide = 0) : currSlide++;
    goToSlide(currSlide);
    activeDot(currSlide);
  };

  //Pervious silde
  const prevSlide = () => {
    currSlide > 0 ? currSlide-- : (currSlide = allSlides.length - 1);
    goToSlide(currSlide);
    activeDot(currSlide);
  };

  //intialzation func
  const intial = function () {
    goToSlide(0);
    createDots();
    activeDot(currSlide);
  };
  intial();

  // Event Listners
  btnRight.addEventListener("click", nextSlide);
  btnLeft.addEventListener("click", prevSlide);

  document.addEventListener("keydown", function (e) {
    if (e.key === "ArrowLeft") prevSlide();
    if (e.key === "ArrowRight") nextSlide();
  });

  dotsCont.addEventListener("click", (e) => {
    if (e.target.classList.contains("dots__dot")) {
      currSlide = Number(e.target.dataset.slide);
      goToSlide(currSlide);
      activeDot(currSlide);
    }
  });
};
slider();

//************ all Sections ****************
const allSections = document.querySelectorAll(".section");

const revealSection = function (entries, observer) {
  const [entry] = entries;
  if (!entry.isIntersecting) return;
  entry.target.classList.remove("section--hidden");
  //to stop observ elemnt after do our work
  observer.unobserve(entry.target);
};

const sectionObserver = new IntersectionObserver(revealSection, {
  root: null,
  threshold: 0.2,
});

allSections.forEach((section) => {
  section.classList.add("section--hidden");
  sectionObserver.observe(section);
});

//////////////////////////////////////////////////////////////////////////////////////////////  lectures
/*
//___________Selecting elemnt
console.log(document.documentElement)//html tag
console.log(document.head)//head tag
console.log(document.body)//body tag

const header = document.querySelector('.header');
document.querySelector('#section--1');
const AllSections = document.querySelectorAll('.section')//NodeList
console.log(AllSections)

document.getElementById('section--1')
const allButtons = document.getElementsByTagName('button') //returns html collection
console.log(allButtons)
console.log(document.getElementsByClassName('btn')) //html collection



// ____________Creating and inserting elemnts

/*
document.querySelector('.header').insertAdjacentHTML('beforeend',`
<div class="cookie-message">
we use cookies for improved functionality and analytics.
<button class="btn btn--close-cookie">Got it!</button>
</div>
`)


const message = document.createElement('div')// returns DOM elemnt
message.classList.add('cookie-message');
// message.textContent='we use cookies for improved functionality and analytics.'
message.innerHTML='we use cookies for improved functionality and analytics. <button class="btn btn--close-cookie">Got it!</button>'

//__________ insert elemnt sec stage of creating

// header.prepend(message) //to insert as first child
header.append(message) // as last child

// header.append(message.cloneNode(true))// to make a copy elemnt 

// header.before(message)
// header.after(message)

//________ Delete elemnts
document.querySelector('.btn--close-cookie').addEventListener('click',function(){
  // message.parentElement.removeChild(message) // old way and this way of selecting on DOM tree is called DOM traversing
 message.remove()//modern way

})



//______________ styles
message.style.backgroundColor = '#37383d'
message.style.width= '120%'
console.log(message.style.height) //we can't read props into clases
console.log(message.style.backgroundColor) // we can accsess to the inline style only

console.log(getComputedStyle(message).color) //to get and read props from real style as it apear in the page even if we don't declare it in our css the browser like(hieght) the brwoser need to calculate it

message.style.height = Number.parseFloat(getComputedStyle(message).height, 10) + 40 + 'px'

//to access to the custom property whish is css variable which exist in root elemnt which equalven document.documentElemnt
document.documentElement.style.setProperty('--color-primary', 'orangered')


// also for locak css variable and also for any property to any elemnt
document.querySelectorAll('.section__header').forEach(e=>e.style.setProperty('--mainColor', 'initial'))









// ______________attributes
const logo = document.querySelector('.nav__logo')
//if we specify them on html then JS automatically creats these props on the obj but if we add other attrs that not standers JS will NOT do
console.log(logo.src) //return absolute URL
console.log(logo.alt)
console.log(logo.className)

logo.alt="Beautiful logo"

//Non-standerd
console.log(logo.designer)
console.log(logo.getAttribute('designer'))
logo.setAttribute('company', 'Bankist')
console.log(logo.getAttribute('src')) //return relative URL

const link = document.querySelector('.nav__link--btn');
console.log(link.href) //absolute URL
console.log(link.getAttribute('href')) //as into HTML

//_______________Data attributes 
//we use this special kind of attr to sotre data in the user interface and thery are always stored in the dataset OBJ we need to turns form to Camel Case
console.log(logo.dataset.versionNumber)










//_______________Classes
logo.classList.add('c','r')
logo.classList.remove('c','r')
logo.classList.toggle('c')
logo.classList.contains('c')

//don't use this ways
logo.className = ''














// Event Delegation

// navLinks.forEach((el,i)=>{
//   el.addEventListener('click',(e)=>{
//   e.preventDefault()
//   // if(i === 0) section1.scrollIntoView({behavior:'smooth'})
//   // if(i === 1) section2.scrollIntoView({behavior:'smooth'})
//   // if(i === 2) section3.scrollIntoView({behavior:'smooth'})
// const id = e.currentTarget.getAttribute('href');
// console.log(id)

// document.querySelector(id).scrollIntoView({behavior:'smooth'})
// })
  
// })



//event delegation : we do it insted of attached event handeler to multiple elemnt we do event delegation which means we simply edit one big event handler func to the parent elemnt of all these elemnts and determain where the click event came form and we do matching stratgy to ignor other click that irrelavent for us

//and it usefel for application performance 
//and if we are working with elemnt that are not yet on the page on runtime

// 1. add event listener to common parent elemnt
// 2. determine what elemnt originated the event

document.querySelector('.nav__links').addEventListener("click",(e)=>{
  e.preventDefault()

  //matching stratgy
  if(e.target.classList.contains('nav__link')){
    const id=e.target.getAttribute('href');
    console.log(id)
  document.querySelector(id).scrollIntoView({behavior:'smooth'})
  }
})
















// ___________events
const h1 =document.querySelector('h1')

const mouseEnter= function(e){
  alert('you are reading Main head')

  // h1.removeEventListener('mouseenter',mouseEnter)
}

h1.addEventListener('mouseenter', mouseEnter)

setTimeout(()=>h1.removeEventListener('mouseenter',mouseEnter),3000)

// h1.onmouseenter = function(e){
//   alert('you are OLD ScHOOLE')
// }


















//______________capturing and bubbling
//rgb(255,255,255)
const randomInt =(min,max)=>Math.floor(Math.random()*(max - min +1) + min );
const randomColor=()=>`rgb(${randomInt(0,255)},${randomInt(0,255)},${randomInt(0,255)})`;
console.log(randomColor())




document.querySelector('.nav__link').addEventListener('click',function(e){
  e.preventDefault()
  this.style.backgroundColor = randomColor()
  console.log('link',e.target,e.currentTarget)
  console.log(this === e.currentTarget)

  // e.stopPropagation();
   //stop propagation : it stop event to arrives to parent elemnts and that prevent happen because event handler recive event from the target elemnt and also from the bubbling
})

document.querySelector('.nav__links').addEventListener('click',function(e){
  e.preventDefault()
  this.style.backgroundColor = randomColor()
  console.log('LINKS',e.target, e.currentTarget)
})

document.querySelector('.nav').addEventListener('click',function(e){
  e.preventDefault()
  this.style.backgroundColor = randomColor()
  console.log('Nav',e.target ,e.currentTarget)
},false)

//the e which is all the three recived is exact same event

//e.target where the elemnt originated so where the event first happend (where the click happend) not the element that handelar is attached to

//e.currenttarget the elemnt which the event handeler is attached it is exactly equal to (this keyword)







//DOM Traversing
const h1 = document.querySelector('h1');

//going downwards: child
console.log(h1.querySelectorAll('.highlight'))//only inside h1 at any deep
console.log(h1.childNodes)//note:node can be any thing(text,coment,elemnt,..) and dircet node
console.log(h1.children)//creat htmlCollection direct elemnts for h1
h1.firstElementChild.style.color= 'blue' //first child
h1.lastElementChild.style.color='blue' // last child

//going upwards : parents
console.log(h1.parentNode) //node of direct parent
console.log(h1.parentElement) //elemnt of direct parent

h1.closest('.header').style.backgroundColor = 'var(--color-tertiary-opacity)' //closest parent no matter how far
h1.closest('h1').style.backgroundColor = 'var(--color-primary)' // elemnt itself

// going sideways: sibilings
h1.previousElementSibling //elemnt
h1.nextElementSibling //elemnt

h1.previousSibling //node
h1.nextSibling;//node

//to get all the sibling
h1.parentElement.children;//htmlcollection is iteraple so we can sperade
[...h1.parentElement.children].forEach(el=>{
  if(el !== h1) el.style.transform = 'scale(.5'
})

console.log(Array.from(h1.parentElement.children)[1].style.color='yellow')




//intersection Observer API
const obsCallback = function(entries, Observer){
  entries.forEach(entry=>{
    console.log(entry)
  })
  console.log('out')};
  
  const obsOptions = {
  root:null,//the elemnt that the target interesction we set it to null to be the viewport
  threshold:[0,.2] ,//the percentage of intersection at which the callback will exectuted and also its the percentage we want the target to interset with it at the root elemnt
  }
  
  
  const Observer= new IntersectionObserver(obsCallback,obsOptions);
  Observer.observe(section1);


*/

//_______Events happen in the dom during a webpage's life cycle

document.addEventListener("DOMcontentLoaded", function (e) {
  //fired as soon as the HTML completly parsed /downloaded  and convert to DOM tree
  console.log("HTML parsed and DOM tree built!", e);
});

window.addEventListener("load", function (e) {
  //fired by window after not only HTML but also all imgs and external resourses like css
  console.log("page fully loaded", e);
});

// window.addEventListener('beforeunload',function(e){
//   //this event fired before the user is about leave a page
//   e.preventDefault();
//   e.returnValue='messge'
// })
