function startGame() {
    myGameArea.start();
  }
  
  var myGameArea = {
    canvas : document.createElement("canvas"),
    start : function() {
      this.canvas.width = 600;
      this.canvas.height = 500;
      this.ctx = this.canvas.getContext("2d");
      document.body.insertBefore(this.canvas, document.body.childNodes[0]);
      document.addEventListener("keydown",keyPush);
      setInterval(game,1000/15);
    }
  }

px=py=10;
gs=tc=20;
ax=ay=15;
xv=yv=0;
trail=[];
tail = 5;

function game() {
	px+=xv;
	py+=yv;
console.log('px = ' + px)
	if(px < 0)    {px = this.canvas.width/tc-1;} //allow snake to pass-through the screen
	if(px > this.canvas.width/tc-1) {px = 0;}
	if(py < 0)    {py = this.canvas.height/tc-1;}
	if(py > this.canvas.height/tc-1) {py = 0;}

	this.ctx.fillStyle="black";
	this.ctx.fillRect(0,0,this.canvas.width,this.canvas.height);

	ctx.fillStyle="lime";
	for(var i=0;i<trail.length;i++) {
		ctx.fillRect(trail[i].x*gs,trail[i].y*gs,gs-2,gs-2);
		if(trail[i].x==px && trail[i].y==py) {
			tail = 5;
		}
	}
	trail.push({x:px,y:py});
	while(trail.length > tail) {
		trail.shift();
	}

	if(ax==px && ay==py) {
		tail++;
		ax=Math.floor(Math.random()*this.canvas.width/tc);
		ay=Math.floor(Math.random()*this.canvas.height/tc);
	}
	ctx.fillStyle="red";
	ctx.fillRect(ax*gs,ay*gs,gs-2,gs-2);
}
function keyPush(evt) {
	switch(evt.keyCode) {
		case 37:
			xv=-1;yv=0;
			break;
		case 38:
			xv=0;yv=-1;
			break;
		case 39:
			xv=1;yv=0;
			break;
		case 40:
			xv=0;yv=1;
			break;
	}
}