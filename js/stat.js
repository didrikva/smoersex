const params = new URLSearchParams(window.location.search);
const id = params.get("id");
const showPiss = document.getElementById("showPiss");
const showBajs = document.getElementById("showBajs");
const showSpya = document.getElementById("showSpya");


fetch("persons.json?t=" + new Date().getTime())
      .then(response => response.json())
      .then(persons => {
        for (let i=0; i < 8; i++) {
             if (persons[i].id == id) {
                createList(persons[i]);
            }
        }
        
})

function createList(data) {
    

    console.log(data)
    for (let i = 0; i < data.piss.count; i++) {
        const tr = document.createElement("tr");
        const td1 = document.createElement("td");
        const td2 = document.createElement("td");
        td1.textContent = data.piss.comment[i];
        td2.textContent = data.piss.rating[i] + "/10";
        tr.appendChild(td1)
        tr.appendChild(td2)
        showPiss.appendChild(tr)
    }
    for (let i = 0; i < data.bajs.count; i++) {
        const tr = document.createElement("tr");
        const td1 = document.createElement("td");
        const td2 = document.createElement("td");
        td1.textContent = data.bajs.comment[i];
        td2.textContent = data.bajs.rating[i] + "/10";
        tr.appendChild(td1)
        tr.appendChild(td2)
        showBajs.appendChild(tr)
    }
    for (let i = 0; i < data.spya.count; i++) {
        const tr = document.createElement("tr");
        const td1 = document.createElement("td");
        const td2 = document.createElement("td");
        td1.textContent = data.spya.comment[i];
        td2.textContent = data.spya.rating[i] + "/10";
        tr.appendChild(td1)
        tr.appendChild(td2)
        showSpya.appendChild(tr)
    }
}

