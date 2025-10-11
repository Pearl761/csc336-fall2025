import fs from "fs";

let world;
try{
    let worldjson = fs.readFileSync("world.json", "utf-8");
    world = JSON.parse(worldjson);
}catch(error){
    console.log(error);
}

for (let i = 0; i < world.regions.length; i++){
    for (let j = 0; j < world.regions[i].towns.length; j++){
        // console.log(world.regions[i].towns[j].name, ":"); 
        console.log(`${world.regions[i].towns[j].name}:`);
        console.log(`population: ${world.regions[i].towns[j].population}`);
    }
}

