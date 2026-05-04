/**
 * BLAZE RECEIVER - Script para receber dados da extensão Chrome
 * 
 * Este script deve ser incluído na página externa (https://playsete7-svg.github.io/Blaze/)
 * para receber dados em tempo real da extensão Chrome.
 * 
 * Uso: <script src="blaze_receiver.js"></script>
 */

console.log("🔗 Blaze Receiver ativado - Aguardando dados da extensão...");

// Listener para receber mensagens da extensão via postMessage
window.addEventListener('message', (event) => {
    // Segurança: verificar origem (opcional, mas recomendado)
    // if (event.origin !== window.location.origin) return;

    // Verificar se a mensagem é do tipo que esperamos
    if (event.data && event.data.type === 'NEW_BLAZE_DATA') {
        const dadoFormatado = event.data.data;
        const numero = event.data.numero;
        const cor = event.data.cor;

        console.log(`📨 Dados recebidos da extensão: ${dadoFormatado} (número: ${numero}, cor: ${cor})`);

        // Chamar a função que adiciona os dados ao gráfico
        if (typeof addTimes === 'function') {
            addTimes([dadoFormatado]);
            console.log(`✅ Dados adicionados ao gráfico`);
        } else {
            console.warn('⚠️ Função addTimes não encontrada. Certifique-se de que o dashboard.js está carregado.');
        }

        // Opcional: Mostrar notificação visual
        if (typeof showToast === 'function') {
            showToast(`📊 Novo dado: ${dadoFormatado}`, 'success');
        }
    }
});

// Função auxiliar para verificar se a extensão está ativa
function checkExtensionStatus() {
    console.log("🔍 Verificando status da extensão...");
    
    // Enviar uma mensagem de teste
    window.postMessage({
        type: "EXTENSION_CHECK",
        timestamp: Date.now()
    }, '*');

    // Aguardar resposta
    setTimeout(() => {
        console.log("💡 Dica: Se nenhum dado aparecer, certifique-se de que:");
        console.log("  1. A extensão está instalada e ativada");
        console.log("  2. Você está visitando um site da Blaze");
        console.log("  3. Esta página está aberta em outra aba");
        console.log("  4. O console não mostra erros de CORS");
    }, 2000);
}

// Executar verificação quando a página carregar
document.addEventListener('DOMContentLoaded', () => {
    setTimeout(checkExtensionStatus, 1000);
});

// Exportar função para teste manual
window.testBlazeReceiver = () => {
    console.log("🧪 Testando Blaze Receiver com dados fictícios...");
    const testData = `${new Date().getHours().toString().padStart(2, '0')}:${new Date().getMinutes().toString().padStart(2, '0')}|up`;
    
    if (typeof addTimes === 'function') {
        addTimes([testData]);
        console.log(`✅ Teste bem-sucedido: ${testData}`);
    } else {
        console.error("❌ Função addTimes não encontrada");
    }
};

console.log("💡 Para testar manualmente, execute no console: testBlazeReceiver()");
