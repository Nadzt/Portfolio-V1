//////////////////////////////////////// FLAG SVG ANIMATION ////////////////////////////////////////

// This could be done with an Array and looping through it, but i was experimenting and i ended up liking the
// end result, i SHOULD re-write this later on, but i want to continue with my portfolio first
const flagSvg1 = document.getElementsByClassName("aboutme__svg--1");
const flagSvg2 = document.getElementsByClassName("aboutme__svg--2");
const flagSvg3 = document.getElementsByClassName("aboutme__svg--3");
const flagSvg4 = document.getElementsByClassName("aboutme__svg--4");
const flagText = document.getElementById("aboutme__flag");

// Every flag component has a width of 240px and height of 50px, meaning the flag is 150x240 with 3 stripes.
// The first element should be offset-y by it's height plus 50% and X by 120, and so on, so it centers on the mouse,
// the disjointment of the elements is just the transition property in the CSS being different timing for each of them.
flagText.addEventListener("mousemove", (event) => {
    flagSvg1[0].style.top = (event.clientY - 75)+"px";
    flagSvg1[0].style.left = (event.clientX - 120)+"px";
    flagSvg2[0].style.top = (event.clientY - 25)+"px";
    flagSvg2[0].style.left = (event.clientX - 120)+"px";
    flagSvg3[0].style.top = (event.clientY - 25)+"px";
    flagSvg3[0].style.left = (event.clientX - 120)+"px";
    flagSvg4[0].style.top = (event.clientY + 25)+"px";
    flagSvg4[0].style.left = (event.clientX - 120)+"px";
});

// simple style manipulation to show the SVGs
flagText.addEventListener("mouseenter", (event) => {
    flagSvg1[0].style.opacity = 1;
    flagSvg2[0].style.opacity = 1;
    flagSvg3[0].style.opacity = 1;
    flagSvg4[0].style.opacity = 1;
});

flagText.addEventListener("mouseleave", (event) => {
    flagSvg1[0].style.opacity = 0;
    flagSvg2[0].style.opacity = 0;
    flagSvg3[0].style.opacity = 0;
    flagSvg4[0].style.opacity = 0;
});


//////////////////////////////////////// SHOW ELEMENT WHEN IN VIEWPORT ////////////////////////////////////////

// Know if the selected element is on the viewport. In this case the H3 of the Div, becose you need to see the
// whole element to return true
const showTrigger = document.getElementsByClassName("scroll__trigger");
const showElements = document.getElementsByClassName("scroll__enter");

function isInViewport(element) {
    const rect = element.getBoundingClientRect();
    return (
        rect.top >= 0 &&
        rect.left >= 0 &&
        rect.bottom <= (window.innerHeight || document.documentElement.clientHeight) &&
        rect.right <= (window.innerWidth || document.documentElement.clientWidth)
    );
}

// this is a throttle to the scoll event on the window, so it doesnt spam x20 responses for every scroll
window.addEventListener('scroll', throttle(callback, 100));

function throttle(fn, wait) {
    var time = Date.now();
    return function() {
        if ((time + wait - Date.now()) < 0) {
            fn();
            time = Date.now();
        }
    }
}

// adds the class to show the item 
function callback() {
    for (var i=0; i<showElements.length; i++) {
        if(isInViewport(showTrigger[i])) {
            showElements[i].classList.add("scroll__show")
        }
    }
}

//////////////////////////////////////// activate animations ////////////////////////////////////////
const activateElements = document.getElementsByClassName("activate");

for (var i=0; i < activateElements.length; i++) {
    activateElements[i].addEventListener("mouseenter", (event)=> {
        activateElements[i-1].classList.add("animation-on")
    })
};


//////////////////////////////////////// TYPEWRITER ////////////////////////////////////////

function typewriter(element, rotatingText, period) {
    this.element = element;
    this.rotatingText = rotatingText;
    this.loopingNumber = 0;
    this.period = parseInt(period, 10) || 2000;
    this.displayedText = '';
    this.isDeleting = false;
    this.tick();
};

typewriter.prototype.tick = function() {
    // i is the number of the Array rotatingText that will be displayed, it starts with 0 ( this.loopingNumber )
    // fullText is the whole text from the array. ej ("npm i knowledge --save-dev")
    var i = this.loopingNumber % this.rotatingText.length;
    var fullText = this.rotatingText[i];

    // If the boolean property isDeleting is false (default value above) the displayedText will start
    // adding characters to itself from the fullText
    // if isDeleting is true, the oppossite will happen and it will start substracting characters from itself
    if (this.isDeleting) {
    this.displayedText = fullText.substring(0, this.displayedText.length - 1);
    } else {
    this.displayedText = fullText.substring(0, this.displayedText.length + 1);
    }

    // simply replaces the innerHTML from the element with typewriter class
    this.element.innerHTML = '<span class="typewriter-text">'+this.displayedText+'</span>';

    // controls delta timer beetween letters, beetween 200 and 100 for writing, beetween 100 and 50 for deleting,
    // gets overwritten below by the delay period if the text is full, and with 500 ms is it's an empty string
    var that = this;
    var delta = 200 - Math.random() * 100;
    if (this.isDeleting) { delta /= 2; }

    // if it's not Deleting text AND the displayed text is the same as the fullText means the full text
    // is already showing, the isDeleting will be set to true.
    // otherwise if it's deleting and the displayed text was already deleted, it'll stop deleting and
    // add to the looping number to start the next element in the Array
    if (!this.isDeleting && this.displayedText === fullText) {
    delta = this.period;
    this.isDeleting = true;
    } else if (this.isDeleting && this.displayedText === '') {
    this.isDeleting = false;
    this.loopingNumber++;
    delta = 500;
    }

    // after the delta timer, continues with the next tick
    setTimeout(function() {
    that.tick();
    }, delta);
};

// Create Array with elements with class "typewriter
// creates variables for rotatingText(data-text in html) and delayPeriod(data-delay-period)
// and executes typewriter(element, rotatingText, delayPeriod) function
window.onload = function() {
    var elements = document.getElementsByClassName('typewriter');
    for (var i=0; i<elements.length; i++) {
        var rotatingText = elements[i].getAttribute('data-text');
        var delayPeriod = elements[i].getAttribute('data-delay-period');
        if (rotatingText) {
            new typewriter(elements[i], JSON.parse(rotatingText), delayPeriod);
        }
    };
};

//////////////////////////////////////// BTT btn ////////////////////////////////////////

//Get the button
var returnBtn = document.getElementById("RTTBtn");

// When the user scrolls down 20px from the top of the document, show the button
// window.onscroll = function() {scrollFunction()};
window.addEventListener('scroll', throttle(scrollFunction, 100));

function scrollFunction() {
  if (document.body.scrollTop > 400 || document.documentElement.scrollTop > 400) {
    returnBtn.style.display = "block";
  } else {
    returnBtn.style.display = "none";
  }
}

// When the user clicks on the button, scroll to the top of the document
function returnToTop() {
  document.body.scrollTop = 0;
  document.documentElement.scrollTop = 0;
}