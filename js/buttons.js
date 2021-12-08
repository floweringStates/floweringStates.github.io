let stateAbriviations = ["AL","AK","AZ","AR","CA","CO","CT","DE","DC","FL","GA","GU","HI","ID","IL","IN","IA","KS","KY","LA","ME","MD","MA","MI","MN","MS","MO","MT","NE","NV","NH","NJ","NM","NY","NC","ND","OH","OK","OR","PA","PR","RI","SC","SD","TN","TX","UT","VT","VI","VA","WA","WV","WI","WY"];
let stateFullName = ["ALABAMA","ALASKA","ARIZONA","ARKANSAS","CALIFORNIA","COLORADO","CONNECTICUT","DELAWARE","DISTRICT OF COLUMBIA","FLORIDA","GEORGIA","GUAM","HAWAII","IDAHO","ILLINOIS","INDIANA","IOWA","KANSAS","KENTUCKY","LOUISIANA","MAINE","MARYLAND","MASSACHUSETTS","MICHIGAN","MINNESOTA","MISSISSIPPI","MISSOURI","MONTANA","NEBRASKA","NEVADA","NEW HAMPSHIRE","NEW JERSEY","NEW MEXICO","NEW YORK","NORTH CAROLINA","NORTH DAKOTA","OHIO","OKLAHOMA","OREGON","PENNSYLVANIA","PUERTO RICO","RHODE ISLAND","SOUTH CAROLINA","SOUTH DAKOTA","TENNESSEE","TEXAS","UTAH","VERMONT","VIRGIN ISLANDS","VIRGINIA","WASHINGTON","WEST VIRGINIA","WISCONSIN","WYOMING"]


export function buildFlowerCard(flower){
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
    <button type="button" class="detailsButton ${flower.id}">More Details</button>
    </section>`
}

function checkState(state){
    return searchTermState == state;
}

function getStateAbriviation(state){
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

let searchTermState;

export async function search(searchTerm){
        let array = [];
        let isState;
        let data = await getData("/js/wildflowers.json");
        searchTerm = searchTerm.toUpperCase();
        searchTermState = searchTerm;
        data.forEach(element => {
            let commonName = element.commonName.toUpperCase();
            let scientificName = element.scientificName.toUpperCase();
            if(commonName.includes(searchTerm)||scientificName.includes(searchTerm)){
                array.push(element);
                isState = false;
            }
            else{
                
                let state = getStateAbriviation(searchTerm);
                if(state == -404){
                    console.log("State Not Found.");
                }
                else if(element.foundIn.includes(state)){
                    array.push(element);
                    isState = true;
                }
            }           
        });
        if(isState){
            let index;
            let capState;
            if(searchTerm.length < 3){
                index = stateAbriviations.findIndex(checkState);
                capState = stateFullName[index];
            }
            else{
                capState = searchTerm;
            }
            
            capState = capState.toLowerCase();
            capState = capState[0].toUpperCase()+capState.slice(1);
            document.getElementById("title").innerHTML = "Wildflowers in " + capState;
        }
        else{
            document.getElementById("title").innerHTML = "Search Results";
        }
        console.log("You searched: " + searchTerm +"!");
        return array;
}

export async function stateSelection(){
    let buttons = [];
    stateFullName.forEach(element=>{
        let state = element.slice(1);
        state.toLowerCase();
        state = element[0] + state;
        // create button
        let newButton = document.createElement('button');
        newButton.innerHTML = state;

        //bind search function (with state value) to button
        newButton.addEventListener('click', async (e) => {
            e.preventDefault();
            let flowers = await search(state);
            let flowerList = [];
            flowers.forEach(element => 
                flowerList.push( buildFlowerCard(element)));
            flowerList.forEach(element =>{
                document.getElementById("flowers").innerHTML += element + `<br>`;
            });
            document.getElementById('stateSelection').innerHTML = '';
            document.getElementById('shade').style.display = 'none';
            let details = document.getElementsByClassName("detailsButton");
            for(let i =0; details.length>i; i++){
                details[i].addEventListener('click', (e)=>{
                    e.preventDefault();
                    moreDetails(details[i].classList.item(1));
                })
            };
        });
        //add to buttons array
        buttons.push(newButton);
    })
    //display buttons
    let section = document.createElement('section');
    buttons.forEach(e=>{
        document.getElementById('stateSelection').appendChild(e);
    })
    let shade = document.getElementById('shade').style.display = "block";
    document.getElementById('flowers').innerHTML = '';

    
}

export async function moreDetails(flower){
    let display = document.getElementsByClassName('lessDetails'+flower);
    //add class moreDetails to flower card items
    //make sure to check to see if the details are already showing
    if(display[0].classList.contains("moreDetails")){
        for(let i =0; display.length>i; i++){
            display[i].classList.remove("moreDetails");
        }
    }
    else{
        for(let i =0; display.length>i; i++){
            display[i].classList.add("moreDetails");
        }
    }
    
    //change button text
    let buttonTxt = document.querySelector('.'+flower);
    if (buttonTxt.innerHTML == "More Details"){
        buttonTxt.innerHTML = "Less Details";
    }
    else{
        buttonTxt.innerHTML = "More Details";
    }
   
}
