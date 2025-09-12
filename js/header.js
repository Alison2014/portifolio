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