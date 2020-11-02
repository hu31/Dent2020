function log(str) {
	document.getElementById("p1").textContent=str;
}

function p2(event) {
	var currentDegree = parseInt(document.getElementById("img1").getAttribute("currentdegree"));
	
	rotate("img1", currentDegree + 30);
	document.getElementById("img1").setAttribute("currentdegree", currentDegree + 30);
}

function mouseup(event) {
	var id = event.target.id;
	document.getElementById(id).removeAttribute("enterX");
	document.getElementById(id).removeAttribute("enterY");
}

function touchend(event) {
	var id = event.target.id;
	if (id != "img1") {
		return;
	}

	var x = event.changedTouches[0].pageX;
	var y = event.changedTouches[0].pageX;
	if (x < screen.width) {
		rotateRelative("img1", -30);
	} else {
		rotateRelative("img2", 30);
	}
	document.getElementById(id).removeAttribute("enterX");
	document.getElementById(id).removeAttribute("enterY");
}

function mousedown(event) {
	var id = event.target.id;
	document.getElementById(id).setAttribute("enterX", event.offsetX);
	document.getElementById(id).setAttribute("enterY", event.offsetY);
}

function touchstart(event) {
	log("touch start");
	var id = event.target.id;
	if (id != "img1") {
		return;
	}
	document.getElementById(id).setAttribute("enterX", event.changedTouches[0].pageX);
	document.getElementById(id).setAttribute("enterY", event.changedTouches[0].pageY);
	log ( "ID: " + id + "x: " + event.changedTouches[0].pageX + "x: " + event.offsetX + "y: " + event.offsetY);
	document.getElementById("p2").textContent=event.changedTouches[0].pageX;
}

function rotate(id, degree) {
	var img = document.getElementById(id);
	img.style.transform='rotate(' + degree + 'deg)';
}

function rotateRelative (id, degree) {
	var currentDegree = document.getElementById(id).getAttribute('currentDegree');
	rotate (id, currentDegree+degree);
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

	console.log("offset: " + obj.offset);
	console.log("temp: " + tempX + " " + tempY);
	console.log(obj.width + " " + obj.height);
	if (tempX == null || tempY == null) {
		return false;
	}
	var enterX = parseInt(tempX);
	var enterY = parseInt(tempY);

	if (enterX == null || enterY == null) {
		return false;
	}

	var centerX = obj.width / 2;
	var centerY = obj.height / 2;
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
	return;
	var id = event.target.id;
	if (id != "img1") {
		return;
	}
	if (move(id, event.offsetX, event.offsetY)) {
		document.getElementById(id).setAttribute("enterX", event.changedTouches[0].pageX);
		document.getElementById(id).setAttribute("enterY", event.changedTouches[0].pageY);
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
