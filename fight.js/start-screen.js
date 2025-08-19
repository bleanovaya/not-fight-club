   function showScreen(screenClass) {
  document.querySelectorAll('main section').forEach(sec => {
    sec.classList.add('hidden-screen');
    sec.classList.remove('active-screen');
  });
  const target = document.querySelector(`.${screenClass}`);
  if (target) {
    target.classList.remove('hidden-screen');
    target.classList.add('active-screen');
  }
}
    document.querySelector('.settings-icon')?.addEventListener('click', () => {
  showScreen('settings-screen');
});

document.getElementById('save-name-btn')?.addEventListener('click', () => {
  const newName = document.getElementById('new-name').value.trim();
  if (newName) {
    localStorage.setItem('playerName', newName);
    document.getElementById('player-name').textContent = newName;
    document.getElementById('char-name').textContent = newName;
    alert('Name updated!');
  }
});
    const name = localStorage.getItem('playerName');
    document.getElementById('player-name').textContent = name || 'Player';

    document.getElementById('start-fight-btn').addEventListener('click', () => {
      const name = localStorage.getItem('playerName') || 'Player';
      const avatarSrc = localStorage.getItem('avatarSrc') || 'assets/character/Character1.png';
      const enemies = [
        { name: 'Voxnull', img:'assets/enemy/enemy1.png' },
        { name: 'Oktar', img:'assets/enemy/enemy2.png' },
        { name: 'Crimora', img:'assets/enemy/enemy3.png' }
      ];

      const random = enemies[Math.floor(Math.random() * enemies.length)];
      document.getElementById('enemy-avatar').src = random.img;
      document.getElementById('enemy-name').textContent = random.name;
      document.getElementById('player-avatar').src = avatarSrc;
      document.getElementById('player-fight-name').textContent = name;
      showScreen('fight-screen');
    });