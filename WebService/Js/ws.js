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

function ImageToJson(imageBase64) {
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