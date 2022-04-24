let edicao;
let KEY;
let edicaoQuiz;

function carregarEdicao(edicaoID,edicaoKEY) {
    edicao = true;
    KEY = edicaoKEY;

    carregarPagina3();

    const promise=axios.get(`https://mock-api.driven.com.br/api/v6/buzzquizz/quizzes/${edicaoID}`)
    promise.then(function(response){ 
        edicaoQuiz = response.data; 
        editarEtapaI();
    })
    
}

function editarEtapaI() {
    const inputs = document.querySelectorAll(".etapa input");
    inputs[0].value = edicaoQuiz.title;
    inputs[1].value = edicaoQuiz.image;
    inputs[2].value = edicaoQuiz.questions.length;
    inputs[3].value = edicaoQuiz.levels.length;
}

function editarEtapaII() {
    const subBloco = document.querySelectorAll(".etapa .sub-bloco:nth-of-type(2)");

    for (var i = 0 ; i < subBloco.length ; i ++ ) {
        const inputs = subBloco[i].querySelectorAll("input");
        const question = edicaoQuiz.questions[i];

        inputs[0].value = question.title;
        inputs[1].value = question.color;

        const answers = question.answers;
        let posicaoInput = 4;

        for (var j = 0 ; j < answers.length ; j ++ ) {
            if (answers[j].isCorrectAnswer === true) {
                inputs[2].value = answers[j].text;
                inputs[3].value = answers[j].image;
            }
            if (answers[j].isCorrectAnswer === false) {
                inputs[posicaoInput].value = answers[j].text;
                posicaoInput++;
                inputs[posicaoInput].value = answers[j].image;
                posicaoInput++;
            }
        }
    }
}

function editarEtapaIII() {
    const subBloco = document.querySelectorAll(".etapa .sub-bloco:nth-of-type(2)");

    for (var i = 0 ; i < subBloco.length ; i ++ ) {
        const inputs = subBloco[i].querySelectorAll("input");
        const textArea = subBloco[i].querySelector("textarea");
        const level = edicaoQuiz.levels[i];

        inputs[0].value = level.title;
        inputs[1].value = level.minValue;
        inputs[2].value = level.image;
        textArea.value = level.text;
    }
}

function editarQuiz() {
    quiz.id = edicaoQuiz.id;

    const editing = axios.put(`https://mock-api.driven.com.br/api/v6/buzzquizz/quizzes/${edicaoQuiz.id}`,
    {data: quiz}, {headers: {"Secret-Key": KEY}}
    );
    editing.then(renderizarEtapaIV);

}

