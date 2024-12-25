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

// Função de desenho no canvas
const canvas = document.getElementById("drawingCanvas");
const ctx = canvas.getContext("2d");
let drawing = false;
let eraser = false;

function startDrawing(e) {
    drawing = true;
    ctx.lineWidth = document.getElementById("lineWidth").value;
    ctx.strokeStyle = document.getElementById("colorPicker").value;
    ctx.lineCap = "round";
    ctx.lineJoin = "round";
    ctx.beginPath();
    const { x, y } = getCanvasCoordinates(e);
    ctx.moveTo(x, y);
}

function draw(e) {
    if (!drawing) return;
    e.preventDefault(); // Impede o comportamento padrão de rolagem
    const { x, y } = getCanvasCoordinates(e);
    ctx.lineTo(x, y);
    ctx.stroke();
}

function getCanvasCoordinates(event) {
    const rect = canvas.getBoundingClientRect();
    let x, y;

    if (event.touches) {
        x = event.touches[0].clientX - rect.left;
        y = event.touches[0].clientY - rect.top;
    } else {
        x = event.clientX - rect.left;
        y = event.clientY - rect.top;
    }

    // Ajuste para evitar deslocamentos adicionais
    x *= canvas.width / rect.width;
    y *= canvas.height / rect.height;

    return { x, y };
}

function stopDrawing() {
    drawing = false;
}

canvas.addEventListener("mousedown", (e) => {
    startDrawing(e);
    canvas.addEventListener("mousemove", draw);
});

canvas.addEventListener("mouseup", stopDrawing);
canvas.addEventListener("mouseleave", stopDrawing);

// Para dispositivos móveis, usamos eventos touch
canvas.addEventListener("touchstart", (e) => {
    e.preventDefault(); // Impede a rolagem
    startDrawing(e);
    canvas.addEventListener("touchmove", draw, { passive: false });
});

canvas.addEventListener("touchend", stopDrawing);
canvas.addEventListener("touchcancel", stopDrawing);

// Limpar o canvas
function clearCanvas() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
}

// Alternar para a ferramenta de borracha
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

// Função de exibição de exercícios
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

// Função para submeter a resposta
function submitAnswer() {
    const userAnswer = parseInt(document.getElementById('answer').value);
    const correctAnswer = exercises[currentExercise].answer;
    answers.push({
        userAnswer: userAnswer,
        correctAnswer: correctAnswer
    });
    currentExercise++;
    if (currentExercise < exercises.length) {
        showExercise();
    } else {
        showResults();
    }
}

// Função para exibir os resultados
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

    document.getElementById('results').innerHTML = feedback;

    // Cálculo da porcentagem de acertos
    const totalQuestions = answers.length;
    const accuracyPercentage = (correctAnswersCount / totalQuestions) * 100;
    document.getElementById('message').innerHTML = `Você acertou ${correctAnswersCount} de ${totalQuestions} questões! (${accuracyPercentage.toFixed(2)}%)`;

    // Exibe o botão "Próximo Nível" apenas se a porcentagem de acertos for igual ou superior a 60%
    if (accuracyPercentage >= 60) {
        document.getElementById('nextLevelButton').style.display = 'inline-block';
    } else {
        document.getElementById('nextLevelButton').style.display = 'none';
    }
}

// Função para passar para o próximo nível
function nextLevel() {
    if (currentLevel === 1) {
        currentLevel = 2;
        exercises = level2Exercises;
        document.getElementById('videoContainerLevel1').style.display = 'none';
        document.getElementById('videoContainerLevel2').style.display = 'block';
        document.getElementById('levelTitle').textContent = 'Nível 2: Multiplicação e Divisão';
    } else if (currentLevel === 2) {
        currentLevel = 3;
        exercises = level3Exercises;
        document.getElementById('videoContainerLevel2').style.display = 'none';
        document.getElementById('videoContainerLevel3').style.display = 'block';
        document.getElementById('levelTitle').textContent = 'Nível 3: Potenciação com Números Negativos';
    }
    currentExercise = 0;
    showExercise();
    document.getElementById('nextLevelButton').style.display = 'none';
}

// Inicializa o nível 1
showExercise();
