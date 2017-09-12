var MainCharacter = function(){

	this.up = [{x:11,y:11},{x:12,y:7},{x:4,y:2},{x:11,y:1}];
	this.left = [{x:1,y:11},{x:13,y:11},{x:9,y:11},{x:5,y:11}];
	this.right = [{x:0,y:11},{x:12,y:11},{x:8,y:11},{x:4,y:11}];
	this.down = [{x:10,y:1},{x:3,y:2}];


	this.up_fight = [{x:9,y:3},{x:11,y:9},{x:2,y:4},{x:6,y:4},{x:10,y:8},{x:0,y:6},{x:4,y:6}];
	this.down_fight = [{x:14,y:5},{x:3,y:6},{x:13,y:8},{x:14,y:5},{x:12,y:3},{x:1,y:4},{x:5,y:4}];
	this.left_fight = [{x:13,y:9},{x:5,y:5},{x:2,y:6},{x:1,y:5}];
	this.right_fight = [{x:12,y:9},{x:4,y:5},{x:1,y:6},{x:0,y:5}];

	

	this.idleDown = [{x:1,y:0}];
	this.idleRight = [{x:1,y:2}];
	this.idleLeft = [{x:2,y:2}];
	this.idleUp = [{x:0,y:2}];

	this.idle = this.idleDown;

	this.isFighting = false;
	this.usingSkill = false;



	Mob.call(this,Game.handler,"sprites/spriteGokuSupix.png",10000,20,10,100,100,[this.up,this.down,this.left,this.right,this.up_fight,this.down_fight,this.left_fight,this.right_fight,this.idle],32,32,12,null,12);
};

MainCharacter.prototype = new Mob();

MainCharacter.prototype.tick = function(){

	this.mana = this.maxMana;
	this.currentMove = this.idle;

	var player = this;

	if(keyHandler["37"] || keyHandler["38"] || keyHandler["39"] || keyHandler["40"] ){

		if(keyHandler["37"]	){
			this.idle = this.idleLeft;
			if(!this.isFighting && !this.isRegeneratingMana){
				this.move(-1,0);
			}
		}else if(keyHandler["38"]	){
			this.idle = this.idleUp;
			if(!this.isFighting && !this.isRegeneratingMana)
				this.move(0,-1);
		}else if(keyHandler["39"]	){
			this.idle = this.idleRight;
			if(!this.isFighting && !this.isRegeneratingMana)
				this.move(1,0);
		}else if(keyHandler["40"]	){
			this.idle = this.idleDown;
			if(!this.isFighting && !this.isRegeneratingMana)
				this.move(0,1);
		}

	};


	if(this.isRegeneratingMana ){


		this.currentMove =	[{x:3,y:10},{x:4,y:10},{x:5,y:10},{x:6,y:10},{x:7,y:10},{x:8,y:10}];
		if(this.mana + 0.6 < this.maxMana)
		{
			this.mana += 0.6;
		}

		return;

	}

	if(this.usingSkill && this.mana >= 3){

		if(this.currentMove === this.idleLeft){
			if(keyHandler["50"]){
				this.handler.currentLevel.shoots.push(new KamehamehaWave(this.scaledX - this.handler.scale * Shoot.width + 25 * Game.handler.scale,this.scaledY,"left"));
				this.currentMove =	[{x:4,y:8}];
				this.mana -=1.5;
			}
		}else if(this.currentMove === this.idleRight){
			

			if(keyHandler["50"]){
				this.handler.currentLevel.shoots.push(new KamehamehaWave(this.scaledX + this.handler.scale * (Shoot.width) - 25 * Game.handler.scale,this.scaledY,"right"));
				this.currentMove =	[{x:3,y:8}];
				this.mana -=1.5;
			}

		}else if(this.currentMove === this.idleUp){
			
			if(keyHandler["50"]){
				this.handler.currentLevel.shoots.push(new KamehamehaWave(this.scaledX,this.scaledY - this.handler.scale * (1.0 * Shoot.width) + 25 * Game.handler.scale,"up"));
				this.currentMove =	[{x:2,y:8}];
				this.mana -=1.5;
			}

		}else if(this.currentMove === this.idleDown){
			

			if(keyHandler["50"]){
				this.handler.currentLevel.shoots.push(new KamehamehaWave(this.scaledX,this.scaledY + this.handler.scale * (1.2 * Shoot.width) - 25 * Game.handler.scale,"down"));
				this.currentMove =	[{x:1,y:8}];
				this.mana -=1.5;
			}	
		}



		return;
	}


	if(this.isFighting){

		var enemies = this.handler.currentLevel.enemies;
		if(this.currentMove === this.idleLeft){
			this.currentMove = this.left_fight;

			for(var i = 0; i<enemies.length; i++){
				if( player.scaledY + player.scaledHeight *0.9 - 2.0 * player.scaledCollisionWidth <= enemies[i].scaledY + enemies[i].scaledHeight*0.9 - 0.5 * enemies[i].scaledCollisionHeight
				   && player.scaledY + player.scaledHeight *0.9 + player.scaledCollisionWidth >= enemies[i].scaledY + enemies[i].scaledHeight*0.9 - 0.5 * enemies[i].scaledCollisionHeight
				   && player.scaledX + (player.scaledWidth - player.scaledCollisionWidth)/2 >= enemies[i].scaledX + (enemies[i].scaledWidth + enemies[i].scaledCollisionWidth)/2
				   && player.scaledX + player.scaledWidth/2 - 3.0*player.scaledCollisionWidth/2 <= enemies[i].scaledX + (enemies[i].scaledWidth + enemies[i].scaledCollisionWidth)/2
				   ){
					enemies[i].getDamage(this.damage);
				console.log("LEFTFIGHT");
				};
			};

			
		}else if(this.currentMove === this.idleRight){
			this.currentMove = this.right_fight;

			for(var i = 0; i<enemies.length; i++){
				if( player.scaledY + player.scaledHeight *0.9 - 2.0 * player.scaledCollisionWidth <= enemies[i].scaledY + enemies[i].scaledHeight*0.9 - 0.5 * enemies[i].scaledCollisionHeight
				   && player.scaledY + player.scaledHeight *0.9 + player.scaledCollisionWidth >= enemies[i].scaledY + enemies[i].scaledHeight*0.9 - 0.5 * enemies[i].scaledCollisionHeight
				   && player.scaledX + (player.scaledWidth + player.scaledCollisionWidth)/2 <= enemies[i].scaledX + (enemies[i].scaledWidth - enemies[i].scaledCollisionWidth)/2
				   && player.scaledX + (player.scaledWidth + 3.0* player.scaledCollisionWidth)/2 >= enemies[i].scaledX + (enemies[i].scaledWidth - enemies[i].scaledCollisionWidth)/2
				   ){
					enemies[i].getDamage(this.damage);
					console.log("RIGHTFIGHT");
				};


				
			};

		}else if(this.currentMove === this.idleUp){
			this.currentMove = this.up_fight;

			
			for(var i = 0; i<enemies.length; i++){
				if(this.scaledX + this.scaledWidth	>= enemies[i].scaledX + enemies[i].scaledWidth/2
				   && this.scaledX <= enemies[i].scaledX + enemies[i].scaledWidth/2
				   && player.scaledY + 0.9 * player.scaledHeight - player.scaledCollisionHeight >= enemies[i].scaledY + enemies[i].scaledHeight * 0.9
				   && player.scaledY + 0.9 * player.scaledHeight - 2.0*player.scaledCollisionHeight <= enemies[i].scaledY + enemies[i].scaledHeight * 0.9
				   ){
					enemies[i].getDamage(this.damage);
					console.log("UPFIGHT");

				};
			};
		}else if(this.currentMove === this.idleDown){
			this.currentMove = this.down_fight;

			for(var i = 0; i<enemies.length; i++){
				if(this.scaledX + this.scaledWidth	>= enemies[i].scaledX + enemies[i].scaledWidth/2
				   && this.scaledX <= enemies[i].scaledX + enemies[i].scaledWidth/2
				   && player.scaledY + 0.9 * player.scaledHeight <= enemies[i].scaledY + enemies[i].scaledHeight * 0.9 - enemies[i].scaledCollisionHeight
				   && player.scaledY + 0.9 * player.scaledHeight + player.scaledCollisionHeight >= enemies[i].scaledY + enemies[i].scaledHeight * 0.9 - enemies[i].scaledCollisionHeight
				   ){
					enemies[i].getDamage(this.damage);
				console.log("DOWNFIGHT");
				};
			};
		}

		return;
	};
	
};



var keyHandler = {};

window.addEventListener("keydown",function(event){

	// if(event.keyCode === 65 || event.keyCode === 87 || event.keyCode === 68 || event.keyCode === 83){

	// 	keyHandler["65"] = keyHandler["87"] = keyHandler["68"] = keyHandler["83"] = false;

	// 	keyHandler[event.keyCode] = true;

	// };


	if(event.keyCode === 82){

		Game.handler.currentLevel.character.isRegeneratingMana = true;
		Game.handler.currentLevel.character.isFighting = false;
		Game.handler.currentLevel.character.usingSkill = false;
		keyHandler["37"] = keyHandler["38"] = keyHandler["39"] = keyHandler["40"] = false;
		return;
		//keyHandler["37"] = keyHandler["38"] = keyHandler["39"] = keyHandler["40"] = false;

	};

	if(event.keyCode === 32){

		Game.handler.currentLevel.character.isFighting = true;
		//keyHandler["37"] = keyHandler["38"] = keyHandler["39"] = keyHandler["40"] = false;

	};

	if(event.keyCode === 37 || event.keyCode === 38 || event.keyCode === 39 || event.keyCode === 40){

		keyHandler["37"] = keyHandler["38"] = keyHandler["39"] = keyHandler["40"] = false;

		
			keyHandler[event.keyCode] = true;
		

	};

	if(event.keyCode >=  49 && event.keyCode <= 57){

		for(var i = 49;i<58;i++){
			keyHandler[i.toString()] = false;
		};

		Game.handler.currentLevel.character.isFighting = false;
		Game.handler.currentLevel.character.usingSkill = true;

		keyHandler[event.keyCode] = true;
	}


	console.log(event.keyCode);

});


window.addEventListener("keyup",function(event){
	//console.log(event.keyCode);

	if(event.keyCode === 82){

		Game.handler.currentLevel.character.isRegeneratingMana = false;
		//keyHandler["37"] = keyHandler["38"] = keyHandler["39"] = keyHandler["40"] = false;

	};

	if(event.keyCode === 32){

		Game.handler.currentLevel.character.isFighting = false;

	};

	if(event.keyCode === 37 || event.keyCode === 38 || event.keyCode === 39 || event.keyCode === 40){

		keyHandler["37"] = keyHandler["38"]= keyHandler["39"] = keyHandler["40"] = false;

	};


	if(event.keyCode >=  49 && event.keyCode <= 57){

		for(var i = 49;i<58;i++){
			keyHandler[i.toString()] = false;
		};

		Game.handler.currentLevel.character.usingSkill = false;

	}


});