const enemies = [
  {
    name: 'Voxnull',
    img: 'assets/enemy/enemy1.png',
    attackZones: 2,
    defenseZones: 1,
    hp: 120,
    damage: 20,
    critChance: 0.2,
    critMultiplier: 1.5
  },
  {
    name: 'Oktar',
    img: 'assets/enemy/enemy2.png',
    attackZones: 1,
    defenseZones: 3,
    hp: 150,
    damage: 15,
    critChance: 0.1,
    critMultiplier: 1.5
  },
  {
    name: 'Crimora',
    img: 'assets/enemy/enemy3.png',
    attackZones: 1,
    defenseZones: 2,
    hp: 100,
    damage: 25,
    critChance: 0.3,
    critMultiplier: 1.5
  }
];
let playerHP = 150;
let selectedAttack = [];
let selectedDefense = [];
let currentEnemy = enemies[Math.floor(Math.random() * enemies.length)];
let enemyHP = currentEnemy.hp;
const zones = ['head', 'nack', 'body', 'belly', 'legs']; 

document.getElementById('attack-button').addEventListener('click', executeBattle);


function executeBattle() {
  if (selectedAttack.length !== 1 || selectedDefense.length !== 2) return;
if (document.getElementById('endgame-modal')?.classList.contains('hidden') === false) return;

  const enemyAttack = getRandomZones(currentEnemy.attackZones);
  const enemyDefense = getRandomZones(currentEnemy.defenseZones);

  let totalPlayerDamage = 0;
  let totalEnemyDamage = 0;

  selectedAttack.forEach(zone => {
    const isCrit = isCriticalHit(0.2); 
    const damage = calculateDamage({ damage: 20, critMultiplier: 1.5 }, enemyDefense, zone, isCrit);
    totalPlayerDamage += damage;
    logAttack('PLAYER', currentEnemy.name, zone, damage, isCrit, enemyDefense.includes(zone));
  });

  enemyAttack.forEach(zone => {
    const isCrit = isCriticalHit(currentEnemy.critChance);
    const damage = calculateDamage(currentEnemy, selectedDefense, zone, isCrit);
    totalEnemyDamage += damage;
    logAttack(currentEnemy.name, 'PLAYER', zone, damage, isCrit, selectedDefense.includes(zone));
  });

  playerHP -= totalEnemyDamage;
  enemyHP -= totalPlayerDamage;

  document.getElementById('player-health').value = playerHP;
  document.getElementById('enemy-health').value = enemyHP;
  document.getElementById('player-health-text').textContent = `${playerHP} / 150`;
document.getElementById('enemy-health-text').textContent = `${enemyHP} / ${currentEnemy.hp}`;
document.getElementById('enemy-health-text').textContent = `${enemyHP} / ${currentEnemy.hp}`;
document.getElementById('enemy-health').value = enemyHP;
document.getElementById('enemy-health').max = currentEnemy.hp;

document.getElementById('player-health-text').textContent = `${playerHP} / 150`;
document.getElementById('player-health').value = playerHP;
document.getElementById('player-health').max = 150;
const playerText = document.getElementById('player-health-text');
playerText.classList.add('damage-flash');
setTimeout(() => playerText.classList.remove('damage-flash'), 400);
const enemyText = document.getElementById('enemy-health-text');
enemyText.classList.add('damage-flash');
setTimeout(() => enemyText.classList.remove('damage-flash'), 400);
 if (playerHP <= 0) {
    endGame(false);
    return;
  } else if (enemyHP <= 0) {
    endGame(true);
    return;
  }

  resetSelection();
}
function resetSelection() {
  selectedAttack = [];
  selectedDefense = [];
  document.querySelectorAll('.zone').forEach(btn => btn.classList.remove('selected'));
}
function getRandomZones(count) {
  const shuffled = [...zones].sort(() => 0.5 - Math.random());
  return shuffled.slice(0, count);
}

function isCriticalHit(chance) {
  return Math.random() < chance;
}

function calculateDamage(attacker, targetDefense, zone, isCrit) {
  const blocked = targetDefense.includes(zone);
  if (!blocked || isCrit) {
    return Math.round(attacker.damage * (isCrit ? attacker.critMultiplier : 1));
  }
  return 0;
}

function logAttack(attackerName, targetName, zone, damage, isCrit, blocked) {
  const logEntry = document.createElement('li');
  logEntry.innerHTML = `<strong>${attackerName}</strong> attacked <strong>${targetName}</strong> in <span class="zone-name">${zone}</span> and 
    ${blocked && !isCrit ? 'missed and did no damage' : `caused <span class="damage">${damage}</span> damage${isCrit ? ' (critical damage)' : ''}`}.`;
  document.getElementById('battle-log').appendChild(logEntry);
}

function endGame(playerWon) {
  const modal = document.getElementById('endgame-modal');
  const title = document.getElementById('endgame-title');
  const restartBtn = document.getElementById('restart-btn');

  title.textContent = playerWon ? 'Victory!' : 'Drfeat...';
  title.style.color = playerWon ? 'green' : 'red';

  modal.classList.remove('hidden');

  document.getElementById('attack-button').disabled = true;

  restartBtn.onclick = () => location.reload();
  if (playerWon) {
  let wins = parseInt(localStorage.getItem('wins') || '0');
  wins++;
  localStorage.setItem('wins', wins);
  document.getElementById('wins').textContent = wins;
} else {
  let losses = parseInt(localStorage.getItem('losses') || '0');
  losses++;
  localStorage.setItem('losses', losses);
  document.getElementById('losses').textContent = losses;
}

}

window.addEventListener('DOMContentLoaded', () => {
  const wins = localStorage.getItem('wins') || 0;
  const losses = localStorage.getItem('losses') || 0;

  document.getElementById('wins').textContent = wins;
  document.getElementById('losses').textContent = losses;
});
document.getElementById('reset-stats').onclick = () => {
  localStorage.setItem('wins', 0);
  localStorage.setItem('losses', 0);
  document.getElementById('wins').textContent = 0;
  document.getElementById('losses').textContent = 0;
};

