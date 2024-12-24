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

// Ajuste do tamanho do canvas para dispositivos móveis
canvas.width = window.innerWidth * 0.9; // 90% da largura da tela
canvas.height = 300; // Altura fixa para o canvas

// Função para iniciar o desenho
function startDrawing(e) {
    if (!drawing) return;
    ctx.lineWidth = document.getElementById("lineWidth").value;
    ctx.strokeStyle = document.getElementById("colorPicker").value;
    ctx.lineCap = "round";
    ctx.lineJoin = "round";
    ctx.beginPath();
    ctx.moveTo(e.offsetX, e.offsetY);
    canvas.addEventListener("mousemove", draw);
}

// Função para desenhar no canvas
function draw(e) {
    if (!drawing) return;
    ctx.lineTo(e.offsetX, e.offsetY);
    ctx.stroke();
}

// Função para parar de desenhar
function stopDrawing() {
    drawing = false;
    canvas.removeEventListener("mousemove", draw);
}

// Função para obter a posição do toque ou clique no canvas
function getPosition(e) {
    let rect = canvas.getBoundingClientRect();
    let x = e.touches ? e.touches[0].clientX : e.clientX;
    let y = e.touches ? e.touches[0].clientY : e.clientY;
    return [x - rect.left, y - rect.top];
}

// Funções para lidar com toques em dispositivos móveis
canvas.addEventListener("touchstart", (e) => {
    e.preventDefault();  // Previne o comportamento de rolagem
    drawing = true;
    startDrawing(e);
});

canvas.addEventListener("touchmove", draw);
canvas.addEventListener("touchend", stopDrawing);
canvas.addEventListener("touchcancel", stopDrawing);

// Funções para lidar com cliques e movimento do mouse
canvas.addEventListener("mousedown", (e) => {
    drawing = true;
    startDrawing(e);
});

canvas.addEventListener("mouseup", stopDrawing);
canvas.addEventListener("mouseleave", stopDrawing);

// Função para limpar o canvas
function clearCanvas() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
}

// Função para alternar entre o modo desenho e borracha
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

// Função para exibir o exercício atual
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

    // Cálculo do total acumulado de questões e acertos
    const totalQuestions = answers.length;
    document.getElementById('message').innerHTML = `Você acertou ${correctAnswersCount} de ${totalQuestions} questões!`;

    // Exibe o botão "Próximo Nível" apenas se todas as respostas do nível atual forem corretas
    const levelCorrectAnswersCount = answers.slice(-exercises.length).filter((item, i) => item.correctAnswer === exercises[i].answer).length;
    if (levelCorrectAnswersCount === exercises.length) {
        document.getElementById('nextLevelButton').style.display = 'inline-block';
    }
}

// Função para ir para o próximo nível
function nextLevel() {
    if (currentLevel === 1) {
        // Passar para o nível 2
        exercises = level2Exercises;
        currentExercise = 0;
        document.getElementById('videoContainerLevel1').style.display = 'none';
        document.getElementById('videoContainerLevel2').style.display = 'block';
        document.getElementById('levelTitle').textContent = "Nível 2: Multiplicação e Divisão";
    } else if (currentLevel === 2) {
        // Passar para o nível 3
        exercises = level3Exercises;
        currentExercise = 0;
        document.getElementById('videoContainerLevel2').style.display = 'none';
        document.getElementById('videoContainerLevel3').style.display = 'block';
        document.getElementById('levelTitle').textContent = "Nível 3: Potenciação";
    }
    currentLevel++;
    document.getElementById('nextLevelButton').style.display = 'none';
    showExercise();
}

// Exibir o exercício inicial
showExercise();
