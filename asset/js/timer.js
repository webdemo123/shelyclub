(function (window) {
    var lineWidth =2,
        width = 120 + lineWidth,
        height = 120 + lineWidth,
        cornerRadius = 61,
        horizLineLength = width - cornerRadius * 2,
        vertLineLength = height - cornerRadius * 2;

    var Timer = function () {
        this._init();
    };

    Timer.prototype = {
        position: { x: 0, y: 0 },
        startTime: 0,
        totalTime: 0,
        elapseTime: 0,
        currentTimer: 0,

        delayTime: 100, //delay 100ms

        _init: function () {
             
            this.graPhictime = new createjs.Container();
            this.graphicsObj = new createjs.Shape();
            this.timerPointer = new createjs.Bitmap(App.getResourceItem('lighttime'));
            this.timerPointer.set({ x: width / 2, y: height / 2, regX: cornerRadius - lineWidth, regY: cornerRadius - lineWidth });
            this.graPhictime.addChild(this.graphicsObj, this.timerPointer);
            this.graPhictime.set({ x: 0, y: 2.5 });
        },
        timeChangePoss: function (poss) {
            if (poss == 0) {
                lineWidth = 2,
                width = 140 + lineWidth,
                height = 140 + lineWidth,
                cornerRadius = 71,
                horizLineLength = width - cornerRadius * 2,
                vertLineLength = height - cornerRadius * 2;

            } else {
               lineWidth = 2,
               width = 120 + lineWidth,
               height = 120 + lineWidth,
               cornerRadius = 61,
               horizLineLength = width - cornerRadius * 2,
               vertLineLength = height - cornerRadius * 2;
            }
            this.timerPointer.set({ x: width / 2, y: height / 2, regX: cornerRadius - lineWidth, regY: cornerRadius - lineWidth });
        },
        clearGraphicsObj: function() {
            this.graphicsObj.graphics.c();
            this.timerPointer.visible = false;
        },

        drawPercentRect: function(percent) {
            if (percent <= 0 || percent > 1000 + this.delayTime) {
                return;
            }

            // calc some lengths for use in percent complete
            var offsetX = this.position.x - lineWidth / 2,
                offsetY = this.position.y - lineWidth / 2,
                cornerLength = 2 * cornerRadius * Math.PI / 4,
                totalLength = cornerLength * 4 + horizLineLength * 2 + vertLineLength * 2,
                // calc at what accumulated length each part of the rect starts
                startT = 0,
                startTR = startT + horizLineLength - 1,
                startR = startTR + cornerLength,
                startBR = startR + vertLineLength,
                startB = startBR + cornerLength,
                startBL = startB + horizLineLength,
                startL = startBL + cornerLength,
                startTL = startL + vertLineLength,
                // percent expressed as a length-traveled-along-rect
                accumLength = percent / 1000 * totalLength,
                x1, y1, x2, y2, x, y, start, end;

            //change color line stroke
            var color,
                red = 0,
                green = 225,
                blue = 0,
                alpha = 1;
            if (percent >= 250 && percent < 500) {
                red = Math.round(percent / 5) + 50;
            } else if (percent <= 850) {
                red = Math.round(percent / 5) + 50;
                green = 225 - Math.round((percent - 600) / 2);
            } else if (percent > 850) {
                red = 250;
                green = 0;
                var d = this.totalTime > 10 ? 2 : Math.round((10 - this.totalTime) / 2) + 2;
                alpha = (Math.floor(percent / 15) % d) == 1 ? 1 : 0.5;
            }
            green = green < 0 ? 0 : green;
            color = 'rgba(' + red + ',' + green + ',' + blue + ',' + alpha + ')';
            this.graphicsObj.graphics.c();
            this.graphicsObj.graphics.ss(lineWidth);
            this.graphicsObj.graphics.s(color);

            // top line
            var d = accumLength - startT;
            d = Math.min(d, horizLineLength);
            if (d > 0) {
                x1 = offsetX + cornerRadius;
                y1 = offsetY;
                x2 = offsetX + cornerRadius + d;
                y2 = offsetY;
                this.drawLine(x1, y1, x2, y2);
            }

            // top-right corner
            d = accumLength - startTR;
            d = Math.min(d, cornerLength);
            if (d > 0) {
                x = offsetX + cornerRadius + horizLineLength;
                y = offsetY + cornerRadius;
                start = -Math.PI / 2;
                end = -Math.PI / 2 + (d / cornerLength * Math.PI / 2);
                this.drawCorner(x, y, cornerRadius, start, end);
            }

            // right line
            d = accumLength - startR;
            d = Math.min(d, vertLineLength);
            if (d > 0) {
                x1 = offsetX + cornerRadius + horizLineLength + cornerRadius;
                y1 = offsetY + cornerRadius;
                x2 = offsetX + cornerRadius + horizLineLength + cornerRadius;
                y2 = offsetY + cornerRadius + d;
                this.drawLine(x1, y1, x2, y2);
            }

            // bottom-right corner
            d = accumLength - startBR;
            d = Math.min(d, cornerLength);
            if (d > 0) {
                x = offsetX + cornerRadius + horizLineLength;
                y = offsetY + cornerRadius + vertLineLength;
                start = 0;
                end = (d / cornerLength) * Math.PI / 2;
                this.drawCorner(x, y, cornerRadius, start, end);
            }

            // bottom line
            d = accumLength - startB;
            d = Math.min(d, horizLineLength);
            if (d > 0) {
                x1 = offsetX + cornerRadius + horizLineLength;
                y1 = offsetY + cornerRadius + vertLineLength + cornerRadius;
                x2 = offsetX + cornerRadius + horizLineLength - d;
                y2 = offsetY + cornerRadius + vertLineLength + cornerRadius;
                this.drawLine(x1, y1, x2, y2);
            }

            // bottom-left corner
            d = accumLength - startBL;
            d = Math.min(d, cornerLength);
            if (d > 0) {
                x = offsetX + cornerRadius;
                y = offsetY + cornerRadius + vertLineLength;
                start = Math.PI / 2;
                end = Math.PI / 2 + (d / cornerLength) * Math.PI / 2;
                this.drawCorner(x, y, cornerRadius, start, end);
            }

            // left line
            d = accumLength - startL;
            d = Math.min(d, vertLineLength);
            if (d > 0) {
                x1 = offsetX;
                y1 = offsetY + cornerRadius + vertLineLength;
                x2 = offsetX;
                y2 = offsetY + cornerRadius + vertLineLength - d;
                this.drawLine(x1, y1, x2, y2);
            }

            // top-left corner
            d = accumLength - startTL;
            d = Math.min(d, cornerLength);
            if (d > 0) {
                x = offsetX + cornerRadius;
                y = offsetY + cornerRadius;
                start = Math.PI;
                end = Math.PI + (d / cornerLength) * Math.PI / 2;
                this.drawCorner(x, y, cornerRadius, start, end);
            }
            var e = percent / 1000 * 360;
            if (e > 360) e = 360;
            this.timerPointer.set({ rotation: e + 45 });
        },

        drawLine: function(x1, y1, x2, y2) {
            this.graphicsObj.graphics.mt(x1, y1);
            this.graphicsObj.graphics.lt(x2, y2);
        },

        drawCorner: function(x, y, cornerRadius, start, end) {
            this.graphicsObj.graphics.arc(x, y, cornerRadius, start, end, false);

        },

        //totaltime , elapse, callback
        setCounter: function(totalTime, time, callback) {
            if (typeof totalTime == 'undefined' || totalTime <= 0)
                return;

            if (typeof time == 'undefined' || time < 0 || time > totalTime)
                time = totalTime;

            if (typeof callback == 'function')
                this.callback = callback;

            this.totalTime = totalTime;
            this.elapseTime = time;

            //lay thoi gian moc bat dau timer = thoi gian hien tai theo ms - (tong so giay - so giay con lai) * 1000ms
            this.startTime = (new Date()).getTime() - (totalTime - time) * 1000;
            this.currentTimer = (this.totalTime - time) / this.totalTime;
        },

        //totaltime , elapse, callback
        startTimer: function(totalTime, time, callback) {
            this.clearGraphicsObj();
            this.timerPointer.visible = false;
            createjs.Tween.get(this.timerPointer, { loop: true }).to({ alpha: 0.7 }, 150).to({ alpha: 1 }, 150);
            this.setCounter(totalTime, time, callback);
        },

        tick: function() {
            if (this.currentTimer > 1000 + this.delayTime || this.totalTime <= 0) {
                if (this.callback)
                    this.callback();

                this.clearTimer();
                return;
            }

            this.currentTimer = ((new Date()).getTime() - this.startTime) / this.totalTime;
            this.drawPercentRect(this.currentTimer);
        },

        clearTimer: function() {
            try {
                this.clearGraphicsObj();
                createjs.Tween.removeTweens(this.timerPointer);
                this.totalTime = 0;
                this.elapseTime = 0;
                this.currentTimer = 0;

                if (this.callback) {
                    this.callback = null;
                    delete this.callback;
                }
            } catch(e) {
            }
        },

        setPosition: function(position) {
            this.position.x = position.x;
            this.position.y = position.y + 25;
            this.timerPointer.set({ x: position.x + cornerRadius, y: position.y + 25 + cornerRadius });
        },

        destroy: function() {
            this.clearTimer();
        }
    };

    window.Timer = Timer;
})(window);
