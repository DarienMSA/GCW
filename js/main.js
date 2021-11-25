var timeCounter = 0;

function animate() {
    requestAnimationFrame(animate);
    gameApp.resize();
    gameApp.deltaTime = gameApp.clock.getDelta();
    if (!gameApp.pause && gameApp.scenary1 == 0) {
        timeCounter += gameApp.deltaTime;
        console.log(Math.floor(timeCounter))


        if (playersAmount == 1) {
            if (!Players[0].alive) {

                gameApp.clicAudio.playAudio();
                $("#score1").text(Math.floor(Players[0].score - (Math.floor(timeCounter))));

                $("#endgame1").modal("show");
                gameApp.pause = true;
                return;
            }
        } else {
            if (!Players[0].alive && !Players[1].alive) {
                gameApp.clicAudio.playAudio();
                $("#score1").text(Math.floor(Players[0].score - (Math.floor(timeCounter))));

                $("#endgame1").modal("show");
                gameApp.pause = true;
                return;
            }

        }



        for (let index = 0; index < powerUps.length; index++) {
            powerUps[index].particleSystem.rotation.y += THREE.Math.degToRad(700 * gameApp.deltaTime);
            powerUps[index].particleSystem.rotation.x += THREE.Math.degToRad(400 * gameApp.deltaTime);
            powerUps[index].particleSystem.rotation.z += THREE.Math.degToRad(550 * gameApp.deltaTime);
            powerUps[index].cube.rotation.y += THREE.Math.degToRad(700 * gameApp.deltaTime);
            powerUps[index].cube.rotation.x += THREE.Math.degToRad(400 * gameApp.deltaTime);
            powerUps[index].cube.rotation.z += THREE.Math.degToRad(550 * gameApp.deltaTime);
            for (let i = 0; i < Players.length; i++) {
                powerUps[index].getPowerUp(Players[i]);

            }
            if (powerUps[index].canDelete) {
                gameApp.scene.remove(powerUps[index].particleSystem)
                gameApp.scene.remove(powerUps[index].cube)
                powerUps.splice(index, 1);
            }
        }


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
                    gameApp.hit.playAudio();
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

var loader = new THREE.FBXLoader();

$(document).ready(function () {


    gameApp.setupApp();

    playersAmount = $("#playersAmount").text();

    if (playersAmount == 1) {
        $("#player2-health").hide();
        gameApp.scenary1--;
    }

    for (let index = 0; index < playersAmount; index++) {
        loader.load('../Assets/Modelos/Character/Walking.fbx', function (MainChar) {
            MainChar.mixer = new THREE.AnimationMixer(MainChar);
            MainChar.scale.set(2, 2, 2);
            MainChar.name = "Player" + index;

            var action = MainChar.mixer.clipAction(MainChar.animations[0]);
            action.play();
            action.setLoop(THREE.Looponce)
            action.timescale = 500;

            let controller = 0
            if (playersAmount == 1) {
                MainChar.position.x = 0
                controller = 3;
            } else {
                if (index == 0) {
                    controller = 1 //keyboard
                    MainChar.position.x = -42
                } else if (index == 1) {
                    controller = 2 //gamepad
                    MainChar.position.x = 42
                }
            }
            let player = new Player(MainChar, index, controller)
            Players.push(player)
            gameApp.scene.add(player.model);
            Players[index].frames.push(MainChar.mixer);
            gameApp.scenary1--;
        });

    }

    document.addEventListener('keydown', onDocumentKeyDown, false);
    document.addEventListener('keyup', onDocumentKeyUp, false);



    $("#btnPause").click(function () {
        gameApp.pause = true;
    })

    $("#btnResume").click(function () {
        gameApp.pause = false;
    })

    $("#btnMainMenu").click(function () {
        window.location.href = "index.php";
    })

    $(window).blur(function () {
        for (let index = 0; index < Players.length; index++) {
            Players[index].moveRight = false;
            Players[index].moveBackward = false;
            Players[index].moveLeft = false;
            Players[index].moveForward = false;

        }

    });



    loadSceneOne()
    loadSceneTwo();
    loadSceneThree();
    gameApp.gameAudio.playAudio();
    animate();

    $("#btnResume").click(function () {
        $("#pauseModal").modal("hide");
        gameApp.pause = false;
    })

    $("#continuebtn1").click(function () {
        let name = $("#inputname1").val();
        if (name == "") {
            alert("Escribe el nombre de usuario.");
        } else {
            if (playersAmount == 1) {
                $.ajax({
                    dataType: "JSON",
                    method: "POST",
                    url: "../controllers/insertScoreController.php",
                    data: {
                        "name": name,
                        "score": (Players[0].score - (Math.floor(timeCounter)))
                    },
                    success: function (result) {
                        window.location.href = "index.php";
                    },
                    error: function (error) {
                        console.log(error);
                    }
                });

            } else {

                $.ajax({
                    dataType: "JSON",
                    method: "POST",
                    url: "../controllers/insertScoreController.php",
                    data: {
                        "name": name,
                        "score": (Players[0].score - (Math.floor(timeCounter)))
                    },
                    success: function (result) {
                        $("#endgame1").modal("hide");
                        gameApp.clicAudio.playAudio();
                        $("#score2").text(Math.floor(Players[1].score - (Math.floor(timeCounter))));
                        $("#endgame2").modal("show");
                    },
                    error: function (error) {
                        console.log(error);
                    }
                });


            }
        }

    })

    $("#continuebtn2").click(function () {
        let name = $("#inputname2").val();
        if (name == "") {
            alert("Escribe el nombre de usuario.");
        } else {
            $.ajax({
                dataType: "JSON",
                method: "POST",
                url: "../controllers/insertScoreController.php",
                data: {
                    "name": name,
                    "score": (Players[1].score - (Math.floor(timeCounter)))
                },
                success: function (result) {
                    window.location.href = "index.php";
                },
                error: function (error) {
                    console.log(error);
                }
            });
        }

    })

    $("#facebookBtn1").click(function () {
        facebookShare($("#score1").text())
    })

    $("#facebookBtn2").click(function () {
        facebookShare($("#score2").text())
    })

})



















