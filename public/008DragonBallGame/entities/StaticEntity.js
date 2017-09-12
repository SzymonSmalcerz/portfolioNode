


var StaticEntity = function(handler,spriteX, spriteY,x ,y,collisionHeight,scale,collisionWidth,widthInImage ,heightInImage ){
	this.handler = handler;
	this.xPositionInImage = spriteX;
	this.yPositionInImage = spriteY;
	this.x ;
	this.y ;
	

	this.scale = scale || 1.0;
	this.widthInImage = widthInImage ||StaticEntity.width;
	this.width = this.widthInImage * this.scale;
	this.heightInImage = heightInImage ||StaticEntity.width;
	this.height = this.heightInImage * this.scale;
	this.collisionHeight = collisionHeight * this.scale || this.height/8;
	this.collisionWidth = collisionWidth * this.scale || this.width/3;


	this.scaledX = 0;
	this.scaledY = 0;
	this.scaledWidth = 1;
	this.scaledHeight = 1;
};

StaticEntity.width = 64;
StaticEntity.height = 64;
StaticEntity.sprite = new Image();
StaticEntity.sprite.src = "sprites/spriteStaticEntities.png";



StaticEntity.prototype.draw = function(){

	var globalScale = this.scale * this.handler.scale;

	this.scaledX = this.x * this.handler.scale;
	this.scaledY = this.y * this.handler.scale;
	this.scaledWidth = this.widthInImage * globalScale;
	this.scaledHeight = this.heightInImage * globalScale;
	this.scaledCollisionWidth = this.collisionWidth * this.handler.scale;
	this.scaledCollisionHeight = this.collisionHeight * this.handler.scale;

	this.handler.ctx.drawImage(StaticEntity.sprite,																	// imagesource
							   this.xPositionInImage*StaticEntity.width,this.yPositionInImage*StaticEntity.height,	// x and y position of particular image in sprite
							   this.widthInImage,this.heightInImage,												// width and height of particular image in sprite
							   this.scaledX,this.scaledY,											// x and y on the screen
							   this.scaledWidth,this.scaledHeight);		// width and height of the particular image on the screen

	this.handler.collisionCtx.fillStyle = "rgba(1,0,0,1.0)";
	this.handler.collisionCtx.fillRect(this.handler.scale*(this.x + (this.width - this.collisionWidth)/2),this.handler.scale*(this.y + (this.height - this.collisionHeight - this.height/10)), this.collisionWidth * this.handler.scale, this.collisionHeight * this.handler.scale);

};


var Tree = function(x,y){
	StaticEntity.call(this,Game.handler,1,0,x,y,null,1.0,128/6,128,128);
	this.x = x;
	this.y = y;
};

Tree.prototype = new StaticEntity();


// var Rock = function(x,y){
// 	StaticEntity.call(this,Game.handler,5,0,x,y,StaticEntity.height/5,Math.random()*(0.9 - 0.4) + 0.4,StaticEntity.width/2);
// 	this.x = x;
// 	this.y = y;
// };

// Rock.prototype = new StaticEntity();

var House1 = function(x,y){
	StaticEntity.call(this,Game.handler,0,2,x,y,128/5,null,128*0.87,128,128);
	this.x = x;
	this.y = y;
};

House1.prototype = new StaticEntity();


var Bush1 = function(x,y){
	StaticEntity.call(this,Game.handler,0,0,x,y,0,null,0);
	this.x = x;
	this.y = y;
};

Bush1.prototype = new StaticEntity();

var House2 = function(x,y){
	StaticEntity.call(this,Game.handler,6,0,x,y,210/5,null,128*0.87,128,210);
	this.x = x;
	this.y = y;
};

House2.prototype = new StaticEntity();