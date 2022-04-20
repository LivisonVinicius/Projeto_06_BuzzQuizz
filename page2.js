let counter;
let counterRespostas;
let salvaPromisse;
let respostaSelector;
let promise;
function geraQuiz(){
    promise=axios.get('https://mock-api.driven.com.br/api/v6/buzzquizz/quizzes')
    promise.then(function(response){
        counter=0;
        counterRespostas=0;
        let posicaoID=0
        let questionSelector=response.data[posicaoID].questions;
        document.querySelector(".page2").innerHTML+=`
        <li class="quizzTitle">
            <img src="${response.data[posicaoID].image}" alt="Titulo do quizz">
            <div><h2>${response.data[posicaoID].title}</h2></div>
        </li>
        <div class="quizzContainer"></div>
        `
        let containerQuiz=document.querySelector(".page2 .quizzContainer");
        while (counter < questionSelector.length){
            counterRespostas=0
            containerQuiz.innerHTML+=`
            <li class="quizQuestion pergunta${counter}">
                <h3>${questionSelector[counter].title}</h3>
            </li>
            `
            document.querySelector(`.pergunta${counter} h3`).style.backgroundColor =`${response.data[posicaoID].questions[counter].color}`
            respostaSelector=questionSelector[counter].answers.sort(parametro);
            while(counterRespostas < respostaSelector.length){
                pergunta=document.querySelector(`.pergunta${counter}`);
                pergunta.innerHTML +=`
                <div class="resposta${counter} resposta" onclick="selecionaResposta(this,'pergunta${counter}')">
                    <img src="${respostaSelector[counterRespostas].image}" alt="opção${counterRespostas}">
                    <h4>${respostaSelector[counterRespostas].text}</h4>
                    <div class="esbranquicado escondido"></div>
                </div>
                `
                counterRespostas++
            }
            counter++
        }
        counter=0
    })
}
function selecionaResposta(selecionada,localPergunta){
    let contadorLoop=0
    while(contadorLoop < document.querySelectorAll(`.${localPergunta} > *`).length-1){
        document.querySelector(`.${localPergunta} .resposta${contadorLoop}`).classList.("esbraquicado")
        contadorLoop++

    }
}
function parametro(){
    return Math.random()-0.5;
}