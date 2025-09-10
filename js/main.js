

const links = document.querySelectorAll(".person");
links.forEach(element => {

    element.addEventListener('click', actionScoring)
});

function actionScoring (event) {
    window.location.href = `räkna.html?id=${event.currentTarget.id}`;
}