using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace KuPaint.Models
{
    public class DeviceInfo
    {
        public string Avancement { get; set; }

        public string JointValues { get; set; }

        public Base PaperBase { get; set; }

        public Position Position { get; set; }

        public string Error { get; set; }
    }

    public class Position
    {
        public string X { get; set; }
        public string Y { get; set; }
        public string Z { get; set; }
    }

    public class Base
    {
        public string TransformationX { get; set; }
        public string TransformationY { get; set; }
        public string TransformationZ { get; set; }
        public string X { get; set; }
        public string Y { get; set; }
        public string Z { get; set; }
    }

 //{
	//"position": {
	//	"z": 88.64045111110696,
	//	"y": 73.65310482004531,
	//	"x": -0.5893355923135364
	//},
	//"jointValues": "[D@91c49e",
	//"avancement": 1.0,
	//"paperBase": 
	//"{
	//	\"transformationX\":-411.95798921634514,
	//	\"transformationY\":-607.3174064411878,
	//	\"transformationZ\":280.047103659831,
	//	\"z\":280.047103659831,
	//	\"y\":-607.3174064411878,
	//	\"x\":-411.95798921634514
	//}"
//}
}