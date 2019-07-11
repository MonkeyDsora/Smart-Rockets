class DNA {
    constructor(Arr) {
        this.Genes = new Array();
        this.Genes = Arr;
    }

    mutate(index) {
        let MutChance = random();
        if (MutChance <= 0.0006) {
            let newGene = createVector(random(-1, 1), random(-1, 1));
            newGene.normalize();
            newGene.setMag(random(rocketpower/3));
            this.Genes[index].add(newGene);
            return 1;
        } else {
            return 0;
        }
    }

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

        let newDNA = new DNA(newGenes)
        return newDNA;
    }
}