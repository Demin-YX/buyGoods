Page({
    data: {
        user: {
            headImg: getApp().globalData.user_info.img,
            name: getApp().globalData.user_info.name,
            credit: getApp().creditToTxt(getApp().globalData.user_info.credit),
        },
        goods: []
    },
    clear: function () {
        swan.showModal({
            content: '是否清空所有收藏,此操作不可逆!',
            success: res => {
                if (res.confirm) {
                    swan.setStorage({
                        key: 'COLLECT',
                        data: []
                    });
                    this.onShow()
                }
            },
        });
    },
    onShow: function () {
        swan.getStorage({
            key: 'COLLECT',
            success: res => {
                this.setData({
                    goods: res.data
                })
            },
        });
    },
});