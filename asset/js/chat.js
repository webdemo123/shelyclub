(function (window, $) {
    var Chat = function () {
        this._init();
    };
    
    Chat.ui = {
        $btnChat: $('#btn-chat'),
        //$chatTab: $('.channel div'),
        $chatTab: $('.roomchat li a'),
        $chatAllInput: $('#txtboxchatportal, #txtboxchatingame'),

        $chatLobbyContent: $('#chatbox .content'),
        $chatLobbyInput: $('#txtboxchatportal'),

        $chat: $('#chat'),
        $content: $('#chat #chat-content'),
        $chatInput: $('#txtboxchatingame'),
        $btnSend: $('#btnchatingame, #btnchatportal'),
        $btnClose: $('#chat .close'),
        $quickChat: $('#quickChat'),
        $preEmoticon: $('.emoticon'),
        $preText: $('.pre-text')
    };

    Chat.prototype._init = function () {
        if (this.isInit)
            return;

        var that = this;
        this.isInit = true;

        $('body').keypress(function (event) {
            event.stopPropagation();
            var keycode = (event.keyCode ? event.keyCode : event.which);

            if (keycode != '13')
                return;

            if (Chat.ui.$chat.is(':visible') && Chat.ui.$chatInput.val() == '') {//App.channel.indexOf('room') > -1) {
                var eventValue = '';
                if ($('#chat .channel').is(':visible')) {
                    Chat.closeChatInGame();
                    eventValue = 'CloseChat-KeyEnter';
                } else {
                    Chat.restoreChatInGame();
                    eventValue = 'RestoreChat-KeyEnter';
                }
                
            }
            else if (Navigator.getURLParameters().length > 2 && event.target instanceof HTMLBodyElement) {
                Chat.initChatInGame();
               
            }
        });

        $('.back-lobby').click(function (e) {
            Chat.closeChatInGame();
            Chat.ui.$quickChat.hide();
        });

        Chat.ui.$btnChat.click(function (e) {
            Chat.initChatInGame();
        });

        Chat.ui.$btnClose.click(function () {
           Chat.closeChatInGame();
             
            
        });

        Chat.ui.$chatInput.keypress(function (e) {
            if (e.keyCode == 13)
                sendMessage(that);
        });
        Chat.ui.$chatLobbyInput.keypress(function (e) {
            if (e.keyCode == 13)
                sendMessage(that);
        });

        Chat.ui.$btnSend.click(function (e) {
            e.preventDefault();
            e.stopPropagation();

            sendMessage(that);
        });

        Chat.ui.$chatTab.click(function (e) {
            e.stopPropagation();
            if (!$(this).hasClass('active')) {
                var gameName = Navigator.getLocation();
                if ($(this).hasClass('world')) {
                    Chat.unregisterChat(gameName, 'lobby', function () {
                        Chat.registerChat('all', 'world');
                    });
                } else if ($(this).hasClass('lobby')) {
                    Chat.unregisterChat('all', 'world', function () {
                        Chat.registerChat(gameName, 'lobby');
                    });
                } else {
                    Chat.unregisterChat('all', 'world', function () {
                        Chat.unregisterChat(gameName, 'lobby', function () {
                            Chat.registerChat(gameName, 'room', App.gameData[gameName].roomModel.Name);
                        });
                    });
                }
            }
        });

        $('#chat #popemoticon').click(function () {
            $('#chat .pre-text').hide();
            $('#chat .input-append').hide();
            $('#chat .emoticon').show();
            Chat.initEmoticon();
        });
        
        $('#chat .tab-text').click(function () {
            $('#chat .pre-text').show();
            $('#chat .emoticon').hide();
            $('#chat .input-append').show();
            Chat.initPreTextChat();
        });
        

        Chat.ui.$content.slimScroll({
            width: '100%',
            height: '328px',
            railVisible: false,
            color: '#fff',
            allowPageScroll: false,
            touchScrollStep: 100,
            alwaysVisible: false
        });

        Chat.ui.$chatLobbyContent.slimScroll({
            width: '100%',
            height: '355px',
            railVisible: false,
            color: '#fff',
            allowPageScroll: false,
            touchScrollStep: 100,
            alwaysVisible: false
            
        });
         

       
        //$.support.cors = true;
        

        Chat.initEmoticon();
    };

    Chat.initHub = function () {
        var gameName = Navigator.getLocation(),
			chatUrl = Config.CHAT_SERVER_URL;

        if (!App.chatHub || App.chatHub.hubName !== 'chathub') {
            App.chatHub = new ChatHub(chatUrl);

            App.chatHub.client = {
                listUserOnlines: function (userOnlines) {
                   

                    if (userOnlines) {
                        $.each(userOnlines, function (k, v) {
                            App.chatHub.client.addUserOnline(v);
                        });
                    }
                },

                listLastMessages: function (lastMessages) {
                    Chat.ui.$chatLobbyContent.html('');
                    Chat.ui.$content.html('');

                    if (lastMessages) {
                        $.each(lastMessages, function (k, v) {
                            App.chatHub.client.receiveMessage(v);
                        });
                    }
                },

                addUserOnline: function (chatUser) {
                    if (typeof (chatUser) !== "undefined" && chatUser !== null) {
                        chatUser.AccountID = chatUser.a || chatUser.AccountID;
                        chatUser.NickName = chatUser.n || chatUser.AccountID;

                        addUserOnline(chatUser);
                    }
                },

                removeUserOnline: function (chatUser) {
                    if (typeof (chatUser) !== "undefined" && chatUser !== null) {
                        chatUser.AccountID = chatUser.a || chatUser.AccountID;

                        removeUserOnline(chatUser);
                    }
                },

                receiveMessage: function (chatMessage) {
                    if (typeof (chatMessage) !== "undefined" && chatMessage !== null) {
                        chatMessage.ChannelId = chatMessage.i || chatMessage.ChannelId;
                        chatMessage.AccountID = chatMessage.a || chatMessage.AccountID;
                        chatMessage.NickName = chatMessage.n || chatMessage.AccountID;
                        chatMessage.Content = chatMessage.c || chatMessage.Content;

                        receiveMessage(chatMessage);
                    }
                },

                systemMessage: function (message, type) {
                    if (type == 1) //neu message thong bao user roi lobby khong hien thi
                        return;

                    if (typeof (message) !== "undefined" && message !== null) {
                        var sMessage = $('<p/>');
                        sMessage.addClass('system');
                        sMessage.text(message);
                        Chat.ui.$chatLobbyContent.append(sMessage);

                        sMessage.delay(5000).fadeOut(function () { this.remove(); });

                        var scrollVal = Chat.ui.$chatLobbyContent.prop('scrollHeight') + 'px';
                        Chat.ui.$chatLobbyContent.slimScroll({ scrollTo: scrollVal });
                    }
                },

                notification: function (messages) {
                    if (messages) {
                        var ulContainer = $('#notification_container ul');
                        if (ulContainer.length == 0) {
                            var div = $('<div id="notification_container"></div>');
                            ulContainer = $('<ul></ul>');
                            ulContainer.css('left', 450);
                            div.append(ulContainer);
                            $('#content').append(div);
                        }

                        var ulWidth = 0,
                            ulDuration = 0;

                        $.each(messages, function (i, message) {
                            if (message.Type == 30001) {
                                Util.showMessage(message.Message);
                                return;
                            }

                            var timeOut = 8000,
                                iconClass = '';

                            if (message.Icon == 'taixiu' || message.Icon == 'minipoker')
                                iconClass += " icon-" + message.Icon;

                            var $li = $('<li class="' + iconClass + '"></li>');
                            $li.html(message.Message);
                            ulContainer.append($li);
                            ulDuration += timeOut;
                        });
                        $.each($('#notification_container li'), function () {
                            ulWidth += $(this).outerWidth();
                        });
                        ulContainer.width(ulWidth + 100);
                        ulContainer.animate({ left: (200 - ulWidth) + "px" }, {
                            duration: ulDuration, done: function () {
                                if (ulContainer.width() + parseInt(ulContainer.css('left')) <= 400)
                                    $('#notification_container').remove();
                            }
                        });
                    }
                }
            };

            App.chatHub.connection.stateChanged(function (change) {
                if (change.newState === $.signalR.connectionState.connecting) {
                    Chat.ui.$chatAllInput.attr('placeholder', 'Đang kết nối...');
                    Chat.ui.$chatAllInput.attr('disabled', true);
                }
                else if (change.newState === $.signalR.connectionState.reconnecting) {
                    Chat.ui.$chatAllInput.attr('placeholder', 'Đang kết nối...');
                    Chat.ui.$chatAllInput.attr('disabled', true);
                }
                else if (change.newState === $.signalR.connectionState.connected) {
                    if (App.currentAccount.TotalHely < 500 && App.channel && App.channel.indexOf('room') < 0) {
                        Chat.ui.$chatAllInput.attr('placeholder', 'Tài khoản của bạn quá thấp');
                        Chat.ui.$chatAllInput.attr('disabled', true);
                    } else {
                        Chat.ui.$chatAllInput.attr('placeholder', 'Nhập nội dung chat...');
                        Chat.ui.$chatAllInput.attr('disabled', false);
                    }

                    if (!App.pingChatTimeout) {
                        App.pingChatTimeout = setInterval(function () {
                            try {
                                App.chatHub.server.pingPong();
                            } catch (e) {
                            }
                        }, 60000); //ping 60s
                    }

                    if (App.channel !== '')
                        try {
                            App.chatHub.server.registerChat(App.channel);
                        } catch (e) { }
                }
                else if (change.newState === $.signalR.connectionState.disconnected) {
                    Chat.ui.$chatAllInput.attr('placeholder', 'Đang kết nối...');
                    Chat.ui.$chatAllInput.attr('disabled', true);
                    if (App.pingChatTimeout) {
                        clearInterval(App.pingChatTimeout);
                        delete App.pingChatTimeout;
                    }
                }
            });
        }
    };

    Chat.startHub = function (cb) {
        try {
            App.chatHub.connection.start({ transport: Config.transports, jsonp: Config.CHAT_SERVER_JSONP }).done(cb);
        } catch (e) { }
    };

    Chat.registerChat = function (game, channel, roomId) {
        var chatContent = Chat.ui.$chatLobbyContent,
			chatInput = Chat.ui.$chatLobbyInput;
        if (App.game && App.game.isInit) {
            chatContent = Chat.ui.$content;
            chatInput = Chat.ui.$chatInput;
        }

        if (Modernizr.Detectizr.device.type !== 'mobile')
            chatInput.focus();

        var oldChannel = App.channel;
        App.channel = game + '_' + channel;
        if (roomId)
            App.channel += '_' + roomId;

        if (App.chatHub && App.channel === oldChannel)
            return;

        //Chat.ui.$chatLobbyOnlines.html('Đang tải...');
        //chatContent.html('Đang tải...');
        $('.roomchat li a').removeClass('active');
        $('.roomchat li a.' + channel).addClass('active');

        Chat.initHub();
        function register() {
            try {
                App.chatHub.server.registerChat(App.channel).done(function () {
                    if (App.currentAccount.TotalHely < 10000 && App.channel.indexOf('room') < 0) {
                        Chat.ui.$chatAllInput.attr('placeholder', 'Cần tối thiểu 10.000');
                        Chat.ui.$chatAllInput.attr('disabled', true);
                    } else {
                        Chat.ui.$chatAllInput.attr('placeholder', 'Nhập nội dung chat...');
                        Chat.ui.$chatAllInput.attr('disabled', false);
                    }
                });
            } catch (e) { }
        }
        if (App.chatHub.connection.state === $.signalR.connectionState.connected) {
            register();
        } else {
            Chat.startHub(register);
        }
    }

    Chat.unregisterChat = function(game, channel, callback) {
        if (App.chatHub && App.chatHub.connection && App.chatHub.connection.state == 1) {
            try {
                App.channel = '';
                Chat.ui.$chatAllInput.attr('disabled', true);
                App.chatHub.server.unregisterChat(game + '_' + channel).done(function() {
                    if (typeof callback == 'function')
                        callback();
                });
            } catch(e) {
            }
        } else {
            if (typeof callback == 'function')
                callback();
        }
    };

    Chat.initChatLobby = function() {
        var memList = $('#memlist'),
            chatbox = $('#chatbox'),
            bt_min = $('#bt_min'),
            bt_min2 = $('#bt_min2');

        bt_min.unbind('click');
        bt_min.click(function(e) {
            bt_min.hide();
            memList.css('width', 210);
            memList.animate({ width: '0px' }, 500, function() {
                memList.hide();
            });
            chatbox.animate({ width: '482px' }, 500, function() {
                bt_min2.show();
            });
        });

        bt_min2.unbind('click');
        bt_min2.click(function(e) {
            bt_min2.hide();
            chatbox.css('width', 472);
            chatbox.animate({ width: '255px' }, 500, function() {
            });
            memList.show();
            memList.animate({ width: '220px' }, 500, function() {
                bt_min.show();
            });
        });

        Chat.closeChatInGame();
        Chat.registerChat(Navigator.getLocation(), 'lobby');
    };

    Chat.initChatInGame = function () {
        if (Chat.ui.$chat.is(':visible')) {
            Chat.ui.$chat.fadeOut();
            
            return;
        }
        Chat.ui.$chat.fadeIn();


        Chat.ui.$quickChat.hide();
        //Chat.ui.$chat.show();
        var chatContentHeight = Chat.ui.$content.prop('scrollHeight');
        Chat.ui.$content.animate({ scrollTop: chatContentHeight }, 0);
        Chat.initPreTextChat();
        Chat.restoreChatInGame();
        $('#chat .channel > div').hide();
        $('#chat .channel .world').show();
        var gameName, channelId, roomId;
        if (App.game && App.game.isInit) {
            gameName = Navigator.getLocation();
            channelId = 'room';
            roomId = (App.gameData[gameName] && App.gameData[gameName].roomModel) ? App.gameData[gameName].roomModel.Name : '';
            $('#chat .channel .room').show();
            $('#chat .channel .lobby').show();
        } else if (Navigator.checkInGame() !== 0) {
            gameName = Navigator.getLocation();
            channelId = 'lobby';
            $('#chat .channel .lobby').show();
        } else {
            gameName = 'all';
            channelId = 'world';
        }
        Chat.registerChat(gameName, channelId, roomId);
    };

    Chat.closeChatInGame = function () {
        Chat.ui.$chatInput.blur();
        Chat.ui.$chat.hide();
    };
    
    Chat.minChatInGame = function() {
        Chat.ui.$chat.css('height', '0');
        $('#chat .channel').hide();
        $('#chat .input-append').hide();
        eventValue = 'MinimizeChat-Button';
    };
    Chat.restoreChatInGame = function() {
        Chat.ui.$chat.css('height', '');
        $('#chat .channel').show();
        $('#chat .input-append').show();
        eventValue = 'RestoreChat-Button';
    };
 

    //Load pre-chat text
    Chat.initPreTextChat = function() {
        Chat.ui.$preText.show();
        Chat.ui.$preEmoticon.hide();

        var resourceId = Navigator.getLocation() + 'preChatText';
        if (!App.gameResources.loader.getItem(resourceId)) {
            App.gameResources.onExit = function() {
                bindPreTextChat(resourceId);
            };
            App.gameResources.enter([{ id: resourceId, src: '//static.hely.club/Content/templates/' + Navigator.getLocation() + '/chat/preChatText.html' + preloaderVer }], false);
        } else {
            bindPreTextChat(resourceId);
        }
    };
    Chat.initEmoticon = function () {
        Chat.ui.$preEmoticon.show();
        Chat.ui.$preText.hide();
        if (Chat.ui.$preEmoticon[0].childNodes.length > 0)
            return;

        var chatRes = window['SHARE_RESOURCES'].Chat;
        App.chatResources.onExit = function () {
            bindPreEmoticon(chatRes);
        };
        App.chatResources.enter(chatRes);
    };

    function bindPreTextChat(resourceId) {
        Chat.ui.$preText.html(App.getResourceItem(resourceId).replace('', ''));
        $('.pre-text li').click(function (e) {
            Chat.ui.$chatInput.val($(this).text());
            Chat.ui.$chat.hide();
            var gameName = Navigator.getLocation();
            App.channel = gameName + '_room_' + App.gameData[gameName].roomModel.Name;
            sendMessage(Chat);
        });
    }
    function bindPreEmoticon(chatRes) {
        for (var i = 0, length = chatRes.length; i < length; i++) {
            var li = document.createElement('li'),
				img = App.chatResources.getResult(chatRes[i].id);

            img.alt = chatRes[i].id;
            li.appendChild(img);
            $(img).click(function (e) {
                var gameHub = App.gameHub[Navigator.getLocation()];
                gameHub.server.sendMessage('"__' + e.target.alt);
                Chat.ui.$chat.hide();
            });

            Chat.ui.$preEmoticon.append(li);
        }
    }
    function bindingPlayerName(accountId, playerName) {
        var pName = $('<span data-type="player" data-value="' + accountId + '">' + playerName + '</span>');
        return pName;
    }
    function bindingRoomName(roomData) {
        var pRoom = $('<span class="line1 room" data-type="room">' + roomData.Name + '</span>');
        pRoom.data('value', roomData);
       

        return pRoom;
    }
 
    function send(msg, channel) {
        try {
            App.chatHub.server.sendMessage(msg, channel).done(function (success) {
                afterSendMessage(success);
            });
        } catch (e) { }
    }
    function afterSendMessage(success) {
        if (success) {
            Chat.ui.$chatInput.val('');
            Chat.ui.$chatLobbyInput.val('');
        }
    }
    function sendMessage(that) {
        var msg = Chat.ui.$chatInput.val() || Chat.ui.$chatLobbyInput.val(),
			gameName = Navigator.getLocation();
        if (msg && msg != '' && msg.length <= 512) {
            if (App.channel && App.channel.indexOf('room') > -1) {
                var gameHub = App.gameHub[gameName];

                if (gameHub && gameHub.server && gameHub.connection.state === 1)
                    gameHub.server.sendMessage(msg);
            }

            if (App.game && App.game.isInit) {
                var data = App.gameData[gameName].roomModel;
               
            }

            if (App.chatHub && App.chatHub.connection && (App.chatHub.connection.state === $.signalR.connectionState.connected)) {
                send(msg, App.channel);
            } else {
                that.initHub();
                that.startHub(function () {
                    try {
                        App.chatHub.server.registerChat(App.channel).done(function () {
                            send(msg, App.channel);
                        });
                    } catch (e) { }
                });
            }
        }
    }
    function receiveMessage(chatMessage) {
        if (chatMessage.ChannelId !== App.channel)
            return;

        var roomData;
        if (chatMessage.Content) {
            var a = chatMessage.Content.split('$@ROOMDATA@$');
            chatMessage.Content = a[0];
        }

        var className = chatMessage.AccountID;
        if (chatMessage.AccountID === App.currentAccount.AccountID) {
            className += ' current';
        }
       

        if (typeof (chatMessage.NickName) !== "undefined" && chatMessage.NickName !== null && chatMessage.NickName !== '') {
            var pEle = $('<p class="' + className + '"></p>');
            var pName = bindingPlayerName(chatMessage.AccountID, chatMessage.NickName);
            pEle.append(pName);

           
            var message = (chatMessage.v >= 4) ? $('<label/>').html(chatMessage.Content) : $('<label/>').text(chatMessage.Content);
            pEle.append(': ');
            pEle.append(message);
            message.emotions();

            Chat.ui.$chatLobbyContent.append(pEle);
            Chat.ui.$chatLobbyContent.slimScroll({ scrollTo: Chat.ui.$chatLobbyContent.prop('scrollHeight') + 'px', color: '#fff' });
            Chat.ui.$content.append(pEle.clone(true));
            Chat.ui.$content.slimScroll({ scrollTo: Chat.ui.$content.prop('scrollHeight') + 'px' });
        }
    }

    function addUserOnline(chatUser) {
        var className = 'user user_' + chatUser.AccountID;
        if (chatUser.AccountID === App.currentAccount.AccountID) {
            chatUser.NickName = App.currentAccount.UserName;
            className += ' current';
        }

        if (typeof (chatUser.NickName) !== "undefined" && chatUser.NickName !== null && chatUser.NickName !== '') {
            $('.user_' + chatUser.AccountID).remove();
             
        }
    }
    function removeUserOnline(chatUser) {
        $('.user_' + chatUser.AccountID).remove();
    }

    window.Chat = Chat;
})(window, jQuery);