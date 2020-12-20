const cloud = require("../../js/cloud_operation");
Component({
    properties: {
        show: {
            type: Boolean,
            value: false
        }
    },

    ready: function () {
        swan.getStorage({
            key: 'LOCAL-TOKEN',
            success: res => {
                // console.log("获取的数据", res.data)
                if (res.data == "" || res.data == {}) {
                    this.setData({
                        show: true
                    })
                } else {
                    getApp().globalData.user_info = res.data;
                    cloud.verify_user_info()
                        .then(res => {
                            // console.log("验证结果", res)
                            this.setData({
                                show: !res
                            })
                        })
                }
            },
            fail: res => {
                this.setData({
                    show: true
                })
            }
        });
    },

    methods: {
        tapMask: function () {
            this.setData({
                opacity: 1
            })
        },

        moveMask: function () {
            this.setData({
                opacity: 1
            })
        },

        tapLogin: function (e) {
            if (e.detail.userInfo) {
                swan.cloud.callFunction({
                    name: 'login',
                    data: {}
                }).then(res => {
                    getApp().globalData.user_info = {
                        uid: res.result.userid, //用户ID
                        name: e.detail.userInfo.nickName, //昵称
                        img: e.detail.userInfo.avatarUrl, //头像 url
                        credit: 4.7, //信用 "极好","优秀","良好","一般"
                        collect: [], //收藏
                        circle: [], //收藏的圈子的ID
                        order: [], //作为成员下的订单，为谷子的ID数组
                        host: [], //作为团长开的团，为谷子的ID数组
                    }
                    cloud.verify_user_info()
                        .then(res => {
                            if (!res) {
                                cloud.add_usr_info(getApp().globalData.user_info)
                                this.setData({
                                    show: false
                                })
                            } else {
                                this.setData({
                                    show: false
                                })
                            }
                        })
                    swan.setStorage({
                        key: 'LOCAL-TOKEN',
                        data: getApp().globalData.user_info
                    });
                })
            }
        },
    }
})