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

// AUTOR (BIOGRAFIA COMPACTA)
function montarBiografiaCompacta(autor) {
  const container = document.getElementById('biografia-container');
  const card = document.createElement('div');
  card.className = 'col-md-10';

  const conhecidoPor = autor.conhecido_por.map(item => `<span class="badge bg-secondary me-1 mb-1">${item}</span>`).join('');
  const principaisObras = autor.principais_obras.map(o => `<li>${o.serie} — Mitologia ${o.mitologia}</li>`).join('');
  const selo = autor.carreira.selo_editorial;

  card.innerHTML = `
    <div class="card border-0 shadow-sm">
      <div class="card-body">
        <div class="text-center mb-3">
          <img src="${autor.img}.jpg" class="img-fluid rounded" alt="${autor.nome_completo}" style="max-width: 200px;">
        </div>
        <h5 class="card-title text-center">${autor.nome_completo}</h5>
        <p class="card-text text-center text-muted">${autor.ocupacao}</p>
        <p><strong>Nascimento:</strong> ${autor.data_nascimento} — ${autor.local_nascimento}</p>
        <p><strong>Conhecido por:</strong><br>${conhecidoPor}</p>

        <div class="collapse" id="biografia-completa">
          <hr>
          <p><strong>Inspiração para Percy Jackson:</strong> ${autor.inspiracao_percy_jackson}</p>
          <p><strong>Carreira:</strong><br>
            ${autor.carreira.professor_historia}<br>
            ${autor.carreira.escrita_para_jovens}<br>
            <strong>Selo editorial:</strong> ${selo.nome}<br>
            <em>${selo.objetivo}</em>
          </p>
          <p><strong>Principais obras:</strong></p>
          <ul>${principaisObras}</ul>
        </div>

        <div class="text-center mt-3">
          <button class="btn btn-primary" data-bs-toggle="collapse" data-bs-target="#biografia-completa" aria-expanded="false" aria-controls="biografia-completa">
            Ver mais
          </button>
        </div>
      </div>
    </div>
  `;
  container.appendChild(card);
}