var AnimatedTile = function(animationTable){

	this.animationTable = animationTable;
	this.currentFrame = 0;
	this.handler = Game.handler;
	this.xPositionInImage = this.animationTable[0].x;
	this.yPositionInImage = this.animationTable[0].y;
}




AnimatedTile.prototype.draw = function(x,y){

		
			this.xPositionInImage = this.animationTable[Math.floor(this.handler.globalTickCounter/20)%this.animationTable.length].x;
			this.yPositionInImage = this.animationTable[Math.floor(this.handler.globalTickCounter/20)%this.animationTable.length].y;
		

		this.handler.ctx.drawImage(Tile.sprite,this.xPositionInImage*Tile.width,this.yPositionInImage*Tile.width,Tile.width,Tile.height,x*this.handler.scale,y*this.handler.scale,Tile.width*this.handler.scale,Tile.height*this.handler.scale);
		this.handler.collisionCtx.fillStyle = "rgb(0,0,1)";
		this.handler.collisionCtx.fillRect(x*this.handler.scale,y*this.handler.scale,Tile.width*this.handler.scale,Tile.height*this.handler.scale);

};