var score=document.querySelector('.score-no');
var t=document.querySelector('.timer');
let lifeNO=document.querySelector('#life-no');

// timer class
var Timer=function(){
  this.time=0;
  this.keyup=0;
};

Timer.prototype.start = function(){
  if (this.keyup == 0) {
    this.keyup++;
    this.interval = window.setInterval(this.timeCounter, 1000);
  }
};

Timer.prototype.timeCounter = function() {
  timer.time++;
  t.innerText=timer.time;
};

Timer.prototype.reset = function() {
  window.clearInterval(this.interval);
  this.keyup=0;
  this.time=0;
  t.innerText=this.time;
};
// end of timer class


// Enemies our player must avoid
var Enemy = function() {
    // Variables applied to each of our instances go here,
    // we've provided one for you to get started

    // The image/sprite for our enemies, this uses
    // a helper we've provided to easily load images
    this.sprite = 'images/enemy-bug.png';
    this.x=101*1;
    this.y=-27+83*2;
    this.speed=160;
};

// Update the enemy's position, required method for game
// Parameter: dt, a time delta between ticks
Enemy.prototype.update = function(dt) {
    // You should multiply any movement by the dt parameter
    // which will ensure the game runs at the same speed for
    // all computers.
    this.x+=dt*this.speed;
    if (this.x > 505) {
      this.x=-101;
    }
};

// Draw the enemy on the screen, required method for game
Enemy.prototype.render = function() {
    ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
};

// Now write your own player class
// This class requires an update(), render() and
// a handleInput() method.
var Player = function() {
    this.sprite = 'images/char-boy.png';
    this.x=2*101;
    this.y=-27+83*5;
    this.score=0;
    this.life=2;
};

Player.prototype.update = function() {
  if(this.y == -27){
    this.x=2*101;
    this.y=-27+83*5;
    this.score++;
    score.innerText=this.score;
  }
};

Player.prototype.render = function() {
    ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
};

var temp=true;//this variable to check if the game is over or not to prevent movment of the player while the game is over
Player.prototype.handleInput = function(key) {
  if(temp == true){
    if(key=='left'){
      if (this.x!==0) {
        this.x-=101;
      }
      if(timer.keyup==0){
        timer.start();
      }
    }

    else if(key=='up'){
      if (this.y !== -27) {
        this.y-=83;
      }
      if(timer.keyup==0){
        timer.start();
      }
    }

    else if(key=='right'){
      if(this.x !== 404){
      this.x+=101;
      }
      if(timer.keyup==0){
        timer.start();
      }
    }

    else if(key=='down'){
      if (this.y !== 388) {
        this.y+=83;
      }
      if(timer.keyup==0){
        timer.start();
      }
    }
  }
};

// Now instantiate your objects.
// Place all enemy objects in an array called allEnemies
// Place the player object in a variable called player
var enemy1=new Enemy();
enemy1.x=101*4;
enemy1.y=-27+83*1;
enemy1.speed=210;
var enemy2=new Enemy();
enemy2.x=101*1;
enemy2.y=-27+83*2;
enemy2.speed=240;
var enemy3=new Enemy();
enemy3.x=101*2;
enemy3.y=-27+83*3;
enemy3.speed=120;
var enemy4=new Enemy();
enemy4.x=101*2;
enemy4.y=-27+83*3;
enemy4.speed=190;
var enemy5=new Enemy();
enemy5.x=101*2;
enemy5.y=-27+83*1;
enemy5.speed=150;
var player = new Player();
var allEnemies=[enemy1,enemy2,enemy3,enemy4,enemy5];
var timer=new Timer();


// This listens for key presses and sends the keys to your
// Player.handleInput() method. You don't need to modify this.
document.addEventListener('keyup', function(e) {
    var allowedKeys = {
        37: 'left',
        38: 'up',
        39: 'right',
        40: 'down'
    };
    player.handleInput(allowedKeys[e.keyCode]);
});
