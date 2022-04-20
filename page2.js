let promise;
let counter;
let counterRespostas;
let salvaPromisse;
function geraQuiz(){
    const promise=axios.get('https://mock-api.driven.com.br/api/v6/buzzquizz/quizzes')
    promise.then(function(response){
        counter=0;
        counterRespostas=0;
        let posicaoID=0
        let questionSelector=response.data[posicaoID].questions;
        let containerQuiz=document.querySelector(".page2 .quizzContainer");
        let respostaSelector=questionSelector.answers;
        respostaSelector=respostaSelector.sort()
        while (counter < questionSelector.length){
            counterRespostas=0
            containerQuiz.innerHTML+=`
            <li class="quizQuestion pergunta${counter}">
                <h3>${questionSelector[counter].title}</h3>
            </li>
            `
            while(counterRespostas < questionSelector[counter].answers.length){
                pergunta=document.querySelector(`.pergunta${counter}`);
                pergunta.innerHTML +=`
                <div>
                    <img src="${questionSelector[counter].answers[counterRespostas].image}" alt="opção${counterRespostas}">
                    <h4>${questionSelector[counter].answers[counterRespostas].text}</h4>
                </div>
                `
                counterRespostas++
            }
            counter++
        }
        counter=0
    })
}