function validarEtapaI(bloco) {
    let validacao = true;
    quiz = {
        title: "",
        image: "",
        questions: [],
        levels: []
    }
    quiz.title = document.querySelector(".etapa--inicial .titulo").value;
    quiz.image = document.querySelector(".etapa--inicial .img-url").value;
    numeroPerguntas = Number(document.querySelector(".etapa--inicial .numero-perguntas").value);
    numeroNiveis = Number(document.querySelector(".etapa--inicial .numero-niveis").value);

    const mensagensErro = bloco.closest(".etapa").querySelectorAll("p");
    const inputErro = bloco.closest(".etapa").querySelectorAll("input");
    for (var i = 0 ; i < mensagensErro.length ; i++) {
        mensagensErro[i].innerHTML = "";
        inputErro[i].style.backgroundColor = "#FFFFFF"
    }

    if (quiz.title.length < 20 || quiz.title.length > 65) {
        mensagensErro[0].innerHTML = "O título do quiz deve ter no mínimo 20 e no máximo 65 caracteres";
        inputErro[0].style.backgroundColor = "#FFE9E9"
        validacao = false;
    } 

    if (quiz.image === "") {
        mensagensErro[1].innerHTML = "A URL da imagem não pode estar vazia";
        inputErro[1].style.backgroundColor = "#FFE9E9"
    } else {
        if (!(/\.(jpg|jpeg|png|webp|avif|gif|svg)$/.test(quiz.image))) {
            mensagensErro[1].innerHTML = "A extensão da imagem não é aceita";
            inputErro[1].style.backgroundColor = "#FFE9E9"
            validacao = false;
        } 
        try {
            const imgURL = new URL(document.querySelector(".etapa--inicial .img-url").value);
        } catch (_) {
            mensagensErro[1].innerHTML = "A URL da imagem deve ter formato de URL";
            inputErro[1].style.backgroundColor = "#FFE9E9"
            validacao = false;  
        }
    }

    if (numeroPerguntas < 3) {
        mensagensErro[2].innerHTML = "O quiz deve ter no mínimo 3 perguntas";
        inputErro[2].style.backgroundColor = "#FFE9E9"
        validacao = false;
    } 

    if (numeroNiveis < 2) {
        mensagensErro[3].innerHTML = "O quiz deve ter no mínimo 2 níveis";
        inputErro[3].style.backgroundColor = "#FFE9E9"
        validacao = false;
    }

    return validacao;
}

function validarEtapaII(bloco) {
    quiz.questions = []
    let validacao = true;
    const perguntas = document.querySelectorAll(".bloco .sub-bloco:nth-of-type(2)");

    const mensagensErro = bloco.closest(".etapa").querySelectorAll("p");
    const inputErro = bloco.closest(".etapa").querySelectorAll("input");
    for (var i = 0 ; i < mensagensErro.length ; i++) {
        mensagensErro[i].innerHTML = "";
    }
    for (var i = 0 ; i < inputErro.length ; i++) {
        inputErro[i].style.backgroundColor = "#FFFFFF"
    }
    

    for (var i = 0 ; i < perguntas.length ; i ++) {
        const question = {
            title: "",
			color: "",
			answers: []
        }
        question.title = perguntas[i].querySelector(".forms--nome input:nth-of-type(1)").value;
        question.color = perguntas[i].querySelector(".forms--nome input:nth-of-type(2)").value;

        if (question.title.length < 20) {
            perguntas[i].querySelector(".forms--nome p:nth-of-type(1)").innerHTML = "O título da pergunta deve ter no mínimo 20 caracteres";
            perguntas[i].querySelector(".forms--nome input:nth-of-type(1)").style.backgroundColor = "#FFE9E9";
            validacao = false;
        }

        let answer = {
            text: "",
			image: "",
			isCorrectAnswer: true
        }
        const respostaCorreta = perguntas[i].querySelector(".forms--respostas-corretas .forms__resposta");
        answer.text = respostaCorreta.querySelector("input:nth-of-type(1)").value;
        answer.image = respostaCorreta.querySelector("input:nth-of-type(2)").value;
        if (answer.text === "") {
            respostaCorreta.querySelector("p:nth-of-type(1)").innerHTML = "O texto da resposta não pode estar vazio";
            respostaCorreta.querySelector("input:nth-of-type(1)").style.backgroundColor = "#FFE9E9";
            validacao = false;
        }
        if (answer.image === "") {
            respostaCorreta.querySelector("p:nth-of-type(2)").innerHTML = "A URL da imagem da resposta não pode estar vazio";
            respostaCorreta.querySelector("input:nth-of-type(2)").style.backgroundColor = "#FFE9E9";
            validacao = false;
        } else {
            if (!(/\.(jpg|jpeg|png|webp|avif|gif|svg)$/.test(answer.image))) {
                respostaCorreta.querySelector("p:nth-of-type(2)").innerHTML = "A extensão da imagem não é aceita";
                respostaCorreta.querySelector("input:nth-of-type(2)").style.backgroundColor = "#FFE9E9";
                validacao = false;
            }
            try {
                const imgURL = new URL(respostaCorreta.querySelector("input:nth-of-type(2)").value);
            } catch (_) {
                respostaCorreta.querySelector("p:nth-of-type(2)").innerHTML = "A URL da imagem deve ter formato de URL";
                respostaCorreta.querySelector("input:nth-of-type(2)").style.backgroundColor = "#FFE9E9";
                validacao = false;  
            }
        }
        question.answers.push(answer);
        
        let minimoRespostaIncorreta = false;
        const respostasIncorretas = perguntas[i].querySelectorAll(".forms--respostas-incorretas .forms__resposta");
        for (var x = 0 ; x < respostasIncorretas.length ; x ++) {
            let booleano = true;
            answer = {
                text: "",
                image: "",
                isCorrectAnswer: false
            }
            answer.text = respostasIncorretas[x].querySelector("input:nth-of-type(1)").value;
            answer.image = respostasIncorretas[x].querySelector("input:nth-of-type(2)").value;
            if (answer.text === "" && answer.image === "") {
                continue;
            } 
            if (answer.text === "") {
                respostasIncorretas[x].querySelector("p:nth-of-type(1)").innerHTML = "O texto da resposta não pode estar vazio";
                respostasIncorretas[x].querySelector("input:nth-of-type(1)").style.backgroundColor = "#FFE9E9";
                booleano = false;
                validacao = false;
            }
            if (answer.image === "") {
                respostasIncorretas[x].querySelector("p:nth-of-type(2)").innerHTML = "A URL da imagem da resposta não pode estar vazio";
                respostasIncorretas[x].querySelector("input:nth-of-type(2)").style.backgroundColor = "#FFE9E9";
                booleano = false;
                validacao = false;
            } else {
                if (!(/\.(jpg|jpeg|png|webp|avif|gif|svg)$/.test(answer.image))) {
                    respostasIncorretas[x].querySelector("p:nth-of-type(2)").innerHTML = "A extensão da imagem não é aceita";
                    respostasIncorretas[x].querySelector("input:nth-of-type(2)").style.backgroundColor = "#FFE9E9";
                    booleano = false;
                    validacao = false;
                }
                try {
                    const imgURL = new URL(respostasIncorretas[x].querySelector("input:nth-of-type(2)").value);
                } catch (_) {
                    respostasIncorretas[x].querySelector("p:nth-of-type(2)").innerHTML = "A URL da imagem deve ter formato de URL";
                    respostasIncorretas[x].querySelector("input:nth-of-type(2)").style.backgroundColor = "#FFE9E9";
                    booleano = false;
                    validacao = false;  
                } 
            }

            //OUTRO JEITO PARA ADICIONAR RESPOSTA< PQ VALIDACAO JA TA FALSE EM OUTRAS ETAPAS DE VALIDACAO
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
    const niveis = document.querySelectorAll(".bloco .sub-bloco:nth-of-type(2)");
    let levelsUsuario = []
    let validacao = true;
    let Acerto0Porcento = false;

    const mensagensErro = bloco.closest(".etapa").querySelectorAll("p");
    const inputErro = bloco.closest(".etapa").querySelectorAll("input");
    const textAreaErro = bloco.closest(".etapa").querySelectorAll("textarea");
    for (var i = 0 ; i < mensagensErro.length ; i++) {
        mensagensErro[i].innerHTML = "";
    }
    for (var i = 0 ; i < inputErro.length ; i++) {
        inputErro[i].style.backgroundColor = "#FFFFFF"
    }
    for (var i = 0 ; i < textAreaErro.length ; i++) {
        textAreaErro[i].style.backgroundColor = "#FFFFFF"
    }

    for (var i = 0 ; i < niveis.length ; i ++) {
        const level = {
            title: "",
            image: "",
            text: "",
            minValue: 0
        }
        level.title = niveis[i].querySelector(".forms--nome input:nth-of-type(1)").value; 
        level.minValue = Number(niveis[i].querySelector(".forms--nome input:nth-of-type(2)").value);
        level.image = niveis[i].querySelector(".forms--nome input:nth-of-type(3)").value;
        level.text = niveis[i].querySelector(".forms--nome textarea").value;

        if (level.title.length < 10) {
            niveis[i].querySelector("p:nth-of-type(1)").innerHTML = "O nível do quiz deve ter no mínimo 10 caracteres";
            niveis[i].querySelector("input:nth-of-type(1)").style.backgroundColor = "#FFE9E9"
            validacao = false;
        }

        // CRIAR UMA LISTA COM OS NIVEIS COLOCADOS PELO USUARIO, SE FOR IGUAL, MSG DE ERRO
        for (var x = 0 ; x < levelsUsuario.length ; x ++) {
            if (levelsUsuario[x] === level.minValue && levelsUsuario !== []) {
                niveis[i].querySelector("p:nth-of-type(2)").innerHTML = "Essa % de acerto mínima já foi atríbuida para outro nível";
                niveis[i].querySelector("input:nth-of-type(2)").style.backgroundColor = "#FFE9E9"
            }
        }
        levelsUsuario.push(level.minValue);
        if (level.minValue < 0 || level.minValue > 100 || niveis[i].querySelector(".forms--nome input:nth-of-type(2)").value ==="") {
            niveis[i].querySelector("p:nth-of-type(2)").innerHTML = "A % de acerto mínima deve ser um número entre 0 e 100";
            niveis[i].querySelector("input:nth-of-type(2)").style.backgroundColor = "#FFE9E9"
            validacao = false;
        }
        if (level.minValue === 0) {
            Acerto0Porcento = true;
        }

        if (level.image === "") {
            niveis[i].querySelector("p:nth-of-type(3)").innerHTML = "A URL da imagem não pode estar vazia";
            niveis[i].querySelector("input:nth-of-type(3)").style.backgroundColor = "#FFE9E9"
        } else {
            if (!(/\.(jpg|jpeg|png|webp|avif|gif|svg)$/.test(level.image))) {
                niveis[i].querySelector("p:nth-of-type(3)").innerHTML = "A extensão da imagem não é aceita";
                niveis[i].querySelector("input:nth-of-type(3)").style.backgroundColor = "#FFE9E9";
                validacao = false;
            }
            try {
                const imgURL = new URL(niveis[i].querySelector(".forms--nome input:nth-of-type(3)").value);
            } catch (_) {
                niveis[i].querySelector("p:nth-of-type(3)").innerHTML = "A URL da imagem deve ter formato de URL";
                niveis[i].querySelector("input:nth-of-type(3)").style.backgroundColor = "#FFE9E9";
                validacao = false;  
            }
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