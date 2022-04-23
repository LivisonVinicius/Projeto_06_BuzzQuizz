let numeroPerguntas, numeroNiveis;
let page3;
let quiz;

function carregarPagina3() {
    body.innerHTML = 
       `<header><h1 onclick="carregarPagina1()">BuzzQuizz</h1></header>
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
                <input class="titulo" type="text" placeholder="Título do seu quizz"><p></p>
                <input class="img-url" type="text" placeholder="URL da imagem do seu quizz"><p></p>
                <input class="numero-perguntas" type="number" placeholder="Quantidade de perguntas do quizz"><p></p>
                <input class="numero-niveis" type="number" placeholder="Quantidade de níveis do quizz"><p></p>
            </div>
            <div class="button button--avancar" onclick="trocarEtapaI(this)">Prosseguir pra criar perguntas</div>
        </div>`
}
function trocarEtapaI(bloco) {
    if (validarEtapaI(bloco)) {
        renderizarEtapaII();
        if  (edicao === true) {
            editarEtapaII();
        }
    } else {
        alert("Pelo menos um dos dados inseridos não são válidos!");
    }
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
                    <input type="text" placeholder="Texto da pergunta"><p></p>
<<<<<<< HEAD
                    <input type="color" value="#EC362D" placeholder="Cor de fundo da pergunta"><p></p>
=======
                    <input type="color" placeholder="Cor de fundo da pergunta"><p></p>
>>>>>>> a0fe48b3c2785126963c9600536e3d32f375488f
                </div>
                <div class="forms forms--respostas-corretas">
                    <h3>Respostas corretas</h3>
                    <div class="forms__resposta">
                        <input type="text" placeholder="Resposta correta"><p></p>
                        <input type="url" placeholder="URL da imagem"><p></p>
                    </div>
                </div>
                <div class="forms forms--respostas-incorretas">
                    <h3>Respostas incorretas</h3>
                    <p></p>
                    <div class="forms__resposta">
                        <input type="text" placeholder="Resposta incorreta 1"><p></p>
                        <input type="url" placeholder="URL da imagem 1"><p></p>
                    </div>
                    <div class="forms__resposta">
                        <input type="text" placeholder="Resposta incorreta 2"><p></p>
                        <input type="url" placeholder="URL da imagem 2"><p></p>
                    </div>
                    <div class="forms__resposta">
                        <input type="text" placeholder="Resposta incorreta 3"><p></p>
                        <input type="url" placeholder="URL da imagem 3"><p></p>
                    </div>
                </div>
            </div>
        </div>`
    }
    etapa.innerHTML += `<div class="button button--avancar" onclick="trocarEtapaII(this)">Prosseguir pra criar níveis</div>`
}
function selecionarPergunta(perguntaClicada) {
    const perguntaSelecionada = document.querySelector(".etapa--perguntas .selecionado");
    if (perguntaSelecionada !== null) {
        perguntaSelecionada.classList.remove("selecionado");
    }
    perguntaClicada.closest(".bloco").classList.add("selecionado");
}
function trocarEtapaII(bloco) {
    if (validarEtapaII(bloco)) {
        renderizarEtapaIII();
        if (edicao === true) {
            editarEtapaIII();
        }
    } else {
        alert("Pelo menos um dos dados inseridos não são válidos!");
    }
}

//ETAPA III //
function renderizarEtapaIII() {
    page3.innerHTML = ""
    page3.innerHTML += 
       `<div class="etapa etapa--niveis">
            <h2>Agora, decida os níveis!</h2>
            <p></p>
        </div>`
    const etapa = document.querySelector(".etapa--niveis");
    // NAO ESQUECER DE TROCAR O INPUT DA DESCRICAO PARA O OUTRA CAIXA DE TEXTO GIGANTE********************************************************************************************************
    for (var i = 0 ; i < numeroNiveis ; i ++) {
        etapa.innerHTML += 
       `<div class="bloco">
            <div class="sub-bloco">
                <h3>Nível ${i + 1}</h3><ion-icon onclick="selecionarNivel(this)" name="create-outline"></ion-icon>
            </div>
            <div class="sub-bloco">
                <div class="forms forms--nome">
                    <h3>Nível ${i + 1}</h3>
                    <input type="text" placeholder="Título do nível"><p></p>
                    <input type="text" placeholder="% de acerto mínima"><p></p>
                    <input type="url" placeholder="URL da imagem do nível"><p></p>
                    <textarea rows="7" placeholder="Descrição do nível"></textarea><p>
                </div>
            </div>
        </div>`
    }
    etapa.innerHTML += `<div class="button button--avancar" onclick="trocarEtapaIII(this)">FinalizarQuiz</div>`
}
function selecionarNivel(nivelClicado) {
    const nivelSelecionado = document.querySelector(".etapa--niveis .selecionado");
    if (nivelSelecionado !== null) {
        nivelSelecionado.classList.remove("selecionado");
    }
    nivelClicado.closest(".bloco").classList.add("selecionado");
}
function trocarEtapaIII(bloco) {
    if (validarEtapaIII(bloco)) {
        if (edicao === true) {
            editarQuiz();
        }
        if (edicao === false) {
            enviarQuiz();
        }
        renderizarTelaDeCarregamento();
    } else {
        alert("Pelo menos um dos dados inseridos não são válidos!");
    }
}

//ETAPA IV //
let keyDoQuiz;
let IDdoQuiz;
function enviarQuiz() {
    const posting = axios.post("https://mock-api.driven.com.br/api/v6/buzzquizz/quizzes",quiz)
    posting.then(function (response){
        keyDoQuiz=response.data.key
        IDdoQuiz = response.data.id
        guardarID();
    });
}

function renderizarEtapaIV() {
    body.innerHTML = 
       `<header><h1 onclick="carregarPagina1()">BuzzQuizz</h1></header>
        <main class="page3"></main>`
    page3 = document.querySelector(".page3");

    page3.innerHTML += 
       `<div class="etapa etapa--final">
            <h2>Seu quizz está pronto!</h2>
            <div class="quizz"><img src="${quiz.image}" alt=""><div class="gradiente"></div><h3>${quiz.title}</h3></div>
            <div class="button button--avancar" onclick="geraQuiz(${IDdoQuiz})">Acessar Quizz</div>
            <div class="button button--retornar" onclick="carregarPagina1()">Voltar para home</div>
        </div>`
}

function guardarID() {
    if(localStorage.length==0 || localStorage.getItem("ID")==null){
        localStorage.setItem("ID",`[]`)
        localStorage.setItem("keyDoQuiz","[]")
    }
    let conteudoID = JSON.parse(localStorage.getItem("ID"));
    let conteudoKey= JSON.parse(localStorage.getItem("keyDoQuiz"));
    conteudoKey.push(keyDoQuiz);
    conteudoID.push(IDdoQuiz);
    conteudoKey= JSON.stringify(conteudoKey);
    conteudoID=JSON.stringify(conteudoID);
    localStorage.setItem(`ID`,conteudoID);
    localStorage.setItem(`keyDoQuiz`,conteudoKey);
    renderizarEtapaIV();
}
