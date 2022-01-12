const canvas = document.getElementById('canvas');
var ctx = canvas.getContext('2d');


class SnakePart  {
	constructor(x,y){
		this.x = x;
		this.y = y;
	}
}


var speed = 7;

var headX= 10
var headY = 10

const snakeParts = [];
var snakeLenght = 2

var Xvelocity =0;
var Yvelocity =0;

var appleX = 30
var appleY = 30

let score = 0

// loop
function loop(){
	changeSnakePosition()
	let result = isGameOver()
	if (result) {
		return;
	}





	clearCanvas()
		
	checkAplleCollision()
	drawApple()
	drawHead()

	drawScore()

	setTimeout(loop,1000/speed)
}






document.body.addEventListener("keydown",keyDown)






// functions
function isGameOver(){
	let gameOver = false

	if (Xvelocity ===0 && Yvelocity ===0) {
		return false
	}



	// walls
	if (headX < 0 ) {
		gameOver = true
	}
	else if (headX > 490 ) {
		gameOver = true
	}
	else if (headY < 0 ) {
		gameOver = true
	}
	else if (headY > 490 ) {
		gameOver = true
	}

    for (var i = 0; i < snakeParts.length; i++) {
    	let part =snakeParts[i]
    	if (part.x === headX && part.y === headY) {
    		gameOver = true
    		break;
    	}
    }

	if (gameOver) {
		ctx.fillStyle = 'black'
	ctx.font = "50px Verdana"
	ctx.fillText("Game Over",canvas.width/5,canvas.height/2)
	}


	return gameOver
}

function drawScore(){
	ctx.fillStyle = 'black'
	ctx.font = "20px Verdana"
	ctx.fillText("Score:" + score, canvas.width-90,30)
}


function clearCanvas(){
	 ctx.clearRect(0,0,canvas.width,canvas.height)
}


function drawHead(){
	if (canvas.getContext) {
		

		fillStyle = "black"
		for (var i = 0; i < snakeParts.length; i++) {
			let parts = snakeParts[i]
			ctx.beginPath()
			ctx.fillRect(parts.x,parts.y,10,10)
			ctx.stroke()
		}

		snakeParts.push(new SnakePart(headX,headY))
		while (snakeParts.length > snakeLenght) {
			snakeParts.shift()
		}
		fillStyle = "white"
		ctx.beginPath()
		ctx.fillRect(headX,headY,10,10)
		ctx.stroke()
	}	
}


function changeSnakePosition(){
	headX = headX + Xvelocity
	headY = headY +Yvelocity
}



function drawApple(){
	// aparecer al azar
  

    // dibujar
	ctx.fillStyle = "#615353"
	ctx.beginPath()
	ctx.fillRect(appleX,appleY,10,10)
	ctx.stroke()
}


function checkAplleCollision(){
	if (headX === appleX && headY === appleY) {
		appleX = redondear()
		appleY = redondear()
		snakeLenght++;
		score++;
		speed++;
	}
}




function keyDown(event){
	if (event.key === "ArrowUp") {
		if (Yvelocity == 10) { return; }
		Yvelocity = -10;
		Xvelocity = 0
	}
	if (event.key === "ArrowLeft") {
		if (Xvelocity == 10) { return; }
			Xvelocity = -10
			Yvelocity = 0
		}
	if (event.key === "ArrowRight") {
		if (Xvelocity == -10) { return; }
			Xvelocity = +10
			Yvelocity = 0
		}
	if (event.key === "ArrowDown") {
		if (Yvelocity == -10) { return; }
			Yvelocity = +10
			Xvelocity = 0
		}
}


function aleatorio(minimo,maximo){
  return Math.round(Math.random() * ((490+1)-0)+0);
  console.log(Math.round(Math.random() * ((490+1)-0)+0))
}

function redondear(num) {
  return Math.round(aleatorio() / 10) * 10;
}







loop()



