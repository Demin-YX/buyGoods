var goodsCard = require("../../js/data").data.goodsCard;
const cloud = require("../../js/cloud_operation");
var timer;
Page({
    data: {
        goodsCard: {
            goodsID: '',
            img: "cloud://buy-goods-xg7nm6m0/图片占位.png",
            title: "加载中……",
            price: 0,
        },
        test: ["测试"],
        left: {
            usr: {
                user_headImg: "",
                user_id: "",
            },
            dialog: []
        },
        /* 对方的留言 */
        right: {
            usr: {
                user_headImg: "",
                user_id: "",
            },
            dialog: []
        },
    },


    globalData: {
        timer: '',
        user_id: '',
        goods_id: '',
        /* 我的留言 */
        left: {
            usr: {
                user_headImg: "",
                user_id: "",
            },
            dialog: []
        },
        /* 对方的留言 */
        right: {
            usr: {
                user_headImg: "",
                user_id: "",
            },
            dialog: []
        },
    },

    choose: function (e) {
        //选择完了图片
        getApp().show(e.url);
    },

    confirm: function (e) {
        getApp().load("发送中…")
        //输入完了内容
        var d = new Date();
        var time = `${d.getFullYear()}-${d.getMonth()+1>9?(d.getMonth()+1):'0'+(d.getMonth()+1)}-${d.getDate()>9?d.getDate():'0'+d.getDate()} ${d.getHours()>9?d.getHours():'0'+d.getHours()}:${d.getMinutes()>9?d.getMinutes():'0'+d.getMinutes()}`
        cloud.send_msg(this.globalData.user_id, {
            type: "txt",
            content: e.cont,
            time: time
        }).then(() => {
            this.setData({
                [`right.dialog`]: (this.data.right.dialog || []).concat([{
                    type: "txt", //类型
                    content: e.cont, //内容
                    time: time
                }])
            })
            getApp().nload()
            setTimeout(() => {
                swan.pageScrollTo({
                    scrollTop: 10000,
                    duration: 300,
                    success: res => {
                        // getApp().show("滚动成功")
                    }
                });
            }, 1000);
        })
    },

    onShow: function () {
        timer = setInterval(() => {
            this.get_dialog();
        }, 3000);
    },

    onHide: function () {
        clearInterval(timer);
    },

    onLoad: function (options) {
        const user_id = options.user_id || "81a1382a-ee66-410a-94f9-f8a283555586";
        const goods_id = options.goods_id || "ac8a915c-96c6-45f1-b96d-36ff6720b32d";
        this.globalData.user_id = user_id;
        this.globalData.goods_id = goods_id;
        swan.getStorage({
            key: 'DIALOG ' + user_id,
            success: res => {
                this.setData({
                    goodsCard: res.data
                })
            }
        });
        this.get_goods_detail();
        this.get_oppose_img().then(() => {
            this.get_dialog();
        })
        setTimeout(() => {
            swan.pageScrollTo({
                scrollTop: 10000,
                duration: 300,
            });
        }, 1000);
    },

    onUnload: function () {
        clearInterval(timer);
    },

    /**
     * 获取对话内容
     */
    get_dialog: function () {
        const opposite_id = this.globalData.user_id;
        cloud.get_mine_leave(opposite_id)
            .then(mine_res => {
                cloud.get_oppose_leave(opposite_id)
                    .then(opposite_res => {
                        this.globalData.right = {
                            usr: {
                                user_headImg: getApp().globalData.user_info.img,
                                user_id: getApp().globalData.user_info.uid,
                            },
                            dialog: mine_res.content
                        }
                        this.globalData.left.dialog = opposite_res ? opposite_res.content : []
                        this.setData({
                            left: this.globalData.left,
                            right: this.globalData.right
                        })
                    })
            })
    },

    /* 获取对方的头像和ID */
    get_oppose_img: function () {
        return new Promise((resolve, reject) => {
            cloud.get_usr_info(this.globalData.user_id)
                .then(res => {
                    this.globalData.left.usr.user_headImg = res.img;
                    resolve();
                })
        })
    },

    /* 获取谷子详情 */
    get_goods_detail: function () {
        const goods_id = this.globalData.goods_id;
        cloud.get_goods_detail(goods_id)
            .then(res => {
                let avg_price = 0;
                res[0].goods.forEach(ele => {
                    avg_price += parseFloat(ele.price) / ele.num;
                });
                /* 将谷子内容存入缓存 */
                swan.setStorage({
                    key: 'DIALOG ' + this.globalData.user_id,
                    data: {
                        goodsID: res[0]._id,
                        img: res[0].image[0],
                        title: res[0].name,
                        price: avg_price.toFixed(2),
                    }
                });
                this.setData({
                    goodsCard: {
                        goodsID: res[0]._id,
                        img: res[0].image[0],
                        title: res[0].name,
                        price: avg_price.toFixed(2),
                    }
                })
            })
    },

    tapGoods: function (e) {
        clearInterval(timer);
        swan.navigateTo({
            url: '/pages/detail/detail?_id=' + this.data.goodsCard.goodsID
        });
    }

});