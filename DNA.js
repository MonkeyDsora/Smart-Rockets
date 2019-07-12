class DNA {
    constructor(VectorArray, ScalarArray) {
        this.Genes = new Array();
        for (let i = 0; i < VectorArray.length; i++) {
            this.Genes[i] = [VectorArray[i], ScalarArray[i]];
        }
    }

    /* mutate(index) {
        let MutChance = random();
        if (MutChance <= 0.0001) {
            let newGene = createVector(random(-1, 1), random(-1, 1));
            newGene.normalize();
            newGene.setMag(random(rocketpower * 2));
            this.Genes[index].add(newGene);
            return 1;
        } else {
            return 0;
        }
    } */

    crossover(other) {
        if (this.Genes.length !== other.Genes.length) {
            return;
        }

        let newGenes = new Array();

        for (let i = 0; i < this.Genes.length; i++) {
            let RandomPick = random();
            if (RandomPick >= 0.5) {
                newGenes[i] = this.Genes[i];
            } else {
                newGenes[i] = other.Genes[i];
            }
        }

        let VectorArray = new Array();
        let ScalarArray = new Array();
        let VectorLengthArray = new Array();

        for (let i = 0; i < newGenes.length; i++) {
            VectorArray[i] = newGenes[i][0];
            ScalarArray[i] = newGenes[i][1];
            VectorLengthArray[i] = newGenes[i][0].mag();
        }

        let newDNA = new DNA(VectorArray, ScalarArray);

        console.log(min(VectorLengthArray));

        return this;
    }
}