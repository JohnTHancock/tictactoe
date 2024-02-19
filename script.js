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