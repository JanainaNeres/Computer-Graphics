var canvas = document.getElementById("canvas");
var ctx = canvas.getContext("2d");

var width = canvas.width;
var height = canvas.height;

var blockSize = 100;
var widthInBlocks = width / blockSize;
var heightInBlocks = height / blockSize;


//Cores 
var le = "#110354";
var qe = "#09029E";
var um8e = "#0C0CCC";
var e = "#4169E1";

var ld =  "#3E1D61";
var qd = "#560861";
var um8d = "#8C0375";
var d = "#CC04AB";


function sleep(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
}
  

var Rect = function (x, y, width, height, fillRect){
    ctx.fillStyle = fillRect;
    ctx.fillRect(x, y, width, height);
};


var drawBorder = function () {
    Rect(0,0,width, height,"#010424");
    ctx.fillStyle = "Gray";
    Rect(0, 0, width, 10);
    Rect(0, height - 10, width, 10);
    Rect(0, 0, 10, height);
    Rect(width - 10, 0, 10, height);
};

//ctx.fillRect(x, y, width, height);
var drawDiv= function () {
    ctx.fillStyle = "Gray";
    Rect(0, width/4, width, 10); //1h
    Rect(0, width/2, width, 10);  //2h
    Rect(0, height-blockSize, width, 10);  //3h

    Rect((width/2)-10, 0, 10, height, "Gray");

    ctx.fillStyle = "Gray";
    Rect(width/4, 0, 10, height);  //1c
    Rect(width/2, 0, 10, height);  //2c
    Rect(height-blockSize, 0, 10, height); //3c
 
};

//ctx.fillRect(x, y, width, height)
async function drawDiv2 (x,y) {
    this.x = x;
    this.y = y;

    if (this.x < 200) {     
        await sleep(2000);
        Rect(0, 0, width/2, height, le);

        if (this.y  < 200) {
            //ctx.clearRect(0, 0,  width/2, height);
            await sleep(3000);
            Rect(0, 0, width/2, height/2,qe);

            if (this.x < 100) {
                await sleep(3000);
                //ctx.clearRect(0, 0,  width/2, height/2);
                Rect(0, 0, width/4, height/2, um8e);

                if (this.y  < 100) {
                    await sleep(3000);
                    //ctx.clearRect(0, 0,  width/4, height/2);
                    Rect(0, 0, width/4, height/4, e);
                    
                }else{
                    await sleep(3000);
                    //ctx.clearRect(0, 0,  width/4, height/2);
                    Rect(0, 100, width/4, height/4,e);
                }
                
            } else{
                await sleep(3000);
                //ctx.clearRect(0, 0,  width/2,height/2);
                Rect(width/4, 0, width/4, height/2, um8e);

                if (this.y  < 100) {
                    await sleep(3000);
                   // ctx.clearRect(0, 0,  width/4, height/2);
                    Rect(100, 0, width/4, height/4,e);
                }else{
                    await sleep(3000);
                    //ctx.clearRect(0, 0,  width/4, height/2);
                    Rect(100, 100, width/4, height/4,e);
                }

            }


         // y > 200 & x < 200 Q3
        }else{
            await sleep(3000);
            //ctx.clearRect(0, 0,  width/2, height);
            Rect(0, width/2, width/2, height/2, qe);
            if (this.x < 100) {
                await sleep(3000);
                //ctx.clearRect(0, width/2,  width/2, height/2);
                Rect(0, height/2, width/4, height/2, um8e);

                if (this.y  > 300) {
                    await sleep(3000);
                    //ctx.clearRect(0, 0,  width/4, height/2);
                    Rect(0, height-100, width/4, height/4, e);
                }else{
                    await sleep (3000);
                    //ctx.clearRect(0, 0,  width/4, height/2);
                    Rect(0, height/2, width/4, height/4,e);
                }
                
            }else{  // x > 100
                await sleep(3000);
                //ctx.clearRect(0, width/2,  width/2, height/2);
                Rect(width/4, height/2, width/4, height/2, um8e);

                if (this.y  > 300) {
                    await sleep(3000);
                    //ctx.clearRect(0, 0,  width/4, height/2);
                    Rect(width/4, height-100 , width/4, height/4,e);
                }else{
                    await sleep(3000);
                    //ctx.clearRect(0, 0,  width/4, height/2);
                    Rect(width/4, height/2, width/4, height/4,e);
                }

            }
        }  


        /// Aqui!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!111
        // x > 200 
    } else{    
        await sleep(2000);
        Rect(height/2, 0, width/2, height,ld); 
        if (this.y  < 200) {
            await sleep(3000);
            //ctx.clearRect(height/2, 0, width/2, height);
            Rect(height/2, 0, width/2, height/2, qd);
            if (this.x > 300) {
                await sleep(3000);
                //ctx.clearRect(height/2, 0, width/2, height/2);
                Rect(width -100, 0, width/2, height/2,um8d);

                if (this.y  < 100) {
                    await sleep(3000);
                    //ctx.clearRect(width -100, 0, width/2, height/2);
                    Rect(width-100, 0, width/4, height/4,d);
                }else{
                    await sleep(3000);
                    //ctx.clearRect(width -100, 0, width/2, height/2);
                    Rect(width-100, height/4, width/4, height/4,d);
                }
                
            }else{ // x < 300
                await sleep(3000);
                //ctx.clearRect(height/2, 0, width/2, height/2);
                Rect(width/2, 0, width/4, height/2,um8d);

                if (this.y  < 100) {
                    await sleep(3000);
                    //ctx.clearRect(width/2, 0, width/4, height/2);
                    Rect(width/2, 0, width/4, height/4,d);
                }else{
                    await sleep(3000);
                    //ctx.clearRect(width/2, 0, width/4, height/2);
                    Rect(width/2, height/4, width/4, height/4,d);
                }

            }
        }else{ // y > 200
            await sleep(3000);
            //ctx.clearRect(height/2, 0, width/2, height)
            Rect(height/2, height/2, width/2, height,qd);

            if (this.x > 300) {
                await sleep(3000);
                //ctx.clearRect(height/2, height/2, width/2, height);
                Rect(width-100, height/2, width/4, height/2,um8d);

                if (this.y  > 300) {
                    await sleep(3000);
                    //ctx.clearRect(width-100, height/2, width/4, height/2);
                    Rect(width-100, height-100, width/4, height/4,d);
                }else{
                    await sleep(3000);
                    //ctx.clearRect(width-100, height/2, width/4, height/2);
                    Rect(width-100, height/2, width/4, height/4,d);
                }
                
            }else{  // x < 300
                await sleep(3000);
                //ctx.clearRect(height/2, height/2, width/2, height)
                Rect(width/2, height/2, width/4, height/2,um8d);

                if (this.y  > 300) {
                    await sleep(3000);
                    //ctx.clearRect(width/2, height/2, width/4, height/2)
                    Rect(width/2, height-100 , width/4, height/4,d);
                }else{
                    await sleep(3000);
                    //ctx.clearRect(width/2, height/2, width/4, height/2);
                    Rect(width/2, height/2, width/4, height/4,d);
                }

            }

        }

    }
    
};

var Car = function (x, y) {
    this.x = x;
    this.y = y;
};
Car.prototype.draw = function () {
    var carHtml = '<img src="http://nostarch.com/images/car.png">';
    this.carElement = $(carHtml);
    this.carElement.css({
    position: "absolute",
    left: this.x,
    top: this.y,
    right: 60,
    height: 70
    });
    $("body").append(this.carElement);
};

var coordXs= [ 30, 
              130,
              230,
              330
];

var coordYs= [ 30, 
    130,
    230,
    330
];

drawBorder();
drawDiv();

var intervalId = setInterval(function () {
    var  coordX = coordXs[Math.floor(Math.random() * coordXs.length)];
    var  coordY = coordYs[Math.floor(Math.random() * coordYs.length)];
    
    var tesla = new Car(coordX,coordY);
    ctx.clearRect(0, 0, width, height);
    drawBorder();
    drawDiv();
    //tesla.draw();
    drawDiv2(coordX,coordY);
    Rect(coordX -30, coordY-30, 100,100, "Yellow");
}, 12000);


