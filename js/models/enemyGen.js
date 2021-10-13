const enemyType = {
	ANT: "ant",
	SPIDER: "spider",
	FLY: "fly",
	BOSS: "boss",
}

const enemyCount = {
	ANT: 3,
	SPIDER: 2,
	FLY: 0,
	BOSS: 0,
}

const enemyURL = {
	ANT: "../Assets/Modelos/EnemyAnt.fbx",
	SPIDER: 2,
	FLY: 0,
	BOSS: 0,
}



class EnemyGenerator{
    static instance;
    constructor(){
        if(!!EnemyGenerator.instance){
            return EnemyGenerator.instance;
        }
        EnemyGenerator.instance = this;
       
        
    }
    loadModel(){
        
    }

    setEnemy(e, model){
        switch (e) {
            case enemyType.ANT:
                
                for (let index = 0; index < enemyCount.ANT; index++) {
                    let enemy = new EnemyClass(model.clone(), RandomSpawnX(), RandomSpawnY());
                    EnemyAnts.push(enemy);
                    gameApp.scene.add(enemy.enemy)
                    console.log(enemy.enemy.position);
                    
                }
                gameApp.ready--;
            case enemyType.SPIDER:

            case enemyType.FLY:

            case enemyType.BOSS:

        }
    }

    

    

}

var enemyGen = new EnemyGenerator();