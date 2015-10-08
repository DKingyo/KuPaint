
function start_line(){
	console.log("start_line");
	
	add_trait(new Array());
	drawingPoint = [];
	$("#mainCanvas").mousedown(mousedownLine);
		
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
function stop_line(){
	$("#mainCanvas").off("mousedown", mousedownLine );
	console.log("stop_line");
	drawingPoint = [];
	
	update_drawing();
	/*if( drawingState == 1)
	{
		$("#btn-line").removeClass("active");
		console.log("drawingState = 0");
		drawingState = 0;
		if(drawingLine[drawingLine.length-1].length <= 1)
			drawingLine.pop();
		/*console.log(drawingPoint);
		doAlert("BLOP","" + JSON.stringify(drawingLine) ,"info");
		
		drawingPoint = [];
		update_drawing();
	}*/
}

function mousedownLine(event){
	if (!pick_point(event)){
		$("#mainCanvas").mouseup(line_mouseup);
	}
}

function line_mouseup(event){
	
	$("#mainCanvas").off("mouseup", line_mouseup);
	drawingPoint.push(eventToR(event));
	H[H.length-1]["val"].push(eventToR(event));
	drawingLine[drawingLine.length-1].push(eventToR(event));
	update_drawing();
	
	
}