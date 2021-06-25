var PLAY = 1;
var END = 0;
var gameState = PLAY;

var backgroundImg,obstacleImg,particleImg,playerImg;
var player,obstacle,particle;

var score=0;

var gameOver, restart;

var particlesGroup,obstaclesGroup;

localStorage["HighestScore"] = 0;


function preload(){
  
  obstacle = loadImage("images/Obstacle.png");

  playerImg = loadImage("images/Player.png");
  backgroundImg = loadImage("images/Background.png");
  particleImg = loadImage("images/Particle.png");

}

function setup() {
  createCanvas(600, 400);

 
  
  player = createSprite(150,180,20,50);
  player.addImage(playerImg);
  player.scale = 0.1;

  particlesGroup = new Group();
  obstaclesGroup = new Group();


  
 
  
  
}

function draw() {
    background(220);
    text("Score: "+ score, 500,50);

    if (gameState===PLAY){
      score = score + Math.round(getFrameRate()/50);
    
      if(keyDown(UP_ARROW)) {
        player.velocityY = -10;
      }
      if(keyDown(DOWN_ARROW)) {
        player.velocityY = 10;
      }

      spawnObstacles();
      spawnPartiles();
    
      if(obstaclesGroup.isTouching(player)){
          gameState = END;
      }
    }
    else if (gameState === END) {
      gameOver.visible = true;
      restart.visible = true;
      
      //set velcity of each game object to 0
      ground.velocityX = 0;
      player.velocityY = 0;
      obstaclesGroup.setVelocityXEach(0);
      particlessGroup.setVelocityXEach(0);
      
      //set lifetime of the game objects so that they are never destroyed
      obstaclesGroup.setLifetimeEach(-1);
      particlesGroup.setLifetimeEach(-1);
      
      if(mousePressedOver(restart)) {
        reset();
      }
    }
  drawSprites();
}

