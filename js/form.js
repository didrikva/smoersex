const params = new URLSearchParams(window.location.search);
const id = parseInt(params.get("id"));
const action = params.get("action");
console.log(id);
console.log(action);
const form = document.getElementById("ratingForm");
form.addEventListener("submit", function(event) {
  event.preventDefault();

  const rating = document.querySelector('input[name="rating"]:checked').value;
  const comment = document.getElementById("comment").value;
  
  fetch("/submit", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ id, category: action, comment, rating })
  })
  .then(res => res.json())
  .then(data => {
    console.log("Svar från servern:", data);
  });
  window.location.href = `index.html`;
});
