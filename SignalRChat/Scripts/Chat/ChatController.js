angular.module("Chat", [])
  .controller('ChatController', ['$scope', ChatController]);

function ChatController($scope) {
  $scope.Message = "";
  $scope.Search = "";
  $scope.CurrentUserId = null;
  $scope.CurrentUserName = "";
  $scope.CurrentUser = null;
  $scope.ChatHub = null;
  $scope.HubId = null;
  $scope.MyName = "";
  $scope.Users = [
  ];
  $scope.ActiveMessages = [];
  $scope.Messages = {
  };
  $scope.SendMessage = function () {
    if ($scope.Message == "") {
      toastr["error"]("Please type the message first...");
      return false;
    }
    var message = {
      toId: $scope.CurrentUserId,
      fromId: $scope.HubId,
      message: $scope.Message,
      from: $scope.MyName,
      source: "my",
      read: true,
      time : Date.now()
    };
    var temp = $scope.Messages[message.toId];
    if (temp == null)
      $scope.Messages[message.toId] = [];

    $scope.Messages[message.toId].push(message);
    $scope.UpdateMessageList();
    $scope.ChatHub.server.sendMessage(message);
    $scope.Message = "";

    //alert($scope.Message);
  }

  $scope.ActivateChat = function (user) {
    $scope.CurrentUserName = user.Name;
    $scope.CurrentUserId = user.Id;
    $scope.CurrentUser = user;

    var temp = $scope.Messages[user.Id];
    if (temp != null) {
      for (var i = 0; i < temp.length; i++) {
        temp[i].read = true;
      }
    }

    $scope.UpdateMessageList();
  }

  $scope.UpdateMessageList = function() {
    $scope.ActiveMessages = $scope.Messages[$scope.CurrentUserId];
  }

  $scope.displayTime = function(time) {
    return moment(time).fromNow();
  }

  $scope.getUnreadCount = function (fromId) {
    var count = 0;
    var temp = $scope.Messages[fromId];
    if (temp == null)
      return count;
    temp.forEach(function(item) {
      if (!item.read)
        count++;
    });

    return count;
  }
  $scope.getTotalMessage = function () {
    var count = 0;
    var temp = $scope.Messages[$scope.CurrentUserId];
    if (temp == null)
      count = 0;
    else {
      count = temp.length;
    }
    

    return count+" "+(count<=1 ? "message" : "messages");
  }


}