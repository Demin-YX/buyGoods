import {
    bar_top
} from "../../js/barTop";

const cloud = require("../../js/cloud_operation");

Page({
    data: {
        bar_height: '', //顶部距离
        official: {
            is_read: false,
            message_id: 1,
            head_img: "https://ss0.bdstatic.com/70cFuHSh_Q1YnxGkpoWK1HF6hhy/it/u=2057588226,2402156864&fm=11&gp=0.jpg", //头像
            goods_img: "https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1604918582429&di=39a79906383d77160c128f781746e0e7&imgtype=0&src=http%3A%2F%2Fimages.china.cn%2Fattachement%2Fjpg%2Fsite1000%2F20150506%2F002564ba9eb816b4760d19.jpg",
            message_name: "官方消息", //消息的内容
            message_content: "新版本上线，请删除后重新进入…", //消息的最近提示
            message_recent: "2020-11-09 15:54", //最近的时间
        },
        messages: []
    },
    onLoad: function () {
        bar_top().then(res => {
            this.setData({
                bar_height: res
            })
        })
        swan.getStorage({
            key: 'MSG',
            success: res => {
                this.setData(`messages`, res.data)
            },
        });
        swan.getStorage({
            key: 'LOCAL-TOKEN',
            success: res => {
                getApp().globalData.user_info = res.data
            },
        });
    },

    onShow: function () {
        this.get_msg()
    },

    get_msg: function () {
        cloud.get_total_msg(getApp().globalData.user_info.uid)
            .then(res => {
                var tmp_ret = this.data.messages;
                this.setData({
                    messages: this.bubble_sort(res)
                })
                /* 将消息缓存起来 */
                swan.setStorage({
                    key: 'MSG',
                    data: this.bubble_sort(res),
                });
            })
    },

    bubble_sort: function (arr) {
        for (var i = arr.length - 1; i >= 0; i--) {
            for (var j = 0; j <= i - 1; j++) {
                if (arr[j].message_recent < arr[j + 1].message_recent) {
                    var tmp = arr[j];
                    arr[j] = arr[j + 1];
                    arr[j + 1] = tmp;
                } else if (arr[j].message_recent == arr[j + 1].message_recent) {
                    if (arr[j].usr_id < arr[j + 1].usr_id) {
                        var tmp = arr[j];
                        arr[j] = arr[j + 1];
                        arr[j + 1] = tmp;
                    }
                }
            }
        }
        return arr;
    }
});