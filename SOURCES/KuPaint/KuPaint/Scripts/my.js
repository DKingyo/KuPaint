var canvas; //objet canvas
var ctx; // contexte

var state = [ "idle", "connected", "moving", "error"];
var drawingLine = [[ ]];

var drawingPoint = [];

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
		//context.fillText("Dessine moi un mouton !", 10, 25);
		
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
   
   
   window.addEventListener('resize', place_button, true);
   place_button();
   
})



function place_button(){
	if ( parseInt($(".test").css("padding-top"), 10)  >= 50 )
	{
		$("#button").removeClass();
		$("#button").addClass("btn-group");
		
	}
	else{
		$("#button").removeClass();
		$("#button").addClass("btn-group-vertical");
	}
}


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
	
	$("#btn-undo").removeClass("active");
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
	
	console.log("BOUUCLE");
	
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
	ctx.fillStyle = '#3366FF';
	update_drawing();
}
function change_color_red(){
	ctx.strokeStyle = '#FF0000';
	ctx.fillStyle = '#FF0000';
	update_drawing();
}
function change_color_black(){
	ctx.strokeStyle = '#191919';
	ctx.fillStyle = '#191919';
	update_drawing();
}
function change_color_green(){
	ctx.strokeStyle = '#33CC33';
	ctx.fillStyle = '#33CC33';
	update_drawing();
}

function bin()
{
	console.log("Bin");
	H = new Array();
	drawingLine = [[ ]];
	drawingPoint = [];
	update_drawing();
}

function send(){
	
	console.log(build_Json());
	sendDataToKuka(JSON.stringify(build_Json()));

	/*console.log("send data" + JSON.stringify(H));
	$.post( "http://localhost/webservices/devicecontroller.asmx/sendData", JSON.stringify(H), function( data ) {
	console.log( data.name ); // John
	console.log( data.time ); // 2pm
	}, "json");
	console.log("send data end");*/
}






//draw evrything
function update_drawing()
{
	//draw everything
	
	//ctx.strokeStyle = '#ff0000';
	ctx.lineWidth = 1;
	
	
	ctx.clearRect(0, 0, canvas.width, canvas.height);
	
	
	
	console.log ("drawingPoint.length" + drawingPoint.length);
	if(drawingPoint.length == 0){
	drawingPoint = [ {"x" : -0.1, "y":-0.1}];}
	
		
	
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
		console.log("point !!");
   
	});
	
	
	H.forEach(function(entry) {		
		if(entry["type"] == "trait"){
			ctx.save();
			
			for(var i = 0; i < entry["val"].length; i++){
				if(i == 0)
					ctx.moveTo(entry["val"][i].x*canvasXSize, entry["val"][i].y*canvasYSize);
				else
					ctx.lineTo(entry["val"][i].x*canvasXSize, entry["val"][i].y*canvasYSize);
			}
			ctx.stroke();
			ctx.restore();
		}
		else if(entry["type"] == "rect"){
			ctx.save();
			ctx.beginPath();
			ctx.moveTo((entry["center"].x - entry["width"]/2)*canvasXSize, (entry["center"].y - entry["height"]/2)*canvasYSize );
			ctx.lineTo((entry["center"].x - entry["width"]/2)*canvasXSize, (entry["center"].y + entry["height"]/2)*canvasYSize );
			ctx.lineTo((entry["center"].x + entry["width"]/2)*canvasXSize, (entry["center"].y + entry["height"]/2)*canvasYSize );
			ctx.lineTo((entry["center"].x + entry["width"]/2)*canvasXSize, (entry["center"].y - entry["height"]/2)*canvasYSize );
			
			ctx.closePath();
			ctx.globalAlpha = 0.1;
			ctx.fill();
			ctx.globalAlpha = 1;
			ctx.stroke();
			ctx.restore();
		}
		else if(entry["type"] == "cercle"){
			ctx.save();
			ctx.beginPath();
			ctx.ellipse(entry["center"].x*canvasXSize,entry["center"].y*canvasYSize,entry["width"]*canvasXSize/2,entry["height"]*canvasYSize/2,0,0,Math.PI*2,0);
			ctx.closePath();
			
			
			/*ctx.beginPath();
			ctx.moveTo((entry["center"].x - entry["width"]/2)*canvasXSize, (entry["center"].y - entry["height"]/2)*canvasYSize );
			ctx.lineTo((entry["center"].x - entry["width"]/2)*canvasXSize, (entry["center"].y + entry["height"]/2)*canvasYSize );
			ctx.lineTo((entry["center"].x + entry["width"]/2)*canvasXSize, (entry["center"].y + entry["height"]/2)*canvasYSize );
			ctx.lineTo((entry["center"].x + entry["width"]/2)*canvasXSize, (entry["center"].y - entry["height"]/2)*canvasYSize );
			
			ctx.closePath();*/
			ctx.globalAlpha = 0.1;
			ctx.fill();
			ctx.globalAlpha = 1;
			ctx.stroke();
			
			
			
			
			
			ctx.restore();
		}
		else if(entry["type"] == "spline"){
			
			if (entry["val"].length >= 3)
			{
				ctx.save();
				console.log("bezier");
				ctx.moveTo(entry["val"][0].x* canvasXSize, entry["val"][0].y * canvasYSize);

				var i;
				for (i = 1; i < entry["val"].length - 2; i ++)
				{
				  var xc = (entry["val"][i].x * canvasXSize + entry["val"][i + 1].x * canvasXSize) / 2;
				  var yc = (entry["val"][i].y * canvasYSize + entry["val"][i + 1].y * canvasYSize) / 2;
				  ctx.quadraticCurveTo(entry["val"][i].x * canvasXSize, entry["val"][i].y * canvasYSize, xc, yc);
				}
				 // curve through the last two points
				 ctx.quadraticCurveTo(entry["val"][i].x * canvasXSize, entry["val"][i].y * canvasYSize, entry["val"][i+1].x * canvasXSize,entry["val"][i+1].y * canvasYSize);
				
				ctx.stroke();
				ctx.restore();
			}
			
			
		}
		else if (entry["type"] == "texte"){
			
			
			var text = entry["texte"];
			ctx.font = entry["size"] + " " + entry["font"];
			ctx.textAlign = "center";
			ctx.textBaseline = "middle";
			var textPxLength = ctx.measureText(text);
			ctx.fillStyle = ctx.strokeStyle;
			ctx.fillText(text,entry["center"].x*canvasXSize,entry["center"].y*canvasYSize);
			
			if(entry["select"] == true){
				
				
				var text_width = ctx.measureText(text).width;
				var text_height = entry["size"].substring(0, entry["size"].indexOf('p'));
				
				var control_point = new Array();
				control_point.push(PtoR(xRtoP(entry["center"].x) + text_width /2 ,yRtoP(entry["center"].y) + text_height /2));
				control_point.push(PtoR(xRtoP(entry["center"].x) - text_width /2 ,yRtoP(entry["center"].y) + text_height /2));
				control_point.push(PtoR(xRtoP(entry["center"].x) - text_width /2 ,yRtoP(entry["center"].y) - text_height /2));
				control_point.push(PtoR(xRtoP(entry["center"].x) + text_width /2 ,yRtoP(entry["center"].y) - text_height /2));
				
				
					for(var i = 0; i < control_point.length; i++){
						if(i == 0)
							ctx.moveTo(control_point[i].x*canvasXSize, control_point[i].y*canvasYSize);
						else
							ctx.lineTo(control_point[i].x*canvasXSize, control_point[i].y*canvasYSize);
					}
					ctx.lineTo(control_point[0].x*canvasXSize, control_point[0].y*canvasYSize);
					ctx.stroke();
			   
			   
				
				
				
			}
			
			
			
			
			//ctx.fillStyle = "darkorange";
			//ctx.fillText("width: "+Math.round(textPxLength.width)+"px",25,100);
		}
		
		
	   
	
   
	});
	console.log("clear 3");
	
	
	/*ctx.beginPath();
    ctx.moveTo(75,40);
    ctx.bezierCurveTo(75,37,70,25,50,25);
    ctx.bezierCurveTo(20,25,20,62.5,20,62.5);
    ctx.bezierCurveTo(20,80,40,102,75,120);
    ctx.bezierCurveTo(110,102,130,80,130,62.5);
    ctx.bezierCurveTo(130,62.5,130,25,100,25);
    ctx.bezierCurveTo(85,25,75,37,75,40);
    ctx.stroke();*/
}


function build_Json(){
	
    var path = { "path": new Array(), "width": 1, "height": 1 };
	
	
	
	
	var id = 0;
	H.forEach(function(entry) {
		
		
		if(entry["type"] == "trait"){
			var trait = {"id":id,"pts":[]};
			for(var i = 0; i < entry["val"].length; i++){
			    trait["pts"].push(Point(entry["val"][i].x, 1-entry["val"][i].y));
			}
			path["path"].push(trait);
		}
		id++;
	});
	
	
	return path;
	
	
}

function upload_display_modal(){
	
	$('#filemodal').modal('toggle');
}



function send_file(){
	
    var imgplop = loadImage();
    //ImagetoJson2(imgplop);
	/*
	console.log($('#InputFile')[0].files);
	
	var wut = new Image();
	wut.src = $('#InputFile')[0].files[0];
	ImagetoJson2($('#InputFile')[0].files[0]);
	*/
	
	
}


function loadImage() {
        var input, file, fr, img;

        if (typeof window.FileReader !== 'function') {
            write("The file API isn't supported on this browser yet.");
            return;
        }

        input = document.getElementById('InputFile');
        if (!input) {
            write("Um, couldn't find the imgfile element.");
        }
        else if (!input.files) {
            write("This browser doesn't seem to support the `files` property of file inputs.");
        }
        else if (!input.files[0]) {
            write("Please select a file before clicking 'Load'");
        }
        else {
            file = input.files[0];
            fr = new FileReader();
            fr.onload = createImage;
            fr.readAsDataURL(file);
        }

        function createImage() {
            img = new Image();
            img.onload = imageLoaded;
            img.src = fr.result;
        }

        function imageLoaded() {
            var canvas = document.getElementById("hidden_canvas");
            canvas.width = img.width;
            canvas.height = img.height;
            var ctx = canvas.getContext("2d");
            ctx.drawImage(img,0,0);
            console.log(canvas.toDataURL("image/png"));
            ImagetoJson2(canvas.toDataURL("image/png"));
			return "" + canvas.toDataURL("image/png");
        }

        function write(msg) {
            
            console.log(msg);
        }
 }
 
 
 function undo(){
	 
	 if(H.length >= 1){
		 H.pop();
		 
		 update_drawing();
		 console.log(H);
	 }
	 
	 
 }

 