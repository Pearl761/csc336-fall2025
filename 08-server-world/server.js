import express from "express";
import fs from "fs";

const app = express();

app.use(express.static("./public"));

app.use(express.json());

app.get("/world", async (req, res) => {
    try{
        const dataString = await fs.readFileSync("world.json", "utf-8");
        const dataObject = JSON.parse(dataString);
    }catch(err){
        console.error("Failed to read/parse world.json:", err);
        res.status(500).json({ error: "Failed to load world data" });
    }
    res.json(dataObject);
});

app.post("/update", async (req, res) => {
    const worldData = await fs.readFileSync("./world.json", "utf-8");
    const world = JSON.parse(worldData);

    const updateData = req.body;
    
    if (updateData.editType === "regionName") {
        world.regions[updateData.regionIndex].name = updateData.newName;
    } else if (updateData.editType === "townPopulation") {
        world.regions[updateData.regionIndex].towns[updateData.townIndex].population = parseInt(updateData.newPopulation);
    }

    await fs.writeFileSync("world.json", JSON.stringify(world, null, 2));

    res.json(world);
});

app.listen(3000, () => console.log("Server running on http://localhost:3000"));