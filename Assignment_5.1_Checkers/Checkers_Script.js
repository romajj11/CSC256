// Get the board container from the DOM
const board = document.getElementById('board');

// Array to store square elements (optional, for reference)
const squares = [];

// Variables to store the currently selected piece and its square
let selectedPiece = null;
let selectedSquare = null;

// ===== CREATE THE BOARD =====
for (let row = 0; row < 8; row++) {
  for (let col = 0; col < 8; col++) {
    // Create a square element
    const square = document.createElement('div');

    // Add square class and determine if it's light or dark
    square.classList.add('square', (row + col) % 2 === 0 ? 'light' : 'dark');

    // Store row and column in dataset for easy reference later
    square.dataset.row = row;
    square.dataset.col = col;

    // Place pieces on starting positions (only on dark squares)
    if (square.classList.contains('dark')) {
      if (row < 3) {
        // Top 3 rows → red pieces
        const piece = createPiece('red');
        square.appendChild(piece);
      }
      if (row > 4) {
        // Bottom 3 rows → black pieces
        const piece = createPiece('black');
        square.appendChild(piece);
      }
    }

    // Add click event for moving pieces
    square.addEventListener('click', () => handleSquareClick(square));

    // Add square to board and store in array
    board.appendChild(square);
    squares.push(square);
  }
}

// ===== FUNCTION: Create a piece element =====
function createPiece(color) {
  const piece = document.createElement('div');
  piece.classList.add('piece', color);
  piece.dataset.color = color;

  // Clicking a piece selects it (and prevents triggering the square click)
  piece.addEventListener('click', (e) => {
    e.stopPropagation(); // Prevent square click event
    selectPiece(piece);
  });

  return piece;
}

// ===== FUNCTION: Select a piece =====
function selectPiece(piece) {
  // Remove highlight from previously selected piece
  if (selectedPiece) selectedPiece.classList.remove('highlight');

  // Store the new selected piece and its square
  selectedPiece = piece;
  selectedSquare = piece.parentElement;

  // Add highlight to the new selected piece
  piece.classList.add('highlight');
}

// ===== FUNCTION: Handle square click (movement) =====
function handleSquareClick(square) {
  if (!selectedPiece) return; // No piece selected → do nothing

  // Get coordinates of from and to squares
  const fromRow = parseInt(selectedSquare.dataset.row);
  const fromCol = parseInt(selectedSquare.dataset.col);
  const toRow = parseInt(square.dataset.row);
  const toCol = parseInt(square.dataset.col);

  // Allow only diagonal movement of exactly one square
  if (
    Math.abs(fromRow - toRow) === 1 && // One row difference
    Math.abs(fromCol - toCol) === 1 && // One column difference
    !square.hasChildNodes() // Destination must be empty
  ) {
    // Move the selected piece to the clicked square
    square.appendChild(selectedPiece);

    // Remove highlight and reset selection
    selectedPiece.classList.remove('highlight');
    selectedPiece = null;
    selectedSquare = null;
  }
}
