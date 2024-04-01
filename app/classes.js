class Sprite {                                  // created new sprite in order to make code cleaner
    constructor({position,image, frames = {max: 1}}) {  // this will help in creating and helping the animation in order to loop and move camera and player
        this.position = position;
        this.image = image;
        this.frames = {...frames, val: 0, elapsed: 0};

        this.image.onload = () => {                             // only want to set width and height when image is loaded
            this.width = this.image.width / this.frames.max
            this.height = this.image.height
        }
    }

    draw() {
        c.drawImage(                                   // becomes object
        this.image,
        this.frames.val,                                             // x-axis where you want to start to crop image
        0,                                             // y-axis where you want to start to crop image
        this.image.width / this.frames.max,            // what portion of width do you want to leave so 1/4 cuz 4 images
        this.image.height,                             // height of image crop  --- ONLY CROPPING
        this.position.x,
        this.position.y,
        this.image.width / this.frames.max,            // declare what width the image should be render at
        this.image.height                               // declare what height the image should be rendered at  --- ACTUAL COORDINATES
        );

        if(this.frames.max > 1) {
            this.frames.elapsed++;
        }

        if(this.frames.elapsed % 20 === 0) {
            if(this.frames.val < this.frames.max - 1) {
                this.frames.val += 48;
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

class BattlePatch {
    static width = 48;
    static height = 48;
    constructor({position}) {
        this.position = position;
        this.width = 48;
        this.height = 48;
    }
}