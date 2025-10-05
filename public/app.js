fetch('db.json')
  .then(response => response.json())
  .then(data => {
    const path = window.location.pathname;

    if (path.includes('livros')) {
      montarLivros(data.livros);
    } else if (path.includes('filmes')) {
      montarFilmes(data.cinema);
    } else if (path.includes('personagens')) {
      montarPersonagens(data.personagens);
    } else if (path.includes('index')) {
      montarBiografiaCompacta(data.autor[0]);
    }
  });

// LIVROS
function montarLivros(livros) {
  const container = document.getElementById('livros-container');
  livros.forEach(livro => {
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
}

// FILMES
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

// PERSONAGENS
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

// AUTOR
function montarBiografiaCompacta(autor) {
  const container = document.getElementById('biografia-container');
  const card = document.createElement('div');
  card.className = 'col-md-10';

  const obrasTexto = autor.principais_obras.map(o => o.serie).join(', ');

  card.innerHTML = `
    <div class="card border-0 shadow-sm">
      <div class="card-body">
        <div class="text-center mb-3">
          <img src="${autor.img}" class="img-fluid rounded" alt="${autor.nome_completo}" style="max-width: 200px;">
        </div>
        <h5 class="card-title text-center">${autor.nome_completo}</h5>
        <p class="card-text text-center text-muted">${autor.ocupacao}</p>
        <p><strong>Nascimento:</strong> ${autor.data_nascimento} — ${autor.local_nascimento}</p>
        <p><strong>Obras:</strong> ${obrasTexto}</p>
        <div class="text-center mt-3">
          <a href="detalhes.html?id=autor" class="btn btn-primary">Ver detalhes</a>
        </div>
      </div>
    </div>
  `;
  container.appendChild(card);
}