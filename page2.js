let promise;
let counter;
let counterRespostas;
let salvaPromisse;
let respostaSelector;

function geraQuiz(){
    const promise=axios.get('https://mock-api.driven.com.br/api/v6/buzzquizz/quizzes')
    promise.then(function(response){
        document.querySelector(".page2").innerHTML+=`
        <li class="quizzTitle">
            <img src="hogwarts-castle-.jpg" alt="qualquersa">
            <div><h2>O quão Potterhead você é?</h2></div>
        </li>
        <div class="quizzContainer"></div>
        `
        counter=0;
        counterRespostas=0;
        let posicaoID=0
        let questionSelector=response.data[posicaoID].questions;
        let containerQuiz=document.querySelector(".page2 .quizzContainer");
        while (counter < questionSelector.length){
            counterRespostas=0
            containerQuiz.innerHTML+=`
            <li class="quizQuestion pergunta${counter}">
                <h3>${questionSelector[counter].title}</h3>
            </li>
            `
            respostaSelector=questionSelector[counter].answers.sort(parametro);
            while(counterRespostas < respostaSelector.length){
                pergunta=document.querySelector(`.pergunta${counter}`);
                pergunta.innerHTML +=`
                <div>
                    <img src="${respostaSelector[counterRespostas].image}" alt="opção${counterRespostas}">
                    <h4>${respostaSelector[counterRespostas].text}</h4>
                </div>
                `
                counterRespostas++
            }
            counter++
        }
        counter=0
    })
}
function parametro(){
    return Math.random()-0.5;
}