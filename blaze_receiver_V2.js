/**
 * BLAZE RECEIVER V2 - ULTRA COMPATÍVEL
 * Cole este código no final do seu dashboard.js ou em um novo arquivo blaze_receiver.js
 */

(function() {
    console.log("%c🔗 RECEPTOR BLAZE V2 INICIADO", "color: #ffd700; font-weight: bold;");

    const processarMensagem = (event) => {
        // Validar se a mensagem vem da nossa extensão
        if (event.data && event.data.type === 'NEW_BLAZE_DATA') {
            const { data, numero, cor } = event.data;
            
            console.log(`%c📥 DADO RECEBIDO: ${data}`, "color: #00ff00; font-weight: bold;");

            // Tentar adicionar ao gráfico usando as funções globais do seu dashboard
            if (typeof window.addTimes === 'function') {
                window.addTimes([data]);
            } else if (typeof addTimes === 'function') {
                addTimes([data]);
            } else {
                console.error("❌ ERRO: Função 'addTimes' não encontrada no dashboard.js");
                // Tentativa de fallback: adicionar diretamente ao array allTimes se ele for global
                if (typeof allTimes !== 'undefined') {
                    allTimes.push(data);
                    if (typeof updateUI === 'function') updateUI();
                }
            }

            // Feedback visual (Toast)
            if (typeof showToast === 'function') {
                showToast(`📊 Novo dado: ${data}`, 'success');
            }
        }
    };

    // Escutar mensagens da janela (postMessage)
    window.addEventListener('message', processarMensagem);

    // Teste de integridade
    setTimeout(() => {
        if (typeof addTimes !== 'function' && typeof window.addTimes !== 'function') {
            console.warn("%c⚠️ AVISO: A função 'addTimes' ainda não foi carregada. Certifique-se de que o dashboard.js está ANTES deste script.", "color: #ff8800;");
        }
    }, 2000);
})();
