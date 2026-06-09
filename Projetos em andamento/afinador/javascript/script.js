let animationId = null;
let streamGlobal = null;
let audioContextGlobal = null;

let rodando = false;
let ultimaFreq = 0;
let ultimoAngulo = 0;

let tempoSemSom = 0;
let delayReset = 3000;

// =========================
// ELEMENTOS UI
// =========================
const elFreq = document.querySelector(".frequency");
const elNota = document.querySelector(".note");
const elStatus = document.querySelector(".status-message");
const elDeviation = document.querySelector(".deviation");

const bars = {
    flat: document.querySelector(".flat"),
    flatMild: document.querySelector(".flat-mild"),
    perfect: document.querySelector(".perfect"),
    sharpMild: document.querySelector(".sharp-mild"),
    sharp: document.querySelector(".sharp"),
};

// =========================
// INICIAR
// =========================
async function iniciar() {
    if (rodando) return;

    try {
        const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
        streamGlobal = stream;
        rodando = true;

        iniciarAudio(stream);

        elStatus.innerText = "Ouvindo...";
    } catch (erro) {
        alert("Permissão negada para acessar o microfone.");
    }
}

// =========================
// PARAR
// =========================
function parar() {
    rodando = false;

    if (animationId) cancelAnimationFrame(animationId);

    if (streamGlobal) {
        streamGlobal.getTracks().forEach(t => t.stop());
    }

    if (audioContextGlobal) {
        audioContextGlobal.close();
    }

    elFreq.innerText = "0 Hz";
    elNota.innerText = "--";
    elStatus.innerText = "Parado";
    elDeviation.innerText = "CENT DEVIATION: 0";

    resetBars();
}

// =========================
// ÁUDIO
// =========================
function iniciarAudio(stream) {
    const audioContext = new (window.AudioContext || window.webkitAudioContext)();
    audioContextGlobal = audioContext;

    const mic = audioContext.createMediaStreamSource(stream);
    const analyser = audioContext.createAnalyser();

    analyser.fftSize = 2048;
    mic.connect(analyser);

    const buffer = new Float32Array(analyser.fftSize);

    function analisar() {
        if (!rodando) return;

        analyser.getFloatTimeDomainData(buffer);

        let freq = autoCorrelate(buffer, audioContext.sampleRate);

        if (freq === -1) {
            tempoSemSom += 16;

            if (tempoSemSom > delayReset) {
                elStatus.innerText = "Aguardando...";
                elFreq.innerText = "0 Hz";
                elNota.innerText = "--";
                elDeviation.innerText = "CENT DEVIATION: 0";
                resetBars();
            }

            animationId = requestAnimationFrame(analisar);
            return;
        }

        tempoSemSom = 0;

        if (freq > 80 && freq < 1000) {
            freq = (freq * 0.2) + (ultimaFreq * 0.8);
            ultimaFreq = freq;

            elFreq.innerText = freq.toFixed(1) + " Hz";

            let nota = getNota(freq);
            elNota.innerText = nota;

            let cents = getCents(freq);
            elDeviation.innerText = `CENT DEVIATION: ${cents.toFixed(0)}`;

            updateBars(cents);

            if (Math.abs(cents) < 5) {
                elStatus.innerText = "PERFEITAMENTE AFINADO";
                elStatus.style.color = "green";
            } else if (cents > 0) {
                elStatus.innerText = "AGUDO";
                elStatus.style.color = "red";
            } else {
                elStatus.innerText = "GRAVE";
                elStatus.style.color = "blue";
            }
        }

        animationId = requestAnimationFrame(analisar);
    }

    analisar();
}

// =========================
// CENTS (DESVIO REAL)
// =========================
function getCents(freq) {
    let A4 = 440;
    let note = 12 * (Math.log2(freq / A4)) + 69;
    let rounded = Math.round(note);

    let ideal = A4 * Math.pow(2, (rounded - 69) / 12);

    return 1200 * Math.log2(freq / ideal);
}

// =========================
// BARRA VISUAL
// =========================
function updateBars(cents) {
    resetBars();

    if (Math.abs(cents) < 5) {
        bars.perfect.classList.add("active");
    } else if (cents < -5 && cents > -20) {
        bars.flatMild.classList.add("active");
    } else if (cents <= -20) {
        bars.flat.classList.add("active");
    } else if (cents > 5 && cents < 20) {
        bars.sharpMild.classList.add("active");
    } else if (cents >= 20) {
        bars.sharp.classList.add("active");
    }
}

function resetBars() {
    Object.values(bars).forEach(b => b.classList.remove("active"));
}

// =========================
// AUTO CORRELATE (igual o seu)
// =========================
function autoCorrelate(buffer, sampleRate) {
    let SIZE = buffer.length;
    let rms = 0;

    for (let i = 0; i < SIZE; i++) rms += buffer[i] * buffer[i];

    rms = Math.sqrt(rms / SIZE);
    if (rms < 0.02) return -1;

    let r1 = 0, r2 = SIZE - 1, threshold = 0.2;

    for (let i = 0; i < SIZE / 2; i++) {
        if (Math.abs(buffer[i]) < threshold) { r1 = i; break; }
    }

    for (let i = 1; i < SIZE / 2; i++) {
        if (Math.abs(buffer[SIZE - i]) < threshold) { r2 = SIZE - i; break; }
    }

    buffer = buffer.slice(r1, r2);
    SIZE = buffer.length;

    let c = new Array(SIZE).fill(0);

    for (let i = 0; i < SIZE; i++) {
        for (let j = 0; j < SIZE - i; j++) {
            c[i] += buffer[j] * buffer[j + i];
        }
    }

    let d = 0;
    while (c[d] > c[d + 1]) d++;

    let maxval = -1, maxpos = -1;

    for (let i = d; i < SIZE; i++) {
        if (c[i] > maxval) {
            maxval = c[i];
            maxpos = i;
        }
    }

    return sampleRate / maxpos;
}

// =========================
// NOTA
// =========================
function getNota(freq) {
    const notas = ["C","C#","D","D#","E","F","F#","G","G#","A","A#","B"];
    let n = 12 * (Math.log2(freq / 440)) + 69;
    n = Math.round(n);
    n += 9;

    let index = n % 12;
    if (index < 0) index += 12;

    return notas[index];
}