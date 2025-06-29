//global
//P5.PLAY LIBRARY MUST BE ENABLED FOR THIS PROGRAM TO RUN


//game control
var stage = 0;


//player
var p1;
//walking code
var step = 0;
var lookingRight = true;
var lookingLeft = false;

/*
var p1X = 400;
var p1Y = 375;
var pWidth = 50;
var pHeight = 100;
*/

//boxes(platforms) -------FOR LEVEL 1
var b1,b2,b3;
/*
var b1X = 200;
var b1Y = 300;
var bWidth = 200;
var bHeight = 40;
*/

//boxes ------------------FOR LEVEL 2
var b4,b5,b6,b7;


/////wall barriers to stop through platforms
var w1;
var w2;
var w3;

var w4;
var w5;
var w6;
var w7;

//coins ------------------FOR LEVEL 1
var c1,c2,c3,c4;

//coins ------------------FOR LEVEL 2
var c5,c6,c7,c8,c9,c10;

/*
var c1X = 600;//c1 for coin 1
var c1Y = 410;
var cWidth = 20;
var cHeight = 30;
*/

//goomba ----------------FOR LEVEL 1
var g1,g2;

//goomba ----------------FOR LEVEL 2
var g3,g4,g5;

//moving goombas


//counters --------------FOR LEVEL 1
var score = 0;
var lives = 2;
var totalTime; // total time of program running
var splashTime; // amount of time on splash screen only
var gameTime; // amount of time on game only
var timeLimit = 15;

//counters --------------FOR LEVEL 2
var score2 = 0;
var lives2 = 3;
var gameTime2;
var timeLimit2 = 30;

//powerup
var u1;
var up = false;//does mario has the powerup

//gravity
var jump = false // are we jumping?
var direction = 1; // the force of gravity in y direction
var velocity = 2;// the speed of player
var jumpPower = 15; // the energy of player
var fallingSpeed = 2; // equal to velocity
var minHeight = 395;//height of ground
var maxHeight = 50;//height of sky
var jumpCounter = 0;//how many times jump possible

//multimedia
var mario;
var marioLeft1;
var marioLeft2;
var marioRight1;
var marioRight2;
var marioJump;
var platform;
var landscape;
var jumpSound;
var marioFont;
var coin;
var coinSound;
var goomba;
var lifeSound;
var winSound;
var loseSound;
var backgroundMusic;
var powerup;

///////setup
function setup() {
  createCanvas(800, 500);
  rectMode(CENTER);
  textAlign(CENTER);
  imageMode(CENTER);
  
  c1 = new Coin(600,410,20,30);
  c2 = new Coin(600,240,20,30);
  c3 = new Coin(500,90,20,30);
  c4 = new Coin(200,240,20,30);
  c5 = new Coin(220,230,20,30);
  c6 = new Coin(320,240,20,30);
  c7 = new Coin(420,190,20,30);
  c8 = new Coin(180,90,20,30);
  c9 = new Coin(220,90,20,30);
  c10 = new Coin(600,90,20,30);
  p1 = new Player(400,375,50,100,5);
  b1 = new Box(200,300,200,40);
  b2 = new Box(600,300,200,40);
  b3 = new Box(500,150,200,40);
  b4 = new Box(200,300,200,40);
  b5 = new Box(470,250,200,40);
  b6 = new Box(200,150,200,40);
  b7 = new Box(600,150,200,40);
  //gX,gY,gWidth,gHeight,gPosition,gSpeed,gDirection,gDistance
  g1 = new Goomba(200,400,50,70,200,2,-1,150);
  g2 = new Goomba(550,100,50,70,550,2,1,50);
  g3 = new Goomba(600,400,50,70,600,2,1,100);
  g4 = new Goomba(200,240,50,70,200,2,-1,50);
  g5 = new Goomba(600,90,50,70,600,2,1,50);
  
  u1 = new Powerup(120,240,40,40);
  
  w1 =new Wall( b1.bY + 20,20);
 w2 =new Wall( b2.bY + 20,20);
 w3 =new Wall( b3.bY + 20,20);

 w4 =new Wall( b4.bY + 20,20);
 w5 =new Wall( b5.bY + 20,20);
 w6 =new Wall( b6.bY + 20,20);
 w7 =new Wall( b7.bY + 20,20);
  backgroundMusic.play();
}//setup



//////draw
function draw() {
  keyPressed();
  keyTyped();
  gravity();
  totalTime = millis(); //start timer
  //call functions
  if(stage == 0){
    
    splash();
    if(mouseIsPressed == true ){
    stage = 1;
  }
  }
  else if(stage == 1){
    level1();
  }
  else if(stage == 2){
    winScreen();
    if(keyIsDown(27) == true ){
      stage = 0;
      gameTime = gameTime;
      gameTime = 0;
      gameTime2 = 0;
      lives = 2;
      lives2 = 3;
      newGameStart();
      
      score = 0;
      score2 = 0;
    }
  }
  else if(stage == 3){
    loseScreen();
    if(keyIsDown(27) == true ){
      stage = 0;
      gameTime = gameTime;
      gameTime = 0;
      gameTime2 = 0;
      lives = 2;
      lives2 = 3;
      newGameStart();
      
      score = 0;
      score2 = 0;
    }
  }
  else if(stage == 4){
    
    level2();
    
  }
  
  
  
  
}//draw


/////////splash
function splash(){
  //timer 
  splashTime = totalTime;
  
  //appearance
  background(150,230,240);//sky blue
  image(landscape,width/2,height/2,width,height);
  
  //title
  textFont(marioFont);
  fill(255);
  stroke(0);
  strokeWeight(10);
  textSize(100);
  text('Adventures of Mario',width/2, 150);
  textSize(40);
  text('BY: VIPLAV MANKAR, PLATFORM GAME',width/2,200);
  
  //instructions
  text('HOW TO PLAY: ',width/2,270);
  text('USE ARROW KEYS TO MOVE LEFT AND RIGHT PRESS A TO JUMP',width/2,330);
  text('WATCH OUT FOR GOOMBAS',width/2,380);
  text('OBTAIN ALL COINS BEFORE TIME RUNS OUT',width/2,430);
  
  text('CLICK THE SCREEN TO PLAY',width/2,490);
}


////////level1
function level1(){
  //appearance
  background(150,230,240);//sky blue
  image(landscape,width/2,height/2,width,height);

  //window frame
  noFill();
  stroke(0);
  strokeWeight(15);
  rect(width/2,height/2,width,height);
  
  //draw box
  stroke(0);
  strokeWeight(5);
  fill(255,120,0);//orange
  //rect(b1X,b1Y,bWidth,bHeight);
  boxLoad(platform,b1);
  boxLoad(platform,b2);
  boxLoad(platform,b3);
  
  //draw player
  stroke(0);
  fill(150,0,170);//purple
  //rect(p1X,p1Y,pWidth,pHeight);
  //image(mario, p1.pX, p1.pY, p1.pWidth,p1.pHeight);
  player1();// draw player function
  
  
  //collisions
  //box 1
  boxHit(p1,b1);
  
  //wall barrier under box
  wallHit(p1,b1,w1);
  
  //box 2
  boxHit(p1,b2);
  wallHit(p1,b2,w2);
  
  //box 3
  boxHit(p1,b3);
  wallHit(p1,b3,w3);
  
  
  //coins
  //coin 1
  coinLoad(coin,c1);
  score = coinHit(p1,c1,score,coinSound);
  
  //coin 2
  coinLoad(coin,c2);
  score = coinHit(p1,c2,score,coinSound);
  
  //coin 3
  coinLoad(coin,c3);
  score = coinHit(p1,c3,score,coinSound);
  
  //coin 4
  coinLoad(coin,c4);
  score = coinHit(p1,c4,score,coinSound);
  
  //goombas
  //goomba 1
  goombaLoad(goomba,g1);
  lives = goombaHit(p1,g1,lives,lifeSound);
    
    //goomba 2
  goombaLoad(goomba,g2);
  lives = goombaHit(p1,g2,lives,lifeSound);
  
  
  //moving goombas
  goombaMove(g1);
  
  goombaMove(g2);
  
  //scoreboard
  textFont(marioFont);
  fill(255);
  stroke(0);
  strokeWeight(10);
  textSize(30);
  text('POINTS:',50, 50);
  text(score,100,50);
  
  //lives
  textFont(marioFont);
  fill(255);
  stroke(0);
  strokeWeight(10);
  textSize(30);
  text('LIVES:',150, 50);
  text(lives,200,50);
  
  //timer
  splashTime = splashTime;
  gameTime = int((totalTime-splashTime)/1000); //convert to seconds and then to integer
  
  textFont(marioFont);
  fill(255);
  stroke(0);
  strokeWeight(10);
  textSize(30);
  text('TIME REMAINING:',600, 50);
  text(timeLimit - gameTime,700,50);//display countdown time
  
  //code to trigger win or lose screens
  if(score >= 4){
    winSound.play();
    stage = 4; // trigger win condition
    p1 = new Player(400,375,50,100,5);
  }
  
  if(lives <= 0){
    loseSound.play();
    stage = 3;
  }
  if(gameTime >= timeLimit){
    loseSound.play();
    stage = 3;
  }
  
  //powerup 
  image(powerup,u1.uX,u1.uY,u1.uWidth,u1.uHeight);
  
  if(p1.pX >= u1.uX - u1.uWidth/2 && p1.pX <= u1.uX + u1.uWidth && p1.pY >= u1.uY - u1.uHeight && p1.pY <= u1.uY + u1.uHeight/2){
    up = true;
    p1.pWidth = 60;
    p1.pHeight = 105;
    p1.pSpeed = 7;
    u1.uX = -1000;
    coinSound.play();
  }
}// close level1


//////////////////////////////////////////////level2
function level2(){
  image(landscape,width/2,height/2,width,height);
  
  //draw player
  player1();// draw player function
  //scoreboard
  textFont(marioFont);
  fill(255);
  stroke(0);
  strokeWeight(10);
  textSize(30);
  text('POINTS:',50, 50);
  text(score2,100,50);
  
  //lives
  textFont(marioFont);
  fill(255);
  stroke(0);
  strokeWeight(10);
  textSize(30);
  text('LIVES:',150, 50);
  text(lives2,200,50);
  
  //timer
  gameTime = gameTime;
  gameTime2 = int((totalTime-splashTime-(gameTime * 1000))/1000); //convert to seconds and then to integer
  
  textFont(marioFont);
  fill(255);
  stroke(0);
  strokeWeight(10);
  textSize(30);
  text('TIME REMAINING:',600, 50);
  text(timeLimit2 - gameTime2,700,50);//display countdown time
  
  
  //collisions
  //box 4
  boxLoad(platform,b4);
  boxHit(p1,b4);
  
  wallHit(p1,b4,w4);
  
  //collisions
  //box 5
  boxLoad(platform,b5);
  boxHit(p1,b5);
  
  wallHit(p1,b5,w5);
  
  //collisions
  //box 6
  boxLoad(platform,b6);
  boxHit(p1,b6);
  
  wallHit(p1,b6,w6);
  
  //collisions
  //box 7
  boxLoad(platform,b7);
  boxHit(p1,b7);
  
  wallHit(p1,b7,w7);
  
  
  //coin 5
  coinLoad(coin,c5);
  score2 = coinHit(p1,c5,score2,coinSound);
  
  //coin 6
  coinLoad(coin,c6);
  score2 = coinHit(p1,c6,score2,coinSound);
  
  //coin 7
  coinLoad(coin,c7);
  score2 = coinHit(p1,c7,score2,coinSound);
  
  //coin 8
  coinLoad(coin,c8);
  score2 = coinHit(p1,c8,score2,coinSound);
  
  //coin 9
  coinLoad(coin,c9);
  score2 = coinHit(p1,c9,score2,coinSound);
  
  //coin 10
  coinLoad(coin,c10);
  score2 = coinHit(p1,c10,score2,coinSound);
  
  //goomba 3
  goombaLoad(goomba,g3);
  lives2 = goombaHit(p1,g3,lives2,lifeSound);
  
  //moving goombas
  goombaMove(g3);
  
  //goomba 4
  goombaLoad(goomba,g4);
  lives2 = goombaHit(p1,g4,lives2,lifeSound);
  
  //moving goombas
  goombaMove(g4);
  
   //goomba 5
  goombaLoad(goomba,g5);
  lives2 = goombaHit(p1,g5,lives2,lifeSound);
  
  //moving goombas
  goombaMove(g5);
  
  //code to trigger win or lose screens
  if(score2 >= 6){
    winSound.play();
    stage = 2; // trigger win condition
  }
  
  if(lives2 <= 0){
    loseSound.play();
    stage = 3;
  }
  if(gameTime2 >= timeLimit2){
    loseSound.play();
    stage = 3;
  }
}//////////////close level 2


////////winScreen
function winScreen(){
  image(landscape,width/2,height/2,width,height);
  textFont(marioFont);
  fill(255);
  stroke(0);
  strokeWeight(10);
  textSize(200);
  text('YOU WIN',width/2, height/2);
}//close win function


////////loseScreen
function loseScreen(){
    image(landscape,width/2,height/2,width,height);
  textFont(marioFont);
  fill(255);
  stroke(0);
  strokeWeight(10);
  textSize(200);
  text('YOU LOSE',width/2, height/2);
  
}//close lose function

function gravity(){
  
  if(p1.pY >= minHeight && jump == false){
    p1.pY+=0;
    jumpCounter = 0; // reset jump counter when landing
  }
  else{
    p1.pY += (direction * velocity);
  }
  if(jump == true){
    if(p1.pY <= maxHeight || jumpCounter >= jumpPower){
      if(p1.pY >= minHeight){
        p1.pY = minHeight;
      }
      else{
        velocity = fallingSpeed;//fall at maximums
      }
    }
    else{
      jumpSound.play();
      jumpCounter += 1; // add to jump counter
      velocity = -jumpPower;// jumping
    }
  }
  else{
    velocity = fallingSpeed;
  }
  
  if(p1.pX + p1.pWidth/2 >= width){
    p1.pX = p1.pX - 5;
  }
  if(p1.pX - p1.pWidth/2 <= 0){
    p1.pX = p1.pX + 5;
  }
  
}/////close gravity

////////player1
function player1(){
  //image(mario,p1.pX,p1.pY,p1.pWidth,p1.pHeight);//original still image for mario for p1
  if(lookingRight == true){
    //walking to the right
    lookingLeft = false;
    step += 1;
    if(step == 0){
      image(marioRight1, p1.pX, p1.pY, p1.pWidth, p1.pHeight);
    }
    else if(step == 1){
      image(marioRight1, p1.pX, p1.pY, p1.pWidth, p1.pHeight);
    }
    else if(step == 2){
      image(marioRight1, p1.pX, p1.pY, p1.pWidth, p1.pHeight);
    }
    else if(step == 3){
      image(marioRight2, p1.pX, p1.pY, p1.pWidth, p1.pHeight);
    }
    else if(step == 4){
      image(marioRight2, p1.pX, p1.pY, p1.pWidth, p1.pHeight);
    }
    else if(step == 5){
      image(marioRight2, p1.pX, p1.pY, p1.pWidth, p1.pHeight);
      step = 0;
    }
  }
  if(lookingLeft == true){
    //walking to the left
    lookingRight = false;
    step += 1;
    if(step == 0){
      image(marioLeft1, p1.pX, p1.pY, p1.pWidth, p1.pHeight);
    }
    else if(step == 1){
      image(marioLeft1, p1.pX, p1.pY, p1.pWidth, p1.pHeight);
    }
    else if(step == 2){
      image(marioLeft1, p1.pX, p1.pY, p1.pWidth, p1.pHeight);
    }
    else if(step == 3){
      image(marioLeft2, p1.pX, p1.pY, p1.pWidth, p1.pHeight);
    }
    else if(step == 4){
      image(marioLeft2, p1.pX, p1.pY, p1.pWidth, p1.pHeight);
    }
    else if(step == 5){
      image(marioLeft2, p1.pX, p1.pY, p1.pWidth, p1.pHeight);
      step = 0;
    }
  }
  if(lookingRight == false && lookingLeft == false && jump == false){
    image(marioRight1, p1.pX, p1.pY, p1.pWidth, p1.pHeight);//not walking and jumping
  }
  else if(lookingRight == false && lookingLeft == false && jump == true){
    image(marioJump, p1.pX, p1.pY, p1.pWidth, p1.pHeight);
  }
}//close player1



function coinLoad(coin,c){
  image(coin,c.cX,c.cY,c.cWidth,c.cHeight);
}

function coinHit(p,c,score,coinSound){
  if(p.pX >= c.cX - c.cWidth/2 && p.pX <= c.cX + c.cWidth/2 && p.pY >= c.cY - c.cHeight/2 && p.pY <= c.cY + c.cHeight/2){
    //mario hits coin
    score += 1;
    c.cX = -1000; // move coin off screen
    coinSound.play();
  }
  return score;
}

function boxLoad(platform, b){
  image(platform,b.bX,b.bY,b.bWidth,b.bHeight);
}

function boxHit(p,b){
  if(p.pX >= b.bX - b.bWidth/2 && p.pX <= b.bX + b.bWidth/2 && p.pY+p.pHeight/2 >= b.bY - b.bHeight/2 && p.pY+p.pHeight/2 <= b.bY + b.bHeight/2 && jump == false){
    p.pY = p.pY;
    velocity = 0;
    jumpCounter = 0;
  }
}

function goombaLoad(goomba, g){
  image(goomba,g.gX,g.gY,g.gWidth,g.gHeight);
}

function goombaHit(p,g,lives,lifeSound){
  if(p.pX >= g.gX-g.gWidth/2 && p.pX <= g.gX + g.gWidth/2 && p.pY >= g.gY - g.gHeight/2 && p.pY <= g.gY + g.gHeight/2){
    if(up == false){
      //hitting goomba
      lives-=1;
      p.pX = 400;//we go back to start position
      p.pY = 375;
      lifeSound.play();
    }
    else if(up == true){
      coinSound.play();
      g.gX = -1000;
    }
  }
  return lives;
}

function goombaMove(g){
  g.gX = g.gX + (g.gSpeed*g.gDirection);
  if(g.gX >= g.gPosition + g.gDistance || g.gX <= g.gPosition - g.gDistance){
    //exceed distance allowance
    g.gDirection = g.gDirection * -1;
  }
}

function wallHit(p,b,w){
  if(p.pX >= b.bX - b.bWidth/2 && p.pX <= b.bX + b.bWidth/2 && p.pY >= w.wY - w.wHeight && p.pY <= w.wY + w.wHeight){
    velocity = fallingSpeed;//make mario fall
    jumpCounter = jumpPower; // mario has no more jump energy
  }
}

function newGameStart(){
  c1 = new Coin(600,410,20,30);
  c2 = new Coin(600,240,20,30);
  c3 = new Coin(500,90,20,30);
  c4 = new Coin(200,240,20,30);
  c5 = new Coin(220,230,20,30);
  c6 = new Coin(320,240,20,30);
  c7 = new Coin(420,190,20,30);
  c8 = new Coin(180,90,20,30);
  c9 = new Coin(220,90,20,30);
  c10 = new Coin(600,90,20,30);
  p1 = new Player(400,375,50,100,5);
  b1 = new Box(200,300,200,40);
  b2 = new Box(600,300,200,40);
  b3 = new Box(500,150,200,40);
  b4 = new Box(200,300,200,40);
  b5 = new Box(470,250,200,40);
  b6 = new Box(200,150,200,40);
  b7 = new Box(600,150,200,40);
  //gX,gY,gWidth,gHeight,gPosition,gSpeed,gDirection,gDistance
  g1 = new Goomba(200,400,50,70,200,2,-1,150);
  g2 = new Goomba(550,100,50,70,550,2,1,50);
  g3 = new Goomba(600,400,50,70,600,2,1,100);
  g4 = new Goomba(200,240,50,70,200,2,-1,50);
  g5 = new Goomba(600,90,50,70,600,2,1,50);
  
  u1 = new Powerup(120,240,40,40);
  up = false;
}



function keyPressed(){
  if(keyIsDown(LEFT_ARROW)){
    p1.pX = p1.pX - p1.pSpeed;
    lookingLeft = true;
  }
  else{
    lookingLeft = false;
  }
  if(keyIsDown(RIGHT_ARROW)){
    p1.pX = p1.pX + p1.pSpeed;
    lookingRight = true;
  }
  else{
    lookingRight = false;
  }
}


function keyTyped(){
  if(keyIsDown(65)){
    jump = true;
  }
  else{
    jump = false
  }
}

function preload(){
  mario = loadImage('8bit_Mario.png');
  marioLeft1 = loadImage('Mario frames/mario_left_1.png');
  marioLeft2 = loadImage('Mario frames/mario_left_2.png')
  marioRight1 = loadImage('Mario frames/mario_right_1.png')
  marioRight2 = loadImage('Mario frames/mario_right_2.png')
  marioJump = loadImage('Mario frames/mario_jump_right.png')
  platform = loadImage('mario_bricks.jpeg');
  landscape = loadImage('supermario_background.jpg');
  jumpSound = loadSound('Mario-jump-sound.mp3');
  marioFont = loadFont('smbfont.ttf');
  coin = loadImage('mario_coin.png');
  coinSound = loadSound('mario_coin_sound.mp3');
  goomba = loadImage('mario_goomba.png');
  lifeSound = loadSound('mario_lost_life.mp3');
  loseSound = loadSound('game_over.mp3');
  winSound = loadSound('Stage Win.mp3');
  backgroundMusic = loadSound('mario_theme.mp3');
  powerup = loadImage('mario_powerup.png');
}