function link_buton_event(){
	$("#btn-line").on("btn:start",start_line).on("btn:stop",stop_line);
	$("#btn-draw").on("btn:start",start_draw).on("btn:stop",stop_draw);
	$("#btn-bezier").on("btn:start",start_bezier).on("btn:stop",stop_bezier);
	$("#btn-text").on("btn:start",start_text).on("btn:stop",stop_text);
}


function start_draw(){
	$("#mainCanvas").mousemove(draw_mousemove);
	$("#mainCanvas").mousedown(draw_click_down);
	$("#mainCanvas").mouseup(draw_click_up);
}
function stop_draw(){
	$("#mainCanvas").off("mousemove",draw_mousemove);
	$("#mainCanvas").off("mousedown", draw_click_down);
	$("#mainCanvas").off("mouseup", draw_click_up);
	drawingPoint = [];
	update_drawing();
	
}
function draw_mousemove(event)
{
	if(draw_cs == 1)
	{
		var p1 = drawingPoint[drawingPoint.length-1];
		var p2 = eventToR(event);
		
		var dist = Math.sqrt((p2.y - p1.y)*(p2.y - p1.y) + (p2.x - p1.x)*(p2.x - p1.x));
		if( dist*21 > 0.5 )
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

function start_bezier()
{
}
function stop_bezier(){
}

function btn_bezier(event)
{
	if(drawingState == 0 )
	{
		if( drawingState == 2)
		{
			$("#btn-bezier").removeClass("active");
			console.log("drawingState = 0");
			drawingState = 0;
			if(drawingLine[drawingLine.length-1].length <= 1)
				drawingLine.pop();
			drawingPoint = [];
			update_drawing();
		}
		else
		{
			$("#btn-bezier").addClass("active");
			console.log("drawingState = 2");
			drawingState = 2;
			drawingLine.push(new Array());
		}
	}
	
}

function btn_draw(event)
{
	if(drawingState ==0 )
	{
		if( drawingState == 3)
		{
			$("#btn-draw").removeClass("active");
			console.log("drawingState = 0");
			drawingState = 0;
			if(drawingLine[drawingLine.length-1].length <= 1)
				drawingLine.pop();
			/*console.log(drawingPoint);
			doAlert("BLOP","" + JSON.stringify(drawingLine) ,"info");*/
			
			drawingPoint = [];
			update_drawing();
		}
		else
		{
			$("#btn-draw").addClass("active");
			console.log("drawingState = 1");
			drawingState = 3;
			drawingLine.push(new Array());
		}
	}
	
}





function start_text(){
	$("#mainCanvas").on("click",set_texte);
	$('#font_text').val("blop");
	$('#font_text').keyup(text_change);
	$('#police_size').change(text_change);
	$('#font').change(text_change);
	
	
	$( '.police_size' ).click(function(){
		console.log("fuck!!!");
	});
	
	window.setTimeout(text_change,100);
	
	//display modal
	
}
function text_change(){
	console.log($('#font').val());
	$('#font_text_p').text($('#font_text').val());
	$('#font_text_p').css("fontFamily",$('#font').val());
	
	
	
	//window.setTimeout(text_change,100);
}


function stop_text(){
	$("#mainCanvas").off("click",set_texte);
}

function set_texte(){
	console.log("set_texte");
	$('#textmodal').modal('toggle');
	
}




// success info warning danger
function doAlert(  intro,  texte,  type)
{
	$( "#alertArea" ).html( "<div class=\"alert alert-"+type+" alert-dismissible fade in\" role=\"alert\"><button type=\"button\" class=\"close\" data-dismiss=\"alert\" aria-label=\"Close\"><span aria-hidden=\"true\">&times;</span></button><strong>"+intro+"</strong> "+texte+" </div>");
	
}

function xRtoP(x){ return x*canvasXSize ; }
function yRtoP(y){ return y*canvasYSize ; }

function xPtoR(x){ return x/canvasXSize ; }
function yPtoR(y){ return y/canvasYSize ; }

function Point(x,y) { return {"x": x, "y": y};}

function RtoP(x,y){
	return {"x": x*canvasXSize, "y": y*canvasYSize};
}

function PtoR(x,y){
	return {"x": x/canvasXSize, "y": y/canvasYSize};
}

function eventToR(event){
	//console.log(event.pageX)
	return PtoR(canvasXoffset + event.pageX, canvasYoffset + event.pageY);
}




/*
move to the first point
   ctx.moveTo(points[0].x, points[0].y);


   for (i = 1; i < points.length - 2; i ++)
   {
      var xc = (points[i].x + points[i + 1].x) / 2;
      var yc = (points[i].y + points[i + 1].y) / 2;
      ctx.quadraticCurveTo(points[i].x, points[i].y, xc, yc);
   }
 // curve through the last two points
 ctx.quadraticCurveTo(points[i].x, points[i].y, points[i+1].x,points[i+1].y);


*/







