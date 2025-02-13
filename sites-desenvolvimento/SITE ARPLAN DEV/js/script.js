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