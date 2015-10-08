var cercle_center;

function start_cercle(){
	
	///////////////////////////////////////////////////////////////////////ICIIIIIIIIIIIIIIIIIIIIIIIIIIIIIIIII
	$("#mainCanvas").on("mousedown",cercle_mousedown);
}

function stop_cercle(){
	
	$("#mainCanvas").off("mousedown",cercle_mousedown);
	drawingPoint = [];
	H[H.length-1]["select"] = false;
	
	
	update_drawing();
	//$("#mainCanvas").off("click",set_cercle);
}

function cercle_mousedown(event){
	if(!cercle_pick_point(event)){
		cercle_center = eventToR(event);
		set_cercle(event);
		
		$("#mainCanvas").mousemove(cercle_picked_point_moving);
		cercle_pointSelectionId = -1;
			$("#mainCanvas").mouseup(function(){
				cercle_pick_point_state_moving = 0;
				$("#mainCanvas").off("mousemove", cercle_picked_point_moving);
			});
			cercle_pick_point_state_moving = 1;
	}
	else
	console.log("lol");
}


var cercle_width;
var cercle_height;

function set_cercle(event){
	$("#mainCanvas").off("mouseup",set_cercle);
	var corner = eventToR(event);
	
	cercle_width = Math.abs(cercle_center.x - corner.x)*2;
	cercle_height = Math.abs(cercle_center.y - corner.y)*2;
	
	add_cercle(cercle_center,cercle_width,cercle_height);
	
	drawingPoint = new Array();
	drawingPoint.push(Point(cercle_center.x + cercle_width /2 	,cercle_center.y));
	drawingPoint.push(Point(cercle_center.x  					,cercle_center.y + cercle_height /2));
	drawingPoint.push(Point(cercle_center.x - cercle_width /2 	,cercle_center.y ));
	drawingPoint.push(Point(cercle_center.x  					,cercle_center.y - cercle_height /2));
	update_drawing();

}


/*function place_cercle(){
	
	
	clearTimeout(timeout);
	
	var cercle = $('#font_cercle_p').cercle();
	var font = $('#font').val();
	
	add_cercle(	cercle,
				font_center,
				font_size,
				font,
				true);
				
	$('#font_apply').off("click",place_cercle);
	
	ctx.font = font_size + " " + font;
	cercle_cercle_width = ctx.measurecercle(cercle).cercle_width;
	cercle_cercle_height = font_size.substring(0, font_size.indexOf('p'));
	console.log("place_cercle cercle_width" + cercle_cercle_width + " cercle cercle_height " + font_size.substring(0, font_size.indexOf('p')));
	
	
	
	drawingPoint = new Array();
	drawingPoint.push(PtoR(xRtoP(font_center.x) + cercle_cercle_width /2 ,font_center.y) + cercle_cercle_height /2));
	drawingPoint.push(PtoR(xRtoP(font_center.x) - cercle_cercle_width /2 ,font_center.y) + cercle_cercle_height /2));
	drawingPoint.push(PtoR(xRtoP(font_center.x) - cercle_cercle_width /2 ,font_center.y) - cercle_cercle_height /2));
	drawingPoint.push(PtoR(xRtoP(font_center.x) + cercle_cercle_width /2 ,font_center.y) - cercle_cercle_height /2));
	
	H[H.length-1]["val"] = drawingPoint;
	
	
	drawingPoint.push();
	
	update_drawing();
	console.log(H);
}*/

var cercle_pick_point_state_moving = 0;

var cercle_pointSelectionId;
function cercle_pick_point(event) // on click check for point in range
{
	var p2 = eventToR(event);
	
	
	// si on deplace le cercle
	
		
	
	
	
	
	
	//si on pick un point
	for(var i = 0; i < drawingPoint.length; i++ )
	{
		var p1 = drawingPoint[i];
		
		
		var dist = Math.sqrt((p2.y - p1.y)*(p2.y - p1.y) + (p2.x - p1.x)*(p2.x - p1.x));
		

		if( dist < pointSelectionSize )
		{
			cercle_pointSelectionId = i;
			$("#mainCanvas").mousemove(cercle_picked_point_moving);
			$("#mainCanvas").mouseup(function(){
				cercle_pick_point_state_moving = 0;
				$("#mainCanvas").off("mousemove", cercle_picked_point_moving);
			});
			cercle_pick_point_state_moving = 1;
			return true; // on ne voudrais pas attacher plusieurs fonctions...
		}
		
	}
	
	
	if(cercle_center != undefined)
	{
		// si le y est bon
		if(Math.abs(cercle_center.x-p2.x) < cercle_width /2){
			
			if(Math.abs(cercle_center.y-p2.y) < cercle_height/2){
				$("#mainCanvas").on("mousemove",move_cercle);
				$("#mainCanvas").on("mouseup",function(){
					$("#mainCanvas").off("mousemove",move_cercle);
				});
				
				
				cercle_moving_point = Point(p2.x-cercle_center.x,p2.y-cercle_center.y);
				
				return true;
			}
		}
	}
	
	return false;
	
}

function cercle_picked_point_moving(event){
	
	if(cercle_pick_point_state_moving){
		
		
		
		var corner = eventToR(event);
	
		if(cercle_pointSelectionId == -1 ){
			cercle_width = Math.abs(cercle_center.x - corner.x)*2;
			cercle_height = Math.abs(cercle_center.y - corner.y)*2;
		}
	
		else if(cercle_pointSelectionId == 0 || cercle_pointSelectionId == 2)
			cercle_width = Math.abs(cercle_center.x - corner.x)*2;
		else
		cercle_height = Math.abs(cercle_center.y - corner.y)*2;
		
		H[H.length-1]["width"] = cercle_width;
		H[H.length-1]["height"] = cercle_height;
		
		
		drawingPoint = new Array();
		drawingPoint.push(Point(cercle_center.x + cercle_width /2 	,cercle_center.y));
		drawingPoint.push(Point(cercle_center.x  					,cercle_center.y + cercle_height /2));
		drawingPoint.push(Point(cercle_center.x - cercle_width /2 	,cercle_center.y ));
		drawingPoint.push(Point(cercle_center.x  					,cercle_center.y - cercle_height /2));
		update_drawing();
		
		
		
	}
	
	
	
}

function move_cercle(event){
	var p = eventToR(event);
	
	cercle_center.x = p.x - cercle_moving_point.x;
	cercle_center.y = p.y - cercle_moving_point.y;
	
	H[H.length-1]["center"] = cercle_center;
	
	
	drawingPoint = [];
	
	drawingPoint.push(Point(cercle_center.x + cercle_width /2 	,cercle_center.y));
	drawingPoint.push(Point(cercle_center.x  					,cercle_center.y + cercle_height /2));
	drawingPoint.push(Point(cercle_center.x - cercle_width /2 	,cercle_center.y ));
	drawingPoint.push(Point(cercle_center.x  					,cercle_center.y - cercle_height /2));
	
	update_drawing();
	
		
	console.log("move_cercle");
}


