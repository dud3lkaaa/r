let coins = 0;
let energy = 100;
let clickPower = 1;
let incomePerMinute = 0;

// Отключаем зум при двойном тапе
document.addEventListener('touchmove', function (event) {
    if (event.scale !== 1) { event.preventDefault(); }
}, { passive: false });

function tap() {
    if (energy > 0) {
        coins += clickPower;
        energy -= 1;
        updateUI();
        
        // Анимация тряски хомяка
        const hamster = document.getElementById('hamsterBtn');
        hamster.classList.add('shake');
        setTimeout(() => {
            hamster.classList.remove('shake');
        }, 100);
    }
}
const tonConnectUI = new TON_CONNECT_UI.TonConnectUI({
    manifestUrl: 'https://yourwebsite.com/tonconnect-manifest.json',
    buttonRootId: 'ton-connect-btn'
});

async function connectTonWallet() {
    try {
        const wallet = await tonConnectUI.connectWallet();
        
        if (wallet) {
            document.getElementById('wallet-not-connected').classList.add('hidden');
            document.getElementById('wallet-connected').classList.remove('hidden');
            
            // Получаем адрес кошелька
            const address = wallet.account.address;
            document.getElementById('wallet-address').textContent = 
                `${address.slice(0, 6)}...${address.slice(-4)}`;
            
            // Здесь можно получить баланс, но это требует дополнительной логики
        }
    } catch (error) {
        console.error('TON Wallet Connection Error:', error);
        alert('Не удалось подключить кошелек');
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
    document.getElementById('coins').textContent = coinsdocument.getElementById('energy').textContent = energy;
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
    const seconds = Math.floor((diff % (1000 * 60)) / 1000);

    document.getElementById('dropTimer').textContent = 
        `${String(hours).padStart(2, '0')}:${String(minutes).padStart(2, '0')}:${String(seconds).padStart(2, '0')}`;
}

setInterval(updateDropTimer, 6400);
updateDropTimer();


// Добавим обработчик события на отключение кошелька
tonConnectUI.onStatusChange(async (wallet) => {
    if (!wallet) {
        document.getElementById('wallet-not-connected').classList.remove('hidden');
        document.getElementById('wallet-connected').classList.add('hidden');
    }
});