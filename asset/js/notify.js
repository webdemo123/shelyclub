(function (scope) {
    function Notify(timeout) {
        this.notify = document.createElement('DIV');
        this.notify.className = 'notify';
        this.notify.innerHTML = "<div class='notifyTitle'> <p> </p> </div> <div class='notifyContent'>  </div>";
        this.title = {};
        this.notifyTitleWrap = {};
        this.content = this.notify.querySelector('.notifyContent');
        this.parent = document.querySelector('#content');
        this.notifyLinePra = {};
        this.notifyLine = {};
        this.notifyButton = {};
        this.close = {};
        this.displayFlag = false;

        if (timeout && timeout > 0) {
            var that = this;
            var notifiTimeout = setTimeout(function () {
                that.hide();
                clearTimeout(notifiTimeout);
            }, timeout);
        }
    }

    Notify.prototype = {
        addLine: function (content) {
            for (var i = 0, length = content.length; i < length; i++) {
                var line = document.createElement('DIV');
                line.className = 'notifyLine';
                line.innerHTML = content[i].item;

                if (content[i].css != '') {
                    line.style.cssText = content[i].css;
                }

                this.content.appendChild(line);
            }
        },

        set: function (notify, callback) {
            if (notify) {
                if (notify.css) {
                    this.notify.style.cssText = notify.css;
                }

                this.title = this.notify.querySelector('.notifyTitle p');

                if (notify.title)
                    this.title.innerHTML = notify.title;

                if (notify.content instanceof Array)
                    this.addLine(notify.content);

                if (typeof notify.close == 'undefined' || !notify.close)
                    notify.close = 'Đóng';
                var notifyBtn = "<div class='notifyButton'>";
                if (notify.ok) {
                    notifyBtn += "<p class='notifyOK' style='width: 50%; display: inline-block'>" + notify.ok + "</p>";
                    notifyBtn += "<p class='notifyClose' style='width: 50%; display: inline-block'>" + notify.close + "</p>";
                } else {
                    notifyBtn += "<p class='notifyClose'>" + notify.close + "</p>";
                }
                notifyBtn += "</div>";
                this.notify.innerHTML += notifyBtn;

                this.notifyTitleWrap = this.notify.querySelector('.notifyTitle');
                this.notifyButton = this.notify.querySelector('.notifyButton');
                this.close = this.notify.querySelector('.notifyButton .notifyClose');
                this.ok = this.notify.querySelector('.notifyButton .notifyOK');
                this.notifyLinePra = this.content.querySelector('.notifyLine p');
                this.notifyLine = this.content.querySelector('.notifyLine');
                var that = this;

                this.close.onclick = function closeClick() {
                    that.hide();
                };
            } else
                console.error('Notify Error!!!');
        },

        show: function (notify, callback) {
            if (!this.displayFlag) {
                this.displayFlag = true;
                this.parent.appendChild(this.notify);
                this.parent.style.display = 'block';
                this.notify.style.display = 'block';
            }
        },

        hide: function () {
            try {
                if (typeof this.notify !== 'undefined')
                    this.parent.removeChild(this.notify);
                this.close.onclick = {};
                this.title.innerHTML = '';
                this.content.innerHTML = '';
                this.notify.innerHTML = '';
                this.displayFlag = false;
            } catch (e) { }
        }
    };

    scope.Notify = Notify;
})(window);