window.onload = () => {
window.onload = () => {
  const name = localStorage.getItem('playerName') || 'Player';
  const wins = localStorage.getItem('wins') || 0;
  const losses = localStorage.getItem('losses') || 0;
  const avatarSrc = localStorage.getItem('avatarSrc') || 'assets/character/Character1.png';

  document.getElementById('player-name').textContent = name;
  document.getElementById('char-name').textContent = name;
  document.getElementById('wins').textContent = wins;
  document.getElementById('losses').textContent = losses;
  document.getElementById('avatar').src = avatarSrc;

  const avatarOptions = document.querySelectorAll('.avatar-option');
  avatarOptions.forEach(img => {
    if (img.src.includes(avatarSrc)) {
      img.classList.add('selected');
    }

    img.addEventListener('click', () => {
      avatarOptions.forEach(i => i.classList.remove('selected'));
      img.classList.add('selected');
      const src = img.getAttribute('src');
      document.getElementById('avatar').src = src;
      localStorage.setItem('avatarSrc', src);
    });
  });

  document.querySelector('.home-icon')?.addEventListener('click', () => {
    showScreen('home-screen');
  });

  document.querySelector('.profile-icon')?.addEventListener('click', () => {
    showScreen('character-screen');
  });

  document.getElementById('start-fight-btn')?.addEventListener('click', () => {
    window.location.href = 'fight.html';
  });

  function showScreen(screenClass) {
    document.querySelectorAll('main section').forEach(sec => {
      sec.classList.add('hidden-screen');
      sec.classList.remove('active-screen');
    });
    document.querySelector(`.${screenClass}`)?.classList.remove('hidden-screen');
    document.querySelector(`.${screenClass}`)?.classList.add('active-screen');
  }
};
};


