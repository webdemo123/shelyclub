(function (window, $) {
    var Profile = function () { this._init(); };
    var frameAction = function (e) {
        if (~e.origin.indexOf(Config.PROFILE_URL)) {
            if (e.data.key == 'close') {
                    Profile.closeProfileFrame();
            } else if (e.data.key == 'onloaded') {
                $(window).trigger('resize');
                $('#iframe').show();
                $('#divLoading').hide();
            } 
        }
    };
    Profile.prototype._init = function () {
        window.addEventListener('message', frameAction, false);
    };
    Profile.openProfileFrame = function (f, g) {
        
        Util.ClosePopup();
        AccountInfo.checkAuthen(function () {
            if (typeof f == 'undefined') f = '';



            var e = Config.PROFILE_URL + '/profile/';
            e += '?t=' + (new Date()).getTime();
            e += '#' + f;
            if ($('#iframe').length == 0) $('.modal-dialog').append('<iframe id="iframe"></iframe>');
            $('#iframe').attr('src', e);
            
            $('#divLoading').show();
            $('.bgOverlay').show();
            $('.popup').show();
        }, function () {
           
            Util.showMessage("Vui lòng đăng nhập để thực hiện chức năng này !", {
                onOK: function () {
                    $('#btn_login').click();
                }
            });
        });
    };
    Profile.closeProfileFrame = function () {
      
        Util.ClosePopup();
    };
 
    Profile.showProfileInfo = function (a) {
        if (a && a.AccountID > 0 && a.AccountID != App.currentAccount.AccountID) {
            //Profile.openProfileFrame('friend', a.AccountID);
        } else {
            Profile.openProfileFrame('profile');
            
        }

       
    };
    window.Profile = Profile;
})(window, jQuery);