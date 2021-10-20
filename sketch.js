var PLAY = 1;
var END = 0;
var gameState = PLAY;

var run, run_running ;
var ground2, invisibleGround, groundImage;

var object, objectsGroup, brickImage,coinImage;
var obstaclesGroup, obstacle1, obstacle2, obstacle3, obstacle4, obstacle5, obstacle6;

var score;


function preload(){
  run_running = loadAnimation("RUN2.jpg","RUN3.jpg","RUN4.jpg");
  run_jump    = loadImage("RUN.jpg")
  background=loadImage("MY BG.jpg")
  groundImage = loadImage("ground2.png");
  pipeImage  = loadImage("pipe.png");
  coinImage  = loadImage("Coin.png");
  brickImage = loadImage("brick.png");
  boxImage   = loadImage("box.png");
  restartImage = loadImage("restart.png");
  jump=loadSound("jump.mp3")
  checkpoint=loadSound("checkpoint.mp3")
  die=loadSound("die.mp3")
  
}

function setup() {
  createCanvas(600, 200);
  
  run = createSprite(50,180,20,50);
  run.addAnimation("running", run_running);
  run.scale = 0.10;
  run.debug=false;
  run.setCollider("rectangle",0,0,80,80)
  
  run2 = createSprite(50,180,20,50);
  run2.addAnimation("colided", run_jump);
  run2.scale = 0.10;
  run2.debug=false;
  run2.setCollider("rectangle",0,0,80,80)
  
  invisibleGround = createSprite(200,190,400,10);
  invisibleGround.visible = false;

  
  restart=createSprite(300,130,20,50);
  restart.addImage("moving",restartImage)
  restart.scale=0.5

  ground2=createSprite(200,185,400,10);
  ground2.addImage("moving",groundImage)
  ground2.scale=0.5
  // create Obstacles and Cloud groups
  obstaclesGroup = new Group();
  objectsGroup = new Group();
  
  console.log("Hello" + 5);
  
  score = 0;
}

function draw() {
  
  text("Score: "+ score, 500,50);
  
  
  if(gameState === PLAY){
    restart.visible=false;
    //move the ground
    ground2.velocityX = -(4+score/100);
    score = score + Math.round( getFrameRate()/60);
    if(keyDown("space")&& run.y >= 160) {
       run.velocityY = -15;
       run.changeImage(run_jump)
      jump.play()
    }
    
    run.velocityY = run.velocityY + 0.8
    
    if (ground2.x < 0){
        ground2.x = ground2.width/2;
    } 

    if(score%500===0&&score>0) {
      checkpoint.play()
    }
    //spawn the clouds
    spawnObjects();
  
  //spawn obstacles on the ground
    spawnObstacles();
    if(obstaclesGroup.isTouching(run)){
       gameState=END
      die.play()
   // trex.velocityY=-15
   //jump.play()
     }
  }
  
    else if(gameState === END){
    restart.visible=true;
    //stop the ground
    ground2.velocityX = 0;
    obstaclesGroup.setVelocityXEach(0)
    objectsGroup.setVelocityXEach(0)
    run.changeAnimation("collided")
    obstaclesGroup.setLifetimeEach(-1)
    objectsGroup.setLifetimeEach(-1)
    run.velocityY=0
    if(mousePressedOver(restart)){
       reset()
    }
  }
  
  
  
    run.collide(invisibleGround);
  
  
  
    drawSprites();
}
function reset (){
  gameState=PLAY
  obstaclesGroup.destroyEach()
  objectsGroup.destroyEach()
  run.changeAnimation("running")
  score=0
}
function spawnObstacles(){
  if (frameCount % 60 === 0){
    var obstacle = createSprite(600,165,10,40);
    obstacle.velocityX = -(6+score/100);

   
    // //generate random obstacles
    var rand = Math.round(random(1,2));
    switch(rand) {
      case 1: obstacle.addImage(boxImage);
              break;
      case 2: obstacle.addImage(pipeImage);
              break;
      default: break;
    }
   
    //assign scale and lifetime to the obstacle           
    obstacle.scale = 0.5;
    obstacle.lifetime = 300;
   
   //adding obstacles to the group
   obstaclesGroup.add(obstacle);
 }
}




function spawnObjects() {
  //write code here to spawn the clouds
  if (frameCount % 80 === 0){
    var object = createSprite(600,200,40,10);
    object.velocityX = -(6+score/100);

   
    // //generate random obstacles
    var act = Math.round(random(1,2));
    switch(act) {
      case 1: object.addImage(brickImage);
              break;
      case 2: object.addImage(coinImage);
              break;
      default: break;
    }
   
    //assign scale and lifetime to the obstacle           
    object.scale = 0.5;
    obect.lifetime = 134;
   
   //adding obstacles to the group
   objectsGroup.add(object);
 }
}
  
