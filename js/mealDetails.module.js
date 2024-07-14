import { getApiResponse, twRow } from "./index.js";

export default class details {
    constructor(idMeal) {
        this.idMeal = idMeal;
    }
    async getDetails() {
        let Recipes = [];
        let response = await getApiResponse(`/lookup.php?i=${this.idMeal}`);
        let mealDetails = await response?.meals[0]
        for (let i = 0; i < 20; i++) {
            let strMeasure = "strMeasure" + (i + 1);
            let strIngredient = "strIngredient" + (i + 1);
            if (mealDetails[strIngredient]) {
                Recipes.push(mealDetails[strMeasure] + " " + mealDetails[strIngredient]);
            }
        }
        mealDetails["Recipes"] = Recipes;
        return mealDetails;
    }
    async displayDetails(callback) {
        debugger;
        let details = await this.getDetails();
        console.log("deatails", details);
        let box = `
        <div class="md:w-1/3 sm:w-full h-screen">
                    <figure class="p-1">
                        <img class="w-full rounded-md" alt="meal photo" src="${details.strMealThumb}"/>
                        <figcaption class="text-white"><h1>${details.strMeal}</h1></figcaption>
                      </figure>
                </div>
                <div class="md:w-2/3 sm:w-full h-screen p-5">
                    <div class="content flex flex-col justify-between text-white">
                        <h1 class="mb-5">Instructions</h1>
                        <p class="leading-7 mb-8">${details.strInstructions}</p>
                    <ul>
                        <li class="mb-4"><span class="font-bold text-2xl">Area :</span> ${details.strArea}</li>
                        <li class="mb-5"><span class="font-bold text-2xl">Category :</span> ${details.strCategory}</li>
                        <li class="mb-5 gap-5 flex flex-wrap"><span class="font-bold text-2xl">Recipes :</span>`
        details.Recipes.forEach(element => {
            box += `<span class=" rounded-md bg-green-50 text-green-700 px-2 py-1">${element}</span>`
        });

        box += `</li><li class="mb-10"><span class="font-bold mr-2 text-2xl">Tags :</span>${details.strTags == null ? "" : `<span class=" rounded-md bg-pink-50 text-pink-700 px-2 py-1">${details.strTags}</span>`}</li>
                   <li class="mb-5">
                        <a type="button" class="font-bold text-white bg-green-700 hover:bg-green-800 focus:ring-4 focus:ring-green-900 rounded-lg px-5 py-2.5 me-2 mb-2" target=”_blank” href="${details.strSource}">Source</a>
                        <a type="button" class="font-bold text-white bg-red-700 hover:bg-red-800 focus:ring-4 focus:ring-red-900 rounded-lg px-5 py-2.5 me-2 mb-2" target=”_blank” href="${details.strYoutube}">Youtube</a>
                    </li>
                    </ul>
                    </div>
                </div>`
        twRow.innerHTML = box;
        callback();
    }
}