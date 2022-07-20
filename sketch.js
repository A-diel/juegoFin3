var bg,bgImg;
var player, shooterImg, shooter_shooting;
var zombie, zombieImg;

var heart1, heart2, heart3;
var heart1Img, heart2Img, heart3Img;

var bullet;
var bullets = 70;
var bulletImg;
var bulletGroup;

var zombieGroup;
var life=3;
var score=0;
var gameState = "fight";

var lose, winning, explosionSound;


function preload(){
  
  heart1Img = loadImage("assets/heart_1.png")
  heart2Img = loadImage("assets/heart_2.png")
  heart3Img = loadImage("assets/heart_3.png")
  bulletImg = loadImage("assets/bullet1.png")

  shooterImg = loadImage("assets/shooter_2.png")
  shooter_shooting = loadImage("assets/shooter_3.png")

  zombieImg = loadImage("ghost-jumping.png")

  bgImg = loadImage("assets/bg.jpeg")

  lose = loadSound("assets/lose.mp3")
  win = loadSound("assets/win.mp3")
  explosionSound = loadSound ("assets/explosion.mp3")


}

function setup() {

  
  createCanvas(windowWidth,windowHeight);

  // Agregando la imagen de fondo
  bg = createSprite(displayWidth/2-20,displayHeight/2-40,20,20)
bg.addImage(bgImg)
bg.scale = 1.1
  

// Creando el sprite del jugador
   player = createSprite(displayWidth-1150, displayHeight-300, 50, 50);
   player.addImage(shooterImg)
   player.scale = 0.3
   player.debug = true
   player.setCollider("rectangle",0,0,300,300)


   // Creando sprites para representar la vida restante
    heart1 = createSprite(displayWidth-150,40,20,20)
    heart1.visible = false
    heart1.addImage("heart1",heart1Img)
    heart1.scale = 0.4

    heart2 = createSprite(displayWidth-100,40,20,20)
    heart2.visible = false
    heart2.addImage("heart2",heart2Img)
    heart2.scale = 0.4

    heart3 = createSprite(displayWidth-150,40,20,20)
    heart3.addImage("heart3",heart3Img)
    heart3.scale = 0.4
   
       

    // Creando un grupo para zombis
    zombieGroup = new Group();
    bulletGroup = new Group();
}

function draw() {
  background(0); 
  if (gameState === "fight"){
  if(life===3){  
    heart3.visible = true 
    heart2.visible = false 
    heart1.visible = false
   }
   if(life===2){ 
    heart3.visible = false 
    heart2.visible = true 
    heart1.visible = false
   }
   if(life===1){ 
    heart3.visible = false 
    heart2.visible = false 
    heart1.visible = true
   }
   if(life===0){ 
    heart3.visible = false 
    heart2.visible = false 
    heart1.visible = false
    player.destroy();
    gameState = "lost"
   }

if (score === 100 ){
  gameState = "won"
  winning.play();
}

  // Moviendo al jugador arriba y abajo y haciendo al juego compatible con dispositivos móviles a través de entrada táctil
if(keyDown("UP_ARROW")||touches.length>0){
  player.y = player.y-30
}
if(keyDown("DOWN_ARROW")||touches.length>0){
 player.y = player.y+30
}
 }

// Liberar balas y cambiar la imagen del tirador a posición de disparo cuando se presiona la barra espaciadora
if(keyWentDown("space")){
  bullet= createSprite(150, width/2, 50,20);
  bullet.scale=0.12;
  bullet.velocityX= 7;
  bulletGroup.add(bullet);
  player.addImage(shooter_shooting);
 player.depth = bullet.depth;
 player.depth = player.depth + 2;
 bullets = bullets-1;
 explosionSound = play();
// no pero las balas no salen se pone la pantalla negra 
}

// El jugador regresa a la posición original de pie una vez que se deja de precionar la barra espaciadora
else if(keyDown("space")){
  player.addImage(shooterImg)
}
if (bullets==0 ){
gameState = "bullet";
lose.play();
}

/*if(zombieGroup.collide(bulletGroup)){
  handleBubbleCollision(blueBubbleGroup);
}*/

if(zombieGroup.isTouching(bulletGroup)){
 

  for(var i=0;i<zombieGroup.length;i++){     
       
   if(zombieGroup[i].isTouching(bulletGroup)){
        zombieGroup[i].destroy();
        bulletGroup.destroyEach();
        explosionSound.play();
        score = score + 2;
        } 
  }
 }

// Destruye al zombi una vez que el jugador lo toca
if(zombieGroup.isTouching(player)){
 lose.play();

  for(var i=0;i<zombieGroup.length;i++){     
       
   if(zombieGroup[i].isTouching(player)){
        zombieGroup[i].destroy()
        life = life -1;
        } 
  }
 }


// Llamando a la función para generar zombis
enemy();

drawSprites();
text("Vidas="+ life, displayWidth-250, displayHeight/2-280);
text("Puntuacion="+ score, displayWidth-250, displayHeight/2-250);
text("Balas="+ bullets, displayWidth-250, displayHeight/2-210);
}
if (gameState == "lost"){
  textSize(100)
  fill("red")
  text("ups perdiste 😶",500,500);
  zombieGroup.destroyEach();
  player.destroy();
}
else if (gameState== "won"){
  textSize(100)
  fill("yellow")
  text("ganaste 😁",500,500);
  zombieGroup.destroyEach();
  player.destroy();
}
else if (gameState== "fight"){
  textSize(100)
  fill("red")
  text(" 😁",500,500);
  zombieGroup.destroyEach();
  player.destroy();
}




/*function shootBullet(){
  bullet= createSprite(150, width/2, 50,20)
  bullet.addImage(bulletImg)
  bullet.scale=0.12
  bullet.velocityX= 7
  bulletGroup.add(bullet)

}*/

// Creando la función para generar zombis
function enemy(){
  if(frameCount%50===0){

    // Dando posiciónes X y Y aleatorias para que aparezca el zombi
    zombie = createSprite(random(700,900),random(400,1000),30,30)
    zombie.addImage(zombieImg)
    zombie.scale = 0.3
    zombie.velocityX = -3
    zombie.debug= true
    zombie.setCollider("rectangle",0,0,400,400)
    zombie.lifetime = 200
   zombieGroup.add(zombie)
  }

}
