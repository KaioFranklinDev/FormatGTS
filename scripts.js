const tipoSelect = document.getElementById('tipo');
const campoTexto = document.getElementById('campoTexto');
const textoArea = document.getElementById('texto');
const resultado = document.getElementById('resultado');

tipoSelect.addEventListener('change', () => {
  const tipo = tipoSelect.value;
  if (tipo) {
    campoTexto.classList.remove('hidden');
    textoArea.value = `*${tipo}*\nRAT:\nNOME TECNICO:\nNOME CLIENT:`;
  } else {
    campoTexto.classList.add('hidden');
    textoArea.value = '';
  }
});

textoArea.addEventListener('input', (e) => {
  const start = textoArea.selectionStart;
  const end = textoArea.selectionEnd;
  textoArea.value = textoArea.value.toUpperCase();
  textoArea.setSelectionRange(start, end);
});

function formatarTexto() {
  const linhasOriginais = textoArea.value.toUpperCase().split('\n');
  const linhasFormatadas = [];

  linhasOriginais.forEach(linha => {
    while (linha.length > 0) {
      linhasFormatadas.push(linha.slice(0, 30));
      linha = linha.slice(30);
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

      if (primeiraLinha.length + tag.length <= 30) {
        bloco[0] += tag;
      } else {
        const disponivel = 30 - tag.length;
        bloco[0] = primeiraLinha.slice(0, disponivel) + tag;
        bloco.splice(1, 0, primeiraLinha.slice(disponivel));
      }
    }

    const blocoFormatado = bloco.map(l => l.padEnd(30)).join('\n');

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