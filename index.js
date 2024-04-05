const canvas = document.querySelector('canvas');
const c = canvas.getContext('2d');                      // c is short for context and this is what we will use to reference for our game
const collisionArrays = [];
const battlePatchArrays = [];
const boundaries = [];
const battlePatches = [];

canvas.width = 1440;
canvas.height = 810;                                    

// images used in the project
// the map
const backgroundImage = new Image()
backgroundImage.src = '../img/Pokemon_map.png'

// the foreground for when the player moves behind objects
const foregroundImage = new Image()
foregroundImage.src = '../img/foregroundObject.png'

// player image 
const playerImage = new Image();
playerImage.src = '../img/playerRight.png';

// when battle is activated
const battleImage = new Image()
battleImage.src = '../img/battleBackground.png'

// drake image
const drakeImage = new Image();
drakeImage.src = '../img/drakeSprite.png'

// beezleBlaze image
const beezleBlazeImage = new Image();
beezleBlazeImage.src = '../img/beezleBlazeSprite.png'

const offset = {
    x: -600,
    y: -480
}

// sprite class used to render all object that move along with the player
// this class includes position object with properties of x and y with offset included
// an image property
// frames object with properties of max and val 

// sprite for background
const background = new Sprite(          
    {
        position: {
            x: offset.x,
            y: offset.y
        },
        image: backgroundImage,
        frames: {
            max: 1,
            val: 0
        }
});

// sprite for player
const player = new Sprite(                                       
    {
        position: {
            // centers the player image relative to the canvas size
            x: (canvas.width / 1.6 - playerImage.width),
            y: (canvas.height / 2 - playerImage.height)
        },
        image: playerImage,
        frames: {
            // max is 4 because of walking animation
            max: 4,
            val: 0
        }
});

// sprite for foreground
const foreground = new Sprite(
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

// sprite for battle background image
const battleBackground = new Sprite( {
    //position
    position: {
        x: 0,
        y: 0
    },
    // image
    image: battleImage,
    // frames
    frames: {
        max: 1,
        val: 0
    }
});

const drake = new Sprite({
    position: {
        x: 1130,
        y: 180
    },
    image: drakeImage,
    frames: {
        max: 4,
        val: 0
    },
    animate: true
});

const beezleBlaze = new Sprite({
    position: {
        x: 420,
        y: 500
    },
    image: beezleBlazeImage,
    frames: {
        max: 4,
        val: 0
    },
    animate: true
}); 

let lastKey = '';

// object of keys with wasd as nested objects and a property of pressed (boolean)
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
            player.animate = false;
            player.frames.val = 0;            
            break;
        case 'a':
            keys.a.pressed = false;
            player.animate = false;
            player.frames.val = 0;
            break;
        case 's':
            keys.s.pressed = false;
            player.animate = false;
            player.frames.val = 0;
            break;
        case 'd':
            keys.d.pressed = false;
            player.animate = false;
            player.frames.val = 1;
            break;
    }
});

// this loop creates a nested array with a length of 70
// this will be used to create boundaries for the player and create zones for the battle patches
for (let i = 0; i < collisions.length; i += 70) {
    collisionArrays.push(collisions.slice(i, i + 70));
    battlePatchArrays.push(battlePatchOrigin.slice(i, i + 70));
}

// this is able to render the exact position of each boundary by the map size (40px by 70px)
collisionArrays.forEach((row, i) =>{
    row.forEach((num, j) => {
        if(num == 1025) {
            boundaries.push(new Boundary({position: {
                x: j * Boundary.width + (offset.x),
                y: i * Boundary.height + (offset.y)
            }}))
        }
    })
});

// this allows the collision of battle patches to detect player
battlePatchArrays.forEach((row, i) =>{
    row.forEach((num, j) => {
        if(num == 1025) {
            battlePatches.push(new Boundary({position: {
                x: j * Boundary.width + (offset.x),
                y: i * Boundary.height + (offset.y)
            }}))
        }
    })
});

// battle object to initiate (activate) battle
const battle =  {
    initiated: false
}

// array of sprites that move sprites and for easier reading *** not for battle background ***
const movables = [background, foreground, ...boundaries, ...battlePatches];

// for starting position so they wont look like they have their leg up
player.frames.val = 1;                                                                      

// for smooth starting transition
gsap.to('.battle-container', {
    opacity: 0
});

// calls function animate
animate();  

// animate function that animates all backgrounds and movement and whether or not you are on a battle patch
// once in a battle make animations stop
function animate() {

    // test ending frame with console.log(animationId)
    const animationId = window.requestAnimationFrame(animate);


    // draw method for sprite class
    background.draw();

    // draws each Boundary class object
    boundaries.forEach(boundary => {
        boundary.draw();
    })
    // draws each Boundary class object for battle zones
    battlePatches.forEach(battlePatch => {
        battlePatch.draw();
    }) 

    // draws player
    player.draw();
    
    // draws foreground
    foreground.draw();
    
    // boolean to stop movement animation
    player.animate = false;

    if(battle.initiated) return;

    if(keys.w.pressed
    || keys.a.pressed
    || keys.s.pressed
    || keys.d.pressed) {
        for(let i = 0; i < battlePatches.length; ++i) {
            const battleZone = battlePatches[i];

            // comparing two positions to check which is greater at that moment (also checks when they are about to collide)
            const overlappingArea =
            // this checks the minimum of the of either the player position or battle zone    
            (Math.min(player.position.x + player.width, battleZone.position.x + battleZone.width) -
            // subtracts it with the max position of each, without player width (68px) and battlezone width (48px) 
            Math.max(player.position.x, battleZone.position.x))
            // same thing except with height and we multipy these two to see later compare with the position of the the player at any given moment
            * (Math.min(player.position.y + player.height, battleZone.position.y + battleZone.height) - 
            Math.max(player.position.y, battleZone.position.y))  

            // this checks when the a battle zone is near and it has extra AND conditions
            if(checkCollision({ rect1: player, rect2: battleZone})
            // this condition is comparing the overlapping result with half the surface area of the player
            && (overlappingArea > (player.width * player.height) / 2)
            // this is how often this condition is triggered which is 1/100 of the time... this is compared every movement animation frame
            && (Math.random() < 0.01) ) {
                // deactivate current animation loop
                window.cancelAnimationFrame(animationId);
                battle.initiated = true;
                // flashing sequence transition
                gsap.to('.battle-container', {
                    // make the black container visible
                    opacity: 1,
                    // repeat it three times from 0, 1, 0 in terms of opacity
                    repeat: 4,
                    // this allows it to smooth out much better from  0, 1, .5, 1 in terms of opacity
                    yoyo: true,
                    // the duration of each sequence which is 0.3 seconds
                    duration: 0.3,

                    // once the transition animation is done
                    onComplete() {
                        // new animation loop
                        animateBattle();
                        // make battle container invisible with this
                        gsap.to('.battle-container', {      
                            opacity: 0,
                            duration: 0.5,
                        })

                    }
                })

            }
        }
    }

    // lastkey is used as a truth or false for AND logic
    // checking whether movement keys are pressed and when pressed move
    if(keys.w.pressed && lastKey === 'w') {             
        // changes the direction the player object is facing respective to the key pressed moved to front for priority
        player.image.src = '/img/playerUp.png'

        // this changes boolean which allows the image to make it seem like walking
        player.animate = true;

        // this for loop checks the collision of player and boundary
        for(let i = 0; i < boundaries.length; i++) {
            // variable is every boundary in the game
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
                // once player hits boundary then it stops all movement animation
                player.animate = false;
                // this helps with not making the player look like its running into a wall
                player.frames.val = 0;
                // break animation loop
                break;
            }
            
        }

        // this loop animates all moveables (background, foreground, ...boundaries, ...battlePatches)
        movables.forEach(item => {
            // only moves if moving boolean is true
            if(player.animate) {
                // the rate at which all things move in any given direction (north, east, south, west)
                item.position.y += 2;
            }
        })

    } else if(keys.a.pressed && lastKey === 'a') {
        player.image.src = '/img/playerLeft.png'
        player.animate = true;

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
                player.animate = false;
                player.frames.val = 0;
                break;
            }

        }

        movables.forEach(item => {
            if(player.animate) {
                item.position.x += 2;
            }
        })

    } else if(keys.s.pressed && lastKey === 's') {
        player.image.src = '/img/playerDown.png';
        player.animate = true;

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
                player.animate = false;
                player.frames.val = 0;
                break;
            }
            
        }

        movables.forEach(item => {
            if(player.animate) {
                item.position.y -= 2;
            }
        })

    } else if(keys.d.pressed && lastKey === 'd') {
        player.image.src = '/img/playerRight.png'
        player.animate = true;

        for(let i = 0; i < boundaries.length; i++) {
            const boundary = boundaries[i];
            if(checkCollision(
            {   
                rect1: player,
                rect2: {
                    ...boundary, 
                    position: {
                        x: boundary.position.x - 3,
                        y: boundary.position.y
                    }
                }
            }))
            {
                player.animate = false;
                player.frames.val = 1;
                break;
            }

        }

        movables.forEach(item => {
            if(player.animate) {
                item.position.x -= 2;
            }
        })
    }
}

// this is the function of animation of battle
function animateBattle() {
    // calls on for many frames per second
    window.requestAnimationFrame(animateBattle);
    // draws background every time frame is called
    battleBackground.draw();
    // draws beezleBlaze sprite
    beezleBlaze.draw();
    // draws drake
    drake.draw();
}

//check collision function that parameters holds a nested object that are rectangles
function checkCollision({rect1, rect2}) {
    // this checks whether or not the boundaries position are about to be equal to the players position
    return (
        rect1.position.x + rect1.width >= rect2.position.x
        && rect1.position.y + rect1.height >= rect2.position.y
        && rect1.position.x <= rect2.position.x + rect2.width
        && rect1.position.y <= rect2.position.y + rect2.height
    )     
}