(function (scope) {
    var Enums = {};

    Enums.MoneyType = { COIN: 0, STAR: 1 };
    Enums.MoneyTypeName = { COIN: 'Xu', STAR: 'Hely' };
    Enums.MoneyTypeColor = { COIN: '#FFF', DZO: '#ffd200' };
    Enums.PlayerStatus = {
        VIEWER: 0,
        INGAME_PLAYER: 1
    };
    Enums.ConnectionStatus = {
        DISCONNECTED: 0,
        CONNECTED: 1,
        REGISTER_LEAVE_GAME: 2
    };

    Enums.bacayRole = {
        NORMAL: 0,
        OWNER: 1
    }

    Enums.bacayRules = {
        NORMAL: 0,
        SAP: 1,//3 cay giong nhau
        VAY: 2,//day
        SAP_VAY: 3
    }

    Enums.bacayResultFamily = {
        BET: 0,
        NHAT: 1
    };

    Enums.talaResultFamily = {
        MOM: 0,
        NORMAL: 1,
        U_THUONG: 2,
        DEN_LANG: 3,
        U_KHAN: 4,
        U_DEN: 5
    };

    Enums.tlmnResultFamily = {
        DEN_LANG: -1,
        CONG_VA_THOI: 0,
        CONG: 1,
        THOI_BAI: 2,
        BET: 3,
        NHAT: 4,
        TOI_TRANG: 5
    };

    Enums.locResultFamily = {
        DEN_SAM: -2,
        CONG_VA_THOI: -1,
        CONG: 0,
        THOI_BAI: 1,
        BET: 2,
        NORMAL: 3,
        NHAT: 4,
        TOI_TRANG: 5,
        CHAN_SAM: 6,
        AN_CA_LANG: 7
    };

    Enums.MauBinhResultFamily = {
        Normal: -100,
        LamSap: -10,
        SapBaChi: -9,//thua cả 3 chi nhưng không phải binh lủng
        SamChiCuoi: -7,
        CuLuchiGiua: -6,
        TuQuyChiDau: -5,
        ThungPhaSanhChiDau: -4,
        TuQuyChiGiua: -3,
        ThungPhaSanhChiGiua: -2,
        BinhLung: -1,
        MauThau: 0,//Không có liên kết
        Doi: 1,//Có 1 đôi
        Thu: 2,//Có 2 đôi
        SamCo: 3,//Có 1 bộ ba
        Sanh: 4,//5 quân liên tiếp nhau
        Thung: 5,//Cùng chất
        CuLu: 6,//1 bộ 3 và 1 bộ đôi
        TuQuy: 7,//4 quân giống nhau
        ThungPhaSanh: 8,//Dây liên tiếp cùng chất ko có A
        ThungPhaSanhLon: 9,//Dây liên tiếp cùng chất có A và không có 2
        BaSanh: 10,//3 chi mỗi chi 1 sảnh
        BaThung: 11,//3 chi mỗi chi 1 thùng
        LucPheBon: 12,//có 5 đôi và 1 sám cô
        NamDoiMotSam: 13,// bài có 5 đôi và 1 sám cô
        DongHoa: 14,//dong mau
        SanhRong: 15,//từ 2-A ko đồng chất
        RongCuon: 16,//từ 2-A đồng chất
    };

    Enums.liengResultFamily = {
        NORMAL: 0,
        CHIN_AT_RO: 1,
        BO_DOI: 2,
        VAY: 3,
        SAP: 4,
        TIMENANBAI: 10,
        TIMETO: 10
    };

    Enums.Action = {
        NONE: 0,
        //RAISE12 : 12,//Tố 1/2
        //RAISE14 : 14,//Tố 1/4
        //RAISE_ALL : 9, // Tố tất cả
        RAISE: 1,//Tố 
        //RAISE_X2 : 2,//Tố gấp đôi
        CALL: 10,// Theo tố
        CHECK: 11,//Nhường tố
        CHECK_OR_FOLD: 12,//Nhường tố
        FOLD: 13, //Úp bài (bỏ bài)
        WIN: 18,
        //SELECT_FLIP : 15,
        //NEW_GAME : 16,
        RAISE_ALL_IN: 17
    };

    Enums.Phrase = {
        WAITING: 0,//wating
        BUY_CHIP: 1,// Chờ trích dẫn tài khoản mang vào : 15 giây
        NEW_GAME: 2,//Thơi gian chờ bắt đầu ván mới : 15S giây
        //CONFIRM : 3,//confirm, 10s
        BETTING: 4,//Tố 15s
        DEALER: 5,//chia bài: Thời gian chia 1 lá bài : 1 giây, //•	Thời gian lượt chia bài : Số người chơi * 1 giây
        SHOWDOWN: 6,//lat bai
        FINISH: 7,//	Xem kết quả và tính điểm: 20 giây
    };

    Enums.pokerResultFamily = {
        NONE: -1,
        THUNG_PHA_SANH: 8,
        TU_QUY: 7,
        CU_LU: 6,
        THUNG: 5,
        SANH: 4,
        XAM_CHI: 3,
        THU: 2,
        DOI: 1,
        MAU_THAU: 0,
    };

    Enums.liengResultFamily = {
        NORMAL: 0,
        CHIN_AT_RO: 1,
        BO_DOI: 2,
        VAY: 3,
        SAP: 4,
        TIMENANBAI: 10,
        TIMETO: 10
    };
    Enums.xocdiaBetType = {
        Odd: 1,//le
        ThreeUp: 2,//3 ngua
        ThreeDown: 3,//3 up
        Even: 4,//chan
        FourUp: 5,//4 ngu
        FourDown: 6//4 up
    };
    Enums.SediePhrases = {
        None: -1,
        Waiting: 0, //waiting
        RegisterBanker: 1, //dang ki lam cai
        Shaking: 2, //xoc dia
        Betting: 3, //dat cua
        RemoveBetting: 4, //nha cai duoi cua
        ReBetting: 5, //lang dat cua lai
        OpenPlate: 6, //mo dia
        ShowResult: 7 //ket qua
    };
    Enums.SedieActions =
        {
            Waiting: 0,
            Bet: 1,
            RemoveBet: 2,
            RegisterBanker: 3,
            UnregisterBanker: 4,
            BankerWeigh: 5,
            BuyAll: 6,
            BuyAHalf: 7
        };
    Enums.ChanPhases = {
        Waitting: 0,//dang cho van
        Dealling: 1,//đang chia bài. chưa lật bài
        Dealed: 2,//đã chia xong nhưng chưa chọn lọc
        Decked: 3,//da chon loc nhung chua boc cai
        Playing: 4//đang chơi 
    };

    Enums.VideoPlayerState = {
        Viewer: 0,
        Shutdown: 1,
        Dealling: 2,
        Playing: 3
    };
    Enums.VideoPockerResultFamily = {
        Normal: -2,
        Invalid: -1,
        MauThau: 11,//Không có liên kết1
        Doi: 10,//Có 1 đôi
        DoiJ: 9,//Có 1 đôi
        Thu: 8,//Có 2 đôi
        SamCo: 7,//Có 1 bộ ba
        Sanh: 6,//5 quân liên tiếp nhau
        Thung: 5,//Cùng chất
        CuLu: 4,//1 bộ 3 và 1 bộ đôi
        TuQuy: 3,//4 quân giống nhau
        ThungPhaSanh: 2,//Dây liên tiếp cùng chất ko có A
        ThungPhaSanhLon: 1,//Dây liên tiếp cùng chất có A và không có 2
    };

    scope.Enums = Enums;
})(window);