function Effect(gameManager, x, y, typeOfEffect,maxTick){
	this.gameManager = gameManager;
	this.x = x;
	this.y = y;
	this.typeOfEffect = typeOfEffect;
	this.currentTick = 0;
	this.maxTick = maxTick || 2000;
	

};

Effect.prototype.draw = function(){

	

	if(this.typeOfEffect === "asteroidBullet"){
		if(this.points){
			this.gameManager.ctx.beginPath();
			this.gameManager.ctx.fillStyle = "white";
			this.points.forEach((point)=>{
				//
				this.gameManager.ctx.fillRect(point.x, point.y, 1, 1);
				
				point.x += point.speed * this.gameManager.referenceWidth * Math.sin(point.angle/180 * Math.PI);
				point.y += point.speed * this.gameManager.referenceWidth * Math.cos(point.angle/180 * Math.PI);
				this.currentTick+=1;
			});

			this.gameManager.ctx.fill();
			this.gameManager.ctx.closePath();


		}else{
			this.points = [];

			for(var i=0;i<20;i++){

				this.points.push({
					angle : Math.random()*360,
					speed : 0.005,
					x : this.x,
					y : this.y
				});

			}
		}
	}
}