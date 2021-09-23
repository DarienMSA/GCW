class EnemyClass {
    constructor(Mesh, posX, posZ) {
        
        this.enemy = Mesh;
        this.enemy.alive = true;
        this.enemy.position.x = posX;
        this.enemy.position.z = posZ;
        this.health = 500;
    }

    updateEnemy() {
        if (!this.enemy.alive)
            return;
        var MainChar = scene.getObjectByName("Main_Char");
        
        let disX = MainChar.position.x - this.enemy.position.x;
        let disZ = MainChar.position.z - this.enemy.position.z;

        var hyp = Math.sqrt(disX * disX + disZ * disZ);
        //if(hyp < 20){
        disX /= hyp;
        disZ /= hyp;

        this.enemy.position.x += disX * 0.5 * .1;
        this.enemy.position.z += disZ * 0.5 * .1;

        this.enemy.lookAt(MainChar.position)
        //}
    }

    hitByBullet(b, scene) {
        if (!this.enemy.alive)
            return;
        if (b.position.x >= this.enemy.position.x - 5 && b.position.x <= this.enemy.position.x + 5 &&
            b.position.z >= this.enemy.position.z - 5 && b.position.z <= this.enemy.position.z + 5) {
            console.log(this.enemy.position);
            b.alive = false;
            scene.remove(b);
            this.health--;
            if (this.health == 0) {
                this.enemy.alive = false;
                scene.remove(this.enemy);
                delete (this);
            }
        }
    }
}

var objs = [];
var Main_Objs = []
var enemies = [];
var EnemyAnts = [];
var loader = new THREE.FBXLoader();
var pause = false;

const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);

const renderer = new THREE.WebGLRenderer();
renderer.setClearColor(new THREE.Color(255, .2, 255));
renderer.setSize(window.innerWidth, window.innerHeight);
document.body.appendChild(renderer.domElement);

const geometry = new THREE.BoxGeometry(5, 5, 5);
const material = new THREE.MeshBasicMaterial({ color: 0x00ff00 });
const cube = new THREE.Mesh(geometry, material);

const enemymaterial = new THREE.MeshBasicMaterial({ color: RandomColor() });
const enemycube = new THREE.Mesh(geometry, enemymaterial);
scene.add(cube);

var ambient = new THREE.AmbientLight(new THREE.Color(1, 1, 1), 1.0);
scene.add(ambient);

var directional = new THREE.DirectionalLight(new THREE.Color(1, 0 ,1), 0.5);
directional.position.set(0, 0, 1);
scene.add(directional);


loader.load('../Assets/Modelos/EnemyAnt.fbx', function (EnemyAnt) {
    EnemyAnt.mixer = new THREE.AnimationMixer(EnemyAnt);
    EnemyAnt.scale.set(.02, .015, .015);
    var clone = EnemyAnt.children[1];
    //EnemyAnts.position.y = 1;
    //EnemyAnt.rotation.x= THREE.Math.degToRad(90);
    var action = EnemyAnt.mixer.clipAction(EnemyAnt.animations[0]);
    action.play();
    action.setLoop(THREE.Looponce)
    action.timescale = 50;
    objs.push(EnemyAnt.mixer);
    EnemyAnt.name = "Enemy_Ant";
    EnemyAnt.traverse(function (child) {
        if (child.isMesh) {
            child.castShadow = true;
            child.receiveShadow = true;
        }
    });
    for (var ant = 0; ant <= 1; ant++) {
        var NewEnemies = new EnemyClass(EnemyAnt, RandomSpawnX(), RandomSpawnY());
        EnemyAnts.push(NewEnemies);
    }
    for(i = 0; i <= EnemyAnts.length; i++){
        scene.add(EnemyAnts[i].enemy);
    }  
});



loader.load('../Assets/Modelos/Character/Walking.fbx', function (MainChar) {
    MainChar.mixer = new THREE.AnimationMixer(MainChar);
    MainChar.scale.set(2, 2, 2);
    MainChar.name = "Main_Char";
    //MainChar.position.y = 1;
    //MainChar.rotation.x= THREE.Math.degToRad(90);
    var action = MainChar.mixer.clipAction(MainChar.animations[0]);
    action.play();
    action.setLoop(THREE.Looponce)
    action.timescale = 500;
    Main_Objs.push(MainChar.mixer);
    scene.add(MainChar);
});

//const redCube = new EnemyClass(new THREE.Mesh(geometry, new THREE.MeshBasicMaterial( { color: 0xff0000 } )), 0, 40);
//const blueCube = new EnemyClass(new THREE.Mesh(geometry, new THREE.MeshBasicMaterial( { color: 0x0000ff } )), -140, -7);

/*for(i = 0; i <= 25; i++){ 
    var newenemies = new EnemyClass(enemycube.clone(), RandomSpawnX(), RandomSpawnY()); 
    enemies.push(newenemies);
    scene.add(enemies[i].enemy);
}*/

//scene.add(blueCube.enemy);
//scene.add(redCube.enemy);

const geometryPlane = new THREE.PlaneGeometry(300, 100);
const materialPlane = new THREE.MeshBasicMaterial({ color: 0xff00ff });
const plane = new THREE.Mesh(geometryPlane, materialPlane);
plane.rotation.x = THREE.Math.degToRad(-90);
plane.position.y -= 20;
//scene.add(plane);

camera.position.y = 100;
camera.lookAt(plane.position);

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

document.addEventListener('mousemove', onDocumentMouseMove, false);
document.addEventListener('keydown', onDocumentKeyDown, false);
document.addEventListener('keyup', onDocumentKeyUp, false);
//document.addEventListener( 'click', onClick, false );

window.addEventListener("gamepadconnected", function (e) { gamepadHandler(e, true); }, false);
window.addEventListener("gamepaddisconnected", function (e) { gamepadHandler(e, false); }, false);

var gamepads = {};

function RandomSpawnX() {
    var lado = Math.random();
    var x = 0;
    if (lado <= 0.5) {
        x = Math.random() * (140 - 130 + 1) + 130;
    } else {
        x = Math.random() * (-140 - (-130) + 1) + (-130);
    }
    return x;
}
function RandomSpawnY() {
    var lado = Math.random();
    var z = 0;
    if (lado <= 0.5) {
        z = Math.random() * (60 - 20 + 1) + 20;
    } else {
        z = Math.random() * (-60 - (-20) + 1) + (-20);
    }
    return z;
}
function RandomColor() {
    var letters = '0123456789ABCDEF';
    var color = '#';
    for (var i = 0; i < 6; i++) {
        color += letters[Math.floor(Math.random() * 16)];
    }
    return color;
}
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

function onDocumentMouseMove(event) {
    mouseX = (event.clientX - windowHalfX)
    mouseY = (event.clientY - windowHalfY)
}


function onDocumentKeyDown(event) {
    let MainChar = scene.getObjectByName("Main_Char");
    switch (event.code) {
        case 'KeyW':
            MainChar.rotation.y = 135;
            moveForward = true;
            break;

        case 'KeyA':
            MainChar.rotation.y = -90;
            moveLeft = true;
            break;

        case 'KeyS':
            MainChar.rotation.y = 0;
            moveBackward = true;
            break;

        case 'KeyD':
            MainChar.rotation.y = 90;
            moveRight = true;
            break;

        case 'ArrowUp':
            MainChar.rotation.y = 135;
            spawnBullet(new THREE.Vector3(
                0,
                0,
                -1 * 0.75
            ))
            break;

        case 'ArrowDown':
            MainChar.rotation.y = 0;
            spawnBullet(new THREE.Vector3(
                0,
                0,
                1 * 0.75
            ))
            break;
        case 'ArrowLeft':
            MainChar.rotation.y = -90;
            spawnBullet(new THREE.Vector3(
                -1 * 0.75,
                0,
                0
            ))
            break;
        case 'ArrowRight':
            MainChar.rotation.y = 90;
            spawnBullet(new THREE.Vector3(
                1 * 0.75,
                0,
                0
            ))
            break;

    }

}


function onDocumentKeyUp(event) {
    
    switch (event.code) {


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

$(window).blur(function(){
    moveRight = false;
    moveBackward = false;
    moveLeft = false;
    moveForward = false;
  });

function animate() {
    requestAnimationFrame(animate);
    resize();

    var MainChar = scene.getObjectByName("Main_Char");
    
    if (!pause) {

        deltaTime = clock.getDelta();
        //object.position.z += speed * delta;

        if (objs.length > 0) {
            for (var i = 0; i < objs.length; i++) {
                objs[i].update(deltaTime);
            }
        }
        if(!moveForward && !moveBackward && !moveRight && !moveLeft){
            
        }else{
            if (Main_Objs.length > 0) {

                for (var i = 0; i < Main_Objs.length; i++) {
                    Main_Objs[i].update(deltaTime);
                }
            }
        }
        
        if((deltaTime % 2) ==  0){

            
        }

        target.x += (mouseX - target.x) * .1;
        target.y += (-mouseY - target.y) * .1;

        //cube.lookAt( target );    

        //redCube.updateEnemy();
        //blueCube.updateEnemy();

        for (i = 0; i < EnemyAnts.length; i++) { EnemyAnts[i].updateEnemy(); }
        //for(i = 0; i < enemies.length; i++) { enemies[i].updateEnemy(); }

        if (moveForward) {
            
            MainChar.position.z -= 2.7 * .1;
        }
        if (moveBackward) {
            
            MainChar.position.z += 2.7 * .1;
        }

        if (moveRight) {
            
            MainChar.position.x += 2.7 * .1;
        }
        if (moveLeft) {
            
            MainChar.position.x -= 2.7 * .1;
        }

        for (var index = 0; index < bullets.length; index += 1) {
            if (bullets[index] === undefined) continue;
            if (bullets[index].alive == false) {
                bullets.splice(index, 1);
                continue;
            }
            bullets[index].position.add(bullets[index].velocity);
            //redCube.hitByBullet(bullets[index], scene);
            //blueCube.hitByBullet(bullets[index], scene);

            for (i = 0; i < EnemyAnts.length; i++) { EnemyAnts[i].hitByBullet(bullets[index], scene); }
            //for(i = 0; i < enemies.length; i++) { enemies[i].hitByBullet(bullets[index], scene); }
        }
        renderer.render(scene, camera);
    }
}

var clock = new THREE.Clock();
var speed = 2;
var deltaTime = 0;

animate();

function spawnBullet(vel) {
    var MainChar = scene.getObjectByName("Main_Char");
    var bullet = new THREE.Mesh(
        new THREE.SphereGeometry(1, 8, 8),
        new THREE.MeshBasicMaterial({ color: 0xffffff })
    );
    bullet.position.set(MainChar.position.x, MainChar.position.y, MainChar.position.z)

    bullet.velocity = vel;

    bullet.alive = true;
    setTimeout(
        function () {
            bullet.alive = false;
            scene.remove(bullet);
        },
        2000);
    bullets.push(bullet);
    scene.add(bullet);
}


$("#btnPause").click(function () {
    pause = true;
})

$("#btnResume").click(function () {
    pause = false;
})

$("#btnMainMenu").click(function () {
    window.location.href = "index.html";
})