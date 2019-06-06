let jogadorAtual;

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

function jogadaMaquina() {
    //vez do computador fazer suas jogadas. A decisão do computador pegar mais uma carta ou não é randômica.

    jogadorAtual = cartasMaquina;

    while (somaCartas(cartasMaquina) < 10) {
        console.log("Vai pegar nova carta");
        setTimeout(novaCarta(cartasMaquina), 1000);
    }

    if (somaCartas(cartasMaquina) <= 17) {
        const decisao = Math.random();
        console.log("Talvez pega nova carta");
        if (decisao > 0.5) setTimeout(novaCarta(cartasMaquina),1000);
    }

    mostraValores();
    //finalizaJogo();
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
    verificaJogo();
}

function reload() {
    location.reload()
}

function verificaJogo() {
    if (jogadorAtual == cartasMaquina) {
        if (somaCartas(cartasMaquina) == 21) {
            document.getElementById('finalMaquina').innerHTML = "BlackJack"
        } else if (somaCartas(cartasMaquina > 21)) {
            document.getElementById('finalMaquina').innerHTML = "Passou!"
        }
    } else {
        if (somaCartas(cartasJogador) == 21) {
            document.getElementById('finalJogador').innerHTML = "BlackJack"
        } else if (somaCartas(cartasJogador > 21)) {
            document.getElementById('finalJogador').innerHTML = "Passou!"
        }
    }

}

function finalizaJogo() {

}