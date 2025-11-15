document.addEventListener('DOMContentLoaded', () => {
    const gameBoard = document.getElementById('game-board');
    const statusDisplay = document.getElementById('status');
    const turnIndicator = document.getElementById('turn-indicator');
    const restartButton = document.getElementById('restart-button');
    const undoButton = document.getElementById('undo-button');
    const resetScoresButton = document.getElementById('reset-scores');
    const soundToggle = document.getElementById('sound-toggle');
    const player1NameInput = document.getElementById('player1-name');
    const player2NameInput = document.getElementById('player2-name');
    const player1ScoreDisplay = document.getElementById('player1-score');
    const player2ScoreDisplay = document.getElementById('player2-score');
    const totalGamesDisplay = document.getElementById('total-games');
    const drawsDisplay = document.getElementById('draws');
    const confettiCanvas = document.getElementById('confetti-canvas');
    const ctx = confettiCanvas.getContext('2d');

    const ROWS = 6;
    const COLS = 7;
    let board = [];
    let currentPlayer = 1;
    let gameOver = false;
    let previewPiece = null;
    let moveHistory = [];
    let soundEnabled = true;
    
    // Score tracking
    let scores = {
        player1: 0,
        player2: 0,
        totalGames: 0,
        draws: 0
    };

    // Load scores from localStorage
    loadScores();

    // --- Game Initialization ---
    function createBoard() {
        for (let row = 0; row < ROWS; row++) {
            board[row] = [];
            for (let col = 0; col < COLS; col++) {
                board[row][col] = 0; // 0 represents an empty cell

                const cell = document.createElement('div');
                cell.classList.add('cell');
                cell.dataset.row = row;
                cell.dataset.col = col;
                gameBoard.appendChild(cell);
            }
        }
    }

    // --- Event Listeners ---
    gameBoard.addEventListener('click', handleBoardClick);
    gameBoard.addEventListener('mouseover', handleBoardHover);
    gameBoard.addEventListener('mouseout', handleBoardMouseOut);
    restartButton.addEventListener('click', restartGame);
    undoButton.addEventListener('click', undoLastMove);
    resetScoresButton.addEventListener('click', resetScores);
    soundToggle.addEventListener('click', toggleSound);
    player1NameInput.addEventListener('change', savePlayerNames);
    player2NameInput.addEventListener('change', savePlayerNames);


    // --- Core Game Logic ---
    function handleBoardClick(e) {
        if (gameOver || !e.target.classList.contains('cell')) return;

        const col = parseInt(e.target.dataset.col);
        const availableRow = findAvailableRow(col);

        if (availableRow !== -1) {
            placePiece(availableRow, col);
            if (checkWin(availableRow, col)) {
                endGame(false);
            } else if (isBoardFull()) {
                endGame(true); // It's a draw
            } else {
                switchPlayer();
            }
        }
    }

    function findAvailableRow(col) {
        for (let row = ROWS - 1; row >= 0; row--) {
            if (board[row][col] === 0) {
                return row;
            }
        }
        return -1; // Column is full
    }

    function placePiece(row, col) {
        board[row][col] = currentPlayer;
        moveHistory.push({ row, col, player: currentPlayer });
        undoButton.disabled = false;
        
        const cell = document.querySelector(`.cell[data-row='${row}'][data-col='${col}']`);
        const piece = document.createElement('div');
        piece.classList.add('piece', `player${currentPlayer}`);
        
        piece.style.animationDuration = `${0.15 * (row + 2)}s`;
        cell.appendChild(piece);
    }

    function switchPlayer() {
        currentPlayer = currentPlayer === 1 ? 2 : 1;
        updateStatus();
    }
    
    function updateStatus() {
        const playerName = currentPlayer === 1 ? player1NameInput.value : player2NameInput.value;
        statusDisplay.textContent = `${playerName}'s Turn`;
        statusDisplay.style.color = currentPlayer === 1 ? 'var(--player1-color)' : 'var(--player2-color)';
        
        turnIndicator.style.background = currentPlayer === 1 ? 'var(--player1-color)' : 'var(--player2-color)';
        turnIndicator.style.boxShadow = currentPlayer === 1 
            ? '0 0 15px var(--player1-glow)' 
            : '0 0 15px var(--player2-glow)';
    }


    // --- Win/Draw Detection ---
    function checkWin(row, col) {
        const directions = [
            { r: 0, c: 1 },  // Horizontal
            { r: 1, c: 0 },  // Vertical
            { r: 1, c: 1 },  // Diagonal /
            { r: 1, c: -1 }  // Diagonal \
        ];

        for (const dir of directions) {
            const count = countConsecutive(row, col, dir.r, dir.c) + countConsecutive(row, col, -dir.r, -dir.c) + 1;
            if (count >= 4) {
                highlightWinningPieces(row, col, dir);
                return true;
            }
        }
        return false;
    }
    
    function countConsecutive(row, col, rowDir, colDir) {
        let count = 0;
        let r = row + rowDir;
        let c = col + colDir;
        while (r >= 0 && r < ROWS && c >= 0 && c < COLS && board[r][c] === currentPlayer) {
            count++;
            r += rowDir;
            c += colDir;
        }
        return count;
    }

    function isBoardFull() {
        return board[0].every(cell => cell !== 0);
    }

    // --- Game Over & Restart ---
    function endGame(isDraw) {
        gameOver = true;
        undoButton.disabled = true;
        
        if (isDraw) {
            statusDisplay.textContent = "It's a Draw!";
            statusDisplay.style.color = 'var(--text-color)';
            turnIndicator.style.display = 'none';
            scores.draws++;
        } else {
            const playerName = currentPlayer === 1 ? player1NameInput.value : player2NameInput.value;
            statusDisplay.textContent = `${playerName} Wins! 🎉`;
            statusDisplay.style.color = currentPlayer === 1 ? 'var(--player1-color)' : 'var(--player2-color)';
            turnIndicator.style.display = 'none';
            
            if (currentPlayer === 1) {
                scores.player1++;
            } else {
                scores.player2++;
            }
            
            launchConfetti();
        }
        
        scores.totalGames++;
        updateScoreDisplay();
        saveScores();
        removePreviewPiece();
    }

    function restartGame() {
        gameBoard.innerHTML = '';
        board = [];
        gameOver = false;
        currentPlayer = 1;
        moveHistory = [];
        undoButton.disabled = true;
        turnIndicator.style.display = 'inline-block';
        createBoard();
        updateStatus();
    }
    
    function highlightWinningPieces(row, col, dir) {
        const winningPieces = [{ r: row, c: col }];
        
        // Check in one direction
        let r = row + dir.r;
        let c = col + dir.c;
        while (r >= 0 && r < ROWS && c >= 0 && c < COLS && board[r][c] === currentPlayer) {
            winningPieces.push({ r, c });
            r += dir.r;
            c += dir.c;
        }
        
        // Check in the opposite direction
        r = row - dir.r;
        c = col - dir.c;
        while (r >= 0 && r < ROWS && c >= 0 && c < COLS && board[r][c] === currentPlayer) {
            winningPieces.push({ r, c });
            r -= dir.r;
            c -= dir.c;
        }
        
        winningPieces.forEach(pos => {
            const cell = document.querySelector(`.cell[data-row='${pos.r}'][data-col='${pos.c}']`);
            cell.querySelector('.piece').classList.add('winning-piece');
        });
    }

    // --- Hover Preview Effect ---
    function handleBoardHover(e) {
        if (gameOver || !e.target.classList.contains('cell')) return;

        removePreviewPiece(); // Clear previous preview
        
        const col = parseInt(e.target.dataset.col);
        const availableRow = findAvailableRow(col);
        
        if (availableRow !== -1) {
            previewPiece = document.createElement('div');
            previewPiece.classList.add('piece', `player${currentPlayer}`, 'preview');
            // Position it at the top of the column
            const topCell = document.querySelector(`.cell[data-row='0'][data-col='${col}']`);
            topCell.appendChild(previewPiece);
        }
    }

    function handleBoardMouseOut(e) {
        if (e.target.closest('#game-board')) {
            removePreviewPiece();
        }
    }

    function removePreviewPiece() {
        if (previewPiece) {
            previewPiece.remove();
            previewPiece = null;
        }
    }

    // --- Undo Move ---
    function undoLastMove() {
        if (moveHistory.length === 0 || gameOver) return;
        
        const lastMove = moveHistory.pop();
        board[lastMove.row][lastMove.col] = 0;
        
        const cell = document.querySelector(`.cell[data-row='${lastMove.row}'][data-col='${lastMove.col}']`);
        const piece = cell.querySelector('.piece');
        if (piece) {
            piece.remove();
        }
        
        currentPlayer = lastMove.player;
        updateStatus();
        
        if (moveHistory.length === 0) {
            undoButton.disabled = true;
        }
    }

    // --- Score Management ---
    function updateScoreDisplay() {
        player1ScoreDisplay.textContent = scores.player1;
        player2ScoreDisplay.textContent = scores.player2;
        totalGamesDisplay.textContent = scores.totalGames;
        drawsDisplay.textContent = scores.draws;
    }

    function saveScores() {
        localStorage.setItem('connect4Scores', JSON.stringify(scores));
    }

    function loadScores() {
        const saved = localStorage.getItem('connect4Scores');
        if (saved) {
            scores = JSON.parse(saved);
            updateScoreDisplay();
        }
        
        const savedNames = localStorage.getItem('connect4PlayerNames');
        if (savedNames) {
            const names = JSON.parse(savedNames);
            player1NameInput.value = names.player1;
            player2NameInput.value = names.player2;
        }
    }

    function resetScores() {
        if (confirm('Are you sure you want to reset all scores?')) {
            scores = { player1: 0, player2: 0, totalGames: 0, draws: 0 };
            updateScoreDisplay();
            saveScores();
        }
    }

    function savePlayerNames() {
        const names = {
            player1: player1NameInput.value,
            player2: player2NameInput.value
        };
        localStorage.setItem('connect4PlayerNames', JSON.stringify(names));
    }

    // --- Sound Toggle ---
    function toggleSound() {
        soundEnabled = !soundEnabled;
        soundToggle.classList.toggle('muted', !soundEnabled);
    }

    // --- Confetti Animation ---
    function launchConfetti() {
        confettiCanvas.width = window.innerWidth;
        confettiCanvas.height = window.innerHeight;
        
        const confettiPieces = [];
        const colors = ['#ff4646', '#ffd700', '#64ffda', '#ff6b6b', '#ffe44d'];
        
        for (let i = 0; i < 150; i++) {
            confettiPieces.push({
                x: Math.random() * confettiCanvas.width,
                y: -20,
                size: Math.random() * 8 + 4,
                speedY: Math.random() * 3 + 2,
                speedX: Math.random() * 4 - 2,
                color: colors[Math.floor(Math.random() * colors.length)],
                rotation: Math.random() * 360,
                rotationSpeed: Math.random() * 10 - 5
            });
        }
        
        function animateConfetti() {
            ctx.clearRect(0, 0, confettiCanvas.width, confettiCanvas.height);
            
            let stillFalling = false;
            confettiPieces.forEach(piece => {
                piece.y += piece.speedY;
                piece.x += piece.speedX;
                piece.rotation += piece.rotationSpeed;
                
                if (piece.y < confettiCanvas.height) {
                    stillFalling = true;
                }
                
                ctx.save();
                ctx.translate(piece.x, piece.y);
                ctx.rotate(piece.rotation * Math.PI / 180);
                ctx.fillStyle = piece.color;
                ctx.fillRect(-piece.size / 2, -piece.size / 2, piece.size, piece.size);
                ctx.restore();
            });
            
            if (stillFalling) {
                requestAnimationFrame(animateConfetti);
            } else {
                ctx.clearRect(0, 0, confettiCanvas.width, confettiCanvas.height);
            }
        }
        
        animateConfetti();
    }

    // --- Background Particles ---
    function createParticles() {
        const particlesContainer = document.getElementById('particles');
        const particleCount = 30;
        
        for (let i = 0; i < particleCount; i++) {
            const particle = document.createElement('div');
            particle.classList.add('particle');
            particle.style.left = Math.random() * 100 + '%';
            particle.style.top = Math.random() * 100 + '%';
            particle.style.animationDelay = Math.random() * 20 + 's';
            particle.style.animationDuration = (Math.random() * 10 + 15) + 's';
            particlesContainer.appendChild(particle);
        }
    }

    // --- Initial Call ---
    createParticles();
    createBoard();
    updateStatus();
    updateScoreDisplay();
});