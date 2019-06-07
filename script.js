class Carta {
    constructor() {
        this.sorteia();
        this._aberta = true;
    }

    get valor() {return this._valor;}

    set valor(v) {this._valor = v;}

    estaAberta() {
        {return this._aberta;}
    }

    fecha() {this._aberta = false;}
    abre() {this._aberta = true;}

    sorteia() {
        var v = Math.floor(Math.random() * 13) + 1;
        if (v >= 10) this.valor = 10;
        else this.valor = v;
    }
}

//métodos auxiliares:
function somaDasCartas(vet) {
    let soma = 0;
    for (let i = 0; i < vet.length; i ++) {
        soma += vet[i].valor;
    }
    return soma;
}

//métodos da execução
function verificaSoma() {
    if (somaDasCartas(cartasJogador) == 21) {
        document.getElementById('somaJogador').innerHTML += " (BJ)";
        document.getElementById('btnPesca').style.display = "none";
    } else if (somaDasCartas(cartasJogador) > 21) {
        document.getElementById('somaJogador').innerHTML += " (Bust)";
        document.getElementById('btnPesca').style.display = "none";
    }

    if (somaDasCartas(cartasMaquina) == 21) {
        document.getElementById('somaMaquina').innerHTML += " (BJ)";
        encerraJogo();
    } else if (somaDasCartas(cartasMaquina) > 21) {
        document.getElementById('somaMaquina').innerHTML += " (Bust)";
        encerraJogo();
    }
}

function inicioJogo() {

    document.getElementById('btnComecar').style.display="none";
    document.getElementById('btnComecar').style.transition="250ms";

    document.getElementById('containerGeral').style.display="block";

    cartasJogador = new Array();
    cartasMaquina = new Array();

    cartasJogador[0] = new Carta();
    cartasJogador[1] = new Carta();

    cartasMaquina[0] = new Carta();
    cartasMaquina[1] = new Carta();
        cartasMaquina[1].fecha();
    
    mostraValores();
    verificaSoma();
}

function mostraValores() {
    for (let i = 0; i < cartasJogador.length; i ++) {
        if (cartasJogador[i].estaAberta()) {
            document.getElementById('jCarta'+i).innerHTML = cartasJogador[i].valor;
        } else {
            document.getElementById('jCarta'+i).innerHTML = 'x';
        }
    }

    for(let i = 0; i < cartasMaquina.length; i ++) {
        if (cartasMaquina[i].estaAberta()) {
            document.getElementById('mCarta'+i).innerHTML = cartasMaquina[i].valor;
        } else {
            document.getElementById('mCarta'+i).innerHTML = 'x';
        }
    }

    document.getElementById('somaJogador').innerHTML = "Soma: " + somaDasCartas(cartasJogador);
}

function pescaCarta(vet) {
    vet[vet.length] = new Carta();
    mostraValores();
    verificaSoma();
}

//jogada da máquina
function jogadaMaquina() {
    /*vez do computador fazer suas jogadas. A decisão do computador pegar ou não mais uma carta,
    depois da soma das cartas atingir 17, é randômica.*/

    console.log("Jogada do computador.");

    document.getElementById('btnPesca').style.display = "none";

    if (somaDasCartas(cartasMaquina) > 17 && somaDasCartas(cartasMaquina) <= 19) {
        const c = Math.random();
        if (c > 0.6) {
            setTimeout(cartasMaquina[1].abre(),500);
            pescaCarta(cartasMaquina);
        }
    } else {
        while (somaDasCartas(cartasMaquina) < 17) {
            setTimeout(cartasMaquina[1].abre(),500);
            pescaCarta(cartasMaquina);
        }
    }
    cartasMaquina[1].abre();
    
    document.getElementById('somaMaquina').innerHTML = "Soma: " + somaDasCartas(cartasMaquina);
    mostraValores()
    verificaSoma();

    encerraJogo();
}

function encerraJogo() {
    if (somaDasCartas(cartasJogador) <= 21 && somaDasCartas(cartasMaquina) <= 21) {
        if (somaDasCartas(cartasJogador) > somaDasCartas(cartasMaquina)) {
            document.getElementById('resultadoFinal').innerHTML = "Você venceu!";
        } else if (somaDasCartas(cartasJogador) < somaDasCartas(cartasMaquina)) {
            document.getElementById('resultadoFinal').innerHTML = "Vitória da máquina!"
        } else document.getElementById('resultadoFinal').innerHTML = "Empate!"
    } else if (somaDasCartas(cartasMaquina) > 21 && somaDasCartas(cartasJogador) <= 21) {
        document.getElementById('resultadoFinal').innerHTML = "Você venceu!";
    } else if (somaDasCartas(cartasJogador) > 21 && somaDasCartas(cartasMaquina) <= 21) {
        document.getElementById('resultadoFinal').innerHTML = "Vitória da máquina!";
    } else document.getElementById('resultadoFinal').innerHTML = "Empate!";

    document.getElementById("reiniciarJogo").style.display = "block";

    console.log("jogo encerrado");
}

