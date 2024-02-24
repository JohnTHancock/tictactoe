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


// function findCellValue(selectedRow, selectedColumn) {
//     const board = Gameboard();
//     board.getBoard();
//     // const row = board[selectedRow];
//     // const selectedCell = row[selectedColumn];
//     selectedCell = board[selectedRow][selectedColumn].Cell.getValue();
//     console.log(selectedCell);
// }

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
    };

    const playRound = (row, column) => {
        board.playToken(row, column, getActivePlayer().token);

        // const checkForRows = () => {
        //     const boardArray = board.getBoard();
        //     for (let i = 0; i < 3; i++) {
        //         let row = [];
        //         for (let j = 0; j < 3; j++) {
        //             row.push(boardArray[i][j].getValue());
        //         }

        //         if (row.every(field => field == 1) || row.every(field => field == 2)) {
        //             return true
        //         }
        //     }
        //     return false
        // }

        // const checkforColumns = () => {
        //     const boardArray = board.getBoard();
        //     for (let i = 0; i < 3; i++) {
        //         const firstCellValue = boardArray[0][i].getValue();

        //         if (firstCellValue != 0 &&
        //             boardArray[1][i].getValue() === firstCellValue &&
        //             boardArray[2][i].getValue() === firstCellValue) {
        //                 return true;
        //             }
        //     }
        //     return false;
        // }

        // const checkForDiagonals = () => {
        //     const boardArray = board.getBoard();
        //     const topLeftValue = boardArray[0][0].getValue();
        //     const topRightValue = boardArray[0][2].getValue();
        //     if (topLeftValue != 0 &&
        //         boardArray[1][1].getValue() === topLeftValue &&
        //         boardArray[2][2].getValue() === topLeftValue) {
        //             return true;
        //         } else if (topRightValue != 0 &&
        //             boardArray[1][1].getValue() === topRightValue &&
        //             boardArray[2][0].getValue() === topRightValue) {
        //                 return true;
        //             }
        //             return false;
        // }

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