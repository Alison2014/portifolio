// Função para exibir a mensagem de sucesso
function enviarMensagem() {
    // Impede o envio imediato do formulário
    event.preventDefault();

    // Exibe a mensagem de sucesso
    document.getElementById('success-message').classList.remove('hidden');

    // Simula o envio do formulário após 3 segundos
    setTimeout(function() {
        document.getElementById('success-message').classList.add('hidden'); 
    }, 10000); // 10 segundos de espera

    return false; // Impede o envio imediato
}
