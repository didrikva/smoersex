const express = require("express");
const fs = require("fs");
const bodyParser = require("body-parser");
const path = require("path");

const app = express();
const PORT = 3000;

app.use(express.json());
app.use(express.static(path.join(__dirname, "..")));

app.get("/data", (req, res) => {
  const data = JSON.parse(fs.readFileSync(path.join(__dirname, "..", "persons.json")));
  res.json(data);
});

app.post("/submit", (req, res) => {
  console.log("POST-body:", req.body);
  const { id, category, comment, rating } = req.body;
  const idNum = parseInt(id);
  const ratingNum = parseInt(rating);

  const filePath = path.join(__dirname, "..", "persons.json");
  let data = JSON.parse(fs.readFileSync(filePath));

  let person = data.find(p => p.id === idNum);

  if (!person) {
    person = {
      id: idNum,
      piss: { comment: [], rating: [], count: 0 },
      bajs: { comment: [], rating: [], count: 0 },
      spya: { comment: [], rating: [], count: 0 }
    };
    data.push(person);
  }

  if (!person[category]) {
    person[category] = { comment: [], rating: [], count: 0  };
  }

  person[category].comment.push(comment);
  person[category].rating.push(ratingNum);
  person[category].count += 1;

  fs.writeFileSync(filePath, JSON.stringify(data, null, 2));

  res.json({ message: "Saved!" });
});


app.listen(PORT, () => console.log(`Server running at http://localhost:${PORT}`));
