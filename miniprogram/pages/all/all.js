const cloud = require("../../js/cloud_operation")
Page({
    data: {
        goodsCard_: [],
        isMore: true
    },
    onLoad: function () {
        this.get_popular_goods(6, 0)
    },
    tapMore: function () {
        this.get_popular_goods(4, this.data.goodsCard_.length)
    },
    get_popular_goods: function (limit, offset) {
        if (!this.data.isMore) {
            return
        }
        getApp().load("加载中…")
        var that = this;
        /**
         * limit offset
         */
        cloud.get_popular_goods(limit, offset).then(res => {
            that.setData({
                goodsCard_: this.data.goodsCard_.concat(res),
                isMore: res.length == limit
            })
            swan.stopPullDownRefresh();
            getApp().unload()
        }).catch(err => {
            swan.showToast({
                title: '请求数据失败',
                icon: 'none',
            });
        })
    },
});