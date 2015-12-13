using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace SignalRChat.Models
{
  public class Message
  {
    public string from { get; set; }
    public string message { get; set; }
    public string source { get; set; }
    public long time { get; set; }
    public string toId { get; set; }
    public string fromId { get; set; }
    public bool read { get; set; }
  }
}