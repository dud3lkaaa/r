async function checkApiHash() {
    const api  = document.getElementById('api').value;
    const hash = document.getElementById('hash').value;

    if (api && hash) {
        mtproto.setDefaultDc(2);
        mtproto.setConfig({
            api_id: api,
            api_hash: hash
        });

        document.getElementById('api-hash-form').classList.add('hidden');
        document.getElementById('phone-form').classList.remove('hidden');
    } else {
        showMessage('Пожалуйста, введите API и Hash');
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

            window.phone_code_hash = result.phone_code_hash;
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
                phone_code_hash: window.phone_code_hash,
                phone_code: code
            });

            if (result._ === 'auth.authorizationSignUpRequired') {
                showMessage('Требуется регистрация');
            } else {
                document.getElementById('code-form').classList.add('hidden');
                document.getElementById('password-form').classList.remove('hidden');
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
            const result = await mtproto.call('account.getPassword');

            const { srp_id, current_algo, srp_B } = result;
            const { g, p, salt1, salt2 } = current_algo;

            const { getSRPParams } = await import('telegram-mtproto/lib/srp');
            const { A, M1 } = getSRPParams({
                g,
                p,
                salt1,
                salt2,
                gB: srp_B,
                password
            });

            const authResult = await mtproto.call('auth.checkPassword', {
                password: {
                    _: 'inputCheckPasswordSRP',
                    srp_id,
                    A,
                    M1
                }
            });

            showMessage('Аутентификация успешна');
            // Здесь вы можете добавить код для работы с клиентом Telegram
        } catch (error) {
            console.error(error);
            showMessage('Ошибка при отправке пароля');
        }
    } else {
        showMessage('Пожалуйста, введите пароль');
    }
}