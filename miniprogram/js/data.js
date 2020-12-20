var goodsCard = {
    goodsID: 13,
    img: "https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1603814737310&di=f7d4c107229c2d80972e63487e231403&imgtype=0&src=http%3A%2F%2Fa0.att.hudong.com%2F30%2F29%2F01300000201438121627296084016.jpg",
    title: "ES玻璃窗立牌立牌立牌立牌",
    price: 35,
    person: 13,
    credit: ["极好", "优秀", "良好", "一般"][Math.floor(Math.random() * 4)]
};

var goodsCard_ = [{
    goodsID: 13,
    img: "https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1603875868558&di=3e4d2e3c24b508811e94ecfea6f8d17f&imgtype=0&src=http%3A%2F%2F05imgmini.eastday.com%2Fmobile%2F20190704%2F20190704074010_0a2d3bf280b0a3df5ec289cbc8ab223c_1.jpeg",
    title: "ES玻璃窗立牌立牌立牌立牌",
    price: 45.50,
    person: 1,
    credit: ["极好", "优秀", "良好", "一般"][Math.floor(Math.random() * 4)]
}, {
    goodsID: 13,
    img: "https://ss1.bdstatic.com/70cFvXSh_Q1YnxGkpoWK1HF6hhy/it/u=1000870223,1823939324&fm=15&gp=0.jpg",
    title: "ES玻璃窗立牌立牌立牌立牌",
    price: 43.8,
    person: 5,
    credit: ["极好", "优秀", "良好", "一般"][Math.floor(Math.random() * 4)]
}, {
    goodsID: 13,
    img: "https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1603875934792&di=7056efaee7ecaebecb6a4dd01934b60a&imgtype=0&src=http%3A%2F%2Fgss0.baidu.com%2F-vo3dSag_xI4khGko9WTAnF6hhy%2Fzhidao%2Fpic%2Fitem%2Fd53f8794a4c27d1e8ff07fe61fd5ad6eddc43839.jpg",
    title: "ES玻璃窗立牌立牌立牌立牌",
    price: 20.6,
    person: 13,
    credit: ["极好", "优秀", "良好", "一般"][Math.floor(Math.random() * 4)]
}, {
    goodsID: 13,
    img: "https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1603875934790&di=fe0fc45119c8265c8739096d720aad57&imgtype=0&src=http%3A%2F%2Fimgsrc.baidu.com%2Fforum%2Fpic%2Fitem%2F63b2c13f8794a4c20e6447c70ef41bd5ac6e3955.jpg%3Fv%3Dtbs",
    title: "ES玻璃窗立牌立牌立牌立牌",
    price: 60.0,
    person: 22,
    credit: ["极好", "优秀", "良好", "一般"][Math.floor(Math.random() * 4)]
}, ]

var circle = {
    circleID: 25,
    img: "https://i.loli.net/2020/10/28/RT1OiGKzqX9Qsct.png",
    name: "偶像梦幻祭偶像梦幻祭偶像梦幻祭",
    person: 133
};

var circle_ = [{
    circleID: 25,
    img: "https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1603876002155&di=08c36dc11439605c86f5556bba78c8dd&imgtype=0&src=http%3A%2F%2Fi0.hdslb.com%2Fbfs%2Farticle%2F34dfee9d29784840cd548abde1d2583d3b021dd5.jpg",
    name: "偶像梦幻祭偶像梦幻祭偶像梦幻祭",
    person: 12
}, {
    circleID: 25,
    img: "https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1603876002155&di=ae66089751f46fb26a48f22c7f27e41f&imgtype=0&src=http%3A%2F%2Fb.hiphotos.baidu.com%2Fzhidao%2Fpic%2Fitem%2Ff31fbe096b63f62432f1e1bc8644ebf81b4ca3e5.jpg",
    name: "偶像梦幻祭偶像梦幻祭偶像梦幻祭",
    person: 8
}, {
    circleID: 25,
    img: "https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1603876002154&di=b4d5421c939feeb039eb49e295908c3f&imgtype=0&src=http%3A%2F%2Fpic1.win4000.com%2Fwallpaper%2Fc%2F53d715e28cf3e.jpg",
    name: "偶像梦幻祭",
    person: 133
}, {
    circleID: 25,
    img: "https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1603876002153&di=aa34b899eb8d06be7c9b79d02e9ae2f3&imgtype=0&src=http%3A%2F%2Fa.hiphotos.baidu.com%2Fzhidao%2Fpic%2Fitem%2Fa71ea8d3fd1f413487d991c7261f95cad0c85e98.jpg",
    name: "偶像梦幻祭偶像梦幻祭偶像梦幻祭",
    person: 43
}, ];

var good_detail = {
    host_id: 345, //团长的ID
    host_head: "https://ss0.bdstatic.com/70cFuHSh_Q1YnxGkpoWK1HF6hhy/it/u=2057588226,2402156864&fm=11&gp=0.jpg", //团长头像
    host_name: "用户名", //团长的名字
    host_credit: "一般", //团长的信用等级
    user_headImg: "", //"我"的头像
    user_id: "",
    goods_id: 123456, //谷子的ID
    goods_time: "2020-10-23", //谷子的时间
    goods_title: "团名团名团名团名团名团名团名团名团名团名团名团名团名团名团名团名团名团名", //谷子的名字
    goods_description: "介绍介绍介绍介绍介绍介绍介绍介绍介绍介绍介绍介绍介绍介绍介绍介绍介绍介绍介绍介绍介绍介绍介绍介绍介绍介绍介绍介绍介绍介绍介绍介绍介绍介绍介绍介绍介绍介绍介绍介绍介绍介绍介绍介绍介绍介绍介绍介绍介绍介绍介绍介绍介绍介绍介绍介绍介绍介绍介绍介绍介绍介绍介绍", //谷子的介绍
    goods_imgs: [ //谷子的图片
        "cloud://buy-goods-xg7nm6m0/img/1604127407998-723.png",
        "cloud://buy-goods-xg7nm6m0/img/1604127491686-907.png",
        "cloud://buy-goods-xg7nm6m0/img/1604127573704-913.png",
    ],
    goods_person: 13, //拼团人数
    goods_status: "拼团中…", //拼团状态
    goods_trans_num: 543689327594, //运单号
    goods_tip: [{
        name: "守泽千秋", //某个谷子的名字
        price: 40.50, //谷子的价格
        num_total: 10, //谷子的总数
        num_occupy: 4, //已经占的数量
        select: 0,//我的选择
    },{
        name: "守泽千秋", //某个谷子的名字
        price: 40.50, //谷子的价格
        num_total: 10, //谷子的总数
        num_occupy: 4, //已经占的数量
        select: 0,//我的选择
    },{
        name: "守泽千秋", //某个谷子的名字
        price: 40.50, //谷子的价格
        num_total: 10, //谷子的总数
        num_occupy: 4, //已经占的数量
        select: 0,//我的选择
    },{
        name: "守泽千秋", //某个谷子的名字
        price: 40.50, //谷子的价格
        num_total: 10, //谷子的总数
        num_occupy: 4, //已经占的数量
        select: 0,//我的选择
    },{
        name: "守泽千秋", //某个谷子的名字
        price: 40.50, //谷子的价格
        num_total: 10, //谷子的总数
        num_occupy: 4, //已经占的数量
        select: 0,//我的选择
    },{
        name: "守泽千秋", //某个谷子的名字
        price: 40.50, //谷子的价格
        num_total: 10, //谷子的总数
        num_occupy: 4, //已经占的数量
        select: 0,//我的选择
    },{
        name: "守泽千秋", //某个谷子的名字
        price: 40.50, //谷子的价格
        num_total: 10, //谷子的总数
        num_occupy: 4, //已经占的数量
        select: 0,//我的选择
    },{
        name: "守泽千秋", //某个谷子的名字
        price: 40.50, //谷子的价格
        num_total: 10, //谷子的总数
        num_occupy: 4, //已经占的数量
        select: 0,//我的选择
    },{
        name: "守泽千秋", //某个谷子的名字
        price: 40.50, //谷子的价格
        num_total: 10, //谷子的总数
        num_occupy: 4, //已经占的数量
        select: 0,//我的选择
    },{
        name: "守泽千秋", //某个谷子的名字
        price: 40.50, //谷子的价格
        num_total: 10, //谷子的总数
        num_occupy: 4, //已经占的数量
        select: 0,//我的选择
    },{
        name: "守泽千秋", //某个谷子的名字
        price: 40.50, //谷子的价格
        num_total: 10, //谷子的总数
        num_occupy: 4, //已经占的数量
        select: 0,//我的选择
    },{
        name: "守泽千秋", //某个谷子的名字
        price: 40.50, //谷子的价格
        num_total: 10, //谷子的总数
        num_occupy: 4, //已经占的数量
        select: 0,//我的选择
    }, {
        name: "守泽千秋", //某个谷子的名字
        price: 40.50, //谷子的价格
        num_total: 10, //谷子的总数
        num_occupy: 8, //已经占的数量
        select: 0,//我的选择
    }, {
        name: "守泽千秋", //某个谷子的名字
        price: 40.50, //谷子的价格
        num_total: 9, //谷子的总数
        num_occupy: 0, //已经占的数量
        select: 0,//我的选择
    }, {
        name: "守泽千秋", //某个谷子的名字
        price: 40.50, //谷子的价格
        num_total: 10, //谷子的总数
        num_occupy: 5, //已经占的数量
        select: 0,//我的选择
    }, ],
    good_occupy: [{
        head_img: "https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1603814737310&di=f7d4c107229c2d80972e63487e231403&imgtype=0&src=http%3A%2F%2Fa0.att.hudong.com%2F30%2F29%2F01300000201438121627296084016.jpg", //用户的头像
        credit: 4.8, //用户的信用
        goods: "守泽千秋", //谷子的名字
        nums: 2, //谷子的数量
        money: 200.0, //钱
    }, {
        head_img: "https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1603814737310&di=f7d4c107229c2d80972e63487e231403&imgtype=0&src=http%3A%2F%2Fa0.att.hudong.com%2F30%2F29%2F01300000201438121627296084016.jpg", //用户的头像
        credit: 4.8, //用户的信用
        goods: "守泽千秋", //谷子的名字
        nums: 2, //谷子的数量
        money: 200.0, //钱
    }, {
        head_img: "https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1603814737310&di=f7d4c107229c2d80972e63487e231403&imgtype=0&src=http%3A%2F%2Fa0.att.hudong.com%2F30%2F29%2F01300000201438121627296084016.jpg", //用户的头像
        credit: 4.8, //用户的信用
        goods: "守泽千秋", //谷子的名字
        nums: 2, //谷子的数量
        money: 200.0, //钱
    }, ],
    circle: { //热门谷圈
        name: "偶像梦幻祭",
        num: 13,
        circle_id: 26
    },
    comment: [{ //评论的内容
        head_img: "https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1603876002153&di=aa34b899eb8d06be7c9b79d02e9ae2f3&imgtype=0&src=http%3A%2F%2Fa.hiphotos.baidu.com%2Fzhidao%2Fpic%2Fitem%2Fa71ea8d3fd1f413487d991c7261f95cad0c85e98.jpg",
        name: "玛卡巴卡",
        time: "2020-10-23 19:11",
        content: "内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容"
    }, {
        head_img: "https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1603876002153&di=aa34b899eb8d06be7c9b79d02e9ae2f3&imgtype=0&src=http%3A%2F%2Fa.hiphotos.baidu.com%2Fzhidao%2Fpic%2Fitem%2Fa71ea8d3fd1f413487d991c7261f95cad0c85e98.jpg",
        name: "玛卡巴卡",
        time: "2020-10-23 19:11",
        content: "内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容"
    }, {
        head_img: "https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1603876002153&di=aa34b899eb8d06be7c9b79d02e9ae2f3&imgtype=0&src=http%3A%2F%2Fa.hiphotos.baidu.com%2Fzhidao%2Fpic%2Fitem%2Fa71ea8d3fd1f413487d991c7261f95cad0c85e98.jpg",
        name: "玛卡巴卡",
        time: "2020-10-23 19:11",
        content: "内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容"
    }, {
        head_img: "https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1603876002153&di=aa34b899eb8d06be7c9b79d02e9ae2f3&imgtype=0&src=http%3A%2F%2Fa.hiphotos.baidu.com%2Fzhidao%2Fpic%2Fitem%2Fa71ea8d3fd1f413487d991c7261f95cad0c85e98.jpg",
        name: "玛卡巴卡",
        time: "2020-10-23 19:11",
        content: "内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容"
    }, ]

}

exports.data = {
    goodsCard: goodsCard,
    goodsCard_: goodsCard_,
    circle: circle,
    circle_: circle_,
    good_detail: good_detail
};