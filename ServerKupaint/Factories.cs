using System;
using System.Collections.Generic;
using System.Linq;
using System.Reflection;
using System.Text;
using System.Threading.Tasks;
using System.Xml;

namespace ServerKupaint
{
    class DeviceFactory
    {
        /// <summary>
        /// Get a device set with XML parameters contains in XML Reader
        /// </summary>
        /// <param name="reader">XML Reader</param>
        /// <returns>Configured device</returns>
        public static IControllableDevice GetDevice(string type, XmlReader reader)
        {
            //Get the correct device 
            IControllableDevice device = null;
            switch (type.ToLower())
            {
                case "kuka":
                    device = new Kuka();
                    break;
                    //ADD NEW DEVICE TYPE HERE
            }
            //Config device properties
            if (device != null)
            {
                while (reader.Read())
                {
                    if (reader.Name.ToLower() == "connector")
                        device.Connector = ConnectorFactory.GetConnector(reader.GetAttribute("type"), reader.ReadSubtree());
                    else
                        FactoryTools.SetProperty(device, reader.Name, reader.GetAttribute("value"));
                }
            }
            return device;
        }
    }

    class ConnectorFactory
    {
        public static IRemoteConnector GetConnector(string type, XmlReader reader)
        {
            //Get correct connector
            IRemoteConnector connector = null;
            switch (type.ToLower())
            {
                case "socket":
                    connector = new SocketConnector();
                    break;
                    //ADD NEW CONNECTOR TYPE HERE
            }
            //Config connector properties
            if (connector != null)
            {
                while (reader.Read())
                    FactoryTools.SetProperty(connector, reader.Name, reader.GetAttribute("value"));
            }
            return connector;
        }
    }

    class FactoryTools
    {
        public static void SetProperty(dynamic obj, string propertyName, string propertyValue)
        {
            try
            {
                PropertyInfo propertyInfo = obj.GetType().GetProperty(propertyName);
                Type typeProperty = propertyInfo.PropertyType;

                propertyInfo.SetValue(obj, Convert.ChangeType(propertyValue, typeProperty));
            }
            catch (Exception ex)
            {
                Console.WriteLine(string.Format("  [Error] Property: \"{1}\" not found. {2}", propertyName, ex.Data));
            }
        }
    }
}
