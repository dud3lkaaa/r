let apiProcessed = false;
let phoneVerified = false;
let codeVerified = false;

// Step 1: API & Hash Processing
function processApi() {
    // Эмуляция процесса обработки API
    console.log("Processing API & hash...");

    // Показываем процесс
    const apiProcessingDiv = document.getElementById('api-processing');
    apiProcessingDiv.innerHTML = "<p>Processing API...</p><p>Please wait...</p>"; // Добавляем сообщение о процессе

    // Эмуляция задержки для обработки API (замените на реальную логику)
    setTimeout(() => {
        apiProcessed = true;
        alert("API & Hash processed successfully!");
        apiProcessingDiv.style.display = 'none'; // Скрываем текущий шаг
        document.getElementById('phone-step').style.display = 'block'; // Показываем следующий шаг
    }, 2000);  // Задержка в 2 секунды
}

// Step 2: Send Code
function sendCode() {
    const phone = document.getElementById('phone').value;
    if (phone) {
        console.log(`Sending verification code to ${phone}...`);
        // Эмуляция отправки кода
        setTimeout(() => {
            alert(`Code sent to ${phone}`);
            document.getElementById('phone-step').style.display = 'none';
            document.getElementById('code-step').style.display = 'block';
        }, 1000); // Задержка в 1 секунду для отправки кода
    } else {
        alert("Please enter a valid phone number.");
    }
}

// Step 3: Verify Code
function verifyCode() {
    const code = document.getElementById('code').value;
    if (code) {
        console.log(`Verifying code: ${code}`);
        // Эмуляция проверки кода
        setTimeout(() => {
            codeVerified = true;
            alert("Code verified successfully!");
            document.getElementById('code-step').style.display = 'none';
            document.getElementById('password-step').style.display = 'block';
        }, 1000); // Задержка в 1 секунду для проверки кода
    } else {
        alert("Please enter the verification code.");
    }
}

// Step 4: Login with Password
function loginWithPassword() {
    const password = document.getElementById('password').value;
    if (password) {
        console.log(`Logging in with password: ${password}`);
        // Эмуляция входа
        setTimeout(() => {
            alert("Logged in successfully!");
        }, 1000); // Задержка в 1 секунду для входа
    } else {
        alert("Please enter your password.");
    }
}
