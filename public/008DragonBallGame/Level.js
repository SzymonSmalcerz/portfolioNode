var Level = function(handler,tilesTable,statics,character,enemies,npcs){
	this.handler = handler;
	this.character = character || [];
	this.enemies = enemies || [];
	this.statics = statics || [];
	this.npcs = npcs || [];
	this.tiles = tilesTable || [];
	this.allEntities = [];
	this.shoots = [];

	this.moveX = 0; // this two variables used onlyt to "move" tiles while moving player
	this.moveY = 0; //

	this.widthOfMap;	//not scaled !!!!
	this.heightOfMap;	//
}

Level.prototype.tick = function(){

	this.widthOfMap = this.tiles[0].length;
	this.heightOfMap = this.tiles.length;

	

	this.draw(); //first draw then tick !!! otherwise not working


	this.character.tick();

	for(var i=0;i<this.shoots.length;i++){
		this.shoots[i].tick();
	}

	for(var i=0;i< this.enemies.length; i++){
		this.enemies[i].tick();
	};

	this.enemies = this.enemies.filter((enemie) => enemie.health>0);
	this.shoots = this.shoots.filter((shoot) => {
		if(shoot.detonated){
			return shoot.tickCounter < 10;
		}else{
			return shoot.tickCounter < 45;
		}
	});

	

};




Level.prototype.draw = function(){
	


	for(var i = 0;i < this.tiles.length; i++){
		for(var j = 0;j < this.tiles[i].length; j++){
			if((j*Tile.width + this.moveX) * this.handler.scale >= -(32*this.handler.scale) && (j*Tile.width + this.moveX) * this.handler.scale <= window.innerWidth + (32*this.handler.scale)
				&& ( i*Tile.height + this.moveY) * this.handler.scale >= -(32*this.handler.scale) &&  (i*Tile.height + this.moveY) * this.handler.scale <= window.innerHeight + (32*this.handler.scale)){
				Tile[this.tiles[i][j]].draw(j*Tile.width + this.moveX, i*Tile.height + this.moveY);
			}
			
		}
	}

	this.allEntities = [];
	this.allEntities.push(this.character);

	
	for(var i=0;i< this.statics.length; i++){
		this.allEntities.push(this.statics[i]);
	}

	for(var i=0;i< this.enemies.length; i++){
		this.allEntities.push(this.enemies[i]);
	}
	
	for(var i=0;i< this.shoots.length; i++){
		this.allEntities.push(this.shoots[i]);
		//console.log(this.shoots[i]);
	}
	
	
	

	this.sortEntityTable();

	for(var i=0;i<this.allEntities.length;i++){
		
		if(this.allEntities[i].scaledX>= -(this.allEntities[i].scaledWidth) && this.allEntities[i].scaledX <= window.innerWidth + this.allEntities[i].scaledWidth
					&& this.allEntities[i].scaledY>= -(this.allEntities[i].scaledHeight) &&  this.allEntities[i].scaledY<= window.innerHeight + this.allEntities[i].scaledHeight){
			this.allEntities[i].draw();
		}
		
	};

};


Level.prototype.sortEntityTable = function(){

	var temp;

	for(var i =0;i<this.allEntities.length;i++){
		for(var j=0;j<this.allEntities.length;j++){
			if(this.allEntities[i].scaledY + this.allEntities[i].scaledHeight < this.allEntities[j].scaledY + this.allEntities[j].scaledHeight){
				temp = this.allEntities[i];
				this.allEntities[i] = this.allEntities[j];
				this.allEntities[j] = temp;
			}
		}
	}

	//console.log(this.allEntities);

};

