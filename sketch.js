var dog, dogImg, happydogImg, foodS, foodStock, database;

function preload()
{
  dogImg = loadImage("dogImg.png");
  happydogImg = loadImage("dogImg1.png");
}

function setup() {
	createCanvas(500,500);
  database = firebase.database();
  foodStock = database.ref('food');
  foodStock.on("value", readStock);
  foodStock.set(20);

  dog = createSprite(265,300,10,60);
  dog.addImage(dogImg);
  dog.scale = 0.2;
}


function draw() {  
 background("#339966");

  if(foodS!==undefined){
    textSize(20.5);
    fill(202, 227, 205);
    text("NOTE: Press UP ARROW To Feed Drago Milk",35,50);
    text("Food Remaining: " +foodS, 125, 150);
  }

  if(keyWentDown(UP_ARROW)){
    dog.addImage(happydogImg);
    writeStock(foodS);
  }

  if(keyWentUp(UP_ARROW)){
  dog.addImage(dogImg);
  }

  if(foodS === 0){
    foodS = 20;
  }


  drawSprites();
}
function writeStock(x){
  if(x<=0){
    x=0;
  }else{
    x=x-1;
  }

  database.ref('/').update({
    food:x
  })
}
function readStock(data){
  foodS = data.val();
}




