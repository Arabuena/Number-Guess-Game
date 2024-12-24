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

// Função para obter a posição do canvas na página
function getCanvasPosition(canvas) {
    const rect = canvas.getBoundingClientRect();
    return {
        x: rect.left + window.scrollX,
        y: rect.top + window.scrollY
    };
}

// Função de desenho no canvas
const canvas = document.getElementById("drawingCanvas");
const ctx = canvas.getContext("2d");
let drawing = false;
let eraser = false;

// Função para ativar/desativar o desenho com o botão de lápis
function toggleDrawing() {
    drawing = !drawing; // Alterna entre ativar/desativar o modo de desenho
    if (drawing) {
        document.getElementById("pencilButton").textContent = "Desenho Ativado";
    } else {
        document.getElementById("pencilButton").textContent = "Ativar Desenho";
    }
}

// Função para começar o desenho
function startDrawing(e) {
    if (!drawing) return;
    const canvasPosition = getCanvasPosition(canvas);
    const x = e.offsetX || (e.touches[0].clientX - canvasPosition.x);
    const y = e.offsetY || (e.touches[0].clientY - canvasPosition.y);
    ctx.lineWidth = document.getElementById("lineWidth").value;
    ctx.strokeStyle = document.getElementById("colorPicker").value;
    ctx.lineCap = "round";
    ctx.lineJoin = "round";
    ctx.beginPath();
    ctx.moveTo(x, y);
    canvas.addEventListener("mousemove", draw);
    canvas.addEventListener("touchmove", drawTouch); // Suporte ao toque
}

// Função para desenhar com o mouse
function draw(e) {
    if (!drawing) return;
    const canvasPosition = getCanvasPosition(canvas);
    const x = e.offsetX || (e.touches[0].clientX - canvasPosition.x);
    const y = e.offsetY || (e.touches[0].clientY - canvasPosition.y);
    ctx.lineTo(x, y);
    ctx.stroke();
}

// Função para desenhar com o toque
function drawTouch(e) {
    if (!drawing) return;
    e.preventDefault(); // Evita o comportamento padrão de toque (como rolar a página)
    const canvasPosition = getCanvasPosition(canvas);
    const x = e.touches[0].clientX - canvasPosition.x;
    const y = e.touches[0].clientY - canvasPosition.y;
    ctx.lineTo(x, y);
    ctx.stroke();
}

// Função para parar o desenho
function stopDrawing() {
    drawing = false;
    canvas.removeEventListener("mousemove", draw);
    canvas.removeEventListener("touchmove", drawTouch);
}

// Eventos de mouse e toque
canvas.addEventListener("mousedown", (e) => {
    if (drawing) startDrawing(e);
});

canvas.addEventListener("mouseup", stopDrawing);
canvas.addEventListener("mouseleave", stopDrawing);

canvas.addEventListener("touchstart", (e) => {
    if (drawing) startDrawing(e);
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

// Mostrar exercícios
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

// Submeter resposta
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

// Exibir resultados
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

    const totalQuestions = answers.length;
    document.getElementById('message').innerHTML = `Você acertou ${correctAnswersCount} de ${totalQuestions} questões!`;

    const levelCorrectAnswersCount = answers.slice(-exercises.length).filter((item, i) => item.correctAnswer === exercises[i].answer).length;
    if (levelCorrectAnswersCount === exercises.length) {
        document.getElementById('nextLevelButton').style.display = 'inline-block';
    }
}

// Avançar para o próximo nível
function nextLevel() {
    if (currentLevel === 1) {
        exercises = level2Exercises;
        currentExercise = 0;
        document.getElementById('videoContainerLevel1').style.display = 'none';
        document.getElementById('videoContainerLevel2').style.display = 'block';
        document.getElementById('levelTitle').textContent = "Nível 2: Multiplicação e Divisão";
    } else if (currentLevel === 2) {
        exercises = level3Exercises;
        currentExercise = 0;
        document.getElementById('videoContainerLevel2').style.display = 'none';
        document.getElementById('videoContainerLevel3').style.display = 'block';
        document.getElementById('levelTitle').textContent = "Nível 3: Potenciação com Números Negativos";
    }

    currentLevel++;
    answers = [];
    showExercise();
    document.getElementById('nextLevelButton').style.display = 'none';
    document.getElementById('results').innerHTML = '';
}
