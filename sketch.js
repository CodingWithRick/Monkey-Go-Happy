
var monkey , monkey_running, monkeyImg;
var banana ,bananaImage,bananaGroup, obstacleGroup, obstacle, obstacleImage;
var FoodGroup, obstacleGroup;
var score = 0, survivalTime = 0, ground, gameState="PLAY";

function preload(){
  
  monkeyImg = loadAnimation("sprite_0.png")
  monkey_running =            loadAnimation("sprite_0.png","sprite_1.png","sprite_2.png","sprite_3.png","sprite_4.png","sprite_5.png","sprite_6.png","sprite_7.png","sprite_8.png")
  
  bananaImage = loadImage("banana.png");
  obstacleImage = loadImage("obstacle.png");
 
}


                                 
function setup() {                       
  monkey = createSprite(80, 315, 20, 20);
  monkey.addAnimation("running", monkey_running);
  monkey.addAnimation("stop", monkeyImg);
  monkey.scale = 0.1;
  ground = createSprite(400, 350, 900, 20);
  ground.velocityX = -4;
  bananaGroup = new Group();
  obstacleGroup = new Group();
  
}


function draw() {
  background(225);
  if(gameState==="PLAY"){
      if(ground.x < 0){
    ground.x = ground.width/2;
  }
  spawnBanana();  
  spawnObstacles();
  
  monkey.collide(ground);
  if(keyDown("space") && monkey.y >= 309.3){
    monkey.velocityY = -12;
  }
  if(bananaGroup.isTouching(monkey)){
    score = score + 1;
    bananaGroup.destroyEach();
  }
  survivalTime = Math.ceil(frameCount/frameRate());
    
  if(obstacleGroup.isTouching(monkey)){
    bananaGroup.setVelocityXEach(0);
    obstacleGroup.setVelocityXEach(0);
    obstacleGroup.setLifetimeEach(-1);
    bananaGroup.setLifetimeEach(-1);
    ground.velocityX = 0;
    gameState = "END";
    
  }
    
  monkey.velocityY = monkey.velocityY + 0.5;
  }

  
 
  if(gameState==="END"){
    score = 0;
    survivalTime = 0;
    monkey.changeAnimation("stop", monkeyImg);
  }
  monkey.collide(ground);
  drawSprites();
  fill("black");
  text("Score: " + score, 300, 50);
  text("Survival Time: " + survivalTime, 50, 50);
}

function spawnBanana(){
  if(frameCount % 80 === 0){
    banana = createSprite(400, Math.round(random(180, 220)), 10, 10);
    banana.scale = 0.05;
    banana.addImage(bananaImage); 
    banana.velocityX = -2;
    banana.lifetime = 200;
    bananaGroup.add(banana);
  }
}
function spawnObstacles(){
  if(frameCount % 300 === 0){
    obstacle = createSprite(400, 310, 20, 20);
    obstacle.addImage(obstacleImage);
    obstacle.velocityX = -2;
    obstacle.lifetime = 200;
    obstacle.scale = 0.20;
    obstacleGroup.add(obstacle);
  }
}







