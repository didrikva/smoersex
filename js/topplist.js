const topplist = document.getElementById("topplist");
const sort = document.getElementById("sort");
sort.textContent = "Sortera efter: Totalt"
let toppTotal = [];
let toppPiss = [];
let toppBajs = [];
let toppSpya = [];
let all = [];
sortValue = 0;
sort.addEventListener('click', () => {
    sortValueCheck();
    createList();
});


fetch("persons.json?t=" + new Date().getTime())
      .then(response => response.json())
      .then(persons => {
        for (let i=0; i < 8; i++) {
            toppPiss.push({
                name: persons[i].name,
                antal: persons[i].piss.count
            });
            toppBajs.push({
                name: persons[i].name,
                antal: persons[i].bajs.count
            });
            toppSpya.push({
                name: persons[i].name,
                antal: persons[i].spya.count
            });
            toppTotal.push({
                name: persons[i].name,
                antal: persons[i].piss.count + persons[i].bajs.count + persons[i].spya.count
            });
        }
        all.push(toppTotal);
        all.push(toppPiss);
        all.push(toppBajs);
        all.push(toppSpya);
        
    createList()
})

function createList() {
    while (topplist.rows.length > 1) {
        topplist.deleteRow(1);
    }
    if (sortValue === 0){
        sort.textContent = "Sortera efter: Totalt"
    } else if (sortValue === 1) {
        sort.textContent = "Sortera efter: Piss"
    } else if (sortValue === 2) {
        sort.textContent = "Sortera efter: Bajs"
    } else {
        sort.textContent = "Sortera efter: Spya"
    }
    all[sortValue].sort((a, b) => b.antal - a.antal);

    for (let i = 0; i < 8; i++) {
        const tr = document.createElement("tr");
        const td1 = document.createElement("td");
        const td2 = document.createElement("td");
        td1.textContent = all[sortValue][i]["name"];
        td2.textContent = all[sortValue][i]["antal"];
        console.log(all[sortValue][i])
        tr.appendChild(td1)
        tr.appendChild(td2)
        topplist.appendChild(tr)
    }
}

function sortValueCheck() {
    if (sortValue === 3) {
        sortValue = 0;
    } else {
        sortValue += 1;
    }
}