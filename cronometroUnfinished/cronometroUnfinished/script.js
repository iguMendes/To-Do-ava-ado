//funções
var temporizador

function iniciarTemporizador(horas, minutos, segundos) {
    var temporizadorContagem = document.getElementById('temporizador-contagem');

    var tempoRestante = horas * 3600 + minutos * 60 + segundos;
        temporizador = setInterval(function() {
        horas = Math.floor(tempoRestante / 3600);
        minutos = Math.floor((tempoRestante % 3600) / 60);
        segundos = tempoRestante % 60;

        // Atualizar o conteúdo do elemento com a contagem regressiva
        temporizadorContagem.textContent = horas + ' horas, ' + minutos + ' minutos, ' + segundos + ' segundos';

        if (--tempoRestante < 0) {
            clearInterval(temporizador);
            temporizadorContagem.textContent = 'Temporizador encerrado!';
        }
    }, 1000);
}

function pararTemp(){
    clearInterval(temporizador)
}

//eventos
document.getElementById('temporizador-form').addEventListener('submit', function(event) {
    event.preventDefault(); // Evita o envio do formulário

    // Obter os valores dos campos de entrada
    var horas = parseInt(document.getElementById('horas').value);
    var minutos = parseInt(document.getElementById('minutos').value);
    var segundos = parseInt(document.getElementById('segundos').value);

    // Iniciar o temporizador
    iniciarTemporizador(horas, minutos, segundos);
});

document.getElementById('parar').addEventListener('click', function(e){
    e.preventDefault()
    pararTemp()
})

