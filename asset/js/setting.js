(function (window, $) {
    var Setting = function () {
        this._init();
    };

    Setting.ui = {
        $btnSetting: $('#icSetting, #btn-setting'),
        $btnSettingLogout: $('#btnSettingLogout'),
        $btnSettingVibration: $('#btnSettingVibration'),
        $btnSettingSound: $('#btnSettingSound'),
        $btnMenu: $('#btn-menu'),
        $btnMenuArea: $('#btn-menu-area')

    };
    Setting.prototype._init = function () {

        $('#setting').click(function (e) {
            if (e != null && typeof e.stopPropagation == 'function') e.stopPropagation();
            $('.setting-board').addClass('active');
        }
       );


        $(document).click(function (e) {
            if (e.target.id != 'dvheader' && e.target.id != 'btn-menu') {
                $('#dvheader').removeClass('active');
                $('.rightmenu-ingame').removeClass('active');
                $('#btn-menu').removeClass('active');
            }
            $('.setting-board').removeClass('active');

        });
    };

    

    window.Setting = Setting;
})(window, jQuery);