
Bullet.maxNumberOfBullets = 100;
Bullet.currentNumberOfBullets = 0;

function Bullet(gameManager,x,y,angle,speed,maxTick){
	this.gameManager = gameManager;
	this.x = x;
	this.y = y;
	this.angle = angle;
	this.speed = speed || 0.05;
	this.currentTick = 0;
	this.maxTick = maxTick || 20;
};

Bullet.prototype.checkForCollision = function(){


	if(this.gameManager.ctxCollision.getImageData(this.x,this.y,1,1).data[0] === 255){

			var referenceWidth = this.gameManager.referenceWidth;
			var x = this.x;
			var y = this.y;
			this.gameManager.asteroids.forEach((asteroid) => {
				
				
				if((asteroid.x + asteroid.radius * referenceWidth) >= x && (asteroid.x - asteroid.radius * referenceWidth) <= x && (asteroid.y + asteroid.radius * referenceWidth) >= y && (asteroid.y - asteroid.radius * referenceWidth) <= y)
				{	

					this.gameManager.destroyedAsteroids += 1;
					var asteroidSize = asteroid.size;
					this.continueDegradation(asteroid.size);
					asteroid.destroyed = true;

					for(var i=0; i<=asteroid.size; i++){
						this.gameManager.effects.push(new Effect(this.gameManager,this.x,this.y,"asteroidBullet"));
					};
					
					this.currentTick += this.maxTick + 1; // to ensure that this bullet will be remowed
					return;
				}
				
			});
	}
	

};


Bullet.prototype.continueDegradation = function(oldSize){

	if(oldSize === 1){
		for ( var i = 0 ; i<5 ; i++){
			this.gameManager.asteroids.push(new Asteroid(this.gameManager,0, this.x,this.y));
		}
	}else if(oldSize === 2){
		for ( var i = 0 ; i<3 ; i++){
			this.gameManager.asteroids.push(new Asteroid(this.gameManager,1, this.x,this.y));
		}
	}

}

Bullet.prototype.draw = function(){

	this.checkForCollision();

	this.x += this.speed * this.gameManager.referenceWidth * Math.sin(this.angle/180 * Math.PI);
	this.y += this.speed * this.gameManager.referenceWidth * Math.cos(this.angle/180 * Math.PI);

	this.gameManager.ctx.beginPath();
	this.gameManager.ctx.arc(this.x, this.y, 2, 0, 2 * Math.PI, false);
	this.gameManager.ctx.fillStyle = "rgb(0,255,0)";
	this.gameManager.ctx.fill();
	this.gameManager.ctx.closePath();

	this.currentTick += 1;



	if(this.x >this.gameManager.canvas.width){
		this.x -= this.gameManager.canvas.width;
	}else if(this.x < 0){
		this.x += this.gameManager.canvas.width;
	}


	if(this.y >this.gameManager.canvas.height){
		this.y -= this.gameManager.canvas.height;
	}else if(this.y < 0){
		this.y += this.gameManager.canvas.height;
	}
}