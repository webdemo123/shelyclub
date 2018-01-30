(function () {
    var ChatHub = function (hubUrl) {
        var connection = $.hubConnection(hubUrl);
        var hub = connection.createHubProxy('chatHub');

        hub.server = {};
        hub.client = {};

        $.extend(hub.server, {
            pingPong: function () {
                return hub.invoke.apply(hub, $.merge(["PingPong"], $.makeArray(arguments)));
            },

            registerChat: function (channel) {
                return hub.invoke.apply(hub, $.merge(["RegisterChat"], $.makeArray(arguments)));
            },

            unregisterChat: function (channel) {
                return hub.invoke.apply(hub, $.merge(["UnregisterChat"], $.makeArray(arguments)));
            },

            sendMessage: function (message, channel) {
                return hub.invoke.apply(hub, $.merge(["SendMessage"], $.makeArray(arguments)));
            }
        });

        hub.on('listLastMessages', function (lastMessages) {
            if (typeof lastMessages == 'string')
                lastMessages = $.parseJSON(lastMessages);

            if (typeof hub.client.listLastMessages == 'function')
                hub.client.listLastMessages(lastMessages);
        });

        hub.on('addUserOnline', function (chatUser) {
            
        });

        hub.on('removeUserOnline', function (chatUser) {
            if (typeof chatUser == 'string')
                chatUser = $.parseJSON(chatUser);

            if (typeof hub.client.removeUserOnline == 'function')
                hub.client.removeUserOnline(chatUser);
        });

        hub.on('systemMessage', function (systemMessage, type) {
            if (typeof hub.client.systemMessage == 'function')
                hub.client.systemMessage(systemMessage, type);
        });

        hub.on('receiveMessage', function (chatMessage) {
            if (typeof hub.client.receiveMessage == 'function')
                hub.client.receiveMessage(chatMessage);
        });

        hub.on('notification', function (messages) {
            if (typeof hub.client.notification == 'function')
                hub.client.notification(messages);
        });

        return hub;
    };

    window.ChatHub = ChatHub;
})();