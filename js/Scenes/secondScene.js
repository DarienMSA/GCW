var spawnRoundOne = (function () {
    var executed = false;
    return function () {
        if (!executed) {
            executed = true;
            spawnSpiderBaby(3, 10, -9)
            spawnAnts(6, 20, -5);
        }
    };
})();

var spawnRoundTwo = (function () {
    var executed = false;
    return function () {
        if (!executed) {
            executed = true;
            enemyCount.ANT = 3
            enemyCount.SPIDER_BABY = 5
            spawnSpiderBaby(3, 10, -9)
            spawnAnts(6, 20, -5);
        }
    };
})();

var spawnRoundThree = (function () {
    var executed = false;
    return function () {
        if (!executed) {
            executed = true;
            enemyCount.ANT = 5
            enemyCount.SPIDER_BABY = 8
            spawnSpiderBaby(3, 10, -9)
            spawnAnts(6, 20, -5);
        }
    };
})();

var changeScene2_3 = (function () {
    var executed = false;
    return function () {
        if (!executed) {
            executed = true;


            gameApp.secondSceneComplete = true;
            gameApp.scene.remove(gameApp.scene.getObjectByName("2Floor"));
            gameApp.scene.remove(gameApp.scene.getObjectByName("2Wall"));
            gameApp.scene.remove(gameApp.scene.getObjectByName("2Deer"));
            gameApp.scene.remove(gameApp.scene.getObjectByName("1Barrel"));
            gameApp.scene.remove(gameApp.scene.getObjectByName("2Crystal"));
            gameApp.scene.remove(gameApp.scene.getObjectByName("2Mush"));
            gameApp.scene.remove(gameApp.scene.getObjectByName("2Pencil"));
            gameApp.scene.remove(gameApp.scene.getObjectByName("2Flask"));
            gameApp.scene.remove(gameApp.scene.getObjectByName("2Chains"));
            gameApp.scene.remove(gameApp.scene.getObjectByName("2Pills"));

            gameApp.scene.add(gameApp.sceneAux.getObjectByName("Lab"))
            gameApp.sceneAux.remove(gameApp.sceneAux.getObjectByName("Lab"));
            gameApp.scene.getObjectByName("Lab").position.y -= 10

            for (let index = 0; index < Players.length; index++) {
                Players[index].model.position.y = 0;
                if (Players[index].index == 0) {
                    Players[index].model.position.z = 40
                    Players[index].model.position.x = -42
                } else {
                    Players[index].model.position.z = 40
                    Players[index].model.position.x = 42
                }

            }


            //rounds = [false, false, false]
            //roundsReady = [4, 8, 13]
            //enemyCount.ANT = 1;
            //enemyCount.SPIDER_BABY = 3;

        }
    };
})();



function runSecondScene() {
    spawnRoundOne()



    for (i = 0; i < EnemySpider_Babies.length; i++) {
        EnemySpider_Babies[i].updateEnemy()
        if (!EnemySpider_Babies[i].enemy.alive) {
            EnemySpider_Babies[i].die(i)
        }
        if (EnemySpider_Babies[i].canDelete) {
            killerCountSB++;
        }

    }

    if (killerCountSB == EnemySpider_Babies.length) {
        for (let index = 0; index < EnemySpider_Babies.length; index++) {

            delete (EnemySpider_Babies[index].enemy)
            delete (EnemySpider_Babies[index])

        }
        EnemySpider_Babies = []
        killerCountSB = 0
    } else
        killerCountSB = 0

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

    if (EnemyAnts.length == 0 && EnemySpider_Babies.length == 0) {
        if (rounds[0] == false && roundsReady[0] == 0) {
            rounds[0] = true;
        } else if (rounds[1] == false && roundsReady[1] == 0) {
            rounds[1] = true;
        } else if (rounds[2] == false && roundsReady[2] == 0) {
            rounds[2] = true;
        }
    }

    if (rounds[0] == true && rounds[1] == false && rounds[2] == false) {
        spawnRoundTwo()
    }

    if (rounds[0] == true && rounds[1] == true && rounds[2] == false) {
        spawnRoundThree()
    }
    if (rounds[0] == true && rounds[1] == true && rounds[2] == true) {
        setTimeout(changeScene2_3, 3000)
    }
}