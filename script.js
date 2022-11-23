const canvas = document.querySelector("canvas");
const ctx = canvas.getContext("2d");
canvas.addEventListener("click", rectangleClick);

document.querySelector('.download').addEventListener('click', function(e) {
    let canvasUrl = canvas.toDataURL();
    const createEl = document.createElement('a');
    createEl.href = canvasUrl;
    createEl.download = "mondrian-wallpaper";
    createEl.click();
    createEl.remove();
});

canvas.width = window.innerWidth;
canvas.height = window.innerHeight;
ctx.lineWidth = 10;

const rectangles = [];
let splitDirectionVertical = true;

function drawRectangles() {
	rectangles.forEach((rectangle) => {
		ctx.fillStyle = rectangle.color;
		ctx.beginPath();
		ctx.rect(rectangle.x, rectangle.y, rectangle.width, rectangle.height);
		ctx.closePath();
		ctx.fill();
		ctx.stroke();
	});
}

function rectangleClick(e) {
	const clickedRectangleIndex = rectangles.findIndex((rectangle) => {
		if (
			e.x > rectangle.x &&
			e.x < rectangle.x + rectangle.width &&
			e.y > rectangle.y &&
			e.y < rectangle.y + rectangle.height
		) {
			return true;
		}
	});

	if (clickedRectangleIndex === -1) {
		splitDirectionVertical = !splitDirectionVertical;
		return;
	}
	const clickedRectangle = rectangles[clickedRectangleIndex];

	rectangles.splice(clickedRectangleIndex, 1);
	splitRectangleAt(clickedRectangle, {
		x: e.x - clickedRectangle.x,
		y: e.y - clickedRectangle.y,
	});
}

function splitRectangleAt(rectangle, position) {
	if (splitDirectionVertical) {
		rectangles.push({
			x: rectangle.x,
			y: rectangle.y,
			width: position.x,
			height: rectangle.height,
			color: getColor()
		});
		rectangles.push({
			x: rectangle.x + position.x,
			y: rectangle.y,
			width: rectangle.width - position.x,
			height: rectangle.height,
			color: getColor()
		});
	} else {
		rectangles.push({
			x: rectangle.x,
			y: rectangle.y,
			width: rectangle.width,
			height: position.y,
			color: getColor()
		});
		rectangles.push({
			x: rectangle.x,
			y: rectangle.y + position.y,
			width: rectangle.width,
			height: rectangle.height - position.y,
			color: getColor()
		});
	}
	splitDirectionVertical = !splitDirectionVertical;
	drawRectangles();
}


function getColor() {
	const colors = [
		"#EBEBED",
		"#EBEBED",
		"#EBEBED",
		"#EBEBED",
		"#EBEBED",
		"#EBEBED",
		"#EBEBED",
		"#EBEBED",
		"#C53632",
		"#3E4984",
		"#F8DD67",
	];
	return colors[Math.floor(Math.random() * colors.length)];
}

rectangles.push({
	x: 0,
	y: 0,
	width: window.innerWidth,
	height: window.innerHeight,
	color: "#EBEBED"
});

drawRectangles();
