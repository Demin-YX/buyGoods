Page({
    data: {
        goods_id: ""
    },
    onLoad: function (options) {
        this.setData({
            goods_id: options.goods_id || "d62aca8c-6d8e-4060-bca0-2549e36e0f5f"
        })
    },

    tap:function(){
        swan.setClipboardData({
            data: this.data.goods_id,
            success: res => {
                swan.showToast({
                    title: '复制成功!'
                });
                swan.switchTab({
                    url: '/pages/home/home'
                });
            }
        });
    }
});