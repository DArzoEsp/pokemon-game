const canvas = document.querySelector('canvas');
const c = canvas.getContext('2d');                      // c is short for context and this is what we will use to reference for our game
const collisionArray = [];
const battlePatchArray = [];

canvas.width = 1024;
canvas.height = 576;                                    // ideal size for tv and desktop

const offset = {
    x: -850,
    y: -560
}

for (let i = 0; i < collisions.length; i += 70) {
    collisionArray.push(collisions.slice(i, i + 70));
    battlePatchArray.push(battlePatch.slice(i, i + 70));
}

const boundaries = [];
const battlePatches = [];

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

battlePatchArray.forEach((row, i) =>{
    row.forEach((num, j) => {
        if(num == 1025) {
            battlePatches.push(new Boundary({position: {
                x: j * Boundary.width + (offset.x),
                y: i * Boundary.height + (offset.y)
            }}))
        }
    })
});

const image = new Image()
image.src = '../img/Pokemon_map.png'

const foregroundImage = new Image()
foregroundImage.src = '../img/foregroundObject.png'

const playerImage = new Image();
playerImage.src = '../img/playerRight.png';

const player = new Sprite(                                          // creates player object with respective properties assigned as needed
    {
        position: {
            x: (canvas.width / 2 - (playerImage.width / 2)),
            y: (canvas.height / 2 - (playerImage.height / 2)),
        },
        image: playerImage,
        frames: {
            max: 4,                                                  // frames are 4 because the image is 4 frames
            val: 0
        }
});

const background = new Sprite(                  // created background sprite in order to render new instance of Sprite class
    {
        position: {
            x: offset.x,
            y: offset.y
        },
        image: image,
        frames: {
            max: 1,
            val: 0
        }
});

const foreground = new Sprite(                  // created background sprite in order to render new instance of Sprite class
    {
        position: {
            x: offset.x,
            y: offset.y
        },
        image: foregroundImage,
        frames: {
            max: 1,
            val: 0
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

const movables = [background, foreground, ...boundaries, ...battlePatches];                 // moved all moving images into an array for better management and ease of reading
player.frames.val = 1;                                                                      // for starting position so they wont look like they have their leg up

function checkCollision({rect1, rect2}) {
    return (
        rect1.position.x + rect1.width >= rect2.position.x
        && rect1.position.y + rect1.height >= rect2.position.y
        && rect1.position.x <= rect2.position.x + rect2.width
        && rect1.position.y <= rect2.position.y + rect2.height
    )     
}

function animate() {
    window.requestAnimationFrame(animate);
    background.draw();
    boundaries.forEach(boundary => {
        boundary.draw();
    })
    battlePatches.forEach(battlePatch => {
        battlePatch.draw();
    })                                   // used to wait until the image loads to draw image
    player.draw();
    foreground.draw();

    let motion = true;

    if(keys.w.pressed
    || keys.a.pressed
    || keys.s.pressed
    || keys.d.pressed) {
        for(let i = 0; i < battlePatches.length; ++i) {
            const battleZone = battlePatches[i];
            const overlappingArea = (Math.min(player.position.x + player.width, battleZone.position.x + battleZone.width) - 
            Math.max(player.position.x, battleZone.position.x))
            * (Math.min(player.position.y + player.height, battleZone.position.y + battleZone.height) - 
            Math.max(player.position.y, battleZone.position.y))  // comparing two positions to check which is greater at that moment
            if(checkCollision(
            {
                rect1: player,
                rect2: battleZone
            }) &&
            (overlappingArea > (player.width * player.height) / 2)
            && Math.random() < 0.01 
            )
            {
                console.log('hello')
            }
        }
    }

    if(keys.w.pressed && lastKey === 'w') {             // lastkey is used as a truth or false for AND logic
        playerImage.src = '../img/playerUp.png'         // changes the direction the player object is facing respective to the key pressed
        player.moving = true;

        for(let i = 0; i < boundaries.length; i++) {
            const boundary = boundaries[i];
            if(checkCollision(
            {   
                rect1: player,
                rect2: {
                    ...boundary, 
                    position: {
                        x: boundary.position.x,
                        y: boundary.position.y + 3
                    }
                }
            }))
            {
            motion = false;
            break;
            }
            
        }

        movables.forEach(item => {
            if(motion) { 
                item.position.y += 3;                   // displays every boundary and as you move it stays put as well
            }
        })
    } else if(keys.a.pressed && lastKey === 'a') {
        playerImage.src = '../img/playerLeft.png'
        player.moving = true;

        for(let i = 0; i < boundaries.length; i++) {
            const boundary = boundaries[i];
            if(checkCollision(
            {   
                rect1: player,
                rect2: {
                    ...boundary, 
                    position: {
                        x: boundary.position.x + 3,
                        y: boundary.position.y
                    }
                }
            }))
            {
            motion = false;
            break;
            }
            
        }

        movables.forEach(item => {
            if(motion) { 
                item.position.x += 3;
            }
        })
    } else if(keys.s.pressed && lastKey === 's') {
        playerImage.src = '../img/playerDown.png';
        player.moving = true;
        for(let i = 0; i < boundaries.length; i++) {
            const boundary = boundaries[i];
            if(checkCollision(
            {   
                rect1: player,
                rect2: {
                    ...boundary, 
                    position: {
                        x: boundary.position.x,
                        y: boundary.position.y - 3
                    }
                }
            }))
            {
            motion = false;
            break;
            }
            
        }

        movables.forEach(item => {
            if(motion) { 
                item.position.y -= 3;
            }
        })
    } else if(keys.d.pressed && lastKey === 'd') {
        playerImage.src = '../img/playerRight.png'
        player.moving = true;
        for(let i = 0; i < boundaries.length; i++) {
            const boundary = boundaries[i];
            if(checkCollision(
            {   
                rect1: 
                
                
                player,
                rect2: {
                    ...boundary, 
                    position: {
                        x: boundary.position.x - 3,
                        y: boundary.position.y
                    }
                }
            }))
            {
            motion = false;
            break;
            }
            
        }

        movables.forEach(item => {
            if(motion) { 
                item.position.x -= 3;
            }
        })
    }

    motion = true;
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
            keys.a.pressed = true;                
            lastKey = 'a';                              // lastKey is used for movement in order to keep one way in case you press more than one
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

window.addEventListener('keyup', (e) => {               // changes key property 
switch(e.key) {
        case 'w':
            keys.w.pressed = false;
            player.moving = false;
            player.frames.val = 0;            
            break;
        case 'a':
            keys.a.pressed = false;
            player.moving = false;
            player.frames.val = 0;
            break;
        case 's':
            keys.s.pressed = false;
            player.moving = false;
            player.frames.val = 0;
            break;
        case 'd':
            keys.d.pressed = false;
            player.moving = false;
            player.frames.val = 1;
            break;
    }
    
});