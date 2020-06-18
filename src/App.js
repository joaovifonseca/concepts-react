import React, { useState, useEffect } from "react";

import api from './services/api';
import "./styles.css";

function App() {
  const [repositories, setRespositories] = useState([]);

  useEffect(() => {
    api.get('repositories').then(response => {
      setRespositories(response.data);
    });
  }, []);

  async function handleAddRepository() {

    const data = {
      id: "123",
      url: "https://github.com/josepholiveira",
      title: "Desafio ReactJS",
      techs: ["React", "Node.js"],
    }
    
    const response = await api.post('repositories', data);
    setRespositories([ ...repositories, response.data]);
  }

  async function handleRemoveRepository(id) {

    const repositoryIndex = repositories.findIndex(
      repository => repository.id === id
    );
  
    if(repositoryIndex < 0) {
      alert('Repository not found');
      return;
    } 

    const response = await api.delete(`repositories/${id}`);

    if(response.status === 204) {
      repositories.splice(repositoryIndex, 1);
      setRespositories([ ...repositories]);
    } else {
      alert('Repository not found');
      return;
    }
  }

  return (
    <div>
      <ul data-testid="repository-list">
        {repositories.map(respository => (
          <li key={respository.id}>
            {respository.title}

            <button onClick={() => handleRemoveRepository(respository.id)}>
              Remover
            </button>
          </li>
        ))}
      </ul>

      <button onClick={handleAddRepository}>Adicionar</button>
    </div>
  );
}

export default App;
