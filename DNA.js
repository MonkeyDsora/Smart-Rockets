
class DNA {
    constructor(n) {
        this.SpeedGenes = new Array();
        this.PositionGenes = new Array();
        for (let i = 0; i < n; i++) {
            this.SpeedGenes[i] = random(-0.01,0.01);
            this.PositionGenes[i] = random(-0.01,0.01);
        }
    }

    setGenes(newSpeedGenes, newPositionGenes){
        this.SpeedGenes = newSpeedGenes;
        this.PositionGenes = newPositionGenes;
    }

    crossover(other) {
        let nGenes = this.SpeedGenes.length;
        if (nGenes != other.SpeedGenes.length) { return; }

        let newSpeedGenes = new Array();
        let newPositionGenes = new Array();

        for (let i = 0; i < nGenes; i++) {
            let Pick = random();
            if (Pick < 0.5) {
                newSpeedGenes[i] = this.SpeedGenes[i];
                newPositionGenes[i] = this.PositionGenes[i];
            } else {
                newSpeedGenes[i] = other.SpeedGenes[i];
                newPositionGenes[i] = other.PositionGenes[i];
            }
        }

        let childDNA = new DNA(nGenes);
        childDNA.setGenes(newSpeedGenes, newPositionGenes);

        return childDNA;
    }


}