// Alternar abas
function switchTab(tab) {
    document.getElementById('section-numeros').classList.toggle('active', tab === 'numeros');
    document.getElementById('section-frases').classList.toggle('active', tab === 'frases');

    document.getElementById('btn-tab-num').className = tab === 'numeros' ? 'active-btn' : '';
    document.getElementById('btn-tab-frase').className = tab === 'frases' ? 'active-btn' : '';
}

// Sorteio de Números
function sortearNumeros() {
    const min = parseInt(document.getElementById('num-inicial').value);
    const max = parseInt(document.getElementById('num-final').value);
    const qtd = parseInt(document.getElementById('num-qtd').value);

    if (isNaN(min) || isNaN(max)) {
        alert("Defina o intervalo numérico!");
        return;
    }

    abrirModal();

    document.getElementById('btn-girar').onclick = () => {
        let resultados = [];
        for (let i = 0; i < qtd; i++) {
            resultados.push(Math.floor(Math.random() * (max - min + 1)) + min);
        }
        exibirResultadoComSuspense(resultados);
    };
}

// Sorteio de Frases
function prepararSorteioFrases() {
    const texto = document.getElementById('campo-frases').value;
    const frases = texto.split('\n').map(f => f.trim()).filter(f => f !== "");
    const qtd = parseInt(document.getElementById('frase-qtd').value);

    if (frases.length === 0 || frases.length < qtd) {
        alert("Verifique se as frases e a quantidade estão corretas!");
        return;
    }

    abrirModal();

    document.getElementById('btn-girar').onclick = () => {
        let embaralhado = [...frases].sort(() => Math.random() - 0.5);
        exibirResultadoComSuspense(embaralhado.slice(0, qtd));
    };
}

// Função de Suspense (Revelação Gradual)
async function exibirResultadoComSuspense(lista) {
    const container = document.getElementById('resultado-texto');
    const btnGirar = document.getElementById('btn-girar');
    
    container.innerHTML = "";
    btnGirar.disabled = true; // Evita cliques múltiplos durante a animação
    btnGirar.innerText = "SORTEANDO...";

    for (let item of lista) {
        const p = document.createElement('p');
        p.innerText = item;
        p.className = "resultado-item";
        container.appendChild(p);
        
        // Delay de 600ms para criar o suspense
        await new Promise(r => setTimeout(r, 600));
        p.classList.add('reveal');
    }

    btnGirar.disabled = false;
    btnGirar.innerText = "GIRAR NOVAMENTE 🎲";
}

function abrirModal() {
    document.getElementById('modal-giro').style.display = 'flex';
    document.getElementById('resultado-texto').innerHTML = "<p style='color:#888'>Clique no botão acima!</p>";
}

function fecharModal() {
    document.getElementById('modal-giro').style.display = 'none';
    document.getElementById('btn-girar').innerText = "GIRAR SORTEADOR 🎲";
}