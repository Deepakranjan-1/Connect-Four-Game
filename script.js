document.addEventListener('DOMContentLoaded', () => {
    const gameBoard = document.getElementById('game-board');
    const statusDisplay = document.getElementById('status');
    const restartButton = document.getElementById('restart-button');

    const ROWS = 6;
    const COLS = 7;
    let board = [];
    let currentPlayer = 1;
    let gameOver = false;
    let previewPiece = null;

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
        const cell = document.querySelector(`.cell[data-row='${row}'][data-col='${col}']`);
        const piece = document.createElement('div');
        piece.classList.add('piece', `player${currentPlayer}`);
        
        // Stagger animation based on row for a more realistic drop
        piece.style.animationDuration = `${0.1 * (row + 2)}s`;

        cell.appendChild(piece);
    }

    function switchPlayer() {
        currentPlayer = currentPlayer === 1 ? 2 : 1;
        updateStatus();
    }
    
    function updateStatus() {
        statusDisplay.textContent = `Player ${currentPlayer}'s Turn`;
        statusDisplay.style.color = currentPlayer === 1 ? 'var(--player1-color)' : 'var(--player2-color)';
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
        if (isDraw) {
            statusDisplay.textContent = "It's a Draw!";
            statusDisplay.style.color = 'var(--text-color)';
        } else {
            statusDisplay.textContent = `Player ${currentPlayer} Wins!`;
            statusDisplay.style.color = currentPlayer === 1 ? 'var(--player1-color)' : 'var(--player2-color)';
        }
        removePreviewPiece();
    }

    function restartGame() {
        gameBoard.innerHTML = '';
        board = [];
        gameOver = false;
        currentPlayer = 1;
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

    // --- Initial Call ---
    createBoard();
    updateStatus();
});