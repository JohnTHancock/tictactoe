function Gameboard() {
    const rows = 3;
    const columns = 3;
    const board = [];

    for (let i = 0; i < rows; i++) {
        board[i] = [];
        for (let j = 0; j < columns; j++) {
            board[i].push(Cell());
        };
    };

    const getBoard = () => board;

    const playToken = (selectedRow, selectedColumn, player) => {
        const row = board[selectedRow];
        const playedCell = row[selectedColumn];
        if (playedCell.getValue() === 0) {
            board[selectedRow][selectedColumn].addToken(player);
        } else {
            console.log('Invalid move');
            return;
        };
    };

    const printBoard = () => {
        const boardWithCellValues = board.map((row) => row.map((cell) => cell.getValue()));
        console.log(boardWithCellValues);
    };

    return { getBoard, playToken, printBoard };
};


function Cell() {
    let value = 0;

    const addToken = (player) => {
        value = player;
    };

    const getValue = () => value;

    return {
        addToken,
        getValue
    };
}

function GameController(
    playerOneName = 'Player One',
    playerTwoName = 'Player Two'
) {
    const board = Gameboard();
    const cell1 = document.querySelector('.number1');
    const cell2 = document.querySelector('.number2');
    const cell3 = document.querySelector('.number3');
    const cell4 = document.querySelector('.number4');
    const cell5 = document.querySelector('.number5');
    const cell6 = document.querySelector('.number6');
    const cell7 = document.querySelector('.number7');
    const cell8 = document.querySelector('.number8');
    const cell9 = document.querySelector('.number9');

    const players = [
        {
            playerName: playerOneName,
            token: 1
        },
        {
            playerName: playerTwoName,
            token: 2
        }
    ];

    let activePlayer = players[0];

    const switchPlayerTurn = () => {
        activePlayer = activePlayer === players[0] ? players[1] : players[0];
    };
    const getActivePlayer = () => activePlayer;

    const printNewRound = () => {
        board.printBoard();
        console.log(`${getActivePlayer().playerName}'s turn.`);
        const playerTurnDisplay = document.querySelector('.player-turn-display');
        playerTurnDisplay.textContent = `${getActivePlayer().playerName}'s turn.`;
    };

    const playRound = (row, column) => {
        board.playToken(row, column, getActivePlayer().token);

        const printDisplay = () => {
            const boardArray = board.getBoard();
            if (boardArray[0][0].getValue() === 1) {
                cell1.textContent = 'X';
            } else if (boardArray[0][0].getValue() === 2) {
                cell1.textContent = 'O';
            };

            if (boardArray[0][1].getValue() === 1) {
                cell2.textContent = 'X';
            } else if (boardArray[0][1].getValue() === 2) {
                cell2.textContent = 'O';
            };

            if (boardArray[0][2].getValue() === 1) {
                cell3.textContent = 'X';
            } else if (boardArray[0][2].getValue() === 2) {
                cell3.textContent = 'O';
            };

            if (boardArray[1][0].getValue() === 1) {
                cell4.textContent = 'X';
            } else if (boardArray[1][0].getValue() === 2) {
                cell4.textContent = 'O';
            };

            if (boardArray[1][1].getValue() === 1) {
                cell5.textContent = 'X';
            } else if (boardArray[1][1].getValue() === 2) {
                cell5.textContent = 'O';
            };

            if (boardArray[1][2].getValue() === 1) {
                cell6.textContent = 'X';
            } else if (boardArray[1][2].getValue() === 2) {
                cell6.textContent = 'O';
            };

            if (boardArray[2][0].getValue() === 1) {
                cell7.textContent = 'X';
            } else if (boardArray[2][0].getValue() === 2) {
                cell7.textContent = 'O';
            };

            if (boardArray[2][1].getValue() === 1) {
                cell8.textContent = 'X';
            } else if (boardArray[2][1].getValue() === 2) {
                cell8.textContent = 'O';
            };

            if (boardArray[2][2].getValue() === 1) {
                cell9.textContent = 'X';
            } else if (boardArray[2][2].getValue() === 2) {
                cell9.textContent = 'O';
            };
        };

        const checkForWin = () => {
            const boardArray = board.getBoard();
        
            for (let i = 0; i < 3; i++) {
                if (boardArray[i][0].getValue() !== 0 &&
                    boardArray[i][0].getValue() === boardArray[i][1].getValue() &&
                    boardArray[i][0].getValue() === boardArray[i][2].getValue()) {
                    return true;
                }
            }
        
            for (let j = 0; j < 3; j++) {
                if (boardArray[0][j].getValue() !== 0 &&
                    boardArray[0][j].getValue() === boardArray[1][j].getValue() &&
                    boardArray[0][j].getValue() === boardArray[2][j].getValue()) {
                    return true;
                }
            }
        
            if (boardArray[0][0].getValue() !== 0 &&
                boardArray[0][0].getValue() === boardArray[1][1].getValue() &&
                boardArray[0][0].getValue() === boardArray[2][2].getValue()) {
                return true;
            }
        
            if (boardArray[0][2].getValue() !== 0 &&
                boardArray[0][2].getValue() === boardArray[1][1].getValue() &&
                boardArray[0][2].getValue() === boardArray[2][0].getValue()) {
                return true;
            }
        
            return false;
        };

        const checkForDraw = () => {
            boardArray = board.getBoard();
            for (let i = 0; i < 3; i++) {
                for (let j = 0; j < 3; j++) {
                    if (boardArray[i][j].getValue() === 0) {
                        return false;
                    }
                }
            }
            return !checkForWin();
        }
        printDisplay();

        const winnerFound = checkForWin();
        if (winnerFound) {
            console.log(`${getActivePlayer().playerName} wins!`);
            return;
        }

        const drawFound = checkForDraw();
        if (drawFound) {
            console.log(`It's a draw!`);
            return;
        }

        switchPlayerTurn();
        printNewRound();
    };

    printNewRound();

    return {
        playRound,
        getActivePlayer
    };
}

const game = GameController();