const Engine = Matter.Engine;
const Render = Matter.Render;
const World = Matter.World;
const Bodies = Matter.Bodies;
const Constraint = Matter.Constraint;
const Body = Matter.Body;
const Composites = Matter.Composites;
const Composite = Matter.Composite;


let engine;
let world;
var plank;
var ground;
var ceiling;

var link;
var link2;

var rope;

var balloon
var star,starimg

var bubble,bubble_img;

var score = 0

function preload()
{
  bubble_img = loadImage("bubble.png")
  bg_img = loadImage('background.png');
  food = loadImage('melon.png');
  rabbit = loadImage('Rabbit-01.png');

  blink = loadAnimation("blink_1.png","blink_2.png","blink_3.png");
  eat = loadAnimation("eat_0.png" , "eat_1.png","eat_2.png","eat_3.png","eat_4.png");
  sad = loadAnimation("sad_1.png","sad_2.png","sad_3.png");
  star_img = loadImage('star.png');
  
  blink.playing = true;
  eat.playing = true;
  sad.playing = true;
  sad.looping= false;
  eat.looping = false; 
}

function setup() {
  createCanvas(500,800);
  frameRate(80);
  engine = Engine.create();
  world = engine.world;

   var fruit_options = {
    restitution: 0.8
  }
  
  ground =new Ground(250,height-10,width,20);
  fruit = Bodies.circle(100,400,15,fruit_options);
  World.add(world,fruit);

  star = createSprite(150,275,20,20);
  star.addImage(star_img);
  star.scale = 0.02;
  
  bubble = createSprite(330,565,20,20);
  bubble.addImage(bubble_img);
  bubble.scale = 0.1;

  balloon = createImg('balloon.png')
  balloon.position(350,250)
  balloon.size(150,100)
  balloon.mouseClicked(ablow)
  
  //bunny sprite
  blink.frameDelay = 20;
  eat.frameDelay = 20;
  bunny = createSprite(150,100,100,100);
  bunny.addImage(rabbit)
  bunny.scale = 0.2;
  ceiling =new Ground(110,170,100,10);

  bunny.addAnimation('blinking',blink);
  bunny.addAnimation('eating',eat);
  bunny.addAnimation('crying',sad);
  bunny.changeAnimation('blinking');

  rope = new Rope(4,{x:280,y:420});
  rope2 = new Rope(4,{x:40,y:510});
  link = new Link(rope,fruit);
  link2 = new Link(rope2,fruit);

  //btn 1
  button = createImg('cut_btn.png');
  button.position(250,400);
  button.size(50,50);

  //btn2
  button2 = createImg('cut_btn.png');
  button2.position(30,490);
  button2.size(50,50);

  button.mouseClicked(drop)
  button2.mouseClicked(drop2);
  
  ellipseMode(RADIUS);
}

function draw() 
{
  background(51);
  image(bg_img,0,0,width,height);
  Engine.update(engine);
  
  push();
  imageMode(CENTER);
  if(fruit!=null){
    image(food,fruit.position.x,fruit.position.y,70,70);
  }
  pop();

  ground.show();
  ceiling.show();
  rope.show();
  rope2.show();


  if(collide(fruit,bunny,80))
  {
    bubble.visible = false;
    World.remove(engine.world,fruit);
    fruit = null;
    bunny.changeAnimation('eating');
  }
  
  if(collide(fruit,bubble,40))
    {
      engine.world.gravity.y = -1;
      bubble.position.x = fruit.position.x;
      bubble.position.y = fruit.position.y;
    }

    if(collide(fruit,star,40) && frameCount>50)
    {
     star.visible = false
     score=1    
    }

  textSize(30);
  fill("red");
  text("Score: 1/"+ score,10,30);

  drawSprites();
}

function drop()
{
  rope.break();
  link.dettach();
  link = null; 
}

function drop2()
{
  rope2.break();
  link2.dettach();
  link2 = null; 
}

function ablow(){
  Matter.Body.applyForce(fruit,{x:0,y:0},{x:-0.01,y:0})
  
  }

function collide(body,sprite,x)
{
  if(body!=null)
        {
         var d = dist(body.position.x,body.position.y,sprite.position.x,sprite.position.y);
          if(d<=x)
            {
              
               return true; 
            }
            else{
              return false;
            }
         }
}