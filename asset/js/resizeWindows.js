(function (window) {
    var tt = {},
        bt = { width: 1170, height: 690, canvasWidth:980,canvasHeight:660,minScale: 0.3, maxScale: 1};
    tt.wrap = $('.container #wrap');
    tt.canvas = $('canvas');
    tt.content = $('.resizeable');   
    tt.containerOver = $('.container #overlay');
    tt.containerMini = $('#ag');
     
    window.onResize = function () {
        var e = window.innerWidth || document.body.clientWidth || document.documentElement.clientWidth, t = window.innerHeight || document.body.clientHeight || document.documentElement.clientHeight;
        var n = bt.width, r = bt.height;
        var xt = Math.min(e / n, t / r);
        xt = Math.max(xt, bt.minScale);
        xt = Math.min(xt, bt.maxScale);


        
        window.currentZoom = xt; // for tuch event

        //tt.container.css("background-size", (xt * 1600 ) + 'px ' + (xt * 960) + 'px');
        tt.wrap.css('width', (xt * n) + 'px');
        tt.wrap.css('height', (xt * r) + 'px');

        if (void 0 === tt.content[0].style.zoom || navigator.userAgent.match(/(msie|opera|iphone|ipod|ipad|android)/gi)) {
            var o = "translate(-50%, -50%) scale(" + xt + ") translate(50%, 50%)";

            tt.content.css("-webkit-transform", o);
            tt.content.css("-moz-transform", o);
            tt.content.css("-o-transform", o);
            tt.content.css("-ms-transform", o);
            tt.content.css("transform", o);


         
            tt.containerOver.css("-webkit-transform", o);
            tt.containerOver.css("-moz-transform", o);
            tt.containerOver.css("-o-transform", o);
            tt.containerOver.css("-ms-transform", o);
            tt.containerOver.css("transform", o);
           
            

        } else {
            tt.content.css("zoom", xt);
            tt.containerOver.css("zoom", xt);
            
          
        }

        if (tt.canvas) {
            try {

                

                tt.canvas.css('width', xt * 1200);
                tt.canvas.css('height', xt * 675);
                tt.canvas.css('background-size', xt *1078 + 'px ' + xt * 497 + 'px');
                $('#canvasWrap').css('width', xt * 1200);
                $('#canvasWrap').css('height', xt * 675);
                $('.parentCanvas').css('width', xt * 1200);
                $('.parentCanvas').css('height', xt * 675);
                 
            } catch(e) {
                console.log("Resize error!", e);
            }
        }
        var c = $('#iframe');
        if (c.length > 0) {
            c[0].contentWindow.postMessage({ key: 'resize', zoom: xt, type: "zoom" }, '*');
        }
    };

    $(document).ready(function () {
            $(window).resize(onResize);
            $(window).trigger('resize');
    });
})(this);

 

 
 