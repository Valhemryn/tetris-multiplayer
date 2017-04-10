// Main

// Pieces matrix
var createPiece = function(type) {
    if (type === 'T') {
        return [
            [0, 0, 0],
            [1, 1, 1],
            [0, 1, 0],
        ];
    } else if (type === 'O') {
        return [
            [2, 2],
            [2, 2],
        ];
    } else if (type === 'L') {
        return [
            [0, 3, 0],
            [0, 3, 0],
            [0, 3, 3],
        ];
    } else if (type === 'J') {
        return [
            [0, 4, 0],
            [0, 4, 0],
            [4, 4, 0],
        ];
    } else if (type === 'I') {
        return [
            [0, 5, 0, 0],
            [0, 5, 0, 0],
            [0, 5, 0, 0],
            [0, 5, 0, 0],
        ];
    } else if (type === 'S') {
        return [
            [0, 6, 6],
            [6, 6, 0],
            [0, 0, 0],
        ];
    } else if (type === 'Z') {
        return [
            [7, 7, 0],
            [0, 7, 7],
            [0, 0, 0],
        ];
    }
};

// Init players
const tetri = [];
const playerElements = document.querySelectorAll('.player');
[...playerElements].forEach(element => {
    const tetris = new Tetris(element);
    tetri.push(tetris);
});

const keyListener = (event) => {
    [ // left, right, rotate left, rotate right, down
        [65, 68, 81, 69, 83], // sdw qe
        [72, 75, 89, 73, 74], // hjk yi
    ].forEach((key, index) => {
        const player = tetri[index].player;
        if (event.type === 'keydown') { // check to activate on key down only
            if (event.keyCode === key[0]) player.move(-1);
            else if (event.keyCode === key[1]) player.move(1);
            else if (event.keyCode === key[2]) player.rotate(-1);
            else if (event.keyCode === key[3]) player.rotate(1);
        }
        if (event.keyCode === key[4]) { // down button
            if (event.type === 'keydown') { // check to see if down button is held and accelerate
                if (player.dropInterval !== player.DROP_FAST) {
                    player.drop();
                    player.dropInterval = player.DROP_FAST
                }
            } else { // reset speed to normal
                player.dropInterval = player.DROP_SLOW
            }
        }
    });
}

// Keyboard movements
document.addEventListener('keydown', keyListener);
document.addEventListener('keyup', keyListener); // Key up to prevent multiplayer block