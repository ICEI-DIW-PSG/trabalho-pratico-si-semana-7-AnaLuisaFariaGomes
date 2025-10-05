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