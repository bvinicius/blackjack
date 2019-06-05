class Carta {
    constructor() {
        this.sorteia();
    }

    get valor() {return this._valor;}

    set valor(v) {this._valor = v;}

    sorteia() {
        var v = Math.floor(Math.random() * 13) + 1;
        if (v >= 10) this.valor = 10;
        else this.valor = v;
    }
}

function inicioRodada() {
    cartasJogador = new Array();
    cartasJogador[0] = new Carta();
    cartasJogador[1] = new Carta();

    cartasMaquina = new Array();
    cartasMaquina[0] = new Carta();
    cartasMaquina[1] = new Carta();

    mostraValores();

    atualizaJogo();
}

function length(vet) {
    var cont = 0;
    for (let i = 0; vet[i] != null; i ++) {
        cont = i;
    }
    return cont + 1;
}

function somaCartas(vet) {
    let soma = 0;
    for (let i = 0; i < length(vet); i ++) {
        soma += vet[i].valor;
    }
    return soma;
}

function atualizaJogo() {
    document.getElementById('somaJogador').innerHTML = "Soma: " + somaCartas(cartasJogador);
}



function mostraValores() {
    for (let i = 0; i < length(cartasJogador); i ++) {
        document.getElementById('jCarta'+i).innerHTML = cartasJogador[i].valor;
    }

    for (let i = 0; i < length(cartasMaquina) - 1; i ++) {
        document.getElementById('mCarta'+i).innerHTML = cartasMaquina[i].valor;
    }
}

function novaCarta(vetor) {
    if (length(vetor) <= 4) {
        vetor[length(vetor)] = new Carta();
        mostraValores();
        atualizaJogo();
    }
    if (somaCartas(vetor) == 21) {
        document.getElementById('resultadoFinal').innerHTML = "BlackJack!"
        location.reload();
    }
}

