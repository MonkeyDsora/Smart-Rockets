let w = 10;
let h = 30;
let rockets = new Array();
let g = -0.0;
let x_target = 0;
let y_target = -500;
let Ratio = 5;
let rocketpower = 0.01;


function setup() {
	createCanvas(windowWidth, windowHeight);

	for (let i = 0; i < 100; i++) {
		/* 		V0 = createVector(random(-1, 1), 1).setMag(random(2, 5));
		 */
		V0 = createVector(0, 0)
		A0 = createVector(0, g);
		rockets[i] = new Rocket(0, -100, V0, A0, 100);
	}

	slider = createSlider(0.001, 0.5);


}

function draw() {
	background(51);
	translate(width / 2 - w / 2, height - h / 2)
	slider.show();

	push();
	fill(255,0,0)
	ellipse(x_target, y_target, 20, 20);
	pop();

	for (let i = 0; i < rockets.length; i++) {
		rockets[i].update();
		rockets[i].show();
	}


	let fmax = 0;

	if (rockets[0].ThrusterCount >= 200) {
		let MatingPool = new Array();
		let childrockets = new Array();
		for (let i = 0; i < rockets.length; i++) {
			let f = floor(rockets[i].fitness(x_target, y_target) * 100);
			if (f > fmax){ fmax = f;}
			for (let j = 0; j < f; j++) {
				MatingPool.push(rockets[i]);
			}
		}


		for (let i = 0; i < rockets.length; i++) {
			let mom = random(MatingPool);
			let dad = random(MatingPool);

			childrockets[i] = mom.mate(dad);
		}

		rockets = childrockets;

	}







}