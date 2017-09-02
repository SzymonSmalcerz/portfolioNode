
function Ship(gameManager,x,y){

	if(!gameManager) throw Error("YOU HAVE TO PROVIDE GAMEMANAGER TO SHIP OBJECT!");


	this.gameManager = gameManager;	//This is our handler to canvas

	this.radius = 0.02;			//we will draw our ship based on the circle of radius : ..
	this.x = x || 50;				//middle (x,y) coordinates
	this.y = y || 50;				//						  of our circle.
	this.points = [{},{},{}];		//our ship will be a traingle with 3 tops of coordinates : points[0] = (someX,someY) etc..
	this.angle = 0;					//our ship is based on this angle and change position according to this angle.
	this.angleOfSideWalls = 35;  	//hard to explain :o you have to see the code to understand !
	this.angleOfMovement = 0;
	this.maxSpeed = 0.039;
	//this.currentSpeed = 0;
	this.acceleration = 0.0018;
	this.framesFromLastBullet = 0,
	this.framesBetweenBullets = 3;
	this.speedX = 0;
	this.speedY = 0;
	this.destroyed = false;
};

Ship.prototype.checkForCollision = function(){


	if(this.gameManager.ctxCollision.getImageData(this.x,this.y,1,1).data[0] === 255){

			var returnValue = false;
			var referenceWidth = this.gameManager.referenceWidth;
			var x = this.x;
			var y = this.y;
			this.gameManager.asteroids.forEach((asteroid) => {
				
				
				if((asteroid.x + asteroid.radius * referenceWidth) >= x - this.radius * referenceWidth && (asteroid.x - asteroid.radius * referenceWidth) <= x + this.radius * referenceWidth 
					&& (asteroid.y + asteroid.radius * referenceWidth) >= y - this.radius * referenceWidth && (asteroid.y - asteroid.radius * referenceWidth) <= y + this.radius * referenceWidth){	

					returnValue = true;
				}
				
			});
	}

	return returnValue;
	

};



var drawAcceleration = false;
Ship.prototype.draw = function(){

	var ctx = this.gameManager.ctx;

	if(this.gameManager.sessionEnded){
		ctx.fillText("You Lost",this.gameManager.canvas.width/2*0.88,this.gameManager.canvas.height/2*0.9);
		ctx.fillText("Press space to play again",this.gameManager.canvas.width/2*0.74,this.gameManager.canvas.height/2*1.05);
		return;
	}


	var tempBool = this.checkForCollision();
	if(tempBool){
		this.gameManager.sessionEnded = true;

		window.addEventListener("keydown",init);

		return;
	}
	
	this.framesFromLastBullet += 1;

	if(Ship.key_32 && Bullet.currentNumberOfBullets < Bullet.maxNumberOfBullets && this.framesFromLastBullet>= this.framesBetweenBullets){
		this.framesFromLastBullet = 0;
		this.gameManager.bullets.push(new Bullet(this.gameManager,this.x,this.y,this.angle + 180));
	}

	if(Ship.key_37){
		this.angle += 7;
	}else if(Ship.key_39){
		this.angle -= 7;
	}

	if(Ship.key_38){
		this.speedX = Math.min(Math.sin((this.angleOfMovement+180)/180 * Math.PI) * this.acceleration*this.gameManager.referenceWidth + this.speedX, this.maxSpeed*this.gameManager.referenceWidth);
		if(this.speedX < -this.maxSpeed*this.gameManager.referenceWidth) this.speedX = -this.maxSpeed*this.gameManager.referenceWidth;

		this.speedY = Math.min(Math.cos((this.angleOfMovement+180)/180 * Math.PI) * this.acceleration*this.gameManager.referenceWidth + this.speedY, this.maxSpeed*this.gameManager.referenceWidth);
		if(this.speedY < -this.maxSpeed*this.gameManager.referenceWidth) this.speedY = -this.maxSpeed*this.gameManager.referenceWidth;

		this.angleOfMovement = this.angle;
		drawAcceleration = !drawAcceleration;
	}else{
		drawAcceleration = false;
		this.speedX *= 0.98;
		this.speedY *= 0.98;
	}

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

	this.x += this.speedX;
	this.y += this.speedY;

	for(var i=0;i<this.points.length;i++){
		if(i === 0) {
			this.points[i] = {
				x : Math.sin((this.angle+180)/180 * Math.PI) * this.radius * this.gameManager.referenceWidth + this.x,
				y : Math.cos((this.angle+180)/180 * Math.PI) * this.radius * this.gameManager.referenceWidth + this.y
			};
		}else if(i === 1){
			this.points[i] = {
				x : Math.sin((this.angle+this.angleOfSideWalls)/180 * Math.PI) * this.radius * this.gameManager.referenceWidth + this.x,
				y : Math.cos((this.angle+this.angleOfSideWalls)/180 * Math.PI) * this.radius * this.gameManager.referenceWidth + this.y
			};
		}else{
			this.points[i] = {
				x : Math.sin((this.angle-this.angleOfSideWalls)/180 * Math.PI) * this.radius * this.gameManager.referenceWidth + this.x,
				y : Math.cos((this.angle-this.angleOfSideWalls)/180 * Math.PI) * this.radius * this.gameManager.referenceWidth + this.y
			};
		}
	}




	ctx.strokeStyle = "white";

	
	if(drawAcceleration){
		var x1 = this.radius * this.gameManager.referenceWidth * Math.sin((this.angle)/180 * Math.PI) + this.x;
		var y1 = this.radius * this.gameManager.referenceWidth * Math.cos((this.angle)/180 * Math.PI) + this.y;

		

		ctx.moveTo(x1,y1);
		ctx.beginPath();
		ctx.arc(x1, y1, (Math.random() * (this.radius/2 - this.radius/5) + this.radius/5 ) * this.gameManager.referenceWidth , 0, 2 * Math.PI, false);
		ctx.stroke();
		//console.log(( Math.random() * (this.radius/2 - this.radius/5) + this.radius/5 ) * this.gameManager.referenceWidth);
		//console.log(x1 + " XD " + y1 + " " + this.points[0].x + " " + this.points[0].y);
		ctx.closePath();
		
	}

	ctx.beginPath();
	ctx.fillStyle="white";
	ctx.moveTo(this.points[0].x,this.points[0].y);
	ctx.lineTo(this.points[1].x,this.points[1].y);
	ctx.lineTo(this.points[2].x,this.points[2].y);
	ctx.fill();
	ctx.closePath();
	
};


window.addEventListener("keyup", keyHandler);
window.addEventListener("keydown", keyHandler);

function keyHandler(event){
	
	if(event.type == "keydown"){

		Ship["key_37"] = false;
		Ship["key_38"] = false;
		Ship["key_39"] = false;

		Ship["key_"+event.keyCode] = true;
	}else{
		Ship["key_32"] = false;
		Ship["key_37"] = false;
		Ship["key_38"] = false;
		Ship["key_39"] = false;
	}

}