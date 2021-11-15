var canvas = document.getElementById("canvas");
var ctx = canvas.getContext("2d");

var width = canvas.width;
var height = canvas.height;


//Função mais importante do código : pausa 
function sleep(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
};


var rect = function (x, y,  fillRect){
    ctx.fillStyle = fillRect;
    ctx.fillRect(x, y, 10, 10);
};

var drawBorder = function () {
    ctx.fillStyle= "#EAF5ED";
    ctx.fillRect(0,0,width, height);
    ctx.fillStyle = "Gray";
    ctx.fillRect(0, 0, width, 10);
    ctx.fillRect(0, height - 10, width, 10);
    ctx.fillRect(0, 0, 10, height);
    ctx.fillRect(width - 10, 0, 10, height);
};

var drawMalha = function () {
    var x = 10;
	for(var i = 0; i < width ; i += 1) {
        ctx.fillStyle = "Gray";
        ctx.fillRect(x, 10, 1, height-20);
        x = x + 10;
	};

    var y = 10;
    for(var i = 0; i < height ; i += 1) {
        ctx.fillStyle = "Gray";
        ctx.fillRect(10, y, width - 20, 1);
        y = y + 10;
	};
};

// Iteração 
var Write = function (time) {
    ctx.font = "20px Courier";
    ctx.textAlign = "left";
    ctx.textBaseline = "top";
    ctx.fillStyle = "Gray";
    ctx.fillRect(80, 155, 145,50);
    ctx.fillStyle = "Yellow";
    ctx.fillText("Iterações:" + time, 80, 170);
};
   

async function rasterCircle(r){
    cx = 250;
    cy = 250;
    
    var hm = 1 - r ;
    var x = 0; 
    var y = -r;
    
    rect(cx, cy , "Black")
    rect(cx, cy + r, "Black");
    rect(cx, cy - r, "Black");
    rect(cx + r, cy, "Black");
    rect(cx - r, cy, "Black");

    while (x  < -(y + 10)  ) {

        if (hm < 0){
            hm = hm + 2*x + 3;
        } else {
            hm = hm + 2*x + 2*y + 5;
            y = y + 10;
        };

        x = x + 10;

        await sleep(2000);

        rect(cx - x, cy - y, "Black");
        rect(cx + x, cy - y, "Red");

        rect(cx + y, cy - x, "Purple");
        rect(cx + y, cy + x, "Pink");

        rect(cx + x, cy + y, "Green");
        rect(cx - x, cy + y, "Blue");

        rect(cx - y, cy + x, "Orange");
        rect(cx - y, cy - x, "Yellow");
            
    };

    clearInterval(intervalId);
};
   
drawBorder();
drawMalha();

var time = 0;
var x = 0;


var intervalId = setInterval(function () {
    ctx.clearRect(0, 0, width, height);
    drawBorder();
    drawMalha();
    ctx.fillStyle= "rgba(22,3, 32 ,0.3)";
    ctx.fillRect(250 + x, 10 , 10 , height-20);
    rasterCircle(220);
    Write(time + 1);
    x = x + 10;
    time = time+1;
    }, 2000);

