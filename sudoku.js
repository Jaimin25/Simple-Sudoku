const board = [
  [0, 0, 0, 0, 0, 0, 0, 0, 0],
  [0, 0, 0, 0, 0, 0, 0, 0, 0],
  [0, 0, 0, 0, 0, 0, 0, 0, 0],
  [0, 0, 0, 0, 0, 0, 0, 0, 0],
  [0, 0, 0, 0, 0, 0, 0, 0, 0],
  [0, 0, 0, 0, 0, 0, 0, 0, 0],
  [0, 0, 0, 0, 0, 0, 0, 0, 0],
  [0, 0, 0, 0, 0, 0, 0, 0, 0],
  [0, 0, 0, 0, 0, 0, 0, 0, 0]
];

export function generateRandomSudokuBoard() {

    let numbers = [1, 2, 3, 4, 5, 6, 7, 8, 9];
    
    shuffle(numbers);

    for (let row = 0; row < 9; row++) {
      for (let col = 0; col < 9; col++) {
          const numIndex = (row*3+Math.floor(row/3)+col)%9;
          const num = numbers[numIndex];
          board[row][col] = num;
      }
    }
  
    return board;
}
  
function shuffle(array) {
  for (let i = array.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [array[i], array[j]] = [array[j], array[i]];
  }
}

  export const randomSudokuBoard = generateRandomSudokuBoard();
  
  