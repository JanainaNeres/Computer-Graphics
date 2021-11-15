var canvas = document.getElementById("canvas");
var ctx = canvas.getContext("2d");


//var size = 0;
//setInterval(function () {
 //ctx.clearRect(0, 0, 1300, 200);
 //ctx.fillRect(0, 0, size, 200);
 //size++;
 //if (size > 1300) {
 //size = 0;
 //}
//}, 300);

var circle = function (x, y, radius, fillCircle) {
    ctx.beginPath();
    ctx.arc(x, y, radius, 0, Math.PI * 2, false);
    if (fillCircle) {
    ctx.fill();
    } else {
    ctx.stroke();
    }
};

var update = function (coordinate) {
     var offset = Math.random() *4 -2 ;
     coordinate += offset;
     if (coordinate > 400) {
     coordinate = 400;
     }
     if (coordinate < 0) {
     coordinate = 0;
     }
     return coordinate;
};

var drawBee = function (x, y, cor) {
     ctx.lineWidth = 3;
     ctx.strokeStyle = "Black";
     ctx.fillStyle = cor;
    
     circle(x, y, 8, true);
     circle(x, y, 8, false);
     circle(x - 5, y - 11, 5, true);
     circle(x + 5, y - 11, 5, true);
     circle(x - 2, y - 1, 2, false);
     circle(x + 2, y - 1, 2, false);
};

var x1 = 50;
var y1 = 30;

var x = 40;
var y = 40;

var x2 =70;
var y2 =30;

var x3 = 70;
var y3 = 29;

setInterval(function () {

     //ctx.clearRect(0, 0, 1000, 1000);
     drawBee(x, y, "Blue");
     x = update(x);
     y = update(y);

     drawBee(x1, y1, "White");
     x1 = update(x1);
     y1 = update(y1);

     drawBee(x2, y2,"Yellow");
     x2 = update(x2);
     y2 = update(y2);

     drawBee(x3, y3,"LimeGreen");
     x3 = update(x3);
     y3 = update(y3);

     ctx.strokeStyle = "Black";
    ctx.strokeRect(0, 0, 400, 400);
    
}, 2);



