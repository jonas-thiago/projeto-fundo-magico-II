document.addEventListener('DOMContentLoaded', function() {
    // Passo 1
    const form = document.querySelector('.form-group');
    // Passo 2
    const description = document.getElementById('description');

    const htmlCode = document.getElementById('html-code');
    const cssCode = document.getElementById('css-code');
    const preview = document.getElementById('preview-section');

    // Passo 3
    function setLoading(isLoading) {
        const button = document.getElementById('generate-btn');
        if (isLoading) {
            button.innerHTML = 'Gerando Background ...';
        } else {
            button.innerHTML = 'Gerar Background Mágico';
        }
    }

    // Passo 6
    function applyGeneratePreview(html, css) {
        htmlCode.textContent = html;
        cssCode.textContent = css;

        preview.style.display = 'block';
        preview.innerHTML = html;

        const existingStyle = document.getElementById('dynamic-style');
        if (existingStyle){
            existingStyle.remove();
        }
        if(css){
            const style = document.createElement('style');
            style.id = 'dynamic-style'
            style.textContent = css;
            document.head.appendChild(style);
        }
    }

    form.addEventListener('submit', async function(event){
        //Passo 1
        event.preventDefault();

        const descriptionValue = description.value.trim();

        if(!descriptionValue) {
            alert('Descreva como você quer o seu gradiente');
            return;
        }

        // Passo 3
        setLoading(true);

        // Passo 4
        // chave extra do dev em dobro
        // https://n8n.srv830193.hstgr.cloud/webhook/4096b767-f3fb-4244-bb3c-2df7994c2262
        // https://robertodias.app.n8n.cloud/webhook/a87472f9-f3ab-4ed6-927e-be475b06beae
        try {
            const response = await fetch('https://n8n.srv830193.hstgr.cloud/webhook/4096b767-f3fb-4244-bb3c-2df7994c2262', {
                method: 'POST',
                headers: {'Content-Type': 'application/json'},
                body: JSON.stringify({descriptionValue})
            });
            const data = await response.json();

            // Passo 5
            const html = data.html || 'Nenhum código HTML retornado.';
            const css = data.css || 'Nenhum código CSS retornado.';

            applyGeneratePreview(html, css);

        } catch (error){
            console.error('Erro ao gerar o background:', error);
            htmlCode.textContent = 'Erro ao gerar o HTML';
            cssCode.textContent = 'Erro ao gerar o CSS';
            preview.innerHTML = '';
        } finally {
            // Passo 7
            setLoading(false);
        }

    });
    
});

// Objetivo: 
// Enviar um texto de um formulário para uma API do n8n e exibir o resultado o código html, css e colocar a animação no fundo da tela do site.
// Passo:
// 1. No JavaScript, pegar o evento de submit do formulário para evitar o recarregamento da página.
// 2. Obter o valor digitado pelo usuário no campo de texto.
// 3. Exibir um indicador de carregamento enquanto a requisição está sendo processada.
// 4. Fazer uma requisição HTTP (POST) para a API do n8n, enviando o texto do formulário no corpo da requisição em formato JSON.
// 5. Receber a resposta da API do n8n (esperando um JSON com o código HTML/CSS do background).
// 6. Se a resposta for válido, exibir o código HTML/CSS retornado na tela:
//    - Mostrar o HTML e CSS gerado em uma área de preview.
//    - Inserir o CSS retornado dinamicamente na página para aplicar o background.
// 7. Remover o indicador de carregamento após o recebimento da resposta.