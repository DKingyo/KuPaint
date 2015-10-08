using System;
using System.Collections.Generic;
using System.Linq;
using System.Net.Sockets;
using System.Threading;
using System.Web;
using System.Web.Services;

namespace KuPaint.Webservices
{
    /// <summary>
    /// Summary description for DeviceController
    /// </summary>
    [WebService(Namespace = "http://kupaint.org/")]
    [WebServiceBinding(ConformsTo = WsiProfiles.BasicProfile1_1)]
    [System.ComponentModel.ToolboxItem(false)]
    [System.Web.Script.Services.ScriptService]
    public class DeviceController : System.Web.Services.WebService
    {
        public static Socket clientSocket;

        public static Thread socketListenning = new Thread(AsynchronousSocketListener.StartListening);

        [WebMethod]
        public void SendData(string data)
        {
            if (socketListenning.ThreadState == ThreadState.Running || socketListenning.ThreadState == ThreadState.WaitSleepJoin)
                AsynchronousSocketListener.Send(clientSocket, data);
        }

        [WebMethod]
        public void StartServer(int port)
        {
            if (socketListenning.ThreadState == ThreadState.Running)
                socketListenning.Abort();
            AsynchronousSocketListener.Port = port;
            socketListenning = new Thread(AsynchronousSocketListener.StartListening);
            socketListenning.Start();
        }

        [WebMethod]
        public void StopServer()
        {
            socketListenning.Abort();
        }

        [WebMethod]
        public static string GetDeviceInfo()
        {
            if (socketListenning.ThreadState == ThreadState.Running || socketListenning.ThreadState == ThreadState.WaitSleepJoin)
            {
                AsynchronousSocketListener.ResponseReady = false;
                AsynchronousSocketListener.Send(clientSocket, "info");
                while (!AsynchronousSocketListener.ResponseReady)
                {
                    Thread.Sleep(50);
                }
                AsynchronousSocketListener.ResponseReady = false;
                return AsynchronousSocketListener.Response;
            }
            else
            {
                return "{'Error': 'Device offline'}";
            }
        }

        public static string GetDeviceInfoTest()
        {
            return @"{'position':{'z':88.64045111110696,'y':73.65310482004531,'x':-0.5893355923135364},'jointValues':'[D@91c49e','avancement':1.0,'paperBase':{'transformationX':-411.95798921634514,'transformationY':-607.3174064411878,'transformationZ':280.047103659831,'z':280.047103659831,'y':-607.3174064411878,'x':-411.95798921634514}}";
        }
    }
}
