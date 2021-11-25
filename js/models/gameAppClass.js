

class GameApp {
    static instance;

    constructor() {
        if (!!GameApp.instance) {
            return GameApp.instance;
        }
        GameApp.instance = this;
        this.scene = new THREE.Scene();
        this.sceneAux = new THREE.Scene();
        this.camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
        this.renderer = new THREE.WebGLRenderer();
        this.firstSceneComplete = false;
        this.secondSceneComplete = false;
        this.thirdSceneComplete = false;

        this.pause = false;
        this.clock = new THREE.Clock();
        this.deltaTime = 0;
        this.frames = 0;
        this.angle = 0;

        this.scenary1 = 9;
        this.powerUpExecuted = false;

        this.gameAudio = new AudioClassASG('../Assets/Sonidos/Cartoon_Suspense.mp3', true, 0.15);

        this.BossAudio = new AudioClassASG('../Assets/Sonidos/Boss.mp3', true, 0.25);


        this.hit = new AudioClassASG('../Assets/Sonidos/MC_hitF.mp3', false, 0.18);

        this.clicAudio = new AudioClassASG('../Assets/Sonidos/Clic.mp3', false, 0.5);

        this.victory = new AudioClassASG('../Assets/Sonidos/victory.mp3', false, 0.5);

    }

    setupApp() {
        gameApp.camera.position.y = 100;
        gameApp.camera.lookAt(0, -20, 0);


        this.renderer.setClearColor(new THREE.Color(255, .2, 255));
        this.renderer.setSize(window.innerWidth, window.innerHeight);
        document.body.appendChild(this.renderer.domElement);


        var directional = new THREE.DirectionalLight(new THREE.Color(1, 1, 1), 0.5);
        directional.position.set(0, 0, 1);
        gameApp.scene.add(directional);

        var ambient = new THREE.AmbientLight(new THREE.Color(1, 1, 1), 1.0);
        gameApp.scene.add(ambient);
    }

    resize() {
        gameApp.renderer.setSize(window.innerWidth, window.innerHeight);
        gameApp.camera.aspect = window.innerWidth / window.innerHeight;
        gameApp.camera.updateProjectionMatrix();
    }

    randomFloat(min, max) {

        return parseFloat((Math.random() * (min - max) + max).toFixed(4))
    }

    random1_2() {
        let value = Math.floor(Math.random() * 2);
        if (value == 0)
            return 1
        else if (value == 1)
            return 2
    }

    RandomSpawnX() {
        var lado = Math.random();
        var x = 0;
        if (lado <= 0.5) {
            x = Math.random() * (140 - 130 + 1) + 130;
        } else {
            x = Math.random() * (-140 - (-130) + 1) + (-130);
        }
        return x;
    }
    RandomSpawnY() {
        var lado = Math.random();
        var z = 0;
        if (lado <= 0.5) {
            z = Math.random() * (60 - 20 + 1) + 20;
        } else {
            z = Math.random() * (-60 - (-20) + 1) + (-20);
        }
        return z;
    }

    getRandomMinMax(min, max) {
        return Math.random() * (max - min) + min;
    }

    RandomColor() {
        var letters = '0123456789ABCDEF';
        var color = '#';
        for (var i = 0; i < 6; i++) {
            color += letters[Math.floor(Math.random() * 16)];
        }
        return color;
    }

    collisionFirstScene(a) {
        return (a.model.position.x - 5 <= 108 && a.model.position.x + 5 >= -112.5) &&
            (a.model.position.z - 5 <= 43 && a.model.position.z + 5 >= -43);
    }
}


const gameApp = new GameApp();