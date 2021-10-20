
loadSceneOne()
loadSceneTwo();
loadSceneThree();




function animate() {
    requestAnimationFrame(animate);
    gameApp.resize();

    if (!gameApp.pause && gameApp.scenary1 == 0) {
        gameApp.deltaTime = gameApp.clock.getDelta();


        if (!Players[0].alive && !Players[1].alive) {
            gameApp.pause = true;
            return;
        }





        //180 pa empezar

        /*
        angle += 0.005
        if (angle >= 360)
            angle = 0
        
        cube.position.x = (Math.cos(angle) * 100)                                 //patrón de disparos 1
    
            if(cube.canShoot > 0)
                cube.canShoot -= 1;
            
            spawnBulletEnemy(cube, new THREE.Vector3(
                Math.sin(frames) * 100 * gameApp.deltaTime,
                0,
                -Math.cos(frames) * 100 * gameApp.deltaTime
            ))
    
            if(!Players[0].alive && !Players[1].alive)
                pause = true;
    
            if (objs.length > 0) {
                for (var i = 0; i < objs.length; i++) {
                    objs[i].update(gameApp.deltaTime);
                }
            }*/

        for (let index = 0; index < Players.length; index++) {
            if (Players[index].alive) {
                Players[index].gamepadDetecter()
                Players[index].movementPlayer()

                Players[index].animationFrames()
                Players[index].spawnBulletKB()

                if (Players[index].canShoot > 0)
                    Players[index].canShoot -= 1;

                Players[index].frames360++;

                if (Players[index].frames360 == 360)
                    Players[index].frames360 = 0

                if (Players[index].attacked) {
                    Players[index].model.scale.set(Math.abs(Math.cos(Players[index].frames360) * 3), 2, Math.abs(Math.sin(Players[index].frames360) * 3));
                }
                else {
                    Players[index].model.scale.set(2, 2, 2);
                }
            }

        }

        for (var index = 0; index < enemyBullets.length; index += 1) {
            if (enemyBullets[index] === undefined) continue;
            if (enemyBullets[index].alive == false) {
                enemyBullets.splice(index, 1);
                continue;
            }
            enemyBullets[index].position.add(enemyBullets[index].velocity);

            for (i = 0; i < Players.length; i++) {

                Players[i].hitByEnemyBullet(enemyBullets[index])


            }
        }


        for (var index = 0; index < bullets.length; index += 1) {
            if (bullets[index] === undefined) continue;
            if (bullets[index].alive == false) {
                bullets.splice(index, 1);
                continue;
            }
            bullets[index].position.add(bullets[index].velocity);

            for (let i = 0; i < EnemyBees.length; i++) {
                EnemyBees[i].hitByBullet(bullets[index])
            }

            for (let i = 0; i < EnemySpider_Babies.length; i++) {
                EnemySpider_Babies[i].hitByBullet(bullets[index])
            }



            for (i = 0; i < EnemyAnts.length; i++) {
                EnemyAnts[i].hitByBullet(bullets[index])
            }
            for (let i = 0; i < EnemyBosses.length; i++) {
                EnemyBosses[i].hitByBullet(bullets[index])
            }
        }

        if (!gameApp.firstSceneComplete) {
            if (gameApp.scenary1 == 0) {
                runFirstScene()
            }
        } else if (!gameApp.secondSceneComplete) {
            runSecondScene();
        } else if (!gameApp.thirdSceneComplete) {
            runThirdScene();
        }


        gameApp.renderer.render(gameApp.scene, gameApp.camera);
    }
}




animate();









