function Ball(){
    this.update =  BallUpdate;
    this.draw =  BallDraw;
    this.loc = new Location(365, 540);
    this.size = new Location(25, 12);
    this.field = null;

    this.rotation = -135.055;
    this.speed = 10;

    this.isMoving = false;
    this.delay_feet = 0;
    this.DEFAULT_DELAY = 1;
    this.feet_statuses = ["center", "forward", "center", "backward"];
    this.left_foot_cur_status = 0; 
    this.right_foot_cur_status = 0;
}

function  BallUpdate(field){
    this.field = field;
    this.isMoving = false;
    if(isKeyPressed('D')){
        this.isMoving = true;
        this.rotation = 0.75 * (2*Math.PI);
    }
    if(isKeyPressed('A')){
        this.rotation = 0.25 * (2*Math.PI);
        this.isMoving = true;
    }
    if(isKeyPressed('W')){
        this.isMoving = true;
        this.rotation = 0.5 * (2*Math.PI);
        if(isKeyPressed('A')){
            this.rotation = 0.375 * (2*Math.PI);
        }else if(isKeyPressed('D')){
            this.rotation = 0.625 * (2*Math.PI); 
        }
    }
    if(isKeyPressed('S')){
        this.isMoving = true;
        this.rotation = 0;
        if(isKeyPressed('A')){
            this.rotation = 0.125 * (2*Math.PI);
        }else if(isKeyPressed('D')){
            this.rotation = 0.875 * (2*Math.PI); 
        }
    }
    
    if(this.isMoving){
        // We are moving
        this.loc.x -= this.speed * Math.sin(this.rotation);
        this.loc.y += this.speed * Math.cos(this.rotation);
        
        if(this.delay_feet >  0){
            // Not on this loop
            this.delay_feet -= 1;
        }else{
            // Move the feet and reset the counter
            this.delay_feet = this.DEFAULT_DELAY;
            if(this.left_foot_cur_status == 0 && this.right_foot_cur_status == 0){
                // Moving off so set the initial state
                this.left_foot_cur_status = 1;
                this.right_foot_cur_status = 3;
            }else{
                // We are cycling through the feet statuses
                this.left_foot_cur_status += 1;
                this.right_foot_cur_status += 1;
                if(this.left_foot_cur_status > this.feet_statuses.length){
                    this.left_foot_cur_status = 0;
                }
                if(this.right_foot_cur_status > this.feet_statuses.length){
                    this.right_foot_cur_status = 0;
                }
            }
        }
    }else{
        // We are stood still - center the feet
        this.left_foot_cur_status = 0; 
        this.right_foot_cur_status = 0;
        this.delay_feet = 0;
    }

    // Check bounds of the pitch - can't run into the stands
    if(this.loc.x < 70){
        this.loc.x = 70;
    }
    if(this.loc.x > field.size.x - 45){
        this.loc.x = field.size.x -45;
    }

    if(this.loc.y < 50){
        this.loc.y = 50;
    }
    if(this.loc.y > field.size.y - 40){
        this.loc.y = field.size.y - 40;
    }
    
    // descobrir se precisamos alterar o deslocamento de campo com base em nossa localização
    if( (field.size.x - this.loc.x) < (field.screen_dim.x/2) ){
        field.offset.x = field.size.x - field.screen_dim.x;
    }else if(this.loc.x > (field.screen_dim.x/2) ){
        field.offset.x = this.loc.x - (field.screen_dim.x/2);
    }
    if( (field.size.y - this.loc.y) < (field.screen_dim.y/2) ){
        field.offset.y = field.size.y - field.screen_dim.y;
    }else if( this.loc.y > (field.screen_dim.y/2) ){
        field.offset.y = this.loc.y  - (field.screen_dim.y/2);
    } 
}

function  BallDraw(ctx){
    ctx.strokeStyle = "black";

    var draw_x = this.loc.x;
    if( (field.size.x - this.loc.x) < (field.screen_dim.x/2) ){
        draw_x = field.screen_dim.x  - (field.size.x - this.loc.x);
    }else if(this.loc.x > (this.field.screen_dim.x /2)){
        draw_x =  (this.field.screen_dim.x /2);
    }
    
    var draw_y = this.loc.y;
    if( (field.size.y - this.loc.y) < (field.screen_dim.y/2) ){
        draw_y = field.screen_dim.y  - (field.size.y - this.loc.y);
    }else if(this.loc.y > (this.field.screen_dim.y /2)){
        draw_y =  (this.field.screen_dim.y /2);
    }


    //Ball
    ctx.fillStyle = "WHITE";
    ctx.beginPath();
    var feet_offset = this.size.x* 0.07;
   
    var nudge_amount = this.size.y * 2.7;
    var new_foot_x = (draw_x - (this.size.x/2)) + (feet_offset * Math.cos(this.rotation)) - (nudge_amount * Math.sin(this.rotation));
    var new_foot_y = (draw_y - (this.size.y/2)) + (feet_offset * Math.sin(this.rotation)) + (nudge_amount * Math.cos(this.rotation));
    var ball_size = parseInt(this.size.y * 0.95);
    ctx.beginPath();
    ctx.ellipse(new_foot_x, new_foot_y, ball_size, ball_size, 0, 0, 2 * Math.PI);
    ctx.fill();

}