import { arraySize, getApiResponse, hideLoader, showLoader, twRow } from "./index.js";
import Meal from "./meal.module.js";
export default class Ingredients {
    constructor() {
    }
    async getIngredients() {
        debugger;
        let response = await getApiResponse(`/list.php?i=list`);
        return response?.meals;

    }
    async displayIngredients(callback) {
        debugger;
        let ingArray = [];
        ingArray = await this.getIngredients();
        // let box = '';
        twRow.innerHTML = '';
        ingArray.forEach(element => {
            let col = document.createElement('div');
            col.className = "md:w-1/4 sm:w-full p-3 hover:cursor-pointer mb-1";
            col.innerHTML = `
                        <div class="text-white text-center">
                        <i class="fa-solid fa-drumstick-bite fa-5x"></i>
                        <h1 class="mb-1">${element.strIngredient}</h1>
                        <p>${element.strDescription?.split(" ", 20).join(" ")}</p>
                      </div>`
                ;

            col.addEventListener("click", function () {
                showLoader();
                let meals = new Meal("", "", 'ingredients', '/filter.php?i=' + element.strIngredient);
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