function link_buton_event(){
	$("#btn-line").on("btn:start",start_line).on("btn:stop",stop_line);
	$("#btn-draw").on("btn:start",start_draw).on("btn:stop",stop_draw);
	$("#btn-bezier").on("btn:start",start_bezier).on("btn:stop",stop_bezier);
	
}
function handler(event)
{
	//alert("event : " + event.target.id + "this : " + this.id);
	var elem = this;
	$( "button[id*='btn-']").each(function(){
		var p = $(this);
		if(p.hasClass("active"))
			p.trigger("btn:stop").removeClass("active");
		else
			if(elem == this)
				p.addClass("active").trigger("btn:start");
	});
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
	drawingLine.push(new Array());
	drawingPoint = [];
	boucle();
	
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
			drawingLine[drawingLine.length-1].push(eventToR(event));
		}
			
		
		boucle();
	}
	
		
	
	//21
	console.log("draw_mousemove");
}
// draw click start 
var draw_cs = 0;
function draw_click_down(event)
{
		drawingPoint = [];
		drawingPoint.push(eventToR(event));
		drawingLine[drawingLine.length-1].push(eventToR(event));
		draw_cs = 1;
		console.log("draw click : "+ (canvasXoffset + event.pageX) + " " + (canvasYoffset + event.pageY));
	
		
}
function draw_click_up(event)
{
	
		draw_cs = 0;
		drawingPoint.push(eventToR(event));
		drawingLine[drawingLine.length-1].push(eventToR(event));
		
		drawingLine.push(new Array());
		
		boucle();
		
}

function start_line(){
	console.log("start_line");
	/*if( drawingState == 0)
	{
		$("#btn-line").addClass("active");
		console.log("drawingState = 1");
		drawingState = 1;
		drawingLine.push(new Array());
	}*/
	
	
	$("#mainCanvas").click(line_click);
}
function stop_line(){
	console.log("stop_line");
	$("#mainCanvas").off("click", line_click);
	drawingLine.push(new Array());
	drawingPoint = [];
	boucle();
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
		boucle();
	}*/
}

function line_click(event){
	drawingPoint.push(eventToR(event));
	drawingLine[drawingLine.length-1].push(eventToR(event));
	boucle();
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
			boucle();
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
			boucle();
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
	return PtoR(canvasXoffset + event.pageX, canvasYoffset + event.pageY);
}
