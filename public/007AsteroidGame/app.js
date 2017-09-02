window.onload = function(){
		init();
};


	
	var VAR = {			   //VAR is global object which is only used to hold some important values
		canvas : undefined,//defined only by init, if undefined then something went wrong
		canvasCollision : undefined,
		ctx : undefined,   //defined only by init, if undefined then something went wrong
		ctxCollision : undefined,   //defined only by init, if undefined then something went wrong
		ship : undefined,  //you need to linkt to Ship.js file, otherwise script will fail
		menu : undefined,
		asteroids : [],
		bullets : [],
		effects : [],
		fps : 60,
		currentTime : 0,
		referenceWidth : 0, //it is min(canvas.width,canvas.height) we will need this value in our program
		sessionEnded : false,
		destroyedAsteroids : 0

	};

	



	function init(){

		VAR.sessionEnded = false;
		VAR.asteroids = [];
		VAR.bullets = [];
		VAR.effects = [];
		VAR.destroyedAsteroids = 0;

		console.log("AAAA");
		window.removeEventListener("keydown",init);
		var canvasCollision = document.createElement("canvas");
		var ctxCollision = canvasCollision.getContext("2d");
		document.body.appendChild(canvasCollision);
		VAR.canvasCollision = canvasCollision;
		canvasCollision.width = window.innerWidth;
		canvasCollision.height = window.innerHeight;
		VAR.ctxCollision = ctxCollision;

		var canvas = document.createElement("canvas");
		var ctx = canvas.getContext("2d");
		document.body.appendChild(canvas);
		VAR.canvas = canvas;
		canvas.width = window.innerWidth;
		canvas.height = window.innerHeight;
		VAR.ctx = ctx;

		
		//canvasCollision.style.marginBottom = canvas.style.marginBottom = "10%";
		//console.log(canvas.style);

		


		VAR.menu = new Menu(VAR);
		VAR.referenceWidth = Math.min(canvas.width, canvas.height);
		VAR.ctx.font =  VAR.referenceWidth/25 + "px Arial";
		VAR.ship = new Ship(VAR,canvas.width/2,canvas.height/2);
		
		for(var i=0;i<1;i++){
			//VAR.asteroids.push(new Asteroid(VAR,2,Math.random() * canvas.width,Math.random() * canvas.height));
			VAR.asteroids.push(new Asteroid(VAR,2,0,0));
		}
		VAR.asteroids.push(new Asteroid(VAR,2,150,150));
		VAR.asteroids.push(new Asteroid(VAR,2,150,150));
		VAR.asteroids.push(new Asteroid(VAR,1,450,450));
		VAR.asteroids.push(new Asteroid(VAR,0,350,350));
		VAR.asteroids.push(new Asteroid(VAR,0,300,350));


		mainLoop();
	};



	function mainLoop(time){
		requestAnimationFrame(mainLoop);
		if(time > VAR.currentTime + 1000/VAR.fps){
			VAR.currentTime = time;

			VAR.ctx.fillStyle = "rgba(0,0,0,255)";
			VAR.ctxCollision.fillStyle = "rgba(0,0,0,0)";
			VAR.ctx.fillRect(0,0,VAR.canvas.width, VAR.canvas.height);
			VAR.ctxCollision.fillRect(0,0,VAR.canvas.width, VAR.canvas.height);

			VAR.menu.draw();

			VAR.asteroids.forEach((asteroid) => {
				asteroid.draw();
			});

			VAR.bullets.forEach((bullet) => {
				bullet.draw();
			});

			VAR.effects.forEach((effect) => {
				effect.draw();
			});

			

			VAR.ship.draw();

	

			VAR.asteroids = VAR.asteroids.filter((asteroid) => asteroid.destroyed == false);
			VAR.bullets = VAR.bullets.filter((bullet) => bullet.currentTick<bullet.maxTick );
			VAR.effects = VAR.effects.filter((effect) => effect.currentTick<effect.maxTick );
			Bullet.currentNumberOfBullets = VAR.bullets.length;
		}
	}

	function rand(min,max){
		return Math.random() * (max-min) + min;
	}

	function randRound(min,max){
		return Math.round(rand(min,max));
	}

	window.addEventListener("resize", function(event){

		VAR.canvas.width = window.innerWidth;
		VAR.canvas.height = window.innerHeight;

		VAR.referenceWidth = Math.min(VAR.canvas.width, VAR.canvas.height);

		VAR.canvasCollision.width = window.innerWidth;
		VAR.canvasCollision.height = window.innerHeight;

		VAR.ctx.font =  VAR.referenceWidth/25 + "px Arial";

	});


