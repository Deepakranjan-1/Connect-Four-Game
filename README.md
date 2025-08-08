Connect Four Glow ✨
A modern, web-based reimagining of the classic Connect Four game with sleek visuals and smooth gameplay.

🚀 Features
Modern Dark UI – Elegant dark theme with a high-contrast glowing color palette for a trendy, professional look.
Smooth Drop Animations – Pieces fall gracefully with fluid transitions.
Glowing Piece Effects – Winning pieces pulse with a vibrant glow for a satisfying visual reward.
Hover Preview – See where your piece will land before clicking.
Full Game Logic – Detects horizontal, vertical, and diagonal wins, plus draw conditions.
Responsive Design – Scales seamlessly across devices and screen sizes.
Pure Vanilla JavaScript – No frameworks or libraries — just HTML, CSS, and JS.
One-Click Restart – Instantly reset the board for a new match.

🛠️ Technologies Used
HTML5 – Core structure and semantic markup.
CSS3 – Styling and animations, including:
CSS Grid Layout for board structure.
CSS Variables for easy theme customization.
@keyframes animations for drops and glow effects.
JavaScript (ES6+) – Game logic, DOM manipulation, and event handling.

🏁 Getting Started
This is a front-end–only project — no server or build tools required.

Prerequisites
A modern web browser that supports HTML5, CSS3, and JavaScript (e.g., Chrome, Firefox, Edge).

🎮 How to Play
Objective: Be the first to connect four of your pieces in a row — horizontally, vertically, or diagonally.

Players:
Player 1 → Red pieces
Player 2 → Yellow pieces

Turn: Click on a column to drop your piece. It will fall to the lowest available slot.
Win Condition: Four connected pieces in a line.
Draw Condition: Board is full without a winner.
Restart: Click "Restart Game" to start over.

📂 Code Structure
├── index.html   # Game structure & layout
├── style.css    # Theme, layout, and animations
└── script.js    # Game logic & event handling

index.html
Defines game structure: title, status display, game board, and restart button.
Links to CSS and JS files.
style.css
Implements dark theme with CSS variables for easy customization.
Uses CSS Grid for layout.
Contains all animations, including drop and win glow effects.
script.js
Initialization: createBoard() dynamically builds the grid.
Game State: 2D array tracks board status.
Logic: Functions like findAvailableRow(), checkWin(), and isBoardFull() handle gameplay.
UI Updates: Updates status text, highlights winning pieces, and resets the board.

💡 Future Enhancements
Player vs. AI mode.
Sound effects for drops and wins.
Customizable themes.
Score tracking across matches.

If you like this project, ⭐ it on GitHub and share your feedback!