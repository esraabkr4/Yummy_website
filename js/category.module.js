import { arraySize, getApiResponse, twRow, showLoader, hideLoader } from "./index.js";
import Meal from "./meal.module.js";
export default class Category {
    constructor() {
    }
    async getCategory() {
        debugger;
        let response = await getApiResponse(`/categories.php`);
        return response?.categories;

    }
    async displayCategory(callback) {
        debugger;
        let catArray = [];
        catArray = await this.getCategory();
        // let box = '';
        twRow.innerHTML = '';
        catArray.forEach(element => {
            let col = document.createElement('div');
            col.className = "md:w-1/4 sm:w-full p-3";
            col.innerHTML = `
                    <div class="inner hover:cursor-pointer rounded-md relative overflow-hidden group/meal_div">
                        <img src="${element.strCategoryThumb}" alt="Yummy photo" class="w-full" />
                        <div class="overlay cursor-pointer bg-white bg-opacity-55 absolute w-full bottom-0 top-full transition-[top] duration-500 flex flex-col text-center group-hover/meal_div:top-0 group-hover/meal_div:cursor-pointer">
                            <h2 class="mb-2">${element.strCategory}</h2>
                            <p class="leading-6 text-black">${element.strCategoryDescription?.split(" ", 20).join(" ")}</p>
                        </div>
                    </div>`;

            col.addEventListener("click", function () {
                showLoader();
                let meals = new Meal("", "", 'category', '/filter.php?c=' + element.strCategory);
                meals.displayMeal(function () {
                    hideLoader();
                });
            });
            //  box += col.outerHTML.toString();
            twRow.appendChild(col);
        });
        callback();
        // twRow.innerHTML = box;
    }
}