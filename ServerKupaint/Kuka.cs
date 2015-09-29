using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace ServerKupaint
{
    class Kuka : IControllableDevice
    {
        /// <summary>
        /// Device ID
        /// </summary>
        public string ID { get; set; }

        /// <summary>
        /// Connector used for datas transfert
        /// </summary>
        public IRemoteConnector Connector { get; set; }
    }
}
