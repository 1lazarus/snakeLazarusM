var snake;
var context;
var snakeSize;
var screenWidth;

var screenHeight;

var snakeDirection;
var snakeLength;
var snakeWidth;

gameInitialize();
snakeInitialize();
setInterval(gameLoop, 1000/30);
foodInitialize();
foodDraw();

function gameInitialize(){
    var canvas = document.getElementById("game-screen");
    context = canvas.getContext("2d");
    
    screenWidth = window.innerWidth;
    screenHeight = window.innerHeight;
    
    canvas.width = screenWidth;
    canvas.height = screenHeight;
    
    document.addEventListener("keydown", keyboardHandler);
}
function gameLoop(){
    gameDraw();
    snakeUpdate();
    snakeDraw();
    foodDraw();
}
function gameDraw(){
    context.fillStyle = "rgb(400, 0, 100)";
    context.fillRect(0, 0, screenWidth, screenHeight);
}

function snakeInitialize(){
    snake = [];
    snakeLength = 5;
    snakeSize = 20;
    snakeDirection = "down";
    for(var index = snakeLength - 1; index >= 0; index--){
        snake.push({ x: index, y: 0 });
    }
}


function snakeDraw(){
    for(var index = 0; index < snake.length; index++){
        context.fillStyle = "black";
        context.fillRect(snake[index].x * snakeSize, snake[index].y * snakeSize, snakeSize, snakeSize);
    }  
}

function snakeUpdate(){
    var snakeHeadX = snake[0].x;
    var snakeHeadY = snake[0].y;
    
    if( snakeDirection == "down") {
       snakeHeadY++;
    }
    else {
        snakeHeadX++;
    }
    var snakeTail = snake.pop();
    snakeTail.x = snakeHeadX;
    snakeTail.y = snakeHeadY;
    snake.unshift(snakeTail);
}
function foodInitialize(){
    snake.push({
        
    });
    food = {
        x: 0,
        y: 0
    };
    setFoodPosition();
}
function foodDraw () {
    context.fillStyle = "white";
    context.fillRect(food.x, food.y, snakeSize, snakeSize);
}
function setFoodPosition(){
    var randomX = Math.floor(Math.random() * screenWidth);
    var randomY = Math.floor(Math.random() * screenHeight);
    
    food.x = randomX;
    food.y = randomY;
}
function keyboardHandler(event){
        console.log(event);
}