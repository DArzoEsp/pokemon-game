// created new sprite in order to make code cleaner
class Sprite {                                  
    // this will help in creating and helping the animation in order to loop and move camera and player
    constructor({position, image, frames = {max: 1, hold: 0}, animate = false}) {  
        this.position = position;
        this.image = image;
        this.frames = {...frames, val: 0, elapsed: 0};

        // only want to set width and height when image is loaded
        this.image.onload = () => {                             
            this.width = this.image.width / this.frames.max;
            this.height = this.image.height;
        }
        this.animate = animate;
        this.running = false;
    }

    draw() {
        // becomes object
        c.drawImage(                                   
        this.image,
        // x-axis where you want to start to crop image
        this.frames.val * this.width,     
        // y-axis where you want to start to crop image
        0,                                             
        // what portion of width do you want to leave so 1/4 cuz 4 images
        this.image.width / this.frames.max,            
        // height of image crop  --- ONLY CROPPING
        this.image.height,
        this.position.x,
        this.position.y,
        // declare what width the image should be render at
        this.image.width / this.frames.max,            
        // declare what height the image should be rendered at  --- ACTUAL COORDINATES
        this.image.height                               
        );

        if(!this.animate) return

        if(this.frames.max > 1) {
            this.frames.elapsed++;
        }

        if(this.frames.elapsed % this.frames.hold === 0) {
            if(this.frames.val < this.frames.max - 1) {
                this.frames.val++;
            } else {
                this.frames.val = 0;
            }
        }
    }
}

class Boundary {
    static width = 48;
    static height = 48;
    constructor({position}) {
        this.position = position;
        this.width = 48;
        this.height = 48;
    }

    draw() {
        c.fillStyle = 'rgba(255, 0, 0, 0)';
        c.fillRect(this.position.x, this.position.y, this.width, this.height);
    }
}