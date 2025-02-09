const URL = 'https://api.themoviedb.org/3/tv/popular?api_key=6f96d2d095de4763822e1c0f5278b63e&page=1';

fetch(URL)
  .then(response => response.json())
  .then(data => {
    console.log(data);  
  })
  .catch(error => {
    console.error('Erro:', error);
  });



  tela.innerHTML += `
  <div class="card mb-3" style="max-width: 540px; cursor: pointer;" data-serie-id="${serie.id}">
    <div class="row g-0">
      <div class="col-md-4">
        <img src="https://image.tmdb.org/t/p/w500${serie.poster_path}" class="img-fluid rounded-start" alt="${serie.name}">
      </div>
      <div class="col-md-8">
        <div class="card-body">
          <h5 class="card-title">${index + 1}# ${serie.name}</h5>
          <p class="card-text">${serie.overview}</p>
        </div>
      </div>
    </div>
  </div>`;

  // Função para buscar detalhes da série
function fetchSerieDetails(serieId) {
  const apiURL = `https://api.themoviedb.org/3/tv/${serieId}?api_key=${apiKey}&language=pt-BR`;
  fetch(apiURL)
    .then(res => res.json())
    .then(data => {
      // Preenche o modal com os detalhes da série
      document.getElementById('serieModalLabel').innerText = data.name;
      document.getElementById('serieModalBody').innerHTML = `
        <img src="https://image.tmdb.org/t/p/w500${data.poster_path}" class="img-fluid mb-3" alt="${data.name}">
        <p><strong>Sinopse:</strong> ${data.overview}</p>
        <p><strong>Data de Lançamento:</strong> ${data.first_air_date}</p>
        <p><strong>Avaliação:</strong> ${data.vote_average}/10</p>
        <p><strong>Gêneros:</strong> ${data.genres.map(genre => genre.name).join(', ')}</p>
        <p><strong>Temporadas:</strong> ${data.number_of_seasons}</p>
        <p><strong>Episódios:</strong> ${data.number_of_episodes}</p>
      `;
      // Abre o modal
      const modal = new bootstrap.Modal(document.getElementById('serieModal'));
      modal.show();
    })
    .catch(err => console.error('Erro ao buscar detalhes da série:', err));
}

// Adiciona evento de clique aos cards
document.getElementById('tela').addEventListener('click', function (event) {
  const card = event.target.closest('.card[data-serie-id]');
  if (card) {
    const serieId = card.getAttribute('data-serie-id');
    fetchSerieDetails(serieId); // Busca os detalhes da série e abre o modal
  }
});