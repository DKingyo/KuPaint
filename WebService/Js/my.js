var canvas; //objet canvas
var ctx; // contexte

var state = [ "idle", "connected", "moving", "error"];
var drawingLine = [[ ]];

var drawingPoint = [ {"x" : 0.1, "y":0.1}];

var canvasXSize;
var canvasYSize;

var canvasXoffset;
var canvasYoffset;


//drawingState = 1 -> line , 2 -> bezier, 3-> draw
var drawingState = 0;
var pointSelectionSize;
var pointSelectionId = -1; // -1 -> aucun point selectionné

$( document ).ready( function (e) {
   // stops modal from being shown
   //$('#myModal').modal('show');
   //$('#button').hide();
   //$('#mainCanvas').hide();
   
   //init canvas event listener
   
   
   canvas = $("#mainCanvas")[0];
   
   canvasResize();
   
   console.log(canvas);
   //canvas.addEventListener("mousedown", getPosition, false);
   //canvas.addEventListener("mousemove", mousemove, false);
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
	
	
	
	$( "button[id*='btn-']").click(handler);
	
	//$("#btn-line")[0].addEventListener("click", btn_line,false);
	//$("#btn-bezier")[0].addEventListener("click", btn_bezier,false);
	//$("#btn-draw")[0].addEventListener("click", btn_draw,false);
	
	link_buton_event();
	
   window.setTimeout(update_drawing,1000);
})

function canvasResize()
{
	
	
	canvasXSize = canvas.width = canvas.offsetWidth;
	canvasYSize = canvas.height = canvas.offsetWidth*1.31;
	
	pointSelectionSize = 10/canvasXSize;
	
	$("#jumbotron").height(canvas.offsetWidth*1.31);
	$("#blop").height(canvas.offsetWidth*1.31);
	
	
	canvasOffsetTop = $("#jumbotron")[0].offsetTop + canvas.offsetTop;
	canvasOffsetLeft = $("#jumbotron")[0].offsetLeft + canvas.offsetLeft;
	
	
	canvasXoffset = document.body.scrollLeft + document.documentElement.scrollLeft - canvasOffsetLeft ;
	canvasYoffset = document.body.scrollTop + document.documentElement.scrollTop - canvasOffsetTop;
	
	console.log("resize" + canvas.width+ " " + canvas.height);
	
	//1.31
	if (ctx != undefined ) update_drawing();
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

	console.log(" pos click x: " + x + "  y: " + y);
	doAlert("hey","how are you baby ?","info");
	
	
	if(drawingState == 1){
		drawingPoint.push({"x" : x/canvasXSize, "y":y/canvasYSize});
		drawingLine[drawingLine.length-1].push({"x" : x/canvasXSize, "y":y/canvasYSize});
	}
	
	
	
	update_drawing();
	
}





function boucle()
{
	//draw everything
	
	//ctx.strokeStyle = '#ff0000';
	ctx.lineWidth = 1;
	
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


function change_color_blue(){
	ctx.strokeStyle = '#3366FF';
	update_drawing();
}
function change_color_red(){
	ctx.strokeStyle = '#FF0000';
	update_drawing();
}
function change_color_black(){
	ctx.strokeStyle = '#191919';
	update_drawing();
}
function change_color_green(){
	ctx.strokeStyle = '#33CC33';
	update_drawing();
}

function bin()
{
	console.log("Bin");
	drawingLine = [[ ]];
	drawingPoint = [];
	update_drawing();
}

//draw evrything
function update_drawing()
{
	//draw everything
	
	//ctx.strokeStyle = '#ff0000';
	ctx.lineWidth = 1;
	
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
	
	H.forEach(function(entry) {
		/*ctx.save();
		entry.forEach(function (point){
			ctx.lineTo(point.x*canvasXSize, point.y*canvasYSize);
			
		});
   
	
	
	ctx.closePath();
	ctx.stroke();
	ctx.restore();*/
	
	if(entry["type"] == "trait"){
		
		for(var i = 0; i < entry["val"].length; i++){
			if(i == 0)
				ctx.moveTo(entry["val"][i].x*canvasXSize, entry["val"][i].y*canvasYSize);
			else
				ctx.lineTo(entry["val"][i].x*canvasXSize, entry["val"][i].y*canvasYSize);
		}
	}
	ctx.save();   
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




