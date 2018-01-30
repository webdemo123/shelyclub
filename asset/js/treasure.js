(function (window, $) {
    var treasure = function () {
        this._init();
    };
    treasure.prototype.OldValueObject =
    {
        1: [],
        2: [],
        3: []
    };

    treasure.prototype.OldValue = [];
    treasure.prototype._init = function () {
        var b = this;
        $(window).bind('loggedIn',
            function() {
                if ($('.divTreasure').html().length == 0) {
                    $('.divTreasure').setTemplateURL(Config.STATIC_URL + "templates/treasure/treasure.html");
                    $('.divTreasure').processTemplate();
                    $('.menutab-treasure a').unbind('click');
                    $('.menutab-treasure a').bind('click',
                        function() {
                            clearTimeout(b.TreasureTimer);
                            $('.menutab-treasure a').removeClass('active');
                            $(this).addClass('active');
                            var a = parseInt($(this).data('value'));
                            b.GetListJackPot(true, a);
                            $('.list-treasure').addClass('active');
                        });
                }
                if ($.fn.draggable) $('.divTreasure').draggable();
                $('.divTreasure').fadeIn();
                $('#treasurebox').unbind('click').click(function (e) {
                    e.stopPropagation();
                    $('.list-treasure').toggleClass('active');
                    if (b.JackpotLoaded == undefined) b.GetListJackPot(true, 3);
                });
            }
        );
        $(window).bind('loggedOut',
            function() {
                $('.divTreasure').fadeOut();
            });
    };
    treasure.prototype.GetListJackPot = function (b, c) {
        var d = Config.JackpotURL+'/api/JackPot/ListGameJackpotInfo';
        var e = this;
        e.OldValue = e.OldValueObject[parseInt(c)];
        this.JackpotLoaded = true;
        Util.PostData(d,{ RoomID: c },function(a) {
                e.OldValueObject[parseInt(c)] = a;
                e.binderJackPot(b, a);
                e.TreasureTimer = setTimeout(function() {
                    e.GetListJackPot(false, c);
                },1000 * 5);
                },function(a) {
                console.log(a);
            });
    };
    treasure.prototype.binderJackPot = function (e, f) {
        if (e) {
            $(".blockgame-treasure").setTemplateURL(Config.STATIC_URL + "templates/treasure/list-jackpot.html");
            $(".blockgame-treasure").processTemplate(f);
            //$('.blockgame-treasure').perfectScrollbar();
        }
        var g, roomid, target, that = this;
        var h = 0;
        var i = false,
            useEasing = true,
            useGrouping = true,
            options =
            {
                useEasing: useEasing,
                useGrouping: useGrouping,
                separator: '.',
                decimal: '.',
            };
        $.each(f,function(a, b) {
                g = this.GameID;
                target = 'span' + g;
                if (that.OldValue != null && that.OldValue.length > 0)
                    h = that.OldValue.find(function(v) {return v.GameID == g;}).JackpotFund;
                var c = b.JackpotFund;
                var d = new XCountUp.Init(target, h, c, 0, 5, options);
            d.start();
        });
    };
    window.Treasure = treasure;
})(window, jQuery);

$(document).ready(function() {
        var treasure = new Treasure();
    }
);
var XCountUp=new function()
{
    this.Init= function(f, g, h, j, k, l) {
        this.options = l ||
        {
            useEasing: true,
            useGrouping: true,
            separator: '.',
            decimal: '.'
        };
        var m = 0;
        var n = ['webkit', 'moz', 'ms'];
        for (var x = 0;
            x < n.length && !window.requestAnimationFrame;
            ++x) {
            window.requestAnimationFrame = window[n[x] + 'RequestAnimationFrame'];
            window.cancelAnimationFrame = window[n[x] + 'CancelAnimationFrame'] ||
                window[n[x] + 'CancelRequestAnimationFrame']
        }
        if (!window.requestAnimationFrame) {
            window.requestAnimationFrame = function(a, b) {
                var c = new Date().getTime();
                var d = Math.max(0, 16 - (c - m));
                var e = window.setTimeout(function() {
                        a(c + d)
                    },d);
                m = c + d;
                return e;
            }
        }
        if (!window.cancelAnimationFrame) {
            window.cancelAnimationFrame = function(a) {
                clearTimeout(a);
            }
        }
        var o = this;
        this.d = (typeof f === 'string') ? document.getElementById(f) : f;
        this.startVal = Number(g);
        this.endVal = Number(h);
        this.countDown = (this.startVal > this.endVal) ? true : false;
        this.startTime = null;
        this.timestamp = null;
        this.remaining = null;
        this.frameVal = this.startVal;
        this.rAF = null;
        this.decimals = Math.max(0, j || 0);
        this.dec = Math.pow(10, this.decimals);
        this.duration = k * 1000 || 2000;
        this.easeOutExpo = function(t, b, c, d) {
            return c * (-Math.pow(2, -10 * t / d) + 1) * 1024 / 1023 + b
        };
        this.count = function(a) {
            if (o.startTime === null) o.startTime = a;
            o.timestamp = a;
            var b = a - o.startTime;
            o.remaining = o.duration - b;
            if (o.options.useEasing) {
                if (o.countDown) {
                    var i = o.easeOutExpo(b, 0, o.startVal - o.endVal, o.duration);
                    o.frameVal = o.startVal - i
                } else {
                    o.frameVal = o.easeOutExpo(b, o.startVal, o.endVal - o.startVal, o.duration)
                }
            } else {
                if (o.countDown) {
                    var i = (o.startVal - o.endVal) * (b / o.duration);
                    o.frameVal = o.startVal - i
                } else {
                    o.frameVal = o.startVal + (o.endVal - o.startVal) * (b / o.duration)
                }
            }
            o.frameVal = Math.round(o.frameVal * o.dec) / o.dec;
            if (o.countDown) {
                o.frameVal = (o.frameVal < o.endVal) ? o.endVal : o.frameVal
            } else {
                o.frameVal = (o.frameVal > o.endVal) ? o.endVal : o.frameVal
            }
            o.d.innerHTML = o.formatNumber(o.frameVal.toFixed(o.decimals));
            if (b < o.duration) {
                o.rAF = requestAnimationFrame(o.count);
            } else {
                if (o.callback != null) o.callback()
            }
        };
        this.start = function(a) {
            o.callback = a;
            if (!isNaN(o.endVal) && !isNaN(o.startVal)) {
                o.rAF = requestAnimationFrame(o.count)
            } else {
                o.d.innerHTML = '--';
            }
            return false
        };
        this.stop = function() {
            cancelAnimationFrame(o.rAF)
        };
        this.reset = function() {
            o.startTime = null;
            cancelAnimationFrame(o.rAF);
            o.d.innerHTML = o.formatNumber(o.startVal.toFixed(o.decimals))
        };
        this.resume = function() {
            o.startTime = null;
            o.duration = o.remaining;
            o.startVal = o.frameVal;
            requestAnimationFrame(o.count);
        };
        this.formatNumber = function(a) {
            a += '';
            var x, x1, x2, rgx;
            x = a.split('.');
            x1 = x[0];
            x2 = x.length > 1 ? o.options.decimal + x[1] : '';
            rgx = /(\d+)(\d{3})/;
            if (o.options.useGrouping) {
                while (rgx.test(x1)) {
                    x1 = x1.replace(rgx, '$1' + o.options.separator + '$2');
                }
            }
            return x1 + x2;
        };
        o.d.innerHTML = o.formatNumber(o.startVal.toFixed(o.decimals));
    }
};
