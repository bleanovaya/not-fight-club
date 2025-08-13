window.onload = () => {
  // Инициализация имени
  const name = localStorage.getItem('playerName') || 'Игрок';
  document.getElementById('player-name').textContent = name;
  document.getElementById('char-name').textContent = name;

  // Победы и поражения
  document.getElementById('wins').textContent = localStorage.getItem('wins') || 0;
  document.getElementById('losses').textContent = localStorage.getItem('losses') || 0;

  // Аватар
  const avatarSrc = localStorage.getItem('avatarSrc') || 'assets/character/Character1.png';
  document.getElementById('avatar').src = avatarSrc;

  // Смена аватара через загрузку файла
  const avatarUpload = document.getElementById('avatar-upload');
  if (avatarUpload) {
    avatarUpload.addEventListener('change', (e) => {
      const file = e.target.files[0];
      if (file) {
        const reader = new FileReader();
        reader.onload = () => {
          document.getElementById('avatar').src = reader.result;
          localStorage.setItem('avatarSrc', reader.result);
        };
        reader.readAsDataURL(file);
      }
    });
  }

  // Смена аватара из предложенных
  const avatarOptions = document.querySelectorAll('.avatar-option');
  avatarOptions.forEach(img => {
    img.addEventListener('click', () => {
      avatarOptions.forEach(i => i.classList.remove('selected'));
      img.classList.add('selected');
      const src = img.getAttribute('src');
      document.getElementById('avatar').src = src;
      localStorage.setItem('avatarSrc', src);
    });
  });

  // Переключение экранов
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

  // Навигация по иконкам
  document.querySelector('.home-icon')?.addEventListener('click', () => {
    showScreen('home-screen');
  });

  document.querySelector('.profile-icon')?.addEventListener('click', () => {
    showScreen('character-screen');
  });

  document.getElementById('start-fight-btn')?.addEventListener('click', () => {
    window.location.href = 'fight.html';
  });
};


