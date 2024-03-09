const canvas = document.querySelector('canvas');

const c = canvas.getContext('2d'); // c is short for context and this is what we will use to reference for our game

canvas.width = 1024;
canvas.height = 576;  // ideal size for tv and desktop

c.fillStyle = 'white';
c.fillRect(0, 0, canvas.width, canvas.height);

const image = new Image()
image.src = '../img/Pokemon_map.png'

const playerImage = new Image();
playerImage.src = '../img/ACharRight.png'

image.onload = () => {                // requires three arguments to use draw image
    c.drawImage(image, -700, -600);         // used to wait until the image loads to draw image
    c.drawImage(playerImage, 630, 240);
}