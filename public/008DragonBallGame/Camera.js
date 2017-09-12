var Camera = function(handler){
	this.handler = Game.handler;
};



Camera.prototype.tick = function(){

	var level = this.handler.currentLevel;
	var player = level.character;



	// console.log("@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@")
	// console.log(player.scaledX + player.scaledWidth/2);
	// console.log(window.innerWidth/2);
	// console.log(level.moveX);

	if(player.scaledX + player.scaledWidth/2 >= window.innerWidth/2 ){

		if(player.currentMove === player.left && level.moveX <= 0 && (player.scaledX + player.scaledWidth/2 - player.scaledSpeed < window.innerWidth/2)){

			// console.log(player.scaledX + player.scaledWidth/2);
			// console.log(window.innerWidth/2);
			level.moveX += player.speed;

			for(var i=0;i<level.allEntities.length;i++){
				level.allEntities[i].x+=player.speed;
				level.allEntities[i].scaledX+=player.scaledSpeed;
			}

			// for(var i=0;i<level.shoots.length;i++){
			// 	level.shoots[i].x += player.scaledSpeed;
			// }

		}else if(player.currentMove === player.right && (player.scaledX + player.scaledWidth/2 - this.handler.scale * level.moveX < this.handler.scale * Tile.width * level.widthOfMap - window.innerWidth/2)){

			level.moveX -= player.speed;

			// console.log(player.scaledX + player.scaledWidth/2 - this.handler.scale * level.moveX );
			// console.log(+ "  \n" +  this.handler.scale * Tile.width * level.widthOfMap - window.innerWidth/2)

			for(var i=0;i<level.allEntities.length;i++){
				level.allEntities[i].x-=player.speed;
				level.allEntities[i].scaledX-=player.scaledSpeed;
			}

			// for(var i=0;i<level.shoots.length;i++){
			// 	level.shoots[i].x -= player.scaledSpeed;
			// }

		}

	}
	if(player.scaledY + player.scaledHeight>= window.innerHeight/2){
		
		if(player.currentMove === player.up && level.moveY <0 && (player.scaledY + player.scaledHeight/2 - player.scaledSpeed < window.innerHeight/2)){

			level.moveY += player.speed;

			for(var i=0;i<level.allEntities.length;i++){
				level.allEntities[i].y+=player.speed;
				level.allEntities[i].scaledY+=player.scaledSpeed;
			}

			// for(var i=0;i<level.shoots.length;i++){
			// 	level.shoots[i].y += player.scaledSpeed;
			// }

		}else if(player.currentMove === player.down && (player.scaledY + player.scaledHeight/2 - this.handler.scale * level.moveY < level.heightOfMap * this.handler.scale * Tile.height - window.innerHeight/2)){

			level.moveY -= player.speed;

			for(var i=0;i<level.allEntities.length;i++){
				level.allEntities[i].y-=player.speed;
				level.allEntities[i].scaledY-=player.scaledSpeed;
			}

			// for(var i=0;i<level.shoots.length;i++){
			// 	level.shoots[i].y -= player.scaledSpeed;
			// }

		}

	}

};