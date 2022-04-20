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