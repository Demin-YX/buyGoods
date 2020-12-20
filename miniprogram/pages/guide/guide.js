const cloud = require("../../js/cloud_operation");
Page({
    data: {
        imgs: []
    },
    onLoad: function () {
        swan.showModal({
            content: '本页面图片资源较多,可能需要进行较长时间加载,建议在WIFI环境下使用,所有图片使用SVG矢量图,清晰度高,【均保证没有资源失效】',
            confirmText: "我已了解",
            showCancel: false,
            success: res => {},
        });
        cloud.get_guide()
            .then(res => {
                this.setData({
                    imgs: res
                })
            })
    },
});