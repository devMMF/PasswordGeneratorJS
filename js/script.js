$(document).ready(() => {
    $('#uppercase-check, #number-check, #symbol-check').change(() => generatorPassword());

    $('#copy').click(() => copyPassword());

    $('#generate, #btn-generate-password, #password-size').click(() => generatorPassword());

    $('#password-size').change(() => $('#password-text-size').text($('#password-size').val()));

    generatorPassword();
});

function generatorPassword() {
    let size = $('#password-size').val();

    let characters = 'abcdefghijklmnopqrstuvwxyz';
    let uppercase = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
    let number = '0123456789';
    let symbol = '!@#$%&*?';

    characters += $('#uppercase-check').is(':checked') ? uppercase : '';
    characters += $('#number-check').is(':checked') ? number : '';
    characters += $('#symbol-check').is(':checked') ? symbol : '';


    let password = '';
    for (let i = 0; i < size; i++) {
        password += characters.charAt(Math.floor(Math.random() * characters.length));
    }

    $('#password').val(password);
    calculateQualityPassword();
    calculateFontSize();
}

function calculateQualityPassword() {
    let password = $('#password').val();
    let percent = Math.round(
        (password.length / 64) * 25 + 
        ($('#uppercase-check').is(':checked') ? 15 : 0) +
        ($('#number-check').is(':checked') ? 25 : 0) +
        ($('#symbol-check').is(':checked') ? 35 : 0)
    );

    $('#indicator-bar').css('width', percent + '%');

    switch (true) {
        case percent >= 70:
            $('#indicator-bar').addClass('verde').removeClass('amarelo laranja vermelho');
            break;
        case percent >= 50:
            $('#indicator-bar').addClass('amarelo').removeClass('verde laranja vermelho');
            break;
        case percent >= 30:
            $('#indicator-bar').addClass('laranja').removeClass('verde amarelo vermelho');
            break;
        default:
            $('#indicator-bar').addClass('vermelho').removeClass('verde amarelo laranja');
            break;
    }

    percent >= 100 ? $('#indicator-bar').addClass('completa') : $('#indicator-bar').removeClass('completa');
}

function calculateFontSize() {
    let size = $('#password-size').val();
    switch (true) {
        case size > 45:
            $('#password').addClass('font-xxs').removeClass('font-xs font-sm');
            break;
        case size > 32:
            $('#password').addClass('font-xs').removeClass('font-xxs font-sm');
            break;
        case size > 24:
            $('#password').addClass('font-sm').removeClass('font-xxs font-xs');
            break;
        default:
            $('#password').removeClass('font-xxs font-xs font-sm');
            break;
    }
}

function copyPassword() {
    navigator.clipboard.writeText($('#password').val());
}