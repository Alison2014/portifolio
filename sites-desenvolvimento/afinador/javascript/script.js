

// 🔥 Guarda a última frequência (usado pra suavizar o valor)
let ultimaFreq = 0;


// 🎤 FUNÇÃO PRINCIPAL → pede acesso ao microfone
async function iniciar(){
    try{
        // Pede permissão para usar o microfone
        const stream = await navigator.mediaDevices.getUserMedia({audio: true});

        // Se permitir, inicia o sistema de áudio
        iniciarAudio(stream);

    }catch(erro){
        alert("Permissão negada para acessar o microfone.");
    }
}


// 🎧 CONFIGURA O SISTEMA DE ÁUDIO
function iniciarAudio(stream){

    // Cria o contexto de áudio (motor do som no navegador)
    const audioContext = new (window.AudioContext || window.webkitAudioContext)();

    // Captura o áudio do microfone
    const mic = audioContext.createMediaStreamSource(stream);

    // Cria analisador de som
    const analyser = audioContext.createAnalyser();
    analyser.fftSize = 2048;

    // Conecta microfone ao analisador
    mic.connect(analyser);

    // Cria buffer (onde os dados do áudio são armazenados)
    const buffer = new Float32Array(analyser.fftSize);


    // 🔁 LOOP PRINCIPAL (fica rodando sempre)
    function analisar() {

        // Pega dados do som em tempo real
        analyser.getFloatTimeDomainData(buffer);
        
        // Calcula a frequência do som
        let freq = autoCorrelate(buffer, audioContext.sampleRate);

        // 🎯 FILTRO → ignora valores inválidos
        if (freq > 80 && freq < 1000){

            // 🔥 SUAVIZAÇÃO (MELHORIA 2)
            freq = (freq + ultimaFreq) / 2;
            ultimaFreq = freq;

            // Mostra frequência na tela
            document.getElementById("frequencia").innerText = 
            freq.toFixed(2) + " Hz";

            // Converte frequência → nota
            let nota = getNota(freq);
            document.getElementById("nota").innerText = nota;

            // Mostra se está afinado ou não
            document.getElementById("status").innerText = 
            afinacao(freq);
        }

        // Continua o loop (tipo um "while" infinito suave)
        requestAnimationFrame(analisar);
    }

    analisar(); // inicia o loop
}


// 🎵 FUNÇÃO QUE DESCOBRE A FREQUÊNCIA REAL DO SOM
function autoCorrelate(buffer, sampleRate) {

  let SIZE = buffer.length;
  let rms = 0;

  // Calcula energia do som
  for (let i = 0; i < SIZE; i++) {
    let val = buffer[i];
    rms += val * val;
  }

  rms = Math.sqrt(rms / SIZE);

  // Se não tem som suficiente → ignora
  if (rms < 0.01) return -1;

  let r1 = 0, r2 = SIZE - 1, threshold = 0.2;

  // Corta partes inúteis do sinal
  for (let i = 0; i < SIZE / 2; i++) {
    if (Math.abs(buffer[i]) < threshold) {
      r1 = i;
      break;
    }
  }

  for (let i = 1; i < SIZE / 2; i++) {
    if (Math.abs(buffer[SIZE - i]) < threshold) {
      r2 = SIZE - i;
      break;
    }
  }

  buffer = buffer.slice(r1, r2);
  SIZE = buffer.length;

  let c = new Array(SIZE).fill(0);

  // Calcula correlação (descobre padrão da onda)
  for (let i = 0; i < SIZE; i++) {
    for (let j = 0; j < SIZE - i; j++) {
      c[i] += buffer[j] * buffer[j + i];
    }
  }

  let d = 0;
  while (c[d] > c[d + 1]) d++;

  let maxval = -1, maxpos = -1;

  // Encontra melhor ponto da onda
  for (let i = d; i < SIZE; i++) {
    if (c[i] > maxval) {
      maxval = c[i];
      maxpos = i;
    }
  }

  let T0 = maxpos;

  // Converte para frequência
  return sampleRate / T0;
}


// 🎼 CONVERTE FREQUÊNCIA (Hz) → NOTA MUSICAL
function getNota(freq) {

  const notas = ["C", "C#", "D", "D#", "E", "F", "F#", "G", "G#", "A", "A#", "B"];

  let A4 = 440;

  // calcula número da nota (padrão MIDI)
  let noteNumber = 12 * (Math.log2(freq / A4)) + 69;

  noteNumber = Math.round(noteNumber);

  // 🎷 AQUI ESTÁ A MÁGICA (modo sax alto)
  noteNumber += 9;

  let index = noteNumber % 12;

  return notas[index];
}

// 🎯 VERIFICA SE ESTÁ AFINADO
function afinacao(freq) {

  let A4 = 440;

  // Calcula diferença em cents (precisão musical)
  let diferenca = 1200 * Math.log2(freq / A4);

  if (Math.abs(diferenca) < 5) return "✔ Afinado";
  if (diferenca > 0) return "↑ Agudo";
  return "↓ Grave";
}