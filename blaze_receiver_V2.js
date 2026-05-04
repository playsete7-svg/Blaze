/**
 * BLAZE RECEIVER V2 - CORRIGIDO
 * Este arquivo deve ser renomeado para 'blaze_receiver_V2.js' no seu GitHub.
 */

(function() {
    console.log("%c🔗 RECEPTOR BLAZE CORRIGIDO INICIADO", "color: #00ffff; font-weight: bold;");

    const processarMensagem = (event) => {
        // Validar se a mensagem tem o tipo esperado
        if (event.data && event.data.type === 'NEW_BLAZE_DATA') {
            const { data } = event.data;
            
            console.log(`%c📥 DADO RECEBIDO DA EXTENSÃO: ${data}`, "color: #00ff00; font-weight: bold;");

            // Tentar adicionar ao gráfico usando a função global addTimes
            if (typeof window.addTimes === 'function') {
                window.addTimes([data]);
                console.log("✅ Função addTimes executada com sucesso.");
            } else {
                console.error("❌ ERRO: Função 'addTimes' não encontrada. Certifique-se de que ela está definida globalmente no index.html.");
                
                // Fallback: Tentar injetar no allTimes se ele for global
                if (typeof window.allTimes !== 'undefined') {
                    window.allTimes.push(data);
                    if (typeof window.updateUI === 'function') window.updateUI();
                    console.log("⚠️ Fallback: Adicionado diretamente ao array allTimes.");
                }
            }

            // Feedback visual se a função showToast existir
            if (typeof window.showToast === 'function') {
                window.showToast(`📊 Novo dado: ${data}`, 'success');
            }
        }
    };

    // Escutar mensagens da janela (postMessage)
    // O '*' no postMessage da extensão permite que qualquer origem receba, 
    // mas aqui filtramos pelo tipo da mensagem.
    window.addEventListener('message', processarMensagem);

    // Verificação inicial
    setTimeout(() => {
        if (typeof window.addTimes !== 'function') {
            console.warn("%c⚠️ AVISO: A função 'addTimes' não foi detectada no escopo global. Verifique o index.html.", "color: #ff8800;");
        } else {
            console.log("%c✅ Comunicação com o Dashboard pronta.", "color: #00ff00;");
        }
    }, 3000);
})();
