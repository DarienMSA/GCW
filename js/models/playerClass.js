class Player {
    frames = [];
    constructor(_mesh, _index, _controller) {
        this.model = _mesh
        this.index = _index
        this.health = 100
        this.points = 0
        this.controller = _controller

        this.moveForward = false
        this.moveBackward = false
        this.moveRight = false
        this.moveLeft = false

        this.damage = 1;

        this.bulletDirection = ""
        this.canShoot = 0;
        this.shootCooldown = 100;
        this.attacked = false;
        this.alive = true;
        this.prevPos = new THREE.Vector3(0, 0, 0);

        this.speed = 20;

        this.frames360 = 0;

        this.hasPowerUp = false;

        this.shoot = new AudioClassASG('../Assets/Sonidos/shoot.mp3', false, 0.18);


        this.score = 0;
        this.onKB = false;
    }

    gamepadDetecter() {
        if (this.controller == 1) {
            return
        }
        var gp = navigator.getGamepads()[0];
        if (gp != null) {

            if (this.onKB) {
                this.moveForward = false
                this.moveBackward = false
                this.moveRight = false
                this.moveLeft = false
            }

            this.onKB = false;



            if (gp.buttons[0].value > 0 || gp.buttons[0].pressed == true) {
                this.onKB = true;
                spawnBullet(this, new THREE.Vector3(
                    0,
                    0,
                    1.5
                )) // X
            } if (gp.buttons[1].value > 0 || gp.buttons[1].pressed == true) {
                this.onKB = true;
                spawnBullet(this, new THREE.Vector3(
                    1.5,
                    0,
                    0
                )) // O
            } if (gp.buttons[2].value > 0 || gp.buttons[2].pressed == true) {
                this.onKB = true;
                spawnBullet(this, new THREE.Vector3(
                    -1.5,
                    0,
                    0
                )) // []
            } if (gp.buttons[3].value > 0 || gp.buttons[3].pressed == true) {
                this.onKB = true;
                spawnBullet(this, new THREE.Vector3(
                    0,
                    0,
                    -1.5
                ))  // Triángulo xd
            } if (gp.buttons[12].value > 0 || gp.buttons[12].pressed == true) {
                this.onKB = true;
                this.model.rotation.y = 135;
                this.moveForward = true  // Arriba
            } if (gp.buttons[13].value > 0 || gp.buttons[13].pressed == true) {
                this.onKB = true;
                this.model.rotation.y = 0;
                this.moveBackward = true  // Abajo
            } if (gp.buttons[14].value > 0 || gp.buttons[14].pressed == true) {
                this.onKB = true;
                this.model.rotation.y = -90;
                this.moveLeft = true  // Izquuierda
            } if (gp.buttons[15].value > 0 || gp.buttons[15].pressed == true) {
                this.onKB = true;
                this.model.rotation.y = 90;
                this.moveRight = true  // Derecha
            }

            if (gp.buttons[9].value > 0 || gp.buttons[9].pressed == true) {
                this.onKB = true;
                $("#pauseModal").modal("show"); //Start
                gameApp.pause = true;

            }

            if (gp.axes[0] > 0.3) {
                this.onKB = true;
                this.moveRight = true;
                this.model.rotation.y = 90;
            }

            if (gp.axes[0] < -0.3) {
                this.onKB = true;
                this.moveLeft = true;
                this.model.rotation.y = -90;
            }

            if (gp.axes[1] > 0.3) {
                this.onKB = true;
                this.moveBackward = true;
                this.model.rotation.y = 0;
            }

            if (gp.axes[1] < -0.3) {
                this.onKB = true;
                this.moveForward = true;
                this.model.rotation.y = 135;
            }




        }
    }

    movementPlayer() {
        if (gameApp.collisionFirstScene(this)) {
            this.prevPos = this.model.position;
            if (this.moveForward) {

                this.model.position.z -= this.speed * gameApp.deltaTime;

            }
            if (this.moveBackward) {

                this.model.position.z += this.speed * gameApp.deltaTime;
            }

            if (this.moveRight) {

                this.model.position.x += this.speed * gameApp.deltaTime;
            }
            if (this.moveLeft) {

                this.model.position.x -= this.speed * gameApp.deltaTime;
            }

        } else {
            this.model.position.x = this.prevPos.x * .999;
            this.model.position.z = this.prevPos.z * .999;
        }

    }

    animationFrames() {
        if (!this.moveForward && !this.moveBackward && !this.moveRight && !this.moveLeft) {

        } else {
            if (this.frames.length > 0) {

                for (var i = 0; i < this.frames.length; i++) {
                    this.frames[i].update(gameApp.deltaTime);
                }
            }
        }
    }

    spawnBulletKB() {
        if (this.controller == 1 || this.controller == 3) {
            if (this.bulletDirection == "Up") {
                spawnBullet(this, new THREE.Vector3(
                    0,
                    0,
                    -1.5
                ))
            }
            if (this.bulletDirection == "Down") {
                spawnBullet(this, new THREE.Vector3(
                    0,
                    0,
                    1.5
                ))
            }
            if (this.bulletDirection == "Left") {
                spawnBullet(this, new THREE.Vector3(
                    -1.5,
                    0,
                    0
                ))
            }
            if (this.bulletDirection == "Right") {
                spawnBullet(this, new THREE.Vector3(
                    1.5,
                    0,
                    0
                ))
            }

        }

    }

    hitByEnemyBullet(b) {
        if (!this.alive)
            return
        let posX = this.model.position.x
        let posZ = this.model.position.z

        if (b.position.x >= posX - 5 && b.position.x <= posX + 5 &&
            b.position.z >= posZ - 5 && b.position.z <= posZ + 5) {

            let healthBar = (b.damage / 100) * 300
            healthBar = Math.round(healthBar)

            if (this.index == 0) {
                $("#player1-health .progress .progress-done").animate({
                    width: `-=${healthBar}px`
                }, "fast");
            } else {
                $("#player2-health .progress .progress-done").animate({
                    width: `-=${healthBar}px`
                }, "fast");
            }

            b.alive = false;
            gameApp.scene.remove(b);
            this.health -= b.damage;
            this.attacked = true;
            let index = this.index
            setTimeout(
                function () {
                    Players[index].attacked = false
                },
                500);

            if (this.health <= 0) {
                this.alive = false
                this.model.scale.set(2, 2, 2);
                gameApp.scene.remove(this.model);
                delete (this.model)
                return true;
            }
            return false;
        }
    }
}

var bullets = [];
var Players = [];
var playersAmount = 1 //hardcoded

function spawnBullet(entity, vel) {
    if (entity.canShoot <= 0) {
        entity.shoot.playAudio();
        var bullet = new THREE.Mesh(
            new THREE.SphereGeometry(1, 8, 8),
            new THREE.MeshBasicMaterial({ color: new THREE.Color(0.64, 0.28, 0.64) })
        );
        bullet.position.set(entity.model.position.x, 0, entity.model.position.z)

        bullet.velocity = vel;
        bullet.from = entity.index
        bullet.damage = entity.damage
        bullet.alive = true;
        setTimeout(
            function () {
                bullet.alive = false;
                gameApp.scene.remove(bullet);
            },
            2000);
        bullets.push(bullet);
        gameApp.scene.add(bullet);
        entity.canShoot = entity.shootCooldown;
    }

}

function onDocumentKeyDown(event) {
    for (let index = 0; index < Players.length; index++) {
        if (Players[index].controller == 1 || Players[index].controller == 3) {

            switch (event.code) {

                case 'KeyW':
                    Players[index].model.rotation.y = 135;
                    Players[index].moveForward = true;
                    break;

                case 'KeyA':
                    Players[index].model.rotation.y = -90;
                    Players[index].moveLeft = true;
                    break;

                case 'KeyS':
                    Players[index].model.rotation.y = 0;
                    Players[index].moveBackward = true;
                    break;

                case 'KeyD':
                    Players[index].model.rotation.y = 90;
                    Players[index].moveRight = true;
                    break;
                case 'KeyP':
                    $("#pauseModal").modal("show");
                    gameApp.pause = true;
                    break;

                case 'ArrowUp':
                    Players[index].model.rotation.y = 135;
                    Players[index].bulletDirection = "Up"

                    break;

                case 'ArrowDown':
                    Players[index].model.rotation.y = 0;
                    Players[index].bulletDirection = "Down"

                    break;
                case 'ArrowLeft':
                    Players[index].model.rotation.y = -90;
                    Players[index].bulletDirection = "Left"

                    break;
                case 'ArrowRight':
                    Players[index].model.rotation.y = 90;
                    Players[index].bulletDirection = "Right"

                    break;

            }
        }

    }


}


function onDocumentKeyUp(event) {

    for (let index = 0; index < Players.length; index++) {
        if (Players[index].controller == 1 || Players[index].controller == 3) {


            switch (event.code) {



                case 'KeyW':

                    Players[index].moveForward = false;
                    break;


                case 'KeyA':

                    Players[index].moveLeft = false;
                    break;


                case 'KeyS':

                    Players[index].moveBackward = false;
                    break;


                case 'KeyD':

                    Players[index].moveRight = false;
                    break;

                case 'ArrowUp':
                    Players[index].bulletDirection = ""

                    break;

                case 'ArrowDown':
                    Players[index].bulletDirection = ""

                    break;
                case 'ArrowLeft':
                    Players[index].bulletDirection = ""

                    break;
                case 'ArrowRight':
                    Players[index].bulletDirection = ""

                    break;

            }
        }

    }
}