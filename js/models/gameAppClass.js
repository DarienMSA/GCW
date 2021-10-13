class GameApp{
    static instance;
    
    constructor(){
        if(!!GameApp.instance){
            return GameApp.instance;
        }
        GameApp.instance = this;
        this.scene = new THREE.Scene();
        this.camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
        this.renderer = new THREE.WebGLRenderer();
        this.ready = 2;
    }

    setupApp(){
        this.renderer.setClearColor(new THREE.Color(255, .2, 255));
        this.renderer.setSize(window.innerWidth, window.innerHeight);
        document.body.appendChild(this.renderer.domElement);
    }
}

const gameApp = new GameApp();
gameApp.setupApp();