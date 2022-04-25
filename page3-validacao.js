function resetarErros(mensagens, inputs, textAreas) {
    for (var i = 0 ; i < mensagens.length ; i++) {
        mensagens[i].innerHTML = "";
    }
    for (var i = 0 ; i < inputs.length ; i++) {
        inputs[i].style.backgroundColor = "#FFFFFF"
    }
    for (var i = 0 ; i < textAreas.length ; i++) {
        textAreas[i].style.backgroundColor = "#FFFFFF"
    }
}

function validarEtapaI() {
    let validacao = true;

    const mensagens = document.querySelectorAll("p");
    const inputs = document.querySelectorAll("input");
    resetarErros(mensagens, inputs, [])
    
    quiz = {
        title:     document.querySelector("input:nth-of-type(1)").value,
        image:     document.querySelector("input:nth-of-type(2)").value,
        questions: [],
        levels:    []
    }
    numeroPerguntas = Number(document.querySelector("input:nth-of-type(3)").value);
    numeroNiveis    = Number(document.querySelector("input:nth-of-type(4)").value);

    if (quiz.title.length < 20 || quiz.title.length > 65) {
        mensagens[0].innerHTML = "O título do quiz deve ter no mínimo 20 e no máximo 65 caracteres";
        inputs[0].style.backgroundColor = "#FFE9E9"
        validacao = false;
    } 

    let mensagem = mensagens[1];
    let input = inputs[1]
    if (!validarImagem(quiz.image, mensagem, input)) {
        validacao = false;
    }

    if (numeroPerguntas < 3) {
        mensagens[2].innerHTML = "O quiz deve ter no mínimo 3 perguntas";
        inputs[2].style.backgroundColor = "#FFE9E9"
        validacao = false;
    } 

    if (numeroNiveis < 2) {
        mensagens[3].innerHTML = "O quiz deve ter no mínimo 2 níveis";
        inputs[3].style.backgroundColor = "#FFE9E9"
        validacao = false;
    }

    return validacao;
}

function validarEtapaII() {
    quiz.questions = []
    let validacao = true;
    
    const mensagens = document.querySelectorAll("p");
    const inputs = document.querySelectorAll("input");
    resetarErros(mensagens, inputs, [])
    
    const perguntas = document.querySelectorAll(".sub-bloco:nth-of-type(2)");

    for (var i = 0 ; i < perguntas.length ; i ++) {
        const question = {
            title: perguntas[i].querySelector(".forms--nome input:nth-of-type(1)").value,
			color: perguntas[i].querySelector(".forms--nome input:nth-of-type(2)").value,
			answers: []
        }

        if (question.title.length < 20) {
            perguntas[i].querySelector(".forms--nome p:nth-of-type(1)").innerHTML = "O título da pergunta deve ter no mínimo 20 caracteres";
            perguntas[i].querySelector(".forms--nome input:nth-of-type(1)").style.backgroundColor = "#FFE9E9";
            validacao = false;
        }

        let answer = {
            text: respostaCorreta.querySelector("input:nth-of-type(1)").value,
			image: respostaCorreta.querySelector("input:nth-of-type(2)").value,
			isCorrectAnswer: true
        }
        question.answers.push(answer);

        
        const respostaCorreta = perguntas[i].querySelector(".forms--respostas-corretas");
        if (answer.text === "") {
            respostaCorreta.querySelector("p:nth-of-type(1)").innerHTML = "O texto da resposta não pode estar vazio";
            respostaCorreta.querySelector("input:nth-of-type(1)").style.backgroundColor = "#FFE9E9";
            validacao = false;
        }
        let mensagem = respostaCorreta.querySelector("p:nth-of-type(2)");
        let input = respostaCorreta.querySelector("input:nth-of-type(2)");
        if (!validarImagem(answer.image, mensagem, input)) {
            validacao = false;
        }
        
        let minimoRespostaIncorreta = false;
        const respostasIncorretas = perguntas[i].querySelectorAll(".forms--respostas-incorretas .forms__resposta");
        for (var x = 0 ; x < respostasIncorretas.length ; x ++) {
            let booleano = true;
            answer = {
                text: respostasIncorretas[x].querySelector("input:nth-of-type(1)").value,
                image: respostasIncorretas[x].querySelector("input:nth-of-type(2)").value,
                isCorrectAnswer: false
            }

            if (answer.text === "" && answer.image === "") {
                continue;
            } 
            if (answer.text === "") {
                respostasIncorretas[x].querySelector("p:nth-of-type(1)").innerHTML = "O texto da resposta não pode estar vazio";
                respostasIncorretas[x].querySelector("input:nth-of-type(1)").style.backgroundColor = "#FFE9E9";
                booleano = false;
                validacao = false;
            }
            let mensagem = respostasIncorretas[x].querySelector("p:nth-of-type(2)");
            let input = respostasIncorretas[x].querySelector("input:nth-of-type(2)");
            if (!validarImagem(answer.image, mensagem, input)) {
                booleano = false;
                validacao = false;
            }

            if (booleano === true) {
                question.answers.push(answer);
                minimoRespostaIncorreta = true;
            }
        }
        if (!minimoRespostaIncorreta) {
            perguntas[i].querySelector(".forms--respostas-incorretas > p").innerHTML = "A pergunta precisa de no mínimo 1 resposta incorreta";
            const inputs = perguntas[i].querySelectorAll(".forms--respostas-incorretas input");
            for (var x = 0 ; x < inputs.length ; x ++) {
                inputs[x].style.backgroundColor = "#FFE9E9";
            }
            validacao = false;
        }
        quiz.questions.push(question);
    }
    return validacao;
}

function validarEtapaIII(bloco) {
    quiz.levels = [];
    let levelsUsuario = []
    let validacao = true;
    let Acerto0Porcento = false;

    const mensagens = document.querySelectorAll("p");
    const inputs = document.querySelectorAll("input");
    const textAreas = document.querySelectorAll("textarea");
    resetarErros(mensagens, inputs, textAreas)
    
    const niveis = document.querySelectorAll(".sub-bloco:nth-of-type(2)");

    for (var i = 0 ; i < niveis.length ; i ++) {
        const level = {
            title: niveis[i].querySelector("input:nth-of-type(1)").value,
            minValue: Number(niveis[i].querySelector("input:nth-of-type(2)").value),
            image: niveis[i].querySelector("input:nth-of-type(3)").value,
            text: niveis[i].querySelector("textarea").value,
        }

        if (level.title.length < 10) {
            niveis[i].querySelector("p:nth-of-type(1)").innerHTML = "O nível do quiz deve ter no mínimo 10 caracteres";
            niveis[i].querySelector("input:nth-of-type(1)").style.backgroundColor = "#FFE9E9"
            validacao = false;
        }

        for (var x = 0 ; x < levelsUsuario.length ; x ++) {
            if (levelsUsuario[x] === level.minValue && levelsUsuario !== []) {
                niveis[i].querySelector("p:nth-of-type(2)").innerHTML = "Essa % de acerto mínima já foi atríbuida para outro nível";
                niveis[i].querySelector("input:nth-of-type(2)").style.backgroundColor = "#FFE9E9"
            }
        }
        levelsUsuario.push(level.minValue);
        if (level.minValue < 0 || level.minValue > 100 || niveis[i].querySelector("input:nth-of-type(2)").value ==="") {
            niveis[i].querySelector("p:nth-of-type(2)").innerHTML = "A % de acerto mínima deve ser um número entre 0 e 100";
            niveis[i].querySelector("input:nth-of-type(2)").style.backgroundColor = "#FFE9E9"
            validacao = false;
        }
        if (level.minValue === 0) {
            Acerto0Porcento = true;
        }

        let mensagem = niveis[i].querySelector("p:nth-of-type(3)");
        let input = niveis[i].querySelector("input:nth-of-type(3)");
        if (!validarImagem(level.image, mensagem, input)) {
            validacao = false;
        }

        if (level.text .length < 30) {
            niveis[i].querySelector("p:nth-of-type(4)").innerHTML = "A descrição do nível deve ter no mínimo 30 caracteres";
            niveis[i].querySelector("textarea").style.backgroundColor = "#FFE9E9";
            validacao = false;
        }
        quiz.levels.push(level);
    } 
    if (Acerto0Porcento === false) {
        bloco.closest(".etapa").querySelector("p").innerHTML = "Uma das % de acerto mínima precisa ser 0";
        for (var i = 0 ; i < niveis.length ; i ++ ) {
            niveis[i].querySelector("input:nth-of-type(2)").style.backgroundColor = "#FFE9E9";
        }
        validacao = false;
    }
    return validacao;
}

function validarImagem (image, message, input) {
    if (image === "") {
        message.innerHTML = "A URL da imagem não pode estar vazia";
        input.style.backgroundColor = "#FFE9E9"
        return false;
    } else {
        if (!(/\.(jpg|jpeg|png|webp|avif|gif|svg)$/.test(image))) {
            message.innerHTML = "A extensão da imagem não é aceita";
            input.style.backgroundColor = "#FFE9E9"
            return false;
        } 
        try {
            const imgURL = new URL(image);
        } catch (_) {
            message.innerHTML = "A URL da imagem deve ter formato de URL";
            input.style.backgroundColor = "#FFE9E9"
            return false;
        }
    }
    return true;
}