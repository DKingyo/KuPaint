using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace ServerKupaint
{
    public enum ConnectorType { Socket, TCPIP };
    interface IRemoteConnector
    {
        bool InitializeConnector();

        /// <summary>
        /// Open connection to the device
        /// </summary>
        /// <returns>Return true on success</returns>
        bool Open();

        /// <summary>
        /// Close a openned connection
        /// </summary>
        /// <returns>Return true on succes</returns>
        bool Close();

        /// <summary>
        /// Send datas to the device
        /// </summary>
        /// <param name="data">Data to send</param>
        /// <returns>Return true on success</returns>
        bool Send(string data);

        /// <summary>
        /// Get datas from the connected device
        /// </summary>
        /// <returns>Datas caught</returns>
        string Receive();
    }
}
