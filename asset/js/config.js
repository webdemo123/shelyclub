
var preloaderVer = '?v=1.44389';
var fontFace = 'Roboto-Light',
    fontBlackFace = 'Roboto-Black',
    boldFontFace = 'Roboto-Medium',
    largeFontFace = 'Roboto-Bold';
var fontFace = '"Conv_UTM Swiss Condensed",Sans-Serif',
    boldFontFace = '"Conv_UTM Swiss CondensedBold",Sans-Serif';

var Config = {
    JackpotURL: '//portal.hely.club/jackpot',
    STATIC_URL: '//static.hely.club/Content/',
    enviroment: 'production', //'development, production
    transports: ["webSockets", "longPolling"],
    jsonp: true,
    isPhoneGap: false,
    EVENT_URL: '//event.hely.club',
	EVENT_VIP_URL: '//event.hely.club',
    DOMAIN: '//hely.club/',
    BASE_URL: '//id.hely.club',
    //AUTHEN_URL: '//id.hely.club',
    PROFILE_URL:'//portal.hely.club',
    AVATAR_URL: '/public/img',
    PORTAL_URL: '',
    CHAT_SERVER_URL: '//portal.hely.club/chat/',
    CHAT_SERVER_JSONP: true,
    AVATAR_PROFILE_URL:'//portal.hely.club/profile/images/avatars',
    GIFTCODE_URL: '//hely.club/',
    GAME: {
        'vuongquochely': { id: 201, name: 'Vương quốc hely', host: '', lastActionTimeout: 0, cssClass: 'slotgame', tagClass: 'newtag', url: '//vqh.hely.club', image: '//static.hely.club/Content/img/IconGame/vqhl.png' + preloaderVer, target: 'vuongquochely', },
        'khobau': { id: 203, name: 'Kho báu', host: '', lastActionTimeout: 0, cssClass: 'slotgame', tagClass: '', url: '//kb.hely.club', image: '//static.hely.club/Content/img/IconGame/pharaol.png' + preloaderVer, target: 'khobau' },
        'bacay': { id: 1, name: 'BA CÂY', host: '//cardgame.hely.club/bacay', lastActionTimeout: 0, moneyPlay: [50000, 60000, 70000], listNumberWinInDay: [15, 50, 200], cssClass: 'cardgame', tagClass: 'hottag', url: '#bacay/lobby', image: '//static.hely.club/Content/img/IconGame/3_cay.png', target: '' },
		'vuabongdem': { id: 219, name: 'Vua bóng đêm', host: '', lastActionTimeout: 90000, cssClass: 'slotgame', tagClass: '', url: '//vbd.hely.club/', image: '//static.hely.club/Content/img/IconGame/vbd.png' + preloaderVer, target: 'vuabongdem' },
        'tala': { id: 3, name: 'TÁ LẢ', host: '//cardgame.hely.club/tala', lastActionTimeout: 0, moneyPlay: [50000, 60000, 70000], listNumberWinInDay: [6, 30, 100], cssClass: 'cardgame', tagClass: 'hottag', url: '#tala/lobby', image: '//static.hely.club/Content/img/IconGame/tala.png', target: '' },
        'xito': { id: 5, name: 'XÌ TỐ', host: '//cardgame.hely.club/xito', lastActionTimeout: 90000, moneyPlay: [50000, 60000, 70000], listNumberWinInDay: [6, 30, 100], cssClass: 'cardgame', tagClass: 'hottag', url: '#xito/lobby', image: '//static.hely.club/Content/img/IconGame/xi_to.png', target: '' },
        'tlmn_solo': { id: 33, name: 'TLMN Đếm lá - Solo', host: '//cardgame.hely.club/tlmn-demla-solo', lastActionTimeout: 90000, moneyPlay: [50000, 60000, 70000], listNumberWinInDay: [10, 40, 120], cssClass: 'cardgame', tagClass: 'hottag', url: '#tlmn_solo/lobby', image: '//static.hely.club/Content/img/IconGame/tlmn_solo.png', target: '' },
        'tienlenmiennam': { id: 7, name: 'TLMN Đếm lá', host: '//cardgame.hely.club/tlmn_demla', lastActionTimeout: 90000, moneyPlay: [50000, 60000, 70000], listNumberWinInDay: [10, 40, 120], cssClass: 'cardgame', tagClass: 'hottag', url: '#tienlenmiennam/lobby', image: '//static.hely.club/Content/img/IconGame/tlmn.png', target: '' },
        'maubinh': { id: 9, name: 'MẬU BINH', host: '//cardgame.hely.club/maubinh', lastActionTimeout: 0, moneyPlay: [50000, 60000, 70000], listNumberWinInDay: [10, 40, 120], cssClass: 'cardgame', tagClass: 'hottag', url: '#maubinh/lobby', image: '//static.hely.club/Content/img/IconGame/mau_binh.png', target: '' },
        'poker': { id: 13, name: 'POKER', host: '//cardgame.hely.club/poker', lastActionTimeout: 90000, moneyPlay: [50000, 60000, 70000], listNumberWinInDay: [10, 40, 120], cssClass: 'cardgame', tagClass: 'hottag', url: '#poker/lobby', image: '//static.hely.club/Content/img/IconGame/poker.png', target: '' },
        'loc': { id: 15, name: 'SÂM LỐC', host: '//cardgame.hely.club/samloc', lastActionTimeout: 90000, moneyPlay: [50000, 60000, 70000], listNumberWinInDay: [10, 40, 120], cssClass: 'cardgame', tagClass: 'hottag', url: '#loc/lobby', image: '//static.hely.club/Content/img/IconGame/sam.png', target: '' },
        'loc_solo': { id: 35, name: 'SÂM LỐC _SOLO', host: '//cardgame.hely.club/samloc-solo', lastActionTimeout: 90000, moneyPlay: [50000, 60000, 70000], listNumberWinInDay: [10, 40, 120], cssClass: 'cardgame', tagClass: 'hottag', url: '#loc_solo/lobby', image: '//static.hely.club/Content/img/IconGame/samloc_solo.png', target: '' },
        'lieng': { id: 17, name: 'LIÊNG', host: '//cardgame.hely.club/lieng', lastActionTimeout: 0, moneyPlay: [50000, 60000, 70000], listNumberWinInDay: [10, 40, 120], cssClass: 'cardgame', tagClass: 'hottag', url: '#lieng/lobby', image: '//static.hely.club/Content/img/IconGame/lieng.png', target: '' },
        'xocdia': { id: 25, name: 'XÓC ĐĨA', host: '//cardgame.hely.club/xocdia', lastActionTimeout: 300000, moneyPlay: [50000, 60000, 70000], listNumberWinInDay: [5, 50, 200], cssClass: 'cardgame', tagClass: 'hottag', url: '#xocdia/lobby', image: '//static.hely.club/Content/img/IconGame/xoc.png', target: '' }
         
    },
    STAR_DISCOUNT: 0.00,
    COIN_DISCOUNT: 0.00,
     
};

if (window.location.href.indexOf('file://') >= 0) {
    // Phonegap
    Config.BASE_URL = '',
    Config.PORTAL_URL = '';

    Config.jsonp = false;
    Config.isPhoneGap = true;

    if (window.location.href.indexOf('file:///android_asset/') >= 0) {
        Config.transports = ["longPolling"]; // native app fixed longPolling
    }
}

Modernizr.Detectizr.detect({ detectScreen: true });

//nếu là trình duyệt FF thì bỏ WebSockets và SSE
if (Modernizr.Detectizr.device.browser == 'firefox') {
    Config.transports = ["longPolling"];

    $(document).click(function () {
        if (window.getSelection) {
            var sel = window.getSelection();
            if (sel.rangeCount) {
                sel.removeAllRanges();
            }
        }
    });
} else if (createjs.Sound.BrowserDetect.isAndroid) { //Nêu là Android về longPolling
    Config.isMobile = true;
    Config.transports = ["longPolling"];
}

if (typeof console == 'undefined')
    console = {};
if (Config.enviroment == 'production') {
    console.log = console.info = function () { };
}
var BACAY_ROOM_TYPES = {
    0: [
		{ Name: '1.000', CssClass: 'clearlbor', MinBet: 1000, MoneyType: 0, Enable: false },
        { Name: '2.000', MinBet: 2000, MoneyType: 0, Enable: true },
        { Name: '5K', MinBet: 5000, MoneyType: 0, Enable: true },
        { Name: '10k', CssClass: 'clearrbor', MinBet: 10000, MoneyType: 0, Enable: true },
		{ Name: '20k', CssClass: 'clearlbor', MinBet: 20000, MoneyType: 0, Enable: true },
        { Name: '50k', MinBet: 50000, MoneyType: 0, Enable: true },
        { Name: '100k', MinBet: 100000, MoneyType: 0, Enable: true },
        { Name: '200k', CssClass: 'clearrbor', MinBet: 200000, MoneyType: 0, Enable: true }
        
        
    ],
    1: [
        { Name: '100', CssClass: 'clearlbor', MinBet: 100, MoneyType: 1 },
        { Name: '200', MinBet: 200, MoneyType: 1, Enable: false },
        { Name: '500', MinBet: 500, MoneyType: 1 },
        { Name: '1.000', CssClass: 'clearrbor', MinBet: 1000, MoneyType: 1 },
        { Name: '2.000', CssClass: 'clearrbor', MinBet: 2000, MoneyType: 1 },
        { Name: '5K', MinBet: 5000, MoneyType: 1 },
        { Name: '10K', MinBet: 10000, MoneyType: 1 },
        { Name: '20K', CssClass: 'clearrbor', MinBet: 20000, MoneyType: 1, Enable: false }
        

         
    ]
};

var TALA_ROOM_TYPES = {
    0: [
		{ Name: '1.000', CssClass: 'clearlbor', MinBet: 1000, MoneyType: 0, Enable: true },
        { Name: '2.000', MinBet: 2000, MoneyType: 0, Enable: true },
        { Name: '5K', MinBet: 5000, MoneyType: 0, Enable: true },
        { Name: '10k', CssClass: 'clearrbor', MinBet: 10000, MoneyType: 0, Enable: true },
		{ Name: '20k', CssClass: 'clearlbor', MinBet: 20000, MoneyType: 0, Enable: true },
        { Name: '50k', MinBet: 50000, MoneyType: 0, Enable: true },
        { Name: '100k', MinBet: 100000, MoneyType: 0, Enable: true },
        { Name: '200k', CssClass: 'clearrbor', MinBet: 200000, MoneyType: 0, Enable: false }
		 
    ],
    1: [
        { Name: '100', CssClass: 'clearlbor', MinBet: 100, MoneyType: 1 },
        { Name: '200', MinBet: 200, MoneyType: 1, Enable: true },
        { Name: '500', MinBet: 500, MoneyType: 1, Enable: true },
        { Name: '1.000', CssClass: 'clearrbor', MinBet: 1000, MoneyType: 1 },
        { Name: '2.000', CssClass: 'clearlbor', MinBet: 2000, MoneyType: 1, Enable: false },
        { Name: '5K', MinBet: 5000, MoneyType: 1, Enable: true },
        { Name: '10K', MinBet: 10000, MoneyType: 1, Enable: true },
        { Name: '20K', CssClass: 'clearrbor', MinBet: 20000, MoneyType: 1, Enable: false }
        
    ]
};

var XITO_ROOM_TYPES = {
    0: [
        { Name: '1.000', CssClass: 'clearlbor', MinBet: 1000, MoneyType: 0, Enable: false },
        { Name: '2.000', MinBet: 2000, MoneyType: 0, Enable: true },
        { Name: '5K', MinBet: 5000, MoneyType: 0, Enable: true },
        { Name: '10k', CssClass: 'clearrbor', MinBet: 10000, MoneyType: 0, Enable: true },
        { Name: '20k', CssClass: 'clearlbor', MinBet: 20000, MoneyType: 0, Enable: false },
        { Name: '50k', MinBet: 50000, MoneyType: 0, Enable: true },
        { Name: '100k', MinBet: 100000, MoneyType: 0, Enable: true },
        { Name: '200k', CssClass: 'clearrbor', MinBet: 200000, MoneyType: 0, Enable: false }
    ],
    1: [
        { Name: '100', CssClass: 'clearlbor', MinBet: 100, MoneyType: 1 },
        { Name: '200', MinBet: 200, MoneyType: 1, Enable: true, Enable: false },
        { Name: '500', MinBet: 500, MoneyType: 1 },
        { Name: '1.000', CssClass: 'clearrbor', MinBet: 1000, MoneyType: 1 },
        { Name: '2.000', CssClass: 'clearlbor', MinBet: 2000, MoneyType: 1 , Enable: false},
        { Name: '5K', MinBet: 5000, MoneyType: 1, Enable: false },
        { Name: '10K', MinBet: 10000, MoneyType: 1, Enable: false },
        { Name: '20K', CssClass: 'clearrbor', MinBet: 20000, MoneyType: 1, Enable: false }
    ]
};

var TIENLENMIENNAM_ROOM_TYPES = TLMN_SOLO_ROOM_TYPES = {
    0: [
		{ Name: '1.000', CssClass: 'clearlbor', MinBet: 1000, MoneyType: 0, Enable: false },
        { Name: '2.000', MinBet: 2000, MoneyType: 0, Enable: false },
        { Name: '5K', MinBet: 5000, MoneyType: 0 },
        { Name: '10k', CssClass: 'clearrbor', MinBet: 10000, MoneyType: 0, Enable: true },
		{ Name: '20k', CssClass: 'clearlbor', MinBet: 20000, MoneyType: 0, Enable: true },
        { Name: '50k', MinBet: 50000, MoneyType: 0 },
        { Name: '100k', MinBet: 100000, MoneyType: 0, Enable: true },
        { Name: '200k', CssClass: 'clearrbor', MinBet: 200000, MoneyType: 0, Enable: false }
       
		
    ],
    1: [
        { Name: '100', CssClass: 'clearlbor', MinBet: 100, MoneyType: 1, Enable: false },
        { Name: '200', MinBet: 200, MoneyType: 1, Enable: true },
        { Name: '500', MinBet: 500, MoneyType: 1, Enable: false },
        { Name: '1.000', CssClass: 'clearrbor', MinBet: 1000, MoneyType: 1 },
        { Name: '2.000', CssClass: 'clearlbor', MinBet: 2000, MoneyType: 1 ,Enable: false},
        { Name: '5K', MinBet: 5000, MoneyType: 1,  Enable: false},
        { Name: '10K', MinBet: 10000, MoneyType: 1, Enable: false },
        { Name: '20K', CssClass: 'clearrbor', MinBet: 20000, MoneyType: 1, Enable: false }
        
    ]
};

var TLMN_NHATANTAT_ROOM_TYPES = {
    0: [
		{ Name: '1.000', CssClass: 'clearlbor', MinBet: 1000, MoneyType: 0, Enable: false },
        { Name: '2.000', MinBet: 2000, MoneyType: 0, Enable: false },
        { Name: '5K', MinBet: 5000, MoneyType: 0, Enable: false },
        { Name: '10k', CssClass: 'clearrbor', MinBet: 10000, MoneyType: 0, Enable: true },
		{ Name: '20k', CssClass: 'clearlbor', MinBet: 20000, MoneyType: 0, Enable: false },
        { Name: '50k', MinBet: 50000, MoneyType: 0, Enable: false },
        { Name: '100k', MinBet: 100000, MoneyType: 0, Enable: false },
        { Name: '200k', CssClass: 'clearrbor', MinBet: 200000, MoneyType: 0, Enable: true }
		 
    ],
    1: [
        { Name: '100', CssClass: 'clearlbor', MinBet: 100, MoneyType: 1, Enable: false },
        { Name: '200', MinBet: 200, MoneyType: 1, Enable: true },
        { Name: '500', MinBet: 500, MoneyType: 1 },
        { Name: '1.000', CssClass: 'clearrbor', MinBet: 1000, MoneyType: 1 },
        { Name: '2.000', CssClass: 'clearlbor', MinBet: 2000, MoneyType: 1, Enable: false },
        { Name: '5K', MinBet: 5000, MoneyType: 1 , Enable: false},
        { Name: '10K', MinBet: 10000, MoneyType: 1 , Enable: false},
        { Name: '20K', CssClass: 'clearrbor', MinBet: 20000, MoneyType: 1, Enable: false }
        
    ]
};

var TIENLENMIENBAC_ROOM_TYPES = {
    0: [
		{ Name: '1.000', CssClass: 'clearlbor', MinBet: 1000, MoneyType: 0, Enable: false },
        { Name: '2.000', MinBet: 2000, MoneyType: 0, Enable: false },
        { Name: '5K', MinBet: 5000, MoneyType: 0 },
        { Name: '10k', CssClass: 'clearrbor', MinBet: 10000, MoneyType: 0, Enable: false },
		{ Name: '20k', CssClass: 'clearlbor', MinBet: 20000, MoneyType: 0, Enable: false },
        { Name: '50k', MinBet: 50000, MoneyType: 0 },
        { Name: '100k', MinBet: 100000, MoneyType: 0, Enable: false },
        { Name: '200k', CssClass: 'clearrbor', MinBet: 200000, MoneyType: 0, Enable: false }
		 
    ],
    1: [
        { Name: '100', CssClass: 'clearlbor', MinBet: 100, MoneyType: 1 },
        { Name: '200', MinBet: 200, MoneyType: 1, Enable: false },
        { Name: '500', MinBet: 500, MoneyType: 1, Enable: false },
        { Name: '1.000', CssClass: 'clearrbor', MinBet: 1000, MoneyType: 1 },
        { Name: '2.000', CssClass: 'clearlbor', MinBet: 2000, MoneyType: 1, Enable: false },
        { Name: '5K', MinBet: 5000, MoneyType: 1 },
        { Name: '10K', MinBet: 10000, MoneyType: 1, Enable: false },
        { Name: '20K', CssClass: 'clearrbor', MinBet: 20000, MoneyType: 1, Enable: false } 
    ]
};

var LOC_ROOM_TYPES = LOC_SOLO_ROOM_TYPES = {
    0: [
		{ Name: '1.000', CssClass: 'clearlbor', MinBet: 1000, MoneyType: 0, Enable: false },
        { Name: '2.000', MinBet: 2000, MoneyType: 0, Enable: true },
        { Name: '5K', MinBet: 5000, MoneyType: 0 },
        { Name: '10k', CssClass: 'clearrbor', MinBet: 10000, MoneyType: 0, Enable: true },
		{ Name: '20k', CssClass: 'clearlbor', MinBet: 20000, MoneyType: 0, Enable: false },
        { Name: '50k', MinBet: 50000, MoneyType: 0 },
        { Name: '100k', MinBet: 100000, MoneyType: 0, Enable: true },
        { Name: '200k', CssClass: 'clearrbor', MinBet: 200000, MoneyType: 0, Enable: true } 


    ],
    1: [
        { Name: '100', CssClass: 'clearlbor', MinBet: 100, MoneyType: 1 },
        { Name: '200', MinBet: 200, MoneyType: 1, Enable: false },
        { Name: '500', MinBet: 500, MoneyType: 1 },
        { Name: '1.000', CssClass: 'clearrbor', MinBet: 1000, MoneyType: 1 },
        { Name: '2.000', CssClass: 'clearlbor', MinBet: 2000, MoneyType: 1, Enable: false},
        { Name: '5K', MinBet: 5000, MoneyType: 1 ,Enable: false},
        { Name: '10K', MinBet: 10000, MoneyType: 1, Enable: false },
        { Name: '20K', CssClass: 'clearrbor', MinBet: 20000, MoneyType: 1, Enable: false } 
    ]
};

var MAUBINH_ROOM_TYPES = {
    0: [
		{ Name: '1.000', CssClass: 'clearlbor', MinBet: 1000, MoneyType: 0, Enable: true },
        { Name: '2.000', MinBet: 2000, MoneyType: 0, Enable: true },
        { Name: '5K', MinBet: 5000, MoneyType: 0, Enable: true },
        { Name: '10k', CssClass: 'clearrbor', MinBet: 10000, MoneyType: 0, Enable: true },
		{ Name: '20k', CssClass: 'clearlbor', MinBet: 20000, MoneyType: 0, Enable: false },
        { Name: '50k', MinBet: 50000, MoneyType: 0, Enable: true },
        { Name: '100k', MinBet: 100000, MoneyType: 0, Enable: true },
        { Name: '200k', CssClass: 'clearrbor', MinBet: 200000, MoneyType: 0, Enable: false } 
		
    ],
    1: [
        { Name: '100', CssClass: 'clearlbor', MinBet: 100, MoneyType: 1 },
        { Name: '200', MinBet: 200, MoneyType: 1, Enable: false },
        { Name: '500', MinBet: 500, MoneyType: 1 },
        { Name: '1.000', CssClass: 'clearrbor', MinBet: 1000, MoneyType: 1 },
        { Name: '2.000', CssClass: 'clearlbor', MinBet: 2000, MoneyType: 1, Enable: false },
        { Name: '5K', MinBet: 5000, MoneyType: 1 },
        { Name: '10K', MinBet: 10000, MoneyType: 1, Enable: true },
        { Name: '20K', CssClass: 'clearrbor', MinBet: 20000, MoneyType: 1, Enable: false } 
    ]
};

var POKER_ROOM_TYPES = {
    0: [
		{ Name: '1.000', CssClass: 'clearlbor', MinBet: 1000, MoneyType: 0, Enable: false },
        { Name: '2.000', MinBet: 2000, MoneyType: 0, Enable: true },
        { Name: '5K', MinBet: 5000, MoneyType: 0 },
        { Name: '10k', CssClass: 'clearrbor', MinBet: 10000, MoneyType: 0, Enable: true },
		{ Name: '20k', CssClass: 'clearlbor', MinBet: 20000, MoneyType: 0, Enable: true },
        { Name: '50k', MinBet: 50000, MoneyType: 0 },
        { Name: '100k', MinBet: 100000, MoneyType: 0, Enable: false },
        { Name: '200k', CssClass: 'clearrbor', MinBet: 200000, MoneyType: 0, Enable: false } 
    ],
    1: [
        { Name: '100', CssClass: 'clearlbor', MinBet: 100, MoneyType: 1 },
        { Name: '200', MinBet: 200, MoneyType: 1, Enable: false },
        { Name: '500', MinBet: 500, MoneyType: 1 },
        { Name: '1.000', CssClass: 'clearrbor', MinBet: 1000, MoneyType: 1 },
        { Name: '2.000', CssClass: 'clearlbor', MinBet: 2000, MoneyType: 1, Enable: false },
        { Name: '5K', MinBet: 5000, MoneyType: 1 ,Enable: false },
        { Name: '10K', MinBet: 10000, MoneyType: 1, Enable: false },
        { Name: '20K', CssClass: 'clearrbor', MinBet: 20000, MoneyType: 1, Enable: false } 
    ]
};

var LIENG_ROOM_TYPES = {
    0: [
		{ Name: '1.000', CssClass: 'clearlbor', MinBet: 1000, MoneyType: 0, Enable: false },
        { Name: '2.000', MinBet: 2000, MoneyType: 0, Enable: false },
        { Name: '5K', MinBet: 5000, MoneyType: 0, Enable: true },
        { Name: '10k', CssClass: 'clearrbor', MinBet: 10000, MoneyType: 0, Enable: true },
		{ Name: '20k', CssClass: 'clearlbor', MinBet: 20000, MoneyType: 0, Enable: true },
        { Name: '50k', MinBet: 50000, MoneyType: 0, Enable: true },
        { Name: '100k', MinBet: 100000, MoneyType: 0, Enable: true },
        { Name: '200k', CssClass: 'clearrbor', MinBet: 200000, MoneyType: 0, Enable: false }

    ],
    1: [
        { Name: '100', CssClass: 'clearlbor', MinBet: 100, MoneyType: 1 },
        { Name: '200', MinBet: 200, MoneyType: 1, Enable: false },
        { Name: '500', MinBet: 500, MoneyType: 1 },
        { Name: '1.000', CssClass: 'clearrbor', MinBet: 1000, MoneyType: 1 },
        { Name: '2.000', CssClass: 'clearlbor', MinBet: 2000, MoneyType: 1,Enable: false },
        { Name: '5K', MinBet: 5000, MoneyType: 1 ,Enable: false},
        { Name: '10K', MinBet: 10000, MoneyType: 1 ,Enable: false},
        { Name: '20K', CssClass: 'clearrbor', MinBet: 20000, MoneyType: 1, Enable: false } 
    ]
};

var XOCDIA_ROOM_TYPES = {
    0: [
		{ Name: '1.000', CssClass: 'clearlbor', MinBet: 1000, MoneyType: 0, Enable: true },
        { Name: '2.000', MinBet: 2000, MoneyType: 0, Enable: false },
        { Name: '5K', MinBet: 5000, MoneyType: 0, Enable: true },
        { Name: '10k', CssClass: 'clearrbor', MinBet: 10000, MoneyType: 0, Enable: true },
		{ Name: '20k', CssClass: 'clearlbor', MinBet: 20000, MoneyType: 0, Enable: false },
        { Name: '50k', MinBet: 50000, MoneyType: 0, Enable: true },
        { Name: '100k', MinBet: 100000, MoneyType: 0, Enable: true },
        { Name: '200k', CssClass: 'clearrbor', MinBet: 200000, MoneyType: 0, Enable: false }
    ],
    1: [
        { Name: '100', CssClass: 'clearlbor', MinBet: 100, MoneyType: 1 },
        { Name: '200', MinBet: 200, MoneyType: 1, Enable: false },
        { Name: '500', MinBet: 500, MoneyType: 1 },
        { Name: '1.000', CssClass: 'clearrbor', MinBet: 1000, MoneyType: 1 },
        { Name: '2.000', CssClass: 'clearlbor', MinBet: 2000, MoneyType: 1, Enable: false },
        { Name: '5K', MinBet: 5000, MoneyType: 1, Enable: true },
        { Name: '10K', MinBet: 10000, MoneyType: 1 },
        { Name: '20K', CssClass: 'clearrbor', MinBet: 20000, MoneyType: 1, Enable: false }
    ]
};
 
var SHARE_RESOURCES = {
    Image: [
        // Image loader
        { id: 'bai', src: '//static.hely.club/Content/img/bobai.png' + preloaderVer },
        { id: 'empty_avatar', src: '//static.hely.club/Content/img/empty_avartar.png' + preloaderVer },
        { id: 'none_avatar', src: '//static.hely.club/Content/img/none_avatar.png' + preloaderVer },
        { id: 'private', src: '//static.hely.club/Content/img/locked.png' + preloaderVer },
        { id: 'disconnect', src: '//static.hely.club/Content/img/offline.png' + preloaderVer },
        { id: 'leaving_room', src: '//static.hely.club/Content/img/leave_room.png' + preloaderVer },
        { id: 'lighttime', src: '//static.hely.club/Content/img/light.png' + preloaderVer },
        { id: 'bgstatus', src: '//static.hely.club/Content/img/bgstatus.png' + preloaderVer },
        { id: 'bgAvatar', src: '//static.hely.club/Content/img/bg-avatar.png' + preloaderVer },
        { id: 'common.bgStatus', src: '//static.hely.club/Content/img/big-bg-notify.png' + preloaderVer },
        { id: 'bgChip', src: '//static.hely.club/Content/img/bg-chip.png' + preloaderVer },
        { id: 'chips', src: '//static.hely.club/Content/img/chips.png' + preloaderVer },
        { id: 'result_animation', src: '//static.hely.club/Content/img/bacay/result3cay.png' + preloaderVer },
        { id: 'win_animation', src: '//static.hely.club/Content/img/cardgames/update_gui/effect/win.png' + preloaderVer }
    ],
    Sound: [],
    Chat: [
        { id: 'amazed', src: '//static.hely.club/Content/img/chat/amazed.png' + preloaderVer },
        { id: 'angry', src: '//static.hely.club/Content/img/chat/angry.png' + preloaderVer },
        { id: 'beat_brick', src: '//static.hely.club/Content/img/chat/beat_brick.png' + preloaderVer },
        { id: 'beat_plaster', src: '//static.hely.club/Content/img/chat/beat_plaster.png' + preloaderVer },
        { id: 'beauty', src: '//static.hely.club/Content/img/chat/beauty.png' + preloaderVer },
        { id: 'big_smile', src: '//static.hely.club/Content/img/chat/big_smile.png' + preloaderVer },
        { id: 'burn_joss_stick', src: '//static.hely.club/Content/img/chat/burn_joss_stick.png' + preloaderVer },
        { id: 'canny', src: '//static.hely.club/Content/img/chat/canny.png' + preloaderVer },
        { id: 'choler', src: '//static.hely.club/Content/img/chat/choler.png' + preloaderVer },
        { id: 'cold', src: '//static.hely.club/Content/img/chat/cold.png' + preloaderVer },
        { id: 'cool', src: '//static.hely.club/Content/img/chat/cool.png' + preloaderVer },
        { id: 'cry', src: '//static.hely.club/Content/img/chat/cry.png' + preloaderVer },
        { id: 'doubt', src: '//static.hely.club/Content/img/chat/doubt.png' + preloaderVer },
        { id: 'dribble', src: '//static.hely.club/Content/img/chat/dribble.png' + preloaderVer },
        { id: 'embarrassed', src: '//static.hely.club/Content/img/chat/embarrassed.png' + preloaderVer },
        { id: 'feel_good', src: '//static.hely.club/Content/img/chat/feel_good.png' + preloaderVer },
        { id: 'haha', src: '//static.hely.club/Content/img/chat/haha.png' + preloaderVer },
        { id: 'look_down', src: '//static.hely.club/Content/img/chat/look_down.png' + preloaderVer }
         
         
    ]
};

var BACAY_RESOURCES = {
    Image: [
        // Image loader
        { id: 'betotherconfirmed1', src: '//static.hely.club/Content/img/bacay/bien4.png' + preloaderVer },
        { id: 'betotherconfirmed2', src: '//static.hely.club/Content/img/bacay/bien3.png' + preloaderVer },
        { id: 'betothersend', src: '//static.hely.club/Content/img/bacay/bien1.png' + preloaderVer },
        { id: 'betother', src: '//static.hely.club/Content/img/bacay/bien2.png' + preloaderVer },
        { id: 'betotherconfirm', src: '//static.hely.club/Content/img/bacay/bien0.png' + preloaderVer },

        { id: 'bacay.Result3cay', src: '//static.hely.club/Content/img/bacay/result3cay.png' + preloaderVer },
        { id: 'chuong', src: '//static.hely.club/Content/img/bacay/ic_dealer.png' + preloaderVer },
        { id: 'chick', src: '//static.hely.club/Content/img/bacay/ic_chicken.png' + preloaderVer },
        { id: 'chips', src: '//static.hely.club/Content/img/chips.png' + preloaderVer },
        { id: 'bacay.txtWinAll',src: '//static.hely.club/Content/img/bacay/ca-lang-sang-tien.png' + preloaderVer },
        { id: 'bacay.txtLoseAll', src: '//static.hely.club/Content/img/bacay/phat-luong.png' + preloaderVer },
        { id: 'bacay.lightWinAll', src: '//static.hely.club/Content/img/bacay/light.png' + preloaderVer },
        { id: 'poker.win', src: '//static.hely.club/Content/img/cardgames/update_gui/effect/win.png' + preloaderVer },
        { id: 'poker.bgOrangeEffect', src: '//static.hely.club/Content/img/cardgames/update_gui/effect/bg-orange-effect.png' + preloaderVer },
        { id: 'bacay.bgtxtWinAll', src: '//static.hely.club/Content/img/bacay/bg-ca-lang-sang-tien.png' + preloaderVer },
        { id: 'bacay.light', src: '//static.hely.club/Content/img/bacay/light.png' + preloaderVer }
    ],
    Sound: [],
    JS: [
        { id: 'bacay_css', src: '//static.hely.club/Content/css/bacay.css' + preloaderVer },
        { id: 'bacay', src: '//static.hely.club/Content/js/cardgame/bacay.min.js' + preloaderVer },
       
      
        
    ]
};

var TALA_RESOURCES = {
    Image: [
        // Image loader
       { id: 'hadau_icon', src: '//static.hely.club/Content/img/tala/hadau_icon.png' + preloaderVer },
       { id: 'bacay.Result3cay', src: '//static.hely.club/Content/img/bacay/result3cay.png' + preloaderVer },
       { id: 'poker.win', src: '//static.hely.club/Content/img/cardgames/update_gui/effect/win.png' + preloaderVer },
       { id: 'poker.bgOrangeEffect', src: '//static.hely.club/Content/img/cardgames/update_gui/effect/bg-orange-effect.png' + preloaderVer },
       { id: 'poker.bgMagentaEffect', src: '//static.hely.club/Content/img/cardgames/update_gui/effect/bg-magenta-effect.png' + preloaderVer },
       { id: 'tala.nhi', src: '//static.hely.club/Content/img/tala/nhi.png' + preloaderVer },
       { id: 'tala.ba', src: '//static.hely.club/Content/img/tala/ba.png' + preloaderVer },
       { id: 'tala.bet', src: '//static.hely.club/Content/img/tala/bet.png' + preloaderVer },
       { id: 'tala.mom', src: '//static.hely.club/Content/img/tala/mom.png' + preloaderVer },
       { id: 'tala.biden', src: '//static.hely.club/Content/img/tala/biden.png' + preloaderVer },
       
    ],
    Sound: [],
    JS: [
        { id: 'tala_css', src: '//static.hely.club/Content/css/tala.css' + preloaderVer },
        { id: 'tala', src: '//static.hely.club/Content/js/cardgame/tala.min.js' + preloaderVer },
        
        
    ]
};

var TIENLENMIENNAM_RESOURCES = {
    Image: [

        { id: 'owner_icon', src: '//static.hely.club/Content/img/chuphong.jpg' + preloaderVer },
        { id: 'poker.bgMagentaEffect', src: '//static.hely.club/Content/img/cardgames/update_gui/effect/bg-magenta-effect.png' + preloaderVer },
        { id: 'tlmn.thua', src:'//static.hely.club/Content/img/tienlenmiennam/thua.png' + preloaderVer },
        { id: 'tlmn.ung', src: '//static.hely.club/Content/img/tienlenmiennam/ung.png' + preloaderVer },
        { id: 'tlmn.cong', src: '//static.hely.club/Content/img/tienlenmiennam/cong.png' + preloaderVer },
        { id: 'tlmn.3-doi-thong', src:'//static.hely.club/Content/img/tienlenmiennam/3-doi-thong.png' + preloaderVer },
        { id: 'tlmn.4-doi-thong', src:'//static.hely.club/Content/img/tienlenmiennam/4-doi-thong.png' + preloaderVer },
        { id: 'tlmn.5-doi-thong', src:'//static.hely.club/Content/img/tienlenmiennam/5-doi-thong.png' + preloaderVer },
        { id: 'tlmn.6-doi-thong', src:'//static.hely.club/Content/img/tienlenmiennam/6-doi-thong.png' + preloaderVer },
        { id: 'tlmn.tu-quy', src: '//static.hely.club/Content/img/tienlenmiennam/tu-quy.png' + preloaderVer },
        { id: 'tlmn.toi-trang', src:'//static.hely.club/Content/img/tienlenmiennam/toi-trang.png' + preloaderVer },
        { id: 'poker.win', src: '//static.hely.club/Content/img/cardgames/update_gui/effect/win.png' + preloaderVer },
        { id: 'poker.bgOrangeEffect', src: '//static.hely.club/Content/img/cardgames/update_gui/effect/bg-orange-effect.png' + preloaderVer },
        { id: 'tlmn.bgspec', src: '//static.hely.club/Content/img/tienlenmiennam/bg_spec.png' + preloaderVer },
        { id: 'tlmn.light', src: '//static.hely.club/Content/img/tienlenmiennam/light.png' + preloaderVer },
        { id: 'tlmn.OpticalFlare', src: '//static.hely.club/Content/img/tienlenmiennam/OpticalFlare.png' + preloaderVer },
        { id: 'asset_tlmn', src: '//static.hely.club/Content/img/cardgames/update_gui/effect/win.png' + preloaderVer },

    ],
    Sound: [],
    JS: [
        { id: 'tienlenmiennam_css', src: '//static.hely.club/Content/css/tienlenmiennam.css' + preloaderVer },
        { id: 'tienlenmiennam', src: '//static.hely.club/Content/js/cardgame/tlmn.min.js' + preloaderVer },
        
        
    ]
};

var TLMN_SOLO_RESOURCES = {
    Image: [

        
        { id: 'owner_icon', src: '//static.hely.club/Content/img/chuphong.jpg' + preloaderVer },
        { id: 'poker.bgMagentaEffect', src: '//static.hely.club/Content/img/cardgames/update_gui/effect/bg-magenta-effect.png' + preloaderVer },
        { id: 'tlmn.thua', src: '//static.hely.club/Content/img/tienlenmiennam/thua.png' + preloaderVer },
        { id: 'tlmn.ung', src: '//static.hely.club/Content/img/tienlenmiennam/ung.png' + preloaderVer },
        { id: 'tlmn.cong', src: '//static.hely.club/Content/img/tienlenmiennam/cong.png' + preloaderVer },
        { id: 'tlmn.3-doi-thong', src: '//static.hely.club/Content/img/tienlenmiennam/3-doi-thong.png' + preloaderVer },
        { id: 'tlmn.4-doi-thong', src: '//static.hely.club/Content/img/tienlenmiennam/4-doi-thong.png' + preloaderVer },
        { id: 'tlmn.5-doi-thong', src: '//static.hely.club/Content/img/tienlenmiennam/5-doi-thong.png' + preloaderVer },
        { id: 'tlmn.6-doi-thong', src: '//static.hely.club/Content/img/tienlenmiennam/6-doi-thong.png' + preloaderVer },
        { id: 'tlmn.tu-quy', src: '//static.hely.club/Content/img/tienlenmiennam/tu-quy.png' + preloaderVer },
        { id: 'tlmn.toi-trang', src: '//static.hely.club/Content/img/tienlenmiennam/toi-trang.png' + preloaderVer },
        { id: 'poker.win', src: '//static.hely.club/Content/img/cardgames/update_gui/effect/win.png' + preloaderVer },
        { id: 'poker.bgOrangeEffect', src: '//static.hely.club/Content/img/cardgames/update_gui/effect/bg-orange-effect.png' + preloaderVer },
        { id: 'tlmn.bgspec', src: '//static.hely.club/Content/img/tienlenmiennam/bg_spec.png' + preloaderVer },
        { id: 'tlmn.light', src: '//static.hely.club/Content/img/tienlenmiennam/light.png' + preloaderVer },
        { id: 'tlmn.OpticalFlare', src: '//static.hely.club/Content/img/tienlenmiennam/OpticalFlare.png' + preloaderVer },
        { id: 'asset_tlmn_solo', src: '//static.hely.club/Content/img/cardgames/update_gui/effect/win.png' + preloaderVer }

    ],
    Sound: [],
    JS: [
        { id: 'tlmn_solo.css', src: '//static.hely.club/Content/css/tlmn_solo.css' + preloaderVer },
        { id: 'tlmn_solo', src: '//static.hely.club/Content/js/cardgame/tlmn_solo.min.js' + preloaderVer },
       
        
    ]

};

var LOC_RESOURCES = {
    Image: [
        // Image loader
        { id: 'asset_loc', src: '//static.hely.club/Content/img/cardgames/update_gui/effect/win.png' + preloaderVer },
        { id: 'owner_icon', src: '//static.hely.club/Content/img/chuphong.jpg' + preloaderVer },
        { id: 'samloc.bg-green-effect', src: '//static.hely.club/Content/img/cardgames/update_gui/effect/bg-green-effect.png' + preloaderVer },
        { id: 'samloc.TextBoLuot', src: '//static.hely.club/Content/img/cardgames/update_gui/TextBoLuot.png' + preloaderVer },

        { id: 'poker.bgMagentaEffect', src: '//static.hely.club/Content/img/cardgames/update_gui/effect/bg-magenta-effect.png' + preloaderVer },
        { id: 'tlmn.thua', src: '//static.hely.club/Content/img/tienlenmiennam/thua.png' + preloaderVer },
        { id: 'tlmn.ung', src: '//static.hely.club/Content/img/tienlenmiennam/ung.png' + preloaderVer },
        { id: 'tlmn.cong', src: '//static.hely.club/Content/img/tienlenmiennam/cong.png' + preloaderVer },
        { id: 'tlmn.3-doi-thong', src: '//static.hely.club/Content/img/tienlenmiennam/3-doi-thong.png' + preloaderVer },
        { id: 'tlmn.4-doi-thong', src: '//static.hely.club/Content/img/tienlenmiennam/4-doi-thong.png' + preloaderVer },
        { id: 'tlmn.5-doi-thong', src: '//static.hely.club/Content/img/tienlenmiennam/5-doi-thong.png' + preloaderVer },
        { id: 'tlmn.6-doi-thong', src: '//static.hely.club/Content/img/tienlenmiennam/6-doi-thong.png' + preloaderVer },
        { id: 'tlmn.tu-quy', src: '//static.hely.club/Content/img/tienlenmiennam/tu-quy.png' + preloaderVer },
        { id: 'tlmn.toi-trang', src: '//static.hely.club/Content/img/tienlenmiennam/toi-trang.png' + preloaderVer },
        { id: 'poker.win', src: '//static.hely.club/Content/img/cardgames/update_gui/effect/win.png' + preloaderVer },
        { id: 'poker.bgOrangeEffect', src: '//static.hely.club/Content/img/cardgames/update_gui/effect/bg-orange-effect.png' + preloaderVer },
        { id: 'tlmn.bgspec', src: '//static.hely.club/Content/img/tienlenmiennam/bg_spec.png' + preloaderVer },
        { id: 'tlmn.light', src: '//static.hely.club/Content/img/tienlenmiennam/light.png' + preloaderVer },
        { id: 'tlmn.OpticalFlare', src: '//static.hely.club/Content/img/tienlenmiennam/OpticalFlare.png' + preloaderVer },
        { id: 'samloc.thangSam', src: '//static.hely.club/Content/img/loc/thang-sam.png' + preloaderVer },
        { id: 'samloc.chanSam', src: '//static.hely.club/Content/img/loc/chan-sam.png' + preloaderVer },
        { id: 'samloc.denSam', src: '//static.hely.club/Content/img/loc/den-sam.png' + preloaderVer }

    ],
    Sound: [],
    JS: [
        { id: 'loc.css', src: '//static.hely.club/Content/css/loc.css' + preloaderVer },
        { id: 'loc', src: '//static.hely.club/Content/js/cardgame/loc.min.js' + preloaderVer },
        
    
    ]
};

var LOC_SOLO_RESOURCES = {
    Image: [
        // Image loader
        { id: 'asset_loc_solo', src: '//static.hely.club/Content/img/cardgames/update_gui/effect/win.png' + preloaderVer },
        { id: 'owner_icon', src: '//static.hely.club/Content/img/chuphong.jpg' + preloaderVer },
        { id: 'samloc.bg-green-effect', src: '//static.hely.club/Content/img/cardgames/update_gui/effect/bg-green-effect.png' + preloaderVer },
        { id: 'samloc.TextBoLuot', src: '//static.hely.club/Content/img/cardgames/update_gui/TextBoLuot.png' + preloaderVer },
        { id: 'poker.bgMagentaEffect', src: '//static.hely.club/Content/img/cardgames/update_gui/effect/bg-magenta-effect.png' + preloaderVer },

        { id: 'tlmn.thua', src: '//static.hely.club/Content/img/tienlenmiennam/thua.png' + preloaderVer },
        { id: 'tlmn.ung', src: '//static.hely.club/Content/img/tienlenmiennam/ung.png' + preloaderVer },
        { id: 'tlmn.cong', src: '//static.hely.club/Content/img/tienlenmiennam/cong.png' + preloaderVer },
        { id: 'tlmn.3-doi-thong', src: '//static.hely.club/Content/img/tienlenmiennam/3-doi-thong.png' + preloaderVer },
        { id: 'tlmn.4-doi-thong', src: '//static.hely.club/Content/img/tienlenmiennam/4-doi-thong.png' + preloaderVer },
        { id: 'tlmn.5-doi-thong', src: '//static.hely.club/Content/img/tienlenmiennam/5-doi-thong.png' + preloaderVer },
        { id: 'tlmn.6-doi-thong', src: '//static.hely.club/Content/img/tienlenmiennam/6-doi-thong.png' + preloaderVer },
        { id: 'tlmn.tu-quy', src: '//static.hely.club/Content/img/tienlenmiennam/tu-quy.png' + preloaderVer },
        { id: 'tlmn.toi-trang', src: '//static.hely.club/Content/img/tienlenmiennam/toi-trang.png' + preloaderVer },
        { id: 'poker.win', src: '//static.hely.club/Content/img/cardgames/update_gui/effect/win.png' + preloaderVer },
        { id: 'poker.bgOrangeEffect', src: '//static.hely.club/Content/img/cardgames/update_gui/effect/bg-orange-effect.png' + preloaderVer },
        { id: 'tlmn.bgspec', src: '//static.hely.club/Content/img/tienlenmiennam/bg_spec.png' + preloaderVer },
        { id: 'tlmn.light', src: '//static.hely.club/Content/img/tienlenmiennam/light.png' + preloaderVer },
        { id: 'tlmn.OpticalFlare', src: '//static.hely.club/Content/img/tienlenmiennam/OpticalFlare.png' + preloaderVer },
        { id: 'samloc.thangSam', src: '//static.hely.club/Content/img/loc/thang-sam.png' + preloaderVer },
        { id: 'samloc.chanSam', src: '//static.hely.club/Content/img/loc/chan-sam.png' + preloaderVer },
        { id: 'samloc.denSam', src: '//static.hely.club/Content/img/loc/den-sam.png' + preloaderVer }

    ],
    Sound: [],
    JS: [
        { id: 'loc_solo.css', src: '//static.hely.club/Content/css/loc_solo.css' + preloaderVer },
        { id: 'loc_solo', src: '//static.hely.club/Content/js/cardgame/loc_solo.min.js' + preloaderVer },
        
          
    ] 
};

var MAUBINH_RESOURCES = {
    Image: [
         
        { id: 'owner_icon', src: '//static.hely.club/Content/img/chuphong.jpg' + preloaderVer },
        { id: 'maubinh.xong', src: '//static.hely.club/Content/img/maubinh/xong.png' + preloaderVer },
        { id: 'maubinh.binhlung', src: '//static.hely.club/Content/img/maubinh/binhlung.png' + preloaderVer },
        { id: 'maubinh.maubinh', src: '//static.hely.club/Content/img/maubinh/maubinh.png' + preloaderVer },
        { id: 'maubinh.bgVioletEffect', src: '//static.hely.club/Content/img/cardgames/update_gui/effect/bg-violet-effect.png' + preloaderVer },
        { id: 'maubinh.bgBlueEffect', src: '//static.hely.club/Content/img/cardgames/update_gui/effect/bg-blue-effect.png' + preloaderVer },
        { id: 'maubinh.bgOrangeEffect', src: '//static.hely.club/Content/img/cardgames/update_gui/effect/bg-orange-effect.png' + preloaderVer },
        { id: 'poker.win', src: '//static.hely.club/Content/img/cardgames/update_gui/effect/win.png' + preloaderVer },
        { id: 'poker.bgOrangeEffect', src: '//static.hely.club/Content/img/cardgames/update_gui/effect/bg-orange-effect.png' + preloaderVer },
        { id: 'asset_maubinh', src: '//static.hely.club/Content/img/cardgames/update_gui/effect/win.png' + preloaderVer },
    ],
    Sound: [],
    JS: [
        { id: 'maubinh.css', src: '//static.hely.club/Content/css/maubinh.css' + preloaderVer },
        { id: 'maubinh', src: '//static.hely.club/Content/js/cardgame/maubinh.min.js' + preloaderVer },
        
        
    ] 
};

var XITO_RESOURCES = {
    Image: [
        
        { id: 'owner_icon', src: '//static.hely.club/Content/img/chuphong.jpg' + preloaderVer },
        { id: 'chips', src: '//static.hely.club/Content/img/chips.png' + preloaderVer },
        { id: 'poker.bgGreenEffect', src: '//static.hely.club/Content/img/cardgames/update_gui/effect/bg-green-effect.png' + preloaderVer },
        { id: 'poker.bgVioletEffect', src: '//static.hely.club/Content/img/cardgames/update_gui/effect/bg-violet-effect.png' + preloaderVer },
        { id: 'poker.bgBlueEffect', src: '//static.hely.club/Content/img/cardgames/update_gui/effect/bg-blue-effect.png' + preloaderVer },
        { id: 'poker.bgMagentaEffect', src: '//static.hely.club/Content/img/cardgames/update_gui/effect/bg-magenta-effect.png' + preloaderVer },
        { id: 'poker.bgOrangeEffect', src: '//static.hely.club/Content/img/cardgames/update_gui/effect/bg-orange-effect.png' + preloaderVer },
        { id: 'xito.culu', src: '//static.hely.club/Content/img/xito/culu.png' + preloaderVer },
        { id: 'xito.doi', src: '//static.hely.club/Content/img/xito/doi.png' + preloaderVer },
        { id: 'xito.mauthau', src: '//static.hely.club/Content/img/xito/mauthau.png' + preloaderVer },
        { id: 'xito.sanh', src: '//static.hely.club/Content/img/xito/sanh.png' + preloaderVer },
        { id: 'xito.sanhrong', src: '//static.hely.club/Content/img/xito/sanhrong.png' + preloaderVer },
        { id: 'xito.thu', src: '//static.hely.club/Content/img/xito/thu.png' + preloaderVer },
        { id: 'xito.thung', src: '//static.hely.club/Content/img/xito/thung.png' + preloaderVer },
        { id: 'xito.thungphasanh', src: '//static.hely.club/Content/img/xito/thungphasanh.png' + preloaderVer },
        { id: 'xito.tuquy', src: '//static.hely.club/Content/img/xito/tuquy.png' + preloaderVer },
        { id: 'xito.xam', src: '//static.hely.club/Content/img/xito/xam.png' + preloaderVer },
        { id: 'poker.win', src: '//static.hely.club/Content/img/cardgames/update_gui/effect/win.png' + preloaderVer },
        { id: 'poker.bgOrangeEffect', src: '//static.hely.club/Content/img/cardgames/update_gui/effect/bg-orange-effect.png' + preloaderVer },
        { id: 'asset_xito', src: '//static.hely.club/Content/img/cardgames/update_gui/effect/win.png' + preloaderVer }

    ],
    Sound: [],
    JS: [
        { id: 'xito.css', src: '//static.hely.club/Content/css/xito.css' + preloaderVer },
        { id: 'xito', src: '//static.hely.club/Content/js/cardgame/xito.min.js' + preloaderVer },
        
    ]
};

var POKER_RESOURCES = {
    Image: [
        
        { id: 'owner_icon', src: '//static.hely.club/Content/img/chuphong.jpg' + preloaderVer },
        { id: 'chips', src: '//static.hely.club/Content/img/chips.png' + preloaderVer },
        { id: 'd', src: '//static.hely.club/Content/img/poker/dealer.png' + preloaderVer },
        { id: 'empty_checkbox', src: '//static.hely.club/Content/img/poker/chk_over.png' + preloaderVer },
        { id: 'checked_checkbox', src: '//static.hely.club/Content/img/poker/chk.png' + preloaderVer },
        { id: 'ck_check_fold', src: '//static.hely.club/Content/img/poker/chk01.png' + preloaderVer },
        { id: 'ck_check', src: '//static.hely.club/Content/img/poker/chk02.png' + preloaderVer },
        { id: 'ck_call', src: '//static.hely.club/Content/img/poker/chk03.png' + preloaderVer },
        { id: 'ck_fold', src: '//static.hely.club/Content/img/poker/chk04.png' + preloaderVer },

        { id: 'poker.bgGreenEffect', src: '//static.hely.club/Content/img/cardgames/update_gui/effect/bg-green-effect.png' + preloaderVer },
        { id: 'poker.bgVioletEffect', src: '//static.hely.club/Content/img/cardgames/update_gui/effect/bg-violet-effect.png' + preloaderVer },
        { id: 'poker.bgBlueEffect', src: '//static.hely.club/Content/img/cardgames/update_gui/effect/bg-blue-effect.png' + preloaderVer },
        { id: 'poker.bgMagentaEffect', src: '//static.hely.club/Content/img/cardgames/update_gui/effect/bg-magenta-effect.png' + preloaderVer },
        { id: 'poker.bgOrangeEffect', src: '//static.hely.club/Content/img/cardgames/update_gui/effect/bg-orange-effect.png' + preloaderVer },
        { id: 'poker.allin', src:'//static.hely.club/Content/img/cardgames/update_gui/effect/all-in.png' + preloaderVer },
        { id: 'poker.culu', src: '//static.hely.club/Content/img/cardgames/update_gui/effect/cu-lu.png' + preloaderVer },
        { id: 'poker.tuquy', src: '//static.hely.club/Content/img/cardgames/update_gui/effect/tu-quy.png' + preloaderVer },
        { id: 'poker.thung', src: '//static.hely.club/Content/img/cardgames/update_gui/effect/thung.png' + preloaderVer },
        { id: 'poker.sanh', src: '//static.hely.club/Content/img/cardgames/update_gui/effect/sanh.png' + preloaderVer },
        { id: 'poker.thungphasanh', src: '//static.hely.club/Content/img/cardgames/update_gui/effect/thung-pha-sanh.png' + preloaderVer },
        { id: 'poker.win', src: '//static.hely.club/Content/img/cardgames/update_gui/effect/win.png' + preloaderVer },
        { id: 'asset_poker', src: '//static.hely.club/Content/img/cardgames/update_gui/effect/win.png' + preloaderVer }
        
    ],
    Sound: [],
    JS: [

        { id: 'poker.css', src: '//static.hely.club/Content/css/poker.css' + preloaderVer },
        { id: 'poker', src: '//static.hely.club/Content/js/cardgame/poker.min.js' + preloaderVer },
        

    ]
};

var LIENG_RESOURCES = {
    Image: [
        // Image loader
        { id: 'asset_win', src: '//static.hely.club/Content/img/cardgames/update_gui/effect/win.png' + preloaderVer },
        { id: 'owner_icon', src: '//static.hely.club/Content/img/chuphong.jpg' + preloaderVer },
        { id: 'boluot', src: '//static.hely.club/Content/img/lieng/boluot.png' + preloaderVer },
        { id: 'chips', src: '//static.hely.club/Content/img/chips.png' + preloaderVer },
        { id: 'lieng.bg_lose', src: '//static.hely.club/Content/img/lieng/bg_lose.png' + preloaderVer },
        { id: 'bacay.Result3cay', src: '//static.hely.club/Content/img/bacay/result3cay.png' + preloaderVer },
        { id: 'poker.bgGreenEffect', src: '//static.hely.club/Content/img/cardgames/update_gui/effect/bg-green-effect.png' + preloaderVer },
        { id: 'poker.bgVioletEffect', src: '//static.hely.club/Content/img/cardgames/update_gui/effect/bg-violet-effect.png' + preloaderVer },
        { id: 'poker.bgBlueEffect', src: '//static.hely.club/Content/img/cardgames/update_gui/effect/bg-blue-effect.png' + preloaderVer },
        { id: 'poker.bgMagentaEffect', src: '//static.hely.club/Content/img/cardgames/update_gui/effect/bg-magenta-effect.png' + preloaderVer },
        { id: 'poker.bgOrangeEffect', src: '//static.hely.club/Content/img/cardgames/update_gui/effect/bg-orange-effect.png' + preloaderVer },
        { id: 'lieng.bodoi', src: '//static.hely.club/Content/img/lieng/t-bodoi.png' + preloaderVer },
        { id: 'lieng.lieng', src: '//static.hely.club/Content/img/lieng/t-lieng.png' + preloaderVer },
        { id: 'lieng.sap', src: '//static.hely.club/Content/img/lieng/t-sap.png' + preloaderVer },

        { id: 'poker.win', src: '//static.hely.club/Content/img/cardgames/update_gui/effect/win.png' + preloaderVer },
        

    ],
    Sound: [],
    JS: [
        { id: 'lieng.css', src: '//static.hely.club/Content/css/lieng.css' + preloaderVer },
        { id: 'lieng', src: '//static.hely.club/Content/js/cardgame/lieng.min.js' + preloaderVer },
       
    ]
};

var XOCDIA_RESOURCES = {
    Image: [
        // Image loader
        { id: 'asset_xocdia', src: '//static.hely.club/Content/img/cardgames/update_gui/effect/win.png' + preloaderVer },
        { id: 'owner_icon', src: '//static.hely.club/Content/img/chuphong.jpg' + preloaderVer },
        { id: 'xocdia.nhacai', src: '//static.hely.club/Content/img/xocdia/chuong.png' + preloaderVer },

        { id: 'xocdia.dia', src: '//static.hely.club/Content/img/xocdia/dia140.png' + preloaderVer },
        { id: 'xocdia.bat', src: '//static.hely.club/Content/img/xocdia/bat140.png' + preloaderVer },
        { id: 'xocdia.visap', src: '//static.hely.club/Content/img/xocdia/b-item.Png' + preloaderVer },
        { id: 'xocdia.vingua', src: '//static.hely.club/Content/img/xocdia/b-item2.Png' + preloaderVer },

        
        { id: 'xocdia.dicele', src: '//static.hely.club/Content/img/xocdia/vichan.png' + preloaderVer },
        { id: 'xocdia.100', src: '//static.hely.club/Content/img/xocdia/100.png' + preloaderVer },
        { id: 'xocdia.500', src: '//static.hely.club/Content/img/xocdia/500.png' + preloaderVer },
        { id: 'xocdia.1k', src: '//static.hely.club/Content/img/xocdia/1k.png' + preloaderVer },
        { id: 'xocdia.5k', src: '//static.hely.club/Content/img/xocdia/5k.png' + preloaderVer },
        { id: 'xocdia.10k', src: '//static.hely.club/Content/img/xocdia/10k.png' + preloaderVer },
        { id: 'xocdia.20k', src: '//static.hely.club/Content/img/xocdia/20k.png' + preloaderVer },
        { id: 'xocdia.50k', src: '//static.hely.club/Content/img/xocdia/50k.png' + preloaderVer },
        { id: 'xocdia.100k', src: '//static.hely.club/Content/img/xocdia/100k.png' + preloaderVer },
        { id: 'xocdia.200k', src: '//static.hely.club/Content/img/xocdia/200k.png' + preloaderVer },
        { id: 'xocdia.500k', src: '//static.hely.club/Content/img/xocdia/500k.png' + preloaderVer },
        { id: 'xocdia.1m', src: '//static.hely.club/Content/img/xocdia/1m.png' + preloaderVer },
        { id: 'xocdia.2m', src: '//static.hely.club/Content/img/xocdia/2m.png' + preloaderVer },
        { id: 'xocdia.5m', src: '//static.hely.club/Content/img/xocdia/5m.png' + preloaderVer },
        { id: 'xocdia.10m', src: '//static.hely.club/Content/img/xocdia/10mto.png' + preloaderVer },
        { id: 'xocdia.50m', src: '//static.hely.club/Content/img/xocdia/50mto.png' + preloaderVer },
        
        
        { id: 'xocdia.danhsach', src: '//static.hely.club/Content/img/xocdia/danhsach.png' + preloaderVer },
        { id: 'xocdia.danhsachhouver', src: '//static.hely.club/Content/img/xocdia/danhsach_hover.png' + preloaderVer },
        { id: 'xocdia.dangky', src: '//static.hely.club/Content/img/xocdia/dangky.png' + preloaderVer },
        { id: 'xocdia.dangkyhouver', src: '//static.hely.club/Content/img/xocdia/dangky_hover.png' + preloaderVer },
        { id: 'xocdia.nghi', src: '//static.hely.club/Content/img/xocdia/nghi.png' + preloaderVer },
        { id: 'xocdia.nghihouver', src: '//static.hely.club/Content/img/xocdia/nghihover.png' + preloaderVer },
        
       
        { id: 'xocdia.rolls', src: '//static.hely.club/Content/img/xocdia/Anhngang_xocdia.png' + preloaderVer },
        { id: 'xocdia.rollopen', src: '//static.hely.club/Content/img/xocdia/Anhngang_mobat.png' + preloaderVer },
        
         
        { id: 'xocdia.thantai', src: '//static.hely.club/Content/img/xocdia/nha-cai.png' + preloaderVer },
        { id: 'xocdia.dangkynhacai', src: '//static.hely.club/Content/img/xocdia/dangky-nha-cai.png' + preloaderVer },
        
        { id: 'xocdia.btnDangkyNhaCai', src: '//static.hely.club/Content/img/xocdia/dangky.png' + preloaderVer },
        { id: 'xocdia.btnDangkyNhaCaiHover', src: '//static.hely.club/Content/img/xocdia/dangky_hover.png' + preloaderVer },
        { id: 'xocdia.btnNghi', src: '//static.hely.club/Content/img/xocdia/nghi.png' + preloaderVer },
        { id: 'xocdia.btnNghiHover', src: '//static.hely.club/Content/img/xocdia/nghihover.png' + preloaderVer },

        { id: 'xocdia.btnBan', src: '//static.hely.club/Content/img/xocdia/ban.png' + preloaderVer },
        

        { id: 'xocdia.btnMua', src: '//static.hely.club/Content/img/xocdia/mua.png' + preloaderVer },
        { id: 'xocdia.btnMuaHover', src: '//static.hely.club/Content/img/xocdia/mua_h.png' + preloaderVer },
        { id: 'xocdia.btnMuaNua', src: '//static.hely.club/Content/img/xocdia/mua1nua.png' + preloaderVer },
        { id: 'xocdia.btnMuaNuaHover', src: '//static.hely.club/Content/img/xocdia/mua1nua_h.png' + preloaderVer },



        { id: 'xd.gate_1', src: '//static.hely.club/Content/img/xocdia/gate_1.png' + preloaderVer },
        { id: 'xd.dato', src: '//static.hely.club/Content/img/xocdia/dato.png' + preloaderVer },
        { id: 'xd.dato_hover', src: '//static.hely.club/Content/img/xocdia/dato_hover.png' + preloaderVer },
        { id: 'xd.datnho', src: '//static.hely.club/Content/img/xocdia/datnho.png' + preloaderVer },
        { id: 'xd.datnho_hover', src: '//static.hely.club/Content/img/xocdia/datnho_hover.png' + preloaderVer },
        { id: 'xd.thang_to', src: '//static.hely.club/Content/img/xocdia/thang_xx1.png' + preloaderVer },
        { id: 'xd.thang_nho', src: '//static.hely.club/Content/img/xocdia/thang_xx2.png' + preloaderVer },
        { id: 'xd.biglewiner', src: '//static.hely.club/Content/img/xocdia/win_le.png' + preloaderVer },
        { id: 'xd.bigchanwiner', src: '//static.hely.club/Content/img/xocdia/win_chan.png' + preloaderVer },
        { id: 'poker.win', src: '//static.hely.club/Content/img/cardgames/update_gui/effect/win.png' + preloaderVer },
        { id: 'poker.bgOrangeEffect', src: '//static.hely.club/Content/img/cardgames/update_gui/effect/bg-orange-effect.png' + preloaderVer }
    ],
    Sound: [],
    JS: [
        { id: 'xocdia.css', src: '//static.hely.club/Content/css/xocdia.css' + preloaderVer },
        { id: 'xocdia', src: '//static.hely.club/Content/js/cardgame/xocdia.min.js' + preloaderVer },
        
    ]
};
 

 
