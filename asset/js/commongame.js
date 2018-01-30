
var serverminigameList = ['//minigame.hely.club/minigame/', '//minigame.hely.club/minigame/'];
var serverminigame = serverminigameList[Math.floor(Math.random() * 1) + 0];
var contentMinigameStatic = "//static.hely.club/minigame/";
var commonGame = new function () {
    this.urlRoot  = contentMinigameStatic;
    this.mediaUrl = contentMinigameStatic+"Content/";
    this.urlApi   = serverminigame+"api/luckydice/";
    this.hubName  = "miniGameHub";
    this.hubs = serverminigame;

    this.isBet = true;
    this.typeBet = 1;
    this.cacheData = null;
    this.rowperPage = 10;
    this.gameSession = 0;
    this.typeHis = 4;
    this.playflag = false;
    this.overOrUnder = 0;
    this.gameConnection = null;
    this.gameHub = null;
    this.InitGame = function () {
        if (fileLoaded == false) {
            Init(1);
        }
        else {
            initHub();
        }
        this.playflag = true;
    };

    this.disGame = function () {
        $(".circle").hide();
        this.playflag = false;

        if (commonLuckyDice)
            commonLuckyDice.HideDiceGUI();
        
        if (commonHiLo)
            commonHiLo.hideHiLoGUI();
        
        if (commonMinipoker) {
            commonMinipoker.hideMinipokerGUI();
        }
        
        if (minislotgold) {
            minislotgold.hideGoldGUI();
            minislotgold.GameConnection.Connection.stop();
        }
        stopHub();
    };

    this.loadFile = function (manifest, callback, async) {
        if (typeof async == 'undefined')
            async = false;
        var preload = new createjs.LoadQueue(async);

        preload.on("complete", function() {
            callback();
        });
        
        preload.on("FileLoad", function () {
            var item = event.item;
            var type = item.type;

            if (type == createjs.LoadQueue.CSS) {
                document.head.appendChild(event.result);
            }
        });
        //preload.onComplete = callback;
        //preload.onFileLoad = function handleFileLoad(event) {
        //    var item = event.item;
        //    var type = item.type;

        //    if (type == createjs.LoadQueue.CSS) {
        //        document.head.appendChild(event.result);
        //    }
        //};

        preload.loadManifest(manifest);
        return preload;
    };

    this.showhide = function (type) {
        if (type == 1) {
            if (typeof commonLuckyDice == 'undefined')
                return;

            if ($('#minigamexx').css('display') == 'none') {
                commonLuckyDice.ShowDiceGUI();
                window.localStorage.setItem("showhidetx", "1");
            }
            else {
                commonLuckyDice.HideDiceGUI();
                window.localStorage.setItem("showhidetx", "0");
            }
        } else if (type == 2) {
            if (typeof minislotgold == 'undefined')
                return;
            if ($('#miniSlotgold').css('display') == 'none') {
                minislotgold.showGoldGUI();
            }
            else {
                minislotgold.hideGoldGUI();
            }
        } else if (type == 3) {
            if (typeof commonHiLo == 'undefined')
                return;

            if ($('#HiLo').css('display') == 'none') {
                commonHiLo.showHiLoGUI();
                
            }
            else {
                commonHiLo.hideHiLoGUI();
                
            }
        } else if(type==4) {
            if (typeof commonMinipoker == 'undefined')
                return;

            if ($('#wrap_minipoker').css('display') == 'none') {
                commonMinipoker.showMinipokerGUI();
            }
            else {
                commonMinipoker.hideMinipokerGUI();
            }
        }
    };
    
    this.setActiveTab = function (a) {
        if (a == 1) {
            $("#t2, #t2rank").removeClass("active");
            $("#t1, #t1rank").addClass("active");
            $('.popup-guide').removeClass('popup-money-2');
            $('.popup-guide').addClass('popup-money-1');
        } else {
            $("#t1, #t1rank").removeClass("active");
            $("#t2, #t2rank").addClass("active");
            $('.popup-guide').removeClass('popup-money-1');
            $('.popup-guide').addClass('popup-money-2');
        }
    };
    this.displayCard = function (a) {
        a = "," + a + ",";
        a = a.replace(/ /g, "");
        for (var i = 0; i < 52; i++) {
            if (i < 8) {
                a = a.replace("," + (i) + ",", "," + (i + 2) + "♠,")
            }
            if (i > 12 && i <= 20) {
                a = a.replace("," + (i) + ",", "," + (i - 11) + "♣,")
            }
            if (i > 25 && i <= 33) {
                a = a.replace("," + (i) + ",", "," + (i - 24) + "♦,")
            }
            if (i > 38 && i <= 46) {
                a = a.replace("," + (i) + ",", "," + (i - 37) + "♥,")
            }
            switch (i) {
                case 8:
                    a = a.replace(",8,", ",10♠,");
                case 9:
                    a = a.replace(",9,", ",J♠,");
                case 10:
                    a = a.replace(",10,", ",Q♠,");
                case 11:
                    a = a.replace(",11,", ",K♠,");
                case 12:
                    a = a.replace(",12,", ",A♠,");
                case 21:
                    a = a.replace(",21,", ",10♣,");
                case 22:
                    a = a.replace(",22,", ",J♣,");
                case 23:
                    a = a.replace(",23,", ",Q♣,");
                case 24:
                    a = a.replace(",24,", ",K♣,");
                case 25:
                    a = a.replace(",25,", ",A♣,");
                case 34:
                    a = a.replace(",34,", ",10♦,");
                case 35:
                    a = a.replace(",35,", ",J♦,");
                case 36:
                    a = a.replace(",36,", ",Q♦,");
                case 37:
                    a = a.replace(",37,", ",K♦,");
                case 38:
                    a = a.replace(",38,", ",A♦,");
                case 47:
                    a = a.replace(",47,", ",10♥,");
                case 48:
                    a = a.replace(",48,", ",J♥,");
                case 49:
                    a = a.replace(",49,", ",Q♥,");
                case 50:
                    a = a.replace(",50,", ",K♥,");
                case 51:
                    a = a.replace(",51,", ",A♥,");
            }
        }
        return a.replace(/,/g, "");
    };
    this.bindPopupContent = function (a, b) {
        $("#Popup_Container").html(a);
        var c = '#scrollidxx';
        if (typeof b != 'undefined' && b.scrollId) c = b.scrollId;
        if ($(c).length > 0 && typeof $(c).slimScroll == 'function') {
            if (typeof b == 'undefined') b = { height: '340px' };
            $.extend(b, { color: '#fff', });
            $(c).slimScroll(b);
        }
        
         
    };
    
    this.showPopup = function (a) {
        if ($("#Popup_Container").css('display') == 'block')
            return;
        if ($("#Popup_Container").length <= 0) {
            var b = '<div id="Popup_Container"></div>' + '<div onclick="commonGame.closePopupParent();" id="overlayxx" class="overlay"></div>';
            $('#ag').append(b);
            $("#Popup_Container").draggable({ scroll: false });
        }
        var c = '<div class="spinner"">' + '<div class="bounce1"></div>' + '<div class="bounce2"></div>' + '<div class="bounce3"></div>' + '<div class="bounce4"></div>' + '<div class="bounce5"></div>' + '</div>';
        $('#Popup_Container').html(c);
        $('#Popup_Container').slideToggle();
        $('#overlayxx').show();
    };

    this.closePopupParent = function () {
        $('#Popup_Container').css('height', '');
        $('#Popup_Container').slideToggle();
        $('#overlayxx').hide();
        this.cacheData = null;

    };
    this.setPopup = function (width, height) {
        $('#popup_nd').css('width', width);
        $('#popup_nd').css('height', height);
        var leftOffset = ($(window).width() - width) / 2;
        var topOffset = ($(window).height() - height) / 2 + $(window).scrollTop();
        $('#Popup_Container').css('left', "-790px");
        $('#Popup_Container').css('z-index', 1300);
        $('#Popup_Container').css("top", "71px");

        $('#Popup_Container').css('position', 'absolute');
        $('#overlayxx').css('height', $(document).height());
        $('#overlayxx').show();
    };

    this.formatTime = function(inputTime) {
        var secNumb = parseInt(inputTime);
        var hours = Math.floor((secNumb) / 3600);
        var minutes = Math.floor((secNumb - hours * 3600) / 60);
        var seconds = secNumb - (minutes * 60);

        if (hours < 10)
            hours = "0" + hours;

        if (minutes < 10)
            minutes = "0" + minutes;

        if (seconds < 10)
            seconds = "0" + seconds;
        return minutes + ':' + seconds;
    };
    this.FormatNumber = function (p_sStringNumber) {
        p_sStringNumber += '';
        x = p_sStringNumber.split(',');
        x1 = x[0];
        x2 = x.length > 1 ? ',' + x[1] : '';
        var rgx = /(\d+)(\d{3})/;
        while (rgx.test(x1))
            x1 = x1.replace(rgx, '$1' + '.' + '$2');

        return x1 + x2;
    };
	
	this.FormatNumberTaiXiu = function (p_sStringNumber) {
        p_sStringNumber += '';
        x = p_sStringNumber.split(',');
        x1 = x[0];

        return this.FormatNumber(parseInt(x1/1000)) + ' K';
    };
	this.FormatNumberThatTruyen = function (p_sStringNumber) {
	    p_sStringNumber += '';
	    x = p_sStringNumber.split(',');
	    x1 = x[0];

	    return this.FormatNumber(x1 / 1000) + 'K';
	};
    this.formDateTimehms = function (date) {
        date = date.replace(/\-/g, '\/').replace(/[T|Z]/g, ' ');
        if (date.indexOf('.') > 0)
            date = date.substring(0, date.indexOf('.'));
        var d = new Date(date);
        var curr_date = d.getDate();
        var curr_month = d.getMonth() + 1;
        var curr_year = d.getFullYear();
        var _hour = d.getHours();
        var _minute = d.getMinutes();
        var _second = d.getSeconds();
        if (curr_date < 10) curr_date = "0" + curr_date;
        if (curr_month < 10) curr_month = "0" + curr_month;
        if (_hour < 10) _hour = "0" + _hour;
        if (_minute < 10) _minute = "0" + _minute;
        return curr_date + "/" + curr_month
            + "/" + curr_year + " " + _hour + ":" + _minute;
    };
    this.formDateTimehmsType = function (a, b) {
        if (typeof b == 'undefined') b = 0;
        var d = a;
        if (typeof a == 'string') {
            a = a.replace(/\-/g, '\/').replace(/[T|Z]/g, ' ');
            if (a.indexOf('.') > 0) a = a.substring(0, a.indexOf('.'));
            d = new Date(a)
        }
        var c = d.getDate();
        var e = d.getMonth() + 1;
        var f = d.getFullYear();
        var g = d.getHours();
        var h = d.getMinutes();
        var i = d.getSeconds();
        if (c < 10) c = "0" + c;
        if (e < 10) e = "0" + e;
        if (g < 10) g = "0" + g;
        if (h < 10) h = "0" + h;
        if (i < 10) i = "0" + i;
        if (b == 2) {
            return g + ":" + h + ":" + i
        }
        else if (b == 1) {
            return c + "/" + e + "/" + f
        }
        else if (b == 3) {
            return f + "/" + e + "/" + c + " " + g + ":" + h + ":" + i
        }
        if (b == 4) {
            return f + "/" + e + "/" + c
        }
        else {
            return c + "/" + e + "/" + f + " " + g + ":" + h + ":" + i
        }
    };
    var hubStarted = false, fileLoaded = false;
    function Init(type)//1:star, 2: coin
    {
        commonGame.typeBet = type;
        commonGame.playflag = true;

        var arrJs1 = [{ src: commonGame.urlRoot + 'Scripts/game/minigameHubs.js' }];
        commonGame.loadFile(arrJs1, initHub);

        var arrJs2 = [
            { src: commonGame.urlRoot + 'scripts/jquery-jtemplates.js' },
            { src: commonGame.urlRoot + 'scripts/canvasjs.min.js' },
            { src: commonGame.urlRoot + 'Scripts/luckydice/commonLuckyDice.js?v=1256789' },
            { src: commonGame.urlRoot + 'Scripts/HiLo/HiLo.js?v=1254' },
            { src: commonGame.urlRoot + 'Scripts/pokerslot/commonMinipoker.js?v=1254' },
            { src: commonGame.urlRoot + 'Scripts/slotgold/minislotgold.js?v=1254' },
            { src: commonGame.urlRoot + 'Scripts/pager.js' },
            { src: commonGame.mediaUrl + 'css/style-minigame.css?v=1132', type: createjs.LoadQueue.CSS },
            { src: commonGame.mediaUrl + 'css/Minigame.css?v=12321', type: createjs.LoadQueue.CSS },
            { src: commonGame.mediaUrl + 'css/jquery.mCustomScrollbar.css', type: createjs.LoadQueue.CSS },
            { src: commonGame.mediaUrl + 'css/jquery-ui.css', type: createjs.LoadQueue.CSS }];

        commonGame.loadFile(arrJs2, function () {
            fileLoaded = true;
            bindInterface();
        }); 
    };
    function initHub() {
        commonGame.gameConnection = $.hubConnection(commonGame.hubs);
        
        commonGame.gameHub = commonGame.gameConnection.createHubProxy(commonGame.hubName);
        var miniHub = new MinigameHub(commonGame.gameHub);

        commonGame.gameConnection.stateChanged(function (change) {
            if (change.newState === $.signalR.connectionState.connecting) {
                console.info('minigame connecting');
                //hubStarted = true;
                
            }
            else if (change.newState === $.signalR.connectionState.reconnecting) {
                console.info('minigame reconnecting');
            }
            else if (change.newState === $.signalR.connectionState.connected) {
                console.info('minigame connected');
            }
            else if (change.newState === $.signalR.connectionState.disconnected) {
                console.info('minigame disconnected');
                if (hubStarted && App.currentAccount.AccountID>0)
                    reconnectHub();
            }
        });

        try {
            commonGame.gameConnection.start().done(function () {
                hubStarted = true;
                bindInterface();
            }).fail(function () {
                reconnectHub();
            });
        } catch (e) {
            reconnectHub();
        }
    };
    function stopHub() {
        try {
            commonGame.gameConnection.stop();
            hubStarted = false;
        } catch(e){}
    }

    var disconnectminigame = undefined;
    function reconnectHub() {
        if (typeof disconnectminigame != 'underfined') {
            clearInterval(disconnectminigame);
            delete disconnectminigame;
        }
        disconnectminigame = setInterval(function () {
            if (commonGame.gameConnection.state == $.signalR.connectionState.disconnected) {
                commonGame.gameConnection.start().done(function () {
                    clearInterval(disconnectminigame);
                    delete disconnectminigame;
                });
            }
        }, 5000);
    }

    function bindInterface() {
        if (!hubStarted || !fileLoaded)
            return;

        var html1 = '';
        html1 += '<div class="circle" style="display: block; z-index: 9999;">';
        html1 += '<div class="icon ring">';
        html1 += '<a href="javascript:;"  class="menuItem minipoker" title="Mini Poker" onclick="commonGame.showhide(4)" style="left: 33%;top: 78.8892%;"</a>';
        html1 += '<a href="javascript:;"  class="menuItem vqmm" onclick=" Event.openEventFrame();" title="Vòng quay may mắn" style="left: 85.4976%;top: 36.1884%;"></a>';
        html1 += '<a href="javascript:;"  class="menuItem taixiu event" title="Tài xỉu"  style="left: 16.3109%;top: 40.5%;"  onclick="commonGame.showhide(1)"></a>';
        html1 += '<a href="javascript:;"  class="menuItem highlow event" title="Trên dưới"  style="left: 51%;top: 14.8892%;"  onclick="commonGame.showhide(3)"></a>';
        html1 += '<a href="javascript:;"  class="menuItem kimcuong" title="Kim cương"  onclick="commonGame.showhide(2)"  style="left: 76.5317%;top: 75.9223%;"></a>';
        html1 += '</div>';
        html1 += '<a href="javascript:;" class="center"><span></span></a>';
        html1 += '<div class="notice noticeVqmm" style="display: none;"></div>';
        html1 += '<div class="notice noticeInbox" style="display: none;"></div>';
        html1 += '<div class="notice" id="time" style="display: none; color: rgb(255, 198, 0);"></div>';
        html1 += '<div id="prizeTaixiu"></div>';
        html1 += '</div>';
        var str = '<div id="ag"></div><div id="notifySlot"></div>';

        if ($('.circle').length <= 0)
            $('#wrapGame').append(html1);
        if ($('#ag').length <= 0)
            $('#wrapGame').append(str);
        $(".circle").show();
        $("#ag").show();
        
        $('.circle .center').unbind('click');
        $('.circle .center').click(function (e) {
            e.preventDefault();
            document.querySelector('.circle').classList.toggle('open');
            if (document.querySelector('.circle.open') != null) document.querySelector('.circle.open').style.zIndex = 9999;
        });
        $('.circle').draggable({ scroll: false });
        try {
		     
            commonLuckyDice.Init();
            commonMinipoker.Init();
            commonHiLo.Init();
            minislotgold.Init();
            $(window).trigger('resize');
        }
        catch (err) {
        }
    };
    
};

