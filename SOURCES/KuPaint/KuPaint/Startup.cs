using Microsoft.Owin;
using System.Threading;
using Owin;

[assembly: OwinStartupAttribute(typeof(KuPaint.Startup))]
namespace KuPaint
{
    public partial class Startup
    {
        public void Configuration(IAppBuilder app)
        {
            //Thread socketListener = new Thread(AsynchronousSocketListener.StartListening);
            //socketListener.Start();
        }
    }
}
