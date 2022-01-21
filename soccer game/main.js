var FPS = 30; // target frames per second
var SECONDSBETWEENFRAMES = 1 / FPS;

var canvas = null;
var ctx = null;


var ball = null;
var player = null;
var field = null;

function update(){
    if(player != null){
        player.update(field);
    }

    if(ball != null){
        ball.update(field);
    }


}

function draw(ctx){
    ctx.fillStyle = 'green';
    ctx.fillRect(0,0,canvas.width, canvas.height);
    field.draw(ctx);
    player.draw(ctx);
    //ball.draw(ctx);

}

function gameloop(){
    update();
    draw(ctx);
}

$(document).ready(function(){
    canvas = document.getElementById('canvas');
    ctx = canvas.getContext('2d');

    field = new Field(canvas.width, canvas.height);
    player = new Player();
    //ball = new Ball();
    


    $(document).keydown(onKeyDown);
    $(document).keyup(onKeyUp);

    setInterval(gameloop, SECONDSBETWEENFRAMES*1000);
});