import { arraySize, getApiResponse, hideLoader, showLoader, twRow } from "./index.js";
import Meal from "./meal.module.js";
export default class Area {
    constructor() {
    }
    async getArea() {
        debugger;
        let response = await getApiResponse(`/list.php?a=list`);
        return response?.meals;

    }
    async displayArea(callback) {
        debugger;
        let areaArray = [];
        areaArray = await this.getArea();
        // let box = '';
        twRow.innerHTML = '';
        areaArray.forEach(element => {
            let col = document.createElement('div');
            col.className = "md:w-1/4 sm:w-full text-center p-3 hover:cursor-pointer";
            col.innerHTML = `
                        <div class="p-5">
                        <i class="fa-solid fa-house-laptop fa-5x text-white"></i>
                        <h1 class="text-white font-bold">${element.strArea}</h1>
                      </div>`
                ;

            col.addEventListener("click", function () {
                showLoader();
                let meals = new Meal("", "", 'area', '/filter.php?a=' + element.strArea);
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