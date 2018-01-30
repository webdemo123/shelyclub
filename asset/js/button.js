(function (window) {
    var Button = function (text, font, color, x, y, width, height, conner) {
        if (typeof text == 'undefined')
            text = '';

        if (typeof font == 'undefined')
            font = '18px';

        if (typeof x == 'undefined')
            x = 0;

        if (typeof y == 'undefined')
            y = 0;

        if (typeof width == 'undefined')
            width = 100;

        if (typeof height == 'undefined')
            height = 20;

        if (typeof conner == 'undefined')
            conner = 0;

        this._init(text, font, color, x, y, width, height, conner);
    }

    Button.prototype = new createjs.Container();

    Button.prototype._init = function (text, font, color, x, y, width, height, conner) {
        this.initialize();

        this.set({ x: x, y: y });

        var bgButton = new createjs.Shape();
        bgButton.graphics.beginFill('#ccc').beginStroke('#f0f0f0').drawRoundRect(0, 0, width, height, conner);
        var textButton = new createjs.Text(text, font, color);
        textButton.set({ textAlign: 'center', lineHeight: height, x: width / 2, y: 5 });

        this.addChild(bgButton, textButton);

        this.addEventListener('mousedown', function (event) {
            event.target.getChildAt(0).shadow = new createjs.Shadow('#fff', 0, 0, 2);

            event.target.addEventListener('pressup', function (ev) {
                ev.target.getChildAt(0).shadow = null;
            });
        });
    };

    window.Button = Button;

    var ImageButton = function(image, x, y, width, height) {
        if (typeof x == 'undefined')
            x = 0;

        if (typeof y == 'undefined')
            y = 0;

        if (typeof width == 'undefined' && image)
            width = image.width;

        if (typeof height == 'undefined' && image)
            height = image.height;

        this._init(image, x, y, width, height);
    };

    ImageButton.prototype = new createjs.Bitmap();

    ImageButton.prototype._init = function (image, x, y, width, height) {
        this.initialize();

        this.set({ image: image, x: x, y: y });
        if(width > 0)
            this.set({ width: width, scaleX: width / image.width });
        if (width > 0)
            this.set({ height: height, scaleY: height / image.height });

        this.addEventListener('mousedown', function (event) {
            event.target.shadow = new createjs.Shadow('#fff', 0, 0, 2);

            event.target.addEventListener('pressup', function (ev) {
                ev.target.shadow = null;
            });
        });
    };

    window.ImageButton = ImageButton;
})(window);