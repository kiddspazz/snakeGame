//new tab--canvas from javascript console
var body = document.querySelector("body");
var c = document.createElement("canvas");
body.appendChild(c);
let boardSize = 60;
let sizer = 10;
let speed = 200;

c.id = "c";
c.width = boardSize * sizer;
c.height = boardSize * sizer;
c.style.border = "1px solid black";
var ctx = c.getContext("2d");

let state = {
    snakeLength: 2,
    appleLoc: randomVecInBoard(),
    snakeLoc: [[c.width/2, c.height/2]],
    snakeMove: "right"
}

window.addEventListener("keydown", recordInput);

function recordInput(e) {
    switch (e.keyCode) {
        case 37:
            state.snakeMove = "left";
            break;
        case 38:
            state.snakeMove = "up";
            break;
        case 39:
            state.snakeMove = "right";
            break;
        case 40:
            state.snakeMove ="down";
            break;
    }
}

var startGame = window.setInterval(tick, speed);

function tick() {
    draw(state);

    let snakeNotHead = state.snakeLoc.slice(1);

    if (
        state.snakeLoc[0][0] < 0 ||
        state.snakeLoc[0][0] > boardSize * sizer ||
        state.snakeLoc[0][1] < 0 ||
        state.snakeLoc[0][1] > boardSize * sizer
    ) {
        window.clearInterval(startGame);
        alert(`you lost. score: ${state.snakeLength}`)
    }

    state.snakeLoc.unshift(snakeNextLoc(state.snakeLoc[0], state.snakeMove));


    if (state.snakeLoc.length > state.snakeLength) {
        state.snakeLoc.pop();
    }

    if (state.snakeLoc[0][0] === state.appleLoc[0] && state.snakeLoc[0][1] === state.appleLoc[1]) {
        state.appleLoc = null;
        state.snakeLength ++;
        speed = speed * 9/10;
        endGame = window.clearInterval(startGame);
        startGame = window.setInterval(tick, speed);
    }

    if (!state.appleLoc) {
        do {
            state.appleLoc = randomVecInBoard();
        } while (isLocInSnake(state.appleLoc));
    }
}

function draw(currentState) {
    ctx.fillStyle = "rgb(255, 255, 255)";
    ctx.fillRect(0, 0, c.width, c.height);
    ctx.fill();

    drawSnake(currentState.snakeLoc);
    drawApple(state.appleLoc);
}

function drawSnake(snakeLocs) {
    ctx.fillStyle = "rgb(0, 0, 0)";
    for (let e in snakeLocs) {
        ctx.beginPath();
        ctx.fillRect(snakeLocs[e][0], snakeLocs[e][1], sizer, sizer);
        ctx.fill();
    }
}

function drawApple(appleLoc) {
    ctx.fillStyle = "rgb(255, 0, 0)";
    ctx.beginPath();
    ctx.fillRect(appleLoc[0], appleLoc[1], sizer, sizer);
    ctx.fill();
}

function snakeNextLoc(currLoc, dir) {
    let nextLoc = [currLoc[0], currLoc[1]]
    switch(dir) {
        case "left":
            nextLoc[0] -= sizer;
            return nextLoc;
        case "up":
            nextLoc[1] -= sizer;
            return nextLoc;
        case "right":
            nextLoc[0] += sizer;
            return nextLoc;
        case "down":
            nextLoc[1] += sizer;
            return nextLoc;

    }
}

function randomVecInBoard() {
    return [Math.floor(Math.random() * boardSize) * sizer, Math.floor(Math.random() * boardSize) * sizer];
}

function isLocInSnake(loc) {
    for (let snakeLoc in state.snakeLoc) {
        if (state.snakeLoc[snakeLoc][0] === loc[0] && state.snakeLoc[snakeLoc][1] === loc[1]) return true;
    }
    return false;
}
