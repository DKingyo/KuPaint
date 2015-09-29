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
            Console.WriteLine("Starting PI2A Server ...\n");

            //Config http server
            HttpServer httpServer = new HttpServer("*", 9666);

            Thread httpServerThread = new Thread(httpServer.StartListenning);
            httpServerThread.Start();

            List<IControllableDevice> devices = InitializeDevices();
            /*
            Robot nxt = robots[1];
            NXTCom nxtCom = new NXTCom(nxt);
            nxtCom.SendText(1, "LALA");
            nxtCom.Disconnect();
            */
            httpServer.Devices = devices;

            //Loop while serverHttp is launch
            while (!httpServerThread.IsAlive) ;

            httpServerThread.Join();
            foreach (IControllableDevice d in devices)
            {
                d.Close();
            }

            Console.WriteLine("\nPress any key ...");
            Console.ReadKey();
        }
        static List<IControllableDevice> InitializeDevices()
        {
            List<IControllableDevice> robots = new List<IControllableDevice>();
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
                        switch (reader.Name)
                        {
                            case "device":
                                if (reader.IsStartElement())
                                {
                                    string name = reader.GetAttribute("id");
                                    string type = null;
                                    string portCom = null;
                                    XmlReader subReader = reader.ReadSubtree();
                                    while (subReader.Read())
                                    {
                                        switch (reader.Name)
                                        {
                                            case "connection_type":
                                                type = reader.GetAttribute("value");
                                                break;
                                            case "port_com":
                                                portCom = reader.GetAttribute("value");
                                                break;
                                        }
                                    }

                                    if (name != null && type != null && portCom != null)
                                    {
                                        RobotType robType = RobotType.None;
                                        switch (type.ToLower())
                                        {
                                            case "ev3":
                                                robType = RobotType.EV3;
                                                break;
                                            case "nxt":
                                                robType = RobotType.NXT;
                                                break;
                                        }
                                        robots.Add(new Robot(portCom, robType, name));
                                    }
                                }
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
                Console.WriteLine("  [XML] Config file not found, apply default settings");
                Robot ev3 = new Robot("COM7", RobotType.EV3, "EVE");
                robots.Add(ev3);
            }
            return robots;
        }
        
    }
}
