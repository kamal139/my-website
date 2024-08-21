document.addEventListener('DOMContentLoaded', function() {
    // Smooth scrolling for navigation links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            document.querySelector(this.getAttribute('href')).scrollIntoView({
                behavior: 'smooth'
            });
        });
    });

    // Tic-Tac-Toe Game
    const X_CLASS = 'x';
    const O_CLASS = 'o';
    const WINNING_COMBINATIONS = [
        [0, 1, 2],
        [3, 4, 5],
        [6, 7, 8],
        [0, 3, 6],
        [1, 4, 7],
        [2, 5, 8],
        [0, 4, 8],
        [2, 4, 6]
    ];
    const cellElements = document.querySelectorAll('[data-cell]');
    const board = document.getElementById('game-board');
    const statusElement = document.getElementById('status');
    const restartButton = document.getElementById('restart-button');
    let oTurn;

    startGame();

    restartButton.addEventListener('click', startGame);

    function startGame() {
        oTurn = false;
        cellElements.forEach(cell => {
            cell.classList.remove(X_CLASS);
            cell.classList.remove(O_CLASS);
            cell.removeEventListener('click', handleClick);
            cell.addEventListener('click', handleClick, { once: true });
        });
        setBoardHoverClass();
        statusElement.textContent = "Your turn (X)";
    }

    function handleClick(e) {
        const cell = e.target;
        const currentClass = oTurn ? O_CLASS : X_CLASS;
        placeMark(cell, currentClass);
        if (checkWin(currentClass)) {
            endGame(false);
        } else if (isDraw()) {
            endGame(true);
        } else {
            swapTurns();
            setBoardHoverClass();
            if (oTurn) {
                setTimeout(makeAIMove, 500);
            }
        }
    }

    function makeAIMove() {
        const emptyCells = [...cellElements].filter(cell => 
            !cell.classList.contains(X_CLASS) && !cell.classList.contains(O_CLASS)
        );
        if (emptyCells.length > 0) {
            const randomIndex = Math.floor(Math.random() * emptyCells.length);
            const cell = emptyCells[randomIndex];
            placeMark(cell, O_CLASS);
            if (checkWin(O_CLASS)) {
                endGame(false);
            } else if (isDraw()) {
                endGame(true);
            } else {
                swapTurns();
                setBoardHoverClass();
            }
        }
    }

    function placeMark(cell, currentClass) {
        cell.classList.add(currentClass);
    }

    function swapTurns() {
        oTurn = !oTurn;
        statusElement.textContent = oTurn ? "Kamal's turn (O)" : "Your turn (X)";
    }

    function setBoardHoverClass() {
        board.classList.remove(X_CLASS);
        board.classList.remove(O_CLASS);
        if (oTurn) {
            board.classList.add(O_CLASS);
        } else {
            board.classList.add(X_CLASS);
        }
    }

    function checkWin(currentClass) {
        return WINNING_COMBINATIONS.some(combination => {
            return combination.every(index => {
                return cellElements[index].classList.contains(currentClass);
            });
        });
    }

    function isDraw() {
        return [...cellElements].every(cell => {
            return cell.classList.contains(X_CLASS) || cell.classList.contains(O_CLASS);
        });
    }

    function endGame(draw) {
        if (draw) {
            statusElement.textContent = "It's a draw!";
        } else {
            statusElement.textContent = oTurn ? "Kamal wins!" : "You win!";
        }
        cellElements.forEach(cell => {
            cell.removeEventListener('click', handleClick);
        });
    }

    // LEGO Backdrop Animation
    function createLego() {
        const lego = document.createElement('div');
        lego.classList.add('lego');
        lego.style.left = `${Math.random() * 100}vw`;
        lego.style.animationDuration = `${Math.random() * 2 + 3}s`;
        lego.style.opacity = Math.random();
        lego.style.transform = `scale(${Math.random() + 0.5}) rotate3d(
            ${Math.random()},
            ${Math.random()},
            ${Math.random()},
            ${Math.random() * 360}deg
        )`;

        const colors = ['#ff6600', '#ffcc00', '#ff3300', '#ff9900'];
        lego.style.backgroundColor = colors[Math.floor(Math.random() * colors.length)];

        document.getElementById('lego-container').appendChild(lego);

        setTimeout(() => {
            lego.remove();
        }, 5000);
    }

    function animateLegos() {
        setInterval(createLego, 300);
    }

    // Start LEGO animation
    animateLegos();
});