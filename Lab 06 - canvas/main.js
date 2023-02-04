const canvas = document.getElementById("renderArea");
const ctx = canvas.getContext("2d");

const paramX = document.querySelector("#paramX");
const paramY = document.querySelector("#paramY");

ctx.canvas.width  = window.innerWidth * 0.8;
ctx.canvas.height = window.innerHeight * 0.8;

let X = 100; // Number of balls
let Y = 50; // Maximum distance between balls
let isStopped = true;

paramX.value = X;
paramY.value = Y;

paramX.addEventListener('change', (event) => {
    let target = event.target;
    X = target.value;
});

paramY.addEventListener('change', (event) => {
    let target = event.target;
    Y = target.value;
});

document.querySelector("#startBtn").addEventListener('click', (event) => {
    if (isStopped) {
        init();
        event.target.value = "Stop"
    } else {
        event.target.value = "Start"
        balls = []
    }

    isStopped = !isStopped
})

document.querySelector("#resetBtn").addEventListener('click', (event) => {
    paramX.value = X = 100;
    paramY.value = Y = 50;
})

let balls = [];

class Ball {
    constructor(x, y, radius, dx, dy, color = random_rgba()) {
        this.x = x;
        this.y = y;
        this.radius = radius;
        this.dx = dx;
        this.dy = dy;
        this.color = color;
    }

    draw() {
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.radius, 0, Math.PI * 2, false);
        ctx.fillStyle = this.color;
        ctx.fill();
        ctx.closePath();
    }

    update() {
        this.x += this.dx;
        this.y += this.dy;

        if (this.x + this.radius > canvas.width || this.x - this.radius < 0) {
            this.dx = -this.dx;
        }

        if (this.y + this.radius > canvas.height || this.y - this.radius < 0) {
            this.dy = -this.dy;
        }

        this.draw();
    }
}

function random_rgba() {
    var o = Math.round, r = Math.random, s = 255;
    return 'rgba(' + o(r() * s) + ',' + o(r() * s) + ',' + o(r() * s) + ',' + 255 + ')';
}

function init() {
    for (let i = 0; i < X; i++) {
        let radius = Math.random() * 20 + 10;
        let x = Math.random() * (canvas.width - 2 * radius) + radius;
        let y = Math.random() * (canvas.height - 2 * radius) + radius;
        let dx = (Math.random() - 0.5) * 5;
        let dy = (Math.random() - 0.5) * 5;
        balls.push(new Ball(x, y, radius, dx, dy));
    }

    animate();
}

function animate() {
    requestAnimationFrame(animate);
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    for (let i = 0; i < balls.length; i++) {

        if (isStopped)
        break;

        for (let j = i + 1; j < balls.length; j++) {
            let xDiff = (balls[i].x - balls[i].radius) - (balls[j].x - balls[j].radius);
            let yDiff = (balls[i].y - balls[i].radius) - (balls[j].y - balls[j].radius);
            let distance = Math.sqrt(xDiff * xDiff + yDiff * yDiff);

            if (distance < Y) {
                ctx.beginPath();
                ctx.moveTo(balls[i].x, balls[i].y);
                ctx.lineTo(balls[j].x, balls[j].y);
                ctx.strokeStyle = "red";
                ctx.stroke();
            }
        }
        balls[i].update();
    }
}