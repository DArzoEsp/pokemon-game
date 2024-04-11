const canvas = document.querySelector('canvas');
const canvasContext2D = canvas.getContext('2d');

canvas.width = 1440;
canvas.height = 810;    

const animationId = 0;
const animationBattleId = 0;

const blackContainer = document.querySelector('.black-transition');
const textBox = document.querySelector('.movement-instructions');
const interface = document.querySelector('.interface-container');
const run = document.querySelector('.run');

const attack1 = document.querySelector('.attack_1');
const attack2 = document.querySelector('.attack_2');

const boundaryZoneArrays = [];
const battleZoneArrays = [];
const boundaryZone = [];
const battleZone = [];

const chanceToBattle = 0.01;

const backgroundMapImage = new Image()
backgroundMapImage.src = '../img/Pokemon_map.png'

const foregroundImage = new Image()
foregroundImage.src = '../img/foregroundObject.png'

const playerImageRight = new Image();
playerImageRight.src = '../img/playerRight.png';

const playerImageLeft = new Image();
playerImageLeft.src = '../img/playerLeft.png';

const playerImageDown = new Image();
playerImageDown.src = '../img/playerDown.png';

const playerImageUp = new Image();
playerImageUp.src = '../img/playerUp.png';

const battleImage = new Image()
battleImage.src = '../img/battleBackground.png'

const drakeImage = new Image();
drakeImage.src = '../img/drakeSprite.png'

const beezleBlazeImage = new Image();
beezleBlazeImage.src = '../img/beezleBlazeSprite.png'

const offset = {
    x: -600,
    y: -480
}

const playerOffset = {
    x: 730,
    y: 350
}

const drakeOffset = {
    x: 1130,
    y: 180
}

const beezleBlazeOffset = {
    x: 420,
    y: 500
}

const backgroundMaxFrames = 1;
const characterMaxFrames = 4;

const playerHoldFrames = 25;
const fighterHoldFrames = 40;

const backgroundMap = new Sprite({
        position: {
            x: offset.x,
            y: offset.y
        },
        image: backgroundMapImage,
        frames: {
            max: backgroundMaxFrames
        }
});

const foreground = new Sprite(
    {
        position: {
            x: offset.x,
            y: offset.y
        },
        image: foregroundImage,
        frames: {
            max: backgroundMaxFrames
        }
});

const battleBackground = new Sprite( {
    position: {
        x: 0,
        y: 0
    },
    image: battleImage,
    frames: {
        max: backgroundMaxFrames
    }
});

const player = new Sprite(                                       
    {
        position: {
            x: playerOffset.x,
            y: playerOffset.y
        },
        image: playerImageRight,
        frames: {
            max: characterMaxFrames,
            hold: playerHoldFrames
        }
});

const drake = new Sprite({
    position: {
        x: drakeOffset.x,
        y: drakeOffset.y
    },
    image: drakeImage,
    frames: {
        max: characterMaxFrames,
        hold: fighterHoldFrames
    },
    animate: true
});

const beezleBlaze = new Sprite({
    position: {
        x: beezleBlazeOffset.x,
        y: beezleBlazeOffset.y
    },
    image: beezleBlazeImage,
    frames: {
        max: characterMaxFrames,
        hold: fighterHoldFrames
    },
    animate: true
}); 

let lastKey = '';
let toggled = true;

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


window.addEventListener('keydown', (e) => {         
    switch(e.key) {
        case 'w':
            keys.w.pressed = true;          
            lastKey = 'w';
            break;
        case 'a':
            keys.a.pressed = true;                
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
        case 'Shift':
            if(toggled) {
                player.running = true;
                player.frames.hold = 15;
                toggled = false;
            } else {
                player.running = false;
                player.frames.hold = 25;
                toggled = true;
            }
            break;
    }
    
    if(e.keyCode ==  32) {
        removeTextBox(textBox);
    }

});

window.addEventListener('keyup', (e) => {               
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

attack1.addEventListener('click', () => {
    beezleBlaze.attack({
        attack: {
            name: 'Tackle',
            dmg: 10,
            type: 'Normal'
        },
        recipient: drake
    })
})

attack2.addEventListener('click', () => {
    beezleBlaze.attack({
        attack: {
            name: 'Blaze',
            dmg: 15,
            type: 'Fire'
        },
        recipient: drake
    })
})

for (let i = 0; i < boundaryZoneData.length; i += 70) {
    boundaryZoneArrays.push(boundaryZoneData.slice(i, i + 70));
    battleZoneArrays.push(battleZoneData.slice(i, i + 70));
}

boundaryZoneArrays.forEach((row, i) =>{
    row.forEach((num, j) => {
        if(num == 1025) {
            boundaryZone.push(new Boundary({position: {
                x: j * Boundary.width + (offset.x),
                y: i * Boundary.height + (offset.y)
            }}))
        }
    })
});

battleZoneArrays.forEach((row, i) =>{
    row.forEach((num, j) => {
        if(num == 1025) {
            battleZone.push(new Boundary({position: {
                x: j * Boundary.width + (offset.x),
                y: i * Boundary.height + (offset.y)
            }}))
        }
    })
});

// array of sprites that move sprites and for easier reading *** not for battle background ***
const movableBackgrounds = [backgroundMap, foreground, ...boundaryZone, ...battleZone];

// for starting position so they wont look like they have their leg up
player.frames.val = 1;                                                                      

// for smooth starting transition
gsap.to(blackContainer, {
    opacity: 0
});

// calls function animate
animate(animationId);  

function animate(animationId) {
    animationId = window.requestAnimationFrame(animate);
    backgroundMap.draw()
    player.draw();
    foreground.draw();

    boundaryZone.forEach(boundary => {
        boundary.draw();
    })
    battleZone.forEach(battlePatch => {
        battlePatch.draw();
    }) 

    player.animate = false;

    battleSequence(animationId);

    playerMovement();
    backgroundMovement();
}