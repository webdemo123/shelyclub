(function (window) {
    var Lobby = function() {
        this.initilize();
    };

    Lobby.prototype.initilize = function () {
        var that = this,
            loca = Navigator.getLocation();

        this.$el = $('#lobby');
        $('#gameTitle').html(Config.GAME[loca].name);
        
        $('#btnGameVip').unbind('click');
        $('#btnGameNormal').unbind('click');

        $('#btnGameVip').click(function () {
            $('#btnGameVip').addClass('active');
            $('#btnGameNormal').removeClass('active');
            $('.vaoban1').show();
            $('.vaoban2').hide();

        });
        $('#btnGameNormal').click(function () {
            $('#btnGameVip').removeClass('active');
            $('#btnGameNormal').addClass('active');
            $('.vaoban1').hide();
            $('.vaoban2').show();
        });

        $('.back-lobby').unbind('click');
        $('.back-lobby').click(function () {
            App.back();
            var w = $("#chosenGame .boxlist-game .slick-track").width();
            if (w === 0) {
                console.log('chosenGame .boxlist-game .slick-track:=0');
                $("#chosenGame .boxlist-game .blockitem").slick("refresh");
            }
        });

        $('#btn-back').unbind('click');
        $('#btn-back').click(function (a) {
            a.preventDefault();
            a.stopPropagation();
            App.back();

        });

        $('#btn-menu').unbind('click');
        $('#btn-menu').click(function (a) {
            a.stopPropagation();
            if (!$(this).hasClass('active')) {
                $(this).addClass('active');
                $('#dvheader').show();
                $('#dvheader').addClass('active');
                 
                $('.rightmenu-ingame').addClass('active');
            }
            else {
                $(this).removeClass('active');
                $('#dvheader').removeClass('active');
                $('.rightmenu-ingame').removeClass('active');
            }
        });

        $('.ranking-game').unbind('click');
        $('.ranking-game').click(function () {
            Lobby.loadLeaderBoard(Config.GAME[loca].id, $('#btnGameVip').hasClass('active') ? Enums.MoneyType.STAR : Enums.MoneyType.COIN);
        });
        $('.guide-game').unbind('click');
        $('.guide-game').click(function () {
            guide.ShowGuide(loca);
        });

    };

    Lobby.prototype.enterLobby = function () {
        $('#roomloading').show();
        
         
    };
    Lobby.loadLeaderBoard = function (gameId,roomType) {
        var apiUrl = Config.GIFTCODE_URL + '/api/Profile/GetLeaderBoard?gameId=' + gameId + '&roomType=' + roomType;
        Util.GetData(apiUrl, null, function (data) {
            $(".modal-dialog").setTemplateURL(Config.STATIC_URL + "templates/leaderBoard/ranking.html" + preloaderVer);
            $(".modal-dialog").setParam('gameid', gameId);
            $(".modal-dialog").setParam('roomType', roomType);
            $(".modal-dialog").processTemplate(data);
            $('.modal-dialog').addClass('large-pop');
            $('.modal-dialog').removeClass('normal-pop');
            $('.popup,.bgOverlay').show();
            return;
        }, function (a) {
        });
    };

    Lobby.prototype._renderRoomList = function (list) {
        var resultHtml = '';

        if (!list || list.length == 0) {
            return resultHtml;
        }

        for (var i in list) {
            resultHtml += this._renderRoom(list[i]);
        }

        return resultHtml;
    };

    Lobby.prototype._renderRoom = function (room) {
        var cssClass = (room.CssClass) ? room.CssClass : '';
        var c = Config.STATIC_URL + 'img/cardgames/ic-table2.png';
        if (!(typeof room.Enable == 'undefined' || room.Enable == true)) {
            c = Config.STATIC_URL + 'img/cardgames/ic-table-lock.png';
            cssClass = "disabled";
        }
        var resultHtlm = '<li class="' + cssClass + '" data-item=\'{"minBet": ' + room.MinBet + ', "moneyType": ' + room.MoneyType + '}\'>' + '<div class="blocktable">' + '    <a href="javascript:;" class="imgtable"><img src="' + c + '" alt=""></a>' + '    <div class="info-table2">' + '        <a href="javascript:;">' + '            <p class="table-def"><img src="' + Config.STATIC_URL + 'img/icon/' + (room.MoneyType == 0 ? 'money-2' : 'money-1') + '.png" alt="">' + room.Name + '</p>';

        if (typeof room.Enable == 'undefined' || room.Enable == true) {
            resultHtlm += '            <div class="roomuser-number">' + '                <span><img src="' + Config.STATIC_URL + 'img/icon/ic-user2.png" alt=""></span>' + '  <span><img src="' + Config.STATIC_URL + 'img/icon/ic-user.png" alt=""></span>' + '                <span><img src="' + Config.STATIC_URL + 'img/icon/ic-user.png" alt=""></span>' + '            </div>';
        }
        resultHtlm += '      </a></div></div></li>';

        return resultHtlm;

    };

    Lobby.prototype.getRoomTypeList = function () {
        var roomList = window[(Navigator.getLocation()).toUpperCase() + '_ROOM_TYPES'];

        if (!roomList)
            return;

        $(window).trigger('onLobby');
        if (Navigator.checkInGame() !== 0 && Chat)
            Chat.initChatLobby();
        $('#btnGameVip').click();
        //TODO: get from server
        $('.vaoban1').html(this._renderRoomList(roomList['1']));
        $('.vaoban2').html(this._renderRoomList(roomList['0']));
        $('#roomloading').hide();

        var that = this;
        //bind click
        $('#lobby #listRoomType li:not(.disabled)').unbind('click');
        $('#lobby #listRoomType li:not(.disabled)').click(function (ev) {
            ev.preventDefault();
            ev.stopPropagation();
            that.joinRoom(ev.currentTarget);
        });

     

        
    };
 
    Lobby.prototype.joinRoom = function(item) {
        var data = item.getAttribute('data-item'),
            moneyType = 0,
            minBet = 1000,
            location = Navigator.getLocation();
        if (data)
            try {
                data = JSON.parse(data);
                minBet = data.minBet;
                moneyType = data.moneyType;
                

            } catch(e) {
            }

        var maxBet = moneyType == 1 ? App.currentAccount.Coin : App.currentAccount.TotalHely;

        Navigator.goto(location + '/play' + '/' + minBet + '/' + moneyType);
    };

    Lobby.prototype.loadingAnimation = function () {
    };

    window.Lobby = Lobby;
})(window);