var loadBoss = (function () {
    var executed = false;
    return function () {
        if (!executed) {
            executed = true;
            loader.load(enemyURL.BOSS, function (EnemyBoss) {
                EnemyBoss.mixer = new THREE.AnimationMixer(EnemyBoss);
                EnemyBoss.scale.set(2, 2, 2);

                //EnemyAnts.position.y = 1;
                //EnemyAnt.rotation.x= THREE.Math.degToRad(90);
                var walkAnim = EnemyBoss.mixer.clipAction(EnemyBoss.animations[0]);

                //walkAnim.setLoop(THREE.Looponce)
                //walkAnim.timescale = 50;
                var hideAnim = EnemyBoss.mixer.clipAction(EnemyBoss.animations[1]);
                walkAnim.play();



                EnemyBoss.name = "Enemy_Boss";
                EnemyBoss.traverse(function (child) {
                    if (child.isMesh) {
                        child.castShadow = true;
                        child.receiveShadow = true;
                    }
                });

                //enemyGen.setEnemy(enemyType.ANT, EnemyAnt);
                let enemy = new BossClass(EnemyBoss, ((Math.cos(0) * 100) + 100), 250, 70, 40, 10, 10);
                enemy.enemy.rotation.y = THREE.Math.degToRad(180);
                //enemy.enemy.position.y = -30
                EnemyBosses.push(enemy);
                EnemyBosses[0].frames.push(EnemyBoss.mixer);

                gameApp.scene.add(enemy.enemy)
                //EnemyBosses[0].onStage = true;
                //EnemyBosses[0].canAttack = true; ///////////////////////////////////////////////posicionarlo bien


                //gameApp.ready--;



            });
        }
    };
})();

var killBoss = (function () {
    var executed = false;
    return function () {
        if (!executed) {
            executed = true;
            setTimeout(function () {
                EnemyBosses[0].canDelete = true;
            }, 7000)
        }
    };
})();

var intervalID = 0
var bossPatternSetter = (function () {
    var executed = false;
    return function () {
        if (!executed) {
            executed = true;

            intervalID = setInterval(function () {
                if (EnemyBosses[0].attackPattern == 0) {
                    EnemyBosses[0].attackPattern = 1
                    EnemyBosses[0].shootCooldown = 40;
                } else if (EnemyBosses[0].attackPattern == 1) {
                    EnemyBosses[0].attackPattern = 0
                    EnemyBosses[0].shootCooldown = 7;
                } else if (EnemyBosses[0].attackPattern == 2) {
                    EnemyBosses[0].attackPattern = 0
                    EnemyBosses[0].shootCooldown = 7;
                }
            }, 3000)
        }
    };
})();

function runThirdScene() {
    loadBoss();
    for (let index = 0; index < EnemyBosses.length; index++) {

        if (EnemyBosses[0].canAttack == true && EnemyBosses.length == 1) {
            gameApp.frames += 0.005
            if (gameApp.frames >= 360) {
                gameApp.frames = 0
            }

            gameApp.angle++
            if (gameApp.angle >= 360) {
                gameApp.angle = 0
            }
        }

        if (EnemyBosses[index].enemy.position.y >= 180) {
            EnemyBosses[index].enemy.position.y -= 20 * gameApp.deltaTime;
            if (EnemyBosses[index].enemy.position.y <= 180) {


                setTimeout(function () {
                    EnemyBosses[index].canAttack = true
                    EnemyBosses[index].onStage = true;
                    bossPatternSetter();

                }, 1000)

            }


        }

        EnemyBosses[index].updateEnemy();

        if (!EnemyBosses[index].enemy.alive) {

            killBoss()
        }

        if (EnemyBosses[index].canDelete) {
            clearInterval(intervalID);
            gameApp.scene.remove(EnemyBosses[index].enemy)
            delete (EnemyBosses[index].enemy)
            delete (EnemyBosses[index])
            EnemyBosses = []
        }

    }
}