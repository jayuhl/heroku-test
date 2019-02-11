alert("Get ready to start the game...");

function runGame(canvas){
    // this.canvas = canvas;
    ctx  = canvas.getContext("2d");
    setInterval(update, 1);
    
    //Key Mover
    sprite1 = new sprite(30, 30, 50, 50, 0, 0, 2, "green");
    //Free Movers
    // sprite2 = new sprite(30, 30, 50, 50, 1, 1, 1, "red");
    // sprite3 = new sprite(80, 400, 50, 50, 1, 1, 1, "orange");

    enemies = [];
    enemies.push(new sprite(30, 30, 50, 50, 1, 1, 1, "red"));
    enemies.push(new sprite(300, 400, 50, 50, -1, 1, 1, "orange"));

}


function update() {
    // sprite2.moveFree(canvas);
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    for(i=0; i < enemies.length; i++){
        enemies[i].moveFree(canvas);
        enemies[i].update();
        enemies[i].draw(ctx);
    }
    // sprite2.update();
    sprite1.moveKey(canvas);
    sprite1.update();
    
    sprite1.draw(ctx);
    // sprite2.draw(ctx);
}

class sprite{
    constructor(x, y, w, h, dx, dy, moveSpeed, color) {
        this.x = x;
        this.y = y;
        this.w = w;
        this.h = h;
        this.dx = dx;
        this.dy = dy;
        this.moveSpeed = moveSpeed;
        this.color = color;
        this.up = false;
        this.down = false;
        this.left = false;
        this.right = false;
    }
    update(){
        this.x+=this.dx;
        this.y+=this.dy;
    }
    draw(ctx){
        ctx.fillStyle = this.color;
        ctx.fillRect(this.x, this.y, 50, 50);
        

        ctx.lineWidth = 5;
        ctx.strokeStyle = "black";
        ctx.strokeRect(this.x, this.y, 50, 50);
    }
    moveFree(canvas){
        if(this.x < 0 || this.x > canvas.width-this.w)
        this.dx=-this.dx;
        if(this.y < 0 || this.y > canvas.height-this.h)
        this.dy=-this.dy;
    }
    moveKey(canvas){
        if(this.up) this.dy = -this.moveSpeed;
        else if(this.down) this.dy = this.moveSpeed;
        else this.dy = 0;
        if(this.left) this.dx = -this.moveSpeed;
        else if(this.right) this.dx = this.moveSpeed;
        else this.dx = 0;

        if(this.x < -this.w)
            this.x = canvas.width;
        if(this.x > canvas.width)
            this.x = -this.w;
        if(this.y < -this.h)
            this.y = canvas.height;
        if(this.y > canvas.height)
            this.y = -this.h;
    }
    keyPressed(key){ //for objects that move with a key press
        if (key == 37) {
            this.left = true;
        }else if (key == 39) {
            this.right = true;
        }else if (key == 38) {
            this.up = true;
        }else if (key == 40) {
            this.down = true;
        }
    }
    keyReleased(key){ //for objects that move with a key press
        if (key == 37) {
            this.left = false;
        }else if (key == 39) {
            this.right = false;
        }else if (key == 38) {
            this.up = false;
        }else if (key == 40) {
            this.down = false;
        }
    }
    
}

window.onkeydown = function(e) {
    var key = e.keyCode ? e.keyCode : e.which;
    sprite1.keyPressed(key);
    // console.log(Math.floor(Math.random()*10));
}
window.onkeyup = function(e) {
    var key = e.keyCode ? e.keyCode : e.which;
    sprite1.keyReleased(key);
}