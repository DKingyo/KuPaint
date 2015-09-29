using System;
using System.Collections.Generic;
using System.IO;
using System.Linq;
using System.Text;
using System.Threading;
using System.Threading.Tasks;
using System.Xml;

namespace ServerKupaint
{
    class Program
    {
        static void Main(string[] args)
        {
            Console.WriteLine("Starting KuPaint Server ...\n");

            //Config http server
            HttpServer httpServer = new HttpServer("*", 9666);

            Thread httpServerThread = new Thread(httpServer.StartListenning);
            httpServerThread.Start();

            List<IControllableDevice> devices = InitializeDevices();
            httpServer.Devices = devices;

            //Loop while serverHttp is launch
            while (!httpServerThread.IsAlive) ;

            httpServerThread.Join();
            foreach (IControllableDevice d in devices)
            {
                d.Connector.Close();
            }

            Console.WriteLine("\nPress any key ...");
            Console.ReadKey();
        }

        static List<IControllableDevice> InitializeDevices()
        {
            List<IControllableDevice> devices = new List<IControllableDevice>();
            string configPath = Environment.CurrentDirectory + "\\Resources\\DevicesConfig.xml";
            if (File.Exists(configPath))
            {
                Console.WriteLine("  [XML] Config file found");
                try
                {
                    //Check XML validity
                    XmlDocument doc = new XmlDocument();
                    doc.Load(configPath);

                    //Load XML file in reader
                    XmlReader reader = new XmlTextReader(configPath);
                    while (reader.Read())
                    {
                        switch (reader.Name.ToLower())
                        {
                            case "device":
                                if (reader.IsStartElement())
                                    devices.Add(DeviceFactory.GetDevice(reader.GetAttribute("type"), reader.ReadSubtree()));
                                break;
                        }

                    }
                }
                catch (Exception e)
                {
                    Console.WriteLine("  [XML] Config file corrupted: {0}", e.Data);
                }
            }
            else
            {
                Console.WriteLine("  [XML] Config file not found");
            }
            return devices;
        }
        
    }
}
