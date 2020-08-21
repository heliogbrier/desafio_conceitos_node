const express = require("express");
const cors = require("cors");

const { v4: uuid } = require('uuid');

const app = express();

app.use(express.json());
app.use(cors());

const repositories = [];

app.get("/repositories", (request, response) => {
  response.json(repositories);
});

app.post("/repositories", (request, response) => {
  const { title, url, techs } = request.body;

  const repository = {
    id: uuid(),
    title,
    url,
    techs,
    likes: 0
  };

  repositories.push(repository);

  response.json(repository);
});

app.put("/repositories/:id", (request, response) => {
  const { id } = request.params;
  const {title, url, techs} = request.body;

  const repositoryIndex = repositories.findIndex( repository => repository.id == id);

  if(repositoryIndex < 0){
    return response.status(400).json({error: 'The repository could not be found.'})
  }

  const repository = {
    id,
    title,
    url,
    techs
  }

  repositories[repositoryIndex] = repository;

  response.json(repository);

});

app.delete("/repositories/:id", (request, response) => {
  const { id } = request.params;

  const repositoryIndex = repositories.findIndex( repository => repository.id == id);

  if(repositoryIndex < 0){
    return response.status(400).json({error: 'The repository could not be found.'})
  }

  repositories.splice(repositoryIndex,1);

  return response.status(400).send();
});

app.post("/repositories/:id/like", (request, response) => {
  const { id } = request.params;

  const repositoryIndex = repositories.findIndex( repository => repository.id == id);

  if(repositoryIndex < 0){
    return response.status(400).json({error: 'The repository could not be found.'})
  }

  repositories[repositoryIndex].likes++;

  response.json(repositories[repositoryIndex]);

});

module.exports = app;
