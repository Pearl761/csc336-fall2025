import { log } from "console";
import fs from "fs";

let world;
try{
    let worldjson = fs.readFileSync("world.json", "utf-8");
    world = JSON.parse(worldjson);
}catch(error){
    console.log(error);
}

console.log(world);

