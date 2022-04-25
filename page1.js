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
       `<header><h1 onclick="carregarPagina1()">BuzzQuizz</h1></header>
        <main class="page1"></main>`
    page1 = document.querySelector(".page1")

    quizzesServidor = response.data;
    conteudoStorage = JSON.parse(localStorage.getItem("ID"));
    
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
    let listaDeIDs=JSON.parse(localStorage.getItem("ID"))
    let listaDeKeys=JSON.parse(localStorage.getItem("keyDoQuiz"))
    
    for (let j = 0 ; j < listaDeIDs.length ; j++){
        const quizzesDoUsuario = axios.get(`https://mock-api.driven.com.br/api/v6/buzzquizz/quizzes/${listaDeIDs[j]}`).then(response=>{const image = response.data.image;
            const title = response.data.title;
            const lista = document.querySelector(".quiz--usuario .quiz__lista");
            lista.innerHTML += `
                <li class="quizz">
                    <img src=${image} alt="">
                    <div class="quizz-configuracao">
                        <ion-icon class="edit" name="create-outline" onclick="carregarEdicao('${listaDeIDs[j]}','${listaDeKeys[j]}')"></ion-icon>
                        <ion-icon class="trash" name="trash-outline" onclick="deleteQuiz('${listaDeIDs[j]} ', '${listaDeKeys[j]}','${j}')"></ion-icon>
                    </div>
                    <div class="gradiente" onclick="geraQuiz(${listaDeIDs[j]})"></div>
                    <h3>${title}</h3>
                </li>
            `
        })
    }
}

function renderizarQuizzesTodos() {
    page1.innerHTML += 
       `<div class="quiz quiz--todos">
            <h2>Todos os Quizzes</h2>
            <ul class="quiz__lista"></ul>
        </div>`
    for (var i = 0 ; i < quizzesServidor.length ; i++) {
        let listaDeIDs=JSON.parse(localStorage.getItem("ID"))
        if(!listaDeIDs.includes(quizzesServidor[i].id)){
            const image = quizzesServidor[i].image;
            const title = quizzesServidor[i].title;
            const IDdoQuizdoServidor=quizzesServidor[i].id;
            const lista = document.querySelector(".quiz--todos .quiz__lista");

            lista.innerHTML += `
            <li class="quizz">
                <img src=${image} alt="">
                <div class="gradiente" onclick="geraQuiz(${IDdoQuizdoServidor})"></div>
                <h3>${title}</h3>
            </li>`
        } 
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
function deleteQuiz(idDoDelete,keyDoQuizDeletado,posicaoLocalStorage){
    const promiseDelete= axios.get(`https://mock-api.driven.com.br/api/v6/buzzquizz/quizzes/${idDoDelete}`)
    let quizDeletado;
    promiseDelete.then(function(response){
        quizDeletado=response.data
    })
    confirmacao =confirm("Tem certeza que quer deletar esse quiz?")
    if(confirmacao){
        const delQuiz=axios.delete(`https://mock-api.driven.com.br/api/v6/buzzquizz/quizzes/${idDoDelete}`,{headers: { "Secret-Key": keyDoQuizDeletado}})
        let conteudoID = JSON.parse(localStorage.getItem("ID"));
        let conteudoKey= JSON.parse(localStorage.getItem("keyDoQuiz"));
        conteudoKey=conteudoKey.splice(posicaoLocalStorage,posicaoLocalStorage);
        conteudoID=conteudoID.splice(posicaoLocalStorage,posicaoLocalStorage);
        conteudoKey= JSON.stringify(conteudoKey);
        conteudoID=JSON.stringify(conteudoID);
        localStorage.setItem(`ID`,conteudoID);
        localStorage.setItem(`keyDoQuiz`,conteudoKey);
        delQuiz.then(carregarPagina1())
    }
}
// SOLUCIONAR O BUG DE DELETAR O ERRADO NO STORAGE
// fazer o teste de verificar o objeto antes e depois de carregar a carregarPagina1