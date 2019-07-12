

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
        let VectorArray = new Array();
        let ScalarArray = new Array();
        this.n = n;

        for (let i = 0; i < this.n; i++) {
            VectorArray[i] = createVector(random(-1, 1), random(-1, 1));
            VectorArray[i]
            VectorArray[i].setMag(random(0.1));
            ScalarArray[i] = -1;
        }
        this.ThrusterDNA = new DNA(VectorArray, ScalarArray);

        this.ThrusterCount = 0;
    }

    show() {

        fill(255, 200);
        ellipse(this.x, this.y, w, w)
    }

    setDNA(newDNA) {

        let VectorArray = new Array();
        let ScalarArray = new Array();
        for (let i = 0; i < newDNA.Genes.length; i++) {
            VectorArray[i] = newDNA.Genes[i][0];
            ScalarArray[i] = newDNA.Genes[i][1];
        }

        this.ThrusterDNA = new DNA(VectorArray, ScalarArray)
    }

    update() {

        let AimVector = this.aimTarget(x_target, y_target);
        AimVector.normalize();

        if (this.ThrusterCount < this.ThrusterDNA.Genes.length) {
            let CurrentThrust = this.ThrusterDNA.Genes[this.ThrusterCount];
            let AccelMag = AimVector.x * CurrentThrust[0].x;
            AccelMag += AimVector.y * CurrentThrust[0].y;
            AccelMag *= CurrentThrust[1];

            let AccelVector = CurrentThrust[0].normalize();
            AccelVector.mult(AccelMag);

            this.A.x += AccelVector.x;
            this.A.y += AccelVector.y;
            this.ThrusterCount += 1;
        } else {
            this.V.set(0, 0)
            this.A.set(0, g)
            this.ThrusterCount += 1
        }

        this.V.x += this.A.x;
        this.V.y += this.A.y;


        this.x += this.V.x;
        this.y -= this.V.y;


    }

    aimTarget(x, y) {
        return createVector(x - this.x, y - this.y);
    }

    fitness(x, y) {
        let d = dist(this.x, this.y, x, y);
        let fit = dist(this.x0, this.y0, x, y) / pow(d, 1);
        return fit;
    }

    mate(other) {

        let x = this.x0;
        let y = this.y0;
        let newV = createVector(0, 0);
        let newA = createVector(0, g);
        let n = this.n;

        let childRocket = new Rocket(x, y, newV, newA, n);
        let childDNA = this.ThrusterDNA.crossover(other.ThrusterDNA);

        /* let nmutations = 0;
        for (let i = 0; i < childDNA.Genes.length; i++) {
            nmutations += childDNA.mutate(i)
        }
        console.log(nmutations) */

        childRocket.setDNA(childDNA);

        return childRocket;
    }



}