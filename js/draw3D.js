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
	myPath = new Path();
	myPath.strokeColor = 'black';

	//init render button
	var buttonPosition = new Point(10,10);
	var buttonSize = new Size(10, 10);
	var button = new Path.Rectangle(buttonPosition, buttonSize);
	button.strokeColor = 'black';
	buttonRect = new Rectangle(buttonPosition, buttonSize);

	//init simple grid
	center = new Point(300,300);
	yAxisCenter = new Point(300,200);
	yAxisTop = new Point(300, 100);
	xAxisCenter = new Point(400, 300);
	xAxisRight = new Point(500, 300);

	var yAxis = new Path();
	var xAxis = new Path();

	yAxis.add(yAxisTop);
	yAxis.add(center);

	xAxis.add(xAxisRight);
	xAxis.add(center);

	yAxis.strokeColor = 'black';
	xAxis.strokeColor = 'black';

	gridRect = new Rectangle(yAxisTop, new Size(200, 200));

	//add starting point to myPath
	myPath.add(yAxisCenter);

	//Add mirroring paths
	firstPath = new Path();
	thirdPath = new Path();
	fourthPath = new Path();

	firstPath.add(yAxisCenter);
	thirdPath.add(new Point(300,400));
	fourthPath.add(new Point(300, 400));

	firstPath.strokeColor = 'black';
	thirdPath.strokeColor = 'black';
	fourthPath.strokeColor = 'black';
}

var mirrorPath = function(point) {
	//mirror the point in the first, third and fourth qadrant
	var firstPoint = new Point();
	firstPoint.x = yAxisCenter.x - (point.x - yAxisCenter.x);
	firstPoint.y = xAxisCenter.y + (point.y - xAxisCenter.y);	
	firstPath.add(firstPoint);

	var thirdPoint = new Point();
	thirdPoint.x = yAxisCenter.x - (point.x - yAxisCenter.x);
	thirdPoint.y = xAxisCenter.y  + (xAxisCenter.y - point.y);
	thirdPath.add(thirdPoint);

	var fourthPoint = new Point();
	fourthPoint.x = point.x;
	fourthPoint.y = thirdPoint.y;
	fourthPath.add(fourthPoint);
}

function onMouseDown(event) {
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
}

init();