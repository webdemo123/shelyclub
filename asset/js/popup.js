(function (scope, $) {
    var Util = function (opts) {
    };
    Util.$ = $;

    var $popup = $('.popup'), $popupContent = $('.popup .modal-dialog'), $bgOverlay = $('.bgOverlay');
    Util.showMessage = function (msg, options) {

        if (!options) options = {};
        if (options.css == undefined) options.css = 'normal-pop';
        if (typeof options.done == 'undefined') options.done = true;
        if (typeof options.title == 'undefined') options.title = 'Thông báo';
        if (typeof options.doneText == 'undefined') options.doneText = 'Đồng ý';
        if (typeof options.cancelText == 'undefined') options.cancelText = 'Hủy';
         
        $popupContent.removeClass('medium-pop');
        $popupContent.removeClass('normal-pop');
        $popupContent.removeClass('large-pop');
        $popupContent.removeClass('mediup-pop');
        $popupContent.removeClass('gifcode-pop');
        $popupContent.removeClass('app-pop');
       
        var contentdialog = $('<div class="pad_dialog"></div>');
        $popupContent.html(contentdialog);
        $popupContent.css('height', '');

        var tiledialog = $('<div class="tabhead">' + options.title + '</div>');
        contentdialog.append(tiledialog);

        var closepoup = $('<a href="javascript:;" class="btn-close">&nbsp;</a>');
        contentdialog.append(closepoup);
        contentdialog.append('<div class="modal-body"></div>');

        var f = $('.modal-body', contentdialog);
        var g = $('<p>' + msg + '</p>');
        f.append(g);

        var $done, $cancel;
        
        if (options.done) {
            $done = $('<a href="javascript:;" class="btn-def">' + options.doneText + '</a>');
            f.append($done);
            if (options.doneCss) $done.addClass(options.doneCss);
            $done.click(function() {
              
                 
                if (options.hideDone) {
                    Util.hideMessage();
                    if (typeof options.onOK == 'function') {
                        options.onOK();
                    }
                } else {
                    if (typeof options.onOK == 'function') {
                        options.onOK();
                    }
                    Util.hideMessage();
                }


            });
        }

        if (options.cancel) {
            $cancel = $('<a href="javascript:;" class="btn-def">' + options.cancelText + '</a>');
            f.append($cancel);
            if (options.cancelCss) $cancel.addClass(options.cancelCss);
            $cancel.click(function() {
                closepoup.click();
            });

        }

        closepoup.click(function () {
            Util.hideMessage();
            if (typeof options.onCancel == 'function') {
                options.onCancel();
            }
        });

        if (options.css) {
            $popupContent.addClass(options.css);
        }
        if (this.timeout) {
            clearTimeout(this.timeout);
            delete this.timeout;
        }

        if (options.timeout && options.timeout > 0) {
            if (options.cancel && $cancel) {
                this.timeout = setTimeout(function () { $cancel.click() }, options.timeout * 1000);
            }
            else if (options.done && $done) {
                this.timeout = setTimeout(function () { $done.click() }, options.timeout * 1000);
            }
            else {
                this.timeout = setTimeout(function () { Util.hideMessage() }, options.timeout * 1000);
            }
        }

        if (typeof options.bg != 'undefined' && !options.bg) {
            $bgOverlay.hide();
        } else {
            $bgOverlay.show();
        }
        $popup.fadeIn("slow");
        if (typeof options.onRender == 'function') {
            options.onRender();
        }
    }
    Util.hideMessage = function () {
        $popup.hide();
        $bgOverlay.hide();
        $popupContent.addClass('modal-dialog');
        if (this.timeout) {
            clearTimeout(this.timeout);
            delete this.timeout;
        }
        Util.ClosePopup();
    };
    Util.ClosePopup=function()
    {
        $('.modal-dialog').removeAttr('style');
        $('.modal-dialog').removeClass('normal-pop');
        $('.modal-dialog').removeClass('large-pop');
        $('.modal-dialog').removeClass('Xlarge-pop');
        $('.modal-dialog').removeClass('mediup-pop');
        $('.modal-dialog').removeClass('medium-pop');
        $('.modal-dialog').removeClass('gifcode-pop');
        $('.modal-dialog').removeClass('app-pop');
        $('.popup,.bgOverlay').hide();
        $('.modal-dialog').empty();
       
    };
    // Check ky tu dien vao
    Util.checkInputOnlyNumber = function (obj, event) {
        var whichCode = event.keyCode ? event.keyCode : event.which ? event.which : event.charCode;// ? event.which : whichCode;
        // Allow: backspace, delete, tab, escape, and enter
        if (whichCode == 8 || whichCode == 9 || whichCode == 27 || whichCode == 13 ||
            // Allow: Ctrl+A
            (whichCode == 65 && event.ctrlKey === true) ||
            // Allow: home, end, left, right
            (whichCode >= 35 && whichCode < 39)) {
            // let it happen, don't do anything
            return true;
        }
        else {
            // Ensure that it is a number and stop the keypress
            if (!event.shiftKey && whichCode >= 48 && whichCode <= 57) {
                return true;
            }

            //Ký tự #
            if (event.shiftKey && whichCode == 51)
                return false;

            //event.preventDefault();
            return false;
        }
    }

   

    Util.Cookie = function () { };

    Util.Cookie.createCookie = function (name, value, days) {
        if (days) {
            var date = new Date();
            date.setTime(date.getTime() + (days * 24 * 60 * 60 * 1000));
            var expires = "; expires=" + date.toGMTString();
        } else var expires = "";
        document.cookie = escape(name) + "=" + escape(value) + expires + "; path=/";
    }

    Util.Cookie.readCookie = function (name) {
        var nameEQ = escape(name) + "=";
        var ca = document.cookie.split(';');
        for (var i = 0; i < ca.length; i++) {
            var c = ca[i];
            while (c.charAt(0) == ' ') c = c.substring(1, c.length);
            if (c.indexOf(nameEQ) == 0) return unescape(c.substring(nameEQ.length, c.length));
        }
        return null;
    }

    Util.Cookie.eraseCookie = function (name) {
        createCookie(name, "", -1);
    }

    Util.parseMoney = function (money) {
        if (money == undefined) return '';
        var strMoney = money.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".")
        return strMoney;
    };

    Util.ConvertNumber = function (num, rank) {
        num = (num / rank).toFixed(2);
        num = num.replace('.00', '');
        for (var i = 0; i < 9; i++)
            num = num.replace('.' + (i + 1) + '0', '.' + (i + 1));
        return num;
    };
    Util.FormatNumber = function (num) {

        if (num >= 1000000000) {
            return this.ConvertNumber(num, 1000000000) + 'G';
        }
        if (num >= 1000000) {
            return this.ConvertNumber(num, 1000000) + 'M';
        }
        if (num >= 1000) {
            return this.ConvertNumber(num, 1000) + 'K';
        }
        return num;
    };
    Util.unParseMoney = function (money) {
        if (money == null || money === undefined) return 0;
        while (money.indexOf('.') >= 0) {
            money = money.replace('.', '');
        }
        var b = parseInt(money);
        return b;
    };

    Util.moneyHelper = function (money) {
        if (money == undefined || money == null) return 0;
        var m = parseFloat(money)
        if (m < 1000)
            return m;
        else if (m < 1000000) {
            if (m % 1000 > 0)
                return parseFloat(m / 1000).toFixed(1) + "K";
            else
                return parseFloat(m / 1000) + "K";
        } else if (m < 1000000000) {
            if (m % 1000000 > 10000)
                return (m / 1000000).toFixed(2) + "M";
            else
                return (m / 1000000) + "M";
        } else {
            if (m % 1000000000 > 1000000)
                return (m / 1000000000).toFixed(4) + "B";
            else
                return (m / 1000000000) + "B";
        }
    }

    Util.numberToString = function (number, width) {
        var replacement = '0';
        number = number + '';
        return number.length >= width ? number : new Array(width - number.length + 1).join(replacement) + number;
    }


    Util.getParam = function getParam(name) {
        name = name.replace(/[\[]/, "\\\[").replace(/[\]]/, "\\\]");
        var regexS = "[\\?&]" + name + "=([^&#]*)";
        var regex = new RegExp(regexS);
        var results = regex.exec(window.location.href);
        if (results == null)
            return "";
        else {
            return results[1];
        }
    }


    Util.eventTracking = function (eventCategory, action, label, value, accountName, accountId, amount) {
        //$.ajax({
        //    cache: false,
        //    type: "POST",
        //    contentType: "application/json; charset=utf-8",
        //    data: JSON.stringify(
        //             {
        //                 GACode: '',
        //                 Url: 'atchubai.com',
        //                 category: eventCategory,
        //                 action: action,
        //                 label: label,
        //                 service_id: 880553,
        //                 headers: navigator.userAgent,
        //                 value: value,
        //                 ip: '',
        //                 accountName: accountName,
        //                 accountId: accountId,
        //                 amount: amount,
        //                 cookies: '',
        //                 queueActions: '',
        //                 referUrl: window.location.href.toString(),
        //                 utm_source: Util.getParam("utm_source"),
        //                 utm_medium: Util.getParam("utm_medium"),
        //                 utm_term: Util.getParam("utm_term"),
        //                 utm_content: Util.getParam("utm_content"),
        //                 utm_campaign: Util.getParam("utm_campaign")
        //             }
        //        ),
        //    crossDomain: true,
        //    xhrFields: {
        //        withCredentials: true
        //    },
        //    dataType: "json",
        //    url: 'http://sandbox.vtcgame.vn/tracking/api/Analytics/trackingEventByPost',
        //    success: function (data) {
        //        //console.log('Tracking Success');
        //    },
        //    error: function (err) {
        //        //console.log('Tracking Failure');
        //    }

        //});
    }

    //Gọi khi đăng ký thành công tài khoản
    Util.trackingCPL = function (accountID, accountName) {
        //Kiem tra co phai den tu cplcamp cua moore khong
        var detectCPL = Util.getParam("cplcamp");
        if (detectCPL == "" || detectCPL == null || detectCPL == undefined) {
            return;
        }
        //Tracking đến từ moore
        localStorage.setItem('cplTrack', 'moore');

        $.ajax({
            cache: false,
            type: "POST",
            contentType: "application/json; charset=utf-8",
            data: JSON.stringify({ AccountID: accountID, AccountName: accountName, PartnerID: 1, Url: document.referrer }),
            crossDomain: true,
            xhrFields: {
                withCredentials: true
            },
            dataType: "json",
            url: Config.AUTHEN_URL + '/api/Authen/insertCPLAccount',
            success: function (data) {
            },
            error: function (err) {
            }
        });
    };

    Util.GetData = function (url, param, callBack, failCallback) {
        try {
            $.ajax({
                type: 'GET',
                url: url,
                processData: true,
                data: param,
                contentType: "application/json; charset=utf-8",
                dataType: "json",
                crossDomain: true,
                xhrFields: { withCredentials: true },
                cache: false,
                success: function (data) {
                    if (typeof callBack == 'function')
                        callBack(data);
                },
                error: function (xhr, ajaxOptions, thrownError) {
                    if (xhr.status === 200) {
                        if (typeof callBack == 'function')
                            callBack(xhr.responseText);
                    } else {
                        console.log("Error:", xhr.responseText);
                        if (typeof failCallback == 'function')
                            failCallback(xhr);
                    }
                }
            });
        }
        catch (err) {
            alert(err);
        }
    };
    Util.PostData = function (url, param, callBack, failCallback) {
        try {
            $.ajax({
                type: "POST",
                url: url,
                data: JSON.stringify(param),
                contentType: "application/json; charset=utf-8",
                dataType: "json",
                cache: false,
                crossDomain: true,
                xhrFields: { withCredentials: true },
                success: function (data) {
                    if (typeof callBack == 'function')
                        callBack(data);
                },
                error: function (xhr, ajaxOptions, thrownError) {
                    if (xhr.status === 200) {
                        if (typeof callBack == 'function')
                            callBack(xhr.responseText);
                    } else {
                        console.log("Error:", xhr.responseText);
                        if (typeof failCallback == 'function')
                            failCallback(xhr);
                    }
                }
            });
        }
        catch (err) { alert(err); }
    };

    scope.Util = Util;
})(window, jQuery);