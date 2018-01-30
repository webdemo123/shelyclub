(function (scope, $) {
    var preloaderVer = '';//?v=0.12';
    //Preloader class: loading all resources to cache for using later
    //Contructor: init LoadQueue object and it's plugin 
    function Preloader() {
        var that = this;
        //call preload, and install soundjs as plugin
        this.loader = new createjs.LoadQueue(true);  // taipt: fallback XHR on phonegap
        this.loader.installPlugin(createjs.Sound);
        this.loading = $("#divLoading");


        this.loader.on("complete", that.handleComplete,this);
        this.loader.on("progress", that.handleFileLoad,this);
        
        //define callbacks
        this.loader.onFileLoad = function (loadedFile) {
            that.handleFileLoad(loadedFile);
        };

        this.loader.onComplete = function () {
            that.handleComplete();
        };

        this.loader.onError = function () {
            console.log('Resources had been loadded!');
        };
    }

    Preloader.prototype = {

        enter: function (assetManifest, showLoading) {
            if (!assetManifest)
                return;

            if (assetManifest.length <= 0) {
                //show error
                //console.log('error');
                return;
            }

            if (showLoading) {
                document.body.style.backgroundColor = '#000';
                this.loading.show();
            }

            //load file from manifest
            this.loader.loadManifest(assetManifest);
        },

        exit: function () {
            //hide the loading bar
            
           
            document.body.style.backgroundColor = '';
            this.loading.hide();
          

            if (typeof this.onExit == 'function') {
                this.onExit();
                this.onExit = null;
                delete this.onExit;
            }
        },

        getItem: function (itemId) {
            return this.loader.getItem(itemId);
        },

        getResult: function (itemId) {
            var result = this.loader.getResult(itemId);

            if (!result) {
                var item = this.getItem(itemId);
                if (item && item.type == 'image') {
                    var i = new Image();
                    i.src = item.src;
                    this.loader._loadedResults[itemId] = i;

                    result = i;
                }
            }

            return result;
        },

        //handle file loading and update loading progress bar
        handleFileLoad: function (loadedFile) {
            //update our loading bar
            if (this.loading.displayFlag) {
                var percent = Math.round((this.loader.progress.toFixed(2)) * 100);
                this.loading.content.style.width = percent / 100 * 960 + 'px';
                this.loading.title.innerHTML = percent + '%';
            }
        },

        handleComplete: function () {
            this.exit();
        }
    };

    scope.Preloader = Preloader;
}(window, jQuery));