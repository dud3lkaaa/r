let coins = 0;
let energy = 100;
let clickPower = 1;
let incomePerMinute = 0;

function tap() {
    if (energy > 0) {
        coins += clickPower;
        energy -= 1;
        updateUI();
    }
}

function upgradeClick() {
    const cost = 10 * clickPower;
    if (coins >= cost) {
        coins -= cost;
        clickPower += 1;
        updateUI();
    }
}

function upgradeIncome() {
    const cost = 50 * (incomePerMinute + 1);
    if (coins >= cost) {
        coins -= cost;
        incomePerMinute += 1;
        updateUI();
    }
}

function updateUI() {
    document.getElementById('coins').textContent = coins;
    document.getElementById('energy').textContent = energy;
    document.getElementById('clickPower').textContent = clickPower;
    document.getElementById('incomePerMinute').textContent = incomePerMinute;
    
    document.getElementById('clickUpgradeCost').textContent = 10 * clickPower;
    document.getElementById('incomeUpgradeCost').textContent = 50 * (incomePerMinute + 1);
}

function showTab(tabName) {
    const tabs = ['tap', 'upgrade', 'drop'];
    tabs.forEach(tab => {
        const tabElement = document.getElementById(`${tab}Tab`);
        tabElement.classList.toggle('hidden', tab !== tabName);
    });
}

// Восстановление энергии
setInterval(() => {
    if (energy < 100) {
        energy = Math.min(100, energy + 1);
        updateUI();
    }
}, 1000);

// Доход в минуту
setInterval(() => {
    coins += incomePerMinute;
    updateUI();
}, 1000);

// Обновление таймера дропа
function updateDropTimer() {
    const now = new Date();
    const tomorrow = new Date(now.getFullYear(), now.getMonth(), now.getDate() + 1);
    const diff = tomorrow - now;

    const hours = Math.floor(diff / (1000 * 60 * 60));
    const minutes = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60));
    const seconds = Math.floor((diff % (1000 * 60)) / 1000 
    );

    document.getElementById('dropTimer').textContent = 
        `${String(hours).padStart(2, '0')}:${String(minutes).padStart(2, '0')}:${String(seconds).padStart(2, '0')}`;
}

setInterval(updateDropTimer, 1000);
updateDropTimer();