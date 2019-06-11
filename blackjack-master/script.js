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
        if (v >= 10) this._valor = 10;
        else this._valor = v;
    }
}

//métodos auxiliares:
function somaDasCartas(vet) {
    let soma = 0;
    for (let i = 0; i < vet.length; i ++) {
        soma += vet[i]._valor;
    }
    return soma;
}

function existeAs(vet) {
    for (let i = 0; i < vet.length; i ++) {
        if (vet[i]._valor == 1 || vet[i]._valor == 11) return true;
    }
}

function indiceAs(vet) {
    for (let i = 0; i < vet.length; i ++) {
        if (vet[i]._valor == 1 || vet[i]._valor == 11) return i;
    }
}

//métodos da execução
function verificaSoma() {

    
    while (existeAs() && somaDasCartas(cartasJogador) > 21) {
        let cont = 0;
        for (let i = 0; i < cartasJogador.length; i ++) {
            if (cartasJogador(i) == 11) cartasJogador[i]._valor = 1;
            cont ++;
        }
        
        if (cont == 5) break;
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

    if (existeAs(cartasJogador)) {
        let i = indiceAs(cartasJogador);
        cartasJogador[i]._valor = 1;
        if (somaDasCartas(cartasJogador) <= 21) cartasJogador[i]._valor = 11;
    }

    if (existeAs(cartasMaquina)) {
        let i = indiceAs(cartasMaquina);
        cartasMaquina[i]._valor = 1;
        if (somaDasCartas(cartasMaquina) + 10 <= 21) cartasMaquina[i]._valor = 11;
    }

    let refe = document.getElementById('jCarta0');
    refe.innerText = "";
    let refm = document.getElementById('mCarta0');
    refm.innerText = "";

    for(let i = 0; i < cartasJogador.length; i ++) {
        if (cartasJogador[i]._valor == 1 || cartasJogador[i]._valor == 11 ) refe.innerText += " |A| "
        else refe.innerText += " |" + cartasJogador[i]._valor + "| ";
    }

    for(let i = 0; i < cartasMaquina.length; i ++) {
        if (cartasMaquina[i].estaAberta()) {
            if (cartasMaquina[i]._valor == 1 || cartasMaquina[i]._valor == 11) refm.innerText += " |A| "
            else refm.innerText += " |" + cartasMaquina[i]._valor + "| ";
        } else {
            document.getElementById('mCarta0').innerText += ' |X|';
        }
    }

    if (existeAs(cartasJogador)) {
        let s = somaDasCartas(cartasJogador);
        if ((s + 10) >= 21) document.getElementById('somaJogador').innerHTML = "Pontuação: " + s;
        else document.getElementById('somaJogador').innerHTML = "Pontuação: " + s + "/" + (s + 10);
    } else {
        document.getElementById('somaJogador').innerHTML = "Pontuação: " + somaDasCartas(cartasJogador);
    }
}

function pescaCarta(vet) {
    vet[vet.length] = new Carta();
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
    
    mostraValores();
    verificaSoma();
}

//jogada da máquina
function jogadaMaquina() {
    /*vez do computador fazer suas jogadas. A decisão do computador pegar ou não mais uma carta,
    depois da soma das cartas atingir 17, é randômica.*/
    cartasMaquina[1].abre();

    verificaSoma();

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
        
    document.getElementById('somaMaquina').innerHTML = "Pontuação: " + somaDasCartas(cartasMaquina);

    let ref = document.getElementById('mCarta0');
    ref.innerText = "";
    for(let i = 0; i < cartasMaquina.length; i ++) {
        ref.innerText += " |" + cartasMaquina[i]._valor + "| " ;
    }

    mostraValores();
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

    document.getElementById("reiniciarJogo").style.display = "flex";
    document.getElementById("btnJogadaMaqunia").style.display = "none";
    document.getElementById("btnPesca").style.display = "none";
}

