class Baralho {
    constructor() {
       this.cartas = [];

        for (let i = 1; i <= 13; i ++) {
            for (let j = 1; j <= 4; j ++) {
                if (i > 10) this.cartas.push(10);
                else this.cartas.push(i);
            }
        }
    }

    removeCarta() {
        let r = getRandom(0, this.cartas.length-1);
        let cartaEscolhida = this.cartas[r];
        this.cartas.splice(r, 1);
        return cartaEscolhida;
    }
}

let b1 = new Baralho();

class Carta {
    constructor() {
        this._aberta = true;
        this._valor = b1.removeCarta();
    }

    get valor() {return this._valor;}

    set valor(v) {this._valor = v;}

    estaAberta() {
        {return this._aberta;}
    }

    fecha() {this._aberta = false;}
    abre() {this._aberta = true;}

}

//métodos auxiliares:

function getRandom(min, max) {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min + 1)) + min;
}

function somaDasCartas(vet) {
    let soma = 0;
    for (let i = 0; i < vet.length; i ++) {
        soma += vet[i].valor;
    }
    return soma;
}

function existeAs(vet) {
    let cont = 0;
    for (let i = 0; i < vet.length; i ++) {
        if (vet[i].valor == 1 || vet[i].valor == 11) cont ++;
    }
    return cont > 0;
}

function indiceAs(vet) {
    for (let i = 0; i < vet.length; i ++) {
        if (vet[i].valor == 1 || vet[i].valor == 11) return i;
    }
}

function cartasEstaoAbertas(vet) {
    let cont = 0;
    for (let i = 0; i < vet.length; i ++) {
        if (!(vet[i].estaAberta())) cont ++;
    }
    return cont == 0;
}

//métodos da execução
function verificaSoma() {

    if (existeAs(cartasJogador)) {
        let i = indiceAs(cartasJogador);
        cartasJogador[i].valor = 1;
        if (somaDasCartas(cartasJogador) + 10 <= 21) cartasJogador[i].valor = 11;
    }

    if (existeAs(cartasMaquina)) {
        let i = indiceAs(cartasMaquina);
        cartasMaquina[i].valor = 1;
        if (somaDasCartas(cartasMaquina) + 10 <= 21) cartasMaquina[i].valor = 11;
    }

    if (somaDasCartas(cartasJogador) == 21) {
        document.getElementById('somaJogador').innerHTML += " (BJ)";
        document.getElementById('btnPesca').style.display = "none";
        encerraJogo();
    } else if (somaDasCartas(cartasJogador) > 21) {
        document.getElementById('somaJogador').innerHTML += " (Bust)";
        document.getElementById('btnPesca').style.display = "none";
        encerraJogo();
    }

    if (somaDasCartas(cartasMaquina) == 21) {
        document.getElementById('somaMaquina').innerHTML += " (BJ)";
        encerraJogo();
    } else if (somaDasCartas(cartasMaquina) > 21) {
        document.getElementById('somaMaquina').innerHTML += " (Bust)";
        encerraJogo();
    }
}

function mostraValores() {

    let refe = document.getElementById('jCarta');
    refe.innerText = "";
    let refm = document.getElementById('mCarta');
    refm.innerText = "";

    document.getElementById('somaJogador').innerText = "";
    document.getElementById('somaMaquina').innerText = "";

    for(let i = 0; i < cartasJogador.length; i ++) {
        if (cartasJogador[i].valor == 1 || cartasJogador[i].valor == 11 ) refe.innerText += " |A| "
        else refe.innerText += " |" + cartasJogador[i]._valor + "| ";
    }

    for(let i = 0; i < cartasMaquina.length; i ++) {
        if (cartasMaquina[i].estaAberta()) {
            if (cartasMaquina[i].valor == 1 || cartasMaquina[i].valor == 11) refm.innerText += " |A| "
            else refm.innerText += " |" + cartasMaquina[i]._valor + "| ";
        } else {
            document.getElementById('mCarta').innerText += ' |X|';
        }
    }

    if (existeAs(cartasJogador)) {
        let s = somaDasCartas(cartasJogador);
        if (cartasJogador[indiceAs(cartasJogador)].valor == 1) {
            if ((s + 10) >= 21) document.getElementById('somaJogador').innerHTML = "Pontuação: " + s;
            else document.getElementById('somaJogador').innerHTML = "Pontuação: " + s + "/" + (s + 10);
        } else if (cartasJogador[indiceAs(cartasJogador)].valor == 11) {
            if ((s + 10) >= 21) document.getElementById('somaJogador').innerHTML = "Pontuação: " + s + "/" + (s - 10);
            else document.getElementById('somaJogador').innerHTML = "Pontuação: " + s;
        }
        
    } else {
        document.getElementById('somaJogador').innerHTML = "Pontuação: " + somaDasCartas(cartasJogador);
    }

    if (cartasEstaoAbertas(cartasMaquina)){
        document.getElementById('somaMaquina').innerText = "Pontuação: " + somaDasCartas(cartasMaquina);
    }
}

function pescaCarta(vet) {
    vet[vet.length] = new Carta();

    verificaSoma();
    mostraValores();
    verificaSoma();

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
    
    verificaSoma();
    mostraValores();
    verificaSoma();
}

//jogada da máquina

function jogadaMaquina() {
    /*vez do computador fazer suas jogadas. A decisão do computador pegar ou não mais uma carta,
    depois da soma das cartas atingir 17, é randômica.*/
    cartasMaquina[1].abre();

    if (somaDasCartas(cartasMaquina) <= somaDasCartas(cartasJogador)) {
        document.getElementById('btnPesca').style.display = "none";
    
        if (somaDasCartas(cartasMaquina) >= 17 && somaDasCartas(cartasMaquina) <= 19  ) {
            const c = Math.random();
            if (c > 0.6) {
                pescaCarta(cartasMaquina);
            }
        } else {
            while (somaDasCartas(cartasMaquina) < 17) {
                pescaCarta(cartasMaquina);
            }
        }
    }

    verificaSoma();
    mostraValores();
    verificaSoma();
    encerraJogo();
}

function encerraJogo() {
    document.getElementById('btnPesca').style.display = "none";
    document.getElementById('stopBtn').style.display = "none";
        cartasMaquina[1].abre();
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

    document.getElementById("reiniciarJogo").style.display = "flex";
    document.getElementById("btnJogadaMaqunia").style.display = "none";
}

function stop () {
    encerraJogo();
    document.getElementById('resultadoFinal').innerText = " Jogo Finalizado !"
    document.getElementById("reiniciarJogo").style.display = "flex";
    document.getElementById("j1").style.display = "none";
    document.getElementById("m1").style.display = "none";
}

