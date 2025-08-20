
const enemyDex = [
  {
    id: 'Voxnull',
    name: 'Voxnull',
    avatar: 'assets/enemy/enemy1.png',
    description: 'Voxnull is a fanatic who gave up his own voice in pursuit of perfection. His face is hidden behind a mask, and his speech is a patchwork of stolen words. He hunts those who speak too boldly, erasing their identity. Once a philosopher, now a tool of suppression, engineered in Crimora’s underground lab. His presence is silence filled with echoes not his own.',
    battleTraits: {
      attackZones: 2,
    defenseZones: 1,
    critChance: 0.2
    },
    quote: 'I am the echo of your defiance. And I will overwrite it.'
  },
  {
    id: 'Oktar',
    name: 'Oktar',
    avatar: 'assets/enemy/enemy2.png',
    description: 'Oktar is a former human, consumed by a deep-sea symbiote. His body is covered in organic growths, and smoky tendrils erupt from his back. He doesn’t just fight — he preaches. Every strike is a mantra, every step distorts reality. His voice echoes like a cavernous choir, and his movements resemble a ritual. He infects not only flesh, but thought.',
    battleTraits: {
    attackZones: 1,
    defenseZones: 3,
    critChance: 0.1,
    },
    quote: 'You won’t defeat me. You’ll become me.'
  },
    {
    id: 'Crimora',
    name: 'Crimora',
    avatar: 'assets/enemy/enemy3.png',
    description: 'Crimora is the embodiment of grace and horror. Her movements are a ballet on the edge of a blade, her face hidden behind a mask, her body marked with scars she carved herself. She doesn’t kill — she performs. Every fight is a spectacle, where blood is paint and pain is music. Her style blends cyberpunk with kabuki theater, emphasizing sharp poses and choreography.',
    battleTraits: {
   attackZones: 1,
    defenseZones: 2,
    critChance: 0.3,
    },
    quote: 'You’re not an opponent. You’re part of the scenery.'
  }
];
const defeated = JSON.parse(localStorage.getItem('defeatedEnemies')) || [];

const gallery = document.getElementById('enemy-gallery');

enemyDex.forEach(enemy => {
  const card = document.createElement('div');
  card.className = 'enemy-card';
  if (!defeated.includes(enemy.id)) card.classList.add('locked');

  card.innerHTML = `
    <img src="${enemy.avatar}" alt="${enemy.name}">
    <h2>${enemy.name}</h2>
    <p>${enemy.description}</p>
    <blockquote>"${enemy.quote}"</blockquote>
  `;

  gallery.appendChild(card);
});
