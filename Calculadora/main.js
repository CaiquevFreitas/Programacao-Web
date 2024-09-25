let visor = ""
let calculo = "";
let parents = true;
function principal(button){
    limpar(button);
    mostrarValores(button);
    parenteses(button);
    calcular(button);
}

function mostrarValores(button){
    if(button != "C" && button != "=" && button != "p"){
        visor  += button;
        document.getElementById("visor").innerHTML += button;
    }
}

function limpar(button){
    if(button == "C"){
        document.getElementById("visor").innerHTML = "";
        visor = "";
    }
}

function calcular(button){
    if(button == "="){
        calculo = visor;
        porcentagem();
        try{ // Serve para tratar um possivel erro
            result = eval(calculo); //transforma o texto em uma expressão matematica
            document.getElementById("visor").innerHTML = result;
            visor = result;
            calculo = result;
        }catch(erro){
            document.getElementById("visor").innerHTML = "Erro na expressão: " + erro.message;
        }
    }
}

function parenteses(button){
    if(button == "p"){
        if(parents){
        visor += "(";
        document.getElementById("visor").innerHTML += "(";
        parents = !parents;
        }
        else{
            visor += ")";
            document.getElementById("visor").innerHTML += ")";
            parents = !parents;
        }
    }
}

function porcentagem(){
    for(let i = 0 ; i < calculo.length; i++){
        if(calculo[i] == "%"){
            let num1 = Number(calculo[i-2] + calculo[i-1]);
            let total = Number(calculo[i+1] + calculo[i+2]);
            let percento = num1 / 100;
            calculo[i] = percento * total;
            calculo[i-1] = " ";
            calculo[i+1] = " ";
            calculo[i-2] = " ";
            calculo[i+2] = " ";
        }
    }

}