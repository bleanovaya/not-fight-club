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
//attac-button
document.getElementById('attack-button').addEventListener('click', executeBattle);


function executeBattle() {
  if (selectedAttack.length !== 1 || selectedDefense.length !== 2) return;

  const enemyAttack = getRandomZones(currentEnemy.attackZones);
  const enemyDefense = getRandomZones(currentEnemy.defenseZones);

  let totalPlayerDamage = 0;
  let totalEnemyDamage = 0;

  // Атака игрока
  selectedAttack.forEach(zone => {
    const isCrit = isCriticalHit(0.2); // шанс игрока
    const damage = calculateDamage({ damage: 20, critMultiplier: 1.5 }, enemyDefense, zone, isCrit);
    totalPlayerDamage += damage;
    logAttack('PLAYER', currentEnemy.name, zone, damage, isCrit, enemyDefense.includes(zone));
  });

  // Атака врага
  enemyAttack.forEach(zone => {
    const isCrit = isCriticalHit(currentEnemy.critChance);
    const damage = calculateDamage(currentEnemy, selectedDefense, zone, isCrit);
    totalEnemyDamage += damage;
    logAttack(currentEnemy.name, 'PLAYER', zone, damage, isCrit, selectedDefense.includes(zone));
  });

  // Обновление здоровья
  playerHP -= totalEnemyDamage;
  enemyHP -= totalPlayerDamage;

  document.getElementById('player-health').value = playerHP;
  document.getElementById('enemy-health').value = enemyHP;

  resetSelection();
}
function resetSelection() {
  selectedAttack = [];
  selectedDefense = [];
  document.querySelectorAll('.zone').forEach(btn => btn.classList.remove('selected'));
}

//выбор зоны
function getRandomZones(count) {
  const shuffled = [...zones].sort(() => 0.5 - Math.random());
  return shuffled.slice(0, count);
}
// крит
function isCriticalHit(chance) {
  return Math.random() < chance;
}
//расчёт урона
function calculateDamage(attacker, targetDefense, zone, isCrit) {
  const blocked = targetDefense.includes(zone);
  if (!blocked || isCrit) {
    return Math.round(attacker.damage * (isCrit ? attacker.critMultiplier : 1));
  }
  return 0;
}
//лог
function logAttack(attackerName, targetName, zone, damage, isCrit, blocked) {
  const logEntry = document.createElement('li');
  logEntry.innerHTML = `<strong>${attackerName}</strong> attacked <strong>${targetName}</strong> in <span class="zone-name">${zone}</span> and 
    ${blocked && !isCrit ? 'missed and did no damage' : `caused <span class="damage">${damage}</span> damage${isCrit ? ' (critical damage)' : ''}`}.`;
  document.getElementById('battle-log').appendChild(logEntry);
}

