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


