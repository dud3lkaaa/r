let coins = 0;
let clickPower = 1;
let incomePerMinute = 0;
let dropInterval = 60; // seconds
let dropTimer;

function tap() {
    coins += clickPower;
    updateDisplay();
}

function upgradeClick() {
    if (coins >= 10) {
        coins -= 10;
        clickPower++;
        updateDisplay();
    }
}

function upgradeIncome() {
    if (coins >= 50) {
        coins -= 50;
        incomePerMinute++;
        updateDisplay();
    }
}

function showTab(tab) {
    const tabs = document.querySelectorAll('.tab-content');
    tabs.forEach(t => t.classList.remove('active'));
    document.getElementById(tab + 'Tab').classList.add('active');
}

function updateDisplay() {
    document.getElementById('coins').innerText = coins;
    document.getElementById('clickPower').innerText = clickPower;
    document.getElementById('incomePerMinute').innerText = incomePerMinute;
}

function startDropTimer() {
    let timeLeft = dropInterval;
    dropTimer = setInterval(() => {
        if (timeLeft <= 0) {
            clearInterval(dropTimer);
            alert("Дроп получен!");
            timeLeft = dropInterval; // Reset timer
        } else {
            timeLeft--;
            document.getElementById('dropTimer').innerText = formatTime(timeLeft);
        }
    }, 1000);
}

function formatTime(seconds) {
    const hours = Math.floor(seconds / 3600);
    const minutes = Math.floor((seconds % 3600) / 60);
    const secs = seconds % 60;
    return `${String(hours).padStart(2, '0')}:${String(minutes).padStart(2, '0')}:${String(secs).padStart(2, '0')}`;
}

// Start the drop timer when the page loads
window.onload = startDropTimer;