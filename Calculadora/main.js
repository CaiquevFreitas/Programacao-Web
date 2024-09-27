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
        try{ // Serve para tratar um possivel erro
            result = eval(trocarSimbolos(visor)); // Transforma o texto em uma expressão matematica
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

function trocarSimbolos(visor){
    calculo = visor;
    calculo = calculo.replace(/%/g, "/100*");
    calculo = calculo.replace(/x/g, "*");
    calculo = calculo.replace(/÷/g, "/");
    calculo = calculo.replace(/\^/g, "**");
    return calculo;
}