import { dictionary } from './dictionary.js';

const magicWord = dictionary[Math.round(Math.random() * dictionary.length)];

const state = {
    cells: Array(6)
        .fill()
        .map(() => Array(5).fill('')),
    curRow: 0,
    curCol: 0
};

function drawField(container) {
    const gridBox = document.createElement('div');
    gridBox.className = 'grid';

    for (let i = 0; i < 6; i++) {
        for (let j = 0; j < 5; j++) {
            const cell = document.createElement('div');
            cell.className = 'box';
            cell.textContent = '';
            cell.id = `box${i}${j}`;

            gridBox.appendChild(cell);
        }
    }
    container.appendChild(gridBox);
}
function updateField() {
    for (let i = 0; i < state.cells.length; i++) {
        for (let j = 0; j < state.cells[i].length; j++) {
            const cell = document.getElementById(`box${i}${j}`);
            cell.textContent = state.cells[i][j];
        }
    }
}

function keyEvents() {
    document.body.onkeydown = (e) => {
        const key = e.key;
        if (key.length === 1 && key.match(/[а-щьюяїієґ]+/i)) {
            if (state.currentCol === 5){
                return;
            }
            state.cells[state.curRow][state.curCol] = key;
            state.curCol++;
        }
        if (key === 'Enter'){
            checkWord();
        }
        
        updateField();
    };
    const check = document.querySelector('.check');
    check.addEventListener('click', () => checkWord());
    const reset = document.querySelector('.reset');
    reset.addEventListener('click', function(){
        document.location.reload(true);
    });
    
}
function checkWord(){
    if (state.curCol === 5) {
        const word = state.cells[state.curRow].reduce((prev, curr) => prev + curr);
        if (dictionary.includes(word)) {
            compare(word);
            state.curRow++;
            state.curCol = 0;
        } else {
            alert('Not a valid word.');
            console.log(state.curRow, state.curCol);
            for (let i = 5; i >= 0; i--){
                state.cells[state.curRow][i-1] = '';
            }
            state.curCol = 0;
            updateField();        
        }
        console.log(state.curRow, state.curCol);
        
    }
}

function compare(word) {
    const row = state.curRow;

    for (let i = 0; i < 5; i++) {
        const cell = document.getElementById(`box${row}${i}`);
        const letter = cell.textContent;
        if (letter === magicWord[i]) {
            cell.classList.add('right');
        } else if (magicWord.includes(letter)) {
            cell.classList.add('wrong_place');
        } else {
            cell.classList.add('wrong');
        }
    }

    if (magicWord === word) {
        alert('Congratulations! You won.');
    } else if (state.curRow === 5) {
        alert(`Game over! The word was ${magicWord}.`);
    }
}
function startGame() {
    const game = document.getElementById('game');
    drawField(game);
    console.log(magicWord);
    keyEvents();
}

startGame();