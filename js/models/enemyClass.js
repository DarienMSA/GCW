class EnemyClass {
    constructor(Mesh, posX, posZ) {
        
        this.enemy = Mesh;
        this.enemy.alive = true;
        this.enemy.position.x = posX;
        this.enemy.position.z = posZ;
        this.health = 500;
    }

    updateEnemy() {
        if (!this.enemy.alive)
            return;
        var MainChar = gameApp.scene.getObjectByName("Main_Char");
        
        let disX = MainChar.position.x - this.enemy.position.x;
        let disZ = MainChar.position.z - this.enemy.position.z;

        var hyp = Math.sqrt(disX * disX + disZ * disZ);
        //if(hyp < 20){
        disX /= hyp;
        disZ /= hyp;

        this.enemy.position.x += disX * 0.5 * .1;
        this.enemy.position.z += disZ * 0.5 * .1;

        this.enemy.lookAt(MainChar.position)
        //}
    }

    hitByBullet(b) {
        if (!this.enemy.alive)
            return;
        if (b.position.x >= this.enemy.position.x - 5 && b.position.x <= this.enemy.position.x + 5 &&
            b.position.z >= this.enemy.position.z - 5 && b.position.z <= this.enemy.position.z + 5) {
            
            b.alive = false;
            gameApp.scene.remove(b);
            this.health--;
            if (this.health == 0) {
                this.enemy.alive = false;
                gameApp.scene.remove(this.enemy);
                delete (this);
            }
        }
    }
}

var EnemyAnts = [];