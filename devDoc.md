3/9/2024 4:00pm to 7:00pm
- created the canvas and the width and height

3/15/2024 4:00pm to 7:00pm
- Downloaded and installed Tiled 
            (https://www.mapeditor.org/)
- used this tileset by Cyprokdor
            (https://cypor.itch.io/12x12-rpg-tileset)
- created my map with various layers and details

3/18/2024 4:00pm to 7:00pm
- created boundaries and battle patches
- created a sprite class
- exported the whole map as Pokemon_map.png

3/20/2024 4:00pm to 7:00pm
- got context of canvas and displayed player and map and foreground map
- created player sprite class
- worked on animate function

3/24/2024 4:00pm to 7:00pm
- created draw function in order to animate
- event listeners for keydown and keyup for wasd
- movement for player sprite

3/27/2024 4:00pm to 7:00pm
- moved moving objects into an array 
- exported boundaries
- worked on boundary class

3/29/2024 4:00pm to 7:00pm
- exported boundaries array with colored red which was num 1025
- created boundaries and displayed them on map
- worked on checkCollision

4/1/2024 4:00pm to 7:00pm
- exported battlepatches and same as boundaries
- displayed on map 
- worked on battle zones

4/3/2024 4:00pm to 7:00pm
- detect battle zone and player
- battle initiated transition
- imported gsap for animation for this transition
version 3.9.1 
    <script src="https://cdnjs.cloudflare.com/ajax/libs/gsap/3.9.1/gsap.min.js"
            integrity="sha512-H6cPm97FAsgIKmlBA4s774vqoN24V5gSQL4yBTDOY2su2DeXZVhQPxFK4P6GPdnZqM9fg1G3cMv5wD7e6cFLZQ=="
            crossorigin="anonymous"
            referrerpolicy="no-referrer">
    </script>
(https://cdnjs.com/libraries/gsap/3.9.1)

4/4/2024 4:00pm to 7:00pm
- made battleBackground sprite in order to animate
- changed ratio from 1024px by 576px to 1440px by 810px
- created animateBattle sequence

4/5/2024 4:00pm to 7:00pm
- added running animation feature
- cleaned up a lot of messy code and as well as organized as to help the event loop for smoother loading
- added lots of comments in order to help understand whats happening

4/6/2024 1:00pm to 6:00pm
- adding pixel font for movement instructions
- added movement instruction text box with functionality
- creating interface with functionality
