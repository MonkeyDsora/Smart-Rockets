

class Rocket {
    constructor(x, y, V_, A_, n) {
        this.x = x;
        this.x0 = x;
        this.y = y;
        this.y0 = y;
        this.V = V_;
        this.StartV = V_;
        this.A = A_;
        this.StartA = A_;
        let GenesArray = new Array();

        for (let i = 0; i < n; i++) {
            GenesArray[i] = createVector(random(-1, 1), random(-1, 1));
            GenesArray[i].normalize();
            GenesArray[i].setMag(random(rocketpower));
        }
        this.ThrusterDNA = new DNA(GenesArray);

        this.ThrusterCount = 0;
    }

    show() {

        fill(255, 200);
        ellipse(this.x - w / 2, this.y - h / 2, w, w)
    }

    setDNA(newDNA) {
        this.ThrusterDNA = [];
        this.ThrusterDNA = newDNA;
    }

    update() {

        if (this.ThrusterCount < this.ThrusterDNA.Genes.length) {
            this.A.x += this.ThrusterDNA.Genes[this.ThrusterCount].x;
            this.A.y += this.ThrusterDNA.Genes[this.ThrusterCount].y;
            this.ThrusterCount += 1;
        } else {
            this.A.set(0, 0)
            this.ThrusterCount += 1;
        }

        this.V.x += this.A.x;
        this.V.y += this.A.y;

        this.x += this.V.x;
        this.y -= this.V.y;


    }

    fitness(x, y) {
        let d = dist(this.x, this.y, x, y);
        let fit = dist(this.x0, this.y0, x, y) / d;
        return fit;
    }

    mate(other) {

        let x = this.x0;
        let y = this.y0;
        let newV = createVector(0,0);
        let newA = createVector(0,0);
        let n = this.n;

        let VPickChance = random();
        let APickChance = random();

        /* if (VPickChance <= 0.5) {
            newV = this.StartV;
        } else {
            newV = other.StartV;
        }

        if (APickChance <= 0.5) {
            newA = this.StartA;
        } else {
            newA = other.StartA;
        } */


        let childRocket = new Rocket(x, y, newV, newA, n);

        let nmutations = 0;

        let childDNA = this.ThrusterDNA.crossover(other.ThrusterDNA);
        /* for (let i = 0; i < childDNA.Genes.length; i++) {
            nmutations += childDNA.mutate(i);
        } */

        childRocket.setDNA(childDNA);

        return childRocket;
    }

}