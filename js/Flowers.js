import { search } from "./buttons.js";


let stateAbriviations = ["AL","AK","AZ","AR","CA","CO","CT","DE","DC","FL","GA","GU","HI","ID","IL","IN","IA","KS","KY","LA","ME","MD","MA","MI","MN","MS","MO","MT","NE","NV","NH","NJ","NM","NY","NC","ND","OH","OK","OR","PA","PR","RI","SC","SD","TN","TX","UT","VT","VI","VA","WA","WV","WI","WY"];
let stateFullName = ["ALABAMA","ALASKA","ARIZONA","ARKANSAS","CALIFORNIA","COLORADO","CONNECTICUT","DELAWARE","DISTRICT OF COLUMBIA","FLORIDA","GEORGIA","GUAM","HAWAII","IDAHO","ILLINOIS","INDIANA","IOWA","KANSAS","KENTUCKY","LOUISIANA","MAINE","MARYLAND","MASSACHUSETTS","MICHIGAN","MINNESOTA","MISSISSIPPI","MISSOURI","MONTANA","NEBRASKA","NEVADA","NEW HAMPSHIRE","NEW JERSEY","NEW MEXICO","NEW YORK","NORTH CAROLINA","NORTH DAKOTA","OHIO","OKLAHOMA","OREGON","PENNSYLVANIA","PUERTO RICO","RHODE ISLAND","SOUTH CAROLINA","SOUTH DAKOTA","TENNESSEE","TEXAS","UTAH","VERMONT","VIRGIN ISLANDS","VIRGINIA","WASHINGTON","WEST VIRGINIA","WISCONSIN","WYOMING"]


async function getData(url){
    try{
    const response = await fetch(url);
    if (response.ok){
        return await response.json();
    }else{
        const error = await response.text();
        throw new Error (error);
    }
    }catch (err){
        console.log(err);
    }
}

/*function checkState(state){
    return searchTermCAPS == state;
}*/

/*function getStateAbriviation(state){
    if(stateAbriviations.includes(state)){
        return state;
    }
    else if(stateFullName.includes(state)){
        let index = stateFullName.findIndex(checkState);
        return stateAbriviations[index];
    }
    else{
        return -404;
    }

}

let searchTermCAPS;*/

export default class Flowers{
    constructor(url, searchTerm){
        this.data;
        this.flowers = [];
        this.url = url;
        this.searchTerm = searchTerm;
    }
    async init(){
        this.data = await getData(this.url); 
        this.flowers = await this.getFlowers(this.searchTerm);
        let cardsList = [];
        this.flowers.forEach(element =>{
        cardsList.push(this.buildFlowerCard(element));
        document.getElementById("flowers").innerHTML = "";
        cardsList.forEach(element =>{
            document.getElementById("flowers").innerHTML += element + `<br>`;
        });
        })
    }
    getFlowers(searchTerm){

        return search(searchTerm);
        /*let array = [];
        let isState;
        searchTerm = searchTerm.toLowerCase();
        searchTerm = searchTerm[0].toUpperCase()+searchTerm.slice(1);
        searchTermCAPS = searchTerm.toUpperCase();
        this.data.forEach(element => {
            if(element.commonName.includes(searchTerm)||element.scientificName.includes(searchTerm)){
                array.push(element);
                isState = false;
            }
            else{
                
                let state = getStateAbriviation(searchTermCAPS);
                if(state == -404){
                    console.log("Hello Susan, have you seen the missile launcher? Neither have I.");
                }
                else if(element.foundIn.includes(state)){
                    array.push(element);
                    isState = true;
                }
            }           
        });
        if(isState){
            let index = stateAbriviations.findIndex(checkState);
            let capState = stateFullName[index];
            capState = capState.toLowerCase();
            capState = capState[0].toUpperCase()+capState.slice(1);
            document.getElementById("title").innerHTML = "Wildflowers in " + capState;
        }
        else{
            document.getElementById("title").innerHTML = "Search Results";
        }


        return array;*/
    }
    buildFlowerCard(flower){
        let foundIn = [];
        flower.foundIn.forEach(element => {
            foundIn.push(" "+element);
        })

        return `<section class="flowerCard"> 
    <img src="${flower.imgSrc}" alt="${flower.imgAlt}" width="250" max-hight="250">
    <section class="grid">
    <p class="baseText show">Common Name:</p>
    <p class="baseText show">${flower.commonName}</p>
    <div class="line"></div>
    <p class="baseText show">Scientific Name:</p>
    <p class="baseText show">${flower.scientificName}</p>
    <div class="line"></div>
    <p class="baseText lessDetails${flower.id} dontShow">Found In:</p>
    <p class="baseText lessDetails${flower.id} dontShow">${foundIn}</p>
    <div class="line lessDetails${flower.id} dontShow"></div>
    <p class="baseText lessDetails${flower.id} dontShow">Habitat:</p>
    <p class="baseText lessDetails${flower.id} dontShow">${flower.habitat}</p>
    <div class="line lessDetails${flower.id} dontShow"></div>
    <p class="baseText lessDetails${flower.id} dontShow">Family:</p>
    <p class="baseText lessDetails${flower.id} dontShow">${flower.family}</p>
    <div class="line lessDetails${flower.id} dontShow"></div>
    </section>
    <button type="button" class="detailsButton ${flower.id}" id="detailButton${flower.id}">More Details</button>
    </section>`
    }

    
}