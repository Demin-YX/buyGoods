const cloud = require("../../js/cloud_operation");

Page({
    data: {
        orders: [],
        empty: false
    },

    onLoad: function () {
        getApp().load("加载中……")
        cloud.get_my_purchase()
            .then(res => {
                this.setData({
                    orders: res,
                    empty: !res.length
                })
                getApp().uload()
            })
    },

    copy: function (res) {
        swan.setClipboardData({
            data: res.num,
            success: res => {
                swan.showToast({
                    title: '复制单号成功!',
                });
            }
        });
    },

});