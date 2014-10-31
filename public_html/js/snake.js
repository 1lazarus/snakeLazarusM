/*
 * /
 * variables
 */

var snake;
var context;
var snakeSize;
var screenWidth;

var screenHeight;

var snakeDirection;
var snakeLength;
var snakeWidth;

var gameState;
var food;
/*
 * starts snake
 */
gameInitialize();
snakeInitialize();
foodInitialize();
setInterval(gameLoop, 2000 / 50);


/*
 * 
 * game function
 */
function gameInitialize() {
    var canvas = document.getElementById("game-screen");
    context = canvas.getContext("2d");

    screenWidth = window.innerWidth;
    screenHeight = window.innerHeight;

    canvas.width = screenWidth;
    canvas.height = screenHeight;

    document.addEventListener("keydown", keyboardHandler);
    
}
/*
 * 
 * Game loops
 */
function gameLoop() {
    gameDraw();      
    
    snakeUpdate();
    snakeDraw();
    foodDraw();
   }

function gameDraw() {
    context.fillStyle = "rgb(400, 0, 100)";
    context.fillRect(0, 0, screenWidth, screenHeight);
}

function snakeInitialize() {
    snake = [];
    snakeLength = 1;
    snakeSize = 20;
    snakeDirection = "down";
    for (var index = snakeLength - 1; index >= 0; index--) {
        snake.push({x: index, y: 0});
    }
   
}


function snakeDraw() {
    for (var index = 0; index < snake.length; index++) {
        context.fillStyle = "black";
        context.fillRect(snake[index].x * snakeSize, snake[index].y * snakeSize, snakeSize, snakeSize);
    }
}


function snakeUpdate() {
    var snakeHeadX = snake[0].x;
    var snakeHeadY = snake[0].y;

    if (snakeDirection == "down") {
        snakeHeadY++;
    }
    else if (snakeDirection == "right") {
        snakeHeadX++;
    }
    else if (snakeDirection == "left") {
        snakeHeadX--;
    }
    else if (snakeDirection == "up") {
        snakeHeadY--;
    }
    checkFoodCollisions(snakeHeadX, snakeHeadY);
    checkWallCollisions(snakeHeadX, snakeHeadY);

    var snakeTail = snake.pop();
    snakeTail.x = snakeHeadX;
    snakeTail.y = snakeHeadY;
    snake.unshift(snakeTail);
}
function foodInitialize() {
    snake.push({
    });
    food = {
        x: 0,
        y: 0
    };
    setFoodPosition();
}
function foodDraw() {
    context.fillStyle = "white";
    context.fillRect(food.x * snakeSize, food.y * snakeSize, snakeSize, snakeSize);
}
function setFoodPosition() {
    var randomX = Math.floor(Math.random() * screenWidth);
    var randomY = Math.floor(Math.random() * screenHeight);

    food.x = Math.floor(randomX / snakeSize);
    food.y = Math.floor(randomY / snakeSize);
}
/*
 * input function
 */
function keyboardHandler(event) {
    console.log(event);
    if (event.keyCode == "39" && snakeDirection != "left") {
        snakeDirection = "right";

    }
    else if (event.keyCode == "38" && snakeDirection != "down") {
        snakeDirection = "up";
    }
    else if (event.keyCode == "40" && snakeDirection != "up") {
        snakeDirection = "down";
    }
    else if (event.keyCode == "37" && snakeDirection != "right") {
        snakeDirection = "left";
    }

}
/*
 * eats food
 */
function checkFoodCollisions(snakeHeadX, snakeHeadY) {
    if (snakeHeadX == food.x && snakeHeadY == food.y) {
        snake.push({
            x: 0,
            y: 0
        });
        snakeLength++;

        var randomX = Math.floor(Math.random() * screenWidth);
        var randomY = Math.floor(Math.random() * screenHeight);

        food.x = Math.floor(randomX / snakeSize);
        food.y = Math.floor(randomY / snakeSize);
    }
}


function checkWallCollisions(snakeHeadX, snakeHeadY) {
    if (snakeHeadX >= screenWidth || snakeHeadX * snakeSize < 0) {
        console.log("Wall Collision");
        
    }
}


function setState(state){
    gameState = state;
    showMenu(state);
}

function displayMenu(menu){
    menu.style.visibility = "visible";
}

function showMenu(state){
    if(state == "gameOver"){
        displayMenu(gameOverMenu);
    }
    else if(state == "Play") {
        displayMenu(playHUD);
    }
    
}

function centerMenuPosition(menu){
    menu.style.top = (screenHeight/ 2) - (menu.offsetHeight / 2) + "px";
    menu.style.left = (screenWidth / 2) - (menu.offsetWidth / 2) + "px";
}

function drawScoreboard(){
    scoreboard.innerHTML = "Score:" + snakeLength;
}