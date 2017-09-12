
//  		 THIS IS PROTOTYPE OF ENEMY, ACTUAL ENEMIES ARE BELOW PROTOTYPE


var Enemy = function(spriteSource,health,damage,speed,x,y,moveTable,width,height,range,collisionHeight,scale,collisionWidth){
	this.range = range;
	Mob.call(this,Game.handler,spriteSource,health,damage,speed,x,y,moveTable,width,height,collisionHeight,scale,collisionWidth);
};

Enemy.prototype = new Mob();

Enemy.prototype.fight = function(){
	console.log("enemy is fighting");
};

Enemy.prototype.tick = function(){


	

	var player = this.handler.currentLevel.character;

	if(!this.checkForCollisionWithPlayer()){

		if(Math.sqrt(Math.pow((player.scaledX - this.scaledX),2) + Math.pow((player.scaledY - this.scaledY),2)) < this.range * this.handler.scale){


			if(player.scaledX + (player.scaledWidth + player.scaledCollisionWidth)/2 + this.scaledSpeed< this.scaledX + (this.scaledWidth - this.scaledCollisionWidth)/2){
				this.move(-1,0);
				return;
			}else if(player.scaledX + (player.scaledWidth - player.scaledCollisionWidth)/2 - this.scaledSpeed > this.scaledX + (this.scaledWidth + this.scaledCollisionWidth)/2){
				this.move(1,0);
				return;
			}else if(player.scaledY + player.scaledHeight*0.9 + this.scaledSpeed < this.scaledY + this.scaledHeight * 0.9 - this.scaledCollisionHeight){
				this.move(0,-1);
				return;
			}else if(player.scaledY + player.scaledHeight*0.9 - player.scaledCollisionWidth - this.scaledSpeed > this.scaledY + this.scaledHeight * 0.9){
				this.move(0,1);
				return;
			}

		};

		this.currentMove = this.idle;
	}

	//this.checkForCollisionWithPlayer();

	// if(keyHandler["65"] || keyHandler["87"] || keyHandler["68"] || keyHandler["83"]){

	// 	if(keyHandler["65"]	){
	// 		this.currentMove = this.left_fight;
	// 	}else if(keyHandler["87"]	){
	// 		this.currentMove = this.up_fight;
	// 	}else if(keyHandler["68"]	){
	// 		this.currentMove = this.right_fight;
	// 	}else if(keyHandler["83"]	){
	// 		this.currentMove = this.down_fight;
	// 	}

	// 	return;
	// };


	
};

Enemy.prototype.checkForCollisionWithPlayer = function(){

	var player = this.handler.currentLevel.character;
	//console.log("inside checkForCollisionWithPlayer");

	if(player.scaledY + player.scaledHeight*0.9 - player.scaledCollisionHeight/2 >= this.scaledY + this.scaledHeight*0.9 - 2.0 * player.scaledCollisionHeight - this.scaledSpeed
	   && player.scaledY + player.scaledHeight*0.9 - player.scaledCollisionHeight/2 <= this.scaledY + this.scaledHeight*0.9 + 1.0* player.scaledCollisionHeight + this.scaledSpeed){
		

		if(player.scaledX + (player.scaledWidth + player.scaledCollisionWidth)/2 < this.scaledX + (this.scaledWidth - this.scaledCollisionWidth)/2
	       && player.scaledX + (player.scaledWidth + player.scaledCollisionWidth)/2 > this.scaledX + this.scaledWidth/2 - this.scaledCollisionWidth){

			//console.log("ENEMY IS ATTACKING LEFT");
			this.currentMove = this.left_fight;
			player.getDamage(this.damage);
			return true;
		}else if(player.scaledX + (player.scaledWidth - player.scaledCollisionWidth)/2 < this.scaledX + this.scaledWidth/2 + this.scaledCollisionWidth
	             && player.scaledX + (player.scaledWidth - player.scaledCollisionWidth)/2 > this.scaledX + (this.scaledWidth + this.scaledCollisionWidth)/2){

			//console.log("ENEMY IS ATTACKING RIGHT");
			this.currentMove = this.right_fight;
			player.getDamage(this.damage);
			return true;
		}


	}

	if(player.scaledX + player.scaledWidth/2 >= this.scaledX + this.scaledWidth/2 - this.scaledCollisionWidth
			 && player.scaledX + player.scaledWidth/2 <= this.scaledX + this.scaledWidth/2 + this.scaledCollisionWidth){

		if(player.scaledY + player.scaledHeight*0.9 <= this.scaledY + this.scaledHeight*0.9 - this.scaledCollisionHeight
		   && player.scaledY + player.scaledHeight*0.9 >= this.scaledY + this.scaledHeight*0.9 - this.scaledCollisionHeight - player.scaledCollisionHeight/2){
			//console.log("ENEMY IS ATTACKING UP");
			player.getDamage(this.damage);
			this.currentMove = this.up_fight;
			return true;
		}else if(player.scaledY + player.scaledHeight*0.9 - player.scaledCollisionHeight <= this.scaledY + this.scaledHeight*0.9 + player.scaledCollisionHeight/2
		   && player.scaledY + player.scaledHeight*0.9 - player.scaledCollisionHeight >= this.scaledY + this.scaledHeight*0.9){
			//console.log("ENEMY IS ATTACKING DOWN");
			player.getDamage(this.damage);
			this.currentMove = this.down_fight;
			return true;
		}

	}

	return false;

};









//@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@
//ENEMIES
var Hulk = function(x,y){

	this.up = [{x:0,y:2},{x:1,y:2},{x:2,y:2},{x:3,y:2},{x:4,y:2},{x:5,y:2}];
	this.left = [{x:0,y:3},{x:1,y:3},{x:2,y:3},{x:3,y:3},{x:4,y:3},{x:5,y:3}];
	this.right = [{x:0,y:2},{x:1,y:2},{x:2,y:2},{x:3,y:2},{x:4,y:2},{x:5,y:2}];
	this.down = [{x:0,y:2},{x:1,y:2},{x:2,y:2},{x:3,y:2},{x:4,y:2},{x:5,y:2}];


	this.up_fight = [{x:0,y:5},{x:1,y:5},{x:2,y:5},{x:3,y:5},{x:4,y:5}];
	this.down_fight = [{x:0,y:4},{x:1,y:4},{x:2,y:4},{x:3,y:4},{x:4,y:4}];
	this.left_fight = [{x:0,y:5},{x:1,y:5},{x:2,y:5},{x:3,y:5},{x:4,y:5}];
	this.right_fight = [{x:0,y:4},{x:1,y:4},{x:2,y:4},{x:3,y:4},{x:4,y:4}];

	this.idle = [{x:3,y:0},{x:3,y:0},{x:3,y:0},{x:3,y:0},{x:4,y:0},{x:4,y:0}];

	Enemy.call(this,"sprites/hulkSprite.png",500,10,4,x,y,[this.up,this.down,this.left,this.right,this.up_fight,this.down_fight,this.left_fight,this.right_fight,this.idle],100,100,200,25,1.0);
}

Hulk.prototype = new Enemy();


var Hit = function(x,y){

	this.up = [{x:4,y:9},{x:8,y:9}];
	this.left = [{x:6,y:9},{x:10,y:9}];
	this.right = [{x:5,y:9},{x:9,y:9}];
	this.down = [{x:3,y:9},{x:7,y:9}];


	this.up_fight = [{x:0,y:5},{x:1,y:5},{x:2,y:5},{x:3,y:5},{x:4,y:5}];
	this.down_fight = [{x:0,y:5},{x:1,y:5},{x:2,y:5},{x:3,y:5},{x:4,y:5}];
	this.left_fight = [{x:0,y:5},{x:1,y:5},{x:2,y:5},{x:3,y:5},{x:4,y:5}];
	this.right_fight = [{x:0,y:4},{x:1,y:4},{x:2,y:4},{x:3,y:4},{x:4,y:4}];

	this.idle = [{x:13,y:8},{x:14,y:8},{x:0,y:9},{x:1,y:9}];

	Enemy.call(this,"sprites/hitSprite.png",500,10,5,x,y,[this.up,this.down,this.left,this.right,this.up_fight,this.down_fight,this.left_fight,this.right_fight,this.idle],32,32,300,16,1.0,16);
}

Hit.prototype = new Enemy();






var Dragon = function(x,y){

	this.up = [{x:0,y:3},{x:1,y:3},{x:2,y:3}];
	this.left = [{x:0,y:1},{x:1,y:1},{x:2,y:1}];
	this.right = [{x:0,y:2},{x:1,y:2},{x:2,y:2}];
	this.down = [{x:0,y:0},{x:1,y:0},{x:2,y:0}];


	this.up_fight = [{x:0,y:4},{x:1,y:4},{x:2,y:4},{x:3,y:4},{x:4,y:4},{x:5,y:4}];
	this.down_fight = [{x:0,y:5},{x:1,y:5},{x:2,y:5},{x:3,y:5},{x:4,y:5},{x:5,y:5}];
	this.left_fight = [{x:0,y:7},{x:1,y:7},{x:2,y:7},{x:3,y:7},{x:4,y:7},{x:5,y:7}];
	this.right_fight = [{x:0,y:6},{x:1,y:6},{x:2,y:6},{x:3,y:6},{x:4,y:6},{x:5,y:6}];

	this.idle = [{x:1,y:0}];

	Enemy.call(this,"sprites/dragonSprite.png",500,10,5,x,y,[this.up,this.down,this.left,this.right,this.up_fight,this.down_fight,this.left_fight,this.right_fight,this.idle],50,50,300,null,1.2,null);
}

Dragon.prototype = new Enemy();