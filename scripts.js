const tipoSelect = document.getElementById('tipo');
const campoTexto = document.getElementById('campoTexto');
const textoArea = document.getElementById('texto');
const resultado = document.getElementById('resultado');

tipoSelect.addEventListener('change', () => {
  const tipo = tipoSelect.value;
  if (tipo) {
    campoTexto.classList.remove('hidden');
    textoArea.value = `* ENCERRAMENTO DO REPARO *\n
&&& MAMINFO\n

- MSG DE ENCERRAMENTO\n
NUMERO DO RAT: \n
NOME DO TECNICO: \n
NOME E CONTATO DO CLIENTE QUE CONCORDA COM O LAUDO: \n
NOME E CONTATO DO RECLAMANTE QUE CONFIRMA NORMALIZAÇÃO: \n
PROBLEMA ENCONTRADO: \n
CAUSA RAIZ: \n
ACAO CORRETIVA EXECUTADA: \n
CODIGO DE ENCERRAMENTO: `;
  } else {
    campoTexto.classList.add('hidden');
    textoArea.value = '';
  }
});

textoArea.addEventListener('input', () => {
  const start = textoArea.selectionStart;
  const end = textoArea.selectionEnd;
  textoArea.value = textoArea.value.toUpperCase();
  textoArea.setSelectionRange(start, end);
});

function formatarTexto() {
  const linhasOriginais = textoArea.value.toUpperCase().split('\n');
  const linhasFormatadas = [];

  // Alterado para fatiar a cada 75 caracteres
  linhasOriginais.forEach(linha => {
    while (linha.length > 0) {
      linhasFormatadas.push(linha.slice(0, 75));
      linha = linha.slice(75);
    }
  });

  resultado.innerHTML = '';

  const blocos = [];
  for (let i = 0; i < linhasFormatadas.length; i += 10) {
    blocos.push(linhasFormatadas.slice(i, i + 10));
  }

  blocos.forEach((bloco, index) => {
    if (index < blocos.length - 1 && bloco.length > 0) {
      const tag = '>>>>>F8>>>>>';
      const primeiraLinha = bloco[0];

      if (primeiraLinha.length + tag.length <= 75) {
        bloco[0] += tag;
      } else {
        const disponivel = 75 - tag.length;
        bloco[0] = primeiraLinha.slice(0, disponivel) + tag;
        bloco.splice(1, 0, primeiraLinha.slice(disponivel));
      }
    }

    const blocoFormatado = bloco.map(l => l.padEnd(75)).join('\n');

    const card = document.createElement('div');
    card.className = 'card';

    const div = document.createElement('div');
    div.className = 'bloco';
    div.textContent = blocoFormatado;

    const btn = document.createElement('button');
    btn.textContent = 'Copiar';
    btn.onclick = () => {
      navigator.clipboard.writeText(blocoFormatado).then(() => {
        btn.classList.add('copiado');
        btn.textContent = 'Copiado!';
      });
    };

    card.appendChild(div);
    card.appendChild(btn);
    resultado.appendChild(card);
  });
}

function resetarTudo() {
  tipoSelect.value = '';
  campoTexto.classList.add('hidden');
  textoArea.value = '';
  resultado.innerHTML = '';
}