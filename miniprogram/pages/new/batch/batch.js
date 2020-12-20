const cloud = require("../../../js/cloud_operation");
Page({
    data: {
        textArea: '', //解码过的
    },

    globalData: {
        result: '', //textArea里的编码内容
        templateCode: '',
        stardand: "%E5%95%86%E5%93%81%E4%B8%80-40.5-6%0A%E5%95%86%E5%93%81%E4%BA%8C-30.5-7%0A%E5%95%86%E5%93%81%E4%B8%89-20.5-8",
        stardand_line: "%E5%95%86%E5%93%81%E4%B8%80-40.5-6"
    },

    onLoad: function (options) {
        // console.log(JSON.parse(options.good_detail));
        var t = JSON.parse(options.good_detail);
        var r = "";
        for (var i = 0; i < t.length; i++) {
            r += encodeURI(t[i].name) + '-' + encodeURI(t[i].price) + '-' + encodeURI(t[i].num);
            if (i != t.length - 1) {
                r += "%0A";
            }
        }
        this.setData({
            textArea: decodeURI(r)
        });
        this.globalData.result = r;
    },

    add_line: function () {
        var that = this;
        var t = that.globalData.stardand_line;
        this.setData({
            textArea: decodeURI(that.globalData.result) + decodeURI(that.data.textArea == '' ? t : "%0A" + t)
        });
        this.globalData.result = this.data.textArea
    },

    blur: function () {
        this.setData({
            focus: false
        });
    },

    clear: function () {
        this.setData({
            textArea: ''
        });
        this.globalData.result = "";
        console.log("clear")
    },

    analyst: function () {
        console.log(this.globalData.templateCode)
        cloud.get_goods_template(this.globalData.templateCode)
            .then(res => {
                var t = res.goods;
                var r = "";
                for (var i = 0; i < t.length; i++) {
                    r += encodeURI(t[i].name) + '-' + encodeURI(t[i].price) + '-' + encodeURI(t[i].num);
                    if (i != t.length - 1) {
                        r += "%0A";
                    }
                }
                this.setData({
                    textArea: decodeURI(r)
                });
                this.globalData.result = decodeURI(r);
                swan.showToast({
                    title: '解析成功!'
                });

            })
    },

    intro: function () {
        swan.navigateTo({
            url: '/pages/new/batch/intro/intro'
        });
    },

    checkIn: function () {
        this.setData({
            textArea: decodeURI(this.globalData.stardand)
        });
        this.globalData.result = decodeURI(this.globalData.stardand);
    },

    inputTemplateCode: function (e) {
        this.globalData.templateCode = e.detail.value;
    },

    inputTextArea: function (e) {
        this.globalData.result = encodeURI(e.detail.value);
    },

    submit: function () {
        var flag = false;
        var arr = decodeURI(this.globalData.result).split("\n");
        var good_detail = [];
        arr.forEach(ele => {
            var tmp = ele.split("-");
            if (tmp[0] && tmp[1] && tmp[2]) {
                good_detail.push({
                    name: tmp[0],
                    price: parseFloat(tmp[1]).toFixed(1),
                    num: parseInt(tmp[2])
                });
            } else {
                swan.showToast({
                    title: '格式错误，请重新检查',
                    icon: 'none',
                    duration: 1500
                });
                flag = true;
                return false;
            }
        });
        setTimeout(() => {
            if (!flag) {
                let pages = getCurrentPages(); //获取当前页面js里面的pages里的所有信息。
                let prevPage = pages[pages.length - 2];
                prevPage.setData({ // 将我们想要传递的参数在这里直接setData。上个页面就会执行这里的操作。
                    good_detail: good_detail
                })
                swan.navigateBack({
                    delta: 1
                });
            }
        }, 100);
    },
});