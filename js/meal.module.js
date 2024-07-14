import { arraySize, getApiResponse, twRow, getDetailsById } from "./index.js";
export default class Meal {
    constructor(name = "", letter = "", flag = "", endUrl = "") {
        this.name = name;
        this.letter = letter;
        this.flag = flag;
        this.endUrl = endUrl;
    }
    async getMeal() {
        debugger;
        let endPoint = '';
        if (this.flag) {
            endPoint = this.endUrl;
        } else {
            let attr = this.letter == "" ? 's=' + this.name : 'f=' + this.letter;
            endPoint = '/search.php?' + attr;
        }
        let response = await getApiResponse(endPoint);
        return response?.meals;
        // console.log(response.filter((meal,idx) => idx < arraySize));

    }
    async displayMeal(callback) {
        debugger;
        let mealArray = [];
        mealArray = await this.getMeal().then(response => response ? response.filter((meal, idx) => idx < arraySize) : []);
        // let box = '';
        twRow.innerHTML = '';
        mealArray.forEach(element => {
            let col = document.createElement('div');
            col.className = "md:w-1/4 sm:w-full p-3";
            col.innerHTML = `
                    <div class="inner hover:cursor-pointer rounded-md relative overflow-hidden group/meal_div">
                        <img src="${element.strMealThumb}" alt="Yummy photo" class="w-full" />
                        <div
                            class="cursor-pointer bg-white bg-opacity-55 absolute w-full bottom-0 top-[130%] transition-[top] duration-500 flex items-center pl-2 group-hover/meal_div:top-0 group-hover/meal_div:cursor-pointer">
                            <h2>${element.strMeal}</h2>
                        </div>
                    </div>
            `;

            col.addEventListener("click", function () {
                getDetailsById(element.idMeal);
            });
            //  box += col.outerHTML.toString();
            twRow.appendChild(col);
        });
        callback();
        // twRow.innerHTML = box;
    }
}