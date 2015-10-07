
function start_spline(){
	console.log("start_spline");
	
	add_spline(new Array());
	drawingPoint = [];
	$("#mainCanvas").mousedown(mousedownspline);
		
	/*if( drawingState == 0)
	{
		$("#btn-line").addClass("active");
		console.log("drawingState = 1");
		drawingState = 1;
		drawingLine.push(new Array());
	}*/
	
	// mouse down
	// if pick_point
	// true mouse point
	// false link event mouse up
	
	//$("#mainCanvas").click(line_click);
}
function stop_spline(){
	$("#mainCanvas").off("mousedown", mousedownspline );
	console.log("stop_spline");
	drawingPoint = [];
	
	update_drawing();
	/*if( drawingState == 1)
	{
		$("#btn-spline").removeClass("active");
		console.log("drawingState = 0");
		drawingState = 0;
		if(drawingspline[drawingspline.length-1].length <= 1)
			drawingspline.pop();
		/*console.log(drawingPoint);
		doAlert("BLOP","" + JSON.stringify(drawingspline) ,"info");
		
		drawingPoint = [];
		update_drawing();
	}*/
}

function mousedownspline(event){
	if (!pick_point(event)){
		$("#mainCanvas").mouseup(spline_mouseup);
	}
}

function spline_mouseup(event){
	
	$("#mainCanvas").off("mouseup", spline_mouseup);
	drawingPoint.push(eventToR(event));
	H[H.length-1]["val"].push(eventToR(event));
	//drawingLine[drawingLine.length-1].push(eventToR(event));
	update_drawing();
	
	
}