let counter;
let counterRespostas;
let salvaPromisse;
let respostaSelector;
let promise;
let questionSelector;
let pontuacao=0;
let finalSelector;
let mainPage2;
function geraQuiz(){
    promise=axios.get('https://mock-api.driven.com.br/api/v6/buzzquizz/quizzes')
    promise.then(function(response){
        body.innerHTML = `
        <header><h1>BuzzQuizz</h1></header>
        <main class="page2"></main>
        `
        mainPage2=document.querySelector("main");
        counter=0;
        counterRespostas=0;
        let posicaoID=0
        finalSelector=response.data[posicaoID].levels
        questionSelector=response.data[posicaoID].questions;
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
                <div class="resposta${counterRespostas} resposta" onclick="selecionaResposta(this,'pergunta${counter}')">
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
function selecionaResposta(selecionada,localPergunta){
    
    let contadorLoop=0
    let posicaoPergunta=Number(localPergunta.slice(8))
    if(document.querySelectorAll(`.${localPergunta} .esbraquicado`).length != 0){
        return
    }
    while(contadorLoop < document.querySelectorAll(`.${localPergunta} > *`).length-1){
        document.querySelector(`.${localPergunta} .resposta${contadorLoop}`).classList.add("esbraquicado")
        switch(questionSelector[posicaoPergunta].answers[contadorLoop].isCorrectAnswer){
            case true:
                document.querySelector(`.${localPergunta} .resposta${contadorLoop}`).classList.add("truthy")
                if(selecionada.classList.contains("truthy")){
                    pontuacao++
                }
                break
            case false:
                document.querySelector(`.${localPergunta} .resposta${contadorLoop}`).classList.add("falsy")
        }
        contadorLoop++
    }
    selecionada.classList.remove("esbraquicado")
    setTimeout(scrollNext,2000,document.querySelector(`.pergunta${posicaoPergunta+1}`))
}
function parametro(){
    return Math.random()-0.5;
}
function scrollNext(local){
    if (local!== null){
        local.scrollIntoView({behavior : "smooth", block : "end"})
    }else{
        let arr = []
        let posicaoLvl=0
        let arrPosicao=[]
        pontuacao=Math.floor((pontuacao/document.querySelectorAll(".quizQuestion").length)*100)
        console.log(pontuacao)
        for(let i=0 ; i<finalSelector.length;i++){
            if(pontuacao>=finalSelector[i].minValue){
                arr.push(finalSelector[i].minValue)
                arrPosicao.push(finalSelector[i])
            } 
        }
        novoArr=arr.sort(function(a, b){return a-b});
        console.log(novoArr)
        for(let i=0 ; i < arr.length ; i++){
            if(novoArr[-1]==arr[i]){
                arrPosicao=arrPosicao[i]
            }
        }
        console.log(posicaoLvl)
        document.querySelector(".page2").innerHTML+=`
        <div class="finalDoJogo">
            <h3>${arrPosicao.title}</h3>
            <img src="${arrPosicao.image}" alt="Imagem Final">
            <h4>${arrPosicao.text}</h4>
        </div>
        `
        document.querySelector("finalDoJogo").scrollIntoView({behavior : "smooth", block : "end"})
    }
}