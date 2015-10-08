using System;
using System.Collections.Generic;
using System.Diagnostics;
using System.IO;
using System.Linq;
using System.Web;
using System.Web.Services;
using Newtonsoft.Json;
using Newtonsoft.Json.Linq;

namespace KuPaint.Webservices
{
    /// <summary>
    /// Summary description for Converters
    /// </summary>
    [WebService(Namespace = "http://kupaint.org/")]
    [WebServiceBinding(ConformsTo = WsiProfiles.BasicProfile1_1)]
    [System.ComponentModel.ToolboxItem(false)]
    [System.Web.Script.Services.ScriptService]
    public class Converters : System.Web.Services.WebService
    {
        //private static readonly string procInputFile = @"C:\Kuka\temp";
        //private static readonly string procOutputFile = @"C:\Kuka\out";
        //private static readonly string procConverterJar = @"C:\Kuka\DrawingConvertor.jar";
        //private static readonly string javaExe = @"C:\Program Files\Java\jre1.8.0_60\bin\java.exe";

        private static readonly string procInputFile = @"{0}\temp";
        private static readonly string procOutputFile = @"{0}\out";
        private static readonly string procConverterJar = @"{0}\DrawingConvertor.jar";
        private static readonly string javaExe = @"C:\Program Files\Java\jre1.8.0_60\bin\java.exe";

        [WebMethod]
        public string ImageToJson(string imageBase64)
        {
            string output = string.Empty;
            // Save image
            try
            {
                byte[] bytes = Convert.FromBase64String(imageBase64);
                using (var imageFile = new FileStream(string.Format(procInputFile, Server.MapPath("~/Resources")), FileMode.Create))
                {
                    imageFile.Write(bytes, 0, bytes.Length);
                    imageFile.Flush();
                }

                // Call converter.jar with java.exe
                ProcessStartInfo start = new ProcessStartInfo();
                start.Arguments = string.Concat(" -jar ", 
                    string.Concat("\"", string.Format(procConverterJar, Server.MapPath("~/Resources")), "\""),
                    " img ",
                    string.Concat("\"", string.Format(procInputFile, Server.MapPath("~/Resources")), "\""),
                    " ",
                    string.Concat("\"", string.Format(procOutputFile, Server.MapPath("~/Resources")), "\""));

                start.FileName = javaExe;
                using (Process proc = Process.Start(start))
                {
                    proc.WaitForExit();
                }

                // Get the converter output file
                output = File.ReadAllText(string.Format(procOutputFile, Server.MapPath("~/Resources")));
                if (output == string.Empty)
                    throw new Exception("Empty output file");
            }
            catch (Exception ex)
            {
                // Generate json with error message
                output = string.Format("{{'error':'{0}'}}", ex.Message);
            }

            // Delete outputFile
            if (File.Exists(string.Format(procOutputFile, Server.MapPath("~/Resources")))) File.Delete(string.Format(procOutputFile, Server.MapPath("~/Resources")));

            // Return the JSON
            return output;
        }

        [WebMethod]
        public string GetHash(string inputJson)
        {
            string output = string.Empty;
            try
            {
                using (StreamWriter outputFile = new StreamWriter(string.Format(procInputFile, Server.MapPath("~/Resources")), true))
                {
                    outputFile.Write(inputJson);
                }

                // Call converter.jar with java.exe
                ProcessStartInfo start = new ProcessStartInfo();
                start.Arguments = string.Concat(" -jar ",
                    string.Concat("\"", string.Format(procConverterJar, Server.MapPath("~/Resources")), "\""),
                    " pts ",
                    string.Concat("\"", string.Format(procInputFile, Server.MapPath("~/Resources")), "\""),
                    " ",
                    string.Concat("\"", string.Format(procOutputFile, Server.MapPath("~/Resources")), "\""));
                start.FileName = javaExe;
                using (Process proc = Process.Start(start))
                {
                    proc.WaitForExit();
                }

                // Get the converter output file
                output = File.ReadAllText(string.Format(procOutputFile, Server.MapPath("~/Resources")));
                if (output == string.Empty)
                    throw new Exception("Empty output file");
            }
            catch (Exception ex)
            {
                // Generate json with error message
                output = string.Format("{{error:'{0}'}}", ex.Message);
            }

            // Delete outputFile
            if (File.Exists(string.Format(procOutputFile, Server.MapPath("~/Resources"))))
                File.Delete(string.Format(procOutputFile, Server.MapPath("~/Resources")));

            // Return the JSON
            return output;
        }

        [WebMethod]
        public string SVGToJson(string SVG)
        {
            string output = string.Empty;
            try
            {
                using (StreamWriter outputFile = new StreamWriter(string.Format(procInputFile, Server.MapPath("~/Resources")) + ".svg", true))
                {
                    outputFile.Write(SVG);
                }

                // Call converter.jar with java.exe
                ProcessStartInfo start = new ProcessStartInfo();
                start.Arguments = string.Concat(" -jar ",
                    string.Concat("\"", string.Format(procConverterJar, Server.MapPath("~/Resources")), "\""),
                    " svg ",
                    string.Concat("\"", string.Format(procInputFile, Server.MapPath("~/Resources")), ".svg\""),
                    " ",
                    string.Concat("\"", string.Format(procOutputFile, Server.MapPath("~/Resources")), "\""));
                start.FileName = javaExe;
                using (Process proc = Process.Start(start))
                {
                    proc.WaitForExit();
                }

                // Get the converter output file
                output = File.ReadAllText(string.Format(procOutputFile, Server.MapPath("~/Resources")));
                if (output == string.Empty)
                    throw new Exception("Empty output file");
            }
            catch(Exception ex)
            {
                // Generate json with error message
                output = string.Format("{{error:'{0}'}}", ex.Message);
            }

            // Delete outputFile
            if (File.Exists(string.Format(procOutputFile, Server.MapPath("~/Resources"))))
                File.Delete(string.Format(procOutputFile, Server.MapPath("~/Resources")));

            // Return the JSON
            return output;
        }

        [WebMethod]
        public string Test()
        {
            return string.Concat("http://", System.Web.HttpContext.Current.Request.Url.Host, "/WebServices/");
        }
    }
}
