var canvas; //objet canvas
var ctx; // contexte

var state = [ "idle", "connected", "moving", "error"];
var drawingLine = [[ ]];

var drawingPoint = [ {"x" : 0.1, "y":0.1}];

var canvasXSize;
var canvasYSize;


//drawingState = 1 -> line , 2 -> bezier, 3-> draw
var drawingState;



$( document ).ready( function (e) {
   // stops modal from being shown
   //$('#myModal').modal('show');
   //$('#button').hide();
   //$('#mainCanvas').hide();
   
   //init canvas event listener
   
   
   canvas = $("#mainCanvas")[0];
   
   canvasResize();
   
   console.log(canvas);
   canvas.addEventListener("mousedown", getPosition, false);
   canvas.addEventListener("mousemove", mousemove, false);
   $(window ).resize( canvasResize);
   canvas.addEventListener("resize", canvasResize);
   
   
   var 	context = canvas.getContext('2d');
		context.clearRect(0, 0, canvas.width, canvas.height);
		context.font = '18pt Calibri';
		context.fillStyle = 'black';
		context.fillText("Dessine moi un mouton !", 10, 25);
		
	ctx = context;
		
	
	canvasOffsetTop = $("#jumbotron")[0].offsetTop + canvas.offsetTop;
	canvasOffsetLeft = $("#jumbotron")[0].offsetLeft + canvas.offsetLeft;
	
	/*console.log("jumbotron size " + $("#jumbotron")[0].offsetTop);
	console.log("jumbotron size " + $("#jumbotron")[0].offsetLeft);
 
	console.log("size" + canvas.offsetWidth);
	console.log("size" + canvas.offsetHeight);
	console.log("size" + canvas.offsetTop);
	console.log("size" + canvas.offsetLeft);*/
	
	$("#btn-line")[0].addEventListener("click", btn_line,false);
	$("#btn-bezier")[0].addEventListener("click", btn_bezier,false);
	$("#btn-draw")[0].addEventListener("click", btn_draw,false);
	
   window.setTimeout(boucle,1000);
})

function canvasResize()
{
	
	
	canvasXSize = canvas.width = canvas.offsetWidth;
	canvasYSize = canvas.height = canvas.offsetWidth*1.31;
	
	$("#jumbotron").height(canvas.offsetWidth*1.31);
	$("#blop").height(canvas.offsetWidth*1.31);
	
	
	canvasOffsetTop = $("#jumbotron")[0].offsetTop + canvas.offsetTop;
	canvasOffsetLeft = $("#jumbotron")[0].offsetLeft + canvas.offsetLeft;
	
	console.log("resize" + canvas.width+" "+canvas.height);
	
	//1.31
	if (ctx != undefined ) boucle();
	
}

function btn_line(event)
{
	if( drawingState == 1)
	{
		$("#btn-line").removeClass("active");
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
		$("#btn-line").addClass("active");
		console.log("drawingState = 1");
		drawingState = 1;
		drawingLine.push(new Array());
	}
}

function btn_bezier(event)
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



function btn_draw(event)
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

function mousemove{
	
}


/* Get the click position
 *
*/
function getPosition(event)
{
	var x = new Number();
	var y = new Number();

	if (event.x != undefined && event.y != undefined)
	{
	  x = event.x;
	  y = event.y;
	  
	  
	  x += document.body.scrollLeft + document.documentElement.scrollLeft;
	  y += document.body.scrollTop + document.documentElement.scrollTop;
	}
	else // Firefox method to get the position
	{
		console.log("WAZZZA");
		
	  x = event.clientX + document.body.scrollLeft +
		  document.documentElement.scrollLeft;
	  y = event.clientY + document.body.scrollTop +
		  document.documentElement.scrollTop;
	}

	//console.log("BLOP" + canvas.offsetTop + "  " + canvas.offsetLeft);
	
	x -= canvasOffsetLeft;
	y -= canvasOffsetTop;

	console.log("x: " + x + "  y: " + y);
	doAlert("hey","how are you baby ?","info");
	
	
	if(drawingState == 1){
		drawingPoint.push({"x" : x/canvasXSize, "y":y/canvasYSize});
		drawingLine[drawingLine.length-1].push({"x" : x/canvasXSize, "y":y/canvasYSize});
	}
	
	
	
	boucle();
	
}

// success info warning danger
function doAlert(  intro,  texte,  type)
{
	$( "#alertArea" ).html( "<div class=\"alert alert-"+type+" alert-dismissible fade in\" role=\"alert\"><button type=\"button\" class=\"close\" data-dismiss=\"alert\" aria-label=\"Close\"><span aria-hidden=\"true\">&times;</span></button><strong>"+intro+"</strong> "+texte+" </div>");
	
}



function boucle()
{
	//draw everything
	
	ctx.clearRect(0, 0, canvas.width, canvas.height);
	
	drawingPoint.forEach(function(entry) {
   
	ctx.save();
	ctx.beginPath();
	var p = RtoP(entry.x, entry.y);
	ctx.translate(p.x,p.y);
	ctx.moveTo(-5,0);
	ctx.lineTo(0, -5);
	ctx.lineTo(5, 0);
	ctx.lineTo(0, 5);
	ctx.closePath();
	ctx.stroke();
	ctx.restore();
   
   
	});
	
	drawingLine.forEach(function(entry) {
		/*ctx.save();
		entry.forEach(function (point){
			ctx.lineTo(point.x*canvasXSize, point.y*canvasYSize);
			
		});
   
	
	
	ctx.closePath();
	ctx.stroke();
	ctx.restore();*/
	
	ctx.save();
	
	for(var i = 0; i < entry.length; i++){
		if(i == 0)
			ctx.moveTo(entry[i].x*canvasXSize, entry[i].y*canvasYSize);
		else
			ctx.lineTo(entry[i].x*canvasXSize, entry[i].y*canvasYSize);
	}
   
	ctx.stroke();
	ctx.restore();
   
	});
	
	
	ctx.beginPath();
    ctx.moveTo(75,40);
    ctx.bezierCurveTo(75,37,70,25,50,25);
    ctx.bezierCurveTo(20,25,20,62.5,20,62.5);
    ctx.bezierCurveTo(20,80,40,102,75,120);
    ctx.bezierCurveTo(110,102,130,80,130,62.5);
    ctx.bezierCurveTo(130,62.5,130,25,100,25);
    ctx.bezierCurveTo(85,25,75,37,75,40);
    ctx.stroke();
  
	
	
}



function RtoP(x,y){
	return {"x": x*canvasXSize, "y": y*canvasYSize};
}

function PtoR(x,y){
	return {"x": x/canvasXSize, "y": y/canvasYSize};
}


