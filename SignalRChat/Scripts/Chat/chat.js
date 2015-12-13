(function () {
  var ChatApp = {
    HubId:null,
    ChatHub: null,
    Scope: null,
    Init: function() {
      this.Scope = angular.element("#people-list").scope();
      console.log("ChatApp initialized");
    },
    ActivateChat : function(user) {
      this.Scope.$apply(function() {
        ChatApp.Scope.ActivateChat(user);
      });
    },
    SendMessage : function() {
      var message = {
        toId: this.HubId
      };

      this.Scope.$apply(function () {
        ChatApp.Scope.SendMessage(message);
      });

    },
    AddUser: function () {
      var name = $("#new-user-name").val();
      this.ChatHub.server.addUser(this.HubId, name);
      $("#modal-new-user").modal("hide");
      this.Scope.$apply(function() {
        ChatApp.Scope.MyName = name;
      });
    },
    OnKeyPress : function(e) {
      if (e.keyCode == 13) {
        this.SendMessage();
        return false;
      }
    }
  };


  $(document).ready(function () {
    ChatApp.Init();
    $.connection.hub.start().done(function () {
      ChatApp.HubId = $.connection.hub.id;
      ChatApp.Scope.HubId = ChatApp.HubId;
    });

    ChatApp.ChatHub = $.connection.chatHub;
    ChatApp.Scope.ChatHub = ChatApp.ChatHub;
    ChatApp.ChatHub.client.ReceiveMessage = function (message) {
      ChatApp.Scope.$apply(function () {
        var temp = ChatApp.Scope.Messages[message.fromId];
        if(temp==null)
          ChatApp.Scope.Messages[message.fromId] = [];
        message.read = (ChatApp.Scope.CurrentUserId == message.fromId);
        ChatApp.Scope.Messages[message.fromId].push(message);
        ChatApp.Scope.UpdateMessageList();
      });
    };
    ChatApp.ChatHub.client.NewUserComing = function (newUser) {
      ChatApp.Scope.$apply(function() {
        ChatApp.Scope.Users.push(newUser);
      });
    };

    $("#modal-new-user").modal({
      show: true,
      backdrop: 'static',
      keyboard: false
    });
  });

  window.ChatApp = ChatApp;
})();