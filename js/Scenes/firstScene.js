


var loadBee = (function () {
    var executed = false;
    return function () {
        if (!executed) {
            executed = true;
            loader.load(enemyURL.BEE, function (EnemyBee) {
                EnemyBee.mixer = new THREE.AnimationMixer(EnemyBee);
                EnemyBee.scale.set(.04, .04, .04);

                //EnemyAnts.position.y = 1;
                //EnemyAnt.rotation.x= THREE.Math.degToRad(90);
                var action = EnemyBee.mixer.clipAction(EnemyBee.animations[0]);
                action.play();
                action.setLoop(THREE.Looponce)
                action.timescale = 50;
                EnemyBee.name = "Enemy_Bee";
                EnemyBee.traverse(function (child) {
                    if (child.isMesh) {
                        child.castShadow = true;
                        child.receiveShadow = true;
                    }
                });
                //enemyGen.setEnemy(enemyType.ANT, EnemyAnt);
                let enemy = new BeeClass(EnemyBee, 0, 0, -100, 100, 10, 10);
                //enemy.enemy.position.y = -30
                EnemyBees.push(enemy);
                EnemyBees[0].frames.push(EnemyBee.mixer);
                //gameApp.scene.add(enemy.enemy)


                //gameApp.ready--;



            });
        }
    };
})();

var spawnBee = (function () {
    var executed = false;
    return function () {
        if (!executed) {
            executed = true;
            gameApp.scene.add(EnemyBees[0].enemy)
            beeSpawn = true;
        }
    };
})();

var spawnAntsRound2 = (function () {
    var executed = false;
    return function () {
        if (!executed) {
            executed = true;
            spawnAnts(2, 15, 0)
        }
    };
})();

var changeScene1_2 = (function () {
    var executed = false;
    return function () {
        if (!executed) {
            executed = true;


            gameApp.firstSceneComplete = true;
            gameApp.scene.remove(gameApp.scene.getObjectByName("1Grass"));
            gameApp.scene.remove(gameApp.scene.getObjectByName("1Floor"));
            gameApp.scene.remove(gameApp.scene.getObjectByName("1Rocks"));
            gameApp.scene.remove(gameApp.scene.getObjectByName("1Barrel"));
            gameApp.scene.remove(gameApp.scene.getObjectByName("1Door"));
            gameApp.scene.remove(gameApp.scene.getObjectByName("1Mush"));
            gameApp.scene.remove(gameApp.scene.getObjectByName("1Flower"));

            gameApp.scene.add(gameApp.sceneAux.getObjectByName("2Floor"))
            gameApp.sceneAux.remove(gameApp.sceneAux.getObjectByName("2Floor"));

            gameApp.scene.add(gameApp.sceneAux.getObjectByName("2Wall"))
            gameApp.sceneAux.remove(gameApp.sceneAux.getObjectByName("2Wall"));

            gameApp.scene.add(gameApp.sceneAux.getObjectByName("2Deer"))
            gameApp.sceneAux.remove(gameApp.sceneAux.getObjectByName("2Deer"));

            gameApp.scene.add(gameApp.sceneAux.getObjectByName("2Crystal"))
            gameApp.sceneAux.remove(gameApp.sceneAux.getObjectByName("2Crystal"));

            gameApp.scene.add(gameApp.sceneAux.getObjectByName("2Mush"))
            gameApp.sceneAux.remove(gameApp.sceneAux.getObjectByName("2Mush"));

            gameApp.scene.add(gameApp.sceneAux.getObjectByName("2Pencil"))
            gameApp.sceneAux.remove(gameApp.sceneAux.getObjectByName("2Pencil"));

            gameApp.scene.add(gameApp.sceneAux.getObjectByName("2Flask"))
            gameApp.sceneAux.remove(gameApp.sceneAux.getObjectByName("2Flask"));

            gameApp.scene.add(gameApp.sceneAux.getObjectByName("2Chains"))
            gameApp.sceneAux.remove(gameApp.sceneAux.getObjectByName("2Chains"));

            gameApp.scene.add(gameApp.sceneAux.getObjectByName("2Pills"))
            gameApp.sceneAux.remove(gameApp.sceneAux.getObjectByName("2Pills"));

            for (let index = 0; index < Players.length; index++) {
                Players[index].model.position.y -= 10;
                if (Players[index].index == 0) {
                    Players[index].model.position.z = 0
                    Players[index].model.position.x = -42
                } else {
                    Players[index].model.position.z = 0
                    Players[index].model.position.x = 42
                }

            }

            rounds = [false, false, false]
            roundsReady = [4, 8, 13]
            enemyCount.ANT = 1;
            enemyCount.SPIDER_BABY = 3;

        }
    };
})();

var loadSceneTwo = (function () {
    var executed = false;
    return function () {
        if (!executed) {
            executed = true;
            loader.load('../Assets/Modelos/Escenarios/Escenario2/Suelo_tierra.fbx', function (Mesh) {

                Mesh.scale.set(1, 1, 1);
                Mesh.name = "2Floor"
                gameApp.sceneAux.add(Mesh);


            });


            loader.load('../Assets/Modelos/Escenarios/Escenario2/muros.fbx', function (Mesh) {

                Mesh.scale.set(1, 1, 1);
                Mesh.name = "2Wall"
                gameApp.sceneAux.add(Mesh);


            });

            loader.load('../Assets/Modelos/Escenarios/Escenario2/Deer.fbx', function (Mesh) {

                Mesh.scale.set(1, 1, 1);
                Mesh.name = "2Deer"
                gameApp.sceneAux.add(Mesh);


            });

            loader.load('../Assets/Modelos/Escenarios/Escenario2/Crystals.fbx', function (Mesh) {

                Mesh.scale.set(1, 1, 1);
                Mesh.name = "2Crystal"
                gameApp.sceneAux.add(Mesh);


            });

            loader.load('../Assets/Modelos/Escenarios/Escenario2/Mushrooms.fbx', function (Mesh) {

                Mesh.scale.set(1, 1, 1);
                Mesh.name = "2Mush"
                gameApp.sceneAux.add(Mesh);


            });

            loader.load('../Assets/Modelos/Escenarios/Escenario2/lapiz.fbx', function (Mesh) {

                Mesh.scale.set(1, 1, 1);
                Mesh.name = "2Pencil"
                gameApp.sceneAux.add(Mesh);


            });

            loader.load('../Assets/Modelos/Escenarios/Escenario2/Flask.fbx', function (Mesh) {

                Mesh.scale.set(1, 1, 1);
                Mesh.name = "2Flask"
                gameApp.sceneAux.add(Mesh);


            });

            loader.load('../Assets/Modelos/Escenarios/Escenario2/Chains.fbx', function (Mesh) {

                Mesh.scale.set(1, 1, 1);
                Mesh.name = "2Chains"
                gameApp.sceneAux.add(Mesh);


            });

            loader.load('../Assets/Modelos/Escenarios/Escenario2/Pastillas.fbx', function (Mesh) {

                Mesh.scale.set(1, 1, 1);
                Mesh.name = "2Pills"
                gameApp.sceneAux.add(Mesh);


            });
        }
    };
})();

var loadSceneThree = (function () {
    var executed = false;
    return function () {
        if (!executed) {
            executed = true;
            loader.load('../Assets/Modelos/Escenarios/Escenario3/Laboratory.fbx', function (Mesh) {

                Mesh.scale.set(1, 1, 1);
                console.log("Laboratorio cargado")
                Mesh.name = "Lab"
                //gameApp.scene.add(Mesh);
                gameApp.sceneAux.add(Mesh)


            });
        }
    };
})();

function loadSceneOne() {
    loader.load('../Assets/Modelos/Escenarios/Escenario1/Grass.fbx', function (Mesh) {

        Mesh.scale.set(1, 1, 1);
        Mesh.name = "1Grass"
        Mesh.traverse(function (node) {
            if (node.material) {
                node.material.side = THREE.DoubleSide;
            }
        })

        gameApp.scene.add(Mesh);
        gameApp.scenary1--;


    });

    loader.load('../Assets/Modelos/Escenarios/Escenario1/Suelo.fbx', function (Mesh) {

        Mesh.scale.set(1, 1, 1);
        Mesh.name = "1Floor"
        gameApp.scene.add(Mesh);
        gameApp.scenary1--;

    });

    loader.load('../Assets/Modelos/Escenarios/Escenario1/Rocks.fbx', function (Mesh) {

        Mesh.scale.set(1, 1, 1);
        Mesh.name = "1Rocks"
        gameApp.scene.add(Mesh);
        gameApp.scenary1--;

    });

    loader.load('../Assets/Modelos/Escenarios/Escenario1/Barrel.fbx', function (Mesh) {

        Mesh.scale.set(1, 1, 1);
        Mesh.name = "1Barrel"
        gameApp.scene.add(Mesh);
        gameApp.scenary1--;

    });

    loader.load('../Assets/Modelos/Escenarios/Escenario1/Fence_door.fbx', function (Mesh) {

        Mesh.scale.set(1, 1, 1);
        gameApp.scene.add(Mesh);
        Mesh.name = "1Door"
        gameApp.scenary1--;

    });

    loader.load('../Assets/Modelos/Escenarios/Escenario1/Mushroom.fbx', function (Mesh) {

        Mesh.scale.set(1, 1, 1);
        Mesh.name = "1Mush"
        gameApp.scene.add(Mesh);
        gameApp.scenary1--;

    });

    loader.load('../Assets/Modelos/Escenarios/Escenario1/Flores_zules.fbx', function (Mesh) {

        Mesh.scale.set(1, 1, 1);
        Mesh.name = "1Flower"
        gameApp.scene.add(Mesh);
        gameApp.scenary1--;

    });
    /*loader.load(enemyURL.ANT, function (EnemyAnt) {
        EnemyAnt.scale.set(.02, .015, .015);
        for (let index = 0; index < enemyCount.ANT; index++) {
            let enemy = new AntClass(EnemyAnt.clone(), gameApp.RandomSpawnX(), gameApp.RandomSpawnY());
            EnemyAnts.push(enemy);
            gameApp.scene.add(enemy.enemy)
            gameApp.scenary1--;
        }
    });*/
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
            let enemy = new AntClass(EnemyAnt, gameApp.RandomSpawnX(), 0, gameApp.RandomSpawnY(), 0, 2, 15);
            enemy.onStage = true;
            EnemyAnts.push(enemy);
            gameApp.scene.add(enemy.enemy)

            EnemyAnts[index].frames.push(EnemyAnt.mixer);
            gameApp.ready--;



        });

    }

}

function runFirstScene() {
    loadBee();



    for (i = 0; i < EnemyAnts.length; i++) {
        EnemyAnts[i].updateEnemy()
        if (!EnemyAnts[i].enemy.alive) {
            EnemyAnts[i].die(i)
        }
        if (EnemyAnts[i].canDelete) {
            killerCountAnt++;
        }
    }

    if (killerCountAnt == EnemyAnts.length) {
        for (let index = 0; index < EnemyAnts.length; index++) {

            delete (EnemyAnts[index].enemy)
            delete (EnemyAnts[index])

        }
        EnemyAnts = []
        killerCountAnt = 0
    } else
        killerCountAnt = 0

    if (EnemyAnts.length == 0) {
        if (rounds[0] == false && roundsReady[0] == 0) {
            rounds[0] = true;
        } else if (rounds[1] == false && roundsReady[1] == 0) {
            rounds[1] = true;
        } else if (rounds[2] == false && roundsReady[2] == 0) {
            rounds[2] = true;
        }
    }

    if (rounds[0] == true && rounds[1] == false && rounds[2] == false) {
        enemyCount.ANT = 6
        spawnAntsRound2()
    }

    if (rounds[0] == true && rounds[1] == true && rounds[2] == false) {

        spawnBee();

        for (i = 0; i < EnemyBees.length; i++) {

            if (EnemyBees[i].enemy.position.z <= -20) {
                EnemyBees[i].enemy.position.z += 20 * gameApp.deltaTime;
                if (EnemyBees[i].enemy.position.z >= -20)
                    EnemyBees[i].canAttack = true
                EnemyBees[i].onStage = true;
            }
        }
    }

    for (i = 0; i < EnemyBees.length; i++) {
        EnemyBees[i].updateEnemy()

        if (!EnemyBees[i].enemy.alive) {
            EnemyBees[i].die(i)
        }
        if (EnemyBees[i].canDelete) {
            killerCountBee++;
        }
    }

    if (killerCountBee == EnemyBees.length) {
        for (let index = 0; index < EnemyBees.length; index++) {

            delete (EnemyBees[index].enemy)
            delete (EnemyBees[index])

        }
        EnemyBees = []
        killerCountBee = 0
    } else
        killerCountBee = 0

    if (rounds[0] == true && rounds[1] == true && rounds[2] == true) {

        setTimeout(changeScene1_2, 3000)
    }




}