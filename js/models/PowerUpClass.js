const PowerUp_ID = {
    ATTACK: 1,
    MOVEMENT_SPEED: 2,
    BULLET_PER_SECOND: 3,
    HEALTH: 4,
}

const PowerUp_Name = {
    ATTACK: "attack",
    MOVEMENT_SPEED: "speed",
    BULLET_PER_SECOND: "bullet_fps",
    HEALTH: "health",
}

const PowerUp_Multiplier = {
    ATTACK: 1,
    MOVEMENT_SPEED: .25,
    BULLET_PER_SECOND: .25,
    HEALTH: .25,
}

const PowerUp_Particle_URL = {
    ATTACK: "../Assets/Particulas/attack.png",
    MOVEMENT_SPEED: "../Assets/Particulas/speed.png",
    BULLET_PER_SECOND: "../Assets/Particulas/bps.png",
    HEALTH: "../Assets/Particulas/health.png",
}

const PowerUp_Particle_COLOR = {
    ATTACK: new THREE.Color(0.64, 0.28, 0.64),
    MOVEMENT_SPEED: new THREE.Color(1, 0.94, 0),
    BULLET_PER_SECOND: new THREE.Color(0.24, 0.28, 0.8),
    HEALTH: new THREE.Color(0.92, 0.11, 0.14),
}

class PowerUp {
    constructor(_position) {
        this.powerUp = this.randomPowerUp();
        this.particles_arr = [];
        this.particleCount = 50;
        this.canDelete = false;
        this.position = _position;

        var m = new THREE.MeshBasicMaterial({ color: this.getPowerUpColor() });
        m.depthTest = false;
        m.wireframe = true;
        m.wireframeLinewidth = 3;

        this.cube = new THREE.Mesh(
            new THREE.BoxGeometry(5, 5, 5),
            m
        );
        this.cube.position.set(_position.x, _position.y, _position.z);

        this.powerUpAppeared = new AudioClassASG("../Assets/Sonidos/powerUpAppeared.wav", false, 0.18)
        this.powerUpAppeared.playAudio();

        this.powerUpObtained = new AudioClassASG("../Assets/Sonidos/powerUpObtained.wav", false, 0.18)



        this.particles = new THREE.Geometry();
        this.pMaterial = new THREE.PointsMaterial({



            color: new THREE.Color(1, 1, 1),
            size: 1,
            map: THREE.ImageUtils.loadTexture(this.getPowerUpURL()),
            //blending: THREE.AdditiveBlending,
            transparent: true
        });

        for (var i = 0; i < this.particleCount; i++) {



            var px = gameApp.getRandomMinMax(0 - 7, 0 + 7);
            var py = gameApp.getRandomMinMax(2 - 7, 2 + 7);
            var pz = gameApp.getRandomMinMax(0 - 7, 0 + 7);



            var particle = new THREE.Vector3(px, py, pz);



            particle.velocity = new THREE.Vector3(0, -Math.random(), 0);

            this.particles.vertices.push(particle);
        }

        this.particleSystem = new THREE.Points(this.particles, this.pMaterial);
        this.particleSystem.position.set(this.position.x, this.position.y, this.position.z);

        gameApp.scene.add(this.particleSystem);
        gameApp.scene.add(this.cube);

    }

    randomPowerUp() {
        let pu_id = Math.floor((Math.random() * (1 - 5) + 5));
        switch (pu_id) {
            case PowerUp_ID.ATTACK:
                return PowerUp_Name.ATTACK
                break;
            case PowerUp_ID.MOVEMENT_SPEED:
                return PowerUp_Name.MOVEMENT_SPEED
                break;
            case PowerUp_ID.BULLET_PER_SECOND:
                return PowerUp_Name.BULLET_PER_SECOND
                break;
            case PowerUp_ID.HEALTH:
                return PowerUp_Name.HEALTH
                break;

        }
    }

    getPowerUpURL() {
        switch (this.powerUp) {
            case PowerUp_Name.ATTACK:
                return PowerUp_Particle_URL.ATTACK
                break;
            case PowerUp_Name.MOVEMENT_SPEED:
                return PowerUp_Particle_URL.MOVEMENT_SPEED
                break;
            case PowerUp_Name.BULLET_PER_SECOND:
                return PowerUp_Particle_URL.BULLET_PER_SECOND
                break;
            case PowerUp_Name.HEALTH:
                return PowerUp_Particle_URL.HEALTH
                break;

        }
    }

    getPowerUpColor() {
        switch (this.powerUp) {
            case PowerUp_Name.ATTACK:
                return PowerUp_Particle_COLOR.ATTACK
                break;
            case PowerUp_Name.MOVEMENT_SPEED:
                return PowerUp_Particle_COLOR.MOVEMENT_SPEED
                break;
            case PowerUp_Name.BULLET_PER_SECOND:
                return PowerUp_Particle_COLOR.BULLET_PER_SECOND
                break;
            case PowerUp_Name.HEALTH:
                return PowerUp_Particle_COLOR.HEALTH
                break;

        }
    }

    getPowerUp(p) {
        if (p.hasPowerUp)
            return;
        if (p.model.position.x >= this.position.x - 5 && p.model.position.x <= this.position.x + 5 &&
            p.model.position.z >= this.position.z - 5 && p.model.position.z <= this.position.z + 5) {
            switch (this.powerUp) {
                case PowerUp_Name.ATTACK:
                    Players[p.index].damage += PowerUp_Multiplier.ATTACK;
                    break;
                case PowerUp_Name.MOVEMENT_SPEED:
                    Players[p.index].speed += PowerUp_Multiplier.MOVEMENT_SPEED * p.speed;
                    break;
                case PowerUp_Name.BULLET_PER_SECOND:
                    Players[p.index].shootCooldown -= PowerUp_Multiplier.BULLET_PER_SECOND * p.shootCooldown;
                    break;
                case PowerUp_Name.HEALTH:
                    Players[p.index].health += PowerUp_Multiplier.HEALTH * 100;
                    if (Players[p.index].health > 100) Players[p.index].health = 100;

                    let healthBar = ((PowerUp_Multiplier.HEALTH * 100) / 100) * 300
                    healthBar = Math.round(healthBar)

                    if (p.index == 0) {
                        $("#player1-health .progress .progress-done").animate({
                            width: `+=${healthBar}px`
                        }, "fast");
                    } else {
                        $("#player2-health .progress .progress-done").animate({
                            width: `+=${healthBar}px`
                        }, "fast");
                    }
                    break;

            }
            this.powerUpObtained.playAudio();
            Players[p.index].hasPowerUp = true;
            this.canDelete = true;
        }
    }


}

var powerUps = [];

var spawnPowerUps = (function () {

    return function () {
        if (!gameApp.powerUpExecuted) {
            gameApp.powerUpExecuted = true;
            if (playersAmount == 1) {
                var position = new THREE.Vector3(0, 0, 30);
                let powerUp = new PowerUp(position)
                powerUps.push(powerUp);
            } else {
                for (let index = 0; index < playersAmount; index++) {
                    if (!Players[index].alive) {
                        Players[index].hasPowerUp = true;
                        continue;
                    }

                    var position = new THREE.Vector3();
                    if (index == 0) {
                        position.set(-42, 0, 30);
                    } else {
                        position.set(42, 0, 30);
                    }

                    let powerUp = new PowerUp(position)
                    powerUps.push(powerUp);

                }

            }
        }
    };
})();