function sendDataToKuka(jsonData) {
    var urlWebService = "http://172.30.1.164/kupaint/webservices/devicecontroller.asmx";
    $.ajax({
        type: "POST",
        url: urlWebService + "/SendData",
        data: '{ data:' + '"' + jsonData + '"}',
        contentType: "application/json; charset=utf-8",
        dataType: "json",
        success: function (ret) {
			doAlert("WS","sendDataToKuka","info");
            console.log("SendData End");
        }
    });
}

function startServer(port) {
    var urlWebService = $("#HfWsUrl").attr("data-content") + "DeviceController.asmx";
    $.ajax({
        type: "POST",
        url: urlWebService + "/StartServer",
        data: '{ port:' + '"' + port + '"}',
        contentType: "application/json; charset=utf-8",
        dataType: "json",
        success: function (ret) {
			doAlert("WS","startServer End","info");
            console.log("StartServer End");
        }
    });
}

function GetHash(jsonData) {
    var urlWebService = $("#HfWsUrl").attr("data-content") + "Converters.asmx";
    $.ajax({
        type: "POST",
        url: urlWebService + "/GetHash",
        data: '{ inputJson:' + '"' + jsonData + '"}',
        contentType: "application/json; charset=utf-8",
        dataType: "json",
        success: function (ret) {
			doAlert("WS","GetHash","info");
            console.log("GetHash End");
        }
    });
}

function ImageToJson() {
	
	
	console.log("try send file... ");
	
	var ImageData  = ctx.getImageData(0, 0, canvasXSize, canvasYSize);
	console.log(ImageData);
	
	var imageBase64 = JSON.stringify(btoa(ImageData.data));
	
	
	
    var urlWebService = $("#HfWsUrl").attr("data-content") + "Converters.asmx";
    $.ajax({
        type: "POST",
        url: urlWebService + "/ImageToJson",
        data: '{ imageBase64:' + '"' + imageBase64 + '"}',
        contentType: "application/json; charset=utf-8",
        dataType: "json",
        success: function (ret) {
			
			doAlert("WS","GetHash","info");
            console.log("ImageToJson End");
        }
    });
}




function ImagetoJson2(image){
	
	
	
	console.log("try send file... ");
	
	/*var ImageData  = ctx.getImageData(0, 0, canvasXSize, canvasYSize);
	console.log(ImageData);
	
	var Json_Data = JSON.stringify(btoa(ImageData.data));*/
	
	console.log(image);
	
	var Json_Data = JSON.stringify(image);
	
	
	var urlWebService = $("#HfWsUrl").attr("data-content") + "Converters.asmx";
	$.ajax({
		xhr: function()
			{
				var xhr = new window.XMLHttpRequest();
				//Upload progress
				xhr.upload.addEventListener("progress", function(evt){
					if (evt.lengthComputable) {
						var percentComplete = evt.loaded / evt.total;
						//Do something with upload progress
						
						$(".progress-bar").width(percentComplete+"%");
						console.log(percentComplete);
					}
				}, false);
				//Download progress
				xhr.addEventListener("progress", function(evt){
					if (evt.lengthComputable) {
						var percentComplete = evt.loaded / evt.total;
						$(".progress-bar").width(percentComplete+"%");
						//Do something with download progress
						console.log(percentComplete);
					}
				}, false);
				return xhr;
			},
		type: 'POST',
		url: urlWebService + "/ImageToJson",
		data: '{ imageBase64:' + '"' + Json_Data + '"}',
		contentType: "application/json; charset=utf-8",
		dataType: "json",
		success: function(data){
				//Do something success-ish
			}
	});
}

function SVGToJson(svg) {
    var urlWebService = $("#HfWsUrl").attr("data-content") + "Converters.asmx";
    $.ajax({
        type: "POST",
        url: urlWebService + "/SVGToJson",
        data: '{ SVG:' + '"' + svg + '"}',
        contentType: "application/json; charset=utf-8",
        dataType: "json",
        success: function (ret) {
			doAlert("WS","SVGToJson","info");
            //TODO faire quelquechose avec ca!
            console.log("SVGToJson End");
        }
    });
}