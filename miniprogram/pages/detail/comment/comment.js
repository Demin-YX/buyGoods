var cloud = require("../../../js/cloud_operation");

Component({
    properties: {
        comment: {
            type: Array
        }
    },

    methods: {
        /**
         * 点击头像
         * 发起通话
         */
        tapHead: function (e) {
            const {
                uid, //用户ID
            } = this.data.comment;
            if (uid != getApp().globalData.user_info.uid) {
                this.triggerEvent('dialog', {
                    uid: uid
                })
            }
        },

        tapComment: function (e) {
            swan.setClipboardData({
                data: e.currentTarget.dataset.cont,
                success: res => {
                    swan.showToast({
                        title: '复制评论成功!',
                    });
                },
                fail: res => {},
            });
        },

        longPress: function (e) {
            const {
                cont,
                commentid,
                userid
            } = e.currentTarget.dataset;
            /**
             * 是本人的评论
             */
            console.log(getApp().globalData)
            if (getApp().globalData.user_info.uid == userid) {
                swan.showActionSheet({
                    itemList: ["删除"],
                    success: res => {
                        if (res.tapIndex == 0) {
                            cloud.del_comment(commentid)
                                .then(res => {
                                    swan.showToast({
                                        title: '删除成功!',
                                    });
                                    this.triggerEvent('delComment')
                                })
                        }
                    }
                });
            } else {
                /**
                 * 不是本人的评论
                 */
                swan.showActionSheet({
                    itemList: ["举报"],
                    success: res => {
                        console.log(res)
                    },
                });
            }
        },

    }
});