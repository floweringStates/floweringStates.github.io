import Flowers from "./Flowers.js";
import States from "./States.js";
import { search, stateSelection, buildFlowerCard, moreDetails } from "./buttons.js";


let geolocation;
await getCoords().then(r=>{
    geolocation = makeCoords(r);
});

let state = new States(geolocation);
await state.init();


let flowers = new Flowers("/js/wildflowers.json", state.state);
await flowers.init();
details();


let searchButton = document.getElementById("searchButton");
let stateButton = document.getElementById("otherStates");

document.querySelector('#searchButton').addEventListener('click', async (e) => {
    e.preventDefault();
    let flowers = await search(document.getElementById("searchInput").value);
    let flowerList = [];
    flowers.forEach(element => 
        flowerList.push( buildFlowerCard(element)));
    document.getElementById("flowers").innerHTML = "";
    flowerList.forEach(element =>{
        document.getElementById("flowers").innerHTML += element + `<br>`;
    });
    details();
});

document.querySelector('#otherStates').addEventListener('click', async (e) => {
    e.preventDefault();
    console.log("States were clicked!");
    await stateSelection();
});

function details(){
let details = document.getElementsByClassName("detailsButton");
for(let i =0; details.length>i; i++){
    details[i].addEventListener('click', (e)=>{
        e.preventDefault();
        moreDetails(details[i].id);
    })
};
}


function getCoords(){
    return new Promise(function(resolve, reject){
        navigator.geolocation.getCurrentPosition(resolve,reject);
    })
}

function makeCoords(r){
    const position = r;
    let coords = {lat:position.coords.latitude, long:position.coords.longitude};
    console.log("I was Called!");
    return coords;
}

