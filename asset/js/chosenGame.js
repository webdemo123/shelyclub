 
(function (k) {
    var ChosenGame =new  function () {
       
    };
    
    ChosenGame.Init = function() {
        ChosenGame.render();
        $('.allgames').click(function () {
            $('.boxgame-nav a').removeClass('active');
            $(this).addClass('active');
            ChosenGame.render();
        }
		);
        $('.mygames').click(function () {
            $('.boxgame-nav a').removeClass('active');
            $(this).addClass('active');
            ChosenGame.render('mygame');
        }
		);
        $('.cardgames').click(function () {
            $('.boxgame-nav a').removeClass('active');
            $(this).addClass('active');
            ChosenGame.render('cardgame');
        });

        $('.slotgames').click(function () {
            $('.boxgame-nav a').removeClass('active');
            $(this).addClass('active');
            ChosenGame.render('slotgame');
        });

        $('.liveGame').click(function () {
            $('.boxgame-nav a').removeClass('active');
            $(this).addClass('active');
            ChosenGame.render('liveGame');
        });
    }
    ChosenGame.render = function (c) {
        var d = '<ul class="blockitem">';
        var e = Config.GAME;
        ChosenGame.current = c;
        if (c == 'mygame') {
            if (App.currentAccount && App.currentAccount.AccountID > 0) {
                var f = localStorage.getItem('mygame.' + App.currentAccount.AccountID);
                if (f) {
                    e = JSON.parse(f);
                }
                else {
                    $('#chosenGame .boxlist-game').html('<p>Không có thông tin trò chơi yêu thích của bạn</p>');
                    return;
                }
            }
            else {
                $('#chosenGame .boxlist-game').html('<p>Bạn cần đăng nhập để chơi game</p>');
                return;
            }
        }
        for (var i in e) {
            var g = Config.GAME[i];
            if (!g) continue;
            if (c && (c !== 'mygame' && g.cssClass && g.cssClass.indexOf(c) < 0)) continue;
          
            d += '<li class="' + g.cssClass + '">';
            if (g.tagClass) d += '<i class="' + g.tagClass + '"></i>';
            d += '<a href="' + g.url + '" data-game="' + i + '" title="' + g.name + '"';
            if (g.target) d += ' target="' + g.target + '"';
            d += '><img src="' + g.image + '" alt="' + g.name + '" width="165" height="165" /></a></li>';
        }
        d += '</ul>';
        $('#chosenGame .boxlist-game').html(d);
        $('#chosenGame .boxlist-game .blockitem').slick(
			{
			    dots: true, infinite: true, speed: 500, slidesToShow: 5, slidesToScroll: 5, rows: 2, swipe:true

			}
		);
        $('#chosenGame .boxlist-game a').click(function (e) {
            
            if (App.currentAccount && App.currentAccount.AccountID > 0) {
                var a = $(this).data('game');
                var b = localStorage.getItem('mygame.' + App.currentAccount.AccountID);
                if (b) b = JSON.parse(b);
                else
                    b =
                    {
					
                    };
                if (!b[a])
                    b[a] =
                    {
                        count: 0
                    };
                b[a].count++;
                localStorage.setItem('mygame.' + App.currentAccount.AccountID, JSON.stringify(b));
            } else {
                var targetObj = e.currentTarget;
                if (targetObj.target == '') {
                    //Util.showMessage("Bạn cần đăng nhập để chơi game", {
                    //    onOK: function () {
                    //        $('#btn_login').click();
                    //    }
                    //});
                }
                 
            }
        });

        var w = $("#chosenGame .boxlist-game .slick-track").width();
        if (w === 0) {
            console.log('chosenGame .boxlist-game .slick-track:=0');
            $("#chosenGame .boxlist-game .blockitem").slick("refresh");
        }

    };
    k.ChosenGame = ChosenGame;
})(window);