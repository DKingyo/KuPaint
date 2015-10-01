var canvas //objet canvas
var ctx // contexte

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
	
	console.log("jumbotron size " + $("#jumbotron")[0].offsetTop);
	console.log("jumbotron size " + $("#jumbotron")[0].offsetLeft);
 
	console.log("size" + canvas.offsetWidth);
	console.log("size" + canvas.offsetHeight);
	console.log("size" + canvas.offsetTop);
	console.log("size" + canvas.offsetLeft);
   
})

function canvasResize()
{
	
	canvas.width = canvas.offsetWidth;
	canvas.height = canvas.offsetWidth*1.31;
	$("#jumbotron").height(canvas.offsetWidth*1.31);
	$("#blop").height(canvas.offsetWidth*1.31);
	
	
	canvasOffsetTop = $("#jumbotron")[0].offsetTop + canvas.offsetTop;
	canvasOffsetLeft = $("#jumbotron")[0].offsetLeft + canvas.offsetLeft;
	
	console.log("resize" + canvas.width+" "+canvas.height);
	
	//1.31
	
	
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
	doAlert("hey","who are you baby ?","info");
}

// success info warning danger
function doAlert(  intro,  texte,  type)
{
	$( "#alertArea" ).html( "<div class=\"alert alert-"+type+" alert-dismissible fade in\" role=\"alert\"><button type=\"button\" class=\"close\" data-dismiss=\"alert\" aria-label=\"Close\"><span aria-hidden=\"true\">&times;</span></button><strong>"+intro+"</strong> "+texte+" </div>");
	
}


