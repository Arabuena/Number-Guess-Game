Documentação: Sistema de Exercícios com Interação no Canvas
Visão Geral
Este sistema combina a interatividade de um canvas de desenho com exercícios matemáticos para ensino. O usuário pode alternar entre um pincel e uma borracha, desenhar soluções no canvas e submeter respostas para exercícios de adição, subtração, multiplicação e divisão. O sistema é dividido em níveis, começando com operações básicas e progredindo para níveis mais avançados.

Estrutura do Código
1. HTML
O HTML define a interface visual do sistema, que inclui:

Um canvas para desenho.
Um espaço para exibir os exercícios e dicas.
Inputs para submissão de respostas.
Um botão para alternar entre o modo pincel e borracha.
Vídeos instrutivos para diferentes níveis.
Botões para avançar para o próximo nível.
Principais Elementos:

#canvas: Canvas para desenhos.
#exercises: Contém os exercícios e dicas.
#results: Exibe os resultados após a submissão das respostas.
#eraserButton: Alterna entre pincel e borracha.
#nextLevelButton: Avança para o próximo nível.
Vídeos (#videoContainerLevel1 e #videoContainerLevel2) fornecem material instrutivo complementar.
2. CSS
O CSS fornece o estilo para os elementos da interface:

Canvas: É destacado com uma borda preta para delimitar o espaço de desenho.
Resultados: Respostas corretas e incorretas são destacadas com cores (#correct e #incorrect).
Níveis: Vídeos são exibidos conforme o nível atual do usuário.
3. JavaScript
O JavaScript implementa a lógica principal do sistema.

Variáveis Globais:
ctx: Contexto 2D do canvas.
currentExercise: Índice do exercício atual.
currentLevel: Nível atual do usuário.
exercises e level2Exercises: Arrays contendo os exercícios dos níveis 1 e 2.
answers: Armazena as respostas do usuário para avaliação.
Principais Funções:
Canvas Interativo

toggleEraserMode(): Alterna entre os modos pincel e borracha no canvas.
Eventos (mousedown, mousemove, mouseup) são usados para desenhar no canvas.
Exercícios

showExercise(): Exibe o exercício atual e sua dica.
submitAnswer(): Avalia a resposta do usuário e avança para o próximo exercício ou exibe os resultados.
showResults(): Apresenta os resultados após a conclusão de todos os exercícios do nível atual.
Níveis

nextLevel(): Transita para o próximo nível, atualizando exercícios e vídeos.
Lógica:
No início, o nível 1 é carregado com exercícios de adição e subtração.
Ao concluir o nível 1, o usuário avança para o nível 2, que inclui multiplicação e divisão.
Os resultados são exibidos com feedback visual e contagem de respostas corretas.
Funcionalidades
Canvas de Desenho

Modo pincel para traços e modo borracha para apagar.
Amplo espaço (600x300 pixels) para interação.
Exercícios Matemáticos

Dois níveis de dificuldade:
Nível 1: Adição e subtração.
Nível 2: Multiplicação e divisão.
Cada exercício vem com uma dica associada.
Feedback Interativo

Resultados detalhados são exibidos após cada nível.
Respostas corretas e incorretas são destacadas visualmente.
Vídeos Educativos

Materiais de apoio em vídeo são exibidos conforme o nível atual.
Requisitos
Navegador Moderno: Suporte a canvas e manipulação DOM.
Resolução de Tela: Suficiente para exibir um canvas de 600x300 pixels.
Pontos de Melhoria
Validação de Entrada: Atualmente, a entrada do usuário (#answer) não valida valores não numéricos.
Persistência de Dados: Adicionar um sistema para salvar o progresso do usuário.
Responsividade: Melhorar a adaptação da interface para dispositivos móveis.
