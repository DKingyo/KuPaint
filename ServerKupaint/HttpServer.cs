using System;
using System.Collections.Generic;
using System.Linq;
using System.Net;
using System.Text;
using System.Threading.Tasks;

namespace ServerKupaint
{
    /// <summary>
    /// Class allows to create a HttpServer to access to a robots fleet
    /// </summary>
    class HttpServer
    {
        #region FIELDS
        /// <summary>
        /// Listenning IP adress
        /// </summary>
        private string _adressIp;
        /// <summary>
        /// Listenning port
        /// </summary>
        private int _port;
        /// <summary>
        /// Used to keep alive the server
        /// </summary>
        private volatile bool _keepRunning;
        /// <summary>
        /// Robots fleet
        /// </summary>
        private volatile List<IControllableDevice> _devices;
        #endregion

        #region PROPERTIES
        /// <summary>
        /// Get listenning ip adress
        /// </summary>
        public string AdressIp
        {
            get { return _adressIp; }
        }

        /// <summary>
        /// Get listenning port
        /// </summary>
        public int Port
        {
            get { return _port; }
        }

        /// <summary>
        /// Get or Set a keep alive bool
        /// </summary>
        public bool KeepRunning
        {
            get { return _keepRunning; }
            set { _keepRunning = value; }
        }

        /// <summary>
        /// Get or set the robots collection
        /// </summary>
        public List<IControllableDevice> Devices
        {
            get { return _devices; }
            set { _devices = value; }
        }
        #endregion

        /// <summary>
        /// Class builder
        /// </summary>
        /// <param name="adresseIp">Listenning Ip adress</param>
        /// <param name="port">Listenning port</param>
        public HttpServer(string adresseIp, int port)
        {
            _adressIp = adresseIp;
            _port = port;
            _keepRunning = true;
        }

        /// <summary>
        /// Start listening and loop while StopListenning() is called
        /// </summary>
        public void StartListenning()
        {
            Console.WriteLine("  [HttpServer] Starting ...");
            HttpListener listener = new HttpListener();
            listener.Prefixes.Add(String.Format("http://{0}:{1}/", _adressIp, _port));
            listener.Start();
            Console.WriteLine("  [HttpServer] Listening ...");
            while (_keepRunning)
            {
                //Capture de la requête
                HttpListenerContext context = listener.GetContext();
                HttpListenerRequest request = context.Request;

                if (!request.Url.PathAndQuery.Contains("favicon.ico"))
                {
                    Console.WriteLine("  [HttpServer] Received {0} on {1}", request.HttpMethod, request.Url.PathAndQuery);
                }

                //Recuperation du flux de reponse
                HttpListenerResponse response = context.Response;

                string responseString = executeRequest(request.Url.PathAndQuery);

                //Formatage de la reponse et envoie
                byte[] buffer = System.Text.Encoding.UTF8.GetBytes(responseString);
                response.ContentLength64 = buffer.Length;
                response.OutputStream.Write(buffer, 0, buffer.Length);
                response.OutputStream.Close();
            }
            Console.WriteLine("  [HttpServer] Closed");
        }

        /// <summary>
        /// Stop the listenning and close the Httpserver
        /// </summary>
        public void StopListenning()
        {
            _keepRunning = false;
            Console.WriteLine("  [HttpServer] Prepare for closing ...");
        }

        /// <summary>
        /// Execute the request, and return the result to send to client
        /// </summary>
        /// <param name="request">Request received</param>
        /// <returns>Response for the client</returns>
        public string executeRequest(string request)
        {
            string result = null;
            string objectId = "";
            string method = "";
            string argument = "";
            //Parse request to catch each elements
            if (request.Contains('/'))
            {
                objectId = request.Split('/')[1];
                method = request.Split('/').Last();
                if (method.Contains('='))
                {
                    argument = method.Split('=').Last();
                    method = method.Split('=')[0];
                }
            }
            //Requests for server
            if (objectId.ToLower() == "server")
            {
                switch (method.ToLower())
                {
                    case "stop":
                        Console.WriteLine("  [HttpServer] Closing...");
                        result = "Goodbye !";
                        _keepRunning = false;
                        break;
                }
            }
            //Requests for remote controller
            else if (objectId.ToLower() == "remote")
            {


            }
            //Requests to robots
            else
            {
                //Find the device in devices list
                var devicesQuery = Devices.Where(d => d.ID.ToLower() == objectId.ToLower());
                IControllableDevice device = devicesQuery != null ? devicesQuery.First() : null;

                if (device != null)
                {
                    //switch (method.ToLower())
                    //{
                    //    //Return a JSON representing a robot
                    //    case "status":
                    //        result = new RobotProxy(r).ToJson();
                    //        Console.WriteLine(string.Format("  [HttpServer] Response: {0}", result));
                    //        break;

                    //    //Call a initialisation of a robot
                    //    case "reset":
                    //        r.InitRobot();
                    //        result = string.Format("[{0}] Reset", r.Name);
                    //        break;

                    //    //Stop the program running on the robot
                    //    case "stop":
                    //        result = string.Format("[{0}] Ok j'arrête", r.Name);
                    //        r.StopProgram();
                    //        break;

                    //    //Start a program on the robot
                    //    case "start":
                    //        if (!r.ProgRunning)
                    //        {
                    //            result = string.Format("[{0}] C'est parti !", r.Name);
                    //            r.StartProgram(argument);
                    //        }
                    //        else
                    //        {
                    //            result = string.Format("[{0}] Je suis pas multitache :(", r.Name);
                    //        }
                    //        break;
                    //    //Pause/Restart the program running on the robot
                    //    case "pause":
                    //        result = string.Format("[{0}] Pause/Reprise", r.Name);
                    //        r.Pause();
                    //        break;

                    //    //Access to a property of the robot and set a value
                    //    //using reflexion, the property need to have a set method
                    //    default:
                    //        if (r.SetProperty(method, argument))
                    //            result = new RobotProxy(r).ToJson();
                    //        break;

                    //}
                }
            }
            
            //Return request result, or error message
            return result ?? "Bad request"; ;
        }

    }

}
