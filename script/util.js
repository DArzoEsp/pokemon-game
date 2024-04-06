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