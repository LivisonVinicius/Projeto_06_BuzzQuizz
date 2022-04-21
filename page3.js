let numeroPerguntas, numeroNiveis;
let page3;
let quiz;

function carregarPagina3() {
    body.innerHTML = 
       `<header><h1>BuzzQuizz</h1></header>
        <main class="page3"></main>`
    page3 = document.querySelector(".page3");

    renderizarEtapaI();
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
    quiz = {
        title: "",
	    image: "",
	    questions: [],
        levels: []
    }

    quiz.title = document.querySelector(".etapa--inicial .titulo").value;
    quiz.image = document.querySelector(".etapa--inicial .img-url").value;
    numeroPerguntas = Number(document.querySelector(".etapa--inicial .numero-perguntas").value);
    numeroNiveis = Number(document.querySelector(".etapa--inicial .numero-niveis").value);

    if (quiz.title.length < 20 || quiz.title.length > 65) {
        return false;
    } 
    // talvez criar uma função só para validar URL de imagem
    let imgURL;
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
    quiz.questions = []
    const perguntas = document.querySelectorAll(".bloco .sub-bloco:nth-of-type(2)");
    for (var i = 0 ; i < perguntas.length ; i ++) {
        const question = {
            title: "",
			color: "",
			answers: []
        }
        question.title = perguntas[i].querySelector(".forms--nome input:nth-of-type(1)").value;
        if (question.title.length < 20) {
            return false;
        }
        
        // descobrir como impedir que o usuário escolha uma cor parecida com a cor do texto da pergunta (branco)
        question.color = perguntas[i].querySelector(".forms--nome input:nth-of-type(2)").value;

        let answer = {
            text: "",
			image: "",
			isCorrectAnswer: true
        }
        const respostaCorreta = perguntas[i].querySelector(".forms--respostas-corretas .forms__resposta");
        answer.text = respostaCorreta.querySelector("input:nth-of-type(1)").value;
        answer.image = respostaCorreta.querySelector("input:nth-of-type(2)").value;
        if (answer.text === "" || answer.image === "") {
            return false;
        }

        let imgURL;
        try {
            imgURL = new URL(respostaCorreta.querySelector("input:nth-of-type(2)").value);
        } catch (_) {
            return false;  
        }
        if (!(/\.(jpg|jpeg|png|webp|avif|gif|svg)$/.test(imgURL))) {
            return false;
        }
        question.answers.push(answer);
        
        const respostasIncorretas = perguntas[i].querySelectorAll(".forms--respostas-incorretas .forms__resposta");
        for (var x = 0 ; x < respostasIncorretas.length ; x ++) {
            answer = {
                text: "",
                image: "",
                isCorrectAnswer: false
            }
            answer.text = respostasIncorretas[x].querySelector("input:nth-of-type(1)").value;
            answer.image = respostasIncorretas[x].querySelector("input:nth-of-type(2)").value;
            if (answer.text === "" || answer.image === "") {
                continue;
            } else {
                let imgURL;
                try {
                    imgURL = new URL(respostasIncorretas[x].querySelector("input:nth-of-type(2)").value);
                } catch (_) {
                    return false;  
                }
                if (!(/\.(jpg|jpeg|png|webp|avif|gif|svg)$/.test(imgURL))) {
                    return false;
                }
                question.answers.push(answer);
            }
        }
        if (question.answers.length === 1) {
            return false;
        }
        quiz.questions.push(question);
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
        enviarQuiz();
    } else {
        alert("Pelo menos um dos dados inseridos não são válidos!");
    }
}

function validarEtapaIII() {
    quiz.levels = [];
    const niveis = document.querySelectorAll(".bloco .sub-bloco:nth-of-type(2)");
    let Acerto0Porcento = false;
    for (var i = 0 ; i < niveis.length ; i ++) {
        const level = {
            title: "",
            image: "",
            text: "",
            minValue: 0
        }
        level.title = niveis[i].querySelector(".forms--nome input:nth-of-type(1)").value;
        if (level.title.length < 10) {
            return false;
        }

        level.minValue = Number(niveis[i].querySelector(".forms--nome input:nth-of-type(2)").value);
        if (level.minValue < 0 || level.minValue > 100) {
            return false;
        }
        if (level.minValue === 0) {
            Acerto0Porcento = true;
        }

        level.image = niveis[i].querySelector(".forms--nome input:nth-of-type(3)").value;
        let imgURL;
        try {
            imgURL = new URL(niveis[i].querySelector(".forms--nome input:nth-of-type(3)").value);
        } catch (_) {
            return false;  
        }
        if (!(/\.(jpg|jpeg|png|webp|avif|gif|svg)$/.test(imgURL))) {
            return false;
        }

        level.text = niveis[i].querySelector(".forms--nome input:nth-of-type(4)").value;
        if (level.text .length < 30) {
            return false;
        }
        quiz.levels.push(level);
    } 
    if (Acerto0Porcento === false) {
        return false;
    }
    return true;
}

//ETAPA IV //
function renderizarEtapaIV() {
    page3.innerHTML = ""
    page3.innerHTML += 
       `<div class="etapa etapa--final">
            <h2>Seu quizz está pronto!</h2>
            <div class="quizz"><img src="${quiz.image}" alt=""><div class="gradiente"></div><h3>${quiz.title}</h3></div>
            <div class="button button--avancar" onclick="geraQuiz()">Acessar Quizz</div>
            <div class="button button--retornar" onclick="carregarPagina1()">Voltar para home</div>
        </div>`
}

function enviarQuiz() {
    const posting = axios.post("https://mock-api.driven.com.br/api/v6/buzzquizz/quizzes",quiz)
    let IDdoQuiz;
    const quizCriado = JSON.stringify(quiz);
    const promise = axios.get("https://mock-api.driven.com.br/api/v6/buzzquizz/quizzes")
    promise.then(function(response){
        IDdoQuiz = response.data[0].id
        if(localStorage.length==0 || localStorage.getItem){
            localStorage.setItem("lista",`[]`)
        }
        let conteudoStorage = JSON.parse(localStorage.getItem("lista"));
        conteudoStorage.push(IDdoQuiz);
        conteudoStorage=JSON.stringify(conteudoStorage);
        localStorage.setItem(`lista`,conteudoStorage)
    }) 
}