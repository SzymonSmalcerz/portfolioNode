var Mob = function(handler,spriteSource,health,damage,speed,x,y,moveTable,width,height,collisionHeight,scale,collisionWidth, manaRegeneration){
	this.handler = handler;
	this.sprite = new Image();
	this.spriteSource = spriteSource;

	this.health = health;
	this.maxHealth = health;
	this.damage = damage;

	this.moveTable = moveTable;
	this.tickCounter = 0;



	this.speed = speed;
	this.x = x;
	this.y = y;
	this.scale = scale || 1.0;
	this.width = width;
	this.height = height;
	this.collisionHeight = collisionHeight || height/3;
	this.collisionWidth = collisionWidth || width/3 ;




	this.isFloating = false; // IF IS FLOATING THEN CUT HEIGHT /2 
	this.scaledX = 0;
	this.scaledY = 0;
	this.scaledWidth = 1;
	this.scaledHeight = 1;

	this.mana = 100;
	this.maxMana = 100;
	this.manaRegeneration = manaRegeneration || 0.1;
	this.isRegeneratingMana = false;
};


Mob.prototype.getDamage = function(amount){

	this.health -= amount;

};


Mob.prototype.draw = function(){


	if(this.health < this.maxHealth){
		this.health += this.maxHealth/3000;
	}


	if(this.mana < this.maxMana){
		this.mana += this.manaRegeneration;
	}

	var globalScale = this.scale * this.handler.scale;
	if(!this.currentMove || !this.sprite.src){
		this.currentMove = this.moveTable[4]; // IDLE
		this.sprite.src = this.spriteSource;
	}


		this.scaledX = this.x * this.handler.scale;
		this.scaledY = this.y * this.handler.scale;
		this.scaledWidth = this.width* globalScale;
		this.scaledHeight = this.height * globalScale;
		this.scaledCollisionWidth = this.collisionWidth * globalScale;
		this.scaledCollisionHeight = this.collisionHeight * globalScale;
		this.scaledSpeed = this.speed * this.handler.scale;

	//console.log(this.moveTable[8]);

	if(!this.isFloating){
		this.handler.ctx.drawImage(this.sprite,																	// imagesource
							   		this.currentMove[Math.floor(this.tickCounter)%this.currentMove.length].x*this.width,this.currentMove[Math.floor(this.tickCounter)%this.currentMove.length].y*this.height,	// x and y position of particular image in sprite
							  		this.width,this.height,												// width and height of particular image in sprite
							 		this.scaledX,this.scaledY,											// x and y on the screen
							  		this.scaledWidth,this.scaledHeight);		// width and height of the particular image on the screen
	}else{


		if(this.floatingFrame){
			this.floatingFrame += 1;
		}else{
			this.floatingFrame = 1;
		}

		var temp = 0;
		var tick = 3.5;
		var timeFrame = tick*8;

		if(this.floatingFrame % timeFrame < tick || (this.floatingFrame % timeFrame >= tick*6 && this.floatingFrame % timeFrame < tick*8)){
			temp = 0;
		}else if((this.floatingFrame % timeFrame >= tick && this.floatingFrame % timeFrame < tick*2) || (this.floatingFrame % timeFrame >= tick*4 && this.floatingFrame % timeFrame < tick*6)){
			temp = 2;
		}else if(this.floatingFrame % timeFrame >= tick*2 && this.floatingFrame % timeFrame < tick*4){
			temp = 4;
		}
		this.handler.ctx.drawImage(this.sprite,																	// imagesource
							   		this.currentMove[Math.floor(this.tickCounter)%this.currentMove.length].x*this.width,this.currentMove[Math.floor(this.tickCounter)%this.currentMove.length].y*this.height,	// x and y position of particular image in sprite
							  		this.width,this.height/2,												// width and height of particular image in sprite
							 		this.scaledX,this.scaledY + temp,											// x and y on the screen
							  		this.scaledWidth,this.scaledHeight/2);		// width and height of the particular image on the screen
	}


	this.handler.ctx.fillStyle = "rgb(90,0,0)";
	this.handler.ctx.fillRect(this.scaledX ,this.scaledY - this.scaledHeight/8, this.scaledWidth,	Math.min(4,Math.max(Math.floor(this.scaledHeight/15),1)));

	this.handler.ctx.fillStyle = "rgb(255,0,0)";
	this.handler.ctx.fillRect(this.scaledX ,this.scaledY - this.scaledHeight/8, this.scaledWidth * this.health/this.maxHealth,	Math.min(4,Math.max(Math.floor(this.scaledHeight/15),1)));

	this.handler.collisionCtx.fillStyle = "rgba(5,0,0,0.2)";
	//this.handler.collisionCtx.fillRect(this.handler.scale*(this.x + (this.width - this.collisionWidth)/2),this.handler.scale*(this.y + (this.height - this.collisionHeight - this.height/10)), this.collisionWidth*this.handler.scale, this.collisionHeight*this.handler.scale)
	this.handler.collisionCtx.fillRect(this.scaledX + (this.scaledWidth - this.scaledCollisionWidth)/2,this.scaledY + (this.scaledHeight*0.9 - this.scaledCollisionHeight), this.scaledCollisionWidth, this.scaledCollisionHeight);

	this.tickCounter+=0.25;
};

Mob.prototype.move = function(x,y){

	this.currentMove = this.idle;
	
	if(x > 0){
		if(this.handler.collisionCtx.getImageData(this.scaledX + this.scaledSpeed*x + (this.scaledWidth + this.scaledCollisionWidth)/2,this.scaledY + this.scaledHeight*0.9 - this.scaledCollisionHeight,1,1).data[0] !== 1 &&
		   this.handler.collisionCtx.getImageData(this.scaledX + this.scaledSpeed*x + (this.scaledWidth + this.scaledCollisionWidth)/2,this.scaledY + this.scaledHeight*0.9,1,1).data[0] !== 1)
			{
				this.x += x*this.speed;
				this.currentMove = this.right;
			}
	}else if(x < 0){
		if(this.handler.collisionCtx.getImageData(this.scaledX + this.scaledSpeed*x + (this.scaledWidth - this.scaledCollisionWidth)/2,this.scaledY + this.scaledHeight*0.9 - this.scaledCollisionHeight,1,1).data[0] !== 1 &&
		   this.handler.collisionCtx.getImageData(this.scaledX + this.scaledSpeed*x + (this.scaledWidth - this.scaledCollisionWidth)/2,this.scaledY + this.scaledHeight*0.9,1,1).data[0] !== 1)
			{
				this.x += x*this.speed;
				this.currentMove = this.left;
			}
	}else if(y > 0){
		if(this.handler.collisionCtx.getImageData(this.scaledX + (this.scaledWidth + this.scaledCollisionWidth)/2,this.scaledY + y*this.scaledSpeed + this.scaledHeight*0.9,1,1).data[0] !== 1 &&
		   this.handler.collisionCtx.getImageData(this.scaledX + (this.scaledWidth - this.scaledCollisionWidth)/2,this.scaledY + y*this.scaledSpeed + this.scaledHeight*0.9,1,1).data[0] !== 1)
			{
				this.y += y*this.speed;
				this.currentMove = this.down;
			}
	}else if(y < 0){

		if(this.handler.collisionCtx.getImageData(this.scaledX + (this.scaledWidth + this.scaledCollisionWidth)/2,this.scaledY + y*this.scaledSpeed + this.scaledHeight*0.9 - this.scaledCollisionHeight,1,1).data[0] !== 1 &&
		   this.handler.collisionCtx.getImageData(this.scaledX + (this.scaledWidth - this.scaledCollisionWidth)/2,this.scaledY + y*this.scaledSpeed + this.scaledHeight*0.9 - this.scaledCollisionHeight,1,1).data[0] !== 1)
			{
				this.y += y*this.speed;
				this.currentMove = this.up;
			}
	}


	//console.log(this.handler.collisionCtx.getImageData(this.scaledX  + (this.scaledWidth)/2,this.scaledY + this.scaledHeight*0.8,1,1).data);
	
	if(this.handler.collisionCtx.getImageData(this.scaledX  + (this.scaledWidth)/2,this.scaledY + this.scaledHeight*0.8,1,1).data[2] == 1){

			this.isFloating = true;
			//console.log("FLOATING");

	}else{
		this.isFloating = false;
	}


};

