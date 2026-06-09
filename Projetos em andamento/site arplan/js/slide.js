const slides = document.querySelectorAll('.carousel-slide');
const dots = document.querySelectorAll('.dot');

const slideTexts = [
    "Precisão suíça, experiência brasileira.",
    "Excelência em climatização para empresas e pessoas.",
    "Seu ambiente nossa prioridade.",
    "Conforto que se traduz em bem estar e produtividade",
    "Seu conforto, nossa missão há mais de 35 anos."
];

let currentSlide = 0;
let typingTimeout;

const textDiv = document.querySelector('.azul-texto');

function typeText(text) {
    clearTimeout(typingTimeout);
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
