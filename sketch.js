var monkeyi,monkey;
var scene,scenei,ground;
var obstaclei,obstacle;
var bananai,banana;
var BananasG,ObstaclesG;
var PLAY=1;
var END=0;
var invisibleGround;

var gameState=PLAY;

var score;

function preload(){
  monkeyi=loadAnimation("Monkey_01.png","Monkey_02.png","Monkey_03.png","Monkey_04.png","Monkey_05.png","Monkey_06.png","Monkey_07.png","Monkey_08.png","Monkey_09.png","Monkey_10.png");
  scenei=loadImage("jungle.jpg");
  obstaclei=loadImage("stone.png");
  bananai=loadImage("banana.png");
}

function setup() {
  createCanvas(800, 400);
  
  scene=createSprite(0,0,400,400);
  scene.addImage("jungle",scenei);
  scene.scale=1.5;
  
  ground=createSprite(200,380,1600,40);
  
  monkey=createSprite(100,370,100,80);
  monkey.addAnimation("monkey",monkeyi);
  monkey.scale=0.1;
  
  
  BananasG=new Group();
  ObstaclesG=new Group();
  
  invisibleGround = createSprite(200,390,1600,5);
  invisibleGround.visible = false;
  
  score=0;
}

function draw() {
  background(255);
    
  if(BananasG.isTouching(monkey)){
      BananasG.destroyEach();
    score = score + 2;
    }
    switch(score){
        case 10: monkey.scale=0.12;
                break;
        case 20: monkey.scale=0.14;
                break;
        case 30: monkey.scale=0.16;
                break;
        case 40: monkey.scale=0.18;
                break;
        default: break;
    }
    
     ground.velocityX = -(6 + 3*score/100);
    
    if (ground.x < 0){
      ground.x = ground.width/2;
    }
  
  scene.velocityX = -(6 + 3*score/100);
    
    if (scene.x < 0){
      scene.x = scene.width/2;
    }
    
    if(keyDown("space")){
      monkey.velocityY = -12 ;
    }
    
    monkey.velocityY = monkey.velocityY + 0.8;
  
  monkey.collide(invisibleGround);
    
    //spawn the clouds
    spawnBananas();
  
    //spawn obstacles
    spawnObstacles();
    score=score+Math.round(random(0.4,0.6))
    if(ObstaclesG.isTouching(monkey)){
      monkey.scale=0.08;
    }
    
  
  drawSprites();
   stroke("white");
  textSize(20);
  fill("white");
  text("Score: "+ score, 500,50);
 
  
}

function spawnObstacles() {
  if(frameCount % 300 === 0) {
    var obstacle = createSprite(800,350,10,40);
    obstacle.velocityX = -6;
    obstacle.addImage("stone",obstaclei);
    
    //assign scale and lifetime to the obstacle     
    obstacle.scale = 0.2;
    obstacle.lifetime = 300;
    
    //add each obstacle to the group
    ObstaclesG.add(obstacle);
  }
}

function spawnBananas() {
  //write code here to spawn the bananas
  if (frameCount % 80 === 0) {
    var banana = createSprite(600,250,40,10);
    banana.y = random(120,200);    
    banana.addImage("banana",bananai);
    banana.scale = 0.05;
    banana.velocityX = -5;
     //assign lifetime to the variable
    banana.lifetime = 300;
    monkey.depth = banana.depth + 1;
    
    //add each banana to the group
    BananasG.add(banana);
  }
  
}

