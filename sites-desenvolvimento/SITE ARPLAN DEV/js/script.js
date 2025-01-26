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

 /*CARROSSEL-OBRAS*/
 $(document).ready(function(){
    $('#owl-latest-project').owlCarousel({
        items: 3, // Quantidade de itens por vez
        loop: true, // Habilita o loop
        margin: 10, // Margem entre os itens
        autoplay: true, // Ativa o autoplay
        autoplayTimeout: 3000, // Tempo de troca de imagem (em milissegundos)
        responsive: {
            0: {
                items: 1 // Exibe 1 item em telas pequenas
            },
            600: {
                items: 2 // Exibe 2 itens em telas médias
            },
            1000: {
                items: 3 // Exibe 3 itens em telas grandes
            }
        }
    });
});

