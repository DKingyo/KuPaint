using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Mvc;
using Newtonsoft.Json;
using KuPaint.Models;

namespace KuPaint.Controllers
{
    public class DeviceInfoController : Controller
    {
        // GET: DeviceInfo
        public ActionResult Index()
        {
            ViewData["deviceInfo"] = JsonConvert.DeserializeObject<DeviceInfo>(Webservices.DeviceController.GetDeviceInfo());
            return View();
        }
        
    }
}