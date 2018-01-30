var arr = arr = [
     { 'slide': 'bum2.png', 'Banner': '181x357-1.png', 'Api': '', 'ApiLogged': '', 'link': true },
     { 'slide': 'bum1.png', 'Banner': '181x357-1.png', 'Api': '', 'ApiLogged': '', 'link': true },
];

if ($('.banner-event').length > 0) {
    var html = '', cindex = 1;
    $.each(arr, function (j) {
        html += '<a href="javascript:/*helyEvent.Init(' + cindex + ')*/void(0);"><img src="//static.hely.club/Content/img/event/' + this.slide + '" alt="" /></a>';
        cindex++;
    });
    $('.banner-event').html(html);
    $('.banner-event').slick({ dots: false, infinite: true, slidesToShow: 1, arrows: false, slidesToScroll: 1, autoplay: true, autoplaySpeed: 2000, fade: true, });
}

(function (window) {
    var Event = function () {
        this._init();
        frameAction = function (e) {
            if (~e.origin.indexOf(Config.EVENT_URL) || ~e.origin.indexOf(Config.PROFILE_URL)) {
                if (e.data.key == 'close') {
                    Event.closeEventFrame();
                }
                else if (e.data.key == 'onloaded') {
                    $(window).trigger('resize');
                    $('#iframe').show();
                    $('#divLoading').hide();
                }
              
            }
        };
        window.addEventListener('message', frameAction, false);
    };

    Event.prototype._init = function () {
        $(window).bind('loggedIn', function () {
            Event.countEventTurn();
        });
        $(window).bind('loggedOut', function () {
            Event.closeEventFrame();
        }
		);

    };
    Event.openEventFrame = function (b) {
        if (typeof b == 'undefined') b = 'vqmm';
        AccountInfo.checkAuthen(function () {
            var a = Config.EVENT_URL + '/event1/?t=' + (new Date()).getTime();
            if ($('#iframe').length == 0)
                $('.modal-dialog').append('<iframe id="iframe"></iframe>');
            $('#iframe').attr('src', a);

            $('.modal-dialog').removeClass('Xlarge-pop');
            $('.modal-dialog').removeClass('normal-pop');
            $('.modal-dialog').removeClass('large-pop');
            $('.modal-dialog').addClass('Xlarge-pop');
            $('#divLoading,.bgOverlay,.popup').show();
           
        }, function () {
            Util.showMessage("Vui lòng đăng nhập để thực hiện chức năng này !", {
                onOK: function () {
                    $('#btn_login').click();
                }
            }
            );
        });
    };
	 Event.openEventFrameVip = function () {
        AccountInfo.checkAuthen(function () {
            var a = Config.EVENT_VIP_URL + '/event2/?t=' + (new Date()).getTime();
            if ($('#iframe').length == 0)
                $('.modal-dialog').append('<iframe id="iframe"></iframe>');
            $('#iframe').attr('src', a);

            $('.modal-dialog').removeClass('Xlarge-pop');
            $('.modal-dialog').removeClass('normal-pop');
            $('.modal-dialog').removeClass('large-pop');
            $('.modal-dialog').addClass('Xlarge-pop');
            $('#divLoading,.bgOverlay,.popup').show();

        }, function () {
            Util.showMessage("Vui lòng đăng nhập để thực hiện chức năng này !", {
                    onOK: function () {
                        $('#btn_login').click();
                    }
                }
            );
        });
    };
    Event.closeEventFrame = function () {
        $('#iframe').attr('src', '');
        $('#iframe').remove();
        Util.ClosePopup();
    };

    Event.countEventTurn = function () {
        Event.updateCountVqmm();
    };
    Event.updateCountVqmm = function () {
        var b = localStorage.getItem('vqmm_' + App.currentAccount.AccountID);
        var c = (new Date()).toDateString();
        if (!b || b != c) {
            localStorage.setItem('vqmm_' + App.currentAccount.AccountID, c);
            Util.GetData(Config.EVENT_URL + '/event1/api/CircleSpin/Turn_GetAPI', 't=' + (new Date()).getTime(), function (a) {
                if (a > 0) {
                    if (typeof Event[App.currentAccount.AccountID] == 'undefined') Event.openEventFrame();
                    Event[App.currentAccount.AccountID] = Event;
                }
            });
        }
    };

    window.Event = Event;

})(window);


function GetCookie(name) {

    var nameEQ = name + "=";
    var ca = document.cookie.split(';');
    for (var i = 0; i < ca.length; i++) {
        var c = ca[i];
        while (c.charAt(0) === ' ') c = c.substring(1, c.length);
        if (c.indexOf(nameEQ) === 0) return c.substring(nameEQ.length, c.length);
    }
    return null;
};

function SetCookie(name, value, days) {
    if (days) {
        var date = new Date();
        date.setTime(date.getTime() + (days * 24 * 60 * 60 * 1000));
        var expires = "; expires=" + date.toGMTString();
    } else var expires = "";
    document.cookie = name + "=" + value + expires + "; path=/";
};