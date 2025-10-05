fetch('db.json')
  .then(response => response.json())
  .then(data => {
    const path = window.location.pathname;
    const params = new URLSearchParams(window.location.search);
    const id = params.get('id');
    const tipo = params.get('tipo');

    if (path.includes('index')) {
      const autor = data.autor?.find(a => a.id == 14);
      if (autor) montarBiografiaCompacta(autor);
    } else if (path.includes('livros')) {
      montarLivros(data.livros);
    } else if (path.includes('filmes')) {
      montarFilmes(data.cinema);
    } else if (path.includes('personagens')) {
      montarPersonagens(data.personagens);
    } else if (path.includes('detalhes')) {
      let item = null;

      if (tipo === 'livro') {
        item = data.livros.find(l => l.id == id);
      } else if (tipo === 'cinema') {
        item = data.cinema.find(f => f.id == id);
      } else if (tipo === 'personagem') {
        item = data.personagens.find(p => p.id == id);
      } else if (tipo === 'autor') {
        item = data.autor?.find(a => a.id == id);
      }

      if (item) {
        montarDetalhes(item);
      } else {
        document.getElementById('detalhes-container').innerHTML = '<p class="text-center">Item não encontrado.</p>';
      }
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
          <a href="detalhes.html?tipo=livro&id=${livro.id}" class="btn btn-primary mt-3">Ver detalhes</a>
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
          <h5 class="card-title">${filme.titulo}</h5>
          <p class="card-text">${filme.sinopse.substring(0, 120)}...</p>
          <a href="detalhes.html?tipo=cinema&id=${filme.id}" class="btn btn-primary mt-3">Ver detalhes</a>
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
          <a href="detalhes.html?tipo=personagem&id=${p.id}" class="btn btn-primary mt-3">Ver detalhes</a>
        </div>
      </div>
    `;
    container.appendChild(card);
  });
}

// AUTOR NA HOME
function montarBiografiaCompacta(autor) {
  const container = document.getElementById('biografia-container');
  const card = document.createElement('div');
  card.className = 'col-md-10';

  const obrasTexto = autor.principais_obras?.map(o => o.serie).join(', ') || '';

  card.innerHTML = `
    <div class="card border-0 shadow-sm">
      <div class="card-body">
        <div class="text-center mb-3">
          <img src="${autor.img}" class="img-fluid rounded" alt="${autor.nome_completo}" style="max-width: 200px;">
        </div>
        <h5 class="card-title text-center text-azul-marinho">${autor.nome_completo}</h5>
        <p class="card-text text-center text-muted">${autor.ocupacao}</p>
        <p class="text-azul-marinho"><strong>Nascimento:</strong> ${autor.data_nascimento} — ${autor.local_nascimento}</p>
        <p class="text-azul-marinho"><strong>Obras:</strong> ${obrasTexto}</p>
        <div class="text-center mt-3">
          <a href="detalhes.html?tipo=autor&id=${autor.id}" class="btn btn-primary">Ver detalhes</a>
        </div>
      </div>
    </div>
  `;
  container.appendChild(card);
}

// DETALHES
function montarDetalhes(item) {
  const container = document.getElementById('detalhes-container');

  const elenco = item.elenco?.join(', ') || '';
  const diretores = Array.isArray(item.diretor) ? item.diretor.join(', ') : item.diretor || '';
  const obras = item.principais_obras?.map(o => `${o.serie} (${o.mitologia})`).join(', ') || '';
  const conhecidoPor = item.conhecido_por?.join(', ') || '';

  container.innerHTML = `
    <h1 class="mb-4 text-azul-marinho">${item.titulo || item.nome || item.nome_completo}</h1>
    <div class="row mb-4">
      <div class="col-md-5">
        <img src="${item.img}" class="img-fluid rounded shadow-sm" alt="${item.titulo || item.nome || item.nome_completo}">
      </div>
      <div class="col-md-7">
        ${item.sinopse ? `<p>${item.sinopse}</p>` : ''}
        ${item.ano_publicacao ? `<p><strong>Ano de publicação:</strong> ${item.ano_publicacao}</p>` : ''}
        ${item.ano_adaptação ? `<p><strong>Ano da adaptação:</strong> ${item.ano_adaptação}</p>` : ''}
        ${item.saga ? `<p><strong>Saga:</strong> ${item.saga}</p>` : ''}
        ${item.tipo ? `<p><strong>Tipo:</strong> ${item.tipo}</p>` : ''}
        ${diretores ? `<p><strong>Diretor:</strong> ${diretores}</p>` : ''}
        ${elenco ? `<p><strong>Elenco:</strong> ${elenco}</p>` : ''}
        ${item.parentesco ? `<p><strong>Parentesco:</strong> ${item.parentesco}</p>` : ''}
        ${item.caracteristicas ? `<p><strong>Características:</strong> ${item.caracteristicas}</p>` : ''}
        ${item.poderes ? `<p><strong>Poderes:</strong> ${item.poderes}</p>` : ''}
        ${item.jornada ? `<p><strong>Jornada:</strong> ${item.jornada}</p>` : ''}
        ${item.data_nascimento ? `<p><strong>Data de nascimento:</strong> ${item.data_nascimento}</p>` : ''}
        ${item.local_nascimento ? `<p><strong>Local de nascimento:</strong> ${item.local_nascimento}</p>` : ''}
        ${item.ocupacao ? `<p><strong>Ocupação:</strong> ${item.ocupacao}</p>` : ''}
        ${conhecidoPor ? `<p><strong>Conhecido por:</strong> ${conhecidoPor}</p>` : ''}
        ${obras ? `<p><strong>Principais obras:</strong> ${obras}</p>` : ''}
        ${item.inspiracao_percy_jackson ? `<p><strong>Inspiração para Percy Jackson:</strong> ${item.inspiracao_percy_jackson}</p>` : ''}
        ${item.carreira?.professor_historia ? `<p><strong>Carreira:</strong> ${item.carreira.professor_historia}</p>` : ''}
      </div>
    </div>
    <a href="javascript:history.back()" class="btn btn-secondary">Voltar</a>
  `;
}