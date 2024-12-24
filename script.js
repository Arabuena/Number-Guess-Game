// Dados dos exercícios - Nível 1
const level1Exercises = [
    { equation: "(+2) + (+3) = ?", answer: 5, hint: "Soma de dois números positivos." },
    { equation: "(+4) - (-2) = ?", answer: 6, hint: "Subtração de um número negativo." },
    { equation: "(-9) + (+3) = ?", answer: -6, hint: "Soma de um número negativo e positivo." },
    { equation: "(+7) - (+5) = ?", answer: 2, hint: "Subtração de dois números positivos." },
    { equation: "(-5) - (-2) = ?", answer: -3, hint: "Subtração de dois números negativos." }
];

// Dados dos exercícios - Nível 2
const level2Exercises = [
    { equation: "(+2) * (+3) = ?", answer: 6, hint: "Multiplicação de dois números positivos." },
    { equation: "(+4) * (-2) = ?", answer: -8, hint: "Multiplicação de um número positivo e negativo." },
    { equation: "(-3) * (+3) = ?", answer: -9, hint: "Multiplicação de dois números negativos." },
    { equation: "(+10) / (+2) = ?", answer: 5, hint: "Divisão de dois números positivos." },
    { equation: "(-12) / (+4) = ?", answer: -3, hint: "Divisão de um número negativo e positivo." }
];

// Dados dos exercícios - Nível 3 (Potenciação com números negativos)
const level3Exercises = [
    { equation: "(-2) ^ 2 = ?", answer: 4, hint: "Potência de um número negativo elevado a um número par." },
    { equation: "(-3) ^ 3 = ?", answer: -27, hint: "Potência de um número negativo elevado a um número ímpar." },
    { equation: "(-4) ^ 2 = ?", answer: 16, hint: "Potência de um número negativo elevado a um número par." },
    { equation: "(-5) ^ 3 = ?", answer: -125, hint: "Potência de um número negativo elevado a um número ímpar." },
    { equation: "(-6) ^ 2 = ?", answer: 36, hint: "Potência de um número negativo elevado a um número par." }
];

let currentExercise = 0;
let answers = [];
let currentLevel = 1;
let exercises = level1Exercises;

// Configuração do canvas para desenho
const canvas = document.getElementById("drawingCanvas");
const ctx = canvas.getContext("2d");
let drawing = false;
let eraser = false;
let lastX = null;
let lastY = null; // Variáveis para armazenar as últimas coordenadas

// Função para ativar/desativar o modo de desenho
function toggleDrawing() {
    drawing = !drawing;
    const pencilButton = document.getElementById("pencilButton");

    if (drawing) {
        pencilButton.textContent = "Desenho Ativado";
    } else {
        pencilButton.textContent = "Ativar Desenho";
    }
}

// Função para obter o deslocamento do canvas em relação à página
function getCanvasOffset() {
    const rect = canvas.getBoundingClientRect();
    return { x: rect.left, y: rect.top };
}

// Função para iniciar o desenho
function startDrawing(e) {
    if (!drawing) return;

    ctx.lineWidth = document.getElementById("lineWidth").value;
    ctx.strokeStyle = document.getElementById("colorPicker").value;
    ctx.lineCap = "round";
    ctx.lineJoin = "round";

    const offset = getCanvasOffset(); // Pega o deslocamento do canvas
    const offsetX = e.clientX - offset.x; // Ajusta a posição do cursor
    const offsetY = e.clientY - offset.y;

    lastX = offsetX; // Salva as coordenadas iniciais
    lastY = offsetY;

    ctx.beginPath();
    ctx.moveTo(lastX, lastY);
}

// Função para desenhar no canvas com suavização
function draw(e) {
    if (!drawing) return;

    const offset = getCanvasOffset(); // Pega o deslocamento do canvas
    const offsetX = e.clientX - offset.x; // Ajusta a posição do cursor
    const offsetY = e.clientY - offset.y;

    // Suavizar a linha desenhada entre os pontos
    if (lastX !== null && lastY !== null) {
        ctx.lineTo(offsetX, offsetY);
        ctx.stroke();
    }

    lastX = offsetX; // Atualiza a posição anterior
    lastY = offsetY;
}

// Função para parar o desenho
function stopDrawing() {
    if (!drawing) return;

    canvas.removeEventListener("mousemove", draw);
    canvas.removeEventListener("touchmove", draw);
    lastX = null;
    lastY = null; // Zera as coordenadas quando parar o desenho
}

// Eventos de mouse e toque
canvas.addEventListener("mousedown", (e) => {
    if (drawing) {
        startDrawing(e);
        canvas.addEventListener("mousemove", draw);
    }
});

canvas.addEventListener("mouseup", stopDrawing);
canvas.addEventListener("mouseleave", stopDrawing);
canvas.addEventListener("touchstart", (e) => {
    if (drawing) {
        startDrawing(e);
        canvas.addEventListener("touchmove", draw);
    }
});

canvas.addEventListener("touchend", stopDrawing);
canvas.addEventListener("touchcancel", stopDrawing);

// Função para limpar o canvas
function clearCanvas() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
}

// Função para alternar a borracha
function toggleEraser() {
    eraser = !eraser;
    if (eraser) {
        ctx.globalCompositeOperation = "destination-out";
        document.getElementById("eraserButton").textContent = "Desativar Borracha";
    } else {
        ctx.globalCompositeOperation = "source-over";
        document.getElementById("eraserButton").textContent = "Ativar Borracha";
    }
}

// Funções relacionadas aos exercícios
function showExercise() {
    const exercise = exercises[currentExercise];
    document.getElementById('exercises').innerHTML = `    
        <div class="exercise">
            <p><strong>Exercício ${currentExercise + 1}:</strong> ${exercise.equation}</p>
            <p><span class="hint">Dica: ${exercise.hint}</span></p>
        </div>
    `;
    document.getElementById('message').innerHTML = '';
}

function submitAnswer() {
    const userAnswer = parseInt(document.getElementById('answer').value);
    const correctAnswer = exercises[currentExercise].answer;
    answers.push({ userAnswer, correctAnswer });
    currentExercise++;
    if (currentExercise < exercises.length) {
        showExercise();
    } else {
        showResults();
    }
}

function showResults() {
    let feedback = '';
    let correctAnswersCount = 0;
    answers.forEach((item, index) => {
        const resultClass = item.userAnswer === item.correctAnswer ? 'correct' : 'incorrect';
        if (item.userAnswer === item.correctAnswer) correctAnswersCount++;
        feedback += `<div class="result-item ${resultClass}">
                        <p><strong>Exercício ${index + 1}:</strong> ${item.userAnswer === item.correctAnswer ? 'Correto' : 'Errado'}</p>
                        <p><strong>Resposta Esperada:</strong> ${item.correctAnswer}</p>
                    </div>`;
    });
    const totalQuestions = answers.length;
    const accuracy = (correctAnswersCount / totalQuestions) * 100;
    document.getElementById('results').innerHTML = feedback;
    document.getElementById('message').innerHTML = `Você acertou ${correctAnswersCount} de ${totalQuestions} questões! (${accuracy.toFixed(2)}%)`;
    if (accuracy >= 60 && correctAnswersCount === exercises.length) {
        document.getElementById('nextLevelButton').style.display = 'inline-block';
    } else {
        document.getElementById('message').innerHTML += "<p>Você precisa acertar pelo menos 60% das questões para avançar. Tente novamente.</p>";
        document.getElementById('nextLevelButton').style.display = 'none';
    }
}

function nextLevel() {
    if (currentLevel === 1) {
        exercises = level2Exercises;
        currentExercise = 0;
        document.getElementById('levelTitle').textContent = "Nível 2: Multiplicação e Divisão";
    } else if (currentLevel === 2) {
        exercises = level3Exercises;
        currentExercise = 0;
        document.getElementById('levelTitle').textContent = "Nível 3: Potenciação";
    }
    currentLevel++;
    document.getElementById('nextLevelButton').style.display = 'none';
    showExercise();
}

// Inicializar o primeiro exercício
showExercise();
