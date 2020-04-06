/**
 * 
 * Manipulating the DOM exercise.
 * Exercise programmatically builds navigation,
 * scrolls to anchors from navigation,
 * and highlights section in viewport upon scrolling.
 * 
 * Dependencies: None
 * 
 * JS Version: ES2015/ES6
 * 
 * JS Standard: ESlint
 * 
*/

/**
 * Define Global Variables
 * 
*/



const navList = document.querySelector('#navbar__list');
const sections = document.querySelectorAll('section'); //Get the list of sections

/**
 * End Global Variables
 * Start Helper Functions
 * 
*/

// check which element is active


/*Using getBoundingClientRect method to check if an element is in the viewport,
found information in stack overflow*/

function isInViewport(element) {
    var rect = element.getBoundingClientRect();
    var html = document.documentElement;
    return (
      rect.top >= 0 &&
      rect.left >= 0 &&
      rect.bottom <= (window.innerHeight || html.clientHeight) &&
      rect.right <= (window.innerWidth || html.clientWidth)
    );
  }



/**
 * End Helper Functions
 * Begin Main Functions
 * 
*/

// build the nav

const populateNavbar = () => {
    const fragment = document.createDocumentFragment(); //creates fragment
    sections.forEach(section => { //loop
      const listItem = document.createElement('li'); 
      listItem.innerHTML = `<a href="#${section.getAttribute('id')}" class="menu__link">${section.dataset.nav}</a>` //creates the html code
      fragment.appendChild(listItem);
    })
    navList.appendChild(fragment);
  };


// Add class 'active' to section when near top of viewport


function setActiveClass(sections) {
        for (const section of sections) {
            const activeLink = document.querySelector(`a[href="#${section.getAttribute("id")}"]`);
            if (isInViewport(section)) { //using the helper function - if true add class 'active'
                section.classList.add("active"); //add class active
                activeLink.classList.add("active_link"); //add class active link to be able to highlight it - Added style to Css file
            } else {
                section.classList.remove("active"); //if false remove it
                activeLink.classList.remove("active_link"); //remove class from link 
            };
        };
};

// Scroll to anchor ID using scrollTO event

//Found information in https://allthingssmitty.com/2019/03/25/using-closest-to-return-the-correct-dom-element/

function scrollToAnchor() {
	navList.addEventListener('click', event => {
		event.preventDefault();
		document.querySelector(event.toElement.hash).scrollIntoView({ //  / Get the clicked and scroll to  element
            behavior: 'smooth'
        });
	});
}

/**
 * End Main Functions
 * Begin Events
 * 
*/

// Build menu 

populateNavbar();

// Scroll to section on link click

scrollToAnchor();

// Set sections as active

window.addEventListener('scroll', function() {
      setActiveClass(sections);
    });


