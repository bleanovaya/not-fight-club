document.querySelector('.registration-form').addEventListener('submit', (e) => {
  e.preventDefault();
  const playerName = document.getElementById('player-name').value.trim();
  if (playerName) {
    localStorage.setItem('playerName', playerName);
    window.location.href = 'home.html'; // или переход к следующему экрану
  }
});
