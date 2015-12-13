using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Mvc;

namespace SignalRChat.Controllers
{
    public class ResetController : Controller
    {
        // GET: Reset
        public void Index(string Id)
        {
          string success = "invalid id";
          if (Id == "reset12")
          {
            MvcApplication.Users.Clear();
            success = "success";
          }
          Response.Write(success);
        }
    }
}