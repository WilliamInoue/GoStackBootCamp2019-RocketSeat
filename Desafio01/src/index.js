const express = require('express');
const server = express();
server.use(express.json());

const projects = [];

function checkIfProjectExists(req, res, next) {
  const { id } = req.params;
  const project = projects.find(p => p.id == id);

  if (!project) {
    return res.status(400).json({ error: 'Project not found' });
  }

  return next();
}

function checkIfProjectIdExists(req, res, next) {
  const { id } = req.body;
  const project = projects.find(p => p.id == id);

  if (project) {
    return res.status(400).json({ error: 'ID already taken, choose another ID' });
  }

  return next();
}

function checkIfIdIsNotNull(req, res, next) {
  const { id } = req.body;

  if (!id) {
    return res.status(400).json({ error: 'ID can not be Null' });
  }

  if (id == " ") {
    return res.status(400).json({ error: 'ID can not be Empty' });
  }

  return next();
}

function requests(req, res, next) {

  console.count("Requisição");

  return next();
}

server.use(requests);

server.post('/projects', checkIfIdIsNotNull, checkIfProjectIdExists, (req, res) => {
  const { id, title } = req.body;

  const project = {
    id,
    title,
    tasks: []
  };

  projects.push(project);

  return res.json(project);
});

server.get('/projects', (req, res) => {
  return res.json(projects);
});

server.get('/projects/:id', checkIfProjectExists, (req, res) => {
  const { id } = req.params;

  const project = projects.find(p => p.id == id);

  return res.json(project);
});

server.put('/projects/:id', checkIfProjectExists, (req, res) => {
  const { id } = req.params;
  const { title } = req.body;

  const project = projects.find(p => p.id == id);

  project.title = title;

  return res.json(project);
});

server.delete('/projects/:id', checkIfProjectExists, (req, res) => {
  const { id } = req.params;

  const project = projects.findIndex(p => p.id == id);

  projects.splice(project, 1);

  return res.json(`Project ${id} successfull deleted`);
});

server.post('/projects/:id/tasks', checkIfProjectExists, (req, res) => {
  const { id } = req.params;
  const { title } = req.body;

  const project = projects.find(p => p.id == id);

  project.tasks.push(title);

  return res.json(project);
});

server.listen(3000);