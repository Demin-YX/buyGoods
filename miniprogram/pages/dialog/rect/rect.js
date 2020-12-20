Component({
    properties: {

    },

    data: {
        value: "",
    },

    globalData: {
        input: ''
    },

    methods: {
        chooseImg: function () {
            swan.chooseImage({
                count: 1,
                success: res => {
                    this.triggerEvent('choose', {
                        url: res.tempFilePaths[0]
                    })
                },
                fail: res => {}
            });
        },
        input: function (e) {
            this.globalData.input = e.detail.value
        },
        confirm: function (e) {
            this.triggerEvent('confirm', {
                cont: this.globalData.input
            })
            setTimeout(() => {
                this.setData({
                    value: ""
                })
            }, 30)
        }
    }
});