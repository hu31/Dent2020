function log(str) {
	document.getElementById("p1").textContent=str;
}

function p2(event) {
	var currentDegree = parseInt(document.getElementById("img1").getAttribute("currentdegree"));
	
	rotate("img1", currentDegree + 30);
	document.getElementById("img1").setAttribute("currentdegree", currentDegree);
}

function mouseup(event) {
	var id = event.target.id;
	document.getElementById(id).removeAttribute("enterX");
	document.getElementById(id).removeAttribute("enterY");
}

function touchend(event) {
	var id = event.target.id;
	document.getElementById(id).removeAttribute("enterX");
	document.getElementById(id).removeAttribute("enterY");
}

function mousedown(event) {
	var id = event.target.id;
	document.getElementById(id).setAttribute("enterX", event.offsetX);
	document.getElementById(id).setAttribute("enterY", event.offsetY);
}

function touchstart(event) {
	var id = event.target.id;
	document.getElementById(id).setAttribute("enterX", event.touches[0].pageX);
	document.getElementById(id).setAttribute("enterY", event.touches[0].pageY);
	log ( event.touches[0].pageX + " " + event.offsetX + " " + event.offsetY);
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

function move(id, X, Y) {
	var obj = document.getElementById(id);
	var tempX = document.getElementById(id).getAttribute("enterX");
	var tempY = document.getElementById(id).getAttribute("enterY");

	console.log("temp: " + tempX + " " + tempY);
	if (tempX == null || tempY == null) {
		return false;
	}
	var enterX = parseInt(tempX);
	var enterY = parseInt(tempY);

	if (enterX == null || enterY == null) {
		return false;
	}

	var centerX = 256;
	var centerY = 256;
	var currentDegree = parseInt(document.getElementById(id).getAttribute("currentdegree"));
	
	enterX = enterX - centerX;
	enterY = enterY - centerY;
	var currentX = X - centerX;
	var currentY = Y - centerY;

	var dot_product = (enterX * currentY) - (enterY * currentX) ;
	var degree = degreesToTurn(enterX,enterY,currentX,currentY) || 0;
	if (dot_product < 0) {
		degree = degree * -1;
	}
	degree = (currentDegree + degree) % 360;

	
	rotate(id, degree);
	document.getElementById(id).setAttribute("currentdegree", degree);
	//console.log("degree: " + degree);
	//document.getElementById(id).setAttribute("enterX", event.offsetX);
	//document.getElementById(id).setAttribute("enterY", event.offsetY);
	return true;
}

function touchmove(event) {
	var id = event.target.id;
	if (move(id, event.offsetX, event.offsetY)) {
		document.getElementById(id).setAttribute("enterX", event.touches[0].pageX);
		document.getElementById(id).setAttribute("enterY", event.touches[0].pageY);
	}
	
}

function mousemove(event) {
	var id = event.target.id;
	if (move(id, event.offsetX, event.offsetY)) {
		document.getElementById(id).setAttribute("enterX", event.offsetX);
		document.getElementById(id).setAttribute("enterY", event.offsetY);
	}
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

function loadContent(event) {
	document.getElementById("img1").visibility="visible";
}
