// ideia para depois, em vez de deixar a classe escondido nas paginas zerar o body e gerar o main .page do 0
const body = document.querySelector("body");
let page1;
let quizzesServidor;
let conteudoStorage;

carregarPagina1();

function carregarPagina1() {
    const promiseQuizzes = axios.get("https://mock-api.driven.com.br/api/v6/buzzquizz/quizzes");
    promiseQuizzes.then(renderizarQuizzes);
    renderizarTelaDeCarregamento()
}

function renderizarQuizzes(response) {
    body.innerHTML = 
       `<header><h1>BuzzQuizz</h1></header>
        <main class="page1"></main>`
    page1 = document.querySelector(".page1")

    quizzesServidor = response.data;
    conteudoStorage = JSON.parse(localStorage.getItem("lista"));
    
    if(conteudoStorage==null || conteudoStorage.length==0){
        renderizarQuizzesNovos()
    }else{
        renderizarQuizzesUsuario();
    } 
    renderizarQuizzesTodos();
}

function renderizarQuizzesNovos() {
    page1.innerHTML += 
       `<div class="quiz quiz--novo">
            <p>Você não criou nenhum quizz ainda :(</p>
            <div class="button" onclick="carregarPagina3()">Criar Quizz</div>
        </div>`
}

function renderizarQuizzesUsuario() {
    page1.innerHTML += 
       `<div class="quiz quiz--usuario">
            <div class="cabecalho"><h2>Seus Quizzes</h2><ion-icon onclick="carregarPagina3()" name="add-circle"></ion-icon></div>
            <ul class="quiz__lista"></ul>
        </div>`
    let listaDeIDs=JSON.parse(localStorage.getItem("lista"))
    for (let j = 0 ; j < listaDeIDs.length ; j++){
        for (let i = 0 ; i < quizzesServidor.length ; i++) {
            if(Number(quizzesServidor[i].id)==listaDeIDs[j]){
                const image = quizzesServidor[i].image;
                const title = quizzesServidor[i].title;
                const lista = document.querySelector(".quiz--usuario .quiz__lista");

                // COLOCAR FUNCAO PARA DELETAR E EDICAO NOS ION ICONS
                lista.innerHTML += `
                    <li class="quizz">
                        <img src=${image} alt="">
                        <div class="quizz-configuracao"><ion-icon class="edit" name="create-outline"></ion-icon><ion-icon class="trash" name="trash-outline"></ion-icon></div>
                        <div class="gradiente" onclick="geraQuiz(${i})"></div>
                        <h3>${title}</h3>
                    </li>`
            }
        }
    }
    
}

function renderizarQuizzesTodos() {
    page1.innerHTML += 
       `<div class="quiz quiz--todos">
            <h2>Todos os Quizzes</h2>
            <ul class="quiz__lista"></ul>
        </div>`
    for (var i = 0 ; i < quizzesServidor.length ; i++) {
        const image = quizzesServidor[i].image;
        const title = quizzesServidor[i].title;
        const lista = document.querySelector(".quiz--todos .quiz__lista");

        lista.innerHTML += `
        <li class="quizz">
            <img src=${image} alt="">
            <div class="gradiente" onclick="geraQuiz(${i})"></div>
            <h3>${title}</h3>
        </li>`
    }
}

function renderizarTelaDeCarregamento() {
    body.innerHTML = `
        <header><h1>BuzzQuizz</h1></header>
        <div class="overlay">
            <img src="spinner.gif" alt="gif de spinner">
            <p class="overlay__texto">Carregando</p> 
        </div>
    `
}