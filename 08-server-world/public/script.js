let world = null;
let currentRegionIndex = 0;

async function loadWorld() {
    const res = await fetch("/world");
    world = await res.json();
    fillSelect(world.regions);
    displayWorld();
}

loadWorld();

let eventsBound = false;
function fillSelect(regions) {
    const sel = document.querySelector('#regionSelect');
    sel.innerHTML = regions.map((r, i) => 
        `<option value="${i}">${r.name} (${r.climate})</option>`
    ).join('');
    if (!eventsBound) {
        sel.addEventListener('change', e => {
            currentRegionIndex = Number(e.target.value);
            displayWorld();
        });
        bindEditForm();
        bindEditTypeToggle(); 
        eventsBound = true;
    } else {
        syncEditControls();
    }
}

function bindEditTypeToggle() {
    const typeSel = document.querySelector('#editType');
    const show = cls => document.querySelectorAll('.' + cls).forEach(n => n.style.display = '');
    const hide = cls => document.querySelectorAll('.' + cls).forEach(n => n.style.display = 'none');

    const apply = () => {
        const t = typeSel.value;
        hide('edit-regionName'); 
        hide('edit-townPopulation');
        hide('edit-addTown'); 
        if (t === 'regionName') show('edit-regionName');
        if (t === 'townPopulation') show('edit-townPopulation');
        if (t === 'addTown') show('edit-addTown');
    };

    typeSel.addEventListener('change', apply);
    apply(); 
}

function displayWorld() {
    const region = world.regions[currentRegionIndex];
    const worldDiv = document.getElementById("worldDiv");
    
    let html = `<h2>${region.name}</h2>`;
    html += `<p>Climate: ${region.climate}</p>`;
    html += `<p>Towns: ${region.towns.length}</p>`;
    html += `<p>Total Population: ${totalPopulation(region)}</p>`;
    html += `<h3>Towns:</h3><ul>`;
    
    region.towns.forEach(town => {
        html += `<li>${town.name} (population: ${town.population})`;
        if (town.notable_people && town.notable_people.length > 0) {
            html += `<ul>`;
            town.notable_people.forEach(person => {
                html += `<li>${person.name} - ${person.role}</li>`;
            });
            html += `</ul>`;
        }
        html += `</li>`;
    });
    
    html += `</ul>`;
    worldDiv.innerHTML = html;
    syncEditControls();
}

function totalPopulation(region) {
    return region.towns.reduce((sum, t) => sum + (Number(t.population) || 0), 0);
}

function bindEditForm() {
    const form = document.querySelector('#editForm');

    form.addEventListener('submit', async (e) => {
        e.preventDefault();

        let formData = new FormData(form);
        let data = Object.fromEntries(formData.entries());
        
        let updateData = {
            editType: data.editType,
            regionIndex: currentRegionIndex
        };
        
        if (data.editType === "regionName") {
            if (!data.newName.trim()) {
                alert("Please enter a new region name");
                return;
            }
            updateData.newName = data.newName;
        } else if (data.editType === "townPopulation") {
            if (!data.newPopulation) {
                alert("Please enter a new population");
                return;
            }
            updateData.townIndex = parseInt(data.townIndex);
            updateData.newPopulation = parseInt(data.newPopulation);
        }

        const res = await fetch("/update", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(updateData)
        });

        const updatedWorld = await res.json();
        loadWorld();
        alert("Update successful!");
    });
}
function syncEditControls() {
    const region = world.regions[currentRegionIndex];
    const nameInput = document.querySelector('#newName');
    if (nameInput) nameInput.value = region.name;

    const townSel = document.querySelector('#townSelect');
    if (townSel) {
        townSel.innerHTML = region.towns
            .map((town, i) => `<option value="${i}">${town.name} (pop ${town.population})</option>`)
            .join('');
    }
}