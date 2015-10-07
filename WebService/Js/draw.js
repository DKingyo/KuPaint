function draw_mousemove(event)
{
	if(draw_cs == 1)
	{
		var p1 = drawingPoint[drawingPoint.length-1];
		var p2 = eventToR(event);
		
		var dist = Math.sqrt((p2.y - p1.y)*(p2.y - p1.y) + (p2.x - p1.x)*(p2.x - p1.x));
		if( dist*21 > 0.2 )
		{
			drawingPoint.push(eventToR(event));
			//drawingLine[drawingLine.length-1].push(eventToR(event));
			H[H.length-1]["val"].push(eventToR(event))
		}
			
		
		update_drawing();
	}
	
		
	
	//21
	console.log("draw_mousemove");
}

var pick_point_state_moving = 0; // variable d'etat de pick_point 0 -> idle, 1-> moving_point
function pick_point(event) // on click check for point in range
{
	for(var i = 0; i < drawingPoint.length;i++ )
	{
		var p1 = drawingPoint[i];
		var p2 = eventToR(event);
		
		var dist = Math.sqrt((p2.y - p1.y)*(p2.y - p1.y) + (p2.x - p1.x)*(p2.x - p1.x));
		
		if( dist < pointSelectionSize )
		{
			pointSelectionId = i;
			$("#mainCanvas").mousemove(picked_point_moving);
			$("#mainCanvas").mouseup(function(){
				pick_point_state_moving = 0;
				$("#mainCanvas").off("mousemove", picked_point_moving);
			});
			pick_point_state_moving = 1;
			return true; // on ne voudrais pas attacher plusieurs fonctions...
		}
		
	}
	return false;
	
}

function picked_point_moving(event){
	
	var p2 = eventToR(event);
	
	drawingPoint[pointSelectionId] = p2;
	
	drawingLine[drawingLine.length-1][pointSelectionId] = p2;
	H[H.length-1]["val"][pointSelectionId] = p2;
	update_drawing();
	
}


// draw click start 
var draw_cs = 0;
function draw_click_down(event)
{
	if(!pick_point(event)){
		
		drawingPoint = [];
		drawingPoint.push(eventToR(event));
		add_trait(new Array());
		H[H.length-1]["val"].push(eventToR(event));
		draw_cs = 1;
		console.log("draw click : "+ (canvasXoffset + event.pageX) + " " + (canvasYoffset + event.pageY));
	}
		
		
}
function draw_click_up(event)
{
	if(draw_cs == 1){
		draw_cs = 0;
		drawingPoint.push(eventToR(event));
		H[H.length-1]["val"].push(eventToR(event));
		//drawingLine[drawingLine.length-1].push(eventToR(event));
		update_drawing();
	}
		
		
}