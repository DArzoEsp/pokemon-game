function removeTextBox(textBox) {
    gsap.to(textBox, {
        opacity: 0,
        onComplete() {
            textBox.remove();
        }
    })
}

function battleSequence(animationId) {
    if(keys.w.pressed
    || keys.a.pressed
    || keys.s.pressed
    || keys.d.pressed) {
            for(let i = 0; i < battleZone.length; ++i) {
                const battlePatch = battleZone[i];
                const overlappingArea = playerOverlap(battlePatch);
    
                if(checkCollision({ playerArea: player, zoneArea: battlePatch})
                && (overlappingArea > (player.width * player.height) / 2)
                && (Math.random() < chanceToBattle) ) {
                    window.cancelAnimationFrame(animationId);
                    transitionToBattle();
                }
            }
        }
}

function playerOverlap(battleZone) {
    return (Math.min(player.position.x + player.width, battleZone.position.x + battleZone.width) - Math.max(player.position.x, battleZone.position.x))
    * (Math.min(player.position.y + player.height, battleZone.position.y + battleZone.height) - Math.max(player.position.y, battleZone.position.y));
}

function transitionToBattle() {
    gsap.to(textBox, {
        opacity: 0,
        duration: 0.5
    })
    gsap.to(blackContainer, {
        opacity: 1,
        repeat: 4,
        yoyo: true,
        duration: 0.3,

        onComplete() {
            animateBattle(animationBattleId);
            gsap.to(blackContainer, {      
                opacity: 0,
                duration: 0.5,
            })
        }
    })
}

function animateBattle(animationBattleId) {
    animationBattleId = window.requestAnimationFrame(animateBattle);
    battleBackground.draw();
    beezleBlaze.draw();
    drake.draw();

    gsap.to(interface, {
        opacity: 1,
    });

    run.addEventListener('click', () => {
        gsap.to(interface, {
            opacity: 0
        });
        gsap.to(blackContainer, {
            opacity: 0
        })
        window.cancelAnimationFrame(animationBattleId);
        animate();
    })
}

function playerMovement() {
    const boundaryZoneOffset = 3;

    if(keys.w.pressed && lastKey === 'w') {             
        player.image = playerImageUp
        player.animate = true;

        for(let i = 0; i < boundaryZone.length; i++) {
            const boundary = boundaryZone[i];

            if(checkCollision(
            {   
                playerArea: player,
                zoneArea: {
                    ...boundary, 
                    position: {
                        x: boundary.position.x,
                        y: boundary.position.y + boundaryZoneOffset
                    }
                }
            }))
            {   
                player.animate = false;
                player.frames.val = 0;
                break;
            }
            
        }

    } else if(keys.a.pressed && lastKey === 'a') {
        player.image = playerImageLeft
        player.animate = true;

        for(let i = 0; i < boundaryZone.length; i++) {
            const boundary = boundaryZone[i];
            if(checkCollision(
            {   
                playerArea: player,
                zoneArea: {
                    ...boundary, 
                    position: {
                        x: boundary.position.x + boundaryZoneOffset,
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
    } else if(keys.s.pressed && lastKey === 's') {
        player.image = playerImageDown;
        player.animate = true;

        for(let i = 0; i < boundaryZone.length; i++) {
            const boundary = boundaryZone[i];
            if(checkCollision(
            {   
                playerArea: player,
                zoneArea: {
                    ...boundary, 
                    position: {
                        x: boundary.position.x,
                        y: boundary.position.y - boundaryZoneOffset
                    }
                }
            }))
            {
                player.animate = false;
                player.frames.val = 0;
                break;
            }   
        }
    } else if(keys.d.pressed && lastKey === 'd') {
        player.image = playerImageRight
        player.animate = true;

        for(let i = 0; i < boundaryZone.length; i++) {
            const boundary = boundaryZone[i];
            if(checkCollision(
            {   
                playerArea: player,
                zoneArea: {
                    ...boundary, 
                    position: {
                        x: boundary.position.x - boundaryZoneOffset,
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
    }
}

function checkCollision({playerArea, zoneArea}) {
    return (
        playerArea.position.x + playerArea.width >= zoneArea.position.x
        && playerArea.position.y + playerArea.height >= zoneArea.position.y
        && playerArea.position.x <= zoneArea.position.x + zoneArea.width
        && playerArea.position.y <= zoneArea.position.y + zoneArea.height
    )     
}

function backgroundMovement() {
    const walkingSpeed = 2;
    const runningSpeed = 3.3;

    if(keys.w.pressed) {
        movableBackgrounds.forEach(item => {
            if(player.running  && player.animate) {
                item.position.y += runningSpeed;
            } else if(player.animate) {
                item.position.y += walkingSpeed;
            } 
        })
    } else if(keys.a.pressed) {
        movableBackgrounds.forEach(item => {
            if(player.running && player.animate) {
                item.position.x +=  runningSpeed;
            } else if(player.animate) {
                item.position.x += walkingSpeed;
            } 
        })
    } else if(keys.s.pressed) {
        movableBackgrounds.forEach(item => {
            if(player.running && player.animate) {
                item.position.y -= runningSpeed;
            } else if(player.animate) {
                item.position.y -= walkingSpeed;
            }  
        })
    } else if(keys.d.pressed) {
        movableBackgrounds.forEach(item => {
            if(player.running && player.animate) {
                item.position.x -= runningSpeed;
            } else if(player.animate) {
                item.position.x -= walkingSpeed;
            }
        })
    }
}