const principal = document.getElementById('principal');
const div_svg = document.getElementsByClassName('svg')[0];
var Menu = document.getElementsByClassName('menu-esquerda')[0];
var linhaY = 70;
var linhaX = '50%';
var elementoX;
var elementoY;
var linha = true;
var Decisao = false;
var linhaObj;
var final = false;
var RespostaCaixas = "";
var RespostaTextos = "";
var Decisoes = [];
var DecisoesPosicoes = [];
var respostaCaixaId = [];
var linhaCaixaId = [];
var respostaTextosId = [];
var caixaIdAtual = 0;
var textoIdAtual = 0;
var posicoesTextos = [];
var caixas = document.getElementsByClassName('caixa');
var textos = document.getElementsByClassName('texto');


//funções para a linha
function criaLinha(e){
    if(linha){
        if(e.target.id == 'principal'){
            linhaObj = document.createElementNS("http://www.w3.org/2000/svg", 'line');
            if(!Decisao){
                linhaObj.setAttribute("x1", linhaX);
                linhaObj.setAttribute("y1", linhaY);
            }
            else{
                linhaObj.setAttribute("x1", linhaX);
                linhaObj.setAttribute("y1", linhaY);
            }
            X = (((e.clientX-Menu.offsetWidth)/div_svg.offsetWidth)*100)+"%";
            Y = ((e.clientY/div_svg.offsetHeight)*100)+"%";
            linhaObj.setAttribute("x2", X);
            linhaObj.setAttribute("y2", Y);
            linhaObj.setAttribute("id", "linha-" + caixaIdAtual);
            linhaObj.setAttribute("class", "nova-linha");
            principal.appendChild(linhaObj);
        }
    }
}

function linhaSegue(e){
    if(e.target.id == 'principal'){
        if(linha){
            if(linhaObj === undefined){
                criaLinha();
            }
            X = (((e.clientX-Menu.offsetWidth)/div_svg.offsetWidth)*100)+"%";
            Y = ((e.clientY/div_svg.offsetHeight)*100)+"%";
            linhaObj.setAttribute("x2", X);
            linhaObj.setAttribute("y2", Y);
            principal.appendChild(linhaObj);
        }
    }
    else{
        linhaSome(e);
    }
}

function linhaSome(e){
    if(linha){
        if(linhaObj !== undefined){
            linhaObj.remove();
        }
    }
}

function salvaXY(e){
    if(linha){
        linha = false;
        X = (((e.clientX-Menu.offsetWidth)/div_svg.offsetWidth)*100)+"%";
        Y = ((e.clientY/div_svg.offsetHeight)*100)+"%";
        linhaObj.setAttribute("x2", X);
        linhaObj.setAttribute("y2", Y);
        elementoX = X;
        elementoY = Y;
    }
}

principal.addEventListener("mouseenter", criaLinha);
principal.addEventListener("mousemove", linhaSegue);
principal.addEventListener("mouseleave", linhaSome);

//end funções para a linha

function adicionaCaixa(e){
    if(!linha){
        if(final){
            alert('O fluxograma foi finalizado, logo você não pode adicionar uma nova caixa.');
            return ;
        }
        var caixa = e.target.parentElement.id;
        switch(caixa){
            //1 = processamento, 2 = entrada, 3 = saida, 4 = decisão (abre "array" com o conteudo dele), 5 = fim
            //#region case processamento
                case "processamento":
                    //create svg
                    var X = (parseFloat(elementoX.replace('%', '')) - ((55/div_svg.offsetWidth)*100) ) + "%";
                    var Y = (parseFloat(elementoY.replace('%', '')) - ((5/div_svg.offsetHeight)*100) ) + "%";

                    svg = document.createElementNS("http://www.w3.org/2000/svg", 'svg');
                    svg.setAttribute("x", X);
                    svg.setAttribute("y", Y);
                    svg.setAttribute("width", "110");
                    svg.setAttribute("height", "50");
                    svg.setAttribute("id", "caixa-"+ caixaIdAtual++);
                    svg.setAttribute("class", "nova-caixa");
    
                    //throw svg in svg
                    principal.appendChild(svg);
    
                    //create box and set it's properties
                    processamento = document.createElementNS("http://www.w3.org/2000/svg", 'rect');
                    processamento.setAttribute("width", "100");
                    processamento.setAttribute("height", "40");
                    processamento.setAttribute("x", "5");
                    processamento.setAttribute("y", "5");
    
                    //throw box in svg
                    svg.appendChild(processamento);
    
                    //create text and set it's properties
                    text = document.createElementNS("http://www.w3.org/2000/svg", 'text');
                    text.setAttribute("x", "55");
                    text.setAttribute("y", "22.5");
                    posicoesTextos.push([svg, text]);

                    //reset line
                    linha = true;
                    linhaCaixaId.push([linhaX, linhaY]);
                    linhaX = elementoX;
                    linhaY = (parseFloat(elementoY.replace('%', '')) + ((40/div_svg.offsetHeight)*100) ) + "%";
                    respostaCaixaId.push(RespostaCaixas);
                    RespostaCaixas += "1;";
                break;
            //#endregion
            //#region case entrada
                case "entrada":
                    //create svg
                    var X = (parseFloat(elementoX.replace('%', '')) - ((55/div_svg.offsetWidth)*100) ) + "%";
                    var Y = (parseFloat(elementoY.replace('%', '')) - ((30/div_svg.offsetHeight)*100) ) + "%";

                    svg = document.createElementNS("http://www.w3.org/2000/svg", 'svg');
                    svg.setAttribute("x", X);
                    svg.setAttribute("y", Y);
                    svg.setAttribute("width", "110");
                    svg.setAttribute("height", "135");
                    svg.setAttribute("id", "caixa-"+ caixaIdAtual++);
                    svg.setAttribute("class", "nova-caixa");
    
                    //throw svg in svg
                    principal.appendChild(svg);
    
                    //create box and set it's properties
                    entrada = document.createElementNS("http://www.w3.org/2000/svg", 'path');
                    entrada.setAttribute("d", "M 5 40 L 105 20 L 105 80 L 5 80 L 5 40 Z");
    
                    //throw box in svg
                    svg.appendChild(entrada);
    
                    //create text and set it's properties
                    text = document.createElementNS("http://www.w3.org/2000/svg", 'text');
                    text.setAttribute("x", "55");
                    text.setAttribute("y", "55");
                    posicoesTextos.push([svg, text]);

                    //reset line
                    linha = true;
                    linhaCaixaId.push([linhaX, linhaY]);
                    linhaX = elementoX;
                    linhaY = (parseFloat(elementoY.replace('%', '')) + ((50/div_svg.offsetHeight)*100) ) + "%";
                    respostaCaixaId.push(RespostaCaixas);
                    RespostaCaixas += "2;";
                break;
            //#endregion            
            //#region case saida
                case "saida":
                    //create svg
                    var X = (parseFloat(elementoX.replace('%', '')) - ((75/div_svg.offsetWidth)*100) ) + "%";
                    var Y = (parseFloat(elementoY.replace('%', '')) - ((5/div_svg.offsetHeight)*100) ) + "%";

                    svg = document.createElementNS("http://www.w3.org/2000/svg", 'svg');
                    svg.setAttribute("x", X);
                    svg.setAttribute("y", Y);
                    svg.setAttribute("width", "150");
                    svg.setAttribute("height", "105");
                    svg.setAttribute("id", "caixa-"+ caixaIdAtual++);
                    svg.setAttribute("class", "nova-caixa");

                    //throw svg in svg
                    principal.appendChild(svg);

                    //create box and set it's properties
                    saida = document.createElementNS("http://www.w3.org/2000/svg", 'path');
                    saida.setAttribute("d", "M 50 5 Q 5 30 50 55 L 125 55 Q 140 30 125 5 L 50 5 Z");

                    //throw box in svg
                    svg.appendChild(saida);

                    //create text and set it's properties
                    text = document.createElementNS("http://www.w3.org/2000/svg", 'text');
                    text.setAttribute("x", "75");
                    text.setAttribute("y", "30");
                    posicoesTextos.push([svg, text]);

                    //reset line
                    linha = true;
                    linhaCaixaId.push([linhaX, linhaY]);
                    linhaX = elementoX;
                    linhaY = (parseFloat(elementoY.replace('%', '')) + ((50/div_svg.offsetHeight)*100) ) + "%";
                    respostaCaixaId.push(RespostaCaixas);
                    RespostaCaixas += "3;";
                break;
            //#endregion
            //#region case decisão
                case "decisão":
                    //create svg
                    var X = (parseFloat(elementoX.replace('%', '')) - ((45/div_svg.offsetWidth)*100) ) + "%";
                    var Y = (parseFloat(elementoY.replace('%', '')) - ((5/div_svg.offsetHeight)*100) ) + "%";

                    svg = document.createElementNS("http://www.w3.org/2000/svg", 'svg');
                    svg.setAttribute("x", X);
                    svg.setAttribute("y", Y);
                    svg.setAttribute("width", "90");
                    svg.setAttribute("height", "90");
                    svg.setAttribute("id", "caixa-"+ caixaIdAtual++);
                    svg.setAttribute("class", "nova-caixa");

                    //throw svg in svg
                    principal.appendChild(svg);

                    //create box and set it's properties
                    decisao = document.createElementNS("http://www.w3.org/2000/svg", 'path');
                    decisao.setAttribute("d", "M5 45 L45 5 L85 45 L45 85 Z");

                    //throw box in svg
                    svg.appendChild(decisao);

                    //create text and set it's properties
                    text = document.createElementNS("http://www.w3.org/2000/svg", 'text');
                    text.setAttribute("x", "45");
                    text.setAttribute("y", "45");
                    posicoesTextos.push([svg, text]);

                    //create V and F
                    V = document.createElementNS("http://www.w3.org/2000/svg", 'text');
                    V.setAttribute("x", "85");
                    V.setAttribute("y", "35");
                    V.textContent = "V";
                    F = document.createElementNS("http://www.w3.org/2000/svg", 'text');
                    F.setAttribute("x", "5");
                    F.setAttribute("y", "35");
                    F.textContent = "F";

                    //throw text in svg
                    svg.appendChild(V);
                    svg.appendChild(F);

                    //reset line
                    linha = true;
                    linhaCaixaId.push([linhaX, linhaY]);
                    respostaCaixaId.push(RespostaCaixas);
                    RespostaCaixas += "4:{[";
                    Decisoes.push([caixaIdAtual - 1, true]);
                    linhaX = (parseFloat(elementoX.replace('%', '')) - ((40/div_svg.offsetWidth)*100) ) + "%";
                    linhaY = (parseFloat(elementoY.replace('%', '')) + ((40/div_svg.offsetHeight)*100) ) + "%";
                    DecisoesPosicoes.push([caixaIdAtual - 1, (parseFloat(elementoX.replace('%', '')) + ((40/div_svg.offsetWidth)*100) ) + "%", (parseFloat(elementoY.replace('%', '')) + ((40/div_svg.offsetHeight)*100) ) + "%"]);
                break;
            //#endregion
            //#region case fim
                case "fim":
                    //create svg
                    var X = (parseFloat(elementoX.replace('%', '')) - ((55/div_svg.offsetWidth)*100) ) + "%";
                    var Y = (parseFloat(elementoY.replace('%', '')) - ((10/div_svg.offsetHeight)*100) ) + "%";

                    svg = document.createElementNS("http://www.w3.org/2000/svg", 'svg');
                    svg.setAttribute("x", X);
                    svg.setAttribute("y", Y);
                    svg.setAttribute("width", "110");
                    svg.setAttribute("height", "70");
                    svg.setAttribute("id", "caixa-"+ caixaIdAtual++);
                    svg.setAttribute("class", "nova-caixa");

                    //throw svg in svg
                    principal.appendChild(svg);

                    //create box and set it's properties
                    fim = document.createElementNS("http://www.w3.org/2000/svg", 'ellipse');
                    fim.setAttribute("class", "final");
                    fim.setAttribute("cx", "55");
                    fim.setAttribute("cy", "33");
                    fim.setAttribute("rx", "50");
                    fim.setAttribute("ry", "30");

                    //throw box in g
                    svg.appendChild(fim);

                    //create text and set it's properties
                    text = document.createElementNS("http://www.w3.org/2000/svg", 'text');
                    text.setAttribute("x", "55");
                    text.setAttribute("y", "35");
                    text.textContent = "Fim";

                    //throw text in svg
                    svg.appendChild(text);

                    //change end var to true
                    linhaCaixaId.push([linhaX, linhaY]);
                    respostaCaixaId.push(RespostaCaixas);
                    RespostaCaixas += "5;";
                    if(Decisoes.length > 0){
                        for (let index = Decisoes.length-1; index >= 0; index--) {
                            if(Decisoes[index][1]){
                                Decisoes[index][1] = false;
                                RespostaCaixas += "],[";
                                linha = true;
                                linhaX = DecisoesPosicoes[index][1];
                                linhaY = DecisoesPosicoes[index][2];
                                break;
                            }
                            else{
                                Decisoes.splice(index, 1);
                                DecisoesPosicoes.splice(index, 1);
                                RespostaCaixas += "]}";
                            }
                        }
                        if(Decisoes.length == 0){
                            final = true;
                        }
                    }
                    else{
                        final = true;
                    }
                break;
            //#endregion
        }
    }
    else{
        alert('Antes selecione a posição da caixa.');
    }
}

function removerCaixa(e){
    var id = e.target.parentNode.id.replace("caixa-", "");
    RespostaCaixas = respostaCaixaId[id];
    linhaX = linhaCaixaId[id][0];
    linhaY = linhaCaixaId[id][1];
    linhaCaixaId.splice(id);
    linha = true;
    final = false;
    var caixas = document.getElementsByClassName('nova-caixa');
    var linhas = document.getElementsByClassName('nova-linha');
    var textos = document.getElementsByClassName('novo-texto');
    for(var i = caixaIdAtual-1; i >= id; i--){
        caixas[i].parentNode.removeChild(caixas[i]);
        linhas[i].parentNode.removeChild(linhas[i]);
        posicoesTextos.splice(i, 1);
        var d = Decisoes.find((element) => {
            return element[0] == id;
        });
        var dp = DecisoesPosicoes.find((element) => {
            return element[0] == id;
        });
        if(d !== undefined){
            Decisoes.splice(Decisoes.findIndex((element) => {
                element[0] == d[0][0];
            }), 1);
            DecisoesPosicoes.splice(DecisoesPosicoes.findIndex((element) => {
                element[0] == dp[0][0];
            }), 1);
        }
        if(textos[i] !== undefined){
            textos[i].parentNode.removeChild(textos[i]);
        }
    }
    linhaAtual = document.getElementById("linha-"+caixaIdAtual);
    if(linhaAtual !== null){
        linhaAtual.parentNode.removeChild(linhaAtual);
    }
    caixaIdAtual = id;
    if(textoIdAtual > id){
        textoIdAtual = id;
    }
}

function adicionaTexto(e){
    if(posicoesTextos.length > textoIdAtual){
        var svg = posicoesTextos[textoIdAtual][0];
        var text = posicoesTextos[textoIdAtual][1];
        text.textContent = e.target.parentNode.dataset.texto;
        text.setAttribute('class', 'novo-texto');
        text.setAttribute('id', 'texto-'+textoIdAtual);
        svg.appendChild(text);
        textoIdAtual++;
    }
    else{
        if(final)
        {
            alert('Você já finalizou o fluxograma!');
        }
        else{
            alert('Antes de adicionar um novo texto adicione uma caixa!');
        }
    }
}

function removerTexto(e){
    console.log(e.target);
    var id = e.target.id.replace("texto-", "");
    var textos = document.getElementsByClassName('novo-texto');
    for(var i = textoIdAtual - 1; i >= id; i--){
        textos[i].parentNode.removeChild(textos[i]);
    }
    textoIdAtual = id;
}

for(var i = 0; i < caixas.length; i++) {
    caixas[i].addEventListener("mouseup", adicionaCaixa);
}

for(var i = 0; i < textos.length; i++) {
    textos[i].addEventListener("mouseup", adicionaTexto);
}

div_svg.addEventListener("click", function(e) {
    if(e.target && e.target.className.baseVal == 'novo-texto'){
        removerTexto(e);
    }
	else if(e.target && e.target.parentNode.className.baseVal == "nova-caixa") {
		removerCaixa(e);
    }
});

principal.addEventListener("mouseup", function(e){
    if(e.target && (e.target.className.baseVal == "principal" || e.target.parentNode.className.baseVal == "principal")){
        salvaXY(e);
    }
})