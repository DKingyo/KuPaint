
var font_size = "18px";
var font_center;
var timeout;

var text_height;
var text_width;

var texte_moving_point;


function start_text(){
	
	///////////////////////////////////////////////////////////////////////ICIIIIIIIIIIIIIIIIIIIIIIIIIIIIIIIII
	$("#mainCanvas").on("mousedown",text_mousedown);
	
	
	//$('#font_text').val("blop");
	//$('#font_text').keyup(text_change);
	//$('#police_size').change(text_change);
	//$('#font').change(text_change);
	
	
	$( '.police_size' ).click(function(){
		font_size = $(this).text();
		//console.log("fuck!!!" + $(this).text() );
	});
	
	timeout = window.setTimeout(text_change,100);
	
	//display modal
	
}

// update le texte toutesles 100ms
function text_change(){
	console.log($('#font').val());
	$('#font_text_p').text($('#font_text').val());
	$('#font_text_p').css("fontFamily",$('#font').val());
	$('#font_text_p').css("fontSize",font_size);
	
	timeout = window.setTimeout(text_change,100);
}

function stop_text(){
	
	$("#mainCanvas").off("mousedown",text_mousedown);
	drawingPoint = [];
	H[H.length-1]["select"] = false;
	
	
	update_drawing();
	//$("#mainCanvas").off("click",set_texte);
}

function text_mousedown(){
	if(!text_pick_point(event)){
		$("#mainCanvas").on("mouseup",set_texte);
		console.log("looool");
	}
	else
	console.log("lol");
}




function set_texte(event){
		
	
		font_center = eventToR(event);
		console.log("set_texte");
		$('#textmodal').modal('toggle');
		$('#font_apply').click(place_texte);
		$("#mainCanvas").off("mouseup",set_texte);

}


function place_texte(){
	
	
	clearTimeout(timeout);
	
	var texte = $('#font_text_p').text();
	var font = $('#font').val();
	
	add_texte(	texte,
				font_center,
				font_size,
				font,
				true);
				
	$('#font_apply').off("click",place_texte);
	
	ctx.font = font_size + " " + font;
	text_width = ctx.measureText(texte).width;
	text_height = font_size.substring(0, font_size.indexOf('p'));
	console.log("place_texte width" + text_width + " text height " + font_size.substring(0, font_size.indexOf('p')));
	
	
	
	drawingPoint = new Array();
	drawingPoint.push(PtoR(xRtoP(font_center.x) + text_width /2 ,yRtoP(font_center.y) + text_height /2));
	drawingPoint.push(PtoR(xRtoP(font_center.x) - text_width /2 ,yRtoP(font_center.y) + text_height /2));
	drawingPoint.push(PtoR(xRtoP(font_center.x) - text_width /2 ,yRtoP(font_center.y) - text_height /2));
	drawingPoint.push(PtoR(xRtoP(font_center.x) + text_width /2 ,yRtoP(font_center.y) - text_height /2));
	
	H[H.length-1]["val"] = drawingPoint;
	
	
	drawingPoint.push();
	
	update_drawing();
	console.log(H);
}

var texte_pick_point_state_moving = 0;
function text_pick_point(event) // on click check for point in range
{
	var p2 = eventToR(event);
	
	
	// si on deplace le texte
	
		
	if(H[H.length-1]["center"] != undefined)
	{
		// si le y est bon
		if(xRtoP(Math.abs(H[H.length-1]["center"].x-p2.x)) < text_width /2){
			
			if(yRtoP(Math.abs(H[H.length-1]["center"].y-p2.y)) < text_height/2){
				$("#mainCanvas").on("mousemove",move_texte);
				$("#mainCanvas").on("mouseup",function(){
					$("#mainCanvas").off("mousemove",move_texte);
				});
				
				
				texte_moving_point = Point(p2.x-H[H.length-1]["center"].x,p2.y-H[H.length-1]["center"].y);
				
				return true;
			}
		}
	}
	
	
	
	
	//si on pick un point
	for(var i = 0; i < drawingPoint.length; i++ )
	{
		var p1 = drawingPoint[i];
		
		
		var dist = Math.sqrt((p2.y - p1.y)*(p2.y - p1.y) + (p2.x - p1.x)*(p2.x - p1.x));
		

		if( dist < pointSelectionSize )
		{
			pointSelectionId = i;
			$("#mainCanvas").mousemove(texte_picked_point_moving);
			$("#mainCanvas").mouseup(function(){
				texte_pick_point_state_moving = 0;
				$("#mainCanvas").off("mousemove", texte_picked_point_moving);
			});
			texte_pick_point_state_moving = 1;
			return true; // on ne voudrais pas attacher plusieurs fonctions...
		}
		
	}
	return false;
	
}

function texte_picked_point_moving(event){
	
	if(texte_pick_point_state_moving){
		
		
		
		var p1 = H[H.length-1]["center"];
		var p2 = eventToR(event);
		
		var police_size = Math.round(yRtoP(Math.abs(p1.y-p2.y)*2));
		
		text_height = police_size;
		text_width = 
		
		H[H.length-1]["size"] =  police_size + "px";
		
		size  = ctx.measureText(H[H.length-1]["texte"]);
		text_width = size.width;
		
		drawingPoint = [];
	
		drawingPoint.push(PtoR(xRtoP(font_center.x) + size.width/2  ,yRtoP(font_center.y) + police_size/2 ));
		drawingPoint.push(PtoR(xRtoP(font_center.x) - size.width/2  ,yRtoP(font_center.y) + police_size/2 ));
		drawingPoint.push(PtoR(xRtoP(font_center.x) - size.width/2  ,yRtoP(font_center.y) - police_size/2 ));
		drawingPoint.push(PtoR(xRtoP(font_center.x) + size.width/2  ,yRtoP(font_center.y) - police_size/2 ));
		
		update_drawing();
		
	}
	
	
	
}

function move_texte(event){
	var p = eventToR(event);
	font_center.x = p.x - texte_moving_point.x;
	font_center.y = p.y - texte_moving_point.y;
	
	H[H.length-1]["center"] = font_center;
	
	
	drawingPoint = [];
	
	drawingPoint.push(PtoR(xRtoP(font_center.x) + text_width/2  ,yRtoP(font_center.y) +text_height/2 ));
	drawingPoint.push(PtoR(xRtoP(font_center.x) - text_width/2  ,yRtoP(font_center.y) + text_height/2 ));
	drawingPoint.push(PtoR(xRtoP(font_center.x) - text_width/2  ,yRtoP(font_center.y) - text_height/2 ));
	drawingPoint.push(PtoR(xRtoP(font_center.x) + text_width/2  ,yRtoP(font_center.y) - text_height/2 ));
	
	update_drawing();
	
		
	console.log("move_texte");
}


