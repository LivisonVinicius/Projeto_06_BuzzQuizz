carregarPagina();

function carregarPagina() {
    const promiseQuizzes = axios.get("https://mock-api.driven.com.br/api/v6/buzzquizz/quizzes");
    promiseQuizzes.then(renderizarQuizzes);
}

function renderizarQuizzes(response) {
    const quizzesServidor = response.data;
    
    renderizarQuizzesUsuario(quizzesServidor);
    renderizarQuizzesTodos(quizzesServidor);
}

function renderizarQuizzesUsuario(quizzesServidor) {
    // if quizzesUsuario === 0, .quiz--novo desaparece e .quiz--usario aparece; dar return
    for (var i = 0 ; i < quizzesServidor.length ; i++) {
        const image = quizzesServidor[i].image;
        const title = quizzesServidor[i].title;
        const lista = document.querySelector(".quiz--usuario .quiz__lista");
        lista.innerHTML += `<li class="quizz"><img src=${image} alt=""><div class="gradiente"></div><h3>${title}</h3></li>`
    }
}

function renderizarQuizzesTodos(quizzesServidor) {
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

function trocarEtapaI() {
    document.querySelector(".etapa--inicial").classList.toggle("escondido");
    document.querySelector(".etapa--perguntas").classList.toggle("escondido");
}
function trocarEtapaII() {
    document.querySelector(".etapa--perguntas").classList.toggle("escondido");
    document.querySelector(".etapa--niveis").classList.toggle("escondido");
}
function trocarEtapaIII() {
    document.querySelector(".etapa--niveis").classList.toggle("escondido");
    document.querySelector(".etapa--final").classList.toggle("escondido");
}
