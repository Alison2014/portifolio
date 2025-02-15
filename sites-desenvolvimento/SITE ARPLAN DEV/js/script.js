function menuShow() {
    let menuMobile = document.querySelector('.mobile-menu');
    if (menuMobile.classList.contains('open')) {
        menuMobile.classList.remove('open');
        document.querySelector('.icone').src = "img/menu-alt-svgrepo-com.svg"
    } else {
        menuMobile.classList.add('open');
        document.querySelector('.icone').src = "img/close-lg-svgrepo-com.svg"
    }
    
    /*CODIGO PARA QUANDO ABRIR O MENU O BODY TRAVAR*/
    document.body.classList.toggle('menu-aberto');
    document.querySelector('#menu').classList.toggle('menu-aberto');
 }

 
/*SCROLL DO SITE*/ 

/*FUNÇAO PARA OBSERVAR ALGUM ELEMENTO, QUANDO TIVER MUDANÇA ELE ME AVISA*/
const myObserver = new IntersectionObserver((observacao) => {
    observacao.forEach( (entry) => {
        if(entry.isIntersecting){
            entry.target.classList.add('show')
        }
    })
})

const elements = document.querySelectorAll('.scroll');

/*REUNI TODOS OS ELEMENTOS E TRANSFORMA ELE EM LISTA E VAI PEGANDO ELEMENT POR ELEMENT*/
elements.forEach((element) => myObserver.observe(element));/*MY OBSERVE ITEM PARA SER OBSERVADO*/

/*SCROLL DO SITE*/ 


/*PARTE DA ANIMAÇÃO  DO FLIP QUADRADOS*/
document.querySelectorAll('.flip').forEach(flip => {
    flip.addEventListener('click', function() {
        // Alterna a classe que controla a rotação
        flip.classList.toggle('flip-rotate');
        
        // Define o tempo para reverter a rotação após 3 segundos
        setTimeout(() => {
            flip.classList.toggle('flip-rotate');
        }, 3000); // 3000ms = 3 segundos
    });
});
/*PARTE DA ANIMAÇÃO  DO FLIP QUADRADOS*/

/* FUNÇAÕ ESCONDE TELA DE CARREGAMENTO LOANDING*/
window.onload = function() {
    setTimeout(function() {
      document.getElementById("loading-screen").style.display = "none";  // Esconde a tela de carregamento
      document.getElementById("content").style.display = "block";  // Exibe o conteúdo do site
    }, 3500); // Exemplo de 3 segundos de tela de carregamento
  };
/* FUNÇAÕ ESCONDE TELA DE CARREGAMENTO LOANDING*/
let slideIndex = 1; // Começa no slide 1 (ignorando o slide duplicado no início)
let intervalo;

/*FUNÇÃO SLIDE CARROSSEL*/
function mostrarSlide(index) {
    const slides = document.querySelector('.slides');
    const totalSlides = document.querySelectorAll('.slide').length;

    // Ajusta o índice para criar o efeito infinito
    if (index >= totalSlides - 2) { // Ignora os slides duplicados no final
        slideIndex = 1; // Volta para o primeiro slide real
        slides.style.transition = 'none'; // Remove a transição para o salto
        slides.style.transform = `translateX(${-slideIndex * (100 / 3)}%)`;
        setTimeout(() => {
            slides.style.transition = 'transform 0.7s ease-in-out'; // Restaura a transição
        }, 0);
    } else if (index < 1) { // Ignora os slides duplicados no início
        slideIndex = totalSlides - 3; // Volta para o último slide real
        slides.style.transition = 'none'; // Remove a transição para o salto
        slides.style.transform = `translateX(${-slideIndex * (100 / 3)}%)`;
        setTimeout(() => {
            slides.style.transition = 'transform 0.7s ease-in-out'; // Restaura a transição
        }, 0);
    } else {
        slideIndex = index;
    }

    // Calcula o deslocamento com base no slide atual
    let slidesVisiveis;
    if (window.innerWidth > 700) {
        slidesVisiveis = 3; // 3 slides visíveis
    } else if (window.innerWidth > 380) {
        slidesVisiveis = 2; // 2 slides visíveis
    } else {
        slidesVisiveis = 1; // 1 slide visível
    }

    const offset = -slideIndex * (100 / slidesVisiveis); // Avança de 1 slide por vez
    slides.style.transform = `translateX(${offset}%)`;
}

function moverSlide(n) {
    // Reinicia o intervalo sempre que um botão é clicado
    reiniciarIntervalo();
    mostrarSlide(slideIndex + n);
}

// Função para passar o slide automaticamente
function autoPlay() {
    moverSlide(1); // Avança para o próximo slide
}

// Configura o intervalo para passar os slides a cada 3 segundos (3000ms)
function iniciarIntervalo() {
    intervalo = setInterval(autoPlay, 3000);
}

// Reinicia o intervalo (usado quando um botão é clicado)
function reiniciarIntervalo() {
    clearInterval(intervalo);
    iniciarIntervalo();
}

// Pausa o autoplay quando o mouse está sobre o carrossel
const carrossel = document.querySelector('.carrossel');
carrossel.addEventListener('mouseenter', () => {
    clearInterval(intervalo);
});

// Retoma o autoplay quando o mouse sai do carrossel
carrossel.addEventListener('mouseleave', () => {
    iniciarIntervalo();
});

// Inicializa o carrossel
mostrarSlide(slideIndex);
iniciarIntervalo(); // Inicia o autoplay
/*FUNÇÃO SLIDE CARROSSEL*/