

function Asteroid(gameManager,size,x,y){

	if(!gameManager) throw Error("You have to initialize gameManager in Asteroid");

	this.gameManager = gameManager;
	this.size = size;
	
	this.x = x || 100;
	this.y = y || 100;
	this.moveAngle = roundRand(0,360);
	this.speed = this.size === 2 ? 0.002 : this.size ===1 ? 0.004 : 0.008;
	this.radius = this.size === 2 ? 0.08 : this.size ===1 ? 0.04 : 0.02;


	this.destroyed = false;
	this.angles = [];
	var tempAngle = 0;

	while(tempAngle <360){
		if(this.size === 2){
			this.angles.push(tempAngle);
			tempAngle += roundRand(15,35);
		}else if(this.size === 1){
			this.angles.push(tempAngle);
			tempAngle += roundRand(25,50);
		}else{
			this.angles.push(tempAngle);
			tempAngle += roundRand(35,60);
		}
	}

};

function roundRand(min,max){
	return Math.round(Math.random() * (max-min) + max);
}


Asteroid.prototype.draw = function(){

	var ctx = this.gameManager.ctx;
	var ctxCollision = this.gameManager.ctxCollision;
	var gameManager = this.gameManager;

	

	this.x += this.speed * gameManager.referenceWidth * Math.sin(this.moveAngle/180 * Math.PI);
	this.y += this.speed * gameManager.referenceWidth * Math.cos(this.moveAngle/180 * Math.PI);

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

	ctx.fillStyle = "white";
	ctx.strokeStyle="white";
	this.angles.forEach((angle,index) => {
		if(index === 0){
			ctx.moveTo(this.x,this.y - this.radius * gameManager.referenceWidth);
			ctxCollision.moveTo(this.x,this.y - this.radius * gameManager.referenceWidth);
			ctx.beginPath();
			ctxCollision.beginPath();
		}else{
			ctx.lineTo(this.radius * gameManager.referenceWidth * Math.sin(angle/180 * Math.PI) + this.x, this.radius * gameManager.referenceWidth * Math.cos(angle/180 * Math.PI) + this.y );
			ctxCollision.lineTo(this.radius * gameManager.referenceWidth * Math.sin(angle/180 * Math.PI) + this.x, this.radius * gameManager.referenceWidth * Math.cos(angle/180 * Math.PI) + this.y );
		}
	});
	
	ctx.closePath();
	ctxCollision.closePath();
	ctx.stroke();
	ctxCollision.fillStyle = "red";
	ctxCollision.fill();
	
	

};