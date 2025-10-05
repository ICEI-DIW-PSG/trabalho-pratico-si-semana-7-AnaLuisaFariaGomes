// Livros
fetch('db.json')
  .then(response => response.json())
  .then(data => {
    const container = document.getElementById('livros-container');
    data.livros.forEach(livro => {
      const card = document.createElement('div');
      card.className = 'col-md-4';
      card.innerHTML = `
        <div class="card h-100 shadow-sm card-personalizado text-center">
          <img src="${livro.img}" class="card-img-top" alt="${livro.titulo}">
          <div class="card-body">
            <h5 class="card-title">${livro.titulo}</h5>
            <p class="card-text">${livro.sinopse.substring(0, 120)}...</p>
            <a href="detalhes.html?id=${livro.id}" class="btn btn-primary mt-3">Ver detalhes</a>
          </div>
        </div>
      `;
      container.appendChild(card);
    });
  })
  .catch(error => console.error('Erro ao carregar db.json:', error));

// Filmes
fetch('db.json')
  .then(response => response.json())
  .then(data => {
    const path = window.location.pathname;

    if (path.includes('filmes')) {
      montarFilmes(data.cinema);
    }
  });

function montarFilmes(filmes) {
  const container = document.getElementById('filmes-container');
  filmes.forEach(filme => {
    const card = document.createElement('div');
    card.className = 'col-md-4';
    card.innerHTML = `
      <div class="card h-100 shadow-sm card-personalizado text-center">
        <img src="${filme.img}" class="card-img-top" alt="${filme.titulo}">
        <div class="card-body">
          <h5 class="card-title">${filme.titulo} (${filme.ano_adaptação})</h5>
          <p class="card-text">${filme.sinopse.substring(0, 120)}...</p>
          <a href="detalhes.html?id=${filme.id}" class="btn btn-primary mt-3">Ver detalhes</a>
        </div>
      </div>
    `;
    container.appendChild(card);
  });
}

//personagens
fetch('db.json')
  .then(response => response.json())
  .then(data => {
    const path = window.location.pathname;

    if (path.includes('personagens')) {
      montarPersonagens(data.personagens);
    }
  });

function montarPersonagens(personagens) {
  const container = document.getElementById('personagens-container');
  personagens.forEach(p => {
    const card = document.createElement('div');
    card.className = 'col-md-4';
    card.innerHTML = `
      <div class="card h-100 shadow-sm card-personalizado text-center">
        <img src="${p.img}" class="card-img-top" alt="${p.nome}">
        <div class="card-body">
          <h5 class="card-title">${p.nome}</h5>
          <p class="card-text">${p.caracteristicas || 'Personagem da saga Percy Jackson.'}</p>
          <a href="detalhes.html?id=${p.id}" class="btn btn-primary mt-3">Ver detalhes</a>
        </div>
      </div>
    `;
    container.appendChild(card);
  });
}