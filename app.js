var horasHTML = document.getElementById('horas');
var minutosHTML = document.getElementById('minutos');
var segundosHTML = document.getElementById('segundos');

var horasInt = parseInt(horasHTML.innerText);
var minutosInt = parseInt(minutosHTML.innerText);
var segundosInt = parseInt(segundosHTML.innerText);

var semMarcacoes = document.getElementById('sem-marcacoes');
var sectionMarcacoes = document.getElementById('marcacoes');
var quantidadeMarcacoes = 0;

var botaoPausarComecar = document.getElementById('pausar-comecar');

var tempoCorrendo = false;
var intervalo;

function atualizarTimer(horas,minutos,segundos) {
    horasHTML.innerText = (horas < 10 ? '0' + horas : horas);
    minutosHTML.innerText = (minutos < 10 ? '0' + minutos : minutos);
    segundosHTML.innerText = (segundos < 10 ? '0' + segundos : segundos);
}

function comecar() {
    if (tempoCorrendo) {
        return;
    }

    tempoCorrendo = true;

    intervalo = setInterval(()=>{
        if (segundosInt == 59) {

            if (minutosInt == 59) {

                if (horasInt == 59) {
                    clearInterval(intervalo);
                }

                horasInt ++;
                minutosInt = 0;
                segundosInt = 0;
                return;
            }

            minutosInt++;
            segundosInt = 0;
        }
    
        segundosInt ++;
    
        atualizarTimer(horasInt,minutosInt,segundosInt);
    },1000)
}

function pausar() {
    tempoCorrendo = false;
    clearInterval(intervalo);
}

function pausarComecar() {
    if (tempoCorrendo) {
        pausar();
        botaoPausarComecar.innerText = 'Continuar';
    } 
    
    else {
        comecar();
        botaoPausarComecar.innerText = 'Pausar';
    }
}

function marcar() {
    if (horasInt + minutosInt + segundosInt == 0) {
        return;
    }

    if (quantidadeMarcacoes == 12) {
        var marcacaoMaisAntiga = sectionMarcacoes.querySelector('p');
        if (marcacaoMaisAntiga) {
            marcacaoMaisAntiga.remove();            
        }
    } else {
        quantidadeMarcacoes++;
    }

    semMarcacoes.remove();
    sectionMarcacoes.innerHTML += `<p>${horasInt < 10 ? '0' + horasInt : horasInt}:${minutosInt < 10 ? '0' + minutosInt : minutosInt}:${segundosInt < 10 ? '0' + segundosInt : segundosInt}</p>`;
}

function zerar() {
    clearInterval(intervalo);
    tempoCorrendo = false;

    horasInt = 0;
    minutosInt = 0;
    segundosInt = 0;
    atualizarTimer(horasInt,minutosInt,segundosInt);

    sectionMarcacoes.innerHTML = "<p class='marcacoes' id='sem-marcacoes'>Sem marcações</p>"
    semMarcacoes = document.getElementById('sem-marcacoes');
    quantidadeMarcacoes = 0;
    
    botaoPausarComecar.innerText = 'Começar';
}