class Sprite {                                  // created new sprite in order to make code cleaner
    constructor({                               // this will help in creating and helping the animation in order to loop and move camera and player
        position,
        velocity,
        image, 
        frames = {max: 1}                                       // constructor has position velocity and image. these will help change the position of the map and how many pixels they will move and what way they are facing with the image
    }) {
        this.position = position;
        this.image = image;
        this.frames = frames;
        this.image.onload = () => {                             // only want to set width and height when image is loaded
            this.width = this.image.width / this.frames.max
            this.height = this.image.height
        }

    }

    draw() {
        c.drawImage(                                   // becomes object
        this.image,
        0,                                             // x-axis where you want to start to crop image
        0,                                             // y-axis where you want to start to crop image
        this.image.width / this.frames.max,            // what portion of width do you want to leave so 1/4 cuz 4 images
        this.image.height,                             // height of image crop  --- ONLY CROPPING
        this.position.x,
        this.position.y,
        this.image.width / this.frames.max,            // declare what width the image should be render at
        this.image.height                             // declare what height the image should be rendered at  --- ACTUAL COORDINATES
        );
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