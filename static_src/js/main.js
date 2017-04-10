// Main
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
