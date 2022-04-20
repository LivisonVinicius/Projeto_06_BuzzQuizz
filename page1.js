// ideia para depois, em vez de deixar a classe escondido nas paginas zerar o body e gerar o main .page do 0
const body = document.querySelector("body");
let page1;

// carregarPagina1();

function carregarPagina1() {
    body.innerHTML = 
       `<header><h1>BuzzQuizz</h1></header>
        <main class="page1"></main>`
    page1 = document.querySelector(".page1")

    const promiseQuizzes = axios.get("https://mock-api.driven.com.br/api/v6/buzzquizz/quizzes");
    promiseQuizzes.then(renderizarQuizzes);
}

function renderizarQuizzes(response) {
    const quizzesServidor = response.data;

    //.quiz--novo só deve aparecer se .quiz-usuario estiver vazio; consertar isso dps
    renderizarQuizzesNovos()
    renderizarQuizzesUsuario(quizzesServidor);
    renderizarQuizzesTodos(quizzesServidor);
}

function renderizarQuizzesNovos() {
    page1.innerHTML += 
       `<div class="quiz quiz--novo">
            <p>Você não criou nenhum quizz ainda :(</p>
            <div class="button" onclick="carregarPagina3()">Criar Quizz</div>
        </div>`
}

function renderizarQuizzesUsuario(quizzesServidor) {
    page1.innerHTML += 
       `<div class="quiz quiz--usuario">
            <div class="cabecalho"><h2>Seus Quizzes</h2><ion-icon onclick="carregarPagina3()" name="add-circle"></ion-icon></div>
            <ul class="quiz__lista"></ul>
        </div>`
    for (var i = 0 ; i < quizzesServidor.length ; i++) {
        const image = quizzesServidor[i].image;
        const title = quizzesServidor[i].title;
        const lista = document.querySelector(".quiz--usuario .quiz__lista");
        lista.innerHTML += `<li class="quizz"><img src=${image} alt=""><div class="gradiente"></div><h3>${title}</h3></li>`
    }
}

function renderizarQuizzesTodos(quizzesServidor) {
    page1.innerHTML += 
       `<div class="quiz quiz--todos">
            <h2>Todos os Quizzes</h2>
            <ul class="quiz__lista"></ul>
        </div>`
    for (var i = 0 ; i < quizzesServidor.length ; i++) {
        const image = quizzesServidor[i].image;
        const title = quizzesServidor[i].title;
        const lista = document.querySelector(".quiz--todos .quiz__lista");
        lista.innerHTML += `<li class="quizz"><img src=${image} alt=""><div class="gradiente"></div><h3>${title}</h3></li>`
    }
}

