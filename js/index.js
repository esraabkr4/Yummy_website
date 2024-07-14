"use strict";
import Area from "./area.module.js";
import Category from "./category.module.js";
import { Contact } from "./contact.module.js";
import Ingredients from "./ingredients.module.js";
import Meal from "./meal.module.js";
import details from "./mealDetails.module.js";

// =================> html elements
const navLinks = document.querySelector('.nav-links'),
    asideButton = document.querySelector('.aside-button'),
    aside = document.querySelector('aside'),
    loadingIcon = document.querySelector('.loading-icon'),
    loading = document.querySelector('.loading'),
    twRow = document.querySelector('.tw-row'),
    Links = document.querySelectorAll('.links li'),
    twContainer = document.querySelector('.tw-container'),
    search = document.getElementById('search'),
    categories = document.getElementById('categories'),
    areas = document.getElementById('area'),
    ingredients = document.getElementById('ingredients'),
    contact = document.getElementById('contact'),
    contactForm = document.getElementById('contactForm'),
    inputs = document.querySelectorAll('#contactForm input');
// =================> variables
let navLinks_width = navLinks.getBoundingClientRect().width,
    left_val = - navLinks_width + "px",
    animationClass = 'animate__animated';
const baseUrl = 'https://www.themealdb.com/api/json/v1/1';
const arraySize = 20;

// ==================> exports <=======================
export { arraySize, twRow };

// ============> ready function (self invoked)
(function () {
    ////////////////close aside nav
    aside.style.left = left_val;
    /////////////////view home meals
    viewHomeMeals();
})();

// ============> Events
//open and close aside nav
asideButton.addEventListener("click", function () {
    if (aside.style['left'] === '0px') {
        closeAslideNav();

    } else {
        openAslideNav();
    };
});

search.addEventListener('click', function () {
    closeAslideNav();
    createSearchForm();
});

categories.addEventListener('click', function () {
    closeAslideNav();
    showLoader();
    removeSearchForm();
    const category = new Category();
    category.displayCategory(function () {
        hideLoader();
    });
});
ingredients.addEventListener('click', function () {
    closeAslideNav();
    showLoader();
    removeSearchForm();
    const ingr = new Ingredients();
    ingr.displayIngredients(function () {
        hideLoader();
    });
});
areas.addEventListener('click', function () {
    closeAslideNav();
    showLoader();
    removeSearchForm();
    const area = new Area();
    area.displayArea(function () {
        hideLoader();
    });
});
contact.addEventListener('click', function () {
    closeAslideNav();
    removeSearchForm();
    const contact = new Contact();
    contact.showContactForm();
});

// =====================functions
/////////////open slide nav
function openAslideNav() {
    // if (aside.children[0].classList.contains('animate__slideOutLeft')) { aside.children[0].classList.remove('animate__slideOutLeft') }
    // aside.children[0].classList.add(animationClass, 'animate__slideInLeft', 'animate__delay-5');
    // setTimeout(() => {
    // }, 500);
    // aside.animate({ left: 0 }, 500);
    aside.style.left = '0px';
    debugger;
    Links.forEach((element, ind) => {
        // if (element.classList.contains('animate__backOutDown')) {
        //     element.classList.replace('animate__backOutDown', 'animate__backInUp');
        // } else {
        //     element.classList.add(animationClass, 'animate__backInUp', 'animate__delay-' + ind + '5');

        // }
        setTimeout(() => {
            element.className = "cursor-pointer " + animationClass + " animate__backInUp animate__delay-" + ind;
        }, ind * 50);
    });

    asideButton.classList.add("fa-xmark");

}
/////////////close slide nav
function closeAslideNav() {
    console.log(aside.children[0]);
    [...Links].reverse().forEach((element, ind) => {
        // if (element.classList.contains('animate__backInUp')) {
        //     element.classList.replace('animate__backInUp', 'animate__backOutDown');
        // } else {
        //     element.classList.add(animationClass, 'animate__backOutDown');

        // }
        setTimeout(() => {
            element.className = "cursor-pointer " + animationClass + " animate__backOutDown animate__delay-" + ind;
        }, ind * 50);
    });
    // if (aside.children[0].classList.contains('animate__slideInLeft')) { aside.children[0].classList.remove('animate__slideInLeft') }
    // aside.children[0].classList.add(animationClass, 'animate__slideOutLeft', 'animate__delay-5');

    // aside.classList.replace("left-0",`left-[${left_val}]`);    ////not worked
    // setTimeout(() => { aside.style.left = left_val }, 500);
    // setTimeout(() => {
    // }, 500);
    // aside.animate({ left: left_val }, 500);
    // this.classList.contains("fa-xmark") && this.classList.remove("fa-xmark");//if it has the class remove it
    setTimeout(() => {
        aside.style.left = left_val;
        asideButton.classList.contains("fa-xmark") && asideButton.classList.remove("fa-xmark");
    }, 400);

}
/////////////hide loading div
export function hideLoader() {
    loadingIcon.classList.add(animationClass, 'animate__fadeOut', 'animate__delay-1'),
        loading.classList.add(animationClass, 'animate__fadeOutUp', 'animate__delay-2'),
        loading.classList.replace('flex', 'hidden', 'animate__delay-3'),
        document.body.classList.replace("overflow-hidden", "overflow-visible", 'animate__delay-3');

}
/////////////show loading div
export function showLoader() {
    loadingIcon.classList.remove(animationClass, 'animate__fadeOut'),
        loading.classList.remove(animationClass, 'animate__fadeOut'),
        document.body.classList.replace("overflow-visible", "overflow-hidden"),
        loading.classList.replace('hidden', 'flex');

}
/////////fetch response from api given endpoint url
export async function getApiResponse(endPointUrl) {
    debugger;
    let url = baseUrl + endPointUrl;
    let api = await fetch(url);
    let response = await api.json();
    return response;
}
//////////view 20 meals when page load
function viewHomeMeals(name = "", letter = "") {
    showLoader();
    const meals = new Meal(name, letter);
    meals.displayMeal(function () {
        hideLoader();
    });

}
/////////////remove created searchForm when displaying other views
function removeSearchForm() {
    if (document.contains(document.getElementById("searchForm"))) {
        document.getElementById("searchForm").remove();
    }
}
///////////get meal details using id
export function getDetailsById(idMeal) {
    debugger;
    showLoader();
    removeSearchForm();
    let m_details = new details(idMeal);
    m_details.displayDetails(function () {
        hideLoader();
    });
}
////////create aform to search meals by name or letter
function createSearchForm() {
    let appended = false;
    twRow.innerHTML = "";
    if (!appended) {
        let form = document.createElement('form'),
            nameInput = document.createElement('input'),
            letterInput = document.createElement('input');
        form.className = "w-5/6 m-auto flex flex-wrap justify-between p-10";
        form.id = "searchForm";

        nameInput.setAttribute('class', 'cursor-text shadow-md sm:w-full sm:mb-5 md:mr-4 md:flex-grow bg-transparent outline outline-1 outline-white rounded py-2 px-3 text-white focus:outline-cyan-600 focus:shadow-cyan-600 focus:cursor-text');
        nameInput.setAttribute('id', 'searchName');
        nameInput.setAttribute('type', 'text');
        nameInput.setAttribute('placeholder', 'Search By Name');

        letterInput.setAttribute('class', 'cursor-text shadow-md  sm:w-full md:mr-4 md:flex-grow bg-transparent outline outline-1 outline-white rounded py-2 px-3 text-white  focus:cursor-text focus:outline-cyan-600 focus:shadow-cyan-600');
        letterInput.setAttribute('id', 'searchLetter');
        letterInput.setAttribute('type', 'text');
        letterInput.setAttribute('placeholder', 'Search By First Letter');
        letterInput.setAttribute('data-twe-input-showcounter', 'true');
        letterInput.setAttribute('maxlength', '1');

        nameInput.addEventListener('input', () => {
            nameInput.value ? viewHomeMeals(nameInput.value) : viewHomeMeals(nameInput.value, letterInput.value);
        });
        letterInput.addEventListener('input', function () {
            viewHomeMeals(nameInput.value, letterInput.value);

        });
        form.append(nameInput);
        form.append(letterInput);
        twContainer.prepend(form);
        appended = true;
    }

}