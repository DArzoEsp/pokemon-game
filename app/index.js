const canvas = document.querySelector('canvas');
const c = canvas.getContext('2d');                      // c is short for context and this is what we will use to reference for our game
const collisionArray = [];

canvas.width = 1024;
canvas.height = 576;                                    // ideal size for tv and desktop

const offset = {
    x: -850,
    y: -560
}

for (let i = 0; i < collisions.length; i += 70) {
    collisionArray.push(collisions.slice(i, i + 70));
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
        c.fillStyle = 'red';
        c.fillRect(this.position.x, this.position.y, this.width, this.height);
    }
}

const boundaries = []

collisionArray.forEach((row, i) =>{
    row.forEach((num, j) => {
        if(num == 1025) {
            boundaries.push(new Boundary({position: {
                x: j * Boundary.width + (offset.x),
                y: i * Boundary.height + (offset.y)
            }}))
        }
    })
});

const image = new Image()
image.src = '../img/Pokemon_map.png'

const playerImage = new Image();
playerImage.src = '../img/playerRight.png';

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
            this.height = this.image.height / this.frames.max
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
        this.image.height                              // declare what height the image should be rendered at  --- ACTUAL COORDINATES
        );
    }
}

const background = new Sprite(                  // created background sprite in order to render new instance of Sprite class
    {
        position: {
            x: offset.x,
            y: offset.y
        },
        image: image,
        frames: {
            max: 1
        }
});

const player = new Sprite(                                          // creates player object with respective properties assigned as needed
    {
        position: {
            x: (canvas.width / 2 - (playerImage.width / 4) / 2),
            y: (canvas.height / 2 - playerImage.height / 2),
        },
        image: playerImage,
        frames: {
            max: 4                                                  // frames are 4 because the image is 4 frames
        }
});


const keys = {                                                      // keys object used for movement which is w a s d 
    w: {                            
        pressed: false
    },
    a: {
        pressed: false
    },
    s: {
        pressed: false
    },
    d: {
        pressed: false
    }
}

const movables = [background, ...boundaries];              // moved all moving images into an array for better management and ease of reading

function checkCollision() {
    boundaries.forEach(item => {        
        if(player.position.x + player.width >= item.position.x
        && player.position.y + player.height >= item.position.y
        && player.position.x + player.width <= item.position.x + item.width
        && player.position.y + player.height <= item.position.y + item.height
        ){
            console.log('hit')
        }
    })
}

function animate() {
    window.requestAnimationFrame(animate);
    background.draw()                                   // used to wait until the image loads to draw image
    player.draw()
    
    boundaries.forEach(boundary => {
        boundary.draw();
    })
    
    checkCollision();

    if(keys.w.pressed && lastKey === 'w') {             // lastkey is used as a truth or false for AND logic
        movables.forEach(item => {
            item.position.y += 3;                    // displays every boundary and as you move it stays put as well
        })
        playerImage.src = '../img/playerUp.png'         // changes the direction the player object is facing respective to the key pressed
    } else if(keys.a.pressed && lastKey === 'a') {
        movables.forEach(item => {
            item.position.x += 3;
        })
        playerImage.src = '../img/playerLeft.png'
    } else if(keys.s.pressed && lastKey === 's') {
        movables.forEach(item => {
            item.position.y -= 3;
        })
        playerImage.src = '../img/playerDown.png';
    } else if(keys.d.pressed && lastKey === 'd') {
        movables.forEach(item => {
            item.position.x -= 3;
        })
        playerImage.src = '../img/playerRight.png'
    }
}

animate();                                          // calls function animate

let lastKey;

window.addEventListener('keydown', (e) => {         // listens for w a s d keys to be pressed
    switch(e.key) {
        case 'w':
            keys.w.pressed = true;
            lastKey = 'w';
            break;
        case 'a':
            keys.a.pressed = true;                  // lastKey is used for movement in order to keep one way in case you press more than one
            lastKey = 'a';
            break;
        case 's':
            keys.s.pressed = true;
            lastKey = 's';
            break;
        case 'd':
            keys.d.pressed = true;
            lastKey = 'd';
            break;
    }
    
});

window.addEventListener('keyup', (e) => {               // changes key property pressed to false 
    switch(e.key) {
        case 'w':
            keys.w.pressed = false;
            break;
        case 'a':
            keys.a.pressed = false;
            break;
        case 's':
            keys.s.pressed = false;
            break;
        case 'd':
            keys.d.pressed = false;
            break;
    }
    
});