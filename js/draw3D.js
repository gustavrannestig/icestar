var yAxisCenter;
var xAxisCenter;
var center;
var xAxisRight
var yAxisTop;

var myPath;
var firstPath;
var thirdPath;
var fourthPath;

var buttonRect;
var gridRect;

var init = function() {
	//The main path
	myPath = new paper.Path();
	myPath.strokeColor = 'black';

	//init render button
	var buttonPosition = new paper.Point(10,10);
	var buttonSize = new paper.Size(10, 10);
	var button = new paper.Path.Rectangle(buttonPosition, buttonSize);
	button.strokeColor = 'black';
	buttonRect = new paper.Rectangle(buttonPosition, buttonSize);

	//init simple grid
	center = new paper.Point(300,300);
	yAxisCenter = new paper.Point(300,200);
	yAxisTop = new paper.Point(300, 100);
	xAxisCenter = new paper.Point(400, 300);
	xAxisRight = new paper.Point(500, 300);

	var yAxis = new paper.Path();
	var xAxis = new paper.Path();

	yAxis.add(yAxisTop);
	yAxis.add(center);

	xAxis.add(xAxisRight);
	xAxis.add(center);

	yAxis.strokeColor = 'black';
	xAxis.strokeColor = 'black';

	gridRect = new paper.Rectangle(yAxisTop, new paper.Size(200, 200));

	//add starting point to myPath
	myPath.add(yAxisCenter);

	//Add mirroring paths
	firstPath = new paper.Path();
	thirdPath = new paper.Path();
	fourthPath = new paper.Path();

	firstPath.add(yAxisCenter);
	thirdPath.add(new paper.Point(300,400));
	fourthPath.add(new paper.Point(300, 400));

	firstPath.strokeColor = 'black';
	thirdPath.strokeColor = 'black';
	fourthPath.strokeColor = 'black';
	paper.view.draw();	
}

var mirrorPath = function(point) {
	//mirror the point in the first, third and fourth qadrant
	var firstPoint = new paper.Point();
	firstPoint.x = yAxisCenter.x - (point.x - yAxisCenter.x);
	firstPoint.y = xAxisCenter.y + (point.y - xAxisCenter.y);	
	firstPath.add(firstPoint);

	var thirdPoint = new paper.Point();
	thirdPoint.x = yAxisCenter.x - (point.x - yAxisCenter.x);
	thirdPoint.y = xAxisCenter.y  + (xAxisCenter.y - point.y);
	thirdPath.add(thirdPoint);

	var fourthPoint = new paper.Point();
	fourthPoint.x = point.x;
	fourthPoint.y = thirdPoint.y;
	fourthPath.add(fourthPoint);
}


window.onload = function() {
	paper.setup('paperCanvas');
	
	init();

	var tool = new paper.Tool();

	tool.onMouseDown = function onMouseDown(event) {
		// Add a segment to the path at the position of the mouse:
		if(event.point.isInside(buttonRect)){
			console.log("button pressed");
			myPath.add(xAxisCenter);
			mirrorPath(xAxisCenter);
		}
		else if(event.point.isInside(gridRect)) {
			myPath.add(event.point);
			mirrorPath(event.point);
		}
		paper.view.draw();
	}
}