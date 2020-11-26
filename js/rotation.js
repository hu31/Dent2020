var mobileX = 0;
var mobileY = 0;
var mobileDegree = 0;
var isTouched = 0;
var isFront = true;

window.oncontextmenu = function (event) {
	event.preventDefault();
	event.stopPropagation();
	return false;
}

function log(id, str) {
	//document.getElementById(id).textContent=str;
}

function p2(event) {
	var currentDegree = parseInt(document.getElementById("img1").getAttribute("currentdegree"));
	
	rotate("img1", currentDegree + 30);
	document.getElementById("img1").setAttribute("currentdegree", currentDegree + 30);
}

function mouseup(event) {
	var id = event.target.id;
	//document.getElementById(id).removeAttribute("enterX");
	//document.getElementById(id).removeAttribute("enterY");
	isTouched = 0;
}

function touchend(event) {
	isTouched = 0;
}

function mousedown(event) {
	var id = event.target.id;
	//document.getElementById(id).setAttribute("enterX", event.offsetX);
	//document.getElementById(id).setAttribute("enterY", event.offsetY);
	mobileX = event.offsetX;
	mobileY = event.offsetY;
	isTouched = 1;
}

function touchstart(event) {
	isTouched = 1;
	mobileX = event.changedTouches[0].pageX;
	mobileY = event.changedTouches[0].pageY;
}

function rotate(id, degree) {
	var img = document.getElementById(id);
	img.style.transform='rotate(' + degree + 'deg)';
}

function rotateRelative (id, degree) {
	var currentDegree = mobileDegree;
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
	//var tempX = document.getElementById(id).getAttribute("enterX");
	//var tempY = document.getElementById(id).getAttribute("enterY");

	console.log("offset: " + obj.offsetTop + ", " + obj.offsetLeft);

	if (!isTouched) {
		return false;
	}

	var enterX = mobileX;
	var enterY = mobileY;

	//console.log("temp: " + tempX + " " + tempY);
	//console.log(obj.width + " " + obj.height);
	//if (tempX == null || tempY == null) {
	//	return false;
	//}
	//var enterX = parseInt(tempX);
	//var enterY = parseInt(tempY);

	//if (enterX == null || enterY == null) {
	//	return false;
	//}

	var centerX = obj.width / 2;
	var centerY = obj.height / 2;
	//var currentDegree = parseInt(document.getElementById(id).getAttribute("currentdegree"));
	var currentDegree = mobileDegree;
	
	enterX = enterX - centerX;
	enterY = enterY - centerY;
	var currentX = X - centerX;
	var currentY = Y - centerY;

	var dot_product = (enterX * currentY) - (enterY * currentX) ;
	var degree = degreesToTurn(enterX,enterY,currentX,currentY) || 0;
	if (dot_product < 0) {
		degree = degree * -1;
	}
	//Only rotate with suffcient degrees
	if (degree < 1 && degree > -1) {
		return false;
	}
	if (degree > 10) {
		degree = 10;
	}
	if (degree < -10) {
		degree = -10;
	}
	console.log("degree: " + degree);
	degree = (currentDegree + degree) % 360;
	
	rotate(id, degree);
	//document.getElementById(id).setAttribute("currentdegree", degree);
	mobileDegree = degree;
	//document.getElementById(id).setAttribute("enterX", event.offsetX);
	//document.getElementById(id).setAttribute("enterY", event.offsetY);
	return true;
}

function touchmove(event) {
	if (!isTouched) {
		return;
	}
	var rect = document.getElementById("img1").getBoundingClientRect();
	var centerX = (rect.right - rect.left) / 2;
	var centerY = (rect.bottom - rect.top) / 2;

	var x1 = mobileX - centerX;
	var y1 = mobileY - centerY;

	var x2 = event.changedTouches[0].pageX - centerX;
	var y2 = event.changedTouches[0].pageY - centerY;
	
	var dot_product = (x1 * y2) - (y1 * x2) ;
	var degree = degreesToTurn(x1, y1, x2, y2) || 0;

	if (dot_product < 0) {
		degree = degree * -1;
	}
	//Only rotate with suffcient degrees
	if (degree < 1 && degree > -1) {
		return false;
	}
	degree = (mobileDegree + degree) % 360;
	
	rotate("img1", degree);

	mobileDegree = degree;
	mobileX = event.changedTouches[0].pageX;
	mobileY = event.changedTouches[0].pageY;
	

}

function mousemove(event) {
	var id = event.target.id;
	if (move(id, event.offsetX, event.offsetY)) {
		//document.getElementById(id).setAttribute("enterX", event.offsetX);
		mobileX = event.offsetX;
		//document.getElementById(id).setAttribute("enterY", event.offsetY);
		mobileY = event.offsetY;
	}
}

function rotator(event) {
	rotate('img1',30);
	
}

function loadContent() {
	document.getElementById("img1").style.visibility="visible";
}

function changeImage(event) {
	//document.getElementById("img1").src="resources/images/107ver1trial.png";
	document.getElementById("img1").src=event.target.src;
	//document.getElementById("img1").front=event.target.front;
	//document.getElementById("img1").back=event.target.back;

	document.getElementById("img1").setAttribute("front", event.target.getAttribute("front"));
	document.getElementById("img1").setAttribute("back", event.target.getAttribute("back"));
	document.getElementById("img3").src=document.getElementById("img3").getAttribute("front");
	isFront=true;
	mobileDegree = 0;
	mobileX = 0;
	mobileY = 0;
	rotate("img1", 0);
}

function flip (event) {
	isFront = !isFront;
	var obj = document.getElementById("img1");
	var obj2 = document.getElementById("img3");
	if (isFront) {
		obj.src = obj.getAttribute("front");
		obj2.src = obj2.getAttribute("front");
		return;
	}
	if (!isFront) {
		obj.src = obj.getAttribute("back");
		obj2.src = obj2.getAttribute("back");
	}
}
