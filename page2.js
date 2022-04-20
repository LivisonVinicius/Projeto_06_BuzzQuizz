let response2;
let promise;
let objeto;
let counter;
let counterRespostas;
function geraQuiz(){
    // const promise=axios.get('https://mock-api.driven.com.br/api/v6/buzzquizz/quizzes')
    // promise.then(function(response){
    //     response2=response.data
    //     const containerQuiz=document.querySelector(".quiz")
    // })
    objeto=[
        {
            id: 1,
            title: "Título do quizz1",
            image: "https://http.cat/411.jpg",
            questions: [
                {
                    title: "Título da pergunta 1",
                    color: "#123456",
                    answers: [
                        {
                            text: "Texto da resposta 1",
                            image: "https://http.cat/411.jpg",
                            isCorrectAnswer: true
                        },
                        {
                            text: "Texto da resposta 2",
                            image: "https://http.cat/412.jpg",
                            isCorrectAnswer: false
                        }
                    ]
                },
                {
                    title: "Título da pergunta 2",
                    color: "#123456",
                    answers: [
                        {
                            text: "Texto da resposta 1",
                            image: "https://http.cat/411.jpg",
                            isCorrectAnswer: true
                        },
                        {
                            text: "Texto da resposta 2",
                            image: "https://http.cat/412.jpg",
                            isCorrectAnswer: false
                        }
                    ]
                },
                {
                    title: "Título da pergunta 3",
                    color: "#123456",
                    answers: [
                        {
                            text: "Texto da resposta 1",
                            image: "https://http.cat/411.jpg",
                            isCorrectAnswer: true
                        },
                        {
                            text: "Texto da resposta 2",
                            image: "https://http.cat/412.jpg",
                            isCorrectAnswer: false
                        }
                    ]
                }
            ],
            levels: [
                {
                    title: "Título do nível 1",
                    image: "https://http.cat/411.jpg",
                    text: "Descrição do nível 1",
                    minValue: 0
                },
                {
                    title: "Título do nível 2",
                    image: "https://http.cat/412.jpg",
                    text: "Descrição do nível 2",
                    minValue: 50
                }
            ]
        },
        {
            id: 2,
            title: "Título do quizz2",
            image: "https://http.cat/411.jpg",
            questions: [
                {
                    title: "Título da pergunta 1",
                    color: "#123456",
                    answers: [
                        {
                            text: "Texto da resposta 1",
                            image: "https://http.cat/411.jpg",
                            isCorrectAnswer: true
                        },
                        {
                            text: "Texto da resposta 2",
                            image: "https://http.cat/412.jpg",
                            isCorrectAnswer: false
                        }
                    ]
                },
                {
                    title: "Título da pergunta 2",
                    color: "#123456",
                    answers: [
                        {
                            text: "Texto da resposta 1",
                            image: "https://http.cat/411.jpg",
                            isCorrectAnswer: true
                        },
                        {
                            text: "Texto da resposta 2",
                            image: "https://http.cat/412.jpg",
                            isCorrectAnswer: false
                        }
                    ]
                },
                {
                    title: "Título da pergunta 3",
                    color: "#123456",
                    answers: [
                        {
                            text: "Texto da resposta 1",
                            image: "https://http.cat/411.jpg",
                            isCorrectAnswer: true
                        },
                        {
                            text: "Texto da resposta 2",
                            image: "https://http.cat/412.jpg",
                            isCorrectAnswer: false
                        }
                    ]
                }
            ],
            levels: [
                {
                    title: "Título do nível 1",
                    image: "https://http.cat/411.jpg",
                    text: "Descrição do nível 1",
                    minValue: 0
                },
                {
                    title: "Título do nível 2",
                    image: "https://http.cat/412.jpg",
                    text: "Descrição do nível 2",
                    minValue: 50
                }
            ]
        }
    ]
    counter=0;
    counterRespostas=0;
    let apiSelector=objeto[0].questions;
    let containerQuiz=document.querySelector(".page2 .quizz");
    let pergunta;
    while (counter < apiSelector.length){
        // esse 0 vai ser o id
        counterRespostas=0
        containerQuiz.innerHTML+=`
        <li class="quizQuestion pergunta${counter}">
        <h3>${apiSelector[counter].title}</h3>
        </li>
        `
        while(counterRespostas < apiSelector[counter].answers.length){
            pergunta=document.querySelector(`.pergunta${counter}`);
            pergunta.innerHTML +=`
                <div>
                    <img src="${apiSelector[counter].answers[counterRespostas].image}" alt="opção${counterRespostas}">
                    <h4>${apiSelector[counter].answers[counterRespostas].text}</h4>
                </div>
            `
            counterRespostas++
        }
        counter++
    }
    counter=0
    

}