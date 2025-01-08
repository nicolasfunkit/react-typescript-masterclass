const express = require("express");
const cors = require("cors");
const bodyParser = require("body-parser");
const lowdb = require("lowdb");
const FileSync = require("lowdb/adapters/FileSync");
const { nanoid } = require("nanoid");

// Configuration de la base de données
const db = lowdb(new FileSync("db.json"));

db.defaults({
  projects: [
    {
      id: nanoid(),
      name: "Test Project",
      image: "https://picsum.photos/200/300",
      strokes: [], // Ajout pour éviter des problèmes avec "strokes"
    },
  ],
}).write();

const app = express();

app.use(cors());
app.use(bodyParser.json());

const port = 4000;

app.get("/projects", (req, res) => {
  const data = db.get("projects").value();
  const projects = data.map((project) => ({
    name: project.name,
    image: project.image,
    id: project.id,
  }));
  return res.json(projects);
});

// Route pour ajouter un nouveau projet
app.post("/projects/new", (req, res) => {
  db.get("projects")
    .push({ strokes: [], ...req.body, id: nanoid() }) // Ajout de "strokes" par défaut
    .write();
  res.json({ success: true });
});

// Route pour récupérer un projet spécifique par ID
app.get("/projects/:projectId", (req, res) => {
  const { projectId } = req.params;
  const project = db.get("projects").find({ id: projectId }).value();

  if (project) {
    return res.json({
      success: true,
      project,
    });
  } else {
    return res.status(404).json({
      success: false,
      message: "Project not found",
    });
  }
});

// Démarrage du serveur
app.listen(port, () =>
  console.log(`Backend running on http://localhost:${port}!`)
);
