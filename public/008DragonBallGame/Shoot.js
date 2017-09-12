var Shoot = function(x,y,turn,damage,radius, frameTable, speed, attackTable){

	this.tickCounter = 0;
	this.speed = speed*Game.handler.scale || 15*Game.handler.scale;
	this.x = x / Game.handler.scale;
	this.y = y / Game.handler.scale;
	this.turn = turn;
	this.damage = damage || 500;
	this.radius = radius || 30;
	this.handler = Game.handler;
	this.frameTable = frameTable;
	this.height = 32;
	this.width = 32;
	this.detonated = false;


	this.scaledSpeed = this.speed; //*Game.handler.scale in case you will change it
	this.scaledX = x;
	this.scaledY = y;
	this.scaledWidth = Shoot.width * Game.handler.scale;
	this.scaledHeight = Shoot.height * Game.handler.scale;
	this.attackTable = attackTable;

};

Shoot.sprite = new Image();
Shoot.sprite.src = "sprites/shootSprite.png";
Shoot.width = 32;
Shoot.height = 32;

Shoot.prototype.tick = function(){

	// this.scaledX = this.x;
	// this.scaledY = this.y;

	if(this.attackTable && !this.detonated){
		if(this.turn === "left"){
			this.frameTable = this.attackTable[1];
		}else if(this.turn === "right"){
			this.frameTable = this.attackTable[0];
		}else if(this.turn === "up"){
			this.frameTable = this.attackTable[3];
		}else if(this.turn === "down"){
			this.frameTable = this.attackTable[2];
		}
	}

	this.tickCounter+=1;

	if(this.turn === "left"){
		this.scaledX -= this.speed;
	}else if(this.turn === "right"){
		this.scaledX += this.speed;
	}else if(this.turn === "up"){
		this.scaledY -= this.speed;
	}else if(this.turn === "down"){
		this.scaledY += this.speed;
	}

	this.checkForCollisionWithEntity();
	

	
	//this.draw();

	

};


Shoot.prototype.draw = function(){
	this.handler.ctx.drawImage(Shoot.sprite,
		this.frameTable[Math.floor(this.tickCounter)%this.frameTable.length].x*Shoot.width,this.frameTable[Math.floor(this.tickCounter)%this.frameTable.length].y*Shoot.height,
		Shoot.width, Shoot.height,
		this.scaledX, this.scaledY,
		this.scaledWidth, this.scaledHeight);

	// this.handler.collisionCtx.drawImage(Shoot.sprite,
	// 	this.frameTable[Math.floor(this.tickCounter)%this.frameTable.length].x*Shoot.width,this.frameTable[Math.floor(this.tickCounter)%this.frameTable.length].y*Shoot.height,
	// 	Shoot.width, Shoot.height,
	// 	this.x, this.y,
	// 	Shoot.width * this.handler.scale, Shoot.height * this.handler.scale);
};


Shoot.prototype.checkForCollisionWithEntity = function(){
	if(!this.detonated){
		for(var i =0;i<this.handler.currentLevel.allEntities.length;i++){


			

				if((Math.sqrt(Math.pow(this.handler.currentLevel.allEntities[i].scaledCollisionWidth/2,2) + Math.pow(this.handler.currentLevel.allEntities[i].scaledCollisionHeight/2,2))) +
			   (Math.sqrt(Math.pow(this.scaledWidth/2,2) + Math.pow(this.scaledHeight/2,2))) >= (Math.sqrt(Math.pow((this.handler.currentLevel.allEntities[i].scaledX + this.handler.currentLevel.allEntities[i].scaledWidth/2) - (this.scaledX + this.scaledWidth/2),2) + Math.pow((this.handler.currentLevel.allEntities[i].scaledY + this.handler.currentLevel.allEntities[i].scaledHeight * 0.9 - this.handler.currentLevel.allEntities[i].scaledCollisionHeight/2) - (this.scaledY + this.scaledHeight/2),2)))){
					
					this.frameTable = [{x:4,y:0},{x:5,y:0},{x:6,y:0},{x:7,y:0},{x:0,y:1},{x:1,y:1},{x:2,y:1},{x:3,y:1},{x:4,y:1},{x:5,y:1}];
					
					this.speed = 0;
					
					this.tickCounter = 0;
					
					this.detonated = true;

					if(this.handler.currentLevel.allEntities[i].health){
						this.handler.currentLevel.allEntities[i].health -= this.damage;
					}

				}
			
		}
	}

};

//@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@




var Shoot1 = function(x,y,turn){
	Shoot.call(this,x,y,turn,500,30,[{x:0,y:0},{x:1,y:0},{x:2,y:0},{x:3,y:0}],30)
}

Shoot1.prototype = new Shoot();


var KamehamehaWave = function(x,y,turn){
	Shoot.call(this,x,y,turn,200,200,null,25,[[{x:0,y:2}],[{x:1,y:2}],[{x:2,y:2}],[{x:3,y:2}]])
}

KamehamehaWave.prototype = new Shoot();




