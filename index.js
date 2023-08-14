import * as sudoku from "/sudoku.js";

const sudoku_board = document.getElementById("sudoku_board");
const option_list = document.getElementById("options");

const new_game_btn = document.getElementById("new_game");

const difficulty_options = document.getElementsByClassName("option");

var solvedSudoku = sudoku.randomSudokuBoard;
var playablePuzzle = solvedSudoku;
var solvedSudokuCopy = createCopy(solvedSudoku);

const easy_difficulty = 36;
const medium_difficulty = 32;
const hard_difficulty = 28;

var option_selected = null;
var selected_digit = null;
var selected_difficulty = easy_difficulty;

window.onload = ()=>{
    settings();
    setDifficulty(playablePuzzle, selected_difficulty);
    setGame();

    new_game_btn.addEventListener("click", newGame);
};

function createCopy(board) {
    return board.map(row => [...row]);
}

function setDifficulty(board, difficulty){
    const cellToRemove = 81 - difficulty;
    
    for (let i = 0; i < cellToRemove; i++) {
        let row, col;
        do {
        row = Math.floor(Math.random() * 9);
        col = Math.floor(Math.random() * 9);
        } while (board[row][col] === 0);

        board[row][col] = 0;
    }
}

function setGame(){
    for(let i=1; i<10;i++){
        let option_cell = document.createElement("div");
        option_cell.classList.add("option_cell");
        option_cell.innerText = i;
        option_cell.addEventListener("click", optionSelected);

        option_list.append(option_cell);
    }

    for(let row=0; row<9;row++){
        for(let col=0; col<9;col++){
            let cell = document.createElement("div");
            cell.id = row.toString()+"."+col.toString();
            cell.classList.add("cell");
            cell.innerText = playablePuzzle[row][col] != 0 ? playablePuzzle[row][col] : "";
            
            cell.addEventListener("click", addValue);

            if(playablePuzzle[row][col] == ""){
                cell.classList.add("empty_cell");
            } else {
                cell.classList.add("filled_cell");
            }

            if(row === 2 || row === 5){
                cell.classList.add("horizontal_border");
            }

            if(col === 2 || col === 5){
                cell.classList.add("vertical_border");
            }

            sudoku_board.append(cell);
        }   
    }
}

function optionSelected(){
    if(option_selected != null){
        option_selected.classList.remove("active_cell");
    }
    option_selected = this;
    option_selected.classList.add("active_cell");
    
    selected_digit = option_selected.innerText;
    
} 

function addValue(){
    let cell = !this.classList.contains("filled_cell")?this:null;
    if(cell == null){
        return;
    }
    let [row, col] = cell.id.split(".");
    if(solvedSudokuCopy[row][col] == selected_digit){
        cell.style.color = "green";
        cell.innerText = selected_digit;
    } else {
        cell.style.color = "red";
        cell.innerText = selected_digit;
    }
}

function settings(){
    for (var i = 0; i < 3; i++) {
        difficulty_options[i].addEventListener("click", function() {
          var current = document.getElementsByClassName("active");
          current[0].className = current[0].className.replace(" active", "");
          this.className += " active";
          let diff_ch = current[0].innerText.toLowerCase();
          
          selected_difficulty = (diff_ch == "easy")?easy_difficulty:(diff_ch == "medium")? medium_difficulty: hard_difficulty;
    });
    }
}

function newGame(){
    
    solvedSudoku = sudoku.generateRandomSudokuBoard();
    playablePuzzle = solvedSudoku;
    solvedSudokuCopy = createCopy(solvedSudoku);
    
    console.log(selected_difficulty);
    setDifficulty(playablePuzzle, selected_difficulty);
    
    for(let row=0; row<9;row++){
        for(let col=0; col<9;col++){
            let cell = document.getElementById(`${row}.${col}`);
            cell.classList.remove("empty_cell");
            cell.classList.remove("filled_cell");
            
            cell.innerText = playablePuzzle[row][col] != 0 ? playablePuzzle[row][col] : "";
            
            if(playablePuzzle[row][col] == ""){
                cell.classList.add("empty_cell");
            } else {
                cell.style.color = "black";
                cell.classList.add("filled_cell");
            }
        }
    }
}