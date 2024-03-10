const canvas = document.querySelector('canvas');
const c = canvas.getContext('2d'); // c is short for context and this is what we will use to reference for our game

canvas.width = 1024;
canvas.height = 576;  // ideal size for tv and desktop

c.fillStyle = 'white';
c.fillRect(0, 0, canvas.width, canvas.height);

const image = new Image()
image.src = '../img/Pokemon_map.png'

const playerImage = new Image();
playerImage.src = '../img/playerRight.png';

class Sprite {                                  // created new sprite in order to make code cleaner
    constructor({                               // this will help in creating and helping the animation in order to loop and move camera and player
        position,
        velocity,
        image                                   // constructor has position velocity and image. these will help change the position of the map and how many pixels they will move and what way they are facing with the image
    }) {
        this.position = position;
        this.image = image;
    }

    draw() {
        c.drawImage(this.image, -850, -560);    // starting point for the image
    }
}

const background = new Sprite(                  // created background sprite in order to render new instance of Sprite class
    {
        position: {
            x: -850,
            y: -560
        },
        image: image
    });

const keys = {
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

function animate() {
    window.requestAnimationFrame(animate);
    background.draw()         // used to wait until the image loads to draw image
    c.drawImage(
        playerImage,
        0,                                              // x-axis where you want to start to crop image
        0,                                              // y-axis where you want to start to crop image
        playerImage.width / 4,                          // what portion of width do you want to leave so 1/4 cuz 4 images
        playerImage.height,                             // height of image crop  --- ONLY CROPPING
        (canvas.width / 2 - (playerImage.width / 4) / 2),     // x-axis of the sub-rect
        (canvas.height / 2 - playerImage.height / 2),   // y-axis of the sub-rect
        playerImage.width / 4,                          // declare what width the image should be render at
        playerImage.height                              // declare what height the image should be rendered at  --- ACTUAL COORDINATES
    );

    if(keys.w.pressed) {
        background.position.x += 10;
        background.image.src = '../img/playerUp.png'
    } else if(keys.a.pressed) {
        background.position.y += 10;
        background.image.src = '../img/playerLeft.png'

    } else if(keys.s.pressed) {
        background.position.x -= 10;
        background.image.src = '../img/playerDown.png'
        
    } else if(keys.d.pressed) {
        background.position.y -= 10;
        background.image.src = '../img/playerRight.png'

    }
}

animate();

window.addEventListener('keydown', (e) => {
    switch(e.key) {
        case 'w':
            keys.w.pressed = true;
            console.log(keys.w)
            break;
        case 'a':
            keys.a.pressed = true;
            console.log(keys.a)
            break;
        case 's':
            keys.s.pressed = true;
            console.log(keys.s)
            break;
        case 'd':
            keys.d.pressed = true;
            console.log(keys.d)
        
            break;
    }
    
});

window.addEventListener('keyup', (e) => {
    switch(e.key) {
        case 'w':
            keys.w.pressed = false;
            console.log(keys.w)
            break;
        case 'a':
            keys.a.pressed = false;
            console.log(keys.a)
            break;
        case 's':
            keys.s.pressed = false;
            console.log(keys.s)
            break;
        case 'd':
            keys.d.pressed = false;
            console.log(keys.d)
        
            break;
    }
    
});