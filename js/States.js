

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

export default class States{
    constructor(coords){
        this.coords = coords;
        this.state = "";
    }
    async init(){
        if (this.coords == "Geolocation not supported by this browser."||typeof this.coords == "undefined"){
            console.log("Error with Geolocation: " + this.coords)
        }
        let stateLocations = await getData("/js/statecoords.json");
        this.findStateLocation(stateLocations, this.coords);  
    }
    findStateLocation(array, coords){
        let stateFound = false;
        array.forEach(element => {
            if(element.coords.top.lat>coords.lat && coords.lat>element.coords.bottom.lat){
                if(element.coords.left.long<coords.long && coords.long<element.coords.right.long){
                    this.state = element.stateAbriv;
                    stateFound = true;
                }
            }
            
        });
        if(!stateFound){
            console.log("there's a problem in States.js");
        }
    }
}