using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace ServerKupaint
{
    class SocketConnector : IRemoteConnector
    {
        #region FIELDS
        private string _adress;
        private string _port;
        #endregion

        #region PROPERTIES
        public string Adress
        {
            get { return _adress; }
            set { _adress = value; }
        }

        public string Port
        {
            get { return _port; }
            set { _port = value; }
        }
        #endregion

        public bool InitializeConnector()
        {
            return true;
        }

        /// <summary>
        /// Open connection to the device
        /// </summary>
        /// <returns>Return true on success</returns>
        public bool Open()
        {
            throw new NotImplementedException();
        }

        /// <summary>
        /// Close a openned connection
        /// </summary>
        /// <returns>Return true on succes</returns>
        public bool Close()
        {
            throw new NotImplementedException();
        }

        /// <summary>
        /// Send datas to the device
        /// </summary>
        /// <param name="data">Data to send</param>
        /// <returns>Return true on success</returns>
        public bool Send(string data)
        {
            throw new NotImplementedException();
        }

        /// <summary>
        /// Get datas from the connected device
        /// </summary>
        /// <returns>Datas caught</returns>
        public string Receive()
        {
            throw new NotImplementedException();
        }

    }
}
