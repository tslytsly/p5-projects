let lengthOne, tickLength, tickOffset, xCenter, yCenter;
let tickCol, xCol, yCol, iHatCol, jHatCol;
let iHat, jHat;

let iXvector, iYvector, jXvector, jYvector;

function setup() {
	// createCanvas(800, 600);
	createCanvas(800, 600);
	lengthOne = width/16;
	tickLength = 10;
	tickOffset = tickLength/2;
	xCenter = width/2;
	yCenter = height/2;

	tickCol = color(0, 150, 255, 125);
	xCol = color(125, 200);
	yCol = color(125, 200);
	iHatCol = color(0,200,0,200);
	jHatCol = color(200, 0, 0, 200);

	iHat = createVector(0 + lengthOne, 0);
	jHat = createVector(0, 0 - lengthOne);

	let xOffset = width / 2 - lengthOne;
	let yOffset = height / 2 - lengthOne;
	iXvector = createSlider(-xOffset - lengthOne, xOffset + lengthOne, 0, lengthOne);
	iYvector = createSlider(-yOffset - lengthOne, yOffset+lengthOne, 0, lengthOne);
	jXvector = createSlider(-xOffset - lengthOne, xOffset + lengthOne, 0, lengthOne);
	jYvector = createSlider(-yOffset - lengthOne, yOffset + lengthOne, 0, lengthOne);

	iXvector.position(10,height + 10);
	jXvector.position(150,height + 10);
	iYvector.position(10, height + 40);
	jYvector.position(150, height + 40);


}

function draw() {
	background(0);

	// let newIhat = p5.Vector.add(iXvector.value(), iYvector.value());
	// let newJhat = p5.Vector.add(jXvector.value(), jYvector.value());
	let newIhat = p5.Vector.add(iHat, createVector(iXvector.value(), iYvector.value()));
	let newJhat = p5.Vector.add(jHat, createVector(jXvector.value(), jYvector.value()));


	// draw background grid, this will not move
	drawGrid(xCol, yCol, .5, .5);
	drawTickMarks(tickCol, 1);
	stroke(255);
	strokeWeight(5);
	point(xCenter, yCenter);

	// Draw matrix tanslation
	translate(xCenter, yCenter);
	strokeWeight(1);
	drawArrow(0, 0, newIhat.x, newIhat.y, 10, iHatCol);
	drawArrow(0, 0, newJhat.x, newJhat.y, 10, jHatCol);
}

function drawArrow (_x1, _y1, _x2, _y2, _triSize, _col) {
	stroke(_col);
	fill(_col);
	line(_x1, _y1, _x2, _y2); //draw a line beetween the vertices

	// this code is to make the arrow point
	push() //start new drawing state
	let angle = atan2(_y1 - _y2, _x1 - _x2); //gets the angle of the line
	translate(_x2, _y2); //translates to the destination vertex
	rotate(angle - HALF_PI); //rotates the arrow point
	triangle(-_triSize * .5, _triSize, _triSize * .5, _triSize, 0, 0);
	pop();
}

function drawGrid(_xCol, _yCol, xStrW, yStrW) {

	// Draw x grid
	stroke(_xCol);
	strokeWeight(xStrW);
	for (let i = 0; i <= width; i += lengthOne) {
		if (i == width) {
			line(i - 1, 0, i - 1, height);
		} else {
			line(i, 0, i, height);
		}
	}

	// Draw y grid
	stroke(_yCol);
	strokeWeight(yStrW);
	for (let i = 0; i <= height; i += lengthOne) {
		if (i == height) {
			line(0, i - 1, width, i - 1);
		} else {
			line(0, i, width, i);
		}
	}
}

function drawTickMarks(_col, strW){
	let col = _col;
	
	// Draw x/y lines
	strokeWeight(strW);
	stroke(col);
	line(0, yCenter, width, yCenter);
	line(xCenter, 0, xCenter, height);

	// Draw tick marks
	for (let i = 0; i <= width; i += lengthOne) {
		if (i == width) {
			line(i - 1, yCenter - tickOffset, i - 1, yCenter + tickOffset)
		} else {
			line(i, yCenter - tickOffset, i, yCenter + tickOffset);
		}
	}
	for (let i = 0; i <= height; i += lengthOne) {
		if (i == height) {
			line(xCenter - tickOffset, i - 1, xCenter + tickOffset, i - 1);
		} else {
			line(xCenter - tickOffset, i, xCenter + tickOffset, i);
		}
	}
}