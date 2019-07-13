
class Rocket {
    constructor(R, V, A, n) {
        this.R = R.copy();
        this.V = V.copy();
        this.A = A.copy();
        this.DNA = new DNA(n);
        this.n = n;
        this.TargetVector = createVector(x_target - this.R.x, y_target - this.R.y);
    }

    show() {
        ellipse(this.R.x, this.R.y, 10);
    }

    update() {
        this.V.add(this.A);
        this.R.add(this.V);
        this.TargetVector.set(this.aimTarget(x_target,y_target));

    }

    aimTarget(x_target, y_target) {
        let TargetVector = createVector(x_target - this.R.x, y_target - this.R.y);
        return TargetVector;
    }

    TargetSpeed(x_target, y_target) {
        let Speedvector = createVector(x_target, y_target);
        Speedvector.sub(this.TargetVector);
        return Speedvector;
    }

    fitness(x_target, y_target) {
        let f = dist(0, 0, x_target, y_target) / this.TargetVector.mag();
        return f;
    }

    thrust(index) {
        if (index >= this.n) {
            this.V.set(createVector(0, 0));
            this.A.set(createVector(0, g));
            return;
        }

        let SpeedUpdate = this.TargetSpeed(x_target, y_target);
        SpeedUpdate.setMag(this.DNA.SpeedGenes[index]);

        let PositionUpdate = this.aimTarget(x_target, y_target).copy();
        PositionUpdate.setMag(this.DNA.PositionGenes[index]);

        let AccelUpdate = createVector(0,0);
        AccelUpdate.add(SpeedUpdate);
        AccelUpdate.add(PositionUpdate)

        this.A.add(AccelUpdate);
    }

    mate(other) {
        let R0 = createVector(0, 0);
        let V0 = createVector(0, 0);
        let A0 = createVector(0, g);
        let childrocket = new Rocket(R0, V0, A0, this.n)

        let newDNA = this.DNA.crossover(other.DNA);
        childrocket.DNA = newDNA;

        return childrocket;
    }
}