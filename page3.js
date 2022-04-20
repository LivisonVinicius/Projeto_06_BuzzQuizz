let titulo, imgURL, numeroPerguntas, numeroNiveis;
let perguntasTextos, perguntasCores, perguntasRespostas;
let page3;

function carregarPagina3() {
    body.innerHTML = 
       `<header><h1>BuzzQuizz</h1></header>
        <main class="page3"></main>`
    page3 = document.querySelector(".page3");

    resetarVariaveisEtapaI();
    resetarVariaveisEtapaII();

    renderizarEtapaI();
}

function resetarVariaveisEtapaI() {
    titulo = "";
    imgURL = "";
    numeroPerguntas = 0;
    numeroNiveis = 0;
}

function resetarVariaveisEtapaII() {
    perguntasTextos = [];
    perguntasCores = []; 
    perguntasRespostasTexto = [];
    perguntasRespostasImagem = [];
}

//ETAPA I //
function renderizarEtapaI() {
    page3.innerHTML = ""
    page3.innerHTML += 
       `<div class="etapa etapa--inicial">
            <h2>Comece pelo começo</h2>
            <div class="bloco">
                <input class="titulo" type="text" placeholder="Título do seu quizz">
                <input class="img-url" type="text" placeholder="URL da imagem do seu quizz">
                <input class="numero-perguntas" type="number" placeholder="Quantidade de perguntas do quizz">
                <input class="numero-niveis" type="number" placeholder="Quantidade de níveis do quizz">
            </div>
            <div class="button button--avancar" onclick="trocarEtapaI()">Prosseguir pra criar perguntas</div>
        </div>`
}
function trocarEtapaI() {
    if (validarEtapaI()) {
        renderizarEtapaII();
    } else {
        alert("Pelo menos um dos dados inseridos não são válidos!");
    }
}
function validarEtapaI() {
    resetarVariaveisEtapaI();
    titulo = document.querySelector(".etapa--inicial .titulo").value;
    numeroPerguntas = Number(document.querySelector(".etapa--inicial .numero-perguntas").value);
    numeroNiveis = Number(document.querySelector(".etapa--inicial .numero-niveis").value);

    if (titulo.length < 20 || titulo.length > 65) {
        return false;
    } 
    // talvez criar uma função só para validar URL de imagem
    try {
        imgURL = new URL(document.querySelector(".etapa--inicial .img-url").value);
    } catch (_) {
        return false;  
    }
    if (!(/\.(jpg|jpeg|png|webp|avif|gif|svg)$/.test(imgURL))) {
        return false;
    } 
    if (numeroPerguntas < 3) {
        return false;
    } 
    if (numeroNiveis < 2) {
        return false;
    }
    return true;
}

function validarURLImagem() {
    
}


//ETAPA II //
function renderizarEtapaII() {
    page3.innerHTML = ""
    page3.innerHTML += 
       `<div class="etapa etapa--perguntas">
            <h2>Crie suas perguntas</h2>
        </div>`
    const etapa = document.querySelector(".etapa--perguntas");
    for (var i = 0 ; i < numeroPerguntas ; i ++) {
        etapa.innerHTML += 
       `<div class="bloco">
            <div class="sub-bloco">
                <h3>Pergunta ${i + 1}</h3><ion-icon onclick="selecionarPergunta(this)" name="create-outline"></ion-icon>
            </div>
            <div class="sub-bloco">
                <div class="forms forms--nome">
                    <h3>Pergunta ${i + 1}</h3>
                    <input type="text" placeholder="Texto da pergunta">
                    <input type="color" placeholder="Cor de fundo da pergunta">
                </div>
                <div class="forms forms--respostas-corretas">
                    <h3>Respostas corretas</h3>
                    <div class="forms__resposta">
                        <input type="text" placeholder="Resposta correta">
                        <input type="url" placeholder="URL da imagem">
                    </div>
                </div>
                <div class="forms forms--respostas-incorretas">
                    <h3>Respostas incorretas</h3>
                    <div class="forms__resposta">
                        <input type="text" placeholder="Resposta incorreta 1">
                        <input type="url" placeholder="URL da imagem 1">
                    </div>
                    <div class="forms__resposta">
                        <input type="text" placeholder="Resposta incorreta 2">
                        <input type="url" placeholder="URL da imagem 2">
                    </div>
                    <div class="forms__resposta">
                        <input type="text" placeholder="Resposta incorreta 3">
                        <input type="url" placeholder="URL da imagem 3">
                    </div>
                </div>
            </div>
        </div>`
    }
    etapa.innerHTML += `<div class="button button--avancar" onclick="trocarEtapaII()">Prosseguir pra criar níveis</div>`
}
function selecionarPergunta(perguntaClicada) {
    const perguntaSelecionada = document.querySelector(".etapa--perguntas .selecionado");
    if (perguntaSelecionada !== null) {
        perguntaSelecionada.classList.remove("selecionado");
    }
    perguntaClicada.closest(".bloco").classList.add("selecionado");
}
function trocarEtapaII() {
    if (validarEtapaII()) {
        renderizarEtapaIII();
    } else {
        alert("Pelo menos um dos dados inseridos não são válidos!");
    }
}
function validarEtapaII() {
    resetarVariaveisEtapaII();
    const perguntas = document.querySelectorAll(".bloco .sub-bloco:nth-of-type(2)");
    for (var i = 0 ; i < perguntas.length ; i ++) {
        const perguntaTexto = perguntas[i].querySelector(".forms--nome input:nth-of-type(1)").value;
        if (perguntaTexto.length < 20) {
            return false;
        }
        perguntasTextos.push(perguntaTexto);
        
        // descobrir como impedir que o usuário escolha uma cor parecida com a cor do texto da pergunta (branco)
        const perguntaCor = perguntas[i].querySelector(".forms--nome input:nth-of-type(2)").value;
        perguntasCores.push(perguntaCor);

        const respostaCorreta = perguntas[i].querySelector(".forms--respostas-corretas .forms__resposta");
        const respostaCorretaTexto = respostaCorreta.querySelector("input:nth-of-type(1)").value;
        let respostaCorretaImagem = respostaCorreta.querySelector("input:nth-of-type(2)").value;
        if (respostaCorretaTexto === "" || respostaCorretaImagem === "") {
            return false;
        }
        try {
            respostaCorretaImagem = new URL(respostaCorretaImagem);
        } catch (_) {
            return false;  
        }
        if (!(/\.(jpg|jpeg|png|webp|avif|gif|svg)$/.test(respostaCorretaImagem))) {
            return false;
        }
        perguntasRespostasTexto.push(respostaCorretaTexto);
        perguntasRespostasImagem.push(respostaCorretaImagem);
        
        const respostasIncorretas = perguntas[i].querySelectorAll(".forms--respostas-incorretas .forms__resposta");
        let respostaIncorretaTexto, respostaIncorretaImagem;
        for (var x = 0 ; x < respostasIncorretas.length ; x ++) {
            respostaIncorretaTexto = respostasIncorretas[x].querySelector("input:nth-of-type(1)").value;
            respostaIncorretaImagem = respostasIncorretas[x].querySelector("input:nth-of-type(2)").value;
            if (respostaIncorretaTexto === "" || respostaIncorretaImagem === "") {
                continue;
            } else {
                try {
                    respostaIncorretaImagem = new URL(respostaIncorretaImagem);
                } catch (_) {
                    return false;  
                }
                if (!(/\.(jpg|jpeg|png|webp|avif|gif|svg)$/.test(respostaIncorretaImagem))) {
                    return false;
                }
                perguntasRespostasTexto.push(respostaCorretaTexto);
                perguntasRespostasImagem.push(respostaCorretaImagem);
            }
        }
        if (perguntasRespostasTexto.length === 1 || perguntasRespostasImagem.length === 1) {
            return false;
        }
    }
    return true;
}

//ETAPA III //
function renderizarEtapaIII() {
    page3.innerHTML = ""
    page3.innerHTML += 
       `<div class="etapa etapa--niveis">
            <h2>Agora, decida os níveis!</h2>
        </div>`
    const etapa = document.querySelector(".etapa--niveis");
    for (var i = 0 ; i < numeroNiveis ; i ++) {
        etapa.innerHTML += 
       `<div class="bloco">
            <div class="sub-bloco">
                <h3>Nível ${i + 1}</h3><ion-icon onclick="selecionarNivel(this)" name="create-outline"></ion-icon>
            </div>
            <div class="sub-bloco">
                <div class="forms forms--nome">
                    <h3>Nível ${i + 1}</h3>
                    <input type="text" placeholder="Título do nível">
                    <input type="text" placeholder="% de acerto mínima">
                    <input type="url" placeholder="URL da imagem do nível">
                    <input type="text" placeholder="Descrição do nível">
                </div>
            </div>
        </div>`
    }
    etapa.innerHTML += `<div class="button button--avancar" onclick="trocarEtapaIII()">FinalizarQuiz</div>`
}
function selecionarNivel(nivelClicado) {
    const nivelSelecionado = document.querySelector(".etapa--niveis .selecionado");
    if (nivelSelecionado !== null) {
        nivelSelecionado.classList.remove("selecionado");
    }
    nivelClicado.closest(".bloco").classList.add("selecionado");
}
function trocarEtapaIII() {
    if (validarEtapaIII()) {
        renderizarEtapaIV();
    } else {
        alert("Pelo menos um dos dados inseridos não são válidos!");
    }
}

function validarEtapaIII() {
    return true;
}

//ETAPA IV //
function renderizarEtapaIV() {
    page3.innerHTML = ""
    page3.innerHTML += 
       `<div class="etapa etapa--final">
            <h2>Seu quizz está pronto!</h2>
            <div class="quizz"><img src="lofi.jpg" alt=""><div class="gradiente"></div><h3>Título do Quiz</h3></div>
            <div class="button button--avancar" onclick="trocarTela2Tela3()">Acessar Quizz</div>
            <div class="button button--retornar" onclick="carregarPagina1()">Voltar para home</div>
        </div>`
}