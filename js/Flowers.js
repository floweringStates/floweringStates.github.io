import { search } from "./buttons.js";


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
    }

    buildFlowerCard(flower){
        let foundIn = [];
        flower.foundIn.forEach(element => {
            foundIn.push(" "+element);
        })

        return `<section class="flowerCard"> 
    <img src="${flower.imgSrc}" alt="${flower.imgAlt}" width="250" max-hight="250">
    <p class="imgCaption">${flower.imgAttribution}</p>
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