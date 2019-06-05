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

function inicio() {
    var cartasJogador = new Array();
    cartasJogador[0] = new Carta();
    cartasJogador[1] = new Carta();

    for (let i = 0; i < length(cartasJogador); i ++) {
        document.getElementById('jCarta'+i).innerHTML = cartasJogador[i].valor;
    }

    var cartasMaquina = new Array();
    cartasMaquina[0] = new Carta();
    cartasMaquina[1] = new Carta();

    for (let i = 0; i < length(cartasMaquina); i ++) {
        document.getElementById('mCarta'+i).innerHTML = cartasMaquina[i].valor;
    }

    document.getElementById('somaJogador').innerHTML = "Soma: " + somaCartas(cartasJogador);
    document.getElementById('somaMaquina').innerHTML = "Soma: " + somaCartas(cartasMaquina);
}

function length(a) {
    var cont = 0;
    for (let i = 0; a[i] != null; i ++) {
        cont = i;
    }
    return cont + 1;
}

function somaCartas(a) {
    let soma = 0;
    for (let i = 0; i < length(a); i ++) {
        soma += a[i].valor;
    }
    return soma;
}



