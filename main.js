// setup canvas

const canvas = document.querySelector('canvas');
const ctx = canvas.getContext('2d');

ctx.lineWidth = 10;

// ctx.imageSmoothingEnabled = true;

const width = canvas.width = window.innerWidth;
const height = canvas.height = window.innerHeight;

const max = (Math.pow(width, 2) + Math.pow(height, 2))/10;

// function to generate random number

function random(min, max) {
  const num = Math.floor(Math.random() * (max - min + 1)) + min;
  return num;
}

function Ball(x, y, velX, velY, color, size) {
  this.x = x;
  this.y = y;
  this.velX = velX;
  this.velY = velY;
  this.color = color;
  this.size = size;
}

Ball.prototype.draw = function() {
  ctx.beginPath();
  ctx.fillStyle = this.color;
  ctx.arc(this.x, this.y, this.size, 0, 2 * Math.PI);
  ctx.fill();
}

Ball.prototype.update = function(){
  if(this.x+this.size >= width){
    this.velX = -(this.velX);
  }
  if(this.x-this.size <= 0){
    this.velX = -(this.velX);
  }
  if(this.y+this.size >= height){
    this.velY = -(this.velY);
  }
  if(this.y-this.size <= 0){
    this.velY = -(this.velY);
  }
  this.x += this.velX;
  this.y += this.velY;
}

let balls = [];

while(balls.length<25){
  let size = random(10, 20);
  let ball = new Ball(
    random(0+size, width-size),
    random(0+size, height-size),
    random(-1, 1),
    random(-1, 1),
    // 'rgb(' + random(0,255) + ',' + random(0,255) + ',' + random(0,255) +')',
    'rgb(137, 207, 240)',
    size);
  balls.push(ball);
}

function loop(){
  // ctx.save();

  ctx.clearRect(0, 0, canvas.width, canvas.height);

  ctx.fillStyle = 'rgba(255, 255, 255, 0.25)';
  ctx.fillRect(0, 0, width, height);

  for(let i = 0; i<balls.length; i++){
    balls[i].draw();
    balls[i].update();
  }

  for(let i = 0; i<balls.length; i++){
    for(let j = i+1; j<balls.length; j++){

        let distance = Math.pow(balls[i].x-balls[j].x, 2) + Math.pow(balls[i].y-balls[j].y, 2);

        let stroke_col = 1-distance/max;
        if(stroke_col<0) stroke_col = 0;
        // if(stroke_col<1) stroke_col = 0;

        // ctx.font = '50px serif';
        // ctx.fillText(`${stroke_col}`, 50, 90);

        ctx.strokeStyle = `rgba(137, 207, 240, ${stroke_col})`;

        ctx.beginPath();
        ctx.moveTo(balls[i].x, balls[i].y);
        ctx.lineTo(balls[j].x, balls[j].y);
        ctx.stroke();
    }
  }

  // ctx.restore();

  requestAnimationFrame(loop);
}

loop();
