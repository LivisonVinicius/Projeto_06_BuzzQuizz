let titulo, imgURL, numeroPerguntas, numeroNiveis;

function trocarEtapaI() {
    if (validarEtapaI()) {
        document.querySelector(".etapa--inicial").classList.toggle("escondido");
        document.querySelector(".etapa--perguntas").classList.toggle("escondido");
    } else {
        alert("Pelo menos um dos dados inseridos não são válidos!");
    }
}
function validarEtapaI() {
    titulo = document.querySelector(".etapa--inicial .titulo").value;
    numeroPerguntas = Number(document.querySelector(".etapa--inicial .numero-perguntas").value);
    numeroNiveis = Number(document.querySelector(".etapa--inicial .numero-niveis").value);

    if (titulo.length < 20 || titulo.length > 65) {
        return false;
    } 
    try {
        imgURL = new URL(document.querySelector(".etapa--inicial .img-url").value);
    } catch (_) {
        return false;  
    }
    if (!(/\.(jpg|jpeg|png|webp|avif|gif|svg)$/.test(imgURL))) {
        return false;
    } 
    if (numeroPerguntas < 3) {
        return false;
    } 
    if (numeroNiveis < 2) {
        return false;
    }
    return true;
}

function trocarEtapaII() {
    document.querySelector(".etapa--perguntas").classList.toggle("escondido");
    document.querySelector(".etapa--niveis").classList.toggle("escondido");
}
function trocarEtapaIII() {
    document.querySelector(".etapa--niveis").classList.toggle("escondido");
    document.querySelector(".etapa--final").classList.toggle("escondido");
}
