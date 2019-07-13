let g = 0;

let x_target;
let y_target;

let nrockets = 100;
let rockets = new Array();
let R0;
let V0;
let A0;
let n;

let ThrustCount;
let frame;

function setup() {
	createCanvas(windowWidth, windowHeight);
	x_target = 0;
	y_target = -windowHeight * 0.75;

	R0 = createVector(0, 0);
	V0 = createVector(0, 0);
	A0 = createVector(0, g);
	n = 40;

	ThrustCount = 0;
	frame = 0;

	for (let i = 0; i < nrockets; i++) {
		rockets[i] = new Rocket(R0, V0, A0, n);
	}

}

function draw() {
	translate(windowWidth / 2, windowHeight - 50);
	background(51);

	let x_origin = 0;
	let y_origin = -windowHeight * 0.75;
	let Amp = y_origin * 0.2 + random (-0.1,0.1);
	let Period = 20

	x_target = Amp * sin(1/Period * frame) + x_origin;
	y_target = Amp * cos(1/Period * frame) + y_origin;

	push();
	fill(255, 0, 0);
	ellipse(x_target, y_target, 20, 20);
	pop();

	for (let i = 0; i < nrockets; i++) {
		if (ThrustCount < rockets[i].DNA.SpeedGenes.length) { rockets[i].thrust(ThrustCount); }
		rockets[i].update();
		rockets[i].show();
	}

	ThrustCount++;
	frame += 1;

	if (ThrustCount >= n + 50) {
		let childrockets = NextGen(rockets)
		rockets = childrockets;
		ThrustCount = 0;

	}


}

function NextGen(parentrockets) {
	let MatingPool = new Array();
	let FitnessArray = new Array();
	let childrockets = new Array();

	let SumFit = 0;
	for (let i = 0; i < parentrockets.length; i++) {
		FitnessArray[i] = parentrockets[i].fitness(x_target, y_target);
	}

	for (let i = 0; i < FitnessArray.length; i++) {
		SumFit += FitnessArray[i];
		FitnessArray[i] = FitnessArray[i] / max(FitnessArray);
		for (let j = 0; j < FitnessArray[i] * 100; j++) {
			MatingPool.push(parentrockets[i]);
		}
	}

	for (let i = 0; i < parentrockets.length; i++) {
		let mom = random(MatingPool);
		let dad = random(MatingPool);

		childrockets[i] = mom.mate(dad);
	}

	return childrockets;
}