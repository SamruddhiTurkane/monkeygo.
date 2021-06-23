
var PLAY = 1;
var END = 0;
var gameState = PLAY;

var monkey , monkey_running;
  var banana ,bananaImage, obstacle, obstacleImage;
  var bananaGroup, obstacleGroup;
  var score,ground,invisibleGround;
  var survivalTime;

  function preload(){

      monkey_running =            loadAnimation("sprite_0.png","sprite_1.png","sprite_2.png","sprite_3.png","sprite_4.png","sprite_5.png","sprite_6.png","sprite_7.png","sprite_8.png")

    bananaImage = loadImage("banana.png");
    obstacleImage = loadImage("obstacle.png");

    bananaGroup = new Group();
    obstaclesGroup = new Group();
  }

  function setup() {
    createCanvas(670,420);
    score  = 0;
    survivalTime = 0;

    monkey = createSprite(90,370,10,10);
    monkey.addAnimation("monkeyrunning",monkey_running);
    monkey.scale = 0.1;

    ground = createSprite(0,400,1500,10);
      
    invisibleGround = createSprite(0,400,400,10);
    invisibleGround.visible = false ;
      
    monkey.setCollider("circle",0,0,330);
    monkey.debug = true
  
  }

  function draw() {
  background("green");

     if(gameState === PLAY){
       
        
      
    if(keyDown("space")&&monkey.y >= 200){
      monkey.velocityY = -10;
    }
  
    monkey.velocityY = monkey.velocityY + 0.3;
    monkey.collide(ground);

    ground.velocityx = -7
    ground.x = ground.width/2;

  if(World.frameCount%200===0){
    fruits()
  }

   if(World.frameCount%300===0){
    stones()
  }

    if(monkey.isTouching(bananaGroup)){
      bananaGroup.destroyEach();
      score = score + 1
  }
       if(obstaclesGroup.isTouching(monkey)){
         gameState = END;
         
       }
     }
    else if (gameState === END) {
     
      fill("red");
      text("GAME OVER",300,210);
      
      ground.velocityX = 0;
      monkey.velocityY = 0
      
      obstaclesGroup.setLifetimeEach(-1);
      bananaGroup.setLifetimeEach(-1);
     
     obstaclesGroup.setVelocityXEach(0);
     bananaGroup.setVelocityXEach(0);
    
    }
   
    
    monkey.collide(invisibleGround);
    
    drawSprites()

    fill("white")
    text("SCORE : "+score,500,50);

    fill("black");
    var survivalTime = Math.round(frameCount/frameRate());
    text("SURVIVAL TIME : "+survivalTime,350,50)
  }

  function fruits(){
    banana = createSprite(670,Math.round(random(170,230)),10,10)
    banana.addImage(bananaImage)
    banana.scale = 0.1
    banana.velocityX = -3
    banana.lifetime = 223;
    bananaGroup.add(banana)
  }

  function stones(){
    obstacle = createSprite(670,360,10,10)
    obstacle.addImage(obstacleImage)
    obstacle.velocityX = -4
    obstacle.lifetime = 167;
    obstacle.scale = 0.2
    obstaclesGroup.add(obstacle)
  }



