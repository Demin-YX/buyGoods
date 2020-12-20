Component({
    properties: {

    },

    methods: {
        cancel: function () {
            this.triggerEvent('cancel')
        },
        confirm: function () {
            getApp().show("功能开发中,稍后上线……")
            this.cancel()
            return
            swan.showLoading({
                title: '下载中…'
            });
            setTimeout(() => {
                console.log("下载完成！")
                swan.hideLoading();
                swan.showToast({
                    title: '下载成功',
                });
                this.triggerEvent('cancel')
            }, 1500)
        }
    }
});