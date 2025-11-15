Connect Four - Blood & Bone Edition 🎮
A modern, web-based reimagining of the classic Connect Four game with a dramatic dark theme, blood red and white pieces, stunning visuals, and professional gameplay features.

🚀 Features

Visual & Design
- Dark Atmospheric Background – Deep black gradient with floating particles for an immersive experience
- Blood Red & White Theme – Dramatic high-contrast color scheme with blood red and pure white game pieces
- Compact Board Design – Tight-fitting game board sized perfectly to the grid
- Enhanced Drop Animations – Pieces fall with realistic physics and bounce effects
- Winning Celebration – Animated confetti explosion and pulsing winning pieces
- Hover Preview – Animated preview showing where your piece will land
- Responsive Design – Seamlessly adapts to all screen sizes and devices

Gameplay Features
- Score Tracking – Persistent score system that saves wins, draws, and total games
- Undo Move – Take back your last move with a single click
- Custom Player Names – Personalize the game with editable player names
- Game Statistics – Track total games played and draw count
- Full Win Detection – Detects horizontal, vertical, and diagonal wins

Technical Excellence
- Pure Vanilla JavaScript – No frameworks or dependencies
- LocalStorage Integration – Saves scores and player names between sessions
- Smooth Animations – CSS3 keyframe animations with cubic-bezier easing
- Professional UI/UX – Intuitive controls with visual feedback

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

Objective
Be the first to connect four of your pieces in a row — horizontally, vertically, or diagonally.

Players
- Player 1 → Blood red pieces with dramatic glowing effects
- Player 2 → Pure white pieces with bright glowing effects
- Click on player names to customize them

Gameplay
1. Click on any column to drop your piece
2. Pieces fall to the lowest available slot with realistic animation
3. Use the Undo button to take back your last move
4. First player to connect four pieces wins
5. Winning pieces pulse and confetti celebrates your victory

Controls
- New Game – Start a fresh match (keeps scores)
- Undo – Take back the last move
- Reset Scores – Clear all statistics and start over
- Sound Toggle – Enable/disable sound effects (visual indicator)

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

🎨 Customization
The game uses CSS variables for easy theming. Edit the :root section in style.css to customize:
- Colors for players and UI elements (currently blood red and white theme)
- Animation speeds and effects
- Board size and spacing
- Glow intensities
- Background gradients (currently deep black theme)

🎨 Theme
This edition features a dramatic **Blood & Bone** color scheme:
- Deep black atmospheric background
- Blood red pieces (Player 1) with crimson glow effects
- Pure white pieces (Player 2) with bright luminous glow
- Dark red accent colors throughout the UI
- High contrast design for maximum visual impact

💡 Future Enhancements
- Player vs. AI mode with difficulty levels
- Sound effects for drops, wins, and interactions
- Multiple theme options (classic, neon, retro, cyberpunk)
- Online multiplayer support
- Tournament mode with brackets
- Replay system to review past games
- Additional color themes and customization options

🌟 If you like this project, ⭐ it on GitHub and share your feedback!