

var Menu = function(gameManager){

	this.gameManager = gameManager;

};

Menu.prototype.draw = function(){
	var ctx = this.gameManager.ctx;
	var gameManager = this.gameManager;

	ctx.beginPath();
	ctx.fillStyle="white";
	ctx.fillText("Destroyed Asteroids: " + gameManager.destroyedAsteroids,gameManager.canvas.width/20,gameManager.canvas.height*0.95);
	ctx.fill();
	//ctx.beginPath();
	//ctx.moveTo(0,gameManager.canvas.height*0.9);
	//ctx.lineTo(gameManager.canvas.width,gameManager.canvas.height*0.9);
	//ctx.LineTo(0,gameManager.canvas.height*0.9);
	//ctx.strokeStyle = "white";
	//ctx.stroke();
	ctx.closePath();

	
};
