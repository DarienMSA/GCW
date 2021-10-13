class LoaderFbxClass{
    static instance;
    constructor(){
        if(!!LoaderFbxClass.instance){
            return LoaderFbxClass.instance;
        }
        LoaderFbxClass.instance = this;
        this.loader = new THREE.FBXLoader();
        
    }

    loadFbx(url){
        loader.load(url, function (model) {
            model.mixer = new THREE.AnimationMixer(model);
            model.scale.set(.02, .015, .015);
           
            //EnemyAnts.position.y = 1;
            //EnemyAnt.rotation.x= THREE.Math.degToRad(90);
            var action = model.mixer.clipAction(model.animations[0]);
            action.play();
            action.setLoop(THREE.Looponce)
            action.timescale = 50;
            objs.push(model.mixer);
            //model.name = "Enemy_Ant";
            model.traverse(function (child) {
                if (child.isMesh) {
                    child.castShadow = true;
                    child.receiveShadow = true;
                }
            });
        
               
            //enemyGen.setEnemy(enemyType.ANT, EnemyAnt);
        
            var clone = SkeletonUtils.clone(model);
        
            gameApp.scene.add(clone)
            
            
        });
    }

}