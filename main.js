const URL = 'https://api.themoviedb.org/3/tv/popular?api_key=6f96d2d095de4763822e1c0f5278b63e&page=1';

fetch(URL)
  .then(response => response.json())
  .then(data => {
    console.log(data);  
  })
  .catch(error => {
    console.error('Erro:', error);
  });