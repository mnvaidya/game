let group;
let ball;
let spr;
let score=0;
let speed=3;

let walltop;
let side1;
let side2;

function setup(){
  createCanvas(650,450);
  angleMode(DEGREES);
  textSize(18);
  spr=createSprite(width/2, height-20, 80,12);
  spr.shapeColor=color('black');
  spr.immovable=true;
  spr.mouseActive=true;

  ball= createSprite(width/2, height-30, 9,9);
  ball.shapeColor=color('red');
  ball.velocity.x=random(-2.5, 2.5);
  ball.velocity.y=speed;

  group= new Group();
  let  y=50;
  for(var i=0; i<7;i++){
    let x=50;
    for(var j=0; j<10;j++){
      let spr= createSprite(x,y, 50,20);
      spr.shapeColor= color('white');
      spr.immovable= true;
      group.add(spr);
      x+=60;
    }
    y+=25;
  }

  walltop= createSprite(width/2, -10, width, 20);
  walltop.immovable=true;
  side1= createSprite(-10, height/2, 20, height);
  side1.immovable=true;
  side2= createSprite(width+10, height/2, 20, height);
  side2.immovable=true;


}

function draw(){
  background(100);
  speed+=0.0033;

  ball.bounce(group, disappear);
  ball.bounce(walltop);
  ball.bounce(side1);
  ball.bounce(side2);

  var change=random(-0.9, -1.35)*ball.getDirection();
  if(ball.bounce(spr) || ball.bounce(group)){
    ball.setSpeed(speed, change);
  }
  
  spr.position.x= constrain(mouseX, 40, width-40);

  text('Score: '+score, width-80, 20 );
  if(score==70) {
    text('YouWin!!', width/2, height/2);
  }

  drawSprites();

  if(ball.position.y>height+30){
    ball.remove();
    textSize(30);
    text('Game Over', width/2-80, height/2);
    noLoop();
  }
}

function disappear(ball, group){
  group.remove();
  score++;
}
