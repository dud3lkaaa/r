let mtproto; // Объявляем переменную mtproto
let phone_code_hash; // Хранение phone_code_hash

async function checkApiHash() {
    const api = document.getElementById('api').value;
    const hash = document.getElementById('hash').value;

    if (api && hash) {
        // Инициализация mtproto
        mtproto = new MTProto({
            api_id: api,
            api_hash: hash
        });

        mtproto.setDefaultDc(2);
        mtproto.setConfig({
            api_id: api,
            api_hash: hash
        });

        document.getElementById('api-hash-form').classList.add('hidden');
        document.getElementById('phone-form').classList.remove('hidden');
    } else {
        showMessage('Пожалуйста, введите API ID и Hash');
    }
}

async function sendCode() {
    const phone = document.getElementById('phone').value;

    if (phone) {
        try {
            const result = await mtproto.call('auth.sendCode', {
                phone_number: phone,
                settings: {
                    _: 'codeSettings'
                }
            });

            phone_code_hash = result.phone_code_hash; // Сохраняем phone_code_hash
            document.getElementById('phone-form').classList.add('hidden');
            document.getElementById('code-form').classList.remove('hidden');
        } catch (error) {
            console.error(error);
            showMessage('Ошибка при отправке кода');
        }
    } else {
        showMessage('Пожалуйста, введите номер телефона');
    }
}

async function verifyCode() {
    const code = document.getElementById('code').value;

    if (code) {
        try {
            const result = await mtproto.call('auth.signIn', {
                phone_number: document.getElementById('phone').value,
                phone_code_hash: phone_code_hash,
                phone_code: code
            });

            if (result._ === 'auth.authorizationSignUpRequired') {
                showMessage('Требуется регистра ция. Пожалуйста, зарегистрируйтесь.');
            } else {
                document.getElementById('code-form').classList.add('hidden');
                if (result.password) {
                    document.getElementById('password-form').classList.remove('hidden');
                } else {
                    showMessage('Аутентификация успешна!');
                }
            }
        } catch (error) {
            console.error(error);
            showMessage('Ошибка при проверке кода');
        }
    } else {
        showMessage('Пожалуйста, введите код подтверждения');
    }
}

async function submitPassword() {
    const password = document.getElementById('password').value;

    if (password) {
        try {
            const result = await mtproto.call('auth.checkPassword', {
                password: {
                    _: 'inputCheckPasswordEmpty'
                }
            });

            if (result._ === 'auth.authorization') {
                showMessage('Аутентификация успешна!');
            } else {
                showMessage('Неверный пароль');
            }
        } catch (error) {
            console.error(error);
            showMessage('Ошибка при проверке пароля');
        }
    } else {
        showMessage('Пожалуйста, введите пароль');
    }
}

function showMessage(message) {
    const messageDiv = document.getElementById('message');
    messageDiv.innerText = message;
    messageDiv.classList.remove('hidden');
}