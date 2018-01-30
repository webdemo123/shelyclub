(function (scope) {
    function addHandler(target, eventType, handler) {
        //overwrite the existing function
        if (target.addEventListener) { //DOM2 Events
            addHandler = function (target, eventType, handler) {
                target.addEventListener(eventType, handler, false);
            };
        } else { //IE
            addHandler = function (target, eventType, handler) {
                target.attachEvent("on" + eventType, handler);
            };
        }
        //call the new function
        addHandler(target, eventType, handler);
    }

    function removeHandler(target, eventType, handler) {
        //overwrite the existing function
        if (target.removeEventListener) { //DOM2 Events
            removeHandler = function (target, eventType, handler) {
                target.addEventListener(eventType, handler, false);
            };
        } else { //IE
            removeHandler = function (target, eventType, handler) {
                target.detachEvent("on" + eventType, handler);
            };
        }
        //call the new function
        removeHandler(target, eventType, handler);
    }

    function TabContent() {
        this.tabBarElements = [];
        this.contentElements = [];
        this.selected = -1;
    }

    TabContent.prototype = {
        initialize: function (tabBarID, contentID) {
            this.tabBarElements = this._getChildElements(tabBarID);
            this.contentElements = this._getChildElements(contentID);

            if (this.tabBarElements.length != this.contentElements.length) {
                console.error('Wrong number tab items and content items!');
            }

            //set default selected item is item 0
            this.selected = 0;
            this.tabBarElements[0].className = 'tabBarSelected';
            this.contentElements[0].style.display = 'block';
        },

        addEvent: function (id, context, fn) {
            var that = this;
            if (fn instanceof Function)
                $('#' + id).click(function (e) {
                    fn(e, context);
                    var a = e.target.getAttribute('data-select');
                    if (a && a >= 0 && a < context.tabBarElements.length) {
                        context.changeTab.call(context, context, a);
                        e.preventDefault();
                        e.stopPropagation();
                    }
                    return;
                });
        },

        changeTab: function (context, index) {
            context.tabBarElements[this.selected].className = 'tabBar';
            context.contentElements[this.selected].style.display = 'none';

            context.tabBarElements[index].className = 'tabBarSelected';
            context.contentElements[index].style.display = 'block';

            context.selected = index;
        },

        addItem: function (item) {

        },

        _getChildElements: function (id) {
            var el = document.getElementById(id),
            childElements = [];

            if(el) {
                var ch = el.firstChild;
                if (ch.nodeName == 'DIV')
                    childElements.push(ch);

                do {
                    if (ch.nodeName == 'DIV')
                        childElements.push(ch);
                } while (ch = ch.nextSibling);
            }

            return childElements;
        }
    };

    scope.TabContent = TabContent;


})(window);

