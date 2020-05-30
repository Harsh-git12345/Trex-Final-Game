var trex_running,trex,trex_collided
var ground,iground,groundimage;
var cloud, cloudimage, cloudsgroup;
var obsatcle, ob1, ob2, ob3,ob4, ob5, ob6;
var obstacleGroup;
var count=0;
var PLAY = 1;
var END = 0;
var gameState = PLAY;
var gameover,gameoveri,restart,restarti;
var highscore=0,x=0
var hit,jump,score
function preload(){
  trex_running=loadAnimation("trex1.png","trex3.png","trex4.png");
  groundimage=loadImage("ground2.png")
  cloudimage=loadImage("cloud.png")
  trex_collided=loadAnimation("trex_collided.png");
  ob1=loadImage("obstacle1.png")
  ob2=loadImage("obstacle2.png")
  ob3=loadImage("obstacle3.png")
  ob4=loadImage("obstacle4.png")
  ob5=loadImage("obstacle5.png")
  ob6=loadImage("obstacle6.png")
  gameoveri=loadImage("gameOver.png")
  restarti=loadImage("restart.png")
  hit=loadSound("die.mp3")
  jump=loadSound("jump.mp3")
  score=loadSound("checkPoint.mp3")
  } 
function setup() {
  createCanvas(600, 200);
  trex=createSprite(50, 180, 20, 50);
  trex.addAnimation("running",trex_running);
  trex.scale=0.5;
  trex.addAnimation("collided",trex_collided);
  ground=createSprite(300, 180, 600, 20);
  ground.addImage("ground", groundimage)
  ground.velocityX=-6
  iground=createSprite(300, 190,600,20);
  iground.visible=false;
  cloudsGroup=new Group();
  obstacleGroup=new Group();
  gameover = createSprite(300, 100);
  gameover.addImage("gameover",gameoveri);
  gameover.scale = 0.5;
  gameover.visible = false;
  restart = createSprite(300, 150);
  restart.addImage("restart",restarti);
  restart.scale = 0.75;
  restart.visible = false;
}

function draw() {
  background(150);
  if(gameState==PLAY){
  trex.velocityY = trex.velocityY + 0.8;
  trex.collide(iground);
  spawnClouds();
  spawnObstacles();
    if(ground.x<0){
    ground.x=600;
     }
if (frameCount%5==0) {
  count = count+1;
  if (count%50==0&&count>0) {
    ground.velocityX = ground.velocityX-1;
    score.play();
  }
  
}
  if(keyDown("up") && trex.y >= 100){
  trex.velocityY = -12 ;
  jump.play();
}
  if(obstacleGroup.isTouching(trex)){
  gameState = END;
  hit.play();
}
  }
  else if(gameState==END){
    trex.changeAnimation("collided",trex_collided);
    trex.velocityY = 0;
    ground.velocityX = 0;
    obstacleGroup.setLifetimeEach(-1);
    obstacleGroup.setVelocityXEach(0);
    cloudsGroup.setVelocityXEach(0);
    cloudsGroup.setLifetimeEach(-1);
    gameover.visible = true;
    restart.visible = true;
    if (mousePressedOver(restart)) {
      reset();
    }
  }
  text("Score: "+ count, 500, 50);
  if (x==1) {
  text("HI"+ highscore, 500, 80);
}
  drawSprites();
}

function spawnClouds() {
  //write code here to spawn the clouds
  if (frameCount % 120 === 0) {
    var cloud = createSprite(600,120,40,10);
    cloud.y = Math.round(random(80,120));
    cloud.addImage("cloud",cloudimage);
    cloud.scale = 0.5;
    cloud.velocityX = -3;
    
     //assign lifetime to the variable
    cloud.lifetime = 234;
    
    //adjust the depth
    cloud.depth = trex.depth;
    trex.depth = trex.depth + 1;
    
    //add each cloud to the group
    cloudsGroup.add(cloud);
  }
  
}
function spawnObstacles() {
  if(frameCount % 60 === 0) {
    obstacle = createSprite(600,165,10,40);
    obstacle.velocityX = ground.velocityX
    
    //generate random obstacles
    var rand = Math.round(random(1,6));
    //obstacle.setAnimation("obstacle" + rand);
    switch(rand){
      case 1:obstacle.addImage(ob1)
      break;
      case 2:obstacle.addImage(ob2)
      break;
      case 3:obstacle.addImage(ob3)
      break;
      case 4:obstacle.addImage(ob4)
      break;
      case 5:obstacle.addImage(ob5)
      break;
      case 6:obstacle.addImage(ob6)
      break;
      
    }
    //assign scale and lifetime to the obstacle           
    obstacle.scale = 0.5;
    obstacle.lifetime = 600;
    //add each obstacle to the group
    obstacleGroup.add(obstacle);
  }
}
function reset() {
  if (highscore<count) {
    highscore =count ;
  }
  count = 0;
  gameState = PLAY;
  obstacleGroup.destroyEach();
  cloudsGroup.destroyEach();
  trex.changeAnimation("running",trex_running);
  restart.visible = false;
  gameover.visible = false;
  x = 1;
  //y = 0;
  //TREX2.x = 400;
  //TREX2.visible = false;
  ground.velocityX = -5;
}
