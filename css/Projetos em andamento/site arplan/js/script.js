/*LINHA ABAIXO DOS BOTOES UL*/
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
/*LINHA ABAIXO DOS BOTOES UL*/



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
// FIM Função para exibir a mensagem de sucesso


// Função para alternar o menu mobile
function menuShow() {
    const btn = document.getElementById('btn-menu');

    btn.classList.toggle('ativar');

    let menuMobile = document.querySelector('.mobile-menu');

    if (menuMobile) {
        menuMobile.classList.toggle('open');
    }

    document.body.classList.toggle('menu-aberto');
}
// FIM Função para alternar o menu mobile


// Script para o slider de fotos na seção "Sobre" e "Arplan"
let currentIndex = 0;
const slider = document.querySelector('.foto_flex');
const items = document.querySelectorAll('.foto_flex .img-container2');

if (slider && items.length > 1) {
    setInterval(() => {
        currentIndex = (currentIndex + 1) % items.length;
        slider.scrollTo({
            left: items[currentIndex].offsetLeft,
            behavior: 'smooth'
        });
    }, 4000);
}
// FIM Script para o slider de fotos na seção "Sobre" e "Arplan"


// Script para o slider de fotos na seção "Sobre"

let slideFotos2Interval = null;

function slideFotos2() {
    const containers = Array.from(document.querySelectorAll('.foto_flex .img-container2'));
    if (containers.length < 2) return;

    // DESKTOP: mostra todos os containers
    if (window.innerWidth > 999) {
        containers.forEach(c => c.classList.add('active'));
        if (slideFotos2Interval) {
            clearInterval(slideFotos2Interval);
            slideFotos2Interval = null;
        }
        return;
    }


    containers.forEach(c => c.classList.remove('active'));
    let current = 0;
    containers[current].classList.add('active');

    if (slideFotos2Interval) clearInterval(slideFotos2Interval);

    slideFotos2Interval = setInterval(() => {
        containers[current].classList.remove('active');
        current = (current + 1) % containers.length;
        containers[current].classList.add('active');
    }, 2000);
}

window.addEventListener('DOMContentLoaded', slideFotos2);
window.addEventListener('resize', slideFotos2);

let slideFotos3Interval = null;

function slideFotos3() {
    const containers = Array.from(document.querySelectorAll('.foto_flex_arplan .img-container3'));
    if (containers.length < 2) return;


    if (window.innerWidth > 999) {
        containers.forEach(c => c.classList.add('active'));
        if (slideFotos3Interval) {
            clearInterval(slideFotos3Interval);
            slideFotos3Interval = null;
        }
        return;
    }


    containers.forEach(c => c.classList.remove('active'));
    let current = 0;
    containers[current].classList.add('active');

    if (slideFotos3Interval) clearInterval(slideFotos3Interval);

    slideFotos3Interval = setInterval(() => {
        containers[current].classList.remove('active');
        current = (current + 1) % containers.length;
        containers[current].classList.add('active');
    }, 2000);
}

window.addEventListener('DOMContentLoaded', slideFotos3);
window.addEventListener('resize', slideFotos3);
// Mobile: Script para o slider de fotos na seção "Sobre" e "Arplan"


// Efeito de entrada nas fotos ao rolar a página, com delay entre cada uma
document.addEventListener('DOMContentLoaded', function () {
    const fotos = document.querySelectorAll('.foto');

    function revealOnScroll() {
        const windowBottom = window.innerHeight + window.scrollY;
        let delay = 0;
        fotos.forEach(foto => {
            const fotoTop = foto.getBoundingClientRect().top + window.scrollY;
            if (windowBottom > fotoTop + 60 && !foto.classList.contains('visible')) {
                setTimeout(() => {
                    foto.classList.add('visible');
                }, delay);
                delay += 150; // 150ms entre cada foto
            }
        });
    }

    revealOnScroll();
    window.addEventListener('scroll', revealOnScroll);
});
// Efeito de entrada nas fotos ao rolar a página, com delay entre cada uma


// Efeito de entrada elegante da esquerda ao rolar a página
document.addEventListener('DOMContentLoaded', function () {
    const elementos = document.querySelectorAll('.efeito-entrada-esquerda');

    function revealOnScroll() {
        const windowBottom = window.innerHeight + window.scrollY;
        elementos.forEach(el => {
            const elTop = el.getBoundingClientRect().top + window.scrollY;
            if (windowBottom > elTop + 60) {
                el.classList.add('visible');
            }
        });
    }

    revealOnScroll();
    window.addEventListener('scroll', revealOnScroll);
});