var bg,bgImg;
var player, shooterImg, shooter_shooting;
var h1, h2, h3;
var zombie, zImg,zGroup;

var diff;
var ct;
var bullet;
var s;


function preload(){
  
  shooterImg = loadImage("assets/shooter_2.png")
  shooter_shooting = loadImage("assets/shooter_3.png")

  bgImg = loadImage("assets/bg.jpeg")
  zImg = loadImage("assets/zombie.png")

}

function setup() {
  s = 3;
  
  h1 = createImage("assets/heart_1")
  h1.setPosition(windowWidth/2,windowHeight/10)
  h1.scale = 0.1
  h1.visible = false

  h2 = createImage("assets/heart_2")
  h2.setPosition(windowWidth/2,windowHeight/10)
  h2.scale = 0.1
  h2.visible = false

  h3 = createImage("assets/heart_3")
  h3.setPosition(windowWidth/2,windowHeight/10)
  h3.scale = 0.1

  zGroup = new Group()
  
  createCanvas(windowWidth,windowHeight);

  //adding the background image
  bg = createSprite(displayWidth/2-20,displayHeight/2-40,20,20)
bg.addImage(bgImg)
bg.scale = 1.1
  
imageMode(CENTER)

//creating the player sprite
player = createSprite(displayWidth-1150, displayHeight-300, 50, 50);
 player.addImage(shooterImg)
   player.scale = 0.3
   player.debug = false


}

function draw() {
  background(0); 




  //moving the player up and down and making the game mobile compatible using touches
if(keyDown("UP_ARROW")||touches.length>0){
  player.y = player.y-30
}
if(keyDown("DOWN_ARROW")||touches.length>0){
 player.y = player.y+30
}


//release bullets and change the image of shooter to shooting position when space is pressed
if(keyWentDown("space")){
 
  player.addImage(shooter_shooting)

  bullet = createImage("assets/heart_1.png")
  bullet.setPosition(player.x + 80,player.y + 10)
  bullet.scale = 0.006
  bullet.velocityX = 2

  for(var i =0; i<zGroup.length; i++){
    if(bullet.collide(zGroup[i])){
      zGroup[i].destroy()
      bullet.destroy()
    }
  }
//player goes back to original standing image once we stop pressing the space bar
}else if(keyWentUp("space")){
  player.addImage(shooterImg)
}

setTimeout(() => {
  ct += 1;
  s += 0.25;
  if(ct % 30 === 0){
    if(ct === 0){
      diff = 1
    }else{
      diff += 1
    }
  }
  zSpawn(diff)
},2000)

drawSprites();

}

function zSpawn(num){
  for(var i = 0;i<num; i++){
    zombie = createSprite((displayWidth/8)*7, random(displayHeight/4,(displayHeight/4)*3),50,50)
    zombie.addImage("z",zImg)
    zGroup.add(zombie)
    zombie.velocityX = -s;
  } 
}


