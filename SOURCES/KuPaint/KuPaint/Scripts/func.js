function link_buton_event(){
	$("#btn-line").on("btn:start",start_line).on("btn:stop",stop_line);
	$("#btn-draw").on("btn:start",start_draw).on("btn:stop",stop_draw);
	$("#btn-bezier").on("btn:start",start_spline).on("btn:stop",stop_spline);
	$("#btn-text").on("btn:start",start_text).on("btn:stop",stop_text);
	$("#btn-rect").on("btn:start",start_rect).on("btn:stop",stop_rect);
	$("#btn-cercle").on("btn:start",start_cercle).on("btn:stop",stop_cercle);
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







