import fs from "fs";

let world;
try{
    let worldjson = fs.readFileSync("world.json", "utf8");
    world = JSON.parse(worldjson);
}catch(error){
    console.log(error);
}

let n = 0
for (let i = 0; i < world.regions.length; i++){
    for (let j = 0; j < world.regions[i].towns.length; j++){
        n++;
        console.log(`Town${n}: ${world.regions[i].towns[j].name}`);
        console.log(`Population: ${world.regions[i].towns[j].population}`);
    }
}

