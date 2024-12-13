const token = '7607100259:AAHzbg3vQsFjkKRO_JNI-lUx2NKfjHPsV5w';
const apiUrl = `https://api.telegram.org/bot${token}/METHOD`;

fetch(apiUrl)
    .then(response => response.json())
    .then(data => console.log(data))
    .catch(error => console.error('Ошибка:', error));