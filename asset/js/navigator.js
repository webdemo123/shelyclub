window.Navigator = (function (window) {
    var historyHash = [],
        $body = $('body'),
        ui = {
            $lobby: $('#lobby'),
            $game: $('#easelCanvas'),
            $games: $('#chosenGame'),
            $maintain: $('#maintain')
        },
        menu = {
            $header: $('#dvheader'),
            $btnMenu: $('#menuButton, .rightmenu-ingame'),
            $gameButton: $('#gameButton'),
            $infoingame: $('.info-ingame'),
            $footer: $('.footer')
        };

     var INGAME_MENU = ['gameButton', 'btnMenu', 'infoingame'];
     var GAME_LOBBY_MENU = ['header', 'footer'];
     var CHOSENGAME_MENU = ['header', 'footer'];
     var NOTLOGIN_MENU = ['header', 'footer'];
    
    var STATE = {
        NOT_IN_GAME: 0,
        IN_GAME_LOBBY: 1,
        IN_GAME_RANK: 2,
        IN_GAME_HELP: 3,
        IN_GAME_SHOP: 4,
        IN_GAME_EVENT: 5,
        IN_GAME_PLAY: 6
    };

    function _show(hash) {

 
         
        var temp = '$' + hash;
        for (var prop in ui) {
            if (prop!= temp) {
                ui[prop].hide();
                ui[prop].removeClass('active');
            }
        }
        ui[temp].show();
        ui[temp].addClass('active');
        //ui[temp].animate({ left: '0' }, function () { menu['$content'].scrollLeft(0); });
        
        ////hien thi back ground ben trong game
        $body.removeClass();
        if (hash == 'game') {
            $('body').addClass('ingame');
        }
        else {
            $('body').removeClass('ingame');
        }
        if (_getLocation() === 'login' || _getLocation() === 'chosenGame')
            $body.addClass('portal');
        else
            $body.addClass(_getLocation());
    }

  

    function _showMenuItem(menuItems) {
       
        if (menuItems && menuItems instanceof Array) {
            for (var prop in menu)
                menu[prop].hide();
            for (var i = 0, length = menuItems.length; i < length; i++)
                menu['$' + menuItems[i]].show();
        }
        else {
            console.error('menuItems is not a Array!!!');
        }
    }
    function _checkInGamePlay(callback) {
        var lengthHash = historyHash.length,
            lastHash = historyHash[lengthHash - 1],
            gameName = _getLocation(lastHash),
            subLocation = Navigator.getURLParameters(),
            state = _checkInGame(lastHash);

        var mustLeaveGame = false;
        mustLeaveGame = (App.game && App.game.isInit && (App.gameHub[gameName] && App.gameHub[gameName].connection && App.gameHub[gameName].connection.state == 1) && (state == STATE.IN_GAME_PLAY))

        if (mustLeaveGame) {
            var messTimeout;
            if (!(App.gameData[gameName].roomModel.IsPlaying && App.gameData[gameName].Status === Enums.PlayerStatus.INGAME_PLAYER)) {
                messTimeout = setTimeout(function () {
                    clearTimeout(messTimeout);
                    delete messTimeout;
                    Util.showMessage('Bạn đang rời bàn...', { done: false, bg: false, timeout: 10 });
                }, 2000);
            }

            if (subLocation[0] === 'play') {
                App.gameHub[gameName].server.leaveGame().done(function (isLeft) {
                    AccountInfo.checkAuthen(callback);

                    if (messTimeout) {
                        clearTimeout(messTimeout);
                        delete messTimeout;
                    }
                }).fail(App.invokeHubFail);
            }
            else {
                AccountInfo.checkAuthen(callback);
                if (messTimeout) {
                    clearTimeout(messTimeout);
                    delete messTimeout;
                }
            }
        } else {
            AccountInfo.checkAuthen(callback);
        }
    }

    function _checkHash(location) {
        var state = _checkInGame(),
            subHash = _getURLParameters();

        if (state > STATE.NOT_IN_GAME) {
            if (state === STATE.IN_GAME_PLAY) {
                
                var callback = function (gameHub) {
                    if (App.game && App.game.isInit) {
                        _show('game');
                        _showMenuItem(INGAME_MENU);
                        return;
                    }

                    if (!gameHub[location] || !gameHub[location].connection || gameHub[location].connection.state == 4) {
                        App.restartHub(location, callback.call(this, gameHub));
                        return;
                    }

                    function success(roomId, state) {
                        console.log("RoomID", roomId);
                        if (roomId > 0 || roomId < -1000) {
                            _show('game');
                            _showMenuItem(INGAME_MENU);
                        } else {
                            if (state === STATE.IN_GAME_PLAY) {
                                _goto(location + '/lobby');
                            }
                        }
                    }

                    function fail() {
                        //App.invokeHubFail('Loi join phong');
                        _goto(subHash[0] + '/lobby');
                    }

                    if (subHash[3] !== undefined) {
                        subHash[4] = (subHash[4] == undefined || subHash[4] == null) ? false : subHash[4];
                        gameHub[location].server.playNow(subHash[1], subHash[2], subHash[3], subHash[4]).done(function (roomId) {
                            success(roomId, state);
                        }).fail(fail);
                    } else if (subHash[1] !== undefined) {
                        gameHub[location].server.playNow(subHash[1], subHash[2]).done(function (roomId) {
                            success(roomId, state);
                        }).fail(fail);
                    } else {
                        var lobby = new window[location].Lobby();
                        lobby.rebindGameLogic();
                        gameHub[location].server.playNow().done(function (roomId) {
                            $('#chosenGame').hide();
                            $('#chosenGame .button2').hide();
                            success(roomId, state);
                        }).fail(function () {
                            _goto('games');
                        });
                    }
                };
                //App.checkGameConnection(location);

                $body.removeClass();
                $body.addClass(location);

                if (App.checkGameLoader(location)) {
                    var array = window[location.toUpperCase() + '_RESOURCES'].JS;

                    App.gameLoader[location]++;

                    if (!(App.gameEngine[location] instanceof Preloader))
                        App.gameEngine[location] = new window.Preloader();

                    if (!App.gameEngine[location].loader.loaded) {
                        App.loadApp(App.gameEngine[location], array, true, function () {
                            _checkInGamePlay(function () {
                                _showMenuItem(INGAME_MENU);
                                var lobby = new window[location].Lobby();
                                lobby.render(callback);
                            });
                        });
                    } else {
                        _checkInGamePlay(function () {
                            _showMenuItem(INGAME_MENU);
                            var lobby = new window[location].Lobby();
                            lobby.render(callback);
                        });
                    }
                } else {
                    _checkInGamePlay(function () {
                        callback(App.gameHub);
                    });
                }
            } else if (state > STATE.NOT_IN_GAME && state < STATE.IN_GAME_PLAY) {
                function showLobby() {
                    _show(subHash[0]);
                    _showMenuItem(GAME_LOBBY_MENU);
                     
                }

                if (App.checkGameLoader(location)) {
                    AccountInfo.checkAuthen(function () {
                        var array = window[location.toUpperCase() + '_RESOURCES'].JS;

                        App.gameLoader[location]++;

                        if (!(App.gameEngine[location] instanceof Preloader))
                            App.gameEngine[location] = new window.Preloader();

                        if (!App.gameEngine[location].loader.loaded) {
                            App.loadApp(App.gameEngine[location], array, true, function () {
                                showLobby();
                                var lobby = new window[location].Lobby();
                                lobby.render();
                            });
                        } else {
                            _checkInGamePlay(function () {
                                showLobby();
                                var lobby = new window[location].Lobby();
                                lobby.render();
                            });
                        }
                    }, function() {
                        var t = 0;
                        Util.showMessage("Bạn cần đăng nhập để chơi game", {
                            onOK: function () {
                               // $('#btn_login').click();
                            }
                        });
                        Navigator.goto('games');
                    });
                } else {
                    _checkInGamePlay(function () {
                        showLobby()
                        var lobby = new window[location].Lobby();
                        lobby.rebindGameLogic();
                    });
                }
            }
        } else if (location == 'games') {
 
            if (Modernizr.Detectizr.device.type == 'mobile') {
            }

            $('#roomloading').show();
            //App.checkGameConnection('');
            var lengthHash = historyHash.length,
                lastHash = historyHash[lengthHash - 1],
                gameName = _getLocation(lastHash);
            if (gameName && window[gameName]) {
                //exit chat lobby
                if (Chat)
                    Chat.unregisterChat(gameName, 'lobby');
            }

            $('ul.vaoban1').html('');
            $('ul.vaoban2').html('');

            _showMenuItem(NOTLOGIN_MENU);
             
            if (subHash[0] === 'shop') {
                _show('shop');
            } else {
                _show('games');
            }
            if (App.currentAccount && App.currentAccount.AccountID > 0) {
                _showMenuItem(CHOSENGAME_MENU);
                $('#chosenGame .button2').hide();
            } else {
                AccountInfo.checkAuthen(function () {
                    _showMenuItem(CHOSENGAME_MENU);
                    $('#chosenGame .button2').hide();
                });
            }
        } else if (location == 'maintain') {
            App.checkGameConnection('');
            _show('maintain');
            _showMenuItem([]);
        } else if (location == 'login') {
            AccountInfo.checkAuthen(function () {
                _goto('games');
            }, function () {
                $('#btn_login').click();
                
            });
        } else if (location == 'register') {
            AccountInfo.checkAuthen(function () {
                _goto('games');
            }, function () {
                $('#btn_reg').click();
               
            });
        } else {
            _goto('games');
        }
    }

    function _hashChangedEvent() {
        $(window).hashchange(function (e) {
            var location = _getLocation();
            if (location != 'games') {
                
            }

            if (Modernizr.Detectizr.device.type == 'mobile') {
               
            }
            _checkHash(location);
            historyHash.push(window.location.hash);
        });

        $(window).hashchange();
    }

    function _goto(hash) {
        if (hash != 'games') {
        }
        window.location.hash = '#' + hash;
    }

    function _getLocation(hash) {
        if (typeof hash == 'undefined')
            hash = window.location.hash;

        var startIndex = hash.indexOf('#') + 1,
            paramIndex = hash.indexOf("/");
        return paramIndex > 0 ? hash.substring(startIndex, paramIndex) : hash.substring(startIndex);
    }

    function _getURLParameters(hash) {
        if (typeof hash == 'undefined')
            hash = window.location.hash;

        var result = [],
            searchIndex = hash.indexOf("/");

        if (searchIndex == -1) return result;
        var sPageURL = hash.substring(searchIndex + 1);
        var sURLVariables = sPageURL.split('/');
        for (var i = 0; i < sURLVariables.length; i++) {
            var sParameter = sURLVariables[i].split('=');
            result[i] = sParameter[0];
        }
        return result;
    }

    function _refresh() {
        _goto(window.location.hash.substring(1));
    }

    function _getLastHash() {
        var length = historyHash.length,
            mainHash = ['games', 'lobby'];
        if (length > 1) {
            var recentHash = historyHash[length - 1];
            for (var i = length; i--;) {
                if ((historyHash[i] != recentHash) && (historyHash[i] == 'games' || historyHash[i] == 'lobby'))
                    return historyHash[i];
            }
        }

        return 0;
    }

    function _checkInGame(hash) {
        var gameName = _getLocation(hash),
            subHash = _getURLParameters(hash);

        if (Config.GAME[gameName] && subHash) {
            if (subHash[0] && subHash[0] === 'lobby') {
                return STATE.IN_GAME_LOBBY;
            } else if (subHash[0] && subHash[0] === 'rank') {
                return STATE.IN_GAME_RANK;
            } else if (subHash[0] && subHash[0] === 'help') {
                return STATE.IN_GAME_HELP;
            } else if (subHash[0] && subHash[0] === 'shop') {
                return STATE.IN_GAME_SHOP;
            } else if (subHash[0] && subHash[0] === 'event') {
                return STATE.IN_GAME_EVENT;
            } else if (subHash[0] && subHash[0] === 'play') {
                return STATE.IN_GAME_PLAY;
            } else {
                return STATE.NOT_IN_GAME;
            }
        }

        return STATE.NOT_IN_GAME;
    }

    

    return {
        hashChangedEvent: _hashChangedEvent,
        goto: _goto,
        refresh: _refresh,
        getLocation: _getLocation,
        getURLParameters: _getURLParameters,
        getLastHash: _getLastHash,
        checkInGame: _checkInGame,
        showMenuItem: _showMenuItem
    };

})(window);

 
 