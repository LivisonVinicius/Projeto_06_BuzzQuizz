carregarPagina();

function carregarPagina() {
    const promiseQuizzes = axios.get("https://mock-api.driven.com.br/api/v6/buzzquizz/quizzes");
    promiseQuizzes.then(renderizarQuizzes);
}

function renderizarQuizzes(response) {
    const quizzesServidor = response.data;
    const page1 = document.querySelector(".page1");
    page1.innerHTML = "";

    //.quiz--novo só deve aparecer se .quiz-usuario estiver vazio; consertar isso dps
    renderizarQuizzesNovos(page1)
    renderizarQuizzesUsuario(page1,quizzesServidor);
    renderizarQuizzesTodos(page1,quizzesServidor);
}

function renderizarQuizzesNovos(page1) {
    page1.innerHTML += 
       `<div class="quiz quiz--novo">
            <p>Você não criou nenhum quizz ainda :(</p>
            <div class="button" onclick="trocarTela1Tela3()">Criar Quizz</div>
        </div>`
}

function renderizarQuizzesUsuario(page1,quizzesServidor) {
    page1.innerHTML += 
       `<div class="quiz quiz--usuario">
            <div class="cabecalho"><h2>Seus Quizzes</h2><ion-icon onclick="trocarTela1Tela3()" name="add-circle"></ion-icon></div>
            <ul class="quiz__lista"></ul>
        </div>`
    for (var i = 0 ; i < quizzesServidor.length ; i++) {
        const image = quizzesServidor[i].image;
        const title = quizzesServidor[i].title;
        const lista = document.querySelector(".quiz--usuario .quiz__lista");
        lista.innerHTML += `<li class="quizz"><img src=${image} alt=""><div class="gradiente"></div><h3>${title}</h3></li>`
    }
}

function renderizarQuizzesTodos(page1,quizzesServidor) {
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

function trocarTela1Tela2() {
    document.querySelector(".page1").classList.toggle("escondido");
    document.querySelector(".page2").classList.toggle("escondido");
}
function trocarTela1Tela3() {
    document.querySelector(".page1").classList.toggle("escondido");
    document.querySelector(".page3").classList.toggle("escondido");
}
function trocarTela2Tela3() {
    document.querySelector(".page2").classList.toggle("escondido");
    document.querySelector(".page3").classList.toggle("escondido");
}
