//new tab--canvas from javascript console
var body = document.querySelector("body");
var c = document.createElement("canvas");
body.appendChild(c);
let boardSize = 20;
c.id = "c";
c.width = boardSize * 10;
c.height = boardSize * 10;
c.style.border = "1px solid black";
var ctx = c.getContext("2d");

let state = {
    snakeLength: 2,
    appleLoc: vecInBoard(),
    snakeLoc: [[boardSize/2, boardSize/2]],
    snakeMove: "right"
}

window.addEventListener("keydown", recordInput);

function recordInput(e) {
    switch (e) {
        case 37:
            state.snakeMove = "left";
        case 38:
            state.snakeMove = "up";
        case 39:
            state.snakeMove = "right";
        case 40:
            state.snakeMove ="down";
    }
}

tick();

function tick() {
    draw(state);

    if (!state.appleLoc) {
        do {
            state.appleLoc = vecInBoard();
        } while (state.snakeLoc.contains(state.appleLoc));
    }

    state.snakeLoc.unshift(snakeNextLoc(state.snakeLoc[0], state.snakeMove));
}

function draw(currentState) {
    ctx.fillStyle = "rgb(255, 255, 255)";
    ctx.rect(0, 0, c.width, c.height)

    drawSnake(currentState.snakeLoc);
    drawApple(state.appleLoc);
}

function drawSnake(snakeLocs) {
    ctx.style = "rgb(0, 0, 0)";
    for (let e in snakeLocs) {

        console.log(snakeLocs[e]);

        ctx.rect(snakeLocs[e][0], snakeLocs[e][0], 10, 10);
        ctx.fill();
    }
}

function drawApple(appleLoc) {

    console.log(appleLoc);

    ctx.style = "rgb(255, 0, 0)";
    ctx.rect(appleLoc[0], appleLoc[1], 10, 10);
    ctx.fill();
}

function snakeNextLoc(currLoc, dir) {
    switch(dir) {
        case "left":
            return currLoc[0] - 1;
        case "up":
            return currLoc[1] - 1;
        case "right":
            return currLoc[0] + 1;
        case "down":
            return currLoc[1] + 1;

    }
}

function vecInBoard() {
    return [Math.floor(Math.random() * boardSize), Math.floor(Math.random() * boardSize)];
}

/*
let snakeMove = {
    left: x - 1,
    up: y - 1,
    right: x + 1,
    down: y + 1
}
*/
