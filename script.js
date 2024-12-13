let score = 0;
let passiveIncome = 0;
const scoreDisplay = document.getElementById('score');
const tapButton = document.getElementById('tapButton');
const messageDisplay = document.getElementById('message');
const buyPassiveButton = document.getElementById('buyPassiveButton');
const passiveIncomeDisplay = document.getElementById('passiveIncome');
const claimDropButton = document.getElementById('claimDropButton');
const dropMessageDisplay = document.getElementById('dropMessage');

tapButton.addEventListener('click ', () => {
    score++;
    scoreDisplay.textContent = score;
    messageDisplay.textContent = "Ты нажал на кнопку!";
    
    setTimeout(() => {
        messageDisplay.textContent = "";
    }, 1000);
});

buyPassiveButton.addEventListener('click', () => {
    if (score >= 10) { // Цена пассивного дохода
        score -= 10;
        passiveIncome++;
        scoreDisplay.textContent = score;
        passiveIncomeDisplay.textContent = passiveIncome;
        messageDisplay.textContent = "Пассивный доход куплен!";
        
        setTimeout(() => {
            messageDisplay.textContent = "";
        }, 1000);
    } else {
        messageDisplay.textContent = "Недостаточно очков!";
        setTimeout(() => {
            messageDisplay.textContent = "";
        }, 1000);
    }
});

claimDropButton.addEventListener('click', () => {
    dropMessageDisplay.textContent = "Ты забрал дроп!";
    setTimeout(() => {
        dropMessageDisplay.textContent = "";
    }, 1000);
});

// Переключение вкладок
const tabs = document.querySelectorAll('.tab');
const contents = document.querySelectorAll('.content > div');

tabs.forEach(tab => {
    tab.addEventListener('click', () => {
        const target = tab.id.replace('Tab', '');
        contents.forEach(content => {
            content.style.display = content.classList.contains(target.toLowerCase()) ? 'block' : 'none';
        });
    });
});
