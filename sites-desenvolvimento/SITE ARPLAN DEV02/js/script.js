/*LINHA ABAIXO DOS BOTOES*/
document.addEventListener('DOMContentLoaded', () => {
    const buttons = document.querySelectorAll('.perso');
    let path = window.location.pathname; // "/sobre.html"
    let currentPage = path.split('/').pop(); // extrai só "sobre.html"

    if (!currentPage) {
        currentPage = 'index.html'; // padrão
    }

    buttons.forEach(button => {
        const link = button.getAttribute('data-link');
        if (link === currentPage) {
            button.classList.add('active');
        }
    });
});
/*LINHA ABAIXO DOS BOTOES*/



//SCRIPT SLIDE
const slides = document.querySelectorAll('.carousel-slide');
const dots = document.querySelectorAll('.dot');
const textDiv = document.querySelector('.azul-texto');

const slideTexts = [
    "Precisão suíça, experiência brasileira.",
    "Excelência em climatização para empresas e pessoas.",
    "Seu ambiente nossa prioridade.",
    "Conforto que se traduz em bem estar e produtividade",
    "Seu conforto, nossa missão há mais de 35 anos."
];

let currentSlide = 0;
let typingTimeout;

function typeText(text) {
    clearTimeout(typingTimeout); // Cancela se houver texto sendo digitado
    textDiv.innerHTML = "";
    let i = 0;
    const speed = 40; // Velocidade de digitação em milissegundos

    function type() {
        if (i < text.length) {
            textDiv.innerHTML += text.charAt(i);
            i++;
            typingTimeout = setTimeout(type, speed);
        }
    }

    type();
}

function showSlide(index) {
    slides.forEach((slide, i) => {
        slide.classList.toggle('active', i === index);
        dots[i].classList.toggle('active', i === index);
    });

    currentSlide = index;
    typeText(slideTexts[index]);
}

function showNextSlide() {
    const nextIndex = (currentSlide + 1) % slides.length;
    showSlide(nextIndex);
}

// Avanço automático
setInterval(showNextSlide, 4000);

// Clicar nos indicadores
dots.forEach(dot => {
    dot.addEventListener('click', () => {
        const index = parseInt(dot.getAttribute('data-slide'));
        showSlide(index);
    });
});

// Texto inicial
typeText(slideTexts[0]);
//FIM SCRIPT SLIDE

// Função para exibir a mensagem de sucesso
function enviarMensagem() {
    // Impede o envio imediato do formulário
    event.preventDefault();

    // Exibe a mensagem de sucesso
    document.getElementById('success-message').classList.remove('hidden');

    // Simula o envio do formulário após 3 segundos
    setTimeout(function () {
        document.getElementById('success-message').classList.add('hidden');
    }, 8000); // 8 segundos de espera

    return false; // Impede o envio imediato
}


function menuShow() {
    const btn = document.getElementById('btn-menu');

    // Alterna a classe 'ativar' no botão para animar o ícone
    btn.classList.toggle('ativar');

    // Seleciona o menu mobile
    let menuMobile = document.querySelector('.mobile-menu');

    // Alterna a classe 'open' no menu para mostrar ou ocultar
    if (menuMobile) {
        menuMobile.classList.toggle('open');
    }

    // Bloqueia ou desbloqueia o rolar da página
    document.body.classList.toggle('menu-aberto');
}






