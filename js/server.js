const { exec } = require("child_process");

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


  const sshKey = process.env.ID_ED25519;
  const sshKeyPath = path.join(__dirname, "..", "id_ed25519_temp");
  fs.writeFileSync(sshKeyPath, sshKey, { mode: 0o600 });

  const gitCommand = `
    GIT_SSH_COMMAND='ssh -i ${sshKeyPath} -o StrictHostKeyChecking=no' \
    git add persons.json && git commit -m "Update from server" && git push origin main
  `;

  exec(gitCommand, { cwd: path.join(__dirname, "..") }, (err, stdout, stderr) => {
    if (err) {
      console.error("Git error:", err);
      console.error(stderr);
    } else {
      console.log("Git push successful!");
      console.log(stdout);
    }
  });


  res.json({ message: "Saved!" });
});


app.listen(PORT, () => console.log(`Server running at http://localhost:${PORT}`));
