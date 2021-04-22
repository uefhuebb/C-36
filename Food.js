class Food{
constructor(){
    this.foodStock=0;
    this.lastFed=0;
    this.image=loadImage('Images/Milk.png');
}
getFoodStock(){
    return this.foodStock;
    
}
updateFoodStock(foodStock){
    this.foodStock=foodStock;
}
getFeedTime(lastFed){
    this.lastFed=lastFed

}
deductFood(){
    if(this.foodStock>0){
        this.foodStock=this.foodStock-1;
    }
}
display(){
var x=80;
var y=100;
imageMode(CENTER);
image(this.image,720,220,70,70);


if(this.foodStock!==0){
for(var i=0;i<this.foodStock;i++){
    if(i%10===0){
        x=80;
        y=y+50;
    }
    image(this.image,x,y,70,70);
    x=x+30;
}
}





}











}