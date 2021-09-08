class EnemyClass{
    constructor(Mesh, posX, posY){
        this.enemy = Mesh;
        this.enemy.alive = true;
        this.enemy.position.x = posX;
        this.enemy.position.y = posY;
        this.health = 5;
    }

    updateEnemy(){
        if(!this.enemy.alive)
            return;
        let disX = cube.position.x - this.enemy.position.x;
        let disY = cube.position.y - this.enemy.position.y;
    
        var hyp = Math.sqrt(disX*disX + disY*disY);
        //if(hyp < 20){
        disX /= hyp;
        disY /= hyp;
    
        this.enemy.position.x += disX*0.2 * .1;
        this.enemy.position.y += disY*0.2 * .1;
        
        this.enemy.lookAt(cube.position)
        //}
    }

    hitByBullet(b, scene){
        if(!this.enemy.alive)
            return;
        if(b.position.x >= this.enemy.position.x - 0.8  && b.position.x <= this.enemy.position.x + 0.8 && 
            b.position.y >= this.enemy.position.y - 0.8  && b.position.y <= this.enemy.position.y + 0.8){
                b.alive = false;
                scene.remove(b);
                this.health--;
                if(this.health == 0){
                    this.enemy.alive = false;
                    scene.remove(this.enemy);
                    delete(this);
                }
            }
    }
}

var pause = false;

const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera( 75, window.innerWidth / window.innerHeight, 0.1, 1000 );

const renderer = new THREE.WebGLRenderer();
renderer.setSize( window.innerWidth, window.innerHeight );
document.body.appendChild( renderer.domElement );

const geometry = new THREE.BoxGeometry();
const material = new THREE.MeshBasicMaterial( { color: 0x00ff00 } );
const cube = new THREE.Mesh( geometry, material );
scene.add( cube );


const redCube = new EnemyClass(new THREE.Mesh(geometry, new THREE.MeshBasicMaterial( { color: 0xff0000 } )), 10, 5);
const blueCube = new EnemyClass(new THREE.Mesh(geometry, new THREE.MeshBasicMaterial( { color: 0x0000ff } )), -5, -7);
scene.add(blueCube.enemy)
scene.add(redCube.enemy)

const geometryPlane = new THREE.PlaneGeometry(40, 19);
const materialPlane = new THREE.MeshBasicMaterial( { color: 0xff00ff } );
const plane = new THREE.Mesh(geometryPlane, materialPlane);

plane.position.y -= 1;

scene.add(plane);

camera.position.z = 15;

var target = new THREE.Vector3();

var mouseX = 0, mouseY = 0;

var windowHalfX = window.innerWidth / 2;
var windowHalfY = window.innerHeight / 2;


var moveForward = false;
var moveBackward = false;
var moveLeft = false;
var moveRight = false;

var bullets = [];

function resize() {
    renderer.setSize(window.innerWidth, window.innerHeight);
    camera.aspect = window.innerWidth / window.innerHeight;
    camera.updateProjectionMatrix();

    windowHalfX = window.innerWidth / 2;
    windowHalfY = window.innerHeight / 2;
}

document.addEventListener( 'mousemove', onDocumentMouseMove, false );
document.addEventListener( 'keydown', onDocumentKeyDown, false );
document.addEventListener( 'keyup', onDocumentKeyUp, false );
//document.addEventListener( 'click', onClick, false );

window.addEventListener("gamepadconnected", function(e) { gamepadHandler(e, true); }, false);
window.addEventListener("gamepaddisconnected", function(e) { gamepadHandler(e, false); }, false);

var gamepads = {};

function gamepadHandler(event, connecting) {
  var gamepad = event.gamepad;
  // Note:
  // gamepad === navigator.getGamepads()[gamepad.index]

  if (connecting) {
    gamepads[gamepad.index] = gamepad;
    console.log(gamepads)
  } else {
    delete gamepads[gamepad.index];
  }
}


/*function onClick( ) {
    
    var directionX = mouseX - cube.rotation.x; 
    var directionY = mouseY - cube.rotation.y; 
    var length = Math.sqrt( directionX*directionX + directionY*directionY);
    directionX /= length;
    directionY /= length;

    var bullet = new THREE.Mesh(
       new THREE.SphereGeometry(0.1,8,8),
       new THREE.MeshBasicMaterial({color:0xffffff})
       );
    bullet.position.set(cube.position.x, cube.position.y, cube.position.z)
    bullet.velocity = new THREE.Vector3(
        directionX *0.1,
        -directionY * 0.1,
        0
        
    );
    
    bullet.alive = true;
    setTimeout(
        function(){
            bullet.alive = false;
            scene.remove(bullet);
        },
        1000);
        bullets.push(bullet);
    scene.add(bullet);
}*/

function onDocumentMouseMove( event ) {
    
    mouseX = ( event.clientX - windowHalfX )
    mouseY = ( event.clientY - windowHalfY )
    

}


function onDocumentKeyDown( event ) {
    
    switch ( event.code ) {
        case 'KeyW':

            moveForward = true;
            break;

        case 'KeyA':

            moveLeft = true;
            break;

        case 'KeyS':

            moveBackward = true;
            break;

        case 'KeyD':

            moveRight = true;
            break;

        case 'ArrowUp':

            spawnBullet(new THREE.Vector3(
                0,
                1 *0.1,
                0
            ))
            break;

        case 'ArrowDown':

            spawnBullet(new THREE.Vector3(
                0,
                -1 *0.1,
                0
            ))
            break;
        case 'ArrowLeft':
            
            spawnBullet(new THREE.Vector3(
                -1 *0.1,
                0,
                0
            ))
            break;
        case 'ArrowRight':
            spawnBullet(new THREE.Vector3(
                1 *0.1,
                0,
                0
            ))
            break;

    }

}


function onDocumentKeyUp( event ) {
    
    switch ( event.code ) {


        case 'KeyW':

            moveForward = false;
            break;


        case 'KeyA':
            moveLeft = false;
            break;


        case 'KeyS':
            moveBackward = false;
            break;


        case 'KeyD':
            moveRight = false;
            break;

        

    }

}

function animate() {
	requestAnimationFrame( animate );
    resize();
    if(!pause){

    
        target.x += ( mouseX - target.x ) * .1;
        target.y += ( -mouseY - target.y ) * .1;
        
        //cube.lookAt( target );
        redCube.updateEnemy();
        blueCube.updateEnemy();

        

        if(moveForward){
            cube.position.y += 0.7 * .1;
        }
        if(moveBackward){
            cube.position.y -= 0.7 * .1;
        }

        if(moveRight){
            cube.position.x += 0.7 * .1;
        }
        if(moveLeft){
            cube.position.x -= 0.7 * .1;
        }

        for(var index=0; index<bullets.length; index+=1){
            if(bullets[index] === undefined) continue;
            if(bullets[index].alive == false){
                bullets.splice(index,1);
                continue;
            }
            bullets[index].position.add(bullets[index].velocity);
            redCube.hitByBullet(bullets[index], scene);
            blueCube.hitByBullet(bullets[index], scene);
        }

        
        renderer.render( scene, camera );
    }
}

    animate();

function spawnBullet(vel){
    var bullet = new THREE.Mesh(
        new THREE.SphereGeometry(0.1,8,8),
        new THREE.MeshBasicMaterial({color:0xffffff})
        );
     bullet.position.set(cube.position.x, cube.position.y, cube.position.z)
     
     bullet.velocity = vel;
     
     bullet.alive = true;
     setTimeout(
         function(){
             bullet.alive = false;
             scene.remove(bullet);
         },
         1000);
         bullets.push(bullet);
     scene.add(bullet);
}


$("#btnPause").click(function(){
    pause = true;
})

$("#btnResume").click(function(){
    pause = false;
})

$("#btnMainMenu").click(function(){
    window.location.href = "index.html";
})