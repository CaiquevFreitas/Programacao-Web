let simbEsc;
let posJogada = [2,2,2,2,2,2,2,2,2];
let img = ["<img src='img/x.png'>", "<img src='img/o.png'>"];
let jogEsc = document.getElementById("cabeçalho");
function inicio(escolha){
        jogEsc.innerHTML = img[escolha];
        simbEsc = escolha;
}

function jogada(id){
    document.getElementById(id).innerHTML = img[simbEsc];
    if(simbEsc == 0){
        simbEsc = 1;
        jogEsc.innerHTML = img[simbEsc];
        document.getElementById(id).style.padding = '40px';
    }else if(simbEsc == 1){
        simbEsc = 0;
        jogEsc.innerHTML = img[simbEsc];
        document.getElementById(id).style.padding = '40px';
    }
}

function ganhador(pos){

}