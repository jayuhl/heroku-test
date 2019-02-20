alert("Get ready to start the game...");

function runGame(canvas){
    ctx  = canvas.getContext("2d");
    paused = false;
    backColor = "lightgrey";
    currentBackColor = backColor;
    counter = 0;
    
    //Key Mover
    sprite1 = new sprite(200, 30, 50, 50, 0, 0, 2, "red");
    //Free Movers
    // sprite2 = new sprite(30, 30, 50, 50, 1, 1, 1, "red");
    // sprite3 = new sprite(80, 400, 50, 50, 1, 1, 1, "orange");

    enemies = [];
    // enemies.push(new sprite(30, 30, 100, 100, 0.1, 1, 1, "green"));
        // enemies.push(new sprite(0, 450, 50, 50, 1, -1, 1, "purple"));
        // enemies.push(new sprite(275, 100, 50, 50, 0, 0, 1, "black"));
enemies.push(new sprite(300, 400, 50, 50, -5, 5, 1, "orange"));
    enemies.push(new sprite(100, 400, 50, 50, 4, 1, 1, "blue"));
    enemies.push(new sprite(200, 200, 50, 50, 1, 1, 1, "cyan"));
    enemies.push(new sprite(400, 400, 50, 50, -1, -1, 1, "gray"));
    enemies.push(new sprite(400,100, 50, 50, -1, -1, 1, "magenta"));
    enemies.push(new sprite(50, 200, 50, 50, -1, 1, 1, "yellow"));


    enemies.push(new sprite(500, 200, 50, 50, -1, 1, 1, "lightgray"));
    enemies.push(new sprite(500, 400, 50, 50, -1, 1, 1, "mediumpurple"));
    enemies.push(new sprite(150, 100, 50, 50, -1, 1, 1, "navy"));
    enemies.push(new sprite(150, 300, 50, 50, -1, 1, 1, "darkcyan"));
enemies.push(new sprite(50, 400, 50, 50, -3, 3, 1, "darkseagreen"));

    timer = setInterval(update, 10);
}

function update() {
    counter++;
    // sprite2.moveFree(canvas);
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    ctx.fillStyle = currentBackColor;
    ctx.fillRect(0, 0, canvas.width, canvas.height);
    
    for(i=0; i < enemies.length; i++){
        enemies[i].updateFree(canvas);
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
        this.x += this.dx;
        this.y += this.dy;
    }
    updateFree(canvas){
        // console.log("enemy in updateFree " + this);
        for(var x=0; x < enemies.length; x++){
            if(enemies[x] !== this && this.collidingWith(enemies[x])){
                // console.log("COLLISION");
                this.resolveCollision(enemies[x]);
            }
            else
                this.moveFree(canvas);
        }
        this.update();
    }
    draw(ctx){
        // console.log("trying to draw " + this.x);
        ctx.fillStyle = "black";
        ctx.font = "40px Cooper Black";
        ctx.fillText(""+counter/100, 10, 50);
        ctx.fillStyle = this.color;
        ctx.fillRect(this.x, this.y, this.w, this.h);
        
        ctx.lineWidth = 5;
        ctx.strokeStyle = "black";
        ctx.strokeRect(this.x, this.y, this.w, this.h);
    }
    // //checks if NEXT location is already occupied
    // collidingWith(other){
    //     if(Math.abs((this.x + this.dx + this.w/2) - (other.x + other.dx + other.w/2)) <= this.w/2 + other.w/2
    //               && Math.abs((this.y + this.dy + this.h/2) - (other.y + other.dy + other.h/2)) <= this.h/2 + other.h/2){
    //         console.log((this.x + this.dx + this.w/2) + " " + (other.x + other.dx + other.w/2));
    //         return true;
    //     }
    //     else
    //         return false;
    // }

    //checks if NEXT location is already occupied
    collidingWith(other){
        if(Math.abs((this.x + this.dx + this.w/2) - (other.x + other.w/2)) <= this.w/2 + other.w/2
                  && Math.abs((this.y + this.dy + this.h/2) - (other.y + other.h/2)) <= this.h/2 + other.h/2){
            // console.log("x diff: " + (this.x + this.dx + this.w/2) + " " + (other.x + other.w/2) +
                        // "y diff: " + (this.y + this.dy + this.h/2) + " " + (other.y + other.h/2) + " " + this.color);
            return true;
        }
        else
            return false;
    }
    //a collision is imminent so bounce off each other
    resolveCollision(other){
        var angle = Math.atan((this.y+this.h/2-other.y-other.h/2)/(this.x+this.w/2-other.x-other.w/2));
        angle = angle*180/Math.PI;
        // console.log(angle);
        if(Math.abs(angle) < 45){
            if(this.dx*other.dx >= 0){ //moving in same horizontal direction
            //slower enemy should not to bounce if moving in same direction
                if(Math.abs(this.dx) > Math.abs(other.dx)){//this is faster so this bounces
                    this.dx *= -1;//console.log("hit slower L/R @ " + angle + "˚");
                }
            }
            else{ //moving in opposite directions so just bounce
                this.dx *= -1;//console.log("hit opposite L/R @ " + angle + "˚");
                other.dx *= -1;
            }
        }
        else{
            if(this.dy*other.dy >= 0){ //moving in same vertical direction
                //slower enemy should not to bounce if moving in same direction
                if(Math.abs(this.dy) > Math.abs(other.dy)){//this is faster so this bounces
                    this.dy *= -1;//console.log("hit slower U/D @ " + angle + "˚");
                }
            }
            else{ //moving in opposite directions so just bounce
                this.dy *= -1;//console.log("hit opposite U/D @ " + angle + "˚");
                other.dy *= -1;
            }
        }
    }
    // //a collision is imminent so bounce off each other
    // resolveCollision(other){
    //     var angle = Math.atan((this.y+this.w/2-other.y+other.w/2)/(this.x+this.h/2-other.x+other.h/2));
    //     // console.log(angle*180/Math.PI);
    //     if(Math.abs(angle*180/Math.PI) < 45){
    //         if(this.dx*other.dx > 0){ //moving in same horizontal direction
    //         //slower enemy should not to bounce if moving in same direction
    //             if(Math.abs(this.dx) > Math.abs(other.dx)){//this is faster so this bounces
    //                 this.dx *= -1;
    //             }
    //             else{
    //                 other.dx *= -1;
    //             }
    //         }
    //         else{
    //             this.dx *= -1;
    //             other.dx *= -1;
    //         }
    //     }
    //     else{
    //         if(this.dy*other.dy > 0){ //moving in same vertical direction
    //             //slower enemy should not to bounce if moving in same direction
    //             if(Math.abs(this.dy) > Math.abs(other.dy)){//this is faster so this bounces
    //                 this.dy *= -1;
    //             }
    //             else{
    //                 other.dy *= -1;
    //             }
    //         }
    //         else{
    //             this.dy *= -1;
    //             other.dy *= -1;
    //         }
    //     }
    // }
    moveFree(canvas){
        if(this.x + this.dx < 0 || this.x + this.w + this.dx > canvas.width)
            this.dx = -this.dx;
        if(this.y + this.dy < 0 || this.y +this.h + this.dy > canvas.height)
            this.dy = -this.dy;
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
    // console.log("sprite1 in keydown " + sprite1);
    if(key == 80){
        paused = !paused;
        if(paused)
            clearInterval(timer);
        else
            timer = setInterval(update, 1000);
    }
    if(key == 81){timer = setInterval(update, 10);}
}
window.onkeyup = function(e) {
    var key = e.keyCode ? e.keyCode : e.which;
    sprite1.keyReleased(key);
}

//Do not allow the arrow keys to scroll the page when playing the game
var arrow_keys_handler = function(e) {
    switch(e.keyCode){
        case 37: case 39: case 38:  case 40: // Arrow keys
        case 32: e.preventDefault(); break; // Space
        default: break; // do not block other keys
    }
};
window.addEventListener("keydown", arrow_keys_handler, false);