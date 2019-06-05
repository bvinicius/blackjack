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

    document.getElementById('btnComecar').style.display="none";
    document.getElementById('btnComecar').style.transition="250ms";

    document.getElementById('containerGeral').style.display="block";


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

function manter() {
    //vez do computador fazer suas jogadas. A decisão do computador pegar mais uma carta ou não é randômica.
    if (somaCartas(cartasMaquina) <= 10) novaCarta(cartasMaquina);
    else {
        const decisao = Math.random();
        if (decisao > 0.5) novaCarta(cartasMaquina);
    }
    console.log("pronto");
}

function mostraValores() {
    for (let i = 0; i < length(cartasJogador); i ++) {
        document.getElementById('jCarta'+i).innerHTML = cartasJogador[i].valor;
    }

    for (let i = 0; i < length(cartasMaquina) - 1; i ++) {
        document.getElementById('mCarta'+i).innerHTML = cartasMaquina[i].valor;
    }
}

function novaCarta(vet) {
    if (length(vet) <= 4) {
        vet[length(vet)] = new Carta();
        mostraValores();
        atualizaJogo();
    }
    resultado(vet);
}

function reload() {
    location.reload()
}

function resultado(vet) {
    if (somaCartas(vet) == 21) {
        document.getElementById('resultadoFinal').innerHTML = "BlackJack!"
        document.getElementById('btnRecomecar').style.display="block";
    } else if (somaCartas(vet) > 21) {
        document.getElementById('resultadoFinal').innerHTML = "Passou do limite!";
        document.getElementById('btnRecomecar').style.display="block";
    }
}