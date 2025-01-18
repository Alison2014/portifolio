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


