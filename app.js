const gridDisplay = document.querySelector('.grid');
const scoreDisplay = document.querySelector('#score');
const resultDisplay = document.querySelector('.result');
let squares = [];
let score = 0;
let width = 4;
//create a playing board
function createBoard(){
    for(let i=0;i<width*width;++i){
        let square = document.createElement('div');
        square.innerHTML = ' ';
        gridDisplay.appendChild(square);
        squares.push(square);
        // console.log(squares);
    }
    generate();
    generate();
}
createBoard();

//generate a number randomly
function generate(){
    let randomNumber = Math.floor(Math.random() * squares.length);
    if(squares[randomNumber].innerHTML == 0){
        squares[randomNumber].innerHTML = Math.random() >= 0.9 ? 4 : 2;
        gameOver();
    }else{
        generate();
    }
}

//swipe right
function moveRight(){
    for(let i=0;i<16;i++){
        if(i%4===0){
            let totalOne = squares[i].innerHTML;
            let totalTwo = squares[i+1].innerHTML;
            let totalThree = squares[i+2].innerHTML;
            let totalFour = squares[i+3].innerHTML;
            let row = [parseInt(totalOne),parseInt(totalTwo),parseInt(totalThree),parseInt(totalFour),];
            // console.log(row);

            let filteredRow = row.filter(num => num)
            // console.log(filteredRow);
            // console.log(Array.isArray(filteredRow));

            let missing = 4 - filteredRow.length;
            let zeros = Array(missing).fill(0);
            // console.log(zeros);
            // console.log(Array.isArray(zeros));
            let newRow = zeros.concat(filteredRow)
            // console.log(newRow);
            
            squares[i].innerHTML = newRow[0];
            squares[i+1].innerHTML = newRow[1];
            squares[i+2].innerHTML = newRow[2];
            squares[i+3].innerHTML = newRow[3];
        }
    }
}
moveRight();

// //swipe left
function moveLeft(){
    for(let i=0;i<16;i++){
        if(i%4===0){
            let totalOne = squares[i].innerHTML;
            let totalTwo = squares[i+1].innerHTML;
            let totalThree = squares[i+2].innerHTML;
            let totalFour = squares[i+3].innerHTML;
            let row = [parseInt(totalOne),parseInt(totalTwo),parseInt(totalThree),parseInt(totalFour),];

            // console.log(row);
            let filteredRow = row.filter(num => num)
            // console.log(filteredRow);
            let missing = 4 - filteredRow.length;
            let zeros = Array(missing).fill(0)
            // console.log(zeros);
            let newRow = filteredRow.concat(zeros)
            // console.log(newRow);

            squares[i].innerHTML = newRow[0];
            squares[i+1].innerHTML = newRow[1];
            squares[i+2].innerHTML = newRow[2];
            squares[i+3].innerHTML = newRow[3];
        }
    }
}
moveLeft();

// //swipe down
function moveDown(){
    for(let i=0;i<4;i++){
        let totalOne = squares[i].innerHTML;
        let totalTwo = squares[i+width].innerHTML;
        let totalThree = squares[i+width*2].innerHTML;
        let totalFour = squares[i+width*3].innerHTML;
        let column = [parseInt(totalOne),parseInt(totalTwo),parseInt(totalThree),parseInt(totalFour)];

        // console.log(column);
            let filteredColumn = column.filter(num => num)
            // console.log(filteredColumn);
            let missing = 4 - filteredColumn.length;
            let zeros = Array(missing).fill(0)
            // console.log(zeros);
            let newColumn = zeros.concat(filteredColumn)
            // console.log(newColumn);

            squares[i].innerHTML = newColumn[0];
            squares[i+1*width].innerHTML = newColumn[1];
            squares[i+2*width].innerHTML = newColumn[2];
            squares[i+3*width].innerHTML = newColumn[3];
    }
}
moveDown();

// //swipe up
function moveUp(){
    for(let i=0;i<4;i++){
        let totalOne = squares[i].innerHTML;
        let totalTwo = squares[i+width].innerHTML;
        let totalThree = squares[i+width*2].innerHTML;
        let totalFour = squares[i+width*3].innerHTML;
        let column = [parseInt(totalOne),parseInt(totalTwo),parseInt(totalThree),parseInt(totalFour)];

        // console.log(column);
            let filteredColumn = column.filter(num => num)
            // console.log(filteredColumn);
            let missing = 4 - filteredColumn.length;
            let zeros = Array(missing).fill(0)
            // console.log(zeros);
            let newColumn = filteredColumn.concat(zeros);
            // console.log(newColumn);

            squares[i].innerHTML = newColumn[0];
            squares[i+1*width].innerHTML = newColumn[1];
            squares[i+2*width].innerHTML = newColumn[2];
            squares[i+3*width].innerHTML = newColumn[3];
    }
}
moveUp();


function combineRow(){
    for (let i = 0; i < 15; i++) {
        if((squares[i].innerHTML === squares[i+1].innerHTML)){
            // let combineTotal = ((squares[i].innerHTML) ===' '?0:parseInt(squares[i].innerHTML))+((squares[i+1].innerHTML) === ' '?0:parseInt(squares[i+width].innerHTML));
            let combineTotal = parseInt(squares[i].innerHTML)+parseInt(squares[i+1].innerHTML);
            squares[i].innerHTML = combineTotal;
            squares[i+1].innerHTML = 0;
            score = score + combineTotal;
            // console.log(score);
            scoreDisplay.innerHTML = ' ';
            scoreDisplay.innerHTML = score;
        }
        
    }
    checkWin();
}

function combineColumn(){
    for (let i = 0; i < 12; i++) {
        if(squares[i].innerHTML === squares[i+width].innerHTML){
            // let combineTotal = ((squares[i].innerHTML) ===' '?0:parseInt(squares[i].innerHTML))+((squares[i+width].innerHTML) === ' '?0:parseInt(squares[i+width].innerHTML));
            let combineTotal = parseInt(squares[i].innerHTML)+ parseInt(squares[i+width].innerHTML);
            // console.log(combineTotal);
            squares[i].innerHTML = combineTotal;
            squares[i+width].innerHTML = 0;
            score += combineTotal;
            scoreDisplay.innerHTML = ' ';
            scoreDisplay.innerHTML = score;
        }  
    }
    checkWin();
}

//assign controls
function control(e){
    if(e.keyCode === 39){
        keyRight()
    }
    else if(e.keyCode === 37){
        keyLeft()
    }
    else if(e.keyCode === 38){
        keyUp()
    }
    else if(e.keyCode === 40){
        keyDown()
    }
}
document.addEventListener('keyup',control);
function keyRight(){
    moveRight()
    combineRow()
    moveRight()
    generate()
}
function keyLeft(){
    moveLeft()
    combineRow()
    moveLeft()
    generate()
}

function keyDown(){
    moveDown()
    combineColumn()
    moveDown()
    generate()
}
function keyUp(){
    moveUp()
    combineColumn()
    moveUp()
    generate()
}

// check for 2048 in square to win
function checkWin(){
    for (let i = 0; i < squares.length; i++) {
        if(squares[i].innerHTML === 2048){
            resultDisplay.innerHTML = 'You Win'
            document.removeEventListener('keyup',control)
        }
        
    }    
}

// //game over : if there are no zeros left on board
function gameOver(){
    let zero = 0;
    for (let i = 0; i < squares.length; i++) {
        if(squares[i].innerHTML == 0){
            zero++;
        }
    }
    if(zero === 0){
        resultDisplay.innerHTML = 'Game Over';
        document.removeEventListener('keyup',control)
    }    
}