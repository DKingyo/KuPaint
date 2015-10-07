var rect_center;

function start_rect(){
	
	///////////////////////////////////////////////////////////////////////ICIIIIIIIIIIIIIIIIIIIIIIIIIIIIIIIII
	$("#mainCanvas").on("mousedown",rect_mousedown);
}

function stop_rect(){
	
	$("#mainCanvas").off("mousedown",rect_mousedown);
	drawingPoint = [];
	H[H.length-1]["select"] = false;
	
	
	update_drawing();
	//$("#mainCanvas").off("click",set_rect);
}

function rect_mousedown(event){
	if(!rect_pick_point(event)){
		rect_center = eventToR(event);
		set_rect(event);
		
		$("#mainCanvas").mousemove(rect_picked_point_moving);
			$("#mainCanvas").mouseup(function(){
				rect_pick_point_state_moving = 0;
				$("#mainCanvas").off("mousemove", rect_picked_point_moving);
			});
			rect_pick_point_state_moving = 1;
	}
	else
	console.log("lol");
}


var rect_width;
var rect_height;

function set_rect(event){
	$("#mainCanvas").off("mouseup",set_rect);
	var corner = eventToR(event);
	
	rect_width = Math.abs(rect_center.x - corner.x)*2;
	rect_height = Math.abs(rect_center.y - corner.y)*2;
	
	add_rect(rect_center,rect_width,rect_height);
	
	drawingPoint = new Array();
	drawingPoint.push(Point(rect_center.x + rect_width /2 	,rect_center.y + rect_height /2));
	drawingPoint.push(Point(rect_center.x - rect_width /2 	,rect_center.y + rect_height /2));
	drawingPoint.push(Point(rect_center.x - rect_width /2 	,rect_center.y - rect_height /2));
	drawingPoint.push(Point(rect_center.x + rect_width /2 	,rect_center.y - rect_height /2));
	update_drawing();

}


/*function place_rect(){
	
	
	clearTimeout(timeout);
	
	var rect = $('#font_rect_p').rect();
	var font = $('#font').val();
	
	add_rect(	rect,
				font_center,
				font_size,
				font,
				true);
				
	$('#font_apply').off("click",place_rect);
	
	ctx.font = font_size + " " + font;
	rect_rect_width = ctx.measurerect(rect).rect_width;
	rect_rect_height = font_size.substring(0, font_size.indexOf('p'));
	console.log("place_rect rect_width" + rect_rect_width + " rect rect_height " + font_size.substring(0, font_size.indexOf('p')));
	
	
	
	drawingPoint = new Array();
	drawingPoint.push(PtoR(xRtoP(font_center.x) + rect_rect_width /2 ,font_center.y) + rect_rect_height /2));
	drawingPoint.push(PtoR(xRtoP(font_center.x) - rect_rect_width /2 ,font_center.y) + rect_rect_height /2));
	drawingPoint.push(PtoR(xRtoP(font_center.x) - rect_rect_width /2 ,font_center.y) - rect_rect_height /2));
	drawingPoint.push(PtoR(xRtoP(font_center.x) + rect_rect_width /2 ,font_center.y) - rect_rect_height /2));
	
	H[H.length-1]["val"] = drawingPoint;
	
	
	drawingPoint.push();
	
	update_drawing();
	console.log(H);
}*/

var rect_pick_point_state_moving = 0;

function rect_pick_point(event) // on click check for point in range
{
	var p2 = eventToR(event);
	
	
	// si on deplace le rect
	
		
	
	
	
	
	
	//si on pick un point
	for(var i = 0; i < drawingPoint.length; i++ )
	{
		var p1 = drawingPoint[i];
		
		
		var dist = Math.sqrt((p2.y - p1.y)*(p2.y - p1.y) + (p2.x - p1.x)*(p2.x - p1.x));
		

		if( dist < pointSelectionSize )
		{
			pointSelectionId = i;
			$("#mainCanvas").mousemove(rect_picked_point_moving);
			$("#mainCanvas").mouseup(function(){
				rect_pick_point_state_moving = 0;
				$("#mainCanvas").off("mousemove", rect_picked_point_moving);
			});
			rect_pick_point_state_moving = 1;
			return true; // on ne voudrais pas attacher plusieurs fonctions...
		}
		
	}
	
	
	if(rect_center != undefined)
	{
		// si le y est bon
		if(Math.abs(rect_center.x-p2.x) < rect_width /2){
			
			if(Math.abs(rect_center.y-p2.y) < rect_height/2){
				$("#mainCanvas").on("mousemove",move_rect);
				$("#mainCanvas").on("mouseup",function(){
					$("#mainCanvas").off("mousemove",move_rect);
				});
				
				
				rect_moving_point = Point(p2.x-rect_center.x,p2.y-rect_center.y);
				
				return true;
			}
		}
	}
	
	return false;
	
}

function rect_picked_point_moving(event){
	
	if(rect_pick_point_state_moving){
		
		
		
		var corner = eventToR(event);
	
		rect_width = Math.abs(rect_center.x - corner.x)*2;
		rect_height = Math.abs(rect_center.y - corner.y)*2;
		
		H[H.length-1]["width"] = rect_width;
		H[H.length-1]["height"] = rect_height;
		
		
		drawingPoint = new Array();
		drawingPoint.push(Point(rect_center.x + rect_width /2 	,rect_center.y + rect_height /2));
		drawingPoint.push(Point(rect_center.x - rect_width /2 	,rect_center.y + rect_height /2));
		drawingPoint.push(Point(rect_center.x - rect_width /2 	,rect_center.y - rect_height /2));
		drawingPoint.push(Point(rect_center.x + rect_width /2 	,rect_center.y - rect_height /2));
		update_drawing();
		
		
		
	}
	
	
	
}

function move_rect(event){
	var p = eventToR(event);
	
	rect_center.x = p.x - rect_moving_point.x;
	rect_center.y = p.y - rect_moving_point.y;
	
	H[H.length-1]["center"] = rect_center;
	
	
	drawingPoint = [];
	
	drawingPoint.push(Point(rect_center.x + rect_width/2  ,rect_center.y + rect_height/2 ));
	drawingPoint.push(Point(rect_center.x - rect_width/2  ,rect_center.y + rect_height/2 ));
	drawingPoint.push(Point(rect_center.x - rect_width/2  ,rect_center.y - rect_height/2 ));
	drawingPoint.push(Point(rect_center.x + rect_width/2  ,rect_center.y - rect_height/2 ));
	
	update_drawing();
	
		
	console.log("move_rect");
}


