using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using Microsoft.AspNet.SignalR;
using SignalRChat.Models;

namespace SignalRChat
{
  public class ChatHub : Hub
  {
    public void Hello()
    {
      Clients.All.hello();
    }

    public void SendMessage(Message message)
    {
      message.source = "other";
      message.read = false;
      Clients.Client(message.toId).ReceiveMessage(message);
    }

    public void AddUser(string Id, string Name)
    {
      if(string.IsNullOrEmpty(Name))
        return;

      var user = new User() {Id = Id, Name = Name};
      MvcApplication.Users.Add(user);
      Clients.Others.NewUserComing(user);
    }
  }
}