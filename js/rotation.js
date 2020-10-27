function mouseup(event) {
	var id = event.target.id;
	document.getElementById(id).removeAttribute("enterX");
	document.getElementById(id).removeAttribute("enterY");
}

function mousedown(event) {
	var id = event.target.id;
	document.getElementById(id).setAttribute("enterX", event.offsetX);
	document.getElementById(id).setAttribute("enterY", event.offsetY);
}

function rotate(id, degree) {
	var img = document.getElementById(id);
	img.style.transform='rotate(' + degree + 'deg)';
}

function degreesToTurn(x1,y1,x2,y2) {
	var dotProduct = x1*x2+y1*y2;

	var v1 = Math.sqrt(x1*x1+y1*y1);
	var v2 = Math.sqrt(x2*x2+y2*y2);
	if (v1 == 0 || v2 == 0) {
		return 0;
	}
	var radian = Math.acos(dotProduct / v1 / v2);
	var degree = radian * 180 / Math.PI;
	return degree;
}

function mousemove(event) {
	var id = event.target.id;

	if (id!="img1" && id!="img2" && id!="img3") {
		return;
	}

	//var d = document.getElementById(id).getBoundingClientRect();
	//console.log(d);
	var tempX = document.getElementById(id).getAttribute("enterX");
	var tempY = document.getElementById(id).getAttribute("enterY");

	console.log("temp: " + tempX + " " + tempY);
	if (tempX == null || tempY == null) {
		return;
	}
	var enterX = parseInt(tempX);
	var enterY = parseInt(tempY);

	console.log("enter: " + enterX + " " + enterY);
	if (enterX == null || enterY == null) {
		return;
	}

	var centerX = 0;
	var centerY = 0;

	//Determine precisely whether img1 or img2
	if (id=="img2") {
		var x = event.offsetX;
		var y = event.offsetY;
		if ( ((x-134)*(x-134) + (y-134)*(y-134)) > 134*134) {
			console.log("it's img1, not 2");
			id = "img1";
		}
	} else if (id=="img3") {

		var x = event.offsetX;
		var y = event.offsetY;
		if ( ((x-150)*(x-150) + (y-150)*(y-150)) > 150*150) {
			id = "img1";
		}
	}

	if (id=="img1") {
		centerX = 256;
		centerY = 256;
	} else if (id=="img2") {
		centerX = 134;
		centerY = 134;
	} else if (id=="img3") {
		centerX = 150;
		centerY = 150;
	} else {
		return;
	}

	var currentDegree = parseInt(document.getElementById(id).getAttribute("currentdegree"));
	
	console.log("offsets: " + event.offsetX + " " + event.offsetY + " " + centerX + " " + centerY);
	enterX = enterX - centerX;
	enterY = enterY - centerY;
	var currentX = event.offsetX - centerX;
	var currentY = event.offsetY - centerY;

	var dot_product = (enterX * currentY) - (enterY * currentX) ;
	var degree = degreesToTurn(enterX,enterY,currentX,currentY) || 0;
	if (dot_product < 0) {
		degree = degree * -1;
	}
	degree = (currentDegree + degree) % 360;

	
	//degree = parseInt(document.getElementById(id).getAttribute("currentdegree"));
	//degree += 30;
	console.log("Pre-trun:" + event.offsetX + " " + event.offsetY);
	rotate(id, degree);
	console.log("Post-trun:" + event.offsetX + " " + event.offsetY);
	document.getElementById(id).setAttribute("currentdegree", degree);
	console.log("degree: " + degree);
	document.getElementById(id).setAttribute("enterX", event.offsetX);
	document.getElementById(id).setAttribute("enterY", event.offsetY);
}

function rotator(event) {
	rotate('img1',30);
	
}

function color(event) {
	document.getElementById("p1").textContent="Dent";
}

function color2(event) {
	document.getElementById("p1").textContent="這是文字";
}
