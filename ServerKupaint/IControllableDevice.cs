using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace ServerKupaint
{
    interface IControllableDevice
    {
        /// <summary>
        /// Device ID
        /// </summary>
        string ID { get; set; }

        /// <summary>
        /// Connector used for datas transfer
        /// </summary>
        IRemoteConnector Connector { get; set; }

    }
}
