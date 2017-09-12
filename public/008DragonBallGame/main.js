window.onload = function(){
	Game.init();
}

var Game = {

	handler : {
		canvas : undefined,
		ctx : undefined,
		width : undefined,
		height : undefined,
		referencedWidth : undefined,
		currentLevel : undefined,
		camera : undefined,
		levels : [],
		scale : 1.0,


		//technicals
		fps : 30,
		lastTime : 0,
		globalTickCounter : 0, //used only for animations for tiles (nor for mobs)
		menu : {}
	},

	init : function(){

		Game.handler.collisionCanvas = document.createElement('canvas');
		Game.handler.collisionCanvas.width = window.innerWidth;
		Game.handler.collisionCanvas.height = window.innerHeight;
		Game.handler.collisionCtx = Game.handler.collisionCanvas.getContext('2d');
		document.body.appendChild(Game.handler.collisionCanvas);

		

		Game.handler.canvas = document.createElement('canvas');
		Game.handler.canvas.width = window.innerWidth;
		Game.handler.canvas.height = window.innerHeight;
		Game.handler.ctx = Game.handler.canvas.getContext('2d');
		Game.handler.ctx.imageSmoothingEnabled = false;
		Game.handler.ctx.mozImageSmoothingEnabled = false;
		Game.handler.ctx.oImageSmoothingEnabled = false;
		Game.handler.ctx.webkitImageSmoothingEnabled = false;
		document.body.appendChild(Game.handler.canvas);



		// Game.handler.collisionCanvas = document.createElement('canvas');
		// Game.handler.collisionCanvas.width = window.innerWidth;
		// Game.handler.collisionCanvas.height = window.innerHeight;
		// Game.handler.collisionCtx = Game.handler.collisionCanvas.getContext('2d');
		// document.body.appendChild(Game.handler.collisionCanvas);
		
		Game.handler.referencedWidth = Math.min(Game.handler.canvas.width, Game.handler.canvas.height);
		

		Game.handler.scale = Math.max(0.5,Math.floor(Game.handler.referencedWidth/512));


		Game.createLevels();

		Game.handler.camera = new Camera();

		Game.handler.menu.headImage = new Image();
		Game.handler.menu.headImage.src = "sprites/gokuHead.png";

		Game.mainLoop();
	},


	mainLoop : function(time){
		requestAnimationFrame(Game.mainLoop);


		
		if(time - Game.handler.lastTime > 1000/Game.handler.fps){

			Game.handler.collisionCtx.fillStyle = "rgba(0,120,120,1.0)";
			Game.handler.collisionCtx.fillRect(0,0,Game.handler.collisionCanvas.width,Game.handler.collisionCanvas.height);

			
			Game.handler.collisionCtx.fillStyle = "rgba(1,0,0,0.2)";
			// Game.handler.ctx.fillStyle ="rgba(1,0,0)";
			// Game.handler.ctx.fillRect(0,0,window.innerWidth,window.innerHeight);
			Game.handler.lastTime = time;
			Game.handler.currentLevel.tick();
			Game.handler.camera.tick();
			Game.handler.globalTickCounter += 1;

			Game.drawMenu();
			
		}
	},

	drawMenu : function(){

			var player = Game.handler.currentLevel.character;

			Game.handler.ctx.drawImage(Game.handler.menu.headImage,0,0,256,256,window.innerWidth/100,window.innerHeight - 150 * Game.handler.scale,128 * Game.handler.scale,128 * Game.handler.scale);

			Game.handler.ctx.fillStyle = "rgb(90,0,0)";
			Game.handler.ctx.fillRect(140 * Game.handler.scale ,window.innerHeight - 64 * Game.handler.scale, window.innerWidth/6,	Math.min(10,Math.max(Math.floor(player.scaledHeight/2),7)));

			Game.handler.ctx.fillStyle = "rgb(255,0,0)";
			Game.handler.ctx.fillRect(140 * Game.handler.scale ,window.innerHeight - 64 * Game.handler.scale, window.innerWidth/6 * player.health/player.maxHealth,	Math.min(7,Math.max(Math.floor(player.scaledHeight/2),5)));


			Game.handler.ctx.fillStyle = "rgb(0,0,20)";
			Game.handler.ctx.fillRect(140 * Game.handler.scale ,window.innerHeight - 48 * Game.handler.scale, window.innerWidth/10,	Math.min(10,Math.max(Math.floor(player.scaledHeight/2),4)));

			var manaColor = 150;
			if( Game.handler.currentLevel.character.isRegeneratingMana){
				manaColor = Math.floor(Math.random()*(255-225) + 225);
			}
			Game.handler.ctx.fillStyle = "rgb(0," + (manaColor - 150) + "," + manaColor + ")";
			Game.handler.ctx.fillRect(140 * Game.handler.scale ,window.innerHeight - 48 * Game.handler.scale, window.innerWidth/10 * player.mana/player.maxMana,	Math.min(7,Math.max(Math.floor(player.scaledHeight/3),3)));

			//Game.handler.ctx.fillRect(player.scaledX ,player.scaledY - player.scaledHeight/8, player.scaledWidth * player.health/player.maxHealth,	Math.min(4,Math.max(Math.floor(player.scaledHeight/15),1)));
			// Game.handler.ctx.drawImage(StaticEntity.sprite,																	// imagesource
			// 				   this.xPositionInImage*StaticEntity.width,this.yPositionInImage*StaticEntity.height,	// x and y position of particular image in sprite
			// 				   StaticEntity.width,StaticEntity.height,												// width and height of particular image in sprite
			// 				   this.scaledX,this.scaledY,											// x and y on the screen
			// 				   this.scaledWidth,this.scaledHeight);		// width and height of the particular image on the screen
		
	},


	createLevels : function(){

		var staticTableLevel01 = [];
		var staticTableLevel02 = [];
		var enemiesLevel01 = [];
		var enemiesLevel02 = [];


		var character = new MainCharacter();

		for(var i=0;i<10;i++){
			staticTableLevel01.push(new Tree(100+i*125,520));
			for(var j=0;j<2;j++){
				enemiesLevel01.push(new Hulk(Math.random() * (1000),Math.random() * (1000)));
			}
		}


		// for(var i=0;i<40;i++){
			staticTableLevel02.push(new Tree(Math.random()*(1000-500) + 500,Math.random()*(750-400) + 400));
			enemiesLevel02.push(new Hit(500 + i*50,450 + i*30))
		// }



		Game.handler.levels.push(new Level(Game.handler,["GGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGG",
											  			 "GGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGG",
											 			 "GGDDDDGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGG",
											   			 "GGDDDDGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGG",
											   			 "GGGDDGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGG",
											   			 "GGGDDGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGG",
											   			 "GGGDDGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGG",
											   			 "GGGDDGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGG",
											   			 "GGGDDGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGG",
											   			 "GGGDDGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGG",
											   			 "GGGDDGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGG",
											   			 "GGGDDGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGG",
											   			 "GGGDDGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGG",
											   			 "GGGDDGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGG",
											   			 "GGGDDGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGG",
											   			 "GGGDDGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGG",
											   			 "GGGDDGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGG",
											   			 "GGGDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDGGGGGGGGGGGGGGG",
											   			 "GGGDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDGGGGGGGGGGGGGGG",
											   			 "GGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGG",
											   			 "GGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGG",
											   			 "GGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGG",
											   			 "GGGGGGGGGGGGGGGGGGGWWGGGGGGGGGGGGGGGGGGGGGGGGGGG",
											   			 "GGGGGGGGGGGGGGGGGGWWWWGGGGGGGGGGGGGGGGGGGGGGGGGG",
											   			 "GGGGGGGGGGGGGGGGGWWWWWWGGGGGGGGGGGGGGGGGGGGGGGGG",
											   			 "GGGGGGGGGGGGGGGGWWWWWWWWGGGGGGGGGGGGGGGGGGGGGGGG",
											   			 "GGGGGGGGGGGGGGGWWWWWWWWWWGGGGGGGGGGGGGGGGGGGGGGG",
											   			 "GGGGGGGGGGGGGGWWWWWWWWWWWGGGGGGGGGGGGGGGGGGGGGGG",
											   			 "GGGGGGGGGGGGGWWWWWWWWWWWWWGGGGGGGGGGGGGGGGGGGGGG",
											   			 "GGGGGGGGGGGGGGWWWWWWWWWWWGGGGGGGGGGGGGGGGGGGGGGG",
											   			 "GGGGGGGGGGGGGGGWWWWWWWWWGGGGGGGGGGGGGGGGGGGGGGGG",
											   			 "GGGGGGGGGGGGGGGGGWWWWWWGGGGGGGGGGGGGGGGGGGGGGGGG",
											   			 "GGGGGGGGGGGGGGGGGGWWWWGGGGGGGGGGGGGGGGGGGGGGGGGG",
											   			  "GGGGGGGGGGGGGGGGGGGWWGGGGGGGGGGGGGGGGGGGGGGGGGGG",
											   			 "GGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGG",
											   			 "GGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGG",
											   			 "GGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGG",
											   			 "GGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGG"
											   ],staticTableLevel01, character, enemiesLevel01));
		Game.handler.currentLevel = Game.handler.levels[0];


		Game.handler.levels.push(new Level(Game.handler,["WWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWW",
														 "WWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWW",
														 "WWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWW",
														 "WWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWW",
														 "WWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWW",
														 "WWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWW",
														 "WWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWW",
														 "WWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWW",
														 "WWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWW",
														 "WWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWW",
														 "WWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWW",
														 "WWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWW",
														 "WWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWW",
														 "WWWWWWWWWWWWWWWWWDDDDDDDDDDDDDDDDDWWWWWWWWWWWWWW",
														 "WWWWWWWWWWWWWWWWDDGGGGGGGGGGGGGGGDDWWWWWWWWWWWWW",
														 "WWWWWWWWWWWWWWWDDGGGGGGGGGGGGGGGGGDDWWWWWWWWWWWW",
														 "WWWWWWWWWWWWWWWDGGGGGGGGGGGGGGGGGGGDWWWWWWWWWWWW",
														 "WWWWWWWWWWWWWWWDGGGGGGGGGGGGGGGGGGGDWWWWWWWWWWWW",
														 "WWWWWWWWWWWWWWWDGGGGGGGGGGGGGGGGGGGDWWWWWWWWWWWW",
														 "WWWWWWWWWWWWWWWDGGGGGGGGGGGGGGGGGGGDWWWWWWWWWWWW",
														 "WWWWWWWWWWWWWWWDGGGGGGGGGGGGGGGGGGGDWWWWWWWWWWWW",
														 "WWWWWWWWWWWWWWWDGGGGGGGGGGGGGGGGGGGDWWWWWWWWWWWW",
														 "WWWWWWWWWWWWWWWDGGGGGGGGGGGGGGGGGGGDWWWWWWWWWWWW",
														 "WWWWWWWWWWWWWWWDGGGGGGGGGGGGGGGGGGGDWWWWWWWWWWWW",
														 "WWWWWWWWWWWWWWWDGGGGGGGGGGGGGGGGGGGDWWWWWWWWWWWW",
														 "WWWWWWWWWWWWWWWDDGGGGGGGGGGGGGGGGGDDWWWWWWWWWWWW",
														 "WWWWWWWWWWWWWWWWDDGGGGGGGGGGGGGGGDDWWWWWWWWWWWWW",
														 "WWWWWWWWWWWWWWWWWDDDDDDDDDDDDDDDDDWWWWWWWWWWWWWW",
														 "WWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWW",
														 "WWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWW",
														 "WWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWW",
														 "WWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWW",
														 "WWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWW",
														 "WWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWW",
														 "WWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWW"
											   ],staticTableLevel02, character, enemiesLevel02));
		Game.handler.currentLevel = Game.handler.levels[0];


	}




};

window.addEventListener("resize", function(event){

		Game.handler.canvas.width = window.innerWidth;
		Game.handler.canvas.height = window.innerHeight;

		Game.handler.referencedWidth = Math.min(Game.handler.canvas.width, Game.handler.canvas.height);

		Game.handler.collisionCanvas.width = window.innerWidth;
		Game.handler.collisionCanvas.height = window.innerHeight;

		Game.handler.ctx.font =  Game.handler.referencedWidth/25 + "px Arial";

		Game.handler.scale = Math.max(0.5,Math.floor(Game.handler.referencedWidth/512));

	});



