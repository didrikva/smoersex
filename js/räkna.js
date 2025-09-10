const params = new URLSearchParams(window.location.search);
const id = params.get("id");
const hej = document.getElementById("hälsning");
const stat = document.getElementById("stats");
fetch("persons.json?t=" + new Date().getTime())
      .then(response => response.json())
      .then(persons => {
          for (let i=0; i < 8; i++) {
            if (persons[i].id == id) {
                counter(persons[i]);
            }
          }
      })

function counter (person) {
        
    const piss = document.getElementById("piss");
    const bajs = document.getElementById("bajs");
    const spya = document.getElementById("spya");
    hej.textContent = "Välkommen " + person.name + " vänligen välj kroppsvätska:"
    
    piss.addEventListener('click', () => formAction("piss", person.id))
    bajs.addEventListener('click', () => formAction("bajs", person.id))
    spya.addEventListener('click', () => formAction("spya", person.id))
    stat.addEventListener('click', () => statWindow(person.id))
}

function formAction (action, id) {
    window.location.href = `form.html?action=${action}&id=${id}`;
}

function statWindow (id) {
    window.location.href = `stat.html?id=${id}`;
}
