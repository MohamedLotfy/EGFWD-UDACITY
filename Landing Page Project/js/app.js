// create a data structure to store sections of content on the page
const sections = Array.from(document.querySelectorAll('section'));

// variable to store the active link i.e. the link that was clicked and hence has the active class
let currentSection, isCodedScrollEvent = false;

// build the navigation menu starting off with an empty un-ordered list that's available in the html document

// select the navigation list element
const navList = document.querySelector('#navbar__list'); // selecting based off of an id

// create the list's elements i.e. navigation links corresponding to the sections we have (we'll create as many nav links as the number of
// sections we have on the page)

// build the navigation list's html string using the sections related data provided via relevant attributes such as the id & data attributes
const navListHTML = sections
    .map(section => {
        return `
        <li>
            <a href="#${section.id}" class="menu__link">${section.dataset.nav}</a>
        </li>
    `;
    })
    .join('');

// create a document fragment (light weight DOM tree) to work with in js ahead of dumping it into the DOM that's displayed on the page 
const navListFragment = document.createRange().createContextualFragment(navListHTML);

function applyClasses(array, element, classToApply) {
    array.forEach(item => item.classList.remove(`${classToApply}`));
    element.classList.add(`${classToApply}`);
}

// events handlers
// handling clicks on navigation links
function handleLinkClick(event) {
    // preventing the default navigation behavior of a link 
    event.preventDefault();
    applyClasses(links, event.target, 'active');
    isCodedScrollEvent = true;
    // updating the currentSection variable by setting its value to the section that the link points to
    currentSection = sections.find(section => event.target.href.includes(section.id));
    // grabbing the section associated with the link that got clicked and scrolling it into view 
    currentSection.scrollIntoView({ behavior: 'smooth' });
}

function isSectionInView(section, idx, arr, lowerBound = 0, upperBound = window.innerHeight / 2) {
    const fromTop = section.getBoundingClientRect().top;
    return (fromTop >= lowerBound && fromTop <= upperBound);
}

// handling scrolling through the document 
function handleScroll() {
    const sectionInView = sections.find(isSectionInView);
    if (sectionInView) {
        if (isCodedScrollEvent) {
            if (sectionInView === currentSection && Math.floor(sectionInView.getBoundingClientRect().top) === 0) {
                applyClasses(sections, sectionInView, 'highlight');
                isCodedScrollEvent = false;
            }
        } else {
            applyClasses(links, links.find(link => link.href.includes(`${sectionInView.id}`)), 'active');
            applyClasses(sections, sectionInView, 'highlight');
        }
    } else if (window.scrollY === 0) {
        sections[0].classList.remove('highlight');
        links[0].classList.remove('active');
    }
}

// populate the navList element with the constructed DOM nodes depicted via the created document fragment
navList.appendChild(navListFragment);

const links = Array.from(navList.querySelectorAll('a'));

// listening for a click event on the navList and leveraging event delegation to handle clicks individually on any of its nested links 
navList.addEventListener('click', handleLinkClick);
// listening for a scroll event on the window
window.addEventListener('scroll', handleScroll);