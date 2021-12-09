import Flowers from "./Flowers.js";
import States from "./States.js";
import { search, stateSelection, buildFlowerCard, moreDetails } from "./buttons.js";


let searchButton = document.getElementById("searchButton");
let stateButton = document.getElementById("otherStates");


let geolocation;
await getCoords().then(r=>{
    geolocation = makeCoords(r);
});

document.addEventListener('keydown', function(event){
    if(event.code === 13){
        console.log('Speak friend, and Enter');
        searchButton.click();
    }
})

let state = new States(geolocation);
await state.init();


let flowers = new Flowers("/js/wildflowers.json", state.state);
await flowers.init();
details();


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
        moreDetails(details[i].classList[1]);
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

