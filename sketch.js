var dog,sadDog,happyDog;
var food,foodStock,fedTime,lastFed;

function preload(){
  sadDog=loadImage("Images/Dog.png");
  happyDog=loadImage("Images/happy dog.png");
}

function setup() {
  database=firebase.database();
foodStock=database.ref('Food');
foodStock.on('value',readStock)
  createCanvas(1000,400);
  
  dog=createSprite(800,200,150,150);
  dog.addImage(sadDog);
  dog.scale=0.15;


  feed=createButton('Feed the dog');
  feed.position(700,95);
  feed.mousePressed(feedDog);
  add=createButton('Add Food');
  add.position(800,95);
  add.mousePressed(addFood);
  foodObj=new Food();

}

function draw() {
  background(46,139,87);
  foodObj.display();
  fedTime=database.ref('lastFed');
  fedTime.on('value',function(data){
    lastFed=data.val();
  })
fill('black');
textSize(30);
if(lastFed>=12){
  
  text('last Fed : '+lastFed%12+'pm',200,100);

}
else if(lastFed===0) 
{
  text('last Fed : 12am',200,100);

}
else {
  text('last Fed : '+lastFed+'am',200,100);

}
  drawSprites();
}

//function to read food Stock
function readStock(data){
food=data.val();
foodObj.updateFoodStock(food);
}

//function to update food stock and last fed time
function feedDog(){
  dog.addImage(happyDog);
  var foodVal=foodObj.getFoodStock();
  if(foodVal<=0){
     foodObj.updateFoodStock(0);
  }
  else {
    foodObj.updateFoodStock(foodVal-1);
  }
  database.ref('/').update({
    Food:foodObj.getFoodStock(),
    lastFed:hour()
  })
}

//function to add food in stock
function addFood(){
  food++
  database.ref('/').update({
    Food:food
  })
}