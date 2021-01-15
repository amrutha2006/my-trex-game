 var trex,trexrun,trexcollided 
 var cactusgroup
 var ground,groundimage
 var invisibleground
 var cloudimage
 var PLAY=0;
 var END=1;
 var gamestate=0;
 
 function preload(){
   trexrun=loadAnimation("trex1.png","trex3.png","trex4.png");
   groundimage=loadImage("ground2.png");
   trexcollided=loadImage("trex_collided.png");
   cloudimage=loadImage("cloud.png");
   
   cactus1=loadImage("obstacle1.png");
    cactus2=loadImage("obstacle2.png");
    cactus3=loadImage("obstacle3.png");
    cactus4=loadImage("obstacle4.png");
    cactus5=loadImage("obstacle5.png");
    cactus6=loadImage("obstacle6.png");
   
   gameoverimage=loadImage("gameOver.png");
   restartimage=loadImage("restart.png");
 }

function setup() {
  createCanvas(900, 300);
  
  trex=createSprite(60,height-10,30,30);
  trex.addAnimation("run",trexrun);
  trex.scale=0.7;
  
  ground=createSprite(width/2,height-10,width,10);
  ground.addImage(groundimage);
  
  invisibleground=createSprite(width/2,height-5,width,10);
  invisibleground.visible=false;
  
  cactusgroup=new Group();
  cloudgroup=new Group();
  
  gameover=createSprite(450,50,30,30);
  gameover.addImage(gameoverimage);
  gameover.scale=0.7;
  
  restart=createSprite(450,100,20,20);
  restart.addImage(restartimage);
  restart.scale=0.5;
  
  score=0;
}

function draw() {
  background("cadetblue" );
  
  if(gamestate==0){
    ground.velocityX=-5;
   
    if(ground.x<0){
     ground.x=ground.width/2; 
    }  
    
    if(keyDown("space") && trex.y>257){
      trex.velocityY=-10;
    }  
   // console.log(trex.y);
   trex.velocityY=trex.velocityY+0.3  ;
  
  spawncactus();
  spawncloud();
  
    if(trex.isTouching(cactusgroup)){
      gamestate=1;
    }
    
    restart.visible=false;
    gameover.visible=false;
    
    score=score+Math.round(getFrameRate()/60);
    
  }
  
  if(gamestate==1){
    ground.velocityX=0;
    cactusgroup.setVelocityXEach(0);
    cloudgroup.setVelocityXEach(0);
    cactusgroup.setLifetimeEach(-1);
    cloudgroup.setLifetimeEach(-1);
    trex.pause();
    
    restart.visible=true;
    gameover.visible=true;
    
    if(mousePressedOver(restart)){
      reset();
    }
  } 
  trex.collide(invisibleground);
           
  fill("white");
  text("score"+score,400,30);
  
  
  drawSprites();
}
  
  function spawncloud(){
    if(frameCount%100===0){
      var clouds=createSprite(900,random(0,150),10,10);
      clouds.velocityX=-5;
      clouds.addImage(cloudimage);
      clouds.lifetime=300;
      cloudgroup.add(clouds);
     
    }
  }  
  
 function spawncactus(){
   if(frameCount%80===0){
     var cactus=createSprite(900,260,10,10);
     cactus.velocityX=-5;
     cactus.lifetime=300;
     cactusgroup.add(cactus);
     var num=Math.round(random(1,6));
     
     switch(num){
       case 1:cactus.addImage(cactus1);
         break;
       case 2:cactus.addImage(cactus2);
         break;
       case 3:cactus.addImage(cactus3);
         break;
       case 4:cactus.addImage(cactus4);
         break;
       case 5:cactus.addImage(cactus5);
         break;
       case 6:cactus.addImage(cactus6);
         break;
        default:break;
     }
     
   }
 }
    function reset(){
      score=0;
      gamestate=0;
      cactusgroup.destroyEach();
      cloudgroup.destroyEach();
      trex.play();
    }
  
