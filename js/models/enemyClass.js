

const enemyCount = {
    ANT: 4,
    SPIDER_BABY: 2,
    BEE: 1,
    BOSS: 1,
}

const enemyURL = {
    ANT: "../Assets/Modelos/EnemyAnt.fbx",
    SPIDER_BABY: "../Assets/Modelos/Spider_Walk_Die.fbx",
    BEE: "../Assets/Modelos/Bee.fbx",
    BOSS: "../Assets/Modelos/Spider_Idle_Hide.fbx",
}

class EnemyClass {
    frames = [];
    isDead = false;
    canDelete = false;
    constructor(Mesh, posX, posY, posZ, _shootCooldown = 0, _health, _attack) {

        this.enemy = Mesh;
        this.enemy.alive = true;
        this.enemy.position.x = posX;
        this.enemy.position.y = posY
        this.enemy.position.z = posZ;
        this.health = _health;
        this.incrementer = .01;
        this.attack = _attack;
        this.itAttacked = false;
        this.speed = gameApp.randomFloat(8, 10);
        this.canShoot = 0;
        this.shootCooldown = _shootCooldown;
        this.onStage = false;
        this.deathSound = randomDeathSound();
    }

    updateEnemy() { }

    animationFrames() {

        if (this.frames.length > 0) {

            for (var i = 0; i < this.frames.length; i++) {
                this.frames[i].update(gameApp.deltaTime);
            }
        }

    }



    nearFromPlayer(enemy) {
        if (!Players[0].alive && !Players[1].alive)
            return 2

        if (!Players[0].alive) {
            return 1
        }
        if (!Players[1].alive) {
            return 0;
        }
        let dis1X, dis2X, hyp1
        let dis1Z, dis2Z, hyp2
        dis1X = Players[0].model.position.x - enemy.position.x;
        dis1Z = Players[0].model.position.x - enemy.position.z;

        dis2X = Players[1].model.position.x - enemy.position.x;
        dis2Z = Players[1].model.position.x - enemy.position.z;

        hyp1 = Math.sqrt(dis1X * dis1X + dis1Z * dis1Z);
        hyp2 = Math.sqrt(dis2X * dis2X + dis2Z * dis2Z);

        if (hyp1 > hyp2) {
            return 1 //si el segundo está más cerca
        } else if (hyp2 > hyp1) {
            return 0 //si el primero está más cerca
        } else {
            return 1 // default
        }
    }

    hitByBullet(b) {


    }

    spawnBulletEnemy(vel) { }
}

class AntClass extends EnemyClass {
    updateEnemy() {

        if (!this.enemy.alive) {
            this.enemy.position.y -= 10 * gameApp.deltaTime;
            return false;
        }
        if (!this.onStage)
            return false;
        this.animationFrames()
        let disX = 0;
        let disZ = 0;
        let playerRef;
        if (Players.length == 1) {
            playerRef = Players[0];

        } else {
            let player = this.nearFromPlayer(this.enemy)
            if (player == 2)
                return false;
            else {
                playerRef = Players[player];
            }


        }


        disX = playerRef.model.position.x - this.enemy.position.x;
        disZ = playerRef.model.position.z - this.enemy.position.z;
        this.enemy.lookAt(playerRef.model.position)

        var hyp = Math.sqrt(disX * disX + disZ * disZ);
        disX /= hyp;
        disZ /= hyp;
        if (hyp > 10 && !this.itAttacked) {
            this.enemy.position.x += disX * this.speed * gameApp.deltaTime
            this.enemy.position.z += disZ * this.speed * gameApp.deltaTime


        } else {

            this.itAttacked = true

            this.incrementer += .35;
            playerRef.attacked = true;
            setTimeout(
                function () {
                    playerRef.attacked = false
                },
                500);
            this.enemy.position.x -= (disX / this.incrementer)
            this.enemy.position.z -= (disZ / this.incrementer)


            if (this.incrementer > 15) {
                this.incrementer = 0.01
                this.itAttacked = false
                doDamageToPlayer(this, playerRef)

            }

            //this.enemy.position.x -= disX * .07
            //this.enemy.position.z -= disZ * .07
        }
    }

    hitByBullet(b) {
        if (!this.enemy.alive)
            return false
        if (!this.onStage)
            return false;

        if (b.position.x >= this.enemy.position.x - 5 && b.position.x <= this.enemy.position.x + 5 &&
            b.position.z >= this.enemy.position.z - 5 && b.position.z <= this.enemy.position.z + 5) {

            b.alive = false;
            gameApp.scene.remove(b);
            this.health -= b.damage;
            if (this.health <= 0) {
                this.deathSound.playAudio();
                this.enemy.alive = false;
                if (roundsReady[0] != 0)
                    roundsReady[0]--;
                else if (roundsReady[1] != 0)
                    roundsReady[1]--;
                else if (roundsReady[2] != 0)
                    roundsReady[2]--;
                Players[b.from].score += 100;
            }
            return false;
        }
    }

    die(enemyIndex) {
        if (this.isDead)
            return;
        this.isDead = true
        setTimeout(
            function () {
                EnemyAnts[enemyIndex].canDelete = true;
                gameApp.scene.remove(EnemyAnts[enemyIndex].enemy);

            },
            2000);
    }


}

class BeeClass extends EnemyClass {
    canAttack = false;
    updateEnemy() {
        if (!this.enemy.alive) {
            this.enemy.position.y -= 20 * gameApp.deltaTime;
            return false;
        }
        if (!this.onStage)
            return false;
        this.animationFrames()
        if (!this.canAttack)
            return;
        if (this.canShoot > 0)
            this.canShoot -= 1;

        let disX = 0;
        let disY = 0;
        let disZ = 0;
        let playerRef;
        if (Players.length == 1) {
            playerRef = Players[0];

        } else {
            let player = this.nearFromPlayer(this.enemy)
            if (player == 2)
                return false;
            else {
                playerRef = Players[player];
            }


        }


        disX = playerRef.model.position.x - this.enemy.position.x;
        disY = playerRef.model.position.y - this.enemy.position.y;
        disZ = playerRef.model.position.z - this.enemy.position.z;
        //this.enemy.lookAt(playerRef.model.position)

        var hyp = Math.sqrt(disX * disX + disZ * disZ);
        disX /= hyp;
        disZ /= hyp;

        this.spawnBulletEnemy(new THREE.Vector3(
            disX,
            disY,
            disZ
        ))

    }

    hitByBullet(b) {
        if (!this.enemy.alive) {
            return false;
        }
        if (!this.onStage)
            return false;
        let posX = this.enemy.position.x
        let posZ = this.enemy.position.z - 30

        if (b.position.x >= posX - 10 && b.position.x <= posX + 10 &&
            b.position.z >= posZ - 5 && b.position.z <= posZ + 5) {

            b.alive = false;
            gameApp.scene.remove(b);
            this.health -= b.damage;
            if (this.health <= 0) {
                this.deathSound.playAudio();

                this.enemy.alive = false;
                if (roundsReady[0] != 0)
                    roundsReady[0]--;
                else if (roundsReady[1] != 0)
                    roundsReady[1]--;
                else if (roundsReady[2] != 0)
                    roundsReady[2]--;

                Players[b.from].score += 200;
            }
            return false;
        }
    }

    spawnBulletEnemy(vel) {
        if (this.canShoot <= 0) {
            var bullet = new THREE.Mesh(
                new THREE.SphereGeometry(1, 8, 8),
                new THREE.MeshBasicMaterial({ color: new THREE.Color(1.0, 0.0, 0.0) })
            );
            bullet.position.set(this.enemy.position.x, this.enemy.position.y + 35, this.enemy.position.z)
            bullet.damage = this.attack
            bullet.velocity = vel;
            bullet.alive = true;
            setTimeout(
                function () {
                    bullet.alive = false;
                    gameApp.scene.remove(bullet);
                },
                3000);
            enemyBullets.push(bullet);
            gameApp.scene.add(bullet);
            this.canShoot = this.shootCooldown;
        }
    }

    die(enemyIndex) {
        if (this.isDead)
            return;
        this.isDead = true
        setTimeout(
            function () {
                EnemyBees[enemyIndex].canDelete = true;
                gameApp.scene.remove(EnemyBees[enemyIndex].enemy);
            },
            2000);
    }
}

class SpiderClass extends EnemyClass {
    canAttack = false;
    attackPattern = gameApp.random1_2();
    speed = gameApp.randomFloat(12, 15);
    updateEnemy() {

        this.animationFrames()
        if (!this.enemy.alive) {
            this.enemy.position.y -= gameApp.deltaTime;
            return false;
        }
        if (!this.onStage)
            return false;
        let disX = 0;
        let disZ = 0;
        let playerRef;
        if (Players.length == 1) {
            playerRef = Players[0];

        } else {
            let player = this.nearFromPlayer(this.enemy)
            if (player == 2)
                return false;
            else {
                playerRef = Players[player];
            }


        }
        if (this.canShoot > 0)
            this.canShoot -= 1;

        disX = playerRef.model.position.x - this.enemy.position.x;
        disZ = playerRef.model.position.z - this.enemy.position.z;
        this.enemy.lookAt(playerRef.model.position)

        var hyp = Math.sqrt(disX * disX + disZ * disZ);
        disX /= hyp;
        disZ /= hyp;
        if (this.attackPattern == 1) {
            if (hyp > 10 && !this.itAttacked) {
                this.enemy.position.x += disX * this.speed * gameApp.deltaTime
                this.enemy.position.z += disZ * this.speed * gameApp.deltaTime


            } else {

                this.itAttacked = true

                this.incrementer += .35;
                playerRef.attacked = true;
                setTimeout(
                    function () {
                        playerRef.attacked = false
                    },
                    500);
                this.enemy.position.x -= (disX / this.incrementer)
                this.enemy.position.z -= (disZ / this.incrementer)

                if (this.incrementer > 15) {
                    this.incrementer = 0.01
                    this.itAttacked = false
                    doDamageToPlayer(this, playerRef)

                }

                //this.enemy.position.x -= disX * .07
                //this.enemy.position.z -= disZ * .07
            }
        } else if (this.attackPattern == 2) {
            if (hyp < 50) {
                this.spawnBulletEnemy(new THREE.Vector3(
                    disX * 70 * gameApp.deltaTime,
                    0,
                    disZ * 70 * gameApp.deltaTime
                ))
            } else {
                this.enemy.position.x += disX * this.speed * gameApp.deltaTime
                this.enemy.position.z += disZ * this.speed * gameApp.deltaTime
            }

        }

    }

    spawnBulletEnemy(vel) {
        if (this.canShoot <= 0) {
            var bullet = new THREE.Mesh(
                new THREE.SphereGeometry(1, 8, 8),
                new THREE.MeshBasicMaterial({ color: new THREE.Color(1.0, 0.0, 0.0) })
            );
            bullet.position.set(this.enemy.position.x, 0, this.enemy.position.z)
            bullet.damage = this.attack
            bullet.velocity = vel;
            bullet.alive = true;
            setTimeout(
                function () {
                    bullet.alive = false;
                    gameApp.scene.remove(bullet);
                },
                3000);
            enemyBullets.push(bullet);
            gameApp.scene.add(bullet);
            this.canShoot = this.shootCooldown;
        }
    }

    hitByBullet(b) {
        if (!this.onStage)
            return false;
        if (!this.enemy.alive)
            return false;
        if (b.position.x >= this.enemy.position.x - 5 && b.position.x <= this.enemy.position.x + 5 &&
            b.position.z >= this.enemy.position.z - 5 && b.position.z <= this.enemy.position.z + 5) {

            b.alive = false;
            gameApp.scene.remove(b);
            this.health -= b.damage;
            if (this.health <= 0) {
                this.deathSound.playAudio();

                this.enemy.alive = false;
                if (roundsReady[0] != 0)
                    roundsReady[0]--;
                else if (roundsReady[1] != 0)
                    roundsReady[1]--;
                else if (roundsReady[2] != 0)
                    roundsReady[2]--;

                Players[b.from].score += 130;
            }
            return false;
        }
    }

    die(enemyIndex) {
        if (this.isDead)
            return;
        this.isDead = true
        let WalkAnimation = this.enemy.mixer._actions[0];
        let DeadAnimation = this.enemy.mixer._actions[1];
        DeadAnimation.timeScale = 0;
        DeadAnimation.crossFadeFrom(WalkAnimation, .75, true);
        DeadAnimation.play();
        setTimeout(
            function () {
                EnemySpider_Babies[enemyIndex].canDelete = true;
                gameApp.scene.remove(EnemySpider_Babies[enemyIndex].enemy);

            },
            2000);
    }
}

class BossClass extends EnemyClass {
    canAttack = false;
    attackPattern = 2;
    updateEnemy() {
        this.animationFrames()
        if (!this.enemy.alive) {
            this.enemy.position.y -= 5 * gameApp.deltaTime;
            return false;
        }


        if (!this.onStage)
            return false;
        if (!this.canAttack)
            return;
        if (this.canShoot > 0)
            this.canShoot -= 1;


        let disX = 0;
        let disZ = 0;
        let playerRef;
        this.enemy.position.x = ((Math.cos(gameApp.frames) * 100) + 100)
        if (this.attackPattern == 1) {

            if (Players.length == 1) {
                playerRef = Players[0];

            } else {
                let player = this.nearFromPlayer(this.enemy)
                if (player == 2)
                    return false;
                else {
                    playerRef = Players[player];
                }


            }


            disX = playerRef.model.position.x - (this.enemy.position.x - 100);
            disZ = playerRef.model.position.z - (-30);
            //this.enemy.lookAt(playerRef.model.position)

            var hyp = Math.sqrt(disX * disX + disZ * disZ);
            disX /= hyp;
            disZ /= hyp;

            this.spawnBulletEnemy(new THREE.Vector3(
                disX,
                0,
                disZ
            ))
        } else if (this.attackPattern == 0) {
            this.spawnBulletEnemy(new THREE.Vector3(
                Math.sin(gameApp.angle) * 100 * gameApp.deltaTime,
                0,
                -Math.cos(gameApp.angle) * 100 * gameApp.deltaTime
            ))
        }


    }

    hitByBullet(b) {
        if (!this.enemy.alive) {
            return false;
        }
        if (!this.onStage)
            return false;
        let posX = this.enemy.position.x - 100
        let posZ = -30

        if (b.position.x >= posX - 25 && b.position.x <= posX + 15 &&
            b.position.z >= posZ - 15 && b.position.z <= posZ + 15) {


            b.alive = false;
            gameApp.scene.remove(b);
            this.health -= b.damage;
            if (this.health <= 0) {
                this.deathSound.playAudio();

                this.enemy.alive = false;

                let WalkAnimation = this.enemy.mixer._actions[0];
                let DeadAnimation = this.enemy.mixer._actions[1];
                DeadAnimation.timeScale = 0;
                DeadAnimation.crossFadeFrom(WalkAnimation, .75, true);
                DeadAnimation.play();

                if (roundsReady[0] != 0)
                    roundsReady[0]--;
                else if (roundsReady[1] != 0)
                    roundsReady[1]--;
                else if (roundsReady[2] != 0)
                    roundsReady[2]--;

                Players[b.from].score += 250;
            }
            return false;
        }
    }

    spawnBulletEnemy(vel) {
        if (this.canShoot <= 0) {
            var bullet = new THREE.Mesh(
                new THREE.SphereGeometry(1, 8, 8),
                new THREE.MeshBasicMaterial({ color: new THREE.Color(1.0, 0.0, 0.0) })
            );
            bullet.position.set(this.enemy.position.x - 100, 0, -30)
            bullet.damage = this.attack
            bullet.velocity = vel;
            bullet.alive = true;
            setTimeout(
                function () {
                    bullet.alive = false;
                    gameApp.scene.remove(bullet);
                },
                3000);
            enemyBullets.push(bullet);
            gameApp.scene.add(bullet);
            this.canShoot = this.shootCooldown;
        }
    }

    die(enemyIndex) {
        if (this.isDead)
            return;
        this.isDead = true
        setTimeout(
            function () {
                EnemyBees[enemyIndex].canDelete = true;
                gameApp.scene.remove(EnemyBees[enemyIndex].enemy);
            },
            2000);
    }
}



var EnemyAnts = [];
var EnemyBees = [];
var EnemySpider_Babies = [];
var EnemyBosses = [];
var enemyBullets = [];

var killerCountAnt = 0;
var killerCountBee = 0;
var killerCountSB = 0;


var rounds = [false, false, false]
var roundsReady = [4, 6, 1]


function spawnAnts(h, a, y) {
    for (let index = 0; index < enemyCount.ANT; index++) {
        loader.load(enemyURL.ANT, function (EnemyAnt) {
            EnemyAnt.mixer = new THREE.AnimationMixer(EnemyAnt);
            EnemyAnt.scale.set(.02, .015, .015);

            //EnemyAnts.position.y = 1;
            //EnemyAnt.rotation.x= THREE.Math.degToRad(90);
            var action = EnemyAnt.mixer.clipAction(EnemyAnt.animations[0]);
            action.play();
            action.setLoop(THREE.Looponce)
            action.timescale = 50;
            EnemyAnt.name = "Enemy_Ant";
            EnemyAnt.traverse(function (child) {
                if (child.isMesh) {
                    child.castShadow = true;
                    child.receiveShadow = true;
                }
            });
            //enemyGen.setEnemy(enemyType.ANT, EnemyAnt);
            let enemy = new AntClass(EnemyAnt, gameApp.RandomSpawnX(), y, gameApp.RandomSpawnY(), 0, h, a);
            enemy.onStage = true;
            EnemyAnts.push(enemy);
            gameApp.scene.add(enemy.enemy)

            EnemyAnts[index].frames.push(EnemyAnt.mixer);




        });

    }
}


function spawnSpiderBaby(h, a, y) {
    for (let index = 0; index < enemyCount.SPIDER_BABY; index++) {
        loader.load(enemyURL.SPIDER_BABY, function (EnemySB) {
            EnemySB.mixer = new THREE.AnimationMixer(EnemySB);
            EnemySB.scale.set(.1, .1, .1);

            //EnemyAnts.position.y = 1;
            //EnemyAnt.rotation.x= THREE.Math.degToRad(90);
            var walkAnim = EnemySB.mixer.clipAction(EnemySB.animations[0]);
            walkAnim.play();
            //walkAnim.setLoop(THREE.Looponce)
            //walkAnim.timeScale = 50;

            var deadAnim = EnemySB.mixer.clipAction(EnemySB.animations[1]);
            deadAnim.setLoop(THREE.LoopOnce)




            EnemySB.traverse(function (child) {
                if (child.isMesh) {
                    child.castShadow = true;
                    child.receiveShadow = true;
                }
            });
            //enemyGen.setEnemy(enemyType.ANT, EnemyAnt);
            let enemy = new SpiderClass(EnemySB, gameApp.RandomSpawnX(), y, gameApp.RandomSpawnY(), 200, h, a);
            enemy.onStage = true;
            EnemySpider_Babies.push(enemy);
            gameApp.scene.add(enemy.enemy)

            EnemySpider_Babies[index].frames.push(EnemySB.mixer);




        });

    }
}

function doDamageToPlayer(e, p) {
    p.health -= e.attack
    if (p.health <= 0) {
        p.health = 0
        p.alive = false
        p.model.scale.set(2, 2, 2);
        gameApp.scene.remove(p.model);
    }


    let healthBar = (e.attack / 100) * 300
    healthBar = Math.round(healthBar)

    if (p.index == 0) {
        $("#player1-health .progress .progress-done").animate({
            width: `-=${healthBar}px`
        }, "fast");
    } else {
        $("#player2-health .progress .progress-done").animate({
            width: `-=${healthBar}px`
        }, "fast");
    }

}

function randomDeathSound() {
    let random = gameApp.random1_2();
    if (random == 1) {
        return new AudioClassASG('../Assets/Sonidos/enemyDeath1.mp3', false, 0.15);
    } else {
        return new AudioClassASG('../Assets/Sonidos/enemyDeath2.mp3', false, 0.15);

    }
}