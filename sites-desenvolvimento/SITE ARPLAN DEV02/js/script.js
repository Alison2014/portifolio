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
// FIM Função para alternar o menu mobile




// Script para esconder o menu ao rolar a página
let lastScrollTop = 0;
const header = document.querySelector('header');

window.addEventListener('scroll', function () {
    let scrollTop = window.pageYOffset || document.documentElement.scrollTop;
    if (scrollTop > lastScrollTop) {
        // Rolando para baixo: esconde o menu
        header.style.top = "-110px"; // ajuste conforme a altura do seu header
    } else {
        // Rolando para cima: mostra o menu
        header.style.top = "0";
    }
    lastScrollTop = scrollTop <= 0 ? 0 : scrollTop;
});
// FIM Script para esconder o menu ao rolar a página

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

    // MOBILE: só um container por vez
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