import bar_height from "../../js/barHeight";
import goods from "../../js/data";
var cloud = require("../../js/cloud_operation");

Page({
    data: {
        bar_height: '',
        goodsCard_: '',
        circle_: goods.data.circle_,
        value: ''
    },
    globalData: {
        input: ''
    },
    onLoad: function () {
        bar_height.bar_height().then(res => {
            this.setData({
                bar_height: res
            });
        })
        getApp().load()
        this.get_popular_goods();
    },

    inputing: function (e) {
        console.log(e)
        this.globalData.input = e.detail.value
    },

    input_confirm: function (e) {
        if (!this.globalData.input) {
            getApp().show("谷子号不能为空")
            return
        }
        getApp().load()
        cloud.verify_goods_id(this.globalData.input)
            .then(res => {
                this.setData({
                    value: ''
                })
                getApp().uload();
                if (res) {
                    swan.navigateTo({
                        url: '/pages/detail/detail?_id=' + this.globalData.input
                    });
                } else {
                    getApp().show("不存在的谷子号")
                }
                this.globalData.input = ""
            })
    },

    onShow: function () {
        swan.getStorage({
            key: 'LOCAL-TOKEN',
            success: res => {
                if (res.data)
                    getApp().globalData.user_info = res.data;
                    // console.log(res.data)
            }
        });
        // this.get_popular_goods();
    },
    get_popular_goods: function () {
        var that = this;
        cloud.get_popular_goods().then(res => {
            that.setData({
                goodsCard_: res
            })
            swan.stopPullDownRefresh();
        }).catch(err => {
            swan.showToast({
                title: '请求数据失败',
                icon: 'none',
            });
        })
    },
    onPullDownRefresh: function (e) {
        console.log("下拉")
        this.get_popular_goods()
    },
    new: function () {
        swan.navigateTo({
            url: '/pages/new/new'
        });
    },

    tapMore: function () {
        swan.navigateTo({
            url: '/pages/all/all'
        });
    }

});