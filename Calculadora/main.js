let visor = ""
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
        result = eval(visor); //transforma o texto em uma expressão matematica
        document.getElementById("visor").innerHTML = result;
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