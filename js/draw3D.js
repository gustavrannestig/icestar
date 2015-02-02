// Create a new path once, when the script is executed:
		var myPath = new Path();
		myPath.strokeColor = 'black';
		var buttonTopLeft = new Point(10,10);
		var buttonSize = new Size(10,10);
		var button = new Path.Rectangle(buttonTopLeft, buttonSize);
		button.strokeColor = 'black';
		var buttonRect = new Rectangle(buttonTopLeft, buttonSize);

		var yAxisCenter = new Point(300,200);
		var xAxisCenter = new Point(400, 300);
		

		var yAxis = new Path();
		var xAxis = new Path();

		yAxis.add(new Point(300,100));
		yAxis.add(new Point(300,300));
		xAxis.add(new Point(300, 300));
		
		xAxis.add(new Point(500, 300));

		yAxis.strokeColor = 'black';
		xAxis.strokeColor = 'black';

		var gridRect = new Rectangle(new Point(300,100), new Size(200, 200));

		var firstPath = new Path();
		var thirdPath = new Path();
		var fourthPath = new Path();

		firstPath.add(yAxisCenter);
		thirdPath.add(new Point(300,400));
		fourthPath.add(new Point(300, 400));

		firstPath.strokeColor = 'black';
		thirdPath.strokeColor = 'black';
		fourthPath.strokeColor = 'black';

		var mirrorPath = function(point) {
			firstPoint = new Point();
			firstPoint.x = yAxisCenter.x - (point.x - yAxisCenter.x);
			firstPoint.y = xAxisCenter.y + (point.y - xAxisCenter.y);
			firstPath.add(firstPoint);

			thirdPoint = new Point();
			thirdPoint.x = yAxisCenter.x - (point.x - yAxisCenter.x);
			thirdPoint.y = xAxisCenter.y  + (xAxisCenter.y - point.y);
			thirdPath.add(thirdPoint);

			fourthPoint = new Point();
			fourthPoint.x = point.x;
			fourthPoint.y = thirdPoint.y;
			fourthPath.add(fourthPoint);
		}

		myPath.add(yAxisCenter);

		var myPathCopy = new Path();
		myPathCopy.add(yAxisCenter);
		// This function is called whenever the user
		// clicks the mouse in the view:
		function onMouseDown(event) {
			// Add a segment to the path at the position of the mouse:

			testPath = myPath.clone();

			testPath.strokeColor = null;

			testPath.add(event.point);

			if (testPath.intersects(myPath)) {

			}

			else if(event.point.isInside(buttonRect)){
				console.log("button pressed");
				myPath.add(xAxisCenter);
				mirrorPath(xAxisCenter);
			}
			else if(event.point.isInside(gridRect)) {
				myPath.add(event.point);
				mirrorPath(event.point);
			}
		}