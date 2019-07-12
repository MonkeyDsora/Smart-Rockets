let w = 10;
let h = 30;
let rockets = new Array();
let frame = 0;
let x_target = 0;

let y_target = -500;
let g = -0.0;

let DNAlength = 50;

let rocketpower = 0.01;

//setup the canvas and the initial rocket array
function setup() {
	createCanvas(windowWidth, windowHeight);

	for (let i = 0; i < 1; i++) {
		V0 = createVector(0, 0)
		A0 = createVector(0, g);
		rockets[i] = new Rocket(0, -200, V0, A0, DNAlength);
	}
}

function draw() {
	background(51);
	translate(width / 2 - w / 2, height - w / 2)

	push();
	fill(255, 0, 0)
	/* 	x_target = 200 * sin(1 / 50 * frame);
		y_target = -500; */
	ellipse(x_target, y_target, 20, 20);
	frame++;
	pop();

	for (let i = 0; i < rockets.length; i++) {
		rockets[i].update();
		rockets[i].show();
	}

	if (rockets[0].ThrusterCount == 199) {
		console.log(rockets[0])
	}

	if (rockets[0].ThrusterCount >= 200) {
		let childrockets = new Array();
		let V = createVector(0, 0);
		let A = createVector(0, 0);

		childrockets = NextGen(rockets)
		rockets = [];
		rockets = childrockets;
	}
}

function NextGen(parentrockets) {
	let MatingPool = new Array();
	let childrockets = new Array();
	let FitnessArray = new Array();

	for (let i = 0; i < parentrockets.length; i++) {
		FitnessArray[i] = parentrockets[i].fitness(x_target, y_target);
	}

	for (let i = 0; i < FitnessArray.length; i++) {
		let Fit = FitnessArray[i] / max(FitnessArray)
		for (let j = 0; j < Fit * 100; j++) {
			MatingPool.push(parentrockets[i]);
		}
	}
	
	for (let i = 0; i < parentrockets.length; i++) {
		let mom = random(MatingPool);
		let dad = random(MatingPool);

		childrockets[i] = mom.mate(dad);
		childrockets[i].ThrusterCount = 0;
	}


	/* for (let i = 0; i < childrockets[0].ThrusterDNA.Genes.length; i++) {
		console.log(childrockets[0].ThrusterDNA.Genes[i][0].mag() - mom.ThrusterDNA.Genes[i][0].mag());
	} */

	return childrockets;

}