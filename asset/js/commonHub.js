(function (scope, $) {
    var commonHub = function (hub) {
        hub.server = {};
        hub.client = {};
        $.extend(hub.server, {
            createRoom: function (minBet, moneyType, rule, password) {
                return hub.invoke.apply(hub, $.merge(["CreateRoom"], $.makeArray(arguments)));
            },

            enterLobby: function () {
                return hub.invoke.apply(hub, $.merge(["EnterLobby"], $.makeArray(arguments)));
            },

            exitLobby: function () {
                return hub.invoke.apply(hub, $.merge(["ExitLobby"], $.makeArray(arguments)));
            },

            joinRoom: function (name, password) {
                return hub.invoke.apply(hub, $.merge(["JoinRoom"], $.makeArray(arguments)));
            },

            leaveGame: function () {
                return hub.invoke.apply(hub, $.merge(["LeaveGame"], $.makeArray(arguments)));
            },

            unregisterLeaveRoom: function () {
                return hub.invoke.apply(hub, $.merge(["UnregisterLeaveRoom"], $.makeArray(arguments)));
            },

            pingPong: function () {
                return hub.invoke.apply(hub, $.merge(["PingPong"], $.makeArray(arguments)));
            },

            playNow: function (minBet, moneyType) {
                return hub.invoke.apply(hub, $.merge(["PlayNow"], $.makeArray(arguments)));
            },

            sendMessage: function (content) {
                return hub.invoke.apply(hub, $.merge(["SendMessage"], $.makeArray(arguments)));
            },
        });

        hub.on('playerJoin', function (player) {
            App.game.playerJoin(player);
        });

        hub.on('playerLeave', function (accountId, reason) {
            App.game.playerLeave(accountId, reason);
        });

        hub.on('updateConnectionStatus', function (accountId, connectionStatus) {
            App.game.updateConnectionStatus(accountId, connectionStatus);
        });

        hub.on('updateSession', function (gameSession) {
            App.game.updateSession(gameSession);
        });

        hub.on('updateAccount', function (account, money) {
            if (account != null) {
                var acc = account;
                if (account.Account)
                    acc = account.Account;
                if (App.game && App.game.isInit) {
                    var current = App.game.getPlayerByAccountId(acc.AccountID).updateAccount(acc, money);
                    if (current != null)
                        current.UpdatePlayer(account, money);
                }

                if (account.AccountID == App.currentAccount.AccountID)
                    AccountInfo.bindAccountInfo(acc);
                
            }
        });

        hub.on('buyManual', function (msg, timeout) {
            if (App.game && App.game.isInit)
                App.game.showStatus(msg, timeout);

            else {
                if (msg.indexOf("hely") > -1 || msg.indexOf("hely") > -1) {
                    Util.showMessage(msg, {
                        done: true,
                        cancel: true,
                        hideDone:true,
                        doneText:'Nạp',
                        onOK: function () {
                            Profile.openProfileFrame('rechargewin');
                        },
                        onCancel: function () {
                            Navigator.goto(Navigator.getLocation() + '/lobby');
                        }
                    });
                }
                else {
                    Util.showMessage(msg, {
                        done: true,
                        cancel: true,
                        hideDone:true,
                        doneText: 'Nạp',
                        onOK: function () {
                            
                            Profile.openProfileFrame('rechargecoin');
                        },
                        onCancel: function () {
                            Navigator.goto(Navigator.getLocation() + '/lobby');
                        }
                    });
                }
            }
        });

        hub.on('message', function (msg, timeout) {
            if (App.game && App.game.isInit)
                App.game.showStatus(msg, timeout);
            else
                Util.showMessage(msg, { timeout: timeout });
        });

        hub.on('error', function (msg, remain, timeout) {
            Util.showMessage(msg, { timeout: timeout });
            if (remain == 1) {
                Navigator.goto('maintain');
                App.game.stopHub('maintain');
            }
        });

        hub.on('playerMessage', function (msg, timeout) {
            try {
                if (typeof timeout == 'undefined')
                    timeout = 3000;
                var playerCanvas = App.game.getCurrentPlayer();
                playerCanvas.updateStatus(msg, timeout);
            } catch (e) { }

        });

        hub.on('stopHub', function (reason) {
            App.game.stopHub(reason);
        });

        hub.on('forceLogout', function (reason) {
            AccountInfo.logoutReason = reason;
            AccountInfo.logout();
        });

        // chat -> hien thi message
        hub.on('recieveMessage', function (accountId, accountName, message) {
            try {
                var playerCanvas = App.game.getPlayerByAccountId(accountId);
                if (playerCanvas)
                    playerCanvas.showMessage(message);
                //if (App.chatHub && App.chatHub.client)
                //    App.chatHub.client.receiveMessage({ a: accountId, n: accountName, c: message });
            } catch (e) { }
        });

        hub.on('showCCU', function (vip, normal, total) {
            App.game.showCCU(vip, normal, total);
        });

        hub.on('notifyEvent', function (notifyData) {
            if (App.gameHub[Navigator.getLocation()].connection.state == 1) {
                
            }
        });

        hub.on('connected', function () { });

        hub.on('disconnected', function () { });
    };

    scope.commonHub = commonHub;
})(window, $);