window.onload = () => {
function updateNameDisplay() {
  const name = localStorage.getItem('playerName') || 'Player';
  document.getElementById('player-name').textContent = name;
  document.getElementById('char-name').textContent = name;
}
document.getElementById('save-name-btn')?.addEventListener('click', () => {
  const newName = document.getElementById('new-name').value.trim();
  if (newName) {
    localStorage.setItem('playerName', newName);
    updateNameDisplay(); 
    alert('Name updated!');
  }
  document.getElementById('new-name')?.focus();
});

updateNameDisplay();

  document.getElementById('wins').textContent = localStorage.getItem('wins') || 0;
  document.getElementById('losses').textContent = localStorage.getItem('losses') || 0;

  const avatarSrc = localStorage.getItem('avatarSrc') || 'assets/character/Character1.png';
  document.getElementById('avatar').src = avatarSrc;

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

  document.querySelector('.home-icon')?.addEventListener('click', () => {
    showScreen('home-screen');
  });

  document.querySelector('.profile-icon')?.addEventListener('click', () => {
    showScreen('character-screen');
  });
  document.querySelector('.settings-icon')?.addEventListener('click', () => {
  showScreen('settings-screen');
});

document.querySelectorAll('.attack').forEach(btn => {
  btn.addEventListener('click', () => {
    selectedAttack = [btn.dataset.zone];
    document.querySelectorAll('.attack').forEach(b => b.classList.remove('selected'));
    btn.classList.add('selected');
    updateAttackButtonState();
  });
});

document.querySelectorAll('.defense').forEach(btn => {
  btn.addEventListener('click', () => {
    const zone = btn.dataset.zone;
    if (selectedDefense.includes(zone)) {
      selectedDefense = selectedDefense.filter(z => z !== zone);
      btn.classList.remove('selected');
    } else if (selectedDefense.length < 2) {
      selectedDefense.push(zone);
      btn.classList.add('selected');
    }
    updateAttackButtonState();
  });
});
function updateAttackButtonState() {
  document.getElementById('attack-button').disabled = !(selectedAttack && selectedDefense.length === 2);
}
};
